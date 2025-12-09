import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getExternalBlogPosts, ExternalBlogPost, getTranslatedField } from "@/lib/api";
import implantImage from "@assets/generated_images/dental_implants_guide_blog_post_thumbnail.png";
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const postId = '_id' in post ? post._id : post.id;
              return (
            <Link key={postId} href={`/blog/${postId}`} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={(post as any).imageUrl || (post as any).image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {(post as any).publishedAt ? new Date((post as any).publishedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : (post as any).date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-primary font-bold text-sm mt-auto group-hover:translate-x-2 transition-transform">
                  {t("blog.read_article")} <ArrowRight className="w-4 h-4 ml-2" />
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