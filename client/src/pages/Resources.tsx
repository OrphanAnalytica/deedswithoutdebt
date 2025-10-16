import { useEffect } from "react";
import { setSEOData } from "@/lib/seo";
import { Calculator, MapPin, BookOpen, CheckCircle, AlertTriangle, TrendingUp, Shield, Download } from "lucide-react";

export default function Resources() {
  useEffect(() => {
    setSEOData({
      title: "Free Resources | Deeds Without Debt",
      description: "Download free tools, templates, and guides for alternative real estate investing. Tax deed checklists, calculators, scripts, and more.",
      canonical: "/resources",
    });
  }, []);

  const handleDownload = (filename: string) => {
    const fileUrl = `/downloads/${filename}`;
    
    // First: Open in new tab for viewing
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
    
    // Second: Trigger automatic PDF download via print
    setTimeout(() => {
      // Create hidden iframe for printing
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = 'none';
      printFrame.src = fileUrl;
      
      document.body.appendChild(printFrame);
      
      // Wait for content to load, then trigger print
      printFrame.onload = () => {
        setTimeout(() => {
          try {
            printFrame.contentWindow?.focus();
            printFrame.contentWindow?.print();
          } catch (e) {
            console.error('Print failed:', e);
          }
          
          // Clean up iframe after printing
          setTimeout(() => {
            document.body.removeChild(printFrame);
          }, 1000);
        }, 500);
      };
    }, 300); // Small delay so tab opens first
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Your Complete Tax Sale Toolkit
          </h1>
          <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed">
            Download proven checklists, calculators, and guides to help you research smarter, bid confidently, and close profitable real estate deals without banks.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Section 1: Tax Deed Essentials */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 mt-16 first:mt-0">
            TAX DEED ESSENTIALS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceCard
              icon={<AlertTriangle className="h-8 w-8" />}
              iconColor="orange"
              title="Property Red Flags Checklist"
              description="Eliminate 80% of bad deals in 10 minutes"
              filename="DWD_Property_Red_Flags_Checklist.html"
              onDownload={handleDownload}
            />
            <ResourceCard
              icon={<Calculator className="h-8 w-8" />}
              iconColor="green"
              title="Financial Analysis Worksheet"
              description="Calculate your maximum bid & profit potential"
              filename="DWD_Financial_Analysis_Worksheet.html"
              onDownload={handleDownload}
            />
            <ResourceCard
              icon={<CheckCircle className="h-8 w-8" />}
              iconColor="green"
              title="Auction Day Preparation Guide"
              description="Complete checklist for auction success"
              filename="DWD_Auction_Day_Preparation_Guide.html"
              onDownload={handleDownload}
            />
          </div>
        </section>

        {/* Section 2: Tax Lien Essentials */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 mt-16">
            TAX LIEN ESSENTIALS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceCard
              icon={<Shield className="h-8 w-8" />}
              iconColor="blue"
              title="Lien Validation Checklist"
              description="Verify before you buy – avoid worthless liens"
              filename="DWD_Lien_Validation_Checklist.html"
              onDownload={handleDownload}
            />
            <ResourceCard
              icon={<TrendingUp className="h-8 w-8" />}
              iconColor="green"
              title="Interest Calculator & ROI Worksheet"
              description="Project returns based on redemption timing"
              filename="DWD_Interest_Calculator_ROI_Worksheet.html"
              onDownload={handleDownload}
            />
            <ResourceCard
              icon={<CheckCircle className="h-8 w-8" />}
              iconColor="green"
              title="Auction Day Preparation Guide"
              description="Complete checklist for auction success"
              filename="DWD_Auction_Day_Preparation_Guide.html"
              onDownload={handleDownload}
            />
          </div>
        </section>

        {/* Section 3: Universal Investor Tools */}
        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 mt-16">
            UNIVERSAL INVESTOR TOOLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceCard
              icon={<MapPin className="h-8 w-8" />}
              iconColor="blue"
              title="State Comparison Matrix"
              description="Find the best states for your investment strategy"
              filename="DWD_State_Comparison_Matrix.html"
              onDownload={handleDownload}
            />
            <ResourceCard
              icon={<BookOpen className="h-8 w-8" />}
              iconColor="orange"
              title="What Can Actually Go Wrong"
              description="Honest truth about tax sale risks & solutions"
              filename="DWD_What_Can_Actually_Go_Wrong.html"
              onDownload={handleDownload}
            />
          </div>
        </section>
      </div>

      {/* Upgrade CTA Section */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready for live auction data, state guides, and advanced tools?
          </h2>
          <p className="font-sans text-lg text-muted-foreground mb-8">
            Upgrade to Pro for complete access to all resources and tools.
          </p>
          <a
            href="/upgrade"
            className="inline-block bg-primary text-primary-foreground font-mono font-semibold py-3 px-8 rounded-lg hover:bg-secondary transition-colors"
          >
            Upgrade to Pro →
          </a>
        </div>
      </section>
    </div>
  );
}

// ✅ Reusable Resource Card Component
function ResourceCard({
  icon,
  iconColor,
  title,
  description,
  filename,
  onDownload,
}: {
  icon: React.ReactNode;
  iconColor: "orange" | "green" | "blue";
  title: string;
  description: string;
  filename: string;
  onDownload: (filename: string) => void;
}) {
  const iconColorClasses = {
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Icon Container */}
      <div className={`${iconColorClasses[iconColor]} rounded-full p-3 w-fit mb-4`}>
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      {/* Description */}
      <p className="font-sans text-gray-600 mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      
      {/* Download Button - HIGHLY VISIBLE */}
      <button
        onClick={() => onDownload(filename)}
        className="w-full bg-primary hover:bg-secondary text-primary-foreground font-mono font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Download className="h-5 w-5" />
        Download Free
      </button>
    </div>
  );
}
