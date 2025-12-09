const EXTERNAL_API_BASE = "https://a5e6b9c8-56df-4a28-80b4-8e30c119abc5-00-3p3h7u3k5vbpw.worf.replit.dev/api";

export interface ExternalService {
  _id: string;
  name?: string;
  description?: string;
  price?: string;
  duration?: string;
  image?: string;
  category?: string;
  features?: string[];
  isActive?: boolean;
  translations?: {
    ro?: { name?: string; description?: string };
    ru?: { name?: string; description?: string };
    en?: { name?: string; description?: string };
  };
}

export interface ExternalTeamMember {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  image?: string;
  specialization?: string;
  education?: string[];
  experience?: string;
  isActive?: boolean;
  order?: number;
  translations?: {
    ro?: { role?: string; bio?: string; specialization?: string };
    ru?: { role?: string; bio?: string; specialization?: string };
    en?: { role?: string; bio?: string; specialization?: string };
  };
}

export interface ExternalTestimonial {
  _id: string;
  name: string;
  role?: string;
  text?: string;
  rating?: number;
  image?: string;
  isActive?: boolean;
  translations?: {
    ro?: { text?: string; role?: string };
    ru?: { text?: string; role?: string };
    en?: { text?: string; role?: string };
  };
}

export interface ExternalSocialMediaPost {
  _id: string;
  platform?: string;
  url?: string;
  embedCode?: string;
  thumbnail?: string;
  title?: string;
  isActive?: boolean;
  translations?: {
    ro?: { title?: string };
    ru?: { title?: string };
    en?: { title?: string };
  };
}

export interface ExternalBlogPost {
  _id: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  publishedAt?: string;
  isActive?: boolean;
  translations?: {
    ro?: { title?: string; excerpt?: string; content?: string };
    ru?: { title?: string; excerpt?: string; content?: string };
    en?: { title?: string; excerpt?: string; content?: string };
  };
}

async function fetchFromExternalApi<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(`${EXTERNAL_API_BASE}${endpoint}`);
    if (!response.ok) {
      console.warn(`External API request failed: ${endpoint} - ${response.status}`);
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn(`External API request error: ${endpoint}`, error);
    return [];
  }
}

export async function getExternalServices(): Promise<ExternalService[]> {
  return fetchFromExternalApi<ExternalService>("/services");
}

export async function getExternalTeamMembers(): Promise<ExternalTeamMember[]> {
  return fetchFromExternalApi<ExternalTeamMember>("/team-members");
}

export async function getExternalTestimonials(): Promise<ExternalTestimonial[]> {
  return fetchFromExternalApi<ExternalTestimonial>("/testimonials");
}

export async function getExternalSocialMediaPosts(): Promise<ExternalSocialMediaPost[]> {
  return fetchFromExternalApi<ExternalSocialMediaPost>("/social-media-posts");
}

export async function getExternalBlogPosts(): Promise<ExternalBlogPost[]> {
  return fetchFromExternalApi<ExternalBlogPost>("/blog-posts");
}

export function getTranslatedField<T>(
  item: { translations?: { ro?: T; ru?: T; en?: T } },
  field: keyof T,
  lang: string,
  fallback: string = ""
): string {
  const langKey = lang as "ro" | "ru" | "en";
  const translations = item.translations;
  if (translations && translations[langKey]) {
    const value = translations[langKey]?.[field];
    if (typeof value === "string" && value) return value;
  }
  if (translations?.ro) {
    const value = translations.ro[field];
    if (typeof value === "string" && value) return value;
  }
  return fallback;
}
