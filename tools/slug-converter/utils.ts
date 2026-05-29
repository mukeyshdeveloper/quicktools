export interface SlugOptions {
  separator: '-' | '_';
  preserveCase: boolean;
  removeNumbers: boolean;
}

export function generateSlug(text: string, options: SlugOptions): string {
  if (!text) return '';

  let slug = text;

  // 1. Lowercase unless preserved
  if (!options.preserveCase) {
    slug = slug.toLowerCase();
  }

  // 2. Remove numbers if requested
  if (options.removeNumbers) {
    slug = slug.replace(/[0-9]/g, '');
  }

  // 3. Replace non-alphanumeric (and non-whitespace/hyphen/underscore) with nothing
  // We keep spaces, hyphens, and underscores for the next step
  slug = slug.replace(/[^\w\s-_]/g, '');

  // 4. Replace whitespace, hyphens, and underscores with the chosen separator
  const separatorRegex = /[\s_-]+/g;
  slug = slug.replace(separatorRegex, options.separator);

  // 5. Trim separators from start and end
  if (slug.startsWith(options.separator)) slug = slug.substring(1);
  if (slug.endsWith(options.separator)) slug = slug.substring(0, slug.length - 1);

  return slug;
}
