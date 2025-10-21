import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PostCard from "@/components/PostCard";
import InvestorToolsModal from "@/components/InvestorToolsModal";
import { Link } from "wouter";
import { FileText, Calculator, Target, CheckCircle, Download, Package, ArrowRight, Calendar, Clock, User, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/content";
import type { Post } from "@/components/PostCard";
import { emailCaptureUtils } from "@/utils/emailCapture";
import ROUTES from "@/routes";

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const posts = getAllPosts().slice(0, 3);
    setLatestPosts(posts);
    
    // Check if user already has access
    setHasAccess(emailCaptureUtils.hasProvidedEmail());
  }, []);

  const handleGetAccess = () => {
    if (hasAccess) {
      // Direct download
      window.open('/downloads/due-diligence-checklist.pdf', '_blank');
      window.open('/downloads/state-research-guide.xlsx', '_blank');
      window.open('/downloads/auction-bid-tracker.xlsx', '_blank');
    } else {
      // Show email modal
    setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Update access status after modal closes
    setHasAccess(emailCaptureUtils.hasProvidedEmail());
  };

  return (
    <div>
      <Hero />
      <HowItWorks onSignupClick={() => setIsModalOpen(true)} />
      
      {/* Latest Issues - MAGAZINE STYLE REDESIGN */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Latest Issues
              </h2>
              <p className="text-xl text-gray-600">
                Fresh insights delivered weekly
              </p>
            </div>
            <Link 
              href="/archive"
              className="hidden md:inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 border-2 border-gray-200 transition-all"
            >
              View All Issues
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Featured Article - HERO STYLE */}
          <div className="mb-8">
            <article className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                
                {/* Image Side */}
                <Link href="/tax-sale-research-three-layers" className="relative h-80 lg:h-full overflow-hidden block">
                  <img 
                    src="/images/newsletter/tax-sale-research-due-diligence.jpg" 
                    alt="Stack of property research documents with reading glasses — representing tax sale research and due diligence."
                    width="800"
                    height="600"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                  
                  {/* NEW Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      NEW THIS WEEK
                    </span>
            </div>
            
                  {/* Category Badge */}
                  <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-full">
                      EDUCATIONAL
                    </span>
            </div>
                </Link>

                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <time className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      October 20, 2025
                    </time>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      8 min read
                    </span>
        </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    <Link href="/tax-sale-research-three-layers">
                      The 3 Layers of Tax Sale Research (Or: How to Not Buy Someone Else's Problem)
                    </Link>
            </h3>

                  {/* Excerpt */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    Avoid costly mistakes in tax sales by mastering the 3 layers of due diligence—tax history, title clarity, and property reality. Learn how pros research before they bid.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Educational</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Tax Sale Research</span>
                  </div>

                  {/* CTA */}
                  <Link 
                    href="/tax-sale-research-three-layers"
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-bold text-lg group/link"
                    aria-label="Read the Tax Sale Research Guide"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-6 w-6 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>

              </div>
            </article>
          </div>

          {/* Secondary Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Article 2 */}
            <article className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/images/articles/quiet-title-actions.jpg" 
                  alt="Quiet Title Actions"
                  width="400"
                  height="300"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    LEGAL
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                  <time>September 17, 2025</time>
                  <span>•</span>
                  <span>3 min read</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                  <Link href="/archive/quiet-title-actions">
                    Why Quiet Title Actions Are the Unsung Hero of Tax Deed Investing
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Quiet title explained: the legal process that secures your investment and unlocks property value. Learn how this step transforms tax sale wins into clean, financeable properties.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Legal</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Tax Deeds</span>
                </div>

                {/* CTA */}
                <Link 
                  href="/archive/quiet-title-actions"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>

            {/* Article 3 */}
            <article className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/images/articles/buy-without-banks.jpg" 
                  alt="Buy Without Banks"
                  width="400"
                  height="300"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                    STRATEGY
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                  <time>September 4, 2025</time>
                  <span>•</span>
                  <span>3 min read</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                  <Link href="/archive/3-proven-ways-to-buy-real-estate-without-banks">
                    3 Proven Ways to Buy Real Estate Without Banks: Tax Deeds, Tax Liens & HOA Foreclosures
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Learn how tax deeds, tax liens, and HOA foreclosures can open the door to real estate ownership without relying on traditional mortgages. No banks, no brokers — just opportunity.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Strategy</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Tax Liens</span>
                </div>

                {/* CTA */}
                <Link 
                  href="/archive/3-proven-ways-to-buy-real-estate-without-banks"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>

            {/* Article 4 */}
            <article className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/images/articles/connecticut-liens.jpg" 
                  alt="Connecticut Tax Liens"
                  width="400"
                  height="300"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                    CASE STUDY
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                  <time>August 28, 2025</time>
                  <span>•</span>
                  <span>5 min read</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                  <Link href="/archive/connecticut-tax-lien-returns">
                    How I Earned 18% on a Connecticut Tax Lien (Redeemed in 6 Months)
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  A real example of how Connecticut's 18% interest rate can generate solid returns. This case study breaks down the process from auction to redemption.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Case Study</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Connecticut</span>
                </div>

                {/* CTA */}
                <Link 
                  href="/archive/connecticut-tax-lien-returns"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>

            </div>

          {/* Mobile View All Button */}
          <div className="text-center md:hidden">
            <Link 
              href="/archive"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 border-2 border-gray-200 transition-all"
            >
              View All Issues
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* About Section - CENTERED HERO STYLE */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20 mb-6">
            <User className="h-4 w-4 text-green-400" />
            <span>About the Newsletter</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Building Wealth Through Tax Sales
            <br />
            <span className="text-green-400">Without Banks</span>
          </h2>

          {/* Bio Content - Concise */}
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed mb-8">
            <p>
              For over 12 years, I've been acquiring distressed properties across the country through tax deed and lien sales—no traditional financing required. Through this newsletter, I share the exact strategies and frameworks that have worked for me and my mentors (who bring 45+ years of combined experience).
            </p>
            
            <p>
              Every week, you'll get state-specific guides, real case studies, and actionable insights to help you confidently navigate tax sales—whether you're just starting or ready to scale.
            </p>
            
            <p className="text-xl font-semibold text-white">
              Ready to learn? Start with our state guides or dive into the latest newsletter.
                  </p>
                </div>

          {/* Stats Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-8 border-t border-b border-white/20 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">12+</div>
              <div className="text-sm text-gray-400 mt-1">Years Experience</div>
                </div>
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">50</div>
              <div className="text-sm text-gray-400 mt-1">States Covered</div>
              </div>
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">Weekly</div>
              <div className="text-sm text-gray-400 mt-1">Insights</div>
              </div>
            <div className="hidden sm:block w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">45+</div>
              <div className="text-sm text-gray-400 mt-1">Years Mentor Experience</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-xl hover:shadow-2xl"
            >
              Read Full Bio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <a 
              href="https://www.linkedin.com/in/ralphbiah" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
            >
              <Linkedin className="mr-2 h-5 w-5" />
              Connect on LinkedIn
            </a>
          </div>

        </div>
      </section>

      {/* Investor Tools Section - ENHANCED CARDS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
            <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Free Resources
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Investor Tools for No-Debt Real Estate Deals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download field-tested templates and calculators to buy without banks
            </p>
          </div>

          {/* Tools Grid - 3 Enhanced Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Tool 1 - Due Diligence Checklist */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-500">
              {/* Gradient Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Icon with Colored Background */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>

                {/* Badge */}
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4">
                  MOST POPULAR
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Pre-Auction Due Diligence Checklist
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  Complete property research methodology to avoid costly mistakes. Verify every property before bidding to eliminate landlocked parcels, environmental liens, and underwater deals.
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>40-point property verification checklist</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Red flags to avoid bad deals</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Title research workflow</span>
                  </li>
                </ul>

                {/* Format Tag */}
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                  <Download className="h-4 w-4" />
                  <span>PDF Format • Instant Download</span>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleGetAccess}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg group-hover:scale-105"
                >
                  {hasAccess ? 'Download Now' : 'Download Free'}
                  <Download className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Tool 2 - State Research Guide */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500">
              {/* Gradient Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Icon with Colored Background */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Calculator className="h-8 w-8 text-white" />
                </div>

                {/* Badge */}
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4">
                  COMPREHENSIVE
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  State Research Guide
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  Compare tax deed and lien laws across the 10 best states for investors. Understand redemption periods, interest rates, and investor advantages by state.
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>10 state comparison matrix</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Redemption periods & interest rates</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>County-level auction schedules</span>
                  </li>
                </ul>

                {/* Format Tag */}
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                  <Download className="h-4 w-4" />
                  <span>Excel Spreadsheet • Instant Download</span>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleGetAccess}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg group-hover:scale-105"
                >
                  {hasAccess ? 'Download Now' : 'Download Free'}
                  <Download className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Tool 3 - Auction Bid Tracker */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-500">
              {/* Gradient Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Icon with Colored Background */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>

                {/* Badge */}
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full mb-4">
                  ESSENTIAL TOOL
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Auction Bid Tracker
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  Spreadsheet to track multiple auctions, properties, and bidding results. Calculate maximum bids based on assessed values and total acquisition costs.
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Multi-property tracking system</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Automatic bid calculations</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>ROI analysis formulas</span>
                  </li>
                </ul>

                {/* Format Tag */}
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                  <Download className="h-4 w-4" />
                  <span>Excel Spreadsheet • Instant Download</span>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleGetAccess}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg group-hover:scale-105"
                >
                  {hasAccess ? 'Download Now' : 'Download Free'}
                  <Download className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom CTA - Get All Tools */}
          <div className="text-center">
            <button 
              onClick={handleGetAccess}
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              <Package className="mr-2 h-5 w-5" />
              {hasAccess ? 'Download All Tools' : 'Get All Free Tools'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <p className="text-sm text-gray-600 mt-4">
              {hasAccess ? 'Download all three tools instantly' : 'Enter your email once, download all three tools instantly • No spam, ever'}
            </p>
          </div>

        </div>
      </section>

      {/* Investor Tools Modal */}
      <InvestorToolsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

      {/* Development Reset Button - Remove in Production */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => {
            emailCaptureUtils.clearCapture();
            window.location.reload();
          }}
          className="fixed bottom-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm z-50"
        >
          Reset Email Capture (Dev Only)
        </button>
      )}
    </div>
  );
}
