import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LumaWear — we'd love to hear from you. Reach out with questions, feedback, or just to say hello.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
