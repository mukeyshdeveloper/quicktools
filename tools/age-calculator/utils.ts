export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthdayDays: number;
  nextBirthdayDate: string;
}

const millisecondsPerDay = 24 * 60 * 60 * 1000;

function toUtcDay(date: Date): number {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

function formatDateLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function parseDateInput(value: string): Date | null {
  const parts: string[] = value.split('-');
  const year: number | undefined = Number(parts[0]);
  const month: number | undefined = Number(parts[1]);
  const day: number | undefined = Number(parts[2]);

  if (
    parts.length !== 3 ||
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }

  const parsedDate = new Date(year, month - 1, day);
  const matchesInput: boolean =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  return matchesInput && isValidDate(parsedDate) ? parsedDate : null;
}

export function formatDateInput(date: Date): string {
  const year: string = String(date.getFullYear()).padStart(4, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function calculateAge(dob: Date, asOf: Date): AgeResult | null {
  if (!isValidDate(dob) || !isValidDate(asOf) || toUtcDay(dob) >= toUtcDay(asOf)) {
    return null;
  }

  let years: number = asOf.getFullYear() - dob.getFullYear();
  let months: number = asOf.getMonth() - dob.getMonth();
  let days: number = asOf.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays: number = Math.floor(
    (toUtcDay(asOf) - toUtcDay(dob)) / millisecondsPerDay,
  );
  const totalWeeks: number = Math.floor(totalDays / 7);
  const totalMonths: number = years * 12 + months;
  let nextBirthday: Date = new Date(
    asOf.getFullYear(),
    dob.getMonth(),
    dob.getDate(),
  );

  if (toUtcDay(nextBirthday) <= toUtcDay(asOf)) {
    nextBirthday = new Date(asOf.getFullYear() + 1, dob.getMonth(), dob.getDate());
  }

  const nextBirthdayDays: number = Math.ceil(
    (toUtcDay(nextBirthday) - toUtcDay(asOf)) / millisecondsPerDay,
  );

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    nextBirthdayDays,
    nextBirthdayDate: formatDateLabel(nextBirthday),
  };
}
