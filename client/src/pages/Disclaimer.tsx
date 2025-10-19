import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

const Disclaimer = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-gray-600 mb-4">
            <strong>Effective date:</strong> October 14, 2025
          </p>
          <p className="text-gray-700">
            Deeds Without Debt ("we," "us," "our") operates deedswithoutdebt.com and the Deeds Without Debt newsletter (the "Services"). By using the Services, you acknowledge and agree to the statements below. This Disclaimer complements our{' '}
            <Link href="/terms" className="text-green-600 hover:text-green-700 font-semibold">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-green-600 hover:text-green-700 font-semibold">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Educational Content Only — Not Legal, Tax, or Investment Advice</h2>
            <p className="text-gray-700 mb-3">
              All content on the Services—including articles, guides, state/county summaries, checklists, tools, and emails—is provided for educational and informational purposes only.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>We are not your attorney, CPA, financial advisor, broker, or fiduciary.</li>
              <li>Nothing on the Services constitutes legal, tax, financial, accounting, or investment advice, nor a solicitation to buy or sell any security or property.</li>
              <li>Before acting on any information, you should consult a qualified professional familiar with your situation and local laws.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. No Professional-Client Relationship</h2>
            <p className="text-gray-700">
              Accessing or receiving content from the Services does not create an attorney-client, advisor-client, or other professional relationship with us.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Accuracy, Completeness, and Timeliness</h2>
            <p className="text-gray-700 mb-3">
              We aim to be accurate and current, but tax sale laws, procedures, fees, redemption periods, and auction schedules change frequently and can vary by county and even by specific parcel.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Information may be incomplete, outdated, or differ from local practice.</li>
              <li>You are solely responsible for verifying all details directly with official sources (state statutes, county treasurer/collector, sheriff, or tax sale vendor) before bidding or making any financial decision.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Risks of Tax Lien & Tax Deed Investing</h2>
            <p className="text-gray-700 mb-3">
              Investing in tax liens/deeds involves material risk, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Title defects</li>
              <li>Municipal liens and special assessments</li>
              <li>IRS interests</li>
              <li>Hazardous property conditions</li>
              <li>Occupancy/eviction issues</li>
              <li>Quiet title costs</li>
              <li>Non-marketable title</li>
              <li>Demolitions or code violations</li>
              <li>Market illiquidity</li>
            </ul>
            <p className="text-gray-700 mb-3">
              <strong>Past results do not guarantee future outcomes.</strong>
            </p>
            <p className="text-gray-700">
              Only invest money you can afford to lose and perform independent due diligence.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Content, Tools, and Links</h2>
            <p className="text-gray-700 mb-3">
              The Services may reference or link to third-party websites, statutes, county portals, auction platforms, calculators, or documents. These are provided for convenience only.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>We do not control, endorse, or assume responsibility for any third-party content, policies, accuracy, or availability.</li>
              <li>Use of third-party services is at your own risk and subject to their terms.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Reviews, Testimonials, Examples, and Case Studies</h2>
            <p className="text-gray-700">
              Any testimonials, case studies, or results described on the Services reflect individual experiences and are not typical; they are not guarantees of the results you will achieve. Examples are illustrative and may omit relevant facts or context.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Sponsored Content & Affiliate Links (when applicable)</h2>
            <p className="text-gray-700 mb-3">
              From time to time, we may include sponsorships or affiliate links.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>We only recommend tools or services we believe are useful, but our opinions are our own.</li>
              <li>If you purchase through an affiliate link, we may earn a commission at no extra cost to you.</li>
              <li>We will make commercially reasonable efforts to clearly disclose sponsored placements or affiliate relationships where required.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. "As-Is" and "As-Available" Basis</h2>
            <p className="text-gray-700 uppercase">
              THE SERVICES AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ACCURACY, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 uppercase">
              TO THE FULLEST EXTENT PERMITTED BY LAW, DEEDS WITHOUT DEBT AND ITS OWNERS, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, DATA, OR USE, ARISING FROM OR RELATED TO YOUR USE OF (OR RELIANCE ON) THE SERVICES. WHERE LIABILITY CANNOT BE DISCLAIMED, IT IS LIMITED AS DESCRIBED IN OUR{' '}
            </p>
            <Link href="/terms" className="text-green-600 hover:text-green-700 font-semibold uppercase">
              TERMS OF SERVICE
            </Link>
            .
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. User Responsibility</h2>
            <p className="text-gray-700 mb-3">You are solely responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Conducting your own due diligence;</li>
              <li>Consulting qualified professionals; and</li>
              <li>Complying with all applicable laws and regulations in your jurisdiction.</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Disclaimer</h2>
            <p className="text-gray-700">
              We may update this Disclaimer from time to time. The "Effective date" will indicate the latest version. Material changes will be highlighted for clarity.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
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
          <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plain-English Summary</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>We teach; we don't advise.</strong></li>
              <li>Double-check laws and auction details with official county/state sources.</li>
              <li>Tax sale investing has real risks.</li>
              <li>We're not liable for decisions you make using our materials.</li>
              <li>Sponsored or affiliate content may appear; we'll disclose when it does.</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Disclaimer;





