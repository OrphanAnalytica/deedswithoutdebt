/**
 * Unified image resolution helper for newsletter cover images
 * Handles multiple image field names and provides consistent fallback logic
 */

/**
 * Resolves cover image with priority order and fallback logic
 * @param raw - Raw image value from frontmatter/data
 * @returns Resolved image URL
 */
export function resolveCoverImage(raw?: string): string {
  // Handle empty/undefined values
  if (!raw || raw.trim() === '') {
    return '/images/articles/buy-without-banks.jpg'; // Fallback placeholder
  }

  // If it's already an absolute URL, use as-is
  if (raw.startsWith('http')) {
    return raw;
  }

  // If it starts with '/', check for newsletter vs newsletters directory mismatch
  if (raw.startsWith('/')) {
    // Fix common path issues: /images/newsletter/ -> /images/newsletters/
    if (raw.includes('/images/newsletter/') && !raw.includes('/images/newsletters/')) {
      return raw.replace('/images/newsletter/', '/images/newsletters/');
    }
    return raw;
  }

  // If it's just a filename, prefix with newsletters directory
  return `/images/newsletters/${raw}`;
}

/**
 * Resolves cover image from multiple possible field names
 * @param post - Post/newsletter object with potential image fields
 * @returns Resolved image URL
 */
export function resolvePostCoverImage(post: {
  heroImage?: string;
  coverImage?: string;
  image?: string;
  [key: string]: any;
}): string {
  const raw = post.heroImage || post.coverImage || post.image || '';
  return resolveCoverImage(raw);
}
