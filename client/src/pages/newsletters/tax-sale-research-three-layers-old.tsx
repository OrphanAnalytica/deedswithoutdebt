import { useEffect } from "react";
import { ArrowLeft, Calendar, Clock, User, Mail, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { Link } from "wouter";
import { setSEOData, setArticleSchema } from "@/lib/seo";
import { resolveCoverImage } from "@/lib/images";
import ArticleLayout from "@/layouts/ArticleLayout";
import { ProTip, ExampleBox, WarningBox } from "@/components/EditorialBoxes";

export default function TaxSaleResearchThreeLayers() {
  useEffect(() => {
    // Set SEO data
    setSEOData({
      title: "The 3 Layers of Tax Sale Research | Deeds Without Debt",
      description: "Master the 3 layers of tax sale research — tax history, title clarity, and property reality — to avoid costly mistakes in tax deed and lien investing.",
      canonical: "/tax-sale-research-three-layers",
      ogImage: "https://deedswithoutdebt.com/images/newsletter/tax-sale-research-due-diligence.jpg",
      ogType: "article"
    });

    // Set Article schema
    setArticleSchema({
      headline: "The 3 Layers of Tax Sale Research (Or: How to Not Buy Someone Else's Problem)",
      description: "Master the 3 layers of tax sale research — tax history, title clarity, and property reality — to avoid costly mistakes in tax deed and lien investing.",
      image: "https://deedswithoutdebt.com/images/newsletter/tax-sale-research-due-diligence.jpg",
      datePublished: "2025-10-20",
      dateModified: "2025-10-20",
      wordCount: 1200,
      articleSection: "Tax Sale Research",
      keywords: ["Tax Deed Investing", "Tax Lien Investing", "Tax Sale Research"],
      url: "https://deedswithoutdebt.com/tax-sale-research-three-layers"
    });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (tag: string) => {
    const tagColors: { [key: string]: string } = {
      'Tax Deeds': 'bg-green-100 text-green-800',
      'Tax Liens': 'bg-red-100 text-red-800',
      'Due Diligence': 'bg-blue-100 text-blue-800',
      'Research': 'bg-purple-100 text-purple-800',
      'Strategy': 'bg-purple-100 text-purple-800',
      'Real Estate Investing': 'bg-blue-100 text-blue-800'
    };
    return tagColors[tag] || 'bg-gray-100 text-gray-800';
  };

  const tags = ['Tax Deeds', 'Tax Liens', 'Due Diligence', 'Research', 'Strategy'];

  const shareUrl = "https://deedswithoutdebt.com/tax-sale-research-three-layers";
  const shareTitle = "The 3 Layers of Tax Sale Research | Deeds Without Debt";
  const shareDescription = "Master the 3 layers of tax sale research to avoid costly mistakes in tax deed and lien investing.";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header with Gradient */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Navigation */}
            <div className="mb-6">
              <Link 
                href="/archive" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Archive
              </Link>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-6 leading-tight">
              The 3 Layers of Tax Sale Research (Or: How to Not Buy Someone Else's Problem)
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{formatDate("2025-10-20")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">8 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Written by Ralph Biah</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={resolveCoverImage("/images/newsletter/tax-sale-research-due-diligence.jpg")}
              alt="Stack of property research documents with reading glasses — representing tax sale research and due diligence."
              className="w-full h-64 object-cover rounded-2xl shadow-md"
              width={1200}
              height={630}
              loading="lazy"
            />
          </div>

          {/* Excerpt Card */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-md border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-1 h-full bg-green-600 rounded-full mt-1"></div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Article Summary</h2>
                <p className="text-gray-700 leading-relaxed italic">
                  Most investors lose money in tax sales before the auction even begins — by skipping critical research steps. 
                  This guide breaks down the 3 layers of due diligence every tax deed and lien investor must master to avoid costly mistakes.
                </p>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-700 prose-li:text-gray-700">
              
              <p className="text-lg text-gray-800 font-medium mb-6">
                Here's the thing no one tells you about tax deed and tax lien investing: Most people don't lose money at the auction.
                They lose it three weeks earlier—at their kitchen table—when they convince themselves that a $80,000 assessed property with a $3,200 opening bid is "probably fine."
              </p>

              <p className="mb-6">
                I've done it. You do the math — "$3,200 in, sell for $100K, I'm a genius." Then two months later, you're staring at a demolition order from 2019, a federal tax lien you didn't catch, and a landlocked parcel with no legal access.
              </p>

              <p className="mb-6">
                <strong>Cool. Cool cool cool.</strong>
              </p>

              <p className="mb-8">
                So today's topic: how not to buy someone else's problem.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Framework: Three Layers of Real Research</h2>
              
              <p className="mb-4">
                Most beginners treat due diligence like a checklist.
              </p>
              
              <p className="mb-4">
                Zillow? Check. Drive-by? Check.
              </p>
              
              <p className="mb-6">
                That's not a system — that's hoping.
              </p>

              <p className="mb-4">
                Here's the real framework:
              </p>

              <ol className="list-decimal list-inside mb-8 space-y-2">
                <li><strong>Tax History</strong> — What does the county know?</li>
                <li><strong>Title Clarity</strong> — What's legally attached to the property?</li>
                <li><strong>Property Reality</strong> — What's actually there?</li>
              </ol>

              <p className="mb-8">
                You start with the paper trail — the boring stuff — because if the numbers or title don't work, there's no point driving three hours to a property you'll never buy.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Layer 1: Tax History (the county's side of the story)</h2>
              
              <p className="mb-4">
                This is where most people start and stop. Don't.
              </p>

              <p className="mb-4">
                Here's what you actually want to pull:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Payment patterns</h3>
              <p className="mb-4">
                Grab 10 years of tax history if you can. If someone paid on time for 8 years then suddenly stopped, that's life event territory — not necessarily a problem property. Chronic delinquency since 2017? Something's wrong with that parcel.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Owed amount vs. assessed value</h3>
              <p className="mb-4">
                A property assessed at $85K with $4K in back taxes is a different story from a $12K property with $18K owed. The second one's toxic for a reason.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Redemption rates</h3>
              <p className="mb-4">
                If 60% of tax sales in a county redeem within 6 months, factor that in. Redemption isn't bad — unless you were counting on owning it.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Special assessments</h3>
              <p className="mb-6">
                Pending sewer or road projects can drop on you post-sale. I've seen investors win at $5K and get hit with a $12K bill from the town council a month later. It's public info — just buried.
              </p>

              <p className="mb-8">
                <strong>Pro move:</strong> Don't stop at the delinquent list. Pull the full tax card look for exemptions, lot splits, prior sales, and old re-assessments. That tells you the property's story.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Layer 2: Title Clarity (what's hiding in the stack)</h2>
              
              <p className="mb-4">
                Here's where most investors get burned.
              </p>
              
              <p className="mb-4">
                Title work isn't sexy. But neither is buying a house with a $70K IRS lien that didn't get wiped.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Chain of title</h3>
              <p className="mb-4">
                Look back at least 2–3 owners. Watch for quitclaim deeds, rapid flips, and weird entity transfers — all red flags.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Liens & judgments</h3>
              <p className="mb-4">
                Federal, state, HOA, mechanic's, child support — know which ones survive tax sales in your state. When in doubt, call a title attorney. $300 now beats $30,000 later.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Easements & right-of-way</h3>
              <p className="mb-4">
                A utility easement? Fine. A driveway easement through your backyard? Not fine. Check recorded plats and deeds for "subject to easements of record."
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Code violations & demo orders</h3>
              <p className="mb-6">
                Some municipalities attach them to the property itself. That 2021 demo order? Still your problem after you win. Check municipal records — this is $10K-problem territory hiding under a $2K bid.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
                <p className="text-blue-800 font-medium mb-2">Example:</p>
                <p className="text-blue-700">
                  Investor buys a house in Kansas for $8,500. Hidden in public record — an open building code violation for an unpermitted addition plus a "cure or demolish" notice. Now they own something they can't sell, rent, or finance until they spend more tearing it down or wait out a 9-month variance. All of it was public record. They just didn't check.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Layer 3: Property Reality (boots on the ground)</h2>
              
              <p className="mb-4">
                The paper looks good. The title's clean.
              </p>
              
              <p className="mb-4">
                Now go see it.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Access</h3>
              <p className="mb-4">
                Is it reachable by a public road? Paper roads, gated trails, and missing easements happen more often than you think.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Actual condition</h3>
              <p className="mb-4">
                Roof? Squatters? Structural collapse? County photos are often 8 years old. Don't trust them.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Neighborhood context</h3>
              <p className="mb-4">
                Best house on a bad block, or worst house on a great one?
                This matters more than most new investors realize.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Utilities & infrastructure</h3>
              <p className="mb-6">
                City water and sewer? Active or disconnected? In rural areas — check for wells and septic. Reconnection can cost thousands.
              </p>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
                <p className="text-green-800 font-medium mb-2">Pro tip:</p>
                <p className="text-green-700">
                  If you're buying out of state, pay $100–150 for a drive-by report with photos. GIS lies. Street View is outdated. The assessor's office is overly optimistic.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Putting It All Together</h2>
              
              <p className="mb-4">
                Start with Layer 1: Run the numbers.
              </p>
              
              <p className="mb-4">
                If it doesn't make sense, move on.
              </p>

              <p className="mb-4">
                Then Layer 2: Pull the title.
              </p>
              
              <p className="mb-4">
                If you see something weird, ask a professional.
              </p>

              <p className="mb-4">
                Then Layer 3: See it with your own eyes.
              </p>

              <p className="mb-6">
                Only then decide whether to bid.
              </p>

              <p className="mb-4">
                Most new investors do it backwards:
              </p>
              
              <p className="mb-4">
                They fall in love with the photos first, skim the taxes second, and skip the title completely. That's how you end up with a beautiful property and a $90K federal lien that didn't get wiped.
              </p>

              <p className="mb-8">
                <strong>Do the boring work first. It pays better than the exciting stuff.</strong>
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Action Step This Week</h2>
              
              <p className="mb-4">
                Pick one property from an upcoming auction in your target county. Even if you're not bidding — use it for practice.
              </p>

              <p className="mb-4">
                Run it through all three layers:
              </p>

              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>✅ Pull the full tax history</li>
                <li>✅ Check recorded liens and the deed</li>
                <li>✅ Pull GIS + Street View (or drive by)</li>
              </ul>

              <p className="mb-4">
                Write down what you learn.
              </p>
              
              <p className="mb-4">
                See how long it takes.
              </p>
              
              <p className="mb-4">
                See what surprises you.
              </p>

              <p className="mb-8">
                Because when auction day comes, you'll know what you're buying — while everyone else is guessing.
              </p>

              <p className="mb-4">
                See you Wednesday for the upcoming auctions piece.
              </p>
              
              <p className="mb-4">
                Until then, do the boring work — it pays better than the exciting stuff.
              </p>

              <p className="mb-8">
                See you Wednesday,
              </p>
              
              <p className="mb-8">
                – Ralph Biah
              </p>
              
              <p className="text-sm text-gray-600 italic">
                Founder, Deeds Without Debt
              </p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="bg-white rounded-2xl p-6 mt-8 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share this article
            </h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mt-8 text-white text-center">
            <Mail className="w-8 h-8 mx-auto mb-4 text-white/90" />
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              Get weekly insights on tax deed and lien investing delivered straight to your inbox.
            </p>
            <Link 
              href="/subscribe"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Subscribe to Newsletter
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/archive" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Archive
            </Link>
            
            <div className="text-sm text-gray-500">
              Published on {formatDate("2025-10-20")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
