import * as yaml from 'js-yaml';

export interface StateGuide {
  slug: string;
  name: string;
  type: 'Tax Deed State' | 'Tax Lien State' | 'Redeemable Deed' | 'Hybrid';
  status: 'available' | 'coming_soon' | 'research';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'tbd';
  summary: string;
  auctions_per_year: string;
  format: string;
  last_updated: string;
  featured?: boolean;
  image?: string;
  description?: string;
  saleType?: string;
  redemptionPeriod?: string;
  interestRate?: string;
  keyFeatures?: string[];
}

interface StateGuideRegistry {
  states: StateGuide[];
}

let stateGuides: StateGuide[] = [];
let isLoaded = false;

// Cache for loaded state guides
const stateGuideCache = new Map<string, StateGuide>();

// Load and parse the YAML registry
export async function loadStateGuides(): Promise<StateGuide[]> {
  if (isLoaded) {
    return stateGuides;
  }

  try {
    const response = await fetch('/content/state-guides/index.yml');
    if (!response.ok) {
      throw new Error(`Failed to fetch state guides: ${response.statusText}`);
    }
    
    const yamlContent = await response.text();
    const registry = yaml.load(yamlContent) as StateGuideRegistry;
    
    if (!registry || !registry.states) {
      throw new Error('Invalid state guides registry format');
    }

    // Validate required fields
    for (const state of registry.states) {
      validateStateGuide(state);
    }

    // Check for duplicate slugs
    const slugs = new Set();
    for (const state of registry.states) {
      if (slugs.has(state.slug)) {
        throw new Error(`Duplicate slug found: ${state.slug}`);
      }
      slugs.add(state.slug);
    }

    stateGuides = registry.states;
    isLoaded = true;

    // Cache individual states
    stateGuides.forEach(guide => {
      stateGuideCache.set(guide.slug, guide);
    });

    // Log warnings for incomplete data
    const researchStates = stateGuides.filter(s => s.status === 'research');
    
    if (researchStates.length > 0) {
      console.warn(`${researchStates.length} states need research`, researchStates.map(s => s.name));
    }

    return stateGuides;
  } catch (error) {
    console.error('Error loading state guides:', error);
    throw error;
  }
}

// Validate a single state guide
function validateStateGuide(state: any): asserts state is StateGuide {
  const requiredFields = ['slug', 'name', 'type', 'status', 'difficulty', 'summary', 'auctions_per_year', 'format', 'last_updated'];
  
  for (const field of requiredFields) {
    if (!(field in state) || state[field] === undefined || state[field] === null) {
      throw new Error(`Missing required field '${field}' in state: ${state.name || 'unknown'}`);
    }
  }

  // Validate enum values
  const validTypes = ['Tax Deed State', 'Tax Lien State', 'Redeemable Deed', 'Hybrid'];
  const validStatuses = ['available', 'coming_soon', 'research'];
  const validDifficulties = ['beginner', 'intermediate', 'advanced', 'tbd'];

  if (!validTypes.includes(state.type)) {
    throw new Error(`Invalid type '${state.type}' for state ${state.name}`);
  }

  if (!validStatuses.includes(state.status)) {
    throw new Error(`Invalid status '${state.status}' for state ${state.name}`);
  }

  if (!validDifficulties.includes(state.difficulty)) {
    throw new Error(`Invalid difficulty '${state.difficulty}' for state ${state.name}`);
  }
}

// Get a specific state by slug
export async function getState(slug: string): Promise<StateGuide | null> {
  // Check cache first
  if (stateGuideCache.has(slug)) {
    return stateGuideCache.get(slug)!;
  }

  // Load all states if not loaded yet
  await loadStateGuides();
  
  return stateGuideCache.get(slug) || null;
}

// List all states
export async function listStates(): Promise<StateGuide[]> {
  return await loadStateGuides();
}

// Filter helpers
export function filterByType(states: StateGuide[], type: StateGuide['type'] | 'all'): StateGuide[] {
  if (type === 'all') return states;
  return states.filter(state => state.type === type);
}

export function filterByStatus(states: StateGuide[], status: StateGuide['status'] | 'all'): StateGuide[] {
  if (status === 'all') return states;
  return states.filter(state => state.status === status);
}

export function filterToVerify(states: StateGuide[]): StateGuide[] {
  return states.filter(state => state.status === 'research');
}

// Search helpers
export function searchStates(states: StateGuide[], query: string): StateGuide[] {
  if (!query.trim()) return states;
  
  const lowerQuery = query.toLowerCase();
  return states.filter(state => 
    state.name.toLowerCase().includes(lowerQuery) ||
    state.summary.toLowerCase().includes(lowerQuery) ||
    state.type.toLowerCase().includes(lowerQuery) ||
    state.status.toLowerCase().includes(lowerQuery)
  );
}