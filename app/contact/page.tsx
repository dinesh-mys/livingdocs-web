import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — LivingDocs",
  description: "Get in touch with the LivingDocs team for support, billing, or feature requests.",
};

export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-green-600 hover:underline mb-8 inline-block">
        ← Back to LivingDocs
      </Link>

      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-sm text-gray-500 mb-10">Novaders LLP</p>

      <section className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          Have a question, found a bug, or need help getting started? We&rsquo;re happy to help.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-5">
          <p className="font-semibold text-gray-900 mb-1">Email</p>
          <a href="mailto:dinesh@novaders.com" className="text-green-600 hover:underline">
            dinesh@novaders.com
          </a>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Support</h2>
          <p>
            For issues with the LivingDocs Confluence app — configuration, staleness checks, or
            installation — email us with a brief description and your Confluence site URL. We
            typically respond within 1–2 business days.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Billing</h2>
          <p>
            For subscription or billing questions, email us with your registered email address.
            Billing is managed through{" "}
            <a href="https://polar.sh" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
              Polar
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Feature Requests</h2>
          <p>
            We&rsquo;d love to hear what you&rsquo;d like to see in LivingDocs. Send your ideas to{" "}
            <a href="mailto:dinesh@novaders.com" className="text-green-600 hover:underline">
              dinesh@novaders.com
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
