import { handleContact } from "@/app/_lib/contact-handler";

// Project inquiry endpoint. Credentials and addresses are server-only
// environment variables; nothing here is exposed to the client bundle.
export async function POST(request: Request) {
  return handleContact(request, {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
  });
}
