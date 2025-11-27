import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Instagram, Music } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SocialMediaPost {
  id: number;
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
}

async function getSocialMediaPosts(): Promise<SocialMediaPost[]> {
  const response = await fetch("/api/social-media-posts");
  if (!response.ok) {
    throw new Error("Failed to fetch social media posts");
  }
  return response.json();
}

export function SocialReviews() {
  const { t, i18n } = useTranslation();
  
  const { data: apiPosts, isLoading, error } = useQuery({
    queryKey: ["social-media-posts"],
    queryFn: getSocialMediaPosts,
  });

  const posts = apiPosts || [];

  const getLocalizedTitle = (post: SocialMediaPost): string => {
    switch (i18n.language) {
      case "ro":
        return post.titleRo;
      case "ru":
        return post.titleRu;
      case "en":
        return post.titleEn;
      default:
        return post.titleRo;
    }
  };

  const getLocalizedDescription = (post: SocialMediaPost): string | undefined => {
    switch (i18n.language) {
      case "ro":
        return post.descriptionRo;
      case "ru":
        return post.descriptionRu;
      case "en":
        return post.descriptionEn;
      default:
        return post.descriptionRo;
    }
  };

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
              {posts.map((post: SocialMediaPost) => (
                <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3" data-testid={`social-post-${post.id}`}>
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

                    {/* Video Embed Placeholder */}
                    <div className="aspect-[9/16] bg-gray-100 relative group">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          {post.platform === "instagram" ? (
                            <Instagram className="w-8 h-8 text-primary" />
                          ) : (
                            <Music className="w-8 h-8 text-primary" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {t("social_reviews.watch")} {post.platform === "instagram" ? "Instagram" : "TikTok"}
                        </p>
                        <a
                          href={post.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold transition-all hover:shadow-lg"
                          data-testid={`link-video-${post.id}`}
                        >
                          {t("social_reviews.watch")} →
                        </a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900" data-testid={`title-post-${post.id}`}>
                        {getLocalizedTitle(post)}
                      </h3>
                      {getLocalizedDescription(post) && (
                        <p className="text-gray-600 text-sm line-clamp-2" data-testid={`description-post-${post.id}`}>
                          {getLocalizedDescription(post)}
                        </p>
                      )}
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
