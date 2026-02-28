"use client";

import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { useToast } from "@/providers/ToastProvider";
import { Breadcrumbs } from "@/components/layout";

interface ContactForm {
  name: string;
  email: string;
  orderNumber: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = {
  name: "",
  email: "",
  orderNumber: "",
  subject: "",
  message: "",
};

export default function ContactPageClient() {
  const { showToast } = useToast();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ContactForm> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));

    showToast("Message sent successfully! We'll get back to you within 24 hours.", "success");
    setForm(initialForm);
    setErrors({});
    setSubmitting(false);
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div className="mt-8 mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          Get in Touch
        </h1>
        <p className="text-stone-500 dark:text-stone-400 max-w-xl">
          Have a question, suggestion, or just want to say hello? We&apos;d love to
          hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Name *
                </label>
                <Input
                  id="contact-name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your name"
                  error={errors.name}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Email *
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@example.com"
                  error={errors.email}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="contact-order"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Order Number{" "}
                  <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <Input
                  id="contact-order"
                  value={form.orderNumber}
                  onChange={(e) => handleChange("orderNumber", e.target.value)}
                  placeholder="#LW-00000"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Subject *
                </label>
                <Input
                  id="contact-subject"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  placeholder="How can we help?"
                  error={errors.subject}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Message *
              </label>
              <textarea
                id="contact-message"
                rows={6}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell us what's on your mind..."
                className={`w-full rounded-lg border px-4 py-3 text-sm bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 resize-none transition-colors ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-stone-200 dark:border-stone-700 focus:border-brand-accent"
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            <Button type="submit" disabled={submitting} icon={<Send size={16} />}>
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Contact Info
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-brand-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    Email
                  </p>
                  <a
                    href="mailto:hello@lumawear.store"
                    className="text-sm text-stone-500 dark:text-stone-400 hover:text-brand-accent transition-colors"
                  >
                    hello@lumawear.store
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-brand-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    Phone
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    Address
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    123 Fashion Avenue
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200 dark:border-stone-800 pt-8">
            <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Business Hours
            </h2>
            <div className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
              <div className="flex justify-between">
                <span>Monday – Friday</span>
                <span>9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM – 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200 dark:border-stone-800 pt-8">
            <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Response Time
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              We typically respond within 24 hours during business days. For
              urgent order inquiries, please include your order number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
