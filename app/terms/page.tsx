import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — LivingDocs",
  description: "Terms of Service for LivingDocs",
};

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-green-600 hover:underline mb-8 inline-block">
        ← Back to LivingDocs
      </Link>

      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: May 18, 2026</p>

      <section className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Acceptance</h2>
          <p>
            By installing or using LivingDocs (&ldquo;the App&rdquo;), a Confluence Forge app
            developed by Novaders LLP (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), you agree to these Terms of Service.
            If you do not agree, do not install or use the App.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Description of Service</h2>
          <p>
            LivingDocs links Confluence pages to source code files in GitHub repositories and
            provides a staleness indicator based on the file&rsquo;s last commit date. The App is
            provided as-is and is intended to help teams keep documentation in sync with code.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Requirements</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>A valid Atlassian Confluence Cloud account.</li>
            <li>GitHub repositories must be publicly accessible for the staleness check to work.</li>
            <li>You must have admin rights on your Confluence site to install the App.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Use the App to access private GitHub repositories without proper authorisation.</li>
            <li>Attempt to reverse-engineer, modify, or redistribute the App.</li>
            <li>Use the App in any way that violates Atlassian&rsquo;s Marketplace terms or policies.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Disclaimer of Warranties</h2>
          <p>
            The App is provided &ldquo;as is&rdquo; without warranty of any kind. We do not guarantee
            the accuracy of staleness scores or the availability of the GitHub API. Use the
            App&rsquo;s output as a guide, not a definitive audit.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Novaders LLP shall not be liable for any
            indirect, incidental, or consequential damages arising from use of the App, including
            any decisions made based on staleness scores.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the App after changes
            are posted constitutes acceptance of the revised terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be resolved
            in the courts of jurisdiction applicable to Novaders LLP.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Contact</h2>
          <p>
            For questions about these terms, contact{" "}
            <a href="mailto:dinesh@novaders.com" className="text-green-600 hover:underline">
              dinesh@novaders.com
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
