import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — LivingDocs",
  description: "Privacy Policy for LivingDocs",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-green-600 hover:underline mb-8 inline-block">
        ← Back to LivingDocs
      </Link>

      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: May 18, 2026</p>

      <section className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Overview</h2>
          <p>
            LivingDocs (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a Confluence Forge app developed by Novaders LLP.
            This policy explains what data we access and how we handle it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Data We Access</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Confluence page ID</strong> — used as a key to store your repo/file configuration
              against a specific page. We do not read page content.
            </li>
            <li>
              <strong>GitHub repository URL and file path</strong> — entered by you, stored per page in
              Forge&rsquo;s built-in key-value storage (scoped to your Confluence site).
            </li>
            <li>
              <strong>GitHub Commits API</strong> — queried on demand when you click &ldquo;Check Staleness&rdquo;
              to retrieve the last commit date for the configured file. We do not store commit data.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Data We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not collect personal data (names, emails, IP addresses).</li>
            <li>We do not use analytics or tracking cookies.</li>
            <li>We do not share data with third parties except GitHub (to check commit history).</li>
            <li>We do not store data outside of Atlassian&rsquo;s Forge infrastructure.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Data Storage</h2>
          <p>
            Configuration data (repo URL, file path) is stored using Atlassian Forge&rsquo;s built-in
            key-value storage. This data is hosted and managed by Atlassian within their secure
            infrastructure and is scoped to your Confluence site installation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Third-Party Services</h2>
          <p>
            LivingDocs queries the GitHub REST API (<code className="text-sm bg-gray-100 px-1 rounded">api.github.com</code>)
            to retrieve commit history for files you configure. Only public repository data is
            accessed. No authentication tokens are stored or required.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Data Deletion</h2>
          <p>
            Uninstalling LivingDocs from your Confluence site will remove all associated
            configuration data from Forge storage. You may also reconfigure or clear settings
            per page using the &ldquo;Reconfigure&rdquo; button within the app.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Contact</h2>
          <p>
            For privacy questions, contact us at{" "}
            <a href="mailto:dinesh@novaders.com" className="text-green-600 hover:underline">
              dinesh@novaders.com
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Anonymous product analytics</h2>
          <p>
            The LivingDocs CLI / MCP server sends anonymous usage events (install, server start,
            successful index, and when an upgrade prompt is shown) to help us understand which steps
            people complete. These events contain a random installation ID, the app version, and your
            operating system &mdash; never your code, file paths, repository names, or any personal
            information. To opt out, set the environment variable{" "}
            <code className="text-sm bg-gray-100 px-1 rounded">DO_NOT_TRACK=1</code> or{" "}
            <code className="text-sm bg-gray-100 px-1 rounded">LIVINGDOCS_TELEMETRY=off</code>.
          </p>
        </div>
      </section>
    </main>
  );
}
