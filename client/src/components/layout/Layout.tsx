import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ro" ? "ru" : "ro");
  };

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
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
              <span>+373 22 000 000</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Chișinău, Moldova</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Lun-Vin: 09:00 - 19:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1 hover:text-secondary transition-colors font-medium"
            >
              <Globe className="w-4 h-4" />
              {i18n.language.toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              {/* Logo Placeholder */}
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none text-primary">CristalEx</span>
                <span className="font-heading font-medium text-sm tracking-wider text-gray-500">DENT</span>
              </div>
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
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-md">
              {t("nav.book")}
            </Button>
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
              <button onClick={toggleLang} className="flex items-center justify-center gap-2 text-lg font-medium">
                <Globe className="w-5 h-5" />
                {i18n.language === 'ro' ? 'Română' : 'Русский'}
              </button>
              <Button size="lg" className="w-full mt-4 bg-primary">
                {t("nav.book")}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold">C</div>
                <span className="font-heading font-bold text-lg">CristalEx Dent</span>
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
                  <span>Str. Exemplu 123,<br/>Chișinău, Moldova</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>+373 22 000 000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>Lun - Vin: 09:00 - 19:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Social</h4>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-10 h-10 bg-white/10 rounded-full hover:bg-primary transition-colors cursor-pointer" />
                <div className="w-10 h-10 bg-white/10 rounded-full hover:bg-primary transition-colors cursor-pointer" />
                <div className="w-10 h-10 bg-white/10 rounded-full hover:bg-primary transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            © 2025 CristalEx Dent. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}