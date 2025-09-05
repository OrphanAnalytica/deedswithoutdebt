interface SEOData {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
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

export function generateJSONLD(type: "Organization" | "BlogPosting", data: any) {
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
  }

  script.textContent = JSON.stringify(jsonLD);
  
  // Remove existing JSON-LD script if exists
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }
  
  document.head.appendChild(script);
}
