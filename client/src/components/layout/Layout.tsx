import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Phone, MapPin, Clock, Facebook, Instagram, Youtube, MessageCircle, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingModal } from "@/components/BookingModal";
import logo from "@assets/logo CristAlex Dent_1763723661858.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "ro", label: "Română", flag: "🇷🇴" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    setLangDropdownOpen(false);
  };

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+373 78388000</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>str. Alba Iulia 23, Chișinău</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Lun-Vin: 09:00 - 18:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              <img src={logo} alt="CristAlex Dent" className="h-12 w-auto" />
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href ? "text-primary font-bold" : "text-gray-600"
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}
            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all font-medium text-gray-700 hover:text-primary border-2 border-transparent hover:border-primary/20"
                title="Schimbă limba"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-bold">{i18n.language.toUpperCase()}</span>
              </button>
              
              {/* Dropdown Menu */}
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50 min-w-40"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        i18n.language === lang.code
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {i18n.language === lang.code && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            <BookingModal 
              buttonText={t("nav.book")}
              buttonClassName="bg-primary hover:bg-primary/90 text-white font-bold shadow-md h-11 px-6"
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 z-40 bg-white md:hidden p-6 flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-medium text-gray-800"
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-2" />
              <BookingModal 
                buttonText={t("nav.book")}
                buttonClassName="w-full mt-4 bg-primary h-12 text-lg"
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pb-20 md:pb-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src={logo} alt="CristAlex Dent" className="h-10 w-auto brightness-0 invert" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Clinica stomatologică modernă dedicată sănătății și frumuseții zâmbetului tău. Tehnologie de ultimă generație și specialiști de top.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">{t("nav.services")}</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Implantologie</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ortodonție</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Estetică Dentară</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chirurgie</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Contact</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
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
                  <span>Lun - Vin: 09:00 - 18:00<br/>Sâm: 09:00 - 13:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Social</h4>
              <div className="flex gap-4">
                <a 
                  href="https://facebook.com/cristalexdent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full hover:bg-primary transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://instagram.com/cristalexdent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full hover:bg-primary transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://youtube.com/@cristalexdent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full hover:bg-primary transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="text-center text-gray-500 text-sm mb-4">
              © 2025 CristAlex Dent. All rights reserved.
            </div>
            <div className="text-center text-gray-600 text-sm">
              {t("footer.developed_by")} <a href="https://ishunea.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/90 font-semibold transition-colors">iShunea Tech Solutions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Contact Bottom Bar - Visible only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden pb-safe">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {/* WhatsApp */}
          <a
            href="https://wa.me/37378388000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-3 px-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
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
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-3 px-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
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
            className="flex flex-col items-center justify-center py-3 px-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
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