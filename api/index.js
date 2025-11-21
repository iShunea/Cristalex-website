const express = require('express');
const mongoose = require('mongoose');

// MongoDB Connection with pooling for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.log('⚠ MongoDB URI not configured. API will return empty arrays.');
    return null;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10, // Connection pooling for serverless
    });
    cachedDb = mongoose.connection;
    console.log('✓ Connected to MongoDB (serverless)');
    return cachedDb;
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    return null;
  }
}

// Mongoose Schemas
const BlogPostSchema = new mongoose.Schema({
  id: Number,
  title: String,
  excerpt: String,
  content: String,
  author: String,
  category: String,
  imageUrl: String,
  publishedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const TeamMemberSchema = new mongoose.Schema({
  id: Number,
  name: String,
  role: String,
  bio: String,
  imageUrl: String,
  orderIndex: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const TestimonialSchema = new mongoose.Schema({
  id: Number,
  name: String,
  role: String,
  text: String,
  rating: { type: Number, default: 5, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const ServiceSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  icon: String,
  features: [String]
});

// Models
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

// Fallback static data
const FALLBACK_DATA = {
  blogPosts: [],
  teamMembers: [],
  testimonials: [],
  services: []
};

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// ============================================
// BLOG POSTS API
// ============================================

app.get('/api/blog-posts', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.json(FALLBACK_DATA.blogPosts);
    }
    const posts = await BlogPost.find().sort({ publishedAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.json(FALLBACK_DATA.blogPosts);
  }
});

app.get('/api/blog-posts/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    const id = parseInt(req.params.id);
    const post = await BlogPost.findOne({ id });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

app.post('/api/blog-posts', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    // Get next ID
    const maxPost = await BlogPost.findOne().sort({ id: -1 });
    const nextId = maxPost ? maxPost.id + 1 : 1;
    
    const newPost = new BlogPost({ ...req.body, id: nextId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(400).json({ error: 'Invalid blog post data' });
  }
});

app.put('/api/blog-posts/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const id = parseInt(req.params.id);
    const updated = await BlogPost.findOneAndUpdate(
      { id },
      req.body,
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(400).json({ error: 'Invalid blog post data' });
  }
});

app.delete('/api/blog-posts/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const id = parseInt(req.params.id);
    const deleted = await BlogPost.findOneAndDelete({ id });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// ============================================
// TEAM MEMBERS API
// ============================================

app.get('/api/team-members', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.json(FALLBACK_DATA.teamMembers);
    }
    const members = await TeamMember.find().sort({ orderIndex: 1 });
    res.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.json(FALLBACK_DATA.teamMembers);
  }
});

app.get('/api/team-members/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    const id = parseInt(req.params.id);
    const member = await TeamMember.findOne({ id });
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
});

app.post('/api/team-members', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const maxMember = await TeamMember.findOne().sort({ id: -1 });
    const nextId = maxMember ? maxMember.id + 1 : 1;
    
    const newMember = new TeamMember({ ...req.body, id: nextId });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(400).json({ error: 'Invalid team member data' });
  }
});

app.put('/api/team-members/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const id = parseInt(req.params.id);
    const updated = await TeamMember.findOneAndUpdate(
      { id },
      req.body,
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(400).json({ error: 'Invalid team member data' });
  }
});

app.delete('/api/team-members/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const id = parseInt(req.params.id);
    const deleted = await TeamMember.findOneAndDelete({ id });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

// ============================================
// TESTIMONIALS API
// ============================================

app.get('/api/testimonials', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.json(FALLBACK_DATA.testimonials);
    }
    
    const active = req.query.active === 'true';
    const query = active ? { isActive: true } : {};
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.json(FALLBACK_DATA.testimonials);
  }
});

app.get('/api/testimonials/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    const id = parseInt(req.params.id);
    const testimonial = await Testimonial.findOne({ id });
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({ error: 'Failed to fetch testimonial' });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const maxTestimonial = await Testimonial.findOne().sort({ id: -1 });
    const nextId = maxTestimonial ? maxTestimonial.id + 1 : 1;
    
    const newTestimonial = new Testimonial({ ...req.body, id: nextId });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(400).json({ error: 'Invalid testimonial data' });
  }
});

app.put('/api/testimonials/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const id = parseInt(req.params.id);
    const updated = await Testimonial.findOneAndUpdate(
      { id },
      req.body,
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(400).json({ error: 'Invalid testimonial data' });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const id = parseInt(req.params.id);
    const deleted = await Testimonial.findOneAndDelete({ id });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// ============================================
// SERVICES API
// ============================================

app.get('/api/services', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.json(FALLBACK_DATA.services);
    }
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.json(FALLBACK_DATA.services);
  }
});

app.get('/api/services/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const id = parseInt(req.params.id);
    const service = await Service.findOne({ id });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const maxService = await Service.findOne().sort({ id: -1 });
    const nextId = maxService ? maxService.id + 1 : 1;
    
    const newService = new Service({ ...req.body, id: nextId });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(400).json({ error: 'Invalid service data' });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const id = parseInt(req.params.id);
    const updated = await Service.findOneAndUpdate(
      { id },
      req.body,
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(400).json({ error: 'Invalid service data' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await connectToDatabase();
    if (!cachedDb) {
      return res.status(503).json({ error: 'Database not available' });
    }
    
    const id = parseInt(req.params.id);
    const deleted = await Service.findOneAndDelete({ id });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Export for Vercel Serverless
module.exports = app;
