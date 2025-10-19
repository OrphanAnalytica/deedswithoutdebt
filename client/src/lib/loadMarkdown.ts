// src/lib/loadMarkdown.ts

import matter from "gray-matter";
import { marked } from "marked";

export interface MarkdownContent {
  html: string;
  meta: {
    title: string;
    date: string;
    tags: string[];
    description: string;
    featuredImage?: string;
  };
}

export async function loadMarkdown(path: string): Promise<MarkdownContent> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${path}`);
    }
    
    const text = await response.text();
    const { content, data } = matter(text);
    
    // Configure marked for better HTML output
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    
    const html = marked(content);
    
    return {
      html,
      meta: {
        title: data.title || "",
        date: data.date || "",
        tags: data.tags || [],
        description: data.description || "",
        featuredImage: data.featuredImage || "",
      },
    };
  } catch (error) {
    console.error("Error loading markdown:", error);
    throw error;
  }
}

export function getMarkdownPath(slug: string): string {
  return `/content/newsletters/${slug}.md`;
}
