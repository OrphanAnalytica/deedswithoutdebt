# Subscription Gate System Documentation

## Overview
The subscription gate system protects premium content and drives newsletter subscriptions by requiring users to subscribe before accessing valuable resources.

## Protected Routes
- `/upcoming-auctions` - Auction calendar
- `/resources` - Downloadable resources and guides
- `/archive` - Newsletter archives
- `/state-guides` - State-by-state guides
- `/state-guides/:slug` - Individual state guides
- `/archive/:slug` - Individual newsletter posts

## Public Routes
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/terms` - Terms of service
- `/privacy` - Privacy policy
- `/subscribe` - Subscription page

## Components

### SubscriptionContext
- Manages global subscription state
- Handles subscription API calls
- Persists subscription status in localStorage
- Provides `useSubscription` hook

### ProtectedRoute
- Wraps protected content
- Shows subscription gate for non-subscribers
- Displays full content for subscribers
- Supports custom titles and descriptions

### SubscriptionGate
- Modal overlay for subscription prompts
- Shows value proposition
- Handles subscription form submission
- Displays blurred content preview

### Header Updates
- Shows subscription status indicator
- Displays lock icons on protected nav items
- Updates CTA button based on subscription status

## User Flow

1. **New Visitor**: Lands on home page, sees value proposition
2. **Clicks Protected Link**: Sees subscription gate with content preview
3. **Subscribes**: Email submitted, access granted immediately
4. **Browses Content**: Full access to all protected content
5. **Returns Later**: Recognized as subscriber, maintains access

## Technical Implementation

### State Management
- React Context for global subscription state
- localStorage for persistence
- Automatic status checking on app load

### Subscription API
- Integrates with existing newsletter service (Beehiiv)
- Handles success/error states
- Updates local storage on successful subscription

### Visual Indicators
- Lock icons on protected navigation items
- Subscription status badge in header
- Blurred content previews
- Professional modal design

## Testing
- Test component available on home page (temporary)
- Verify subscription flow works correctly
- Test persistence across page navigation
- Verify protected routes show gates

## Future Enhancements
- Subscription expiry handling
- Advanced analytics tracking
- A/B testing for conversion optimization
- Social proof elements

