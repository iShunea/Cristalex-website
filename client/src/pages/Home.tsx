import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { useSEO, seoConfigs } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ShieldCheck, Users, Award, Clock, CheckCircle2,
  Star, Microscope, Sparkles, PhoneCall, ArrowRight,
  HelpCircle, ChevronDown, X, ChevronLeft, ChevronRight
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link } from "wouter";
import { useBlogPosts } from "./Blog";
import { useQuery } from "@tanstack/react-query";
import { getExternalBlogPosts, getExternalTeamMembers, getExternalTestimonials, getExternalServices, ExternalTeamMember, ExternalTestimonial, ExternalBlogPost, ExternalService, getTranslatedField, EXTERNAL_BASE_URL } from "@/lib/api";
import { BookingModal } from "@/components/BookingModal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { SocialReviews } from "@/components/SocialReviews";

import heroImage from "@assets/generated_images/modern_bright_dental_clinic_reception_area.png";
import doctorImage from "@assets/generated_images/friendly_professional_dentist_portrait.png";
import teamPhoto from "@assets/team_cristalexdent.jpg";
import techImage from "@assets/generated_images/dental_digital_technology_scanner.png";
import sterileImage from "@assets/generated_images/dental_sterilization_equipment.png";
import implantImage from "@assets/generated_images/dental_implant_model.png";
import orthoImage from "@assets/generated_images/invisible_dental_aligners.png";
import aestheticImage from "@assets/generated_images/perfect_dental_veneers_smile.png";
import endoImage from "@assets/generated_images/dental_microscope_treatment.png";

import drScutelnic from "@assets/dr_scutelnic_daniela_real.jpg";
import drRobu from "@assets/dr_ludmila_robu_real.jpg";
import drPlesca from "@assets/generated_images/portrait_of_dr._denis_plesca.png";
import drZanoaga from "@assets/generated_images/portrait_of_dr._zanoaga_oleg.png";
import drCraciun from "@assets/dr_craciun_daniela_real.jpg";
import asstBarbarasa from "@assets/generated_images/portrait_of_asist._barbarasa_ludmila.png";

// Before/After case images
import beforeWhitening from "@assets/generated_images/stained_yellowed_teeth_before_whitening.png";
import afterWhitening from "@assets/generated_images/bright_white_teeth_after_whitening.png";
import beforeBraces from "@assets/generated_images/crooked_misaligned_teeth_before_braces.png";
import afterBraces from "@assets/generated_images/straight_teeth_after_orthodontic_treatment.png";
import beforeRestoration from "@assets/generated_images/broken_chipped_tooth_before_restoration.png";
import afterRestoration from "@assets/generated_images/restored_tooth_after_crown_placement.png";

function getLangSuffix(lang: string): string {
  if (lang === 'ro') return 'Ro';
  if (lang === 'ru') return 'Ru';
  return 'En';
}

function getBlogField(post: any, fieldBase: string, lang: string): string {
  const suffix = getLangSuffix(lang);
  return post[fieldBase + suffix] || post[fieldBase + 'En'] || post[fieldBase + 'Ro'] || post[fieldBase] || '';
}

// Team Carousel Component with navigation and auto-scroll
function TeamCarousel({ doctors, t }: { doctors: Array<{ name: string; role: string; img: string }>; t: any }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 320; // Increased card width
  const gap = 24; // gap-6 = 24px

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = cardWidth + gap;
    const newPosition = direction === 'left'
      ? scrollPosition - scrollAmount
      : scrollPosition + scrollAmount;

    // Calculate the total width of one set of doctors
    const singleSetWidth = doctors.length * (cardWidth + gap);

    // Wrap around logic
    let finalPosition = newPosition;
    if (finalPosition < 0) {
      finalPosition = singleSetWidth + finalPosition;
    } else if (finalPosition >= singleSetWidth) {
      finalPosition = finalPosition - singleSetWidth;
    }

    setScrollPosition(finalPosition);
    setIsPaused(true);

    // Resume auto-scroll after 5 seconds of inactivity
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-6">
          <h2 className="section-title">{t("nav.team")}</h2>
          <p className="section-subtitle">{t("about.team_subtitle")}</p>
        </div>

        {/* Carousel container with navigation buttons */}
        <div className="relative max-w-7xl mx-auto">
          {/* Left navigation button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-300 group"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-primary transition-colors" />
          </button>

          {/* Right navigation button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-300 group"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-primary transition-colors" />
          </button>

          {/* Carousel viewport */}
          <div
            className="overflow-hidden mx-4 sm:mx-6 md:mx-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={carouselRef}
              className={`flex gap-3 sm:gap-4 md:gap-6 ${!isPaused ? 'animate-scroll-infinite' : ''}`}
              style={{
                width: 'max-content',
                transform: isPaused ? `translateX(-${scrollPosition}px)` : undefined,
                transition: isPaused ? 'transform 0.5s ease-out' : undefined,
              }}
            >
              {/* First set of doctors */}
              {doctors.map((doc, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[280px] bg-white rounded-xl sm:rounded-2xl lg:rounded-xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="h-[240px] sm:h-[280px] md:h-[340px] lg:h-[280px] overflow-hidden relative bg-gray-100">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-4 text-white">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-lg font-bold text-white">{doc.name}</h3>
                      <p className="text-white/90 text-xs sm:text-sm lg:text-xs font-medium mt-1">{doc.role}</p>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 lg:p-3">
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-xs leading-relaxed line-clamp-2">{doc.role}</p>
                    <div className="flex gap-2 mt-3 sm:mt-4 lg:mt-2">
                      <div className="h-1 sm:h-1.5 lg:h-1 w-10 sm:w-14 lg:w-10 bg-primary rounded-full"></div>
                      <div className="h-1 sm:h-1.5 lg:h-1 w-4 sm:w-5 lg:w-4 bg-secondary rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless infinite loop */}
              {doctors.map((doc, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[280px] bg-white rounded-xl sm:rounded-2xl lg:rounded-xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="h-[240px] sm:h-[280px] md:h-[340px] lg:h-[280px] overflow-hidden relative bg-gray-100">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-4 text-white">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-lg font-bold text-white">{doc.name}</h3>
                      <p className="text-white/90 text-xs sm:text-sm lg:text-xs font-medium mt-1">{doc.role}</p>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 lg:p-3">
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-xs leading-relaxed line-clamp-2">{doc.role}</p>
                    <div className="flex gap-2 mt-3 sm:mt-4 lg:mt-2">
                      <div className="h-1 sm:h-1.5 lg:h-1 w-10 sm:w-14 lg:w-10 bg-primary rounded-full"></div>
                      <div className="h-1 sm:h-1.5 lg:h-1 w-4 sm:w-5 lg:w-4 bg-secondary rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const [selectedService, setSelectedService] = useState<any>(null);
  const localizedBlogPosts = useBlogPosts();

  // Dynamic SEO meta tags
  const lang = i18n.language as "ro" | "ru" | "en";
  const seoConfig = seoConfigs.home[lang] || seoConfigs.home.ro;
  useSEO({
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    canonicalUrl: "https://cristalexdent.md/",
    ogImage: "https://cristalexdent.md/attached_assets/generated_images/dental-hero.png",
  });

  // Before/After cases for slider gallery
  const beforeAfterCases = [
    { beforeImage: beforeWhitening, afterImage: afterWhitening, title: t("before_after_cases.whitening") },
    { beforeImage: beforeBraces, afterImage: afterBraces, title: t("before_after_cases.braces") },
    { beforeImage: beforeRestoration, afterImage: afterRestoration, title: t("before_after_cases.restoration") },
  ];

  // Fetch data from external API
  const { data: apiBlogPosts } = useQuery<ExternalBlogPost[]>({
    queryKey: ["external-blog-posts"],
    queryFn: getExternalBlogPosts,
  });

  const { data: apiTeamMembers } = useQuery<ExternalTeamMember[]>({
    queryKey: ["external-team-members"],
    queryFn: getExternalTeamMembers,
  });

  const { data: apiTestimonials } = useQuery<ExternalTestimonial[]>({
    queryKey: ["external-testimonials"],
    queryFn: getExternalTestimonials,
  });

  const { data: apiServices } = useQuery<ExternalService[]>({
    queryKey: ["external-services"],
    queryFn: getExternalServices,
  });

  const stats = [
    { value: "5000+", label: t("stats.patients"), icon: Users },
    { value: "15+", label: t("stats.years"), icon: Clock },
    { value: "10k+", label: t("stats.implants"), icon: Award },
    { value: "12", label: t("stats.doctors"), icon: Microscope },
  ];


  const staticDoctors = [
    { name: t("about.doctors.dr_scutelnic_name"), role: t("about.doctors.dr_scutelnic_role"), img: drScutelnic, bio: t("about.doctors.dr_scutelnic_bio") },
    { name: t("about.doctors.dr_robu_name"), role: t("about.doctors.dr_robu_role"), img: drRobu, bio: t("about.doctors.dr_robu_bio") },
    { name: t("about.doctors.dr_plesca_name"), role: t("about.doctors.dr_plesca_role"), img: drPlesca, bio: t("about.doctors.dr_plesca_bio") },
    { name: t("about.doctors.dr_zanoaga_name"), role: t("about.doctors.dr_zanoaga_role"), img: drZanoaga, bio: t("about.doctors.dr_zanoaga_bio") },
    { name: t("about.doctors.dr_craciun_name"), role: t("about.doctors.dr_craciun_role"), img: drCraciun, bio: t("about.doctors.dr_craciun_bio") },
    { name: t("about.doctors.asst_barbarasa_name"), role: t("about.doctors.asst_barbarasa_role"), img: asstBarbarasa, bio: t("about.doctors.asst_barbarasa_bio") }
  ];

  const staticTestimonials = [
    { name: t("testimonials.test1_name"), role: t("testimonials.test1_role"), text: t("testimonials.test1_text") },
    { name: t("testimonials.test2_name"), role: t("testimonials.test2_role"), text: t("testimonials.test2_text") },
    { name: t("testimonials.test3_name"), role: t("testimonials.test3_role"), text: t("testimonials.test3_text") },
  ];

  // Use API data if available, otherwise fall back to static data
  const doctors = apiTeamMembers && apiTeamMembers.length > 0 
    ? apiTeamMembers.map((m) => {
        const imgPath = m.imageUrl || m.image || '';
        const fullImageUrl = imgPath.startsWith('http') ? imgPath : (imgPath ? `${EXTERNAL_BASE_URL}${imgPath}` : '');
        return { 
          name: m.name, 
          role: getTranslatedField(m, 'role' as any, i18n.language, m.role || ''),
          img: fullImageUrl, 
          bio: getTranslatedField(m, 'bio' as any, i18n.language, m.bio || '')
        };
      })
    : staticDoctors;
    
  const testimonialsData = apiTestimonials && apiTestimonials.length > 0
    ? apiTestimonials.map((t) => ({
        name: t.name,
        role: getTranslatedField(t, 'role' as any, i18n.language, t.role || ''),
        text: getTranslatedField(t, 'text' as any, i18n.language, t.text || '')
      }))
    : staticTestimonials;

  return (
    <Layout>
      {/* HERO SECTION - Fresh & Bright Medical Theme */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] lg:min-h-[75vh] xl:min-h-[70vh] flex items-center bg-white overflow-hidden pb-8 sm:pb-12 md:pb-10 lg:pb-8 -mt-20 pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={t("images.hero_interior_alt")}
            className="w-full h-full object-cover opacity-50 scale-105"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-4 sm:pt-6 md:pt-12 lg:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-4 lg:mb-3">
                <span className="h-px w-8 sm:w-10 md:w-12 bg-primary"></span>
                <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm">Cristalexdent Professional</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-3 sm:mb-4 md:mb-4 lg:mb-3 leading-tight">
                {t("hero.title")}
              </h1>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-slate-700 mb-4 sm:mb-6 md:mb-6 lg:mb-5 leading-relaxed max-w-xl border-l-4 border-primary pl-4 sm:pl-6">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-4 lg:gap-3">
                <BookingModal
                  buttonText={t("hero.cta")}
                  buttonClassName="bg-primary hover:bg-primary/90 text-white font-bold px-4 sm:px-6 md:px-6 lg:px-6 h-10 sm:h-12 md:h-11 lg:h-11 text-sm sm:text-base md:text-base rounded-lg shadow-lg hover:shadow-xl transition-all"
                />
                <Link href="/services">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold px-4 sm:px-6 md:px-6 lg:px-6 h-10 sm:h-12 md:h-11 lg:h-11 text-sm sm:text-base md:text-base rounded-lg shadow-md">
                    {t("nav.services")}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Card/Floating Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="bg-white p-5 lg:p-6 xl:p-8 rounded-lg shadow-2xl max-w-sm lg:max-w-md ml-auto relative z-10">
                <div className="flex items-start gap-3 lg:gap-4 mb-4 lg:mb-5">
                  <div className="bg-primary/10 p-2 lg:p-3 rounded-full">
                    <PhoneCall className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base lg:text-lg text-slate-900">{t("hero.emergency")}</h3>
                    <p className="text-xs lg:text-sm text-gray-500">{t("hero.available_247")}</p>
                  </div>
                </div>
                <hr className="border-gray-100 mb-4 lg:mb-5" />
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                    <span className="text-gray-700 font-medium text-sm lg:text-base">{t("hero.free_consultation")}</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                    <span className="text-gray-700 font-medium text-sm lg:text-base">{t("hero.digital_plan")}</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                    <span className="text-gray-700 font-medium text-sm lg:text-base">{t("hero.parking")}</span>
                  </div>
                </div>
              </div>
              {/* Decorative Pattern */}
              <div className="absolute -top-8 -right-8 w-24 h-24 lg:w-32 lg:h-32 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 lg:w-40 lg:h-40 bg-secondary/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BANNER - Fresh Light Theme */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent py-8 sm:py-10 md:py-12 lg:py-10 text-white relative z-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-6 lg:gap-4 text-center md:divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="p-2 sm:p-3 md:p-3 lg:p-2">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-5 lg:h-5 mx-auto mb-2 sm:mb-3 md:mb-2 text-white" />
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-sm lg:text-xs text-white/90 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES CAROUSEL / PREVIEW */}
      <section className="py-12 sm:py-16 md:py-16 lg:py-12 bg-white">
        <div className="container mx-auto px-4">
           <div className="text-center mb-8 sm:mb-12 md:mb-10 lg:mb-8">
             <h2 className="section-title">{t("services.title")}</h2>
             <p className="text-gray-500 text-sm sm:text-base md:text-base lg:text-sm">{t("services.subtitle")}</p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-5 lg:gap-4">
              {(apiServices && apiServices.length > 0
                ? apiServices.filter(s => s.isActive !== false).slice(0, 4).map((service: any) => {
                    const imgPath = service.imageUrl || service.image || '';
                    const fullImageUrl = imgPath.startsWith('http') ? imgPath : (imgPath ? `${EXTERNAL_BASE_URL}${imgPath}` : implantImage);

                    // Helper to get field with language suffix (titleRo, descEn, etc.)
                    const getField = (fieldBase: string) => {
                      const lang = i18n.language;
                      const suffix = lang === 'ro' ? 'Ro' : lang === 'ru' ? 'Ru' : 'En';
                      // Try language-specific field first
                      if (service[`${fieldBase}${suffix}`]) return service[`${fieldBase}${suffix}`];
                      // Fallback to other languages
                      if (service[`${fieldBase}En`]) return service[`${fieldBase}En`];
                      if (service[`${fieldBase}Ro`]) return service[`${fieldBase}Ro`];
                      // Fallback to base field
                      if (service[fieldBase]) return service[fieldBase];
                      return '';
                    };

                    // Get translated features
                    const getFeatures = (): string[] => {
                      const langKey = i18n.language as "ro" | "ru" | "en";
                      const translations = service.translations;
                      if (translations?.[langKey]?.features && Array.isArray(translations[langKey].features)) {
                        return translations[langKey].features;
                      }
                      if (translations?.ro?.features && Array.isArray(translations.ro.features)) {
                        return translations.ro.features;
                      }
                      return service.features || [];
                    };

                    return {
                      id: service._id,
                      title: getField('title') || getTranslatedField(service, 'name' as any, i18n.language, service.name || ''),
                      desc: getField('desc') || getTranslatedField(service, 'description' as any, i18n.language, service.description || ''),
                      img: fullImageUrl,
                      details: getField('desc') || getTranslatedField(service, 'description' as any, i18n.language, service.description || ''),
                      features: getFeatures()
                    };
                  })
                : [
                    {
                      id: '1',
                      title: t("services.implant"),
                      desc: t("services.implant_desc"),
                      img: implantImage,
                      details: t("services.implant_details"),
                      features: t("services.implant_features", { returnObjects: true }) as string[]
                    },
                    {
                      id: '2',
                      title: t("services.ortho"),
                      desc: t("services.ortho_desc"),
                      img: orthoImage,
                      details: t("services.ortho_details"),
                      features: t("services.ortho_features", { returnObjects: true }) as string[]
                    },
                    {
                      id: '3',
                      title: t("services.aesthetics"),
                      desc: t("services.aesthetics_desc"),
                      img: aestheticImage,
                      details: t("services.aesthetics_details"),
                      features: t("services.aesthetics_features", { returnObjects: true }) as string[]
                    },
                    {
                      id: '4',
                      title: t("services.endo"),
                      desc: t("services.endo_desc"),
                      img: endoImage,
                      details: t("services.endo_details"),
                      features: t("services.endo_features", { returnObjects: true }) as string[]
                    }
                  ]
              ).map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className="group relative h-[280px] sm:h-[320px] md:h-[320px] lg:h-[280px] xl:h-[300px] rounded-xl sm:rounded-2xl lg:rounded-xl overflow-hidden cursor-pointer shadow-lg transform transition-all duration-300 hover:-translate-y-2"
                >
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-5 lg:p-4 text-white">
                    <h3 className="text-base sm:text-lg md:text-lg lg:text-base font-bold mb-1 sm:mb-2 lg:mb-1 text-white">{s.title}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm lg:text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{s.desc}</p>
                    <div className="mt-2 sm:mt-3 md:mt-3 lg:mt-2 w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-8 lg:h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" />
                    </div>
                  </div>
                </div>
              ))}
           </div>

           <div className="text-center mt-6 sm:mt-8 md:mt-8 lg:mt-6">
             <Link href="/services">
               <Button className="bg-primary hover:bg-primary/90 active:bg-primary/80 text-white px-4 sm:px-6 md:px-6 lg:px-5 text-sm sm:text-base lg:text-sm font-bold transition-all hover:shadow-lg active:shadow-md cursor-pointer">{t("services.see_all")}</Button>
             </Link>
           </div>

           <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
            <DialogContent className="sm:max-w-[600px] bg-white p-0 overflow-hidden gap-0 border-0">
              {selectedService && (
                <>
                  <div className="relative h-48 w-full">
                    <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{selectedService.title}</h2>
                  </div>

                  <div className="p-6">
                    <DialogHeader className="mb-4 text-left">
                      <DialogDescription className="text-lg text-gray-700 leading-relaxed">
                        {selectedService.details}
                      </DialogDescription>
                    </DialogHeader>

                    {selectedService.features && selectedService.features.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {selectedService.features.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 bg-primary/10 p-2 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-gray-700">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end gap-3 mt-4">
                      <Button variant="outline" onClick={() => setSelectedService(null)}>{t("common.close") || "Închide"}</Button>
                      <BookingModal
                        buttonText={`${t("common.book") || "Programează"} ${selectedService.title}`}
                        buttonClassName="bg-primary hover:bg-primary/90 active:bg-primary/80 text-white font-bold rounded-lg transition-all hover:shadow-lg active:shadow-md cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* BEFORE/AFTER SECTION - After Services for Visual Proof */}
      <BeforeAfter 
        cases={beforeAfterCases}
        mainTitle={t("beforeafter.title")}
        mainSubtitle={t("beforeafter.subtitle")}
      />

      {/* CTA BANNER INTERMEDIAR - Strategic Call-to-Action */}
      <section className="py-8 sm:py-12 md:py-12 lg:py-10 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-8 lg:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-3">{t("cta_banner.free_title")}</h2>
            <p className="text-white/90 text-sm sm:text-base md:text-base lg:text-sm max-w-2xl mx-auto">
              {t("cta_banner.free_subtitle")}
            </p>
          </div>

          {/* Booking Widget - Always Open */}
          <div className="max-w-5xl lg:max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl lg:rounded-xl shadow-2xl overflow-hidden">
            <iframe
              src="https://my.businessdent.md/online-register.php?inst=1718966&ln=ro"
              className="w-full h-[500px] sm:h-[600px] md:h-[650px] lg:h-[550px] border-0"
              title="Programare Online - Cristalexdent"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
              loading="lazy"
              referrerPolicy="no-referrer"
              data-testid="iframe-booking-inline"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12 sm:py-16 md:py-16 lg:py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-10 lg:mb-8">
            <h2 className="section-title">{t("features.title")}</h2>
            <p className="section-subtitle">{t("services.subtitle_features")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-5 lg:gap-4 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white p-5 sm:p-6 md:p-6 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-10 lg:h-10 bg-primary/10 rounded-lg sm:rounded-xl lg:rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-4 lg:mb-3">
                <Microscope className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-5 lg:h-5 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-lg lg:text-base font-bold mb-2 sm:mb-3 lg:mb-2">{t("features.tech_title")}</h3>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-xs leading-relaxed">{t("features.tech_desc")}</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-5 sm:p-6 md:p-6 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-10 lg:h-10 bg-green-50 rounded-lg sm:rounded-xl lg:rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-4 lg:mb-3">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-5 lg:h-5 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg md:text-lg lg:text-base font-bold mb-2 sm:mb-3 lg:mb-2">{t("features.pain_title")}</h3>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-xs leading-relaxed">{t("features.pain_desc")}</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-5 sm:p-6 md:p-6 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-10 lg:h-10 bg-blue-50 rounded-lg sm:rounded-xl lg:rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-4 lg:mb-3">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-5 lg:h-5 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg md:text-lg lg:text-base font-bold mb-2 sm:mb-3 lg:mb-2">{t("features.garantie_title")}</h3>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-xs leading-relaxed">{t("features.garantie_desc")}</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-5 sm:p-6 md:p-6 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-10 lg:h-10 bg-purple-50 rounded-lg sm:rounded-xl lg:rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-4 lg:mb-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-5 lg:h-5 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg md:text-lg lg:text-base font-bold mb-2 sm:mb-3 lg:mb-2">{t("features.steril_title")}</h3>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-xs leading-relaxed">{t("features.steril_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS TEAM - Infinite Auto-Scrolling Carousel with Navigation */}
      <TeamCarousel doctors={doctors} t={t} />

      {/* TESTIMONIALS */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-2">{t("testimonials.title")}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-sm">{t("testimonials.subtitle")}</p>
          </div>

          <div className="max-w-6xl mx-auto relative">
             <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
                <CarouselContent className="-ml-2 sm:-ml-4 lg:-ml-3">
                  {testimonialsData.map((item: any, index: number) => (
                    <CarouselItem key={index} className="pl-2 sm:pl-4 lg:pl-3 md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-xl shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4 lg:mb-2">
                          {[1,2,3,4,5].map(star => <Star key={star} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 fill-accent text-accent" />)}
                        </div>
                        <p className="text-gray-700 italic mb-4 sm:mb-6 lg:mb-3 flex-grow leading-relaxed text-xs sm:text-sm md:text-base lg:text-sm">"{item.text}"</p>
                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-2 mt-auto pt-3 sm:pt-4 lg:pt-2 border-t border-gray-100">
                           <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-9 lg:h-9 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-sm sm:text-base md:text-lg lg:text-sm">
                             {item.name.charAt(0)}
                           </div>
                           <div>
                             <h4 className="font-bold text-xs sm:text-sm lg:text-xs text-gray-900">{item.name}</h4>
                             <p className="text-[10px] sm:text-xs lg:text-[10px] text-gray-500">{item.role}</p>
                           </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 h-10 w-10 md:h-12 md:w-12 lg:h-10 lg:w-10 bg-white hover:bg-primary hover:text-white border-2 border-gray-200 hover:border-primary transition-all" />
                <CarouselNext className="hidden md:flex -right-12 h-10 w-10 md:h-12 md:w-12 lg:h-10 lg:w-10 bg-white hover:bg-primary hover:text-white border-2 border-gray-200 hover:border-primary transition-all" />
             </Carousel>

             <div className="flex justify-center gap-2 mt-4 sm:mt-6 md:mt-8 lg:mt-4 md:hidden">
               <div className="text-[10px] sm:text-xs text-gray-500 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200">
                 {t("testimonials.swipe_hint")}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA REVIEWS */}
      <SocialReviews />

      {/* ABOUT US SECTION */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-10 items-start">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-6 lg:mb-3">
                <span className="h-px w-8 sm:w-10 md:w-12 lg:w-8 bg-primary"></span>
                <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm lg:text-xs">{t("about.title")}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-4 text-gray-900">{t("about.history_title")}</h2>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-sm mb-4 sm:mb-5 md:mb-6 lg:mb-3 leading-relaxed">
                {t("about.history_p1")}
              </p>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-sm mb-5 sm:mb-6 md:mb-8 lg:mb-4 leading-relaxed">
                {t("about.history_p2")}
              </p>

              <div className="bg-primary/10 p-4 sm:p-6 md:p-8 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-lg">
                <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-sm leading-relaxed font-medium">
                  {t("about.mission_text")}
                </p>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="rounded-xl sm:rounded-2xl lg:rounded-xl overflow-hidden shadow-2xl">
                <img src={teamPhoto} alt={t("images.team_photo_alt")} className="w-full h-auto object-cover" loading="lazy" decoding="async" />
              </div>

              {/* Stats Cards Overlay */}
              <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 lg:-bottom-4 -left-2 sm:-left-4 md:-left-8 lg:-left-4 bg-white p-3 sm:p-4 md:p-6 lg:p-3 rounded-lg sm:rounded-xl lg:rounded-lg shadow-xl border border-gray-100">
                <div className="text-xl sm:text-2xl md:text-4xl lg:text-2xl font-bold text-primary mb-1 sm:mb-2 lg:mb-1">2008</div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base lg:text-xs">{t("about.founded_year")}</div>
              </div>

              <div className="absolute -top-4 sm:-top-6 md:-top-8 lg:-top-4 -right-2 sm:-right-4 md:-right-8 lg:-right-4 bg-primary text-white p-3 sm:p-4 md:p-6 lg:p-3 rounded-lg sm:rounded-xl lg:rounded-lg shadow-xl">
                <div className="text-xl sm:text-2xl md:text-4xl lg:text-2xl font-bold mb-1 sm:mb-2 lg:mb-1">{new Date().getFullYear() - 2008}+</div>
                <div className="text-white/90 font-medium text-xs sm:text-sm md:text-base lg:text-xs">{t("about.years_experience")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST FROM BLOG */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-6">
            <h2 className="section-title block">{t("about.blog_title")}</h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-sm">{t("about.blog_subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-5">
            {(apiBlogPosts && apiBlogPosts.length > 0 ? apiBlogPosts : localizedBlogPosts).slice(0, 3).map((post: any) => {
              const postId = post._id || post.id;
              const postTitle = post.blogTitleEn
                ? getBlogField(post, 'blogTitle', i18n.language)
                : (post.title || '');
              const postExcerpt = post.blogIntroEn
                ? getBlogField(post, 'blogIntro', i18n.language)
                : (post.excerpt || '');

              return (
              <Link key={postId} href={`/blog/${postId}`} className="group cursor-pointer block">
                <div className="rounded-xl sm:rounded-2xl lg:rounded-xl overflow-hidden h-40 sm:h-52 md:h-64 lg:h-44 mb-3 sm:mb-4 md:mb-6 lg:mb-3 relative">
                  <img src={post.imageUrl || post.image} alt={postTitle} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute top-2 sm:top-3 md:top-4 lg:top-2 left-2 sm:left-3 md:left-4 lg:left-2 bg-white/90 backdrop-blur-md px-2 sm:px-3 lg:px-2 py-0.5 sm:py-1 lg:py-0.5 rounded-full text-[10px] sm:text-xs lg:text-[10px] font-bold text-primary uppercase">
                    {post.category || post.label}
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-2 text-xs sm:text-sm lg:text-xs text-gray-400 mb-2 sm:mb-3 lg:mb-1">
                  <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{post.author || 'CristAlex Dent'}</span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-base font-bold mb-2 sm:mb-3 lg:mb-1 group-hover:text-primary transition-colors line-clamp-2">{postTitle}</h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-xs line-clamp-2">{postExcerpt}</p>
              </Link>
              );
            })}
          </div>

          <div className="flex justify-end mt-4 sm:mt-6 md:mt-8 lg:mt-4">
            <Link href="/blog" className="text-primary font-bold hover:underline inline-flex items-center gap-1 sm:gap-2 lg:gap-1 text-sm sm:text-base lg:text-sm">
              {t("about.blog_see_all")} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-3 lg:h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-10 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="section-title block">{t("faq.title")}</h2>
          <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-6">
            <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-2">
              <AccordionItem value="item-1" className="border border-gray-100 rounded-lg px-3 sm:px-4 lg:px-3 shadow-sm">
                <AccordionTrigger className="hover:no-underline text-sm sm:text-base md:text-lg lg:text-sm font-medium py-4 sm:py-5 md:py-6 lg:py-3">{t("faq.q1")}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 sm:pb-5 md:pb-6 lg:pb-3 text-xs sm:text-sm md:text-base lg:text-sm">
                  {t("faq.a1")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-gray-100 rounded-lg px-3 sm:px-4 lg:px-3 shadow-sm">
                <AccordionTrigger className="hover:no-underline text-sm sm:text-base md:text-lg lg:text-sm font-medium py-4 sm:py-5 md:py-6 lg:py-3">{t("faq.q2")}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 sm:pb-5 md:pb-6 lg:pb-3 text-xs sm:text-sm md:text-base lg:text-sm">
                  {t("faq.a2")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-gray-100 rounded-lg px-3 sm:px-4 lg:px-3 shadow-sm">
                <AccordionTrigger className="hover:no-underline text-sm sm:text-base md:text-lg lg:text-sm font-medium py-4 sm:py-5 md:py-6 lg:py-3">{t("faq.q3")}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 sm:pb-5 md:pb-6 lg:pb-3 text-xs sm:text-sm md:text-base lg:text-sm">
                  {t("faq.a3")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-10 sm:py-14 md:py-20 lg:py-10 bg-primary relative overflow-hidden brandbook-gradient">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-6 lg:mb-3">{t("cta_banner.title")}</h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-sm mb-6 sm:mb-8 md:mb-10 lg:mb-5 max-w-2xl mx-auto">
            {t("cta_banner.text")}
          </p>
          <BookingModal
            buttonText={t("cta_banner.btn")}
            buttonClassName="bg-white text-primary hover:bg-gray-100 font-bold px-6 sm:px-8 md:px-12 lg:px-8 h-10 sm:h-12 md:h-16 lg:h-11 text-sm sm:text-base md:text-xl lg:text-base shadow-2xl rounded-full"
          />
        </div>
      </section>
    </Layout>
  );
}