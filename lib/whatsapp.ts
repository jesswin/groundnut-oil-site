/**
 * WhatsApp number in international format, digits only. Kept in its own small module so
 * browser components (the enquiry form) can use it without loading all of site-config.
 */
export const WHATSAPP_NUMBER = "917617636936";

/** wa.me link that opens a chat with a prefilled message. */
export function whatsappLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
