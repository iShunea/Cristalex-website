import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useEffect, memo, useCallback, useRef } from "react";
import { Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getExternalSocialMediaPosts, ExternalSocialMediaPost, getTranslatedField } from "@/lib/api";

function extractTikTokVideoId(url: string): string | null {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

function extractInstagramPostId(url: string): string | null {
  const match = url.match(/\/(p|reel|reels)\/([A-Za-z0-9_-]+)/);
  return match ? match[2] : null;
}

export const SocialReviews = memo(function SocialReviews() {
  const { t, i18n } = useTranslation();
  const renderAttempts = useRef(0);

  const { data: apiPosts, isLoading, error } = useQuery<ExternalSocialMediaPost[]>({
    queryKey: ["external-social-media-posts"],
    queryFn: getExternalSocialMediaPosts,
  });

  const posts = apiPosts || [];

  // Function to re-render embeds
  const renderEmbeds = useCallback(() => {
    if ((window as any).tiktokEmbed?.lib?.render) {
      (window as any).tiktokEmbed.lib.render();
    }
    if ((window as any).instgrm?.Embeds?.process) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const hasTikTok = posts.some(p => p.platform === "tiktok");
    const hasInstagram = posts.some(p => p.platform === "instagram");

    // Load TikTok embed script
    if (hasTikTok) {
      const existingScript = document.querySelector('script[src*="tiktok.com/embed"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        script.onload = () => {
          setTimeout(renderEmbeds, 500);
        };
        document.body.appendChild(script);
      }
    }

    // Load Instagram embed script
    if (hasInstagram) {
      const existingScript = document.querySelector('script[src*="instagram.com/embed"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => {
          setTimeout(renderEmbeds, 500);
        };
        document.body.appendChild(script);
      }
    }

    // Re-render embeds multiple times to ensure they load
    const timers = [
      setTimeout(renderEmbeds, 500),
      setTimeout(renderEmbeds, 1500),
      setTimeout(renderEmbeds, 3000),
      setTimeout(renderEmbeds, 5000),
    ];

    // Also re-render when the component becomes visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderAttempts.current += 1;
          renderEmbeds();
        }
      });
    }, { threshold: 0.1 });

    const section = document.querySelector('[data-social-reviews]');
    if (section) {
      observer.observe(section);
    }

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [posts, renderEmbeds]);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 lg:py-12 bg-gradient-to-br from-primary/5 via-white to-accent/5">
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
    <section className="py-12 sm:py-16 md:py-24 lg:py-12 bg-gradient-to-br from-primary/5 via-white to-accent/5" data-social-reviews>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-6">
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
                            <SiTiktok className="w-5 h-5" />
                            <span className="font-bold text-sm">TikTok</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Video Embed - Fixed height container to prevent CLS */}
                    <div className="aspect-[9/16] relative bg-black flex items-center justify-center overflow-hidden" style={{ minHeight: '500px', containIntrinsicSize: '281px 500px', contentVisibility: 'auto' }}>
                      {post.platform === "tiktok" && (post as any).videoUrl ? (
                        <blockquote 
                          className="tiktok-embed w-full h-full" 
                          cite={(post as any).videoUrl}
                          data-video-id={extractTikTokVideoId((post as any).videoUrl) || ""}
                          style={{ maxWidth: "100%", minWidth: "100%" }}
                        >
                          <section className="flex items-center justify-center h-full">
                            <div className="text-white text-center p-4">
                              <SiTiktok className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                              <p className="text-sm">Se încarcă...</p>
                            </div>
                          </section>
                        </blockquote>
                      ) : post.platform === "instagram" && (post as any).videoUrl ? (
                        <blockquote 
                          className="instagram-media w-full h-full" 
                          data-instgrm-permalink={(post as any).videoUrl}
                          data-instgrm-version="14"
                          style={{ maxWidth: "100%", minWidth: "100%", margin: 0 }}
                        >
                          <div className="flex items-center justify-center h-full">
                            <div className="text-white text-center p-4">
                              <Instagram className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                              <p className="text-sm">Se încarcă...</p>
                            </div>
                          </div>
                        </blockquote>
                      ) : (
                        <div className="flex items-center justify-center h-full text-white">
                          <p>Video indisponibil</p>
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
});
