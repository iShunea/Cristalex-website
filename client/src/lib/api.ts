import type { BlogPost, TeamMember, Testimonial, Service } from "@shared/schema";

const API_BASE = "/api";

// Blog Posts API
export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${API_BASE}/blog-posts`);
  if (!response.ok) throw new Error("Failed to fetch blog posts");
  return response.json();
}

export async function getBlogPost(id: number | string): Promise<BlogPost> {
  const response = await fetch(`${API_BASE}/blog-posts/${id}`);
  if (!response.ok) throw new Error("Blog post not found");
  return response.json();
}

// Team Members API
export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await fetch(`${API_BASE}/team-members`);
  if (!response.ok) throw new Error("Failed to fetch team members");
  return response.json();
}

// Testimonials API
export async function getTestimonials(activeOnly: boolean = true): Promise<Testimonial[]> {
  const url = activeOnly 
    ? `${API_BASE}/testimonials?active=true`
    : `${API_BASE}/testimonials`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch testimonials");
  return response.json();
}

// Services API
export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_BASE}/services`);
  if (!response.ok) throw new Error("Failed to fetch services");
  return response.json();
}
