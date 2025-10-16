import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">
            <strong>Effective date:</strong> October 14, 2025
          </p>
          <p className="text-gray-700 mt-4">
            These Terms of Service ("Terms") govern your use of deedswithoutdebt.com and the Deeds Without Debt email newsletter (the "Services") operated by Deeds Without Debt ("we," "us," "our").
          </p>
          <p className="text-gray-700 mt-4">
            By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Services.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using our Services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Deeds Without Debt provides educational content about tax deed and lien investing through our website and email newsletter. Our content is for informational purposes only and does not constitute financial, legal, or investment advice.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Weekly educational newsletter about alternative real estate investing</li>
              <li>State-specific guides and resources</li>
              <li>Auction calendars and property information</li>
              <li>Educational tools and templates</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">As a user of our Services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide accurate and complete information when subscribing</li>
              <li>Use the Services only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Respect intellectual property rights</li>
              <li>Not distribute or share content without permission</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclaimers and Limitations</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Educational Content Disclaimer</h3>
            <p className="text-gray-700 mb-4">
              The information provided through our Services is for educational purposes only and does not constitute:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Financial, investment, or legal advice</li>
              <li>Recommendations to buy, sell, or invest in any specific properties</li>
              <li>Guarantees of investment returns or outcomes</li>
              <li>Professional tax or legal counsel</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">No Warranties</h3>
            <p className="text-gray-700 mb-4">
              Our Services are provided "as is" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Warranties of merchantability and fitness for a particular purpose</li>
              <li>Warranties regarding the accuracy or completeness of information</li>
              <li>Warranties that the Services will be uninterrupted or error-free</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
            <p className="text-gray-700">
              To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our Services.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Investment Risks</h2>
            <p className="text-gray-700 mb-4">
              Tax deed and lien investing involves significant risks, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Loss of entire investment</li>
              <li>Property redemption by original owners</li>
              <li>Title defects and legal complications</li>
              <li>Market fluctuations and economic conditions</li>
              <li>Regulatory changes affecting tax sales</li>
              <li>Property condition and maintenance costs</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>You should consult with qualified professionals before making any investment decisions.</strong>
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content, including but not limited to text, graphics, logos, and software, is the property of Deeds Without Debt and is protected by copyright and other intellectual property laws.
            </p>
            <p className="text-gray-700">
              You may not reproduce, distribute, or create derivative works from our content without express written permission.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy</h2>
            <p className="text-gray-700">
              Your privacy is important to us. Please review our{' '}
              <Link href="/privacy" className="text-green-600 hover:text-green-700 font-semibold">
                Privacy Policy
              </Link>
              {' '}which explains how we collect, use, and protect your information.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your access to our Services immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p className="text-gray-700">
              You may unsubscribe from our email newsletter at any time using the unsubscribe link in any email.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Effective date."
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws of New Mexico, United States, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
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
              <li>Our content is educational only, not financial advice</li>
              <li>Tax deed investing has significant risks</li>
              <li>You're responsible for your own investment decisions</li>
              <li>We can terminate access if you violate these terms</li>
              <li>Consult professionals before investing</li>
            </ul>
            <p className="text-gray-600 text-sm mt-4 italic">
              These Terms are for informational purposes and do not constitute legal advice. For specific legal questions, consult an attorney.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
