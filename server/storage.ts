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
  type InsertService,
  type SocialMediaPost,
  type InsertSocialMediaPost
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
  
  // Social Media Posts
  getAllSocialMediaPosts(): Promise<SocialMediaPost[]>;
  getActiveSocialMediaPosts(): Promise<SocialMediaPost[]>;
  getSocialMediaPost(id: number): Promise<SocialMediaPost | undefined>;
  createSocialMediaPost(post: InsertSocialMediaPost): Promise<SocialMediaPost>;
  updateSocialMediaPost(id: number, post: Partial<InsertSocialMediaPost>): Promise<SocialMediaPost | undefined>;
  deleteSocialMediaPost(id: number): Promise<boolean>;
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

  // Social Media Posts
  async getAllSocialMediaPosts(): Promise<SocialMediaPost[]> {
    if (!await this.ensureConnection()) {
      return this.getStaticSocialMediaPosts();
    }
    const posts = await Models.SocialMediaPost.find().sort({ displayOrder: 1 }).lean();
    return posts.length > 0 ? (posts as any) : this.getStaticSocialMediaPosts();
  }

  async getActiveSocialMediaPosts(): Promise<SocialMediaPost[]> {
    if (!await this.ensureConnection()) {
      return this.getStaticSocialMediaPosts();
    }
    const posts = await Models.SocialMediaPost.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
    return posts.length > 0 ? (posts as any) : this.getStaticSocialMediaPosts();
  }

  private getStaticSocialMediaPosts(): SocialMediaPost[] {
    return [
      {
        id: 1,
        platform: "instagram",
        videoUrl: "https://www.instagram.com/p/DPHK-KHDVhC/",
        titleRo: "Cum să Ajungi la CristAlex Dent",
        titleRu: "Как Добраться до CristAlex Dent",
        titleEn: "How to Get to CristAlex Dent",
        descriptionRo: "Urmărește ghidul video cu indicații pentru a ne găsi ușor",
        descriptionRu: "Смотрите видео-инструкцию, как легко нас найти",
        descriptionEn: "Watch the video guide with directions to find us easily",
        displayOrder: 1,
        isActive: true,
        createdAt: new Date("2024-11-01")
      },
      {
        id: 2,
        platform: "tiktok",
        videoUrl: "https://www.tiktok.com/@placeholder/video/PLACEHOLDER2",
        titleRo: "Recenzia Mariei - 5000+ Pacienți Mulțumiți",
        titleRu: "Отзыв Марии - 5000+ Довольных Пациентов",
        titleEn: "Maria's Review - 5000+ Happy Patients",
        descriptionRo: "Ce spun pacienții noștri despre tratamentele dentare",
        descriptionRu: "Что говорят наши пациенты о стоматологических процедурах",
        descriptionEn: "What our patients say about dental treatments",
        displayOrder: 2,
        isActive: true,
        createdAt: new Date("2024-11-10")
      },
      {
        id: 3,
        platform: "instagram",
        videoUrl: "https://www.instagram.com/p/PLACEHOLDER3/",
        titleRo: "Albire Profesională - Rezultate în 1 Ședință",
        titleRu: "Профессиональное Отбеливание - Результаты за 1 Сеанс",
        titleEn: "Professional Whitening - Results in 1 Session",
        descriptionRo: "Tehnologie modernă de albire dentară la CristAlex Dent",
        descriptionRu: "Современная технология отбеливания зубов в CristAlex Dent",
        descriptionEn: "Modern teeth whitening technology at CristAlex Dent",
        displayOrder: 3,
        isActive: true,
        createdAt: new Date("2024-11-15")
      }
    ];
  }

  async getSocialMediaPost(id: number): Promise<SocialMediaPost | undefined> {
    if (!await this.ensureConnection()) {
      const staticPosts = this.getStaticSocialMediaPosts();
      return staticPosts.find(p => p.id === id);
    }
    try {
      const post = await Models.SocialMediaPost.findById(id).lean();
      return post as any;
    } catch (error) {
      const staticPosts = this.getStaticSocialMediaPosts();
      return staticPosts.find(p => p.id === id);
    }
  }

  async createSocialMediaPost(post: InsertSocialMediaPost): Promise<SocialMediaPost> {
    if (!await this.ensureConnection()) throw new Error("MongoDB not connected");
    const newPost = new Models.SocialMediaPost(post);
    await newPost.save();
    return newPost.toObject() as any;
  }

  async updateSocialMediaPost(id: number, post: Partial<InsertSocialMediaPost>): Promise<SocialMediaPost | undefined> {
    if (!await this.ensureConnection()) return undefined;
    try {
      const updated = await Models.SocialMediaPost.findByIdAndUpdate(id, post, { new: true }).lean();
      return updated as any;
    } catch (error) {
      return undefined;
    }
  }

  async deleteSocialMediaPost(id: number): Promise<boolean> {
    if (!await this.ensureConnection()) return false;
    try {
      const result = await Models.SocialMediaPost.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      return false;
    }
  }
}

export const storage = new MongoStorage();
