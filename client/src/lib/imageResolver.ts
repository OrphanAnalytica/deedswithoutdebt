/**
 * Image resolver utility for handling static assets in Vite
 * Handles both development and production environments with proper fallbacks
 */

import React from 'react';

export interface ImageResolverOptions {
  fallbackToArticles?: boolean;
  fallbackToPlaceholder?: boolean;
}

/**
 * Resolves image paths for static assets, handling Vite's BASE_URL and fallbacks
 * @param imagePath - The image path (relative or absolute)
 * @param options - Configuration options for fallback behavior
 * @returns Resolved image URL
 */
export function resolveImagePath(
  imagePath: string, 
  options: ImageResolverOptions = {}
): string {
  const { fallbackToArticles = true, fallbackToPlaceholder = true } = options;

  // Handle empty or undefined paths
  if (!imagePath || imagePath.trim() === '') {
    return fallbackToPlaceholder ? resolveImagePath('/images/placeholder.jpg', { fallbackToArticles: false, fallbackToPlaceholder: false }) : '';
  }

  // If it's already an absolute URL, return as-is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Ensure the path starts with a slash
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  // Build the resolved URL with BASE_URL
  const baseUrl = import.meta.env.BASE_URL || '';
  const resolvedUrl = `${baseUrl}${normalizedPath}`;

  // Return the original path first - fallbacks will be handled by the error handler
  return resolvedUrl;
}

/**
 * Creates an image element with proper error handling and fallbacks
 * @param src - The image source path
 * @param alt - Alt text for the image
 * @param options - Image resolver options
 * @returns Object with resolved src and error handling props
 */
export function createImageProps(
  src: string,
  alt: string,
  options: ImageResolverOptions = {}
) {
  const resolvedSrc = resolveImagePath(src, options);
  
  return {
    src: resolvedSrc,
    alt,
    onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const img = e.currentTarget;
      
      // Try fallback to articles directory if not already there
      if (options.fallbackToArticles && img.src.includes('/images/newsletters/')) {
        const fallbackSrc = img.src.replace('/images/newsletters/', '/images/articles/');
        img.src = fallbackSrc;
        return;
      }
      
      // Try placeholder if enabled
      if (options.fallbackToPlaceholder) {
        img.src = resolveImagePath('/images/placeholder.jpg', { fallbackToArticles: false, fallbackToPlaceholder: false });
      }
    }
  };
}

/**
 * Hook for managing image loading with fallbacks
 * @param imagePath - The image path
 * @param options - Image resolver options
 * @returns Object with image state and handlers
 */
export function useImageResolver(
  imagePath: string,
  options: ImageResolverOptions = {}
) {
  const [currentSrc, setCurrentSrc] = React.useState(() => 
    resolveImagePath(imagePath, { ...options, fallbackToArticles: false })
  );
  const [hasError, setHasError] = React.useState(false);
  const [fallbackAttempted, setFallbackAttempted] = React.useState(false);

  const handleError = React.useCallback(() => {
    if (hasError) return; // Prevent infinite loops
    
    setHasError(true);
    
    // Try fallback to articles directory first
    if (options.fallbackToArticles && !fallbackAttempted && currentSrc.includes('/images/newsletters/')) {
      const fallbackSrc = currentSrc.replace('/images/newsletters/', '/images/articles/');
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setFallbackAttempted(true);
      return;
    }
    
    // Try placeholder as final fallback
    if (options.fallbackToPlaceholder) {
      setCurrentSrc(resolveImagePath('/images/placeholder.jpg', { 
        fallbackToArticles: false, 
        fallbackToPlaceholder: false 
      }));
    }
  }, [currentSrc, hasError, options, fallbackAttempted]);

  return {
    src: currentSrc,
    onError: handleError,
    hasError
  };
}
