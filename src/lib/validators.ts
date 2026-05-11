export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function requireText(value: FormDataEntryValue | null, field: string) {
  const text = String(value || '').trim();
  if (!text) throw new Error(`${field} is required.`);
  return text;
}

export function parseEventDate(value: FormDataEntryValue | null) {
  const dateText = String(value || '');
  const date = new Date(dateText);
  if (!dateText || Number.isNaN(date.getTime())) throw new Error('A valid date is required.');
  return date;
}

export function parseTicketPrice(value: FormDataEntryValue | null) {
  const price = Number(value);
  if (Number.isNaN(price) || price < 0) throw new Error('Ticket price must be zero or more.');
  return price;
}
