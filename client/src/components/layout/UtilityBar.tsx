import { Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useState, useEffect } from "react";

export function UtilityBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide când scroll down > 50px, Show când scroll up
      if (currentScrollY > 50) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`hidden md:block bg-gray-50 transition-transform duration-300 border-b border-gray-100 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-2.5 text-sm">
          {/* Contact Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>L-V: 9:00-18:00 | S: 9:00-13:00</span>
            </div>
            <a
              href="https://www.google.com/maps/place/Cristalex+Dent/@47.0346182,28.7739308,565m/data=!3m2!1e3!4b1!4m6!3m5!1s0x40c97d8f45cc6361:0xe7a27095dc95ae87!8m2!3d47.0346146!4d28.7765057!16s%2Fg%2F11k40qtv_2?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>str. Alba Iulia 23, Chișinău</span>
            </a>
            <a
              href="tel:+37378388000"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+373 78 388 000</span>
            </a>

            {/* Social Links */}
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            <a
              href="https://facebook.com/cristalexdent"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/cristalexdent"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com/@cristalexdent"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="TikTok"
            >
              <SiTiktok className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
