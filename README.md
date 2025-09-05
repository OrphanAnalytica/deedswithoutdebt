# Deeds Without Debt Newsletter Site

A comprehensive newsletter website for alternative real estate investing strategies including tax deeds, tax liens, HOA foreclosures, and probate deals.

## Managing State Guides

### How to Add/Update a State

1. **Edit the Index File**: Update `content/state-guides/index.yml`
   - Add or modify state entry with required fields
   - Ensure unique slug for each state

2. **Create/Update MDX Content**: Create or edit `content/state-guides/{slug}.mdx`
   - Use the slug from index.yml as the filename
   - Include frontmatter with matching data

### Required Fields

Each state entry in `index.yml` must include:

- **slug**: Unique identifier (lowercase, hyphens for spaces)
- **name**: Full state name
- **type**: Investment type (`deed`, `lien`, `hybrid`, or `tbd`)
- **status**: Current status (`available`, `coming_soon`, or `research`)
- **difficulty**: Investment difficulty (`beginner`, `intermediate`, `advanced`, or `tbd`)
- **summary**: Brief description (1-2 sentences)
- **auctions_per_year**: Frequency description
- **format**: Auction format description
- **last_updated**: Date in YYYY-MM-DD format

### MDX Frontmatter Structure

Each MDX file should start with:

```yaml
---
title: "{State} Tax Sales Guide"
slug: "{slug}"
type: "deed|lien|hybrid|tbd"
difficulty: "beginner|intermediate|advanced|tbd"
status: "available|coming_soon|research"
summary: "Brief description here"
last_updated: "YYYY-MM-DD"
---
```

### Status Workflow

**Research → Coming Soon → Available**

1. **research**: Initial state, needs verification
   - Use `type: tbd` until verified
   - Include placeholder content with "To Verify" notes
   - Focus on gathering accurate information

2. **coming_soon**: Content being written
   - Type should be verified and set correctly
   - Content outline prepared
   - Publication scheduled

3. **available**: Published and ready
   - Complete content with accurate information
   - Verified type (deed/lien/hybrid)
   - Regular updates as needed

### Editorial Notes

**Important**: Always verify the investment type (deed/lien/hybrid) before changing from `tbd`. Each state's system can be complex and incorrect classification could mislead investors.

**Content Guidelines**:
- Provide accurate, actionable information
- Include specific contact information when possible
- Note any recent changes or unusual circumstances
- Update content annually or when laws change

**Research Sources**:
- State statutes and tax codes
- County websites and procedures
- Local real estate professionals
- Recent case studies and examples

### File Organization

```
content/state-guides/
├── index.yml          # Master state registry
├── alaska.mdx         # Individual state guides
├── texas.mdx
├── florida.mdx
└── ...
```

## Development

Built with React, TypeScript, and modern web technologies. See package.json for complete dependencies.

## Deployment

Configured for Replit Deployments with automatic builds and hosting.