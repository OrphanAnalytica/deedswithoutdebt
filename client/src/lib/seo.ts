interface SEOData {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

interface ArticleData {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  wordCount?: number;
  articleSection: string;
  keywords?: string[];
  url: string;
}

export function setSEOData({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false
}: SEOData) {
  // Update document title
  if (title) {
    document.title = title;
  }

  // Update meta description
  if (description) {
    updateMetaTag("description", description);
  }

  // Update canonical URL
  if (canonical) {
    updateLinkTag("canonical", `https://deedswithoutdebt.com${canonical}`);
  }

  // Update Open Graph tags
  updateMetaTag("og:title", title || document.title, "property");
  updateMetaTag("og:description", description || "", "property");
  updateMetaTag("og:type", ogType, "property");
  if (canonical) {
    updateMetaTag("og:url", `https://deedswithoutdebt.com${canonical}`, "property");
  }
  if (ogImage) {
    updateMetaTag("og:image", ogImage, "property");
  }

  // Update Twitter Card tags
  updateMetaTag("twitter:title", title || document.title, "name");
  updateMetaTag("twitter:description", description || "", "name");
  if (ogImage) {
    updateMetaTag("twitter:image", ogImage, "name");
  }

  // Update robots meta tag
  if (noindex) {
    updateMetaTag("robots", "noindex,nofollow");
  } else {
    updateMetaTag("robots", "index,follow");
  }
}

function updateMetaTag(name: string, content: string, attribute: "name" | "property" = "name") {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute("content", content);
}

function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  
  link.setAttribute("href", href);
}

export function generateJSONLD(type: "Organization" | "BlogPosting" | "BreadcrumbList" | "Article", data: any) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  
  let jsonLD: any = {
    "@context": "https://schema.org"
  };

  if (type === "Organization") {
    jsonLD = {
      ...jsonLD,
      "@type": "Organization",
      name: "Deeds Without Debt",
      url: "https://deedswithoutdebt.com",
      logo: "https://deedswithoutdebt.com/logo.png",
      description: "Alternative real estate investing newsletter focusing on tax deeds, tax liens, and probate deals",
      sameAs: [
        "https://linkedin.com/company/deeds-without-debt"
      ],
      ...data
    };
  } else if (type === "BlogPosting") {
    jsonLD = {
      ...jsonLD,
      "@type": "BlogPosting",
      headline: data.title,
      description: data.description,
      image: data.image,
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      author: {
        "@type": "Person",
        name: "Ralph Biah",
        url: "https://deedswithoutdebt.com/about"
      },
      publisher: {
        "@type": "Organization",
        name: "Deeds Without Debt",
        logo: {
          "@type": "ImageObject",
          url: "https://deedswithoutdebt.com/logo.png"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.url
      },
      ...data
    };
  } else if (type === "BreadcrumbList") {
    jsonLD = {
      ...jsonLD,
      "@type": "BreadcrumbList",
      itemListElement: data.breadcrumbs.map((breadcrumb: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url
      }))
    };
  } else if (type === "Article") {
    jsonLD = {
      ...jsonLD,
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.url
      },
      headline: data.headline,
      description: data.description,
      image: data.image || "https://deedswithoutdebt.com/images/dwd-logo.png",
      author: {
        "@type": "Person",
        name: "Ralph Biah",
        url: "https://www.linkedin.com/in/ralph-biah-260a5253/"
      },
      publisher: {
        "@type": "Organization",
        name: "Deeds Without Debt",
        logo: {
          "@type": "ImageObject",
          url: "https://deedswithoutdebt.com/images/dwd-logo.png"
        }
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified || new Date().toISOString(),
      wordCount: data.wordCount,
      articleSection: data.articleSection,
      keywords: data.keywords || ["Tax Deed Investing", "Tax Lien Investing", "Real Estate", "Foreclosure Auctions"]
    };
  }

  script.textContent = JSON.stringify(jsonLD);
  
  // Remove existing JSON-LD script if exists
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }
  
  document.head.appendChild(script);
}

export function setBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>) {
  generateJSONLD("BreadcrumbList", { breadcrumbs });
}

export function setArticleSchema(articleData: ArticleData) {
  generateJSONLD("Article", articleData);
}

export function estimateWordCount(text: string): number {
  return text.split(/\s+/).length;
}
