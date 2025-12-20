import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { CheckCircle2, ArrowRight, Info } from "lucide-react";
import { useSEO, seoConfigs } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import { useQuery } from "@tanstack/react-query";
import { getExternalServices, ExternalService, getTranslatedField, EXTERNAL_BASE_URL } from "@/lib/api";
import implantImage from "@assets/generated_images/dental_implant_model.png";
import orthoImage from "@assets/generated_images/invisible_dental_aligners.png";
import aestheticImage from "@assets/generated_images/perfect_dental_veneers_smile.png";

// Parse markdown content to structured HTML
function parseServiceDescription(content: string): { intro: string; sections: { title: string; items: string[] }[] } {
  if (!content) return { intro: '', sections: [] };

  const lines = content.split('\n').map(l => l.trim()).filter(l => l);
  let intro = '';
  const sections: { title: string; items: string[] }[] = [];
  let currentSection: { title: string; items: string[] } | null = null;

  for (const line of lines) {
    // Check for section header (bold text with colon at the end)
    const headerMatch = line.match(/^\*\*(.+?):\*\*$/);
    if (headerMatch) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = { title: headerMatch[1], items: [] };
      continue;
    }

    // Check for list item
    if (line.startsWith('- ')) {
      const item = line.substring(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      if (currentSection) {
        currentSection.items.push(item);
      }
      continue;
    }

    // Regular text - if no section started yet, it's intro
    if (!currentSection) {
      intro += (intro ? ' ' : '') + line;
    }
  }

  // Push last section if exists
  if (currentSection) {
    sections.push(currentSection);
  }

  return { intro, sections };
}

export default function Services() {
  const { t, i18n } = useTranslation();

  // Dynamic SEO meta tags
  const lang = i18n.language as "ro" | "ru" | "en";
  const seoConfig = seoConfigs.services[lang] || seoConfigs.services.ro;
  useSEO({
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    canonicalUrl: "https://cristalexdent.md/services",
  });

  // Fetch external services
  const { data: externalServices } = useQuery<ExternalService[]>({
    queryKey: ["external-services"],
    queryFn: getExternalServices,
  });

  // Static fallback images mapping
  const categoryImages: Record<string, string> = {
    implant: implantImage,
    therapy: orthoImage,
    endo: aestheticImage,
    prophy: implantImage,
    prosth: orthoImage,
    pedo: aestheticImage,
    extraction: implantImage,
    sinus: orthoImage,
  };

  const staticCategories = [
    {
      id: "implant",
      title: t("services.implant"),
      desc: t("services.implant_desc"),
      price: t("services.implant_price"),
      features: [t("services.implant_feat1"), t("services.implant_feat2"), t("services.implant_feat3"), t("services.implant_feat4")],
      image: implantImage
    },
    {
      id: "therapy",
      title: t("services.therapy"),
      desc: t("services.therapy_desc"),
      price: t("services.therapy_price"),
      features: [t("services.therapy_feat1"), t("services.therapy_feat2"), t("services.therapy_feat3"), t("services.therapy_feat4")],
      image: orthoImage
    },
    {
      id: "endo",
      title: t("services.endo"),
      desc: t("services.endo_desc"),
      price: t("services.endo_price"),
      features: [t("services.endo_feat1"), t("services.endo_feat2"), t("services.endo_feat3"), t("services.endo_feat4")],
      image: aestheticImage
    },
    {
      id: "prophy",
      title: t("services.prophy"),
      desc: t("services.prophy_desc"),
      price: t("services.prophy_price"),
      features: [t("services.prophy_feat1"), t("services.prophy_feat2"), t("services.prophy_feat3"), t("services.prophy_feat4")],
      image: implantImage
    },
    {
      id: "prosth",
      title: t("services.prosth"),
      desc: t("services.prosth_desc"),
      price: t("services.prosth_price"),
      features: [t("services.prosth_feat1"), t("services.prosth_feat2"), t("services.prosth_feat3"), t("services.prosth_feat4")],
      image: orthoImage
    },
    {
      id: "pedo",
      title: t("services.pedo"),
      desc: t("services.pedo_desc"),
      price: t("services.pedo_price"),
      features: [t("services.pedo_feat1"), t("services.pedo_feat2"), t("services.pedo_feat3"), t("services.pedo_feat4")],
      image: aestheticImage
    },
    {
      id: "extraction",
      title: t("services.extraction"),
      desc: t("services.extraction_desc"),
      price: t("services.extraction_price"),
      features: [t("services.extraction_feat1"), t("services.extraction_feat2"), t("services.extraction_feat3"), t("services.extraction_feat4")],
      image: implantImage
    },
    {
      id: "sinus",
      title: t("services.sinus"),
      desc: t("services.sinus_desc"),
      price: t("services.sinus_price"),
      features: [t("services.sinus_feat1"), t("services.sinus_feat2"), t("services.sinus_feat3"), t("services.sinus_feat4")],
      image: orthoImage
    }
  ];

  // Helper to get translated features array
  const getTranslatedFeatures = (service: ExternalService): string[] => {
    const langKey = i18n.language as "ro" | "ru" | "en";
    const translations = service.translations as any;
    if (translations && translations[langKey]?.features && Array.isArray(translations[langKey].features)) {
      return translations[langKey].features;
    }
    if (translations?.ro?.features && Array.isArray(translations.ro.features)) {
      return translations.ro.features;
    }
    return service.features || [];
  };

  // Helper to get service field with language suffix
  const getServiceField = (service: any, fieldBase: string) => {
    const lang = i18n.language;
    const suffix = lang === 'ro' ? 'Ro' : lang === 'ru' ? 'Ru' : 'En';
    // Try language-specific field first (e.g., titleRo)
    if (service[`${fieldBase}${suffix}`]) return service[`${fieldBase}${suffix}`];
    // Fallback to other languages
    if (service[`${fieldBase}En`]) return service[`${fieldBase}En`];
    if (service[`${fieldBase}Ro`]) return service[`${fieldBase}Ro`];
    // Fallback to base field or Key field
    if (service[fieldBase]) return service[fieldBase];
    if (service[`${fieldBase}Key`]) return service[`${fieldBase}Key`];
    return '';
  };

  // Use API data if available, otherwise fall back to static data
  const categories = externalServices && externalServices.length > 0
    ? externalServices.map((service: any, idx) => ({
        id: service._id,
        title: getServiceField(service, 'title') || getTranslatedField(service, 'name' as any, i18n.language, service.name || service.titleKey || ''),
        desc: getServiceField(service, 'desc') || getTranslatedField(service, 'description' as any, i18n.language, service.description || service.descKey || ''),
        price: service.price || '',
        features: getTranslatedFeatures(service),
        image: (() => {
          const imgPath = service.heroImage || service.imageUrl || service.image || '';
          if (imgPath) {
            return imgPath.startsWith('http') ? imgPath : `${EXTERNAL_BASE_URL}${imgPath}`;
          }
          return categoryImages[service.category || ''] || (idx % 3 === 0 ? implantImage : idx % 3 === 1 ? orthoImage : aestheticImage);
        })()
      }))
    : staticCategories;

  return (
    <Layout>
      <div className="bg-slate-50 -mt-20 pt-28 pb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">{t("services.title")}</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            {t("services.subtitle")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="space-y-24">
          {categories.map((cat, idx) => (
            <div id={cat.id} key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center scroll-mt-24`}>
              <div className="lg:w-2/5">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group aspect-[4/3]">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" width={600} height={400} />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              
              <div className="lg:w-3/5">
                <div className="flex items-center gap-3 mb-4">
                   <div className="bg-red-50 text-primary px-3 py-1 rounded text-sm font-bold tracking-wider uppercase">
                     {t("services.specialization")}
                   </div>
                </div>
                
                <h2 className="text-4xl font-bold mb-6 text-gray-900">{cat.title}</h2>

                {/* Parse and display structured description */}
                {(() => {
                  const parsed = parseServiceDescription(cat.desc);
                  return (
                    <>
                      {parsed.intro && (
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                          {parsed.intro}
                        </p>
                      )}

                      {parsed.sections.length > 0 ? (
                        <div className="space-y-6 mb-8">
                          {parsed.sections.map((section, sIdx) => (
                            <div key={sIdx}>
                              <h3 className="text-lg font-bold text-gray-800 mb-3">{section.title}</h3>
                              <ul className="space-y-2">
                                {section.items.map((item, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-2 text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                                    <span dangerouslySetInnerHTML={{ __html: item }} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Fallback to simple description if no sections parsed */
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                          {cat.desc}
                        </p>
                      )}
                    </>
                  );
                })()}

                {/* Features grid - only show if we have features and no parsed sections */}
                {cat.features.length > 0 && parseServiceDescription(cat.desc).sections.length === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {cat.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                        <span className="text-gray-700 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-4">
                  <BookingModal
                    buttonText={t("services.book_consult")}
                    buttonClassName="bg-primary hover:bg-primary/90 text-white px-8 cursor-pointer"
                  />
                  <Button variant="outline" className="gap-2 cursor-pointer">
                    {t("services.details")} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mt-32 bg-gray-50 rounded-3xl p-12 text-center">
           <h2 className="text-3xl font-bold mb-12">{t("services.process_title")}</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             {/* Connector Line */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

             {[
               { step: "01", title: t("services.process_step1"), desc: t("services.process_step1_desc") },
               { step: "02", title: t("services.process_step2"), desc: t("services.process_step2_desc") },
               { step: "03", title: t("services.process_step3"), desc: t("services.process_step3_desc") },
               { step: "04", title: t("services.process_step4"), desc: t("services.process_step4_desc") }
             ].map((item, i) => (
               <div key={i} className="bg-white p-6 rounded-xl shadow-sm relative">
                 <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg border-4 border-white">
                   {item.step}
                 </div>
                 <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                 <p className="text-gray-500 text-sm">{item.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </div>
    </Layout>
  );
}