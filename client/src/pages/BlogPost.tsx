import { Layout } from "@/components/layout/Layout";
import { useRoute, Link } from "wouter";
import { useBlogPosts } from "./Blog";
import { Calendar, User, ArrowLeft, Share2, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import NotFound from "./not-found";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getExternalBlogPosts, ExternalBlogPost, getTranslatedField } from "@/lib/api";

function parseMarkdownToHtml(content: string): string {
  if (!content) return '';
  
  let html = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');
  
  if (!html.startsWith('<h') && !html.startsWith('<p>')) {
    html = '<p>' + html + '</p>';
  }
  
  return html;
}

function getLangSuffix(lang: string): string {
  if (lang === 'ro') return 'Ro';
  if (lang === 'ru') return 'Ru';
  return 'En';
}

function getFieldByLang(post: any, fieldBase: string, lang: string): string {
  const suffix = getLangSuffix(lang);
  return post[fieldBase + suffix] || post[fieldBase + 'En'] || post[fieldBase + 'Ro'] || '';
}

function buildStructuredContent(post: any, lang: string): string {
  const intro = getFieldByLang(post, 'blogIntro', lang);
  const h1Title = getFieldByLang(post, 'firstSubheadingTitle', lang);
  const h1Text = getFieldByLang(post, 'firstSubheadingText', lang);
  const h2Title = getFieldByLang(post, 'secondSubheadingTitle', lang);
  const h2Text = getFieldByLang(post, 'secondSubheadingText', lang);
  const h3Title = getFieldByLang(post, 'thirdSubheadingTitle', lang);
  const h3Text = getFieldByLang(post, 'thirdSubheadingText', lang);
  const conclusion = getFieldByLang(post, 'conclusion', lang);

  let html = '';
  if (intro) html += `<p>${intro}</p>`;
  if (h1Title) html += `<h2>${h1Title}</h2>`;
  if (h1Text) html += `<p>${h1Text}</p>`;
  if (h2Title) html += `<h2>${h2Title}</h2>`;
  if (h2Text) html += `<p>${h2Text}</p>`;
  if (h3Title) html += `<h2>${h3Title}</h2>`;
  if (h3Text) html += `<p>${h3Text}</p>`;
  if (conclusion) html += `<p><strong>${conclusion}</strong></p>`;
  
  return html;
}

export default function BlogPost() {
  const { t, i18n } = useTranslation();
  const [, params] = useRoute("/blog/:id");
  const blogPosts = useBlogPosts();
  
  const { data: apiPosts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: getExternalBlogPosts,
  });

  // Try to find in local posts first (numeric ID)
  const localPost = blogPosts.find(p => p.id === Number(params?.id));
  
  // Try to find in API posts (string _id)
  const apiPost = apiPosts?.find(p => p._id === params?.id) as any;
  
  // Normalize API post to match local post format
  // Handle both old structure (title/content) and new structure (blogTitleEn/blogIntroEn etc)
  const post = localPost || (apiPost ? {
    id: apiPost._id,
    title: apiPost.blogTitleEn 
      ? getFieldByLang(apiPost, 'blogTitle', i18n.language)
      : (getTranslatedField(apiPost, 'title' as any, i18n.language, apiPost.title || '')),
    excerpt: apiPost.blogIntroEn
      ? getFieldByLang(apiPost, 'blogIntro', i18n.language)
      : (getTranslatedField(apiPost, 'excerpt' as any, i18n.language, apiPost.excerpt || '')),
    content: apiPost.blogIntroEn
      ? buildStructuredContent(apiPost, i18n.language)
      : parseMarkdownToHtml(getTranslatedField(apiPost, 'content' as any, i18n.language, apiPost.content || '')),
    author: apiPost.author || 'CristAlex Dent',
    category: apiPost.category || apiPost.label || 'General',
    date: apiPost.publishedAt ? new Date(apiPost.publishedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
    image: apiPost.imageUrl || apiPost.image || apiPost.titleImagePath || '',
    isStructured: !!apiPost.blogTitleEn,
  } : null);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!post) return <NotFound />;

  return (
    <Layout>
      <div className="bg-white min-h-screen pb-20">
        {/* Header Image */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden -mt-20 pt-20">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("blog_post.back_to_blog")}
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
                  <span>5 {t("blog_post.reading_time")}</span>
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
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-600 prose-p:mb-4 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-primary hover:prose-a:text-primary/80"
                dangerouslySetInnerHTML={{ __html: (post as any).isStructured ? post.content : parseMarkdownToHtml(post.content) }}
              />
              
              <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                <div className="text-gray-500 font-medium">
                  {t("blog_post.liked_article")}
                </div>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  {t("blog_post.share")}
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold mb-4">{t("blog_post.categories_title")}</h3>
                <ul className="space-y-2">
                  {[
                    { key: "implantology", label: t("blog_post.category_implantology") },
                    { key: "aesthetics", label: t("blog_post.category_aesthetics") },
                    { key: "orthodontics", label: t("blog_post.category_orthodontics") },
                    { key: "prevention", label: t("blog_post.category_prevention") },
                    { key: "pediatric", label: t("blog_post.category_pediatric") }
                  ].map(cat => (
                    <li key={cat.key}>
                      <a href="#" className="block p-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-primary">
                        {cat.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary text-white p-6 rounded-xl sticky top-[300px]">
                <h3 className="text-xl font-bold mb-4 text-white">{t("blog_post.booking_title")}</h3>
                <p className="text-white/90 mb-6 text-sm">
                  {t("blog_post.booking_text", { category: post.category.toLowerCase() })}
                </p>
                <BookingModal 
                  buttonText={t("blog_post.booking_button")}
                  buttonClassName="w-full bg-white text-primary hover:bg-red-50 font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}