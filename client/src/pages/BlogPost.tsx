import { Layout } from "@/components/layout/Layout";
import { useRoute, Link } from "wouter";
import { blogPosts } from "./Blog";
import { Calendar, User, ArrowLeft, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const post = blogPosts.find(p => p.id === Number(params?.id));

  if (!post) return <NotFound />;

  return (
    <Layout>
      <div className="bg-white min-h-screen pb-20">
        {/* Header Image */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog">
                <a className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Înapoi la Blog
                </a>
              </Link>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-primary px-3 py-1 rounded-full text-sm font-bold">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-white/80">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>5 min citire</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              <div 
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-primary hover:prose-a:text-primary/80"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                <div className="text-gray-500 font-medium">
                  Ți-a plăcut articolul?
                </div>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Distribuie
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Categorii</h3>
                <ul className="space-y-2">
                  {["Implantologie", "Estetică", "Ortodonție", "Profilaxie", "Pedodonție"].map(cat => (
                    <li key={cat}>
                      <a href="#" className="block p-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-primary">
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary text-white p-6 rounded-xl sticky top-[300px]">
                <h3 className="text-xl font-bold mb-4">Programează-te</h3>
                <p className="text-blue-100 mb-6 text-sm">
                  Ai întrebări despre {post.category.toLowerCase()}? Specialiștii noștri sunt aici să te ajute.
                </p>
                <Button className="w-full bg-white text-primary hover:bg-blue-50 font-bold">
                  Sună Acum
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}