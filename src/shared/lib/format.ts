/**
 * The backend serializes money as an exact decimal string (numeric(18,2)
 * columns, never float) - e.g. "1234.50". We only ever format it for
 * display here, never parse it back into a JS number for arithmetic.
 */
export function formatMoney(amount: string, currency: string): string {
  const [wholePart = '0', fractionPart = '00'] = amount.split('.');
  const negative = wholePart.startsWith('-');
  const digits = negative ? wholePart.slice(1) : wholePart;
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const sign = negative ? '−' : '';
  return `${sign}${grouped},${fractionPart} ${currency}`;
}

export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
