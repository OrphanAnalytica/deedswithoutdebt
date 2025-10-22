import React, { useState } from 'react';
import { Link } from 'wouter';
import { Mail, MapPin, Clock, HelpCircle, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const mailtoLink = `mailto:info@deedswithoutdebt.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about tax sales, liens, or deeds? We're here to help. Choose the best way to reach us below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Company Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Parent Company</p>
                  <p className="font-semibold text-gray-900">Biah Capital Holdings Ltd. Co.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Brand</p>
                  <p className="font-semibold text-gray-900">Deeds Without Debt</p>
                </div>
              </div>
            </div>

            {/* Email Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Email Us</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">General & Support</p>
                  <a 
                    href="mailto:info@deedswithoutdebt.com" 
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    info@deedswithoutdebt.com
                  </a>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Business & Partnerships</p>
                  <a 
                    href="mailto:biahcapital@gmail.com" 
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    biahcapital@gmail.com
                  </a>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> We do not provide phone support. Please use email for all inquiries.
                  </p>
                </div>
              </div>
            </div>

            {/* Mailing Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Mailing Address</h2>
              </div>
              <address className="not-italic text-gray-700">
                PO BOX 3163<br />
                Las Cruces, NM 88003<br />
                United States
              </address>
            </div>

            {/* Response Time */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900">Response Time</h3>
              </div>
              <p className="text-sm text-gray-700">
                We typically respond within <strong>1-2 business days</strong>. For urgent matters, please mark your subject line as "URGENT."
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a topic...</option>
                    <option value="General Question">General Question</option>
                    <option value="State Guide Question">State Guide Question</option>
                    <option value="Newsletter Subscription">Newsletter Subscription</option>
                    <option value="Partnership Inquiry">Partnership Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>

                <p className="text-sm text-gray-600 text-center">
                  By submitting this form, you agree to our{' '}
                  <Link href="/terms" className="text-green-600 hover:text-green-700 font-semibold">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-green-600 hover:text-green-700 font-semibold">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>

            {/* Quick Help Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Before You Contact Us</h3>
              </div>
              <p className="text-gray-700 mb-4">
                You might find your answer faster by checking these resources:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <Link href="/state-guides" className="text-green-600 hover:text-green-700 font-semibold">
                      State Guides
                    </Link>
                    <span className="text-gray-600"> - Detailed information on tax sales by state</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <Link href="/archive" className="text-green-600 hover:text-green-700 font-semibold">
                      Newsletter Archive
                    </Link>
                    <span className="text-gray-600"> - Past articles and guides</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <Link href="/resources" className="text-green-600 hover:text-green-700 font-semibold">
                      Resources
                    </Link>
                    <span className="text-gray-600"> - Tools, templates, and learning materials</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <Link href="/disclaimer" className="text-green-600 hover:text-green-700 font-semibold">
                      Disclaimer
                    </Link>
                    <span className="text-gray-600"> - Important information about our educational content</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Legal Links Footer */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/terms" className="text-gray-600 hover:text-green-600 font-medium">
              Terms of Service
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/privacy" className="text-gray-600 hover:text-green-600 font-medium">
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/disclaimer" className="text-gray-600 hover:text-green-600 font-medium">
              Disclaimer
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;









