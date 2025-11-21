import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Star, Calendar, Shield, User, Phone } from "lucide-react";
import heroImage from "@assets/generated_images/modern_bright_dental_clinic_reception_area.png";
import doctorImage from "@assets/generated_images/friendly_professional_dentist_portrait.png";
import smileImage from "@assets/generated_images/close_up_of_perfect_white_smile.png";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Dental Clinic" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block">
              CristalEx Dent
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg h-14 px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                {t("hero.cta")}
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-white/50 hover:bg-white">
                {t("nav.services")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-12 bg-primary text-white relative z-20 -mt-10 mx-4 md:mx-20 rounded-xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20 px-8">
          <div className="flex items-center gap-4 justify-center p-4">
            <Shield className="w-10 h-10 text-secondary" />
            <div>
              <h3 className="font-bold text-lg">{t("features.tech")}</h3>
              <p className="text-sm text-blue-100">Echipament de ultimă generație</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center p-4">
            <User className="w-10 h-10 text-secondary" />
            <div>
              <h3 className="font-bold text-lg">{t("features.team")}</h3>
              <p className="text-sm text-blue-100">Medici cu experiență vastă</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center p-4">
            <Star className="w-10 h-10 text-secondary" />
            <div>
              <h3 className="font-bold text-lg">{t("features.care")}</h3>
              <p className="text-sm text-blue-100">Abordare personalizată</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={doctorImage} alt="Doctor" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <div className="text-sm text-gray-500 leading-tight">Ani de<br/>Experiență</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">{t("about.title")}</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t("about.text")}
                <br /><br />
                La CristalEx Dent, credem că fiecare zâmbet este unic. De aceea, investim constant în educația echipei noastre și în cele mai noi tehnologii stomatologice pentru a vă oferi tratamente sigure, eficiente și fără durere.
              </p>
              <ul className="space-y-4 mb-8">
                {["Mediu steril și sigur", "Tratamente fără durere", "Planuri flexibile de tratament"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Check className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                {t("nav.about")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("services.title")}</h2>
            <p className="text-gray-600">Oferim o gamă completă de servicii stomatologice pentru întreaga familie.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t("services.implant"), icon: "🦷", desc: "Soluții permanente pentru dinți lipsă" },
              { title: t("services.ortho"), icon: "✨", desc: "Îndreptarea dinților pentru un zâmbet perfect" },
              { title: t("services.cosmetic"), icon: "💎", desc: "Fațete, albire și estetică avansată" },
              { title: t("services.general"), icon: "🛡️", desc: "Prevenție și tratamente de rutină" }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
                <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-500 mb-6 text-sm">{service.desc}</p>
                <a href="#" className="text-primary font-semibold text-sm hover:underline">Află mai multe →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">{t("hero.cta")}</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Programează o consultație astăzi și fă primul pas spre zâmbetul pe care l-ai visat dintotdeauna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-10 h-14 text-lg">
              <Calendar className="w-5 h-5 mr-2" />
              {t("nav.book")}
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 h-14 px-10 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              {t("contact.phone")}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}