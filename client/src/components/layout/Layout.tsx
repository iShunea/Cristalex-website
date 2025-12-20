import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Phone, MapPin, Clock, Facebook, Instagram, MessageCircle, Check, ChevronDown, ArrowUp } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useState, useRef, useEffect } from "react";
import { BookingModal } from "@/components/BookingModal";
import { useQuery } from "@tanstack/react-query";
import { getExternalServices, ExternalService, getTranslatedField } from "@/lib/api";
import logo from "@assets/logo CristAlex Dent_1763723661858.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [tratamenteDropdownOpen, setTratamenteDropdownOpen] = useState(false);
  const [despreNoiDropdownOpen, setDespreNoiDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileTratamenteExpanded, setMobileTratamenteExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const tratamenteDropdownRef = useRef<HTMLDivElement>(null);
  const despreNoiDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (tratamenteDropdownRef.current && !tratamenteDropdownRef.current.contains(event.target as Node)) {
        setTratamenteDropdownOpen(false);
      }
      if (despreNoiDropdownRef.current && !despreNoiDropdownRef.current.contains(event.target as Node)) {
        setDespreNoiDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const languages = [
    { code: "ro", label: "Română" },
    { code: "ru", label: "Rusă" },
    { code: "en", label: "Engleză" },
  ];

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    setLangDropdownOpen(false);
  };

  // Fetch services from API
  const { data: apiServices } = useQuery<ExternalService[]>({
    queryKey: ["external-services"],
    queryFn: getExternalServices,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Static fallback services
  const staticServices = [
    { id: "implant", label: t("services.implant") },
    { id: "therapy", label: t("services.therapy") },
    { id: "endo", label: t("services.endo") },
    { id: "prophy", label: t("services.prophy") },
    { id: "prosth", label: t("services.prosth") },
    { id: "pedo", label: t("services.pedo") },
    { id: "extraction", label: t("services.extraction") },
    { id: "sinus", label: t("services.sinus") },
  ];

  // Helper to get field with language suffix (titleRo, descEn, etc.)
  const getServiceField = (service: any, fieldBase: string) => {
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

  // Use API services if available, otherwise fall back to static
  const services = apiServices && apiServices.length > 0
    ? apiServices.filter(s => s.isActive !== false).map((s: any) => ({
        id: s._id,
        label: getServiceField(s, 'title') || getTranslatedField(s, 'name' as any, i18n.language, s.name || '')
      }))
    : staticServices;

  // About Us submenu items
  const aboutItems = [
    { href: "/about#team", label: t("nav.team") },
    { href: "/about#mission", label: t("nav.mission") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{t("contact.phone")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{t("contact.address")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{t("top_bar.schedule")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={logo} alt={t("images.logo_alt")} className="h-12 w-auto" loading="eager" decoding="async" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Home */}
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${
              location === "/" ? "text-primary font-bold" : "text-gray-600"
            }`}>
              {t("nav.home")}
            </Link>

            {/* Despre Noi Dropdown */}
            <div className="relative" ref={despreNoiDropdownRef}>
              <button
                onClick={() => setDespreNoiDropdownOpen(!despreNoiDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location.startsWith("/about") ? "text-primary font-bold" : "text-gray-600"
                }`}
              >
                {t("nav.about")}
                <ChevronDown className={`w-4 h-4 transition-transform ${despreNoiDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50 min-w-48 py-2 transition-all duration-200 origin-top ${
                  despreNoiDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {aboutItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDespreNoiDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tratamente Dropdown */}
            <div className="relative" ref={tratamenteDropdownRef}>
              <button
                onClick={() => setTratamenteDropdownOpen(!tratamenteDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location.startsWith("/services") ? "text-primary font-bold" : "text-gray-600"
                }`}
              >
                {t("nav.treatments")}
                <ChevronDown className={`w-4 h-4 transition-transform ${tratamenteDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50 min-w-56 py-2 transition-all duration-200 origin-top ${
                  tratamenteDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services#${service.id}`}
                    onClick={() => setTratamenteDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Blog */}
            <Link href="/blog" className={`text-sm font-medium transition-colors hover:text-primary ${
              location === "/blog" ? "text-primary font-bold" : "text-gray-600"
            }`}>
              {t("nav.blog")}
            </Link>

            {/* Contact */}
            <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${
              location === "/contact" ? "text-primary font-bold" : "text-gray-600"
            }`}>
              {t("nav.contact")}
            </Link>

            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all font-bold text-gray-700 hover:text-primary border-2 border-gray-200 hover:border-primary/40 active:border-primary/60 hover:shadow-md active:shadow-sm cursor-pointer"
                title={t("top_bar.change_language")}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{i18n.language.toUpperCase()}</span>
              </button>
              
              {/* Dropdown Menu */}
              <div
                className={`absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50 min-w-40 transition-all duration-200 origin-top ${
                  langDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLang(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all cursor-pointer ${
                      i18n.language === lang.code
                        ? "bg-primary/15 text-primary font-bold border-l-4 border-primary"
                        : "text-gray-700 hover:bg-gray-50 active:bg-gray-100 hover:translate-x-1"
                    }`}
                  >
                    <span className="flex-1">{lang.label}</span>
                    {i18n.language === lang.code && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
            <BookingModal 
              buttonText={t("nav.book")}
              buttonClassName="bg-primary hover:bg-primary/90 active:bg-primary/80 text-white font-bold shadow-md h-11 px-6 rounded-lg transition-all hover:shadow-lg active:shadow-md cursor-pointer"
            />
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-20 z-40 bg-white md:hidden p-6 flex flex-col gap-4 overflow-y-auto transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
            <nav className="flex flex-col gap-2">
              {/* Home */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-50"
              >
                {t("nav.home")}
              </Link>

              {/* Despre Noi - Expandable */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                  className="flex items-center justify-between text-lg font-medium text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-50"
                >
                  {t("nav.about")}
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileAboutExpanded ? "rotate-180" : ""}`} />
                </button>
                {mobileAboutExpanded && (
                  <div className="ml-4 flex flex-col gap-1 border-l-2 border-primary/20 pl-4">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base text-gray-600 py-2 px-3 rounded-lg hover:bg-primary/10 hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Tratamente - Expandable */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileTratamenteExpanded(!mobileTratamenteExpanded)}
                  className="flex items-center justify-between text-lg font-medium text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-50"
                >
                  {t("nav.treatments")}
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileTratamenteExpanded ? "rotate-180" : ""}`} />
                </button>
                {mobileTratamenteExpanded && (
                  <div className="ml-4 flex flex-col gap-1 border-l-2 border-primary/20 pl-4">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services#${service.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base text-gray-600 py-2 px-3 rounded-lg hover:bg-primary/10 hover:text-primary"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Blog */}
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-50"
              >
                {t("nav.blog")}
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-50"
              >
                {t("nav.contact")}
              </Link>

              <div className="h-px bg-gray-100 my-2" />

              {/* Mobile Language Selector */}
              <div className="flex flex-col gap-2">
                <div className="text-sm font-bold text-gray-600 px-4">{t("top_bar.change_language")}</div>
                <div className="grid grid-cols-3 gap-2 px-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLang(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg transition-all font-semibold ${
                        i18n.language === lang.code
                          ? "bg-primary text-white shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                      }`}
                    >
                      <span className="text-sm">{lang.label}</span>
                      {i18n.language === lang.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              <BookingModal
                buttonText={t("nav.book")}
                buttonClassName="w-full mt-4 bg-primary hover:bg-primary/90 active:bg-primary/80 h-12 text-lg font-bold rounded-lg transition-all hover:shadow-lg active:shadow-md cursor-pointer"
              />
            </nav>
      </div>

      <main className="flex-grow pb-20 md:pb-0 pt-20">
        {children}
      </main>

      {/* Footer - Fresh Light Theme */}
      <footer className="bg-gradient-to-br from-primary/5 via-white to-accent/5 border-t border-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src={logo} alt={t("images.logo_alt")} className="h-10 w-auto" loading="lazy" decoding="async" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("footer.description")}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg text-slate-900">{t("nav.services")}</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li><Link href="/services#implant" className="hover:text-primary transition-colors">{t("footer.implantology")}</Link></li>
                <li><Link href="/services#therapy" className="hover:text-primary transition-colors">{t("footer.orthodontics")}</Link></li>
                <li><Link href="/services#prosth" className="hover:text-primary transition-colors">{t("footer.aesthetic")}</Link></li>
                <li><Link href="/services#extraction" className="hover:text-primary transition-colors">{t("footer.surgery")}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg text-slate-900">{t("footer.contact")}</h4>
              <ul className="space-y-4 text-gray-600 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>str. Alba Iulia 23,<br/>Chișinău, Moldova</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>+373 78388000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>{t("footer.schedule")}<br/>{t("footer.saturday")}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg text-slate-900">{t("footer.social")}</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/cristalexdent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 rounded-full hover:bg-primary transition-colors cursor-pointer flex items-center justify-center group"
                  aria-label="Facebook"
                  data-testid="link-facebook"
                >
                  <Facebook className="w-5 h-5 text-primary group-hover:text-white" />
                </a>
                <a 
                  href="https://www.instagram.com/cristalexdent/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 rounded-full hover:bg-primary transition-colors cursor-pointer flex items-center justify-center group"
                  aria-label="Instagram"
                  data-testid="link-instagram"
                >
                  <Instagram className="w-5 h-5 text-primary group-hover:text-white" />
                </a>
                <a 
                  href="https://www.tiktok.com/@cristalexdent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 rounded-full hover:bg-primary transition-colors cursor-pointer flex items-center justify-center group"
                  aria-label="TikTok"
                  data-testid="link-tiktok"
                >
                  <SiTiktok className="w-5 h-5 text-primary group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="text-center text-gray-500 text-sm mb-4">
              {t("footer.rights")}
            </div>
            <div className="text-center text-gray-600 text-sm">
              {t("footer.developed_by")} <a href="https://ishunea.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/90 font-semibold transition-colors">iShunea Tech Solutions</a> {t("footer.and")} <a href="https://easyreserv.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/90 font-semibold transition-colors">Easyreserv.io</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 w-12 h-12 bg-primary hover:bg-primary/90 active:bg-primary/80 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer ${
          showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Mobile Contact Bottom Bar - Visible only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden pb-safe">
        <div className="grid grid-cols-4 divide-x divide-gray-200">
          {/* Phone Call */}
          <a
            href="tel:+37378388000"
            className="flex flex-col items-center justify-center py-3 px-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            aria-label="Sună acum"
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-1">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700">{t("footer.call")}</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/37378388000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-3 px-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            aria-label="Contact WhatsApp"
          >
            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center mb-1">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700">WhatsApp</span>
          </a>

          {/* Viber */}
          <a
            href="viber://chat?number=%2B37378388000"
            className="flex flex-col items-center justify-center py-3 px-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            aria-label="Contact Viber"
          >
            <div className="w-10 h-10 bg-[#7360F2] rounded-full flex items-center justify-center mb-1">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700">Viber</span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/+37378388000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-3 px-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            aria-label="Contact Telegram"
          >
            <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center mb-1">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700">Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
}