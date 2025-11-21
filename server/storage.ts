import { 
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type TeamMember,
  type InsertTeamMember,
  type Testimonial,
  type InsertTestimonial,
  type Service,
  type InsertService
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Team Members
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  // Services
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
}

import * as Models from "./db/models";
import { connectToMongoDB, isMongoConnected } from "./db/mongoose";

export class MongoStorage implements IStorage {
  private mongoReady: boolean = false;

  constructor() {
    connectToMongoDB().then(connected => {
      this.mongoReady = connected;
    });
  }

  private async ensureConnection(): Promise<boolean> {
    if (this.mongoReady) return true;
    
    // Try to connect if not already attempted
    this.mongoReady = await connectToMongoDB();
    return this.mongoReady;
  }

  // User methods (keeping for future auth)
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    return user;
  }

  // Blog Posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    if (!await this.ensureConnection()) return [];
    return await Models.BlogPost.find().sort({ publishedAt: -1 }).lean() as any;
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    if (!await this.ensureConnection()) return undefined;
    const post = await Models.BlogPost.findById(id).lean();
    return post as any;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    if (!await this.ensureConnection()) throw new Error("MongoDB not connected");
    const newPost = new Models.BlogPost(post);
    await newPost.save();
    return newPost.toObject() as any;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    if (!await this.ensureConnection()) return undefined;
    const updated = await Models.BlogPost.findByIdAndUpdate(id, post, { new: true }).lean();
    return updated as any;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    if (!await this.ensureConnection()) return false;
    const result = await Models.BlogPost.findByIdAndDelete(id);
    return !!result;
  }

  // Team Members
  async getAllTeamMembers(): Promise<TeamMember[]> {
    if (!await this.ensureConnection()) return [];
    return await Models.TeamMember.find().sort({ orderIndex: 1 }).lean() as any;
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    if (!await this.ensureConnection()) return undefined;
    const member = await Models.TeamMember.findById(id).lean();
    return member as any;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    if (!await this.ensureConnection()) throw new Error("MongoDB not connected");
    const newMember = new Models.TeamMember(member);
    await newMember.save();
    return newMember.toObject() as any;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    if (!await this.ensureConnection()) return undefined;
    const updated = await Models.TeamMember.findByIdAndUpdate(id, member, { new: true }).lean();
    return updated as any;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    if (!await this.ensureConnection()) return false;
    const result = await Models.TeamMember.findByIdAndDelete(id);
    return !!result;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    if (!await this.ensureConnection()) return [];
    return await Models.Testimonial.find().sort({ createdAt: -1 }).lean() as any;
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    if (!await this.ensureConnection()) return [];
    return await Models.Testimonial.find({ isActive: true }).sort({ createdAt: -1 }).lean() as any;
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    if (!await this.ensureConnection()) return undefined;
    const testimonial = await Models.Testimonial.findById(id).lean();
    return testimonial as any;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    if (!await this.ensureConnection()) throw new Error("MongoDB not connected");
    const newTestimonial = new Models.Testimonial(testimonial);
    await newTestimonial.save();
    return newTestimonial.toObject() as any;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    if (!await this.ensureConnection()) return undefined;
    const updated = await Models.Testimonial.findByIdAndUpdate(id, testimonial, { new: true }).lean();
    return updated as any;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    if (!await this.ensureConnection()) return false;
    const result = await Models.Testimonial.findByIdAndDelete(id);
    return !!result;
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    if (!await this.ensureConnection()) return [];
    return await Models.Service.find().sort({ orderIndex: 1 }).lean() as any;
  }

  async getService(id: number): Promise<Service | undefined> {
    if (!await this.ensureConnection()) return undefined;
    const service = await Models.Service.findById(id).lean();
    return service as any;
  }

  async createService(service: InsertService): Promise<Service> {
    if (!await this.ensureConnection()) throw new Error("MongoDB not connected");
    const newService = new Models.Service(service);
    await newService.save();
    return newService.toObject() as any;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    if (!await this.ensureConnection()) return undefined;
    const updated = await Models.Service.findByIdAndUpdate(id, service, { new: true }).lean();
    return updated as any;
  }

  async deleteService(id: number): Promise<boolean> {
    if (!await this.ensureConnection()) return false;
    const result = await Models.Service.findByIdAndDelete(id);
    return !!result;
  }
}

export const storage = new MongoStorage();
