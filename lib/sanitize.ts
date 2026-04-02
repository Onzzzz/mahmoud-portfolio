/**
 * Server-side input sanitization — no external dependencies.
 */

/** Strip all HTML tags from a string */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/** Sanitize and validate a contact form field */
export function sanitizeField(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return stripHtml(value).trim().slice(0, maxLength);
}

/** Basic email format validation */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validate and sanitize a full contact payload */
export function sanitizeContactPayload(body: Record<string, unknown>): {
  valid: boolean;
  error?: string;
  data?: { name: string; email: string; message: string; type: string };
} {
  const name = sanitizeField(body.name, 100);
  const email = sanitizeField(body.email, 254);
  const message = sanitizeField(body.message, 2000);
  const type = sanitizeField(body.type, 50) || "hello";

  if (!name || !email || !message) {
    return { valid: false, error: "Name, email, and message are required." };
  }

  if (!isValidEmail(email)) {
    return { valid: false, error: "Please provide a valid email address." };
  }

  return { valid: true, data: { name, email, message, type } };
}
