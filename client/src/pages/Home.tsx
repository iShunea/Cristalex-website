import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Users, Award, Clock, CheckCircle2, 
  Star, Microscope, Sparkles, PhoneCall, ArrowRight,
  HelpCircle, ChevronDown
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

import heroImage from "@assets/generated_images/modern_bright_dental_clinic_reception_area.png";
import doctorImage from "@assets/generated_images/friendly_professional_dentist_portrait.png";
import techImage from "@assets/generated_images/dental_digital_technology_scanner.png";
import sterileImage from "@assets/generated_images/dental_sterilization_equipment.png";
import implantImage from "@assets/generated_images/dental_implant_model.png";
import orthoImage from "@assets/generated_images/invisible_dental_aligners.png";
import aestheticImage from "@assets/generated_images/perfect_dental_veneers_smile.png";
import endoImage from "@assets/generated_images/dental_microscope_treatment.png";

export default function Home() {
  const { t } = useTranslation();

  const stats = [
    { value: "5000+", label: t("stats.patients"), icon: Users },
    { value: "15+", label: t("stats.years"), icon: Clock },
    { value: "10k+", label: t("stats.implants"), icon: Award },
    { value: "12", label: t("stats.doctors"), icon: Microscope },
  ];

  const testimonials = [
    { name: "Maria Popescu", role: "Pacient Implantologie", text: "O experiență incredibilă. Mi-am recăpătat zâmbetul după ani de zile. Echipa este extrem de profesionistă." },
    { name: "Ion Rusu", role: "Pacient Ortodonție", text: "Tehnologie de vârf și o atmosferă foarte primitoare. Recomand cu încredere CristalEx Dent." },
    { name: "Elena Munteanu", role: "Estetică Dentară", text: "Fațetele dentare arată perfect natural. Mulțumesc doamnei doctor pentru răbdare și perfecționism." },
  ];

  return (
    <Layout>
      {/* HERO SECTION - More Corporate & Impactful */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Dental Clinic Interior" 
            className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-12 bg-secondary"></span>
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">CristalEx Dent Corporate</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl border-l-4 border-secondary pl-6">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8 h-14 text-lg rounded-none">
                  {t("hero.cta")}
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 font-bold px-8 h-14 text-lg rounded-none">
                  {t("nav.services")}
                </Button>
              </div>
            </motion.div>
            
            {/* Hero Card/Floating Element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md ml-auto relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <PhoneCall className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{t("hero.emergency")}</h3>
                    <p className="text-sm text-gray-500">Disponibili pentru tine 24/7</p>
                  </div>
                </div>
                <hr className="border-gray-100 mb-6" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 font-medium">Consultatie Gratuită</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 font-medium">Plan de tratament digital</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 font-medium">Parcare asigurată</span>
                  </div>
                </div>
              </div>
              {/* Decorative Pattern */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-primary py-12 text-white relative z-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="p-4">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-blue-200 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Bento Grid Style */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">{t("features.title")}</h2>
            <p className="section-subtitle">Standarde ridicate, tehnologie de ultimă oră și o abordare umană.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Feature */}
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <Microscope className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t("features.tech_title")}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{t("features.tech_desc")}</p>
                <Button variant="link" className="p-0 text-primary font-bold">Află mai multe <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </div>
              <div className="flex-1 h-full min-h-[200px] bg-gray-100 rounded-xl overflow-hidden relative">
                <img src={techImage} className="absolute inset-0 w-full h-full object-cover" alt="Tech" />
              </div>
            </div>

            {/* Small Feature 1 */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t("features.garantie_title")}</h3>
                <p className="text-gray-400 text-sm">{t("features.garantie_desc")}</p>
              </div>
            </div>

            {/* Small Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("features.pain_title")}</h3>
              <p className="text-gray-600 text-sm">{t("features.pain_desc")}</p>
            </div>

            {/* Large Feature 2 */}
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t("features.steril_title")}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{t("features.steril_desc")}</p>
              </div>
              <div className="flex-1 h-full min-h-[200px] bg-gray-100 rounded-xl overflow-hidden relative">
                <img src={sterileImage} className="absolute inset-0 w-full h-full object-cover" alt="Sterile" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES CAROUSEL / PREVIEW */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div className="max-w-2xl">
               <h2 className="section-title text-left">{t("services.title")}</h2>
               <p className="text-gray-500 text-lg">{t("services.subtitle")}</p>
             </div>
             <Button className="bg-primary text-white px-8">Vezi Toate Serviciile</Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t("services.implant"), desc: t("services.implant_desc"), img: implantImage },
                { title: t("services.ortho"), desc: t("services.ortho_desc"), img: orthoImage },
                { title: t("services.aesthetics"), desc: t("services.aesthetics_desc"), img: aestheticImage },
                { title: t("services.endo"), desc: t("services.endo_desc"), img: endoImage }
              ].map((s, i) => (
                <div key={i} className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg">
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-6 text-white transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{s.desc}</p>
                    <div className="mt-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title block">{t("testimonials.title")}</h2>
          <p className="section-subtitle">{t("testimonials.subtitle")}</p>
          
          <div className="max-w-5xl mx-auto">
             <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-6">
                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                        <div className="flex gap-1 mb-4">
                          {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-accent text-accent" />)}
                        </div>
                        <p className="text-gray-600 italic mb-6 flex-grow">"{item.text}"</p>
                        <div className="flex items-center gap-3 mt-auto">
                           <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                             {item.name.charAt(0)}
                           </div>
                           <div>
                             <h4 className="font-bold text-sm">{item.name}</h4>
                             <p className="text-xs text-gray-400">{item.role}</p>
                           </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
             </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="section-title block">{t("faq.title")}</h2>
          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-gray-100 rounded-lg px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline text-lg font-medium py-6">{t("faq.q1")}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {t("faq.a1")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-gray-100 rounded-lg px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline text-lg font-medium py-6">{t("faq.q2")}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {t("faq.a2")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-gray-100 rounded-lg px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline text-lg font-medium py-6">{t("faq.q3")}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {t("faq.a3")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">{t("cta_banner.title")}</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            {t("cta_banner.text")}
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-12 h-16 text-xl shadow-2xl rounded-full">
            {t("cta_banner.btn")}
          </Button>
        </div>
      </section>
    </Layout>
  );
}