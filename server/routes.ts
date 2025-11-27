import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBlogPostSchema, 
  insertTeamMemberSchema, 
  insertTestimonialSchema, 
  insertServiceSchema,
  insertSocialMediaPostSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ============================================
  // BLOG POSTS API
  // ============================================
  
  // Get all blog posts
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post by ID
  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Create new blog post
  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validated = insertBlogPostSchema.parse(req.body);
      const newPost = await storage.createBlogPost(validated);
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  // Update blog post
  app.put("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validated = insertBlogPostSchema.partial().parse(req.body);
      const updated = await storage.updateBlogPost(id, validated);
      if (!updated) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  // Delete blog post
  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // ============================================
  // TEAM MEMBERS API
  // ============================================
  
  app.get("/api/team-members", async (req, res) => {
    try {
      const members = await storage.getAllTeamMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.get("/api/team-members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const member = await storage.getTeamMember(id);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Error fetching team member:", error);
      res.status(500).json({ error: "Failed to fetch team member" });
    }
  });

  app.post("/api/team-members", async (req, res) => {
    try {
      const validated = insertTeamMemberSchema.parse(req.body);
      const newMember = await storage.createTeamMember(validated);
      res.status(201).json(newMember);
    } catch (error) {
      console.error("Error creating team member:", error);
      res.status(400).json({ error: "Invalid team member data" });
    }
  });

  app.put("/api/team-members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validated = insertTeamMemberSchema.partial().parse(req.body);
      const updated = await storage.updateTeamMember(id, validated);
      if (!updated) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating team member:", error);
      res.status(400).json({ error: "Invalid team member data" });
    }
  });

  app.delete("/api/team-members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteTeamMember(id);
      if (!deleted) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting team member:", error);
      res.status(500).json({ error: "Failed to delete team member" });
    }
  });

  // ============================================
  // TESTIMONIALS API
  // ============================================
  
  app.get("/api/testimonials", async (req, res) => {
    try {
      const active = req.query.active === 'true';
      const testimonials = active 
        ? await storage.getActiveTestimonials()
        : await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const testimonial = await storage.getTestimonial(id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      res.status(500).json({ error: "Failed to fetch testimonial" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validated = insertTestimonialSchema.parse(req.body);
      const newTestimonial = await storage.createTestimonial(validated);
      res.status(201).json(newTestimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  app.put("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validated = insertTestimonialSchema.partial().parse(req.body);
      const updated = await storage.updateTestimonial(id, validated);
      if (!updated) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteTestimonial(id);
      if (!deleted) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  // ============================================
  // SERVICES API
  // ============================================
  
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validated = insertServiceSchema.parse(req.body);
      const newService = await storage.createService(validated);
      res.status(201).json(newService);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(400).json({ error: "Invalid service data" });
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validated = insertServiceSchema.partial().parse(req.body);
      const updated = await storage.updateService(id, validated);
      if (!updated) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(400).json({ error: "Invalid service data" });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteService(id);
      if (!deleted) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ error: "Failed to delete service" });
    }
  });

  // ============================================
  // SOCIAL MEDIA POSTS API
  // ============================================
  
  app.get("/api/social-media-posts", async (req, res) => {
    try {
      const posts = await storage.getActiveSocialMediaPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching social media posts:", error);
      res.status(500).json({ error: "Failed to fetch social media posts" });
    }
  });

  app.get("/api/social-media-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getSocialMediaPost(id);
      if (!post) {
        return res.status(404).json({ error: "Social media post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching social media post:", error);
      res.status(500).json({ error: "Failed to fetch social media post" });
    }
  });

  app.post("/api/social-media-posts", async (req, res) => {
    try {
      const validated = insertSocialMediaPostSchema.parse(req.body);
      const newPost = await storage.createSocialMediaPost(validated);
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating social media post:", error);
      res.status(400).json({ error: "Invalid social media post data" });
    }
  });

  app.put("/api/social-media-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validated = insertSocialMediaPostSchema.partial().parse(req.body);
      const updated = await storage.updateSocialMediaPost(id, validated);
      if (!updated) {
        return res.status(404).json({ error: "Social media post not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating social media post:", error);
      res.status(400).json({ error: "Invalid social media post data" });
    }
  });

  app.delete("/api/social-media-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSocialMediaPost(id);
      if (!deleted) {
        return res.status(404).json({ error: "Social media post not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting social media post:", error);
      res.status(500).json({ error: "Failed to delete social media post" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
