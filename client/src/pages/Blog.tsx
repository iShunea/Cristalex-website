import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { useSEO, seoConfigs } from "@/hooks/useSEO";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getExternalBlogPosts, ExternalBlogPost, getTranslatedField } from "@/lib/api";
import implantImage from "@assets/generated_images/dental_implants_guide_blog_post_thumbnail.png";

// Clean markdown from excerpt text for display
function cleanMarkdownExcerpt(content: string): string {
  if (!content) return '';

  return content
    // Remove bold markers **text** -> text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    // Remove italic markers *text* -> text
    .replace(/\*(.+?)\*/g, '$1')
    // Remove list item markers at start of lines
    .replace(/^- /gm, '')
    // Remove header markers
    .replace(/^#{1,3}\s+/gm, '')
    // Replace multiple spaces/newlines with single space
    .replace(/\s+/g, ' ')
    .trim();
}
import whiteningImage from "@assets/generated_images/teeth_whitening_tips_blog_post_thumbnail.png";
import childImage from "@assets/generated_images/child_dental_care_blog_post_thumbnail.png";
import hygieneImage from "@assets/generated_images/oral_hygiene_routine_blog_post_thumbnail.png";

export function useBlogPosts() {
  const { t } = useTranslation();
  return [
    {
      id: 1,
      title: t("blog.posts.post1_title"),
      excerpt: t("blog.posts.post1_excerpt"),
      date: t("blog.posts.post1_date"),
      author: t("blog.posts.post1_author"),
      category: t("blog.posts.post1_category"),
      image: implantImage,
      content: t("blog.posts.post1_content")
    },
    {
      id: 2,
      title: t("blog.posts.post2_title"),
      excerpt: t("blog.posts.post2_excerpt"),
      date: t("blog.posts.post2_date"),
      author: t("blog.posts.post2_author"),
      category: t("blog.posts.post2_category"),
      image: whiteningImage,
      content: t("blog.posts.post2_content")
    },
    {
      id: 3,
      title: t("blog.posts.post3_title"),
      excerpt: t("blog.posts.post3_excerpt"),
      date: t("blog.posts.post3_date"),
      author: t("blog.posts.post3_author"),
      category: t("blog.posts.post3_category"),
      image: childImage,
      content: t("blog.posts.post3_content")
    },
    {
      id: 4,
      title: t("blog.posts.post4_title"),
      excerpt: t("blog.posts.post4_excerpt"),
      date: t("blog.posts.post4_date"),
      author: t("blog.posts.post4_author"),
      category: t("blog.posts.post4_category"),
      image: hygieneImage,
      content: t("blog.posts.post4_content")
    }
  ];
}

export default function Blog() {
  const { t, i18n } = useTranslation();
  const localizedPosts = useBlogPosts();

  // Dynamic SEO meta tags
  const lang = i18n.language as "ro" | "ru" | "en";
  const seoConfig = seoConfigs.blog[lang] || seoConfigs.blog.ro;
  useSEO({
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    canonicalUrl: "https://cristalexdent.md/blog",
  });

  const { data: apiPosts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: getExternalBlogPosts,
  });

  // Helper to get language suffix
  const getLangSuffix = () => {
    const lang = i18n.language;
    if (lang === 'ro') return 'Ro';
    if (lang === 'ru') return 'Ru';
    return 'En';
  };

  // Helper to get blog field with language fallback
  const getBlogField = (post: any, fieldBase: string) => {
    const suffix = getLangSuffix();
    // Try language-specific field first (e.g., blogTitleRo)
    const langField = `${fieldBase}${suffix}`;
    if (post[langField]) return post[langField];
    // Fallback to English
    if (post[`${fieldBase}En`]) return post[`${fieldBase}En`];
    // Fallback to Romanian
    if (post[`${fieldBase}Ro`]) return post[`${fieldBase}Ro`];
    // Fallback to base field name
    if (post[fieldBase.replace('blog', '').toLowerCase()]) {
      return post[fieldBase.replace('blog', '').toLowerCase()];
    }
    return '';
  };

  // Transform API posts to have consistent structure
  const transformedApiPosts = apiPosts?.map((post: any) => ({
    ...post,
    title: getBlogField(post, 'blogTitle') || post.title || '',
    excerpt: getBlogField(post, 'blogIntro') || post.excerpt || '',
    category: post.label || post.category || '',
    author: post.author || 'Cristalex Dent',
  })) || [];

  // Use API data if available, otherwise fall back to localized static data
  const posts = transformedApiPosts.length > 0 ? transformedApiPosts : localizedPosts;

  return (
    <Layout>
      <div className="bg-slate-50 py-20 -mt-20 pt-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 transform origin-top-right"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">{t("blog.title")}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-4">
            {posts.map((post) => {
              const postId = '_id' in post ? post._id : post.id;
              return (
            <Link key={postId} href={`/blog/${postId}`} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={(post as any).imageUrl || (post as any).image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={300}
                  height={300}
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {(post as any).publishedAt ? new Date((post as any).publishedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' }) : (post as any).date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-3 flex-grow">
                  {cleanMarkdownExcerpt(post.excerpt)}
                </p>
                <div className="flex items-center text-primary font-bold text-xs sm:text-sm mt-auto group-hover:translate-x-2 transition-transform">
                  {t("blog.read_article")} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </div>
              </div>
            </Link>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}