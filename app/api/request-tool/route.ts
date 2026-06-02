import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize clients only if env vars are present (for build safety)
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your-email@example.com';

// Rate limiter using Upstash Redis (free tier available)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? Redis.fromEnv()
  : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 requests per hour per IP+email
      analytics: true,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, toolName, description, category, additionalNotes, recaptchaToken } = body;

    // Validation
    if (!email || !toolName || !description) {
      return NextResponse.json(
        { message: 'Email, Tool Name, and Description are required.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA (v3) - free spam protection from Google
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed.' },
          { status: 400 }
        );
      }

      const recaptchaRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`,
        { method: 'POST' }
      );
      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    } else {
      console.warn('RECAPTCHA_SECRET_KEY not set. Skipping reCAPTCHA verification.');
    }

    // Rate limiting by IP + email (using Upstash Redis - free tier)
    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                 request.headers.get('x-real-ip') || 
                 'unknown';
      const identifier = `${ip}:${email.toLowerCase()}`;

      const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

      if (!success) {
        return NextResponse.json(
          { 
            message: 'Too many requests. Please try again later.',
            limit,
            remaining,
            reset: new Date(reset).toISOString(),
          },
          { status: 429 }
        );
      }
    } else {
      console.warn('Upstash Redis not configured. Skipping rate limiting.');
    }

    // Save to Supabase
    if (supabase) {
      const { error } = await supabase
        .from('tool_requests')
        .insert([
          {
            name: name || null,
            email,
            tool_name: toolName,
            description,
            category: category || null,
            additional_notes: additionalNotes || null,
          },
        ]);

      if (error) {
        console.error('Supabase insert error:', error);

        if (error.code === '42501') {
          console.error(
            '>>> Row Level Security (RLS) error on tool_requests table.\n' +
            '>>> Fix: Run this SQL in Supabase SQL Editor:\n\n' +
            'create policy "Allow public inserts for tool requests"\n' +
            'on tool_requests\n' +
            'for insert\n' +
            'to anon\n' +
            'with check (true);\n'
          );
        }

        // We still attempt to send the email so the admin is notified even if DB write fails
      }
    } else {
      console.warn('Supabase not configured. Skipping database save.');
    }

    // Send email notification via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'QuickUtils <onboarding@resend.dev>', // Change this to your verified domain later
          to: ADMIN_EMAIL,
          subject: `New Tool Request: ${toolName}`,
          html: `
            <h2>New Tool Request</h2>
            <p><strong>Tool Name:</strong> ${toolName}</p>
            <p><strong>Requested by:</strong> ${name || 'Anonymous'} (${email})</p>
            <p><strong>Category:</strong> ${category || 'Not specified'}</p>
            
            <h3>Description</h3>
            <p>${description}</p>
            
            ${additionalNotes ? `<h3>Additional Notes</h3><p>${additionalNotes}</p>` : ''}
            
            <hr />
            <p style="color: #666; font-size: 12px;">
              Submitted at ${new Date().toLocaleString()}
            </p>
          `,
        });
      } catch (emailError) {
        console.error('Resend email error:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.warn('Resend not configured. Skipping email notification.');
    }

    // Even if DB insert failed, we still notify via email (see above).
    // Return success to the user so they don't get a bad experience.
    return NextResponse.json(
      { message: 'Request submitted successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Request tool error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
