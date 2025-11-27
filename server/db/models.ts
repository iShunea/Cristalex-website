import mongoose, { Schema, Document } from "mongoose";

// Blog Post Interface & Schema
export interface IBlogPost extends Document {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  publishedAt: Date;
  createdAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

// Team Member Interface & Schema
export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  orderIndex: number;
  createdAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String, required: true },
  orderIndex: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const TeamMember = mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

// Testimonial Interface & Schema
export interface ITestimonial extends Document {
  name: string;
  role: string;
  text: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Testimonial = mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

// Service Interface & Schema
export interface IService extends Document {
  titleKey: string;
  descKey: string;
  price: string;
  features: string[];
  imageUrl: string;
  details: string;
  orderIndex: number;
  createdAt: Date;
}

const ServiceSchema = new Schema<IService>({
  titleKey: { type: String, required: true },
  descKey: { type: String, required: true },
  price: { type: String, required: true },
  features: [{ type: String }],
  imageUrl: { type: String, required: true },
  details: { type: String, required: true },
  orderIndex: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Service = mongoose.model<IService>("Service", ServiceSchema);

// Social Media Post Interface & Schema
export interface ISocialMediaPost extends Document {
  platform: string;
  videoUrl: string;
  titleRo: string;
  titleRu: string;
  titleEn: string;
  descriptionRo?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
}

const SocialMediaPostSchema = new Schema<ISocialMediaPost>({
  platform: { type: String, required: true },
  videoUrl: { type: String, required: true },
  titleRo: { type: String, required: true },
  titleRu: { type: String, required: true },
  titleEn: { type: String, required: true },
  descriptionRo: { type: String },
  descriptionRu: { type: String },
  descriptionEn: { type: String },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const SocialMediaPost = mongoose.model<ISocialMediaPost>("SocialMediaPost", SocialMediaPostSchema);
