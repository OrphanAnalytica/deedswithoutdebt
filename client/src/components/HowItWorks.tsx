import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Search, BookOpen, Home, Calendar } from "lucide-react";

interface HowItWorksProps {
  onSignupClick: () => void;
}

export default function HowItWorks({ onSignupClick }: HowItWorksProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Learning Path
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn the fundamentals of tax deed and lien investing through our free educational newsletter and state guides
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Step 1 */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition-all hover:shadow-xl">
              {/* Icon */}
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="h-8 w-8 text-white" />
              </div>

              {/* Step Number */}
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
                Step 1
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Subscribe & Learn
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                Get our free weekly newsletter with strategies, case studies, and practical guidance on tax deed and lien investing.
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {['Weekly educational content', 'Real-world examples', 'Beginner-friendly'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow Connector (desktop only) */}
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <ArrowRight className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl">
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="h-8 w-8 text-white" />
              </div>

              {/* Step Number */}
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">
                Step 2
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Research Your State
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                Use our state-specific guides to understand local laws, redemption periods, and auction procedures in your target market.
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {['State law summaries', 'County auction lists', 'Process timelines'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow Connector (desktop only) */}
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <ArrowRight className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 transition-all hover:shadow-xl">
              {/* Icon */}
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="h-8 w-8 text-white" />
              </div>

              {/* Step Number */}
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
                Step 3
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Apply What You Learn
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                Take our educational content and apply it to real opportunities. Start small, do your due diligence, and consult professionals.
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {['Start with research', 'Attend local auctions', 'Consult attorneys'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          {/* Two CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            
            {/* Primary CTA - Newsletter */}
            <button 
              onClick={onSignupClick}
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              Start Learning for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
            {/* Secondary CTA - Auctions */}
            <Link 
              href="/upcoming-auctions"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transition-all border-2 border-green-600 shadow-sm hover:shadow-md"
            >
              View Live Auctions
              <Calendar className="ml-2 h-5 w-5" />
            </Link>
            
          </div>
          
          {/* Disclaimer */}
          <p className="text-sm text-gray-600">
            No credit card required • Educational content only
          </p>
        </div>

      </div>
    </section>
  );
}