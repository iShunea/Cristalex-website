import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Instagram, Music } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getExternalSocialMediaPosts, ExternalSocialMediaPost, getTranslatedField } from "@/lib/api";

export function SocialReviews() {
  const { t, i18n } = useTranslation();
  
  const { data: apiPosts, isLoading, error } = useQuery<ExternalSocialMediaPost[]>({
    queryKey: ["external-social-media-posts"],
    queryFn: getExternalSocialMediaPosts,
  });

  const posts = apiPosts || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">{t("social_reviews.loading")}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">{t("social_reviews.title")}</h2>
          <p className="section-subtitle">{t("social_reviews.subtitle")}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
            <CarouselContent className="-ml-4">
              {posts.map((post) => (
                <CarouselItem key={post._id} className="pl-4 md:basis-1/2 lg:basis-1/3" data-testid={`social-post-${post._id}`}>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow h-full">
                    {/* Platform Badge */}
                    <div className="p-4 bg-gradient-to-r from-primary to-secondary">
                      <div className="flex items-center gap-2 text-white">
                        {post.platform === "instagram" ? (
                          <>
                            <Instagram className="w-5 h-5" />
                            <span className="font-bold text-sm">Instagram</span>
                          </>
                        ) : (
                          <>
                            <Music className="w-5 h-5" />
                            <span className="font-bold text-sm">TikTok</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Video/Thumbnail */}
                    <div className="aspect-[9/16] relative group">
                      {((post as any).imageUrl || (post as any).thumbnailUrl || post.thumbnail) ? (
                        <img src={(post as any).imageUrl || (post as any).thumbnailUrl || post.thumbnail} alt={post.title || ''} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center ${
                          post.platform === "instagram" 
                            ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" 
                            : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                        }`}>
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                            {post.platform === "instagram" ? (
                              <Instagram className="w-10 h-10 text-white" />
                            ) : (
                              <Music className="w-10 h-10 text-white" />
                            )}
                          </div>
                          <p className="text-white/90 text-sm font-medium leading-relaxed max-w-[200px] line-clamp-4">
                            {getTranslatedField(post, 'description' as any, i18n.language, (post as any).descriptionRo || '')}
                          </p>
                        </div>
                      )}
                      {((post as any).videoUrl || post.url) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                          <a
                            href={(post as any).videoUrl || post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:scale-105"
                            data-testid={`link-video-${post._id}`}
                          >
                            {t("social_reviews.watch")} →
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900" data-testid={`title-post-${post._id}`}>
                        {getTranslatedField(post, 'title' as any, i18n.language, post.title || '')}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 bg-white hover:bg-primary hover:text-white border-2 border-gray-200 hover:border-primary transition-all" />
            <CarouselNext className="hidden md:flex -right-12 h-12 w-12 bg-white hover:bg-primary hover:text-white border-2 border-gray-200 hover:border-primary transition-all" />
          </Carousel>

          <div className="flex justify-center gap-2 mt-8 md:hidden">
            <div className="text-xs text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200">
              {t("social_reviews.swipe_hint")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
