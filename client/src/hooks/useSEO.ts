import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noIndex?: boolean;
}

export function useSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Set standard meta tags
    setMetaTag("description", description);
    if (keywords) setMetaTag("keywords", keywords);
    setMetaTag("robots", noIndex ? "noindex, nofollow" : "index, follow");

    // Set Open Graph tags
    setMetaTag("og:title", ogTitle || title, true);
    setMetaTag("og:description", ogDescription || description, true);
    setMetaTag("og:type", ogType, true);
    if (ogImage) setMetaTag("og:image", ogImage, true);
    if (canonicalUrl) setMetaTag("og:url", canonicalUrl, true);

    // Set Twitter tags
    setMetaTag("twitter:card", twitterCard);
    setMetaTag("twitter:title", ogTitle || title);
    setMetaTag("twitter:description", ogDescription || description);
    if (ogImage) setMetaTag("twitter:image", ogImage);

    // Set canonical URL
    if (canonicalUrl) {
      setLinkTag("canonical", canonicalUrl);
    }

    // Cleanup function
    return () => {
      // Reset to default title on unmount if needed
      // document.title = "Cristalexdent";
    };
  }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogImage, ogType, twitterCard, noIndex]);
}

// Predefined SEO configs for each page
export const seoConfigs = {
  home: {
    ro: {
      title: "Cristalexdent - Clinica Stomatologică în Chișinău | Implantologie, Ortodonție",
      description: "Cristalexdent - clinică stomatologică de încredere în Chișinău. Oferim servicii de implantologie, ortodonție, estetică dentară, chirurgie și tratamente moderne.",
      keywords: "stomatologie Chișinău, clinică dentară, implant dentar, ortodonție, aparat dentar, albire dinți, fațete dentare, Cristalexdent",
    },
    ru: {
      title: "Cristalexdent - Стоматологическая клиника в Кишинёве | Имплантология, Ортодонтия",
      description: "Cristalexdent - надежная стоматологическая клиника в Кишинёве. Предлагаем услуги имплантологии, ортодонтии, эстетической стоматологии и современные методы лечения.",
      keywords: "стоматология Кишинёв, стоматологическая клиника, зубной имплант, ортодонтия, брекеты, отбеливание зубов, виниры, Cristalexdent",
    },
    en: {
      title: "Cristalexdent - Dental Clinic in Chisinau | Implantology, Orthodontics",
      description: "Cristalexdent - trusted dental clinic in Chisinau. We offer implantology, orthodontics, dental aesthetics, surgery and modern treatments.",
      keywords: "dentistry Chisinau, dental clinic, dental implant, orthodontics, braces, teeth whitening, dental veneers, Cristalexdent",
    },
  },
  about: {
    ro: {
      title: "Despre Noi - Cristalexdent | Echipa Noastră de Stomatologi",
      description: "Descoperiți echipa Cristalexdent - profesioniști cu experiență în stomatologie. Din 2008 oferim îngrijire dentară de calitate în Chișinău.",
      keywords: "despre Cristalexdent, echipa stomatologică, doctori stomatologi Chișinău, clinică dentară experiență",
    },
    ru: {
      title: "О Нас - Cristalexdent | Наша Команда Стоматологов",
      description: "Познакомьтесь с командой Cristalexdent - профессионалами в стоматологии. С 2008 года мы предоставляем качественную стоматологическую помощь в Кишинёве.",
      keywords: "о Cristalexdent, стоматологическая команда, стоматологи Кишинёв, опытная стоматологическая клиника",
    },
    en: {
      title: "About Us - Cristalexdent | Our Dental Team",
      description: "Meet the Cristalexdent team - experienced dental professionals. Since 2008 we provide quality dental care in Chisinau.",
      keywords: "about Cristalexdent, dental team, dentists Chisinau, experienced dental clinic",
    },
  },
  services: {
    ro: {
      title: "Servicii Stomatologice - Cristalexdent | Implantologie, Ortodonție, Chirurgie",
      description: "Servicii complete de stomatologie: implantologie, ortodonție, estetică dentară, chirurgie orală, stomatologie pediatrică. Tratamente moderne în Chișinău.",
      keywords: "servicii stomatologice, implant dentar preț, ortodonție Chișinău, albire dinți, fațete dentare, chirurgie dentară",
    },
    ru: {
      title: "Стоматологические Услуги - Cristalexdent | Имплантология, Ортодонтия, Хирургия",
      description: "Полный спектр стоматологических услуг: имплантология, ортодонтия, эстетическая стоматология, хирургия, детская стоматология. Современное лечение в Кишинёве.",
      keywords: "стоматологические услуги, зубной имплант цена, ортодонтия Кишинёв, отбеливание зубов, виниры, стоматологическая хирургия",
    },
    en: {
      title: "Dental Services - Cristalexdent | Implantology, Orthodontics, Surgery",
      description: "Complete dental services: implantology, orthodontics, dental aesthetics, oral surgery, pediatric dentistry. Modern treatments in Chisinau.",
      keywords: "dental services, dental implant price, orthodontics Chisinau, teeth whitening, dental veneers, dental surgery",
    },
  },
  blog: {
    ro: {
      title: "Blog - Cristalexdent | Sfaturi și Noutăți în Stomatologie",
      description: "Blog Cristalexdent - articole despre sănătatea dentară, sfaturi de îngrijire, noutăți în stomatologie și tratamente moderne.",
      keywords: "blog stomatologie, sfaturi sănătate dentară, îngrijire dinți, noutăți stomatologie",
    },
    ru: {
      title: "Блог - Cristalexdent | Советы и Новости Стоматологии",
      description: "Блог Cristalexdent - статьи о здоровье зубов, советы по уходу, новости стоматологии и современные методы лечения.",
      keywords: "блог стоматология, советы здоровье зубов, уход за зубами, новости стоматологии",
    },
    en: {
      title: "Blog - Cristalexdent | Dental Tips and News",
      description: "Cristalexdent Blog - articles about dental health, care tips, dentistry news and modern treatments.",
      keywords: "dentistry blog, dental health tips, teeth care, dentistry news",
    },
  },
  contact: {
    ro: {
      title: "Contact - Cristalexdent | Programări și Locație Chișinău",
      description: "Contactează Cristalexdent pentru programări. Adresa clinicii în Chișinău, telefon, email și formular de contact online.",
      keywords: "contact Cristalexdent, programare stomatolog, adresa clinică dentară Chișinău, telefon stomatolog",
    },
    ru: {
      title: "Контакты - Cristalexdent | Запись и Адрес в Кишинёве",
      description: "Свяжитесь с Cristalexdent для записи. Адрес клиники в Кишинёве, телефон, email и онлайн-форма связи.",
      keywords: "контакты Cristalexdent, запись к стоматологу, адрес стоматологии Кишинёв, телефон стоматолог",
    },
    en: {
      title: "Contact - Cristalexdent | Appointments & Location Chisinau",
      description: "Contact Cristalexdent for appointments. Clinic address in Chisinau, phone, email and online contact form.",
      keywords: "contact Cristalexdent, dentist appointment, dental clinic address Chisinau, dentist phone",
    },
  },
};
