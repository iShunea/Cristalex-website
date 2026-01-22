import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import { Play, Image as ImageIcon } from "lucide-react";
import { getGalleryMedia, EXTERNAL_BASE_URL, type GalleryMedia } from "@/lib/api";

// Import images
import beforeWhitening from "@assets/generated_images/stained_yellowed_teeth_before_whitening.png";
import afterWhitening from "@assets/generated_images/bright_white_teeth_after_whitening.png";
import beforeBraces from "@assets/generated_images/crooked_misaligned_teeth_before_braces.png";
import afterBraces from "@assets/generated_images/straight_teeth_after_orthodontic_treatment.png";
import beforeRestoration from "@assets/generated_images/broken_chipped_tooth_before_restoration.png";
import afterRestoration from "@assets/generated_images/restored_tooth_after_crown_placement.png";
import heroImage from "@assets/team_cristalexdent.jpg";

export default function GalleryMedia() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [filter, setFilter] = useState<string>("all");
  const [apiGalleryData, setApiGalleryData] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: "Galerie Media - Foto & Video | Cristalex Dent",
    description: "Explorează galeria noastră foto și video - vezi transformările pacienților și cunoaște clinica noastră."
  });

  // Fetch gallery media from API
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const data = await getGalleryMedia({ active: true });
        setApiGalleryData(data);
      } catch (error) {
        console.error("Error fetching gallery media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Helper function to get localized field
  const getLocalizedField = (item: GalleryMedia, fieldBase: 'title' | 'description') => {
    const lang = i18n.language.toLowerCase();
    const fieldKey = `${fieldBase}${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof GalleryMedia;
    return (item[fieldKey] as string) || (item[`${fieldBase}Ro`] as string) || '';
  };

  // Static fallback data
  const staticPhotoCases = [
    {
      id: 1,
      category: "whitening",
      before: beforeWhitening,
      after: afterWhitening,
      title: "Albire Profesională",
      description: "Transformare completă după albire profesională"
    },
    {
      id: 2,
      category: "orthodontics",
      before: beforeBraces,
      after: afterBraces,
      title: "Tratament Ortodontic",
      description: "Corectare aliniament cu aparate dentare"
    },
    {
      id: 3,
      category: "restoration",
      before: beforeRestoration,
      after: afterRestoration,
      title: "Restaurare Dentară",
      description: "Reconstrucție completă cu coroană"
    }
  ];

  // Process API data for photos
  const apiPhotoCases = apiGalleryData
    .filter(item => item.mediaType === 'photo' && item.isActive)
    .map(item => ({
      id: item.id || 0,
      category: item.category || 'general',
      before: item.beforeImageUrl?.startsWith('http')
        ? item.beforeImageUrl
        : `${EXTERNAL_BASE_URL}${item.beforeImageUrl}`,
      after: item.afterImageUrl?.startsWith('http')
        ? item.afterImageUrl
        : `${EXTERNAL_BASE_URL}${item.afterImageUrl}`,
      title: getLocalizedField(item, 'title'),
      description: getLocalizedField(item, 'description')
    }));

  // Process API data for videos
  const apiVideoCases = apiGalleryData
    .filter(item => item.mediaType === 'video' && item.isActive)
    .map(item => ({
      id: item.id || 0,
      videoUrl: item.videoUrl?.startsWith('http')
        ? item.videoUrl
        : `${EXTERNAL_BASE_URL}${item.videoUrl}`,
      posterUrl: item.videoPosterUrl?.startsWith('http')
        ? item.videoPosterUrl
        : `${EXTERNAL_BASE_URL}${item.videoPosterUrl}`,
      title: getLocalizedField(item, 'title'),
      description: getLocalizedField(item, 'description')
    }));

  // Use API data if available, otherwise fallback to static data
  const photoCases = apiPhotoCases.length > 0 ? apiPhotoCases : staticPhotoCases;

  const categories = [
    { id: "all", label: "Toate" },
    { id: "whitening", label: "Albire" },
    { id: "orthodontics", label: "Ortodonție" },
    { id: "restoration", label: "Restaurări" },
    { id: "implants", label: "Implanturi" }
  ];

  const filteredCases = filter === "all"
    ? photoCases
    : photoCases.filter(c => c.category === filter);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Galerie Media
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Descoperă transformările pacienților noștri și cunoaște clinica
          </p>
        </div>
      </section>

      {/* Tabs: Photos / Videos */}
      <section className="py-6 bg-gray-50 sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            <Button
              variant={activeTab === "photos" ? "default" : "outline"}
              onClick={() => setActiveTab("photos")}
              className="gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Înainte & După
            </Button>
            <Button
              variant={activeTab === "videos" ? "default" : "outline"}
              onClick={() => setActiveTab("videos")}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              Video
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Gallery Tab */}
      {activeTab === "photos" && (
        <>
          {/* Category Filters */}
          <section className="py-4 bg-white sticky top-[88px] z-30 border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    size="sm"
                    variant={filter === cat.id ? "default" : "outline"}
                    onClick={() => setFilter(cat.id)}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Photo Cases */}
          <section className="compact-section">
            <div className="container mx-auto px-4">
              <div className="space-y-16">
                {filteredCases.map(caseItem => (
                  <div key={caseItem.id} className="max-w-6xl mx-auto">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{caseItem.title}</h3>
                      <p className="text-gray-600 text-lg">{caseItem.description}</p>
                    </div>
                    <BeforeAfter
                      cases={[{
                        beforeImage: caseItem.before,
                        afterImage: caseItem.after,
                        title: caseItem.title
                      }]}
                      mode="grid"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Video Gallery Tab */}
      {activeTab === "videos" && (
        <section className="compact-section">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              {/* Static Clinic Tour Video */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                  Tur Virtual - Clinica Noastră
                </h3>
                <AutoplayVideo
                  videoSrc="/videos/clinic-tour.mp4"
                  posterSrc={heroImage}
                  className="rounded-2xl shadow-2xl"
                />
              </div>

              {/* API Videos */}
              {apiVideoCases.length > 0 && apiVideoCases.map((video) => (
                <div key={video.id}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-center text-gray-600 mb-4 text-lg">
                      {video.description}
                    </p>
                  )}
                  <AutoplayVideo
                    videoSrc={video.videoUrl}
                    posterSrc={video.posterUrl || heroImage}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              ))}

              {/* Message when no API videos */}
              {apiVideoCases.length === 0 && !loading && (
                <div className="text-center text-gray-500 py-8">
                  <p className="text-lg">Mai multe videoclipuri vor fi adăugate în curând</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
