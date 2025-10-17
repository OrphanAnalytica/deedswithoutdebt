import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            <strong>Effective date:</strong> October 14, 2025
          </p>
          <p className="text-gray-700 mt-4">
            Deeds Without Debt ("we," "us," "our") operates deedswithoutdebt.com and the Deeds Without Debt email newsletter (the "Services"). This Privacy Policy explains what we collect, how we use it, and your choices.
          </p>
          <p className="text-gray-700 mt-4">
            If you have questions, contact us at{' '}
            <a href="mailto:info@deedswithoutdebt.com" className="text-green-600 hover:text-green-700 font-semibold">
              info@deedswithoutdebt.com
            </a>
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information you provide</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Email address and (optionally) name when you subscribe.</li>
              <li>Any messages you send us (support, feedback, etc.).</li>
              <li>If we introduce paid products, limited billing details will be collected by our payment provider (we'll update this section first).</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information collected automatically</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Website analytics (page views, referrers, approximate location/country, device type) via Plausible Analytics, which is privacy-friendly and does not use cookies or persistent identifiers. Data is aggregated and not tied to you personally.</li>
              <li>Email engagement (opens/clicks) via ConvertKit/Kit using standard methods (tracking pixel, link redirects).</li>
            </ul>
            <p className="text-gray-700">We do not collect sensitive categories of personal information.</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Send the newsletter and emails you opted into.</li>
              <li>Operate and improve our site and content.</li>
              <li>Understand engagement to make content more useful.</li>
              <li>Communicate about updates, resources, or policy changes.</li>
              <li>Comply with legal obligations and enforce our terms.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We do not sell or "share" your personal information for cross-context behavioral advertising.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Lawful Bases (GDPR/UK GDPR, where applicable)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Consent (sending the newsletter; email engagement tracking where required).</li>
              <li>Legitimate interests (basic privacy-respecting analytics; security, performance).</li>
              <li>Legal obligation (where law requires).</li>
            </ul>
            <p className="text-gray-700 mt-4">You can withdraw consent anytime by unsubscribing.</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Providers (Processors)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Email & list management:</strong> ConvertKit/Kit (stores your email; sends campaigns; open/click metrics).</li>
              <li><strong>Analytics:</strong> Plausible Analytics (cookie-free, aggregated statistics).</li>
              <li><strong>Hosting/DNS:</strong> GitHub Pages (site hosting) and our DNS provider (e.g., Namecheap).</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Providers process limited data needed to deliver their services and must safeguard it appropriately.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Similar Technologies</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Website analytics:</strong> Plausible uses no cookies and does not track across sites.</li>
              <li><strong>Email tracking:</strong> Our email platform may use a standard open pixel and link redirects. You can disable image loading in your email client to reduce open tracking.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Choices & Rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Unsubscribe anytime:</strong> Use the "Unsubscribe" link in any email or contact info@deedswithoutdebt.com.</li>
              <li><strong>Access/update/delete:</strong> Email us to access, correct, or delete your info.</li>
              <li><strong>EEA/UK:</strong> Where applicable, you may request restriction, portability, or object to processing based on legitimate interests. You may also complain to your local data protection authority.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-700">
              We keep subscription data while you're subscribed. If you unsubscribe, we retain minimal records (e.g., suppression list) to honor your opt-out and meet legal requirements.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Transfers</h2>
            <p className="text-gray-700">
              We and our providers may process data in the United States and other countries. Where required, we use appropriate safeguards (e.g., Standard Contractual Clauses).
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Security</h2>
            <p className="text-gray-700">
              We use reasonable administrative, technical, and organizational safeguards. However, no system is 100% secure. Please use unique, strong passwords for related accounts.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700">
              Our Services are not intended for children under 13 (or the minimum age in your jurisdiction). If you believe a child provided information to us, contact us and we'll delete it.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Do Not Track & "Sale/Share" Disclosures</h2>
            <p className="text-gray-700 mb-3">
              <strong>Do Not Track:</strong> We don't respond to browser DNT signals (no common standard), but we already use cookie-free, aggregate analytics.
            </p>
            <p className="text-gray-700">
              <strong>California (CPRA):</strong> We do not sell or share personal information as defined by California law.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Policy from time to time. We'll post the revised version with an updated Effective date; material changes will be highlighted.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-700 mb-2">
              <strong>Deeds Without Debt</strong>
            </p>
            <p className="text-gray-700">
              Email:{' '}
              <a href="mailto:info@deedswithoutdebt.com" className="text-green-600 hover:text-green-700 font-semibold">
                info@deedswithoutdebt.com
              </a>
            </p>
            <p className="text-gray-700 mt-2">
              Mailing Address: PO BOX 3163, Las Cruces, NM 88003
            </p>
          </section>

          {/* Plain English Summary */}
          <section className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plain-English Summary</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>We collect only what's needed to run the newsletter and improve content.</li>
              <li>Email is via ConvertKit/Kit; site analytics via Plausible (cookie-free).</li>
              <li>Unsubscribe or request deletion anytime.</li>
              <li>We don't sell your data.</li>
            </ul>
            <p className="text-gray-600 text-sm mt-4 italic">
              This Policy is informational and not legal advice. For specific compliance needs (GDPR/UK GDPR, CPRA/CPA/VCDPA, CAN-SPAM/CASL), consult an attorney.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;



