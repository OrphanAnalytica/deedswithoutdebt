// src/routes.ts

export const ROUTES = {
  HOME: '/',
  ARCHIVE: '/archive',
  ABOUT: '/about',
  RESOURCES: '/resources',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  DISCLAIMER: '/disclaimer',
  SUBSCRIBE: '/subscribe',
  UPCOMING_AUCTIONS: '/upcoming-auctions',
  
  STATE_GUIDES: {
    BASE: '/state-guides',
    NM: '/state-guides/new-mexico',
    // Add other state guides as needed
  },
  
  ARCHIVE_POSTS: {
    BASE: '/archive',
    // Add specific archive posts as needed
  }
} as const;

export default ROUTES;
