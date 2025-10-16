import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Check, MapPin, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Free Educational Newsletter</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Master Tax Deed & Lien Investing
              <br />
              <span className="text-green-400">Without the Confusion</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-300 leading-relaxed">
              Step-by-step guidance, state-specific resources, and live auction lists to help you confidently acquire properties outside traditional financing—no guesswork required.
            </p>

            {/* Benefits List */}
            <div className="space-y-3">
              {[
                'Weekly newsletter with actionable strategies',
                'State-by-state guides (growing library)',
                'County auction calendars and dates',
                'Real examples and case studies'
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-gray-900" />
                  </div>
                  <span className="text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/subscribe"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-xl hover:shadow-2xl"
              >
                Get Free Newsletter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/archive"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                Browse Archive
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm text-gray-400">Newsletter</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-2xl font-bold">Weekly</div>
                <div className="text-sm text-gray-400">Issues</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-2xl font-bold">50 States</div>
                <div className="text-sm text-gray-400">Coverage</div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Floating Card 1 */}
              <div className="absolute top-0 right-0 w-80 bg-white rounded-xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Live Auction Calendar</div>
                    <div className="text-sm text-gray-600">Updated Weekly</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Track upcoming tax sales across all 50 states</div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute top-32 left-0 w-80 bg-white rounded-xl shadow-2xl p-6 transform -rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">18% Return</div>
                    <div className="text-sm text-gray-600">Connecticut Lien</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Example: Redeemed in 6 months</div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-green-400/20 blur-3xl -z-10 transform scale-150"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
