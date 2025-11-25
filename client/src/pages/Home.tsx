import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Users, Award, Clock, CheckCircle2, 
  Star, Microscope, Sparkles, PhoneCall, ArrowRight,
  HelpCircle, ChevronDown, X
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
import { blogPosts } from "./Blog";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts, getTeamMembers, getTestimonials } from "@/lib/api";
import { BookingModal } from "@/components/BookingModal";
import { BeforeAfter } from "@/components/BeforeAfter";

import heroImage from "@assets/generated_images/modern_bright_dental_clinic_reception_area.png";
import doctorImage from "@assets/generated_images/friendly_professional_dentist_portrait.png";
import techImage from "@assets/generated_images/dental_digital_technology_scanner.png";
import sterileImage from "@assets/generated_images/dental_sterilization_equipment.png";
import implantImage from "@assets/generated_images/dental_implant_model.png";
import orthoImage from "@assets/generated_images/invisible_dental_aligners.png";
import aestheticImage from "@assets/generated_images/perfect_dental_veneers_smile.png";
import endoImage from "@assets/generated_images/dental_microscope_treatment.png";

import drScutelnic from "@assets/generated_images/portrait_of_dr._scutelnic_daniela.png";
import drRobu from "@assets/generated_images/portrait_of_dr._ludmila_robu.png";
import drPlesca from "@assets/generated_images/portrait_of_dr._denis_plesca.png";
import drZanoaga from "@assets/generated_images/portrait_of_dr._zanoaga_oleg.png";
import drCraciun from "@assets/generated_images/portrait_of_dr._craciun_daniela.png";
import asstBarbarasa from "@assets/generated_images/portrait_of_asist._barbarasa_ludmila.png";

// Before/After case images
import beforeWhitening from "@assets/generated_images/stained_yellowed_teeth_before_whitening.png";
import afterWhitening from "@assets/generated_images/bright_white_teeth_after_whitening.png";
import beforeBraces from "@assets/generated_images/crooked_misaligned_teeth_before_braces.png";
import afterBraces from "@assets/generated_images/straight_teeth_after_orthodontic_treatment.png";
import beforeRestoration from "@assets/generated_images/broken_chipped_tooth_before_restoration.png";
import afterRestoration from "@assets/generated_images/restored_tooth_after_crown_placement.png";

export default function Home() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<any>(null);

  // Before/After cases for slider gallery
  const beforeAfterCases = [
    { beforeImage: beforeWhitening, afterImage: afterWhitening, title: "Albire Dentară" },
    { beforeImage: beforeBraces, afterImage: afterBraces, title: "Ortodonție" },
    { beforeImage: beforeRestoration, afterImage: afterRestoration, title: "Restaurare Dentară" },
  ];

  // Fetch data from API
  const { data: apiBlogPosts } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: getBlogPosts,
  });

  const { data: apiTeamMembers } = useQuery({
    queryKey: ["team-members"],
    queryFn: getTeamMembers,
  });

  const { data: apiTestimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => getTestimonials(true),
  });

  const stats = [
    { value: "5000+", label: t("stats.patients"), icon: Users },
    { value: "15+", label: t("stats.years"), icon: Clock },
    { value: "10k+", label: t("stats.implants"), icon: Award },
    { value: "12", label: t("stats.doctors"), icon: Microscope },
  ];


  const staticDoctors = [
    { name: "Scutelnic Daniela", role: "Stomatolog Generalist", img: drScutelnic, bio: "Medic dedicat cu pasiune pentru detaliu și sănătatea orală completă." },
    { name: "Ludmila Robu", role: "Stomatolog Terapeut", img: drRobu, bio: "Specialist în terapie conservatoare și restaurări estetice." },
    { name: "Denis Pleșca", role: "Stomatolog Ortoped", img: drPlesca, bio: "Expert în reabilitări orale complexe și protetică dentară." },
    { name: "Zănoagă Oleg", role: "Chirurg - Implantolog\nDoctor în științe medicale, conf. univ.", img: drZanoaga, bio: "Expert în implantologie avansată cu certificări internaționale și experiență de peste 15 ani." },
    { name: "Crăciun Daniela", role: "Stomatolog Ortodont", img: drCraciun, bio: "Specialist în ortodonție pentru copii și adulți, pasionată de zâmbete perfect aliniate." },
    { name: "Barbarasa Ludmila", role: "Asistent Medical", img: asstBarbarasa, bio: "Mâna dreaptă a medicilor, asigurând confortul și siguranța pacienților." }
  ];

  const staticTestimonials = [
    { name: "Maria Popescu", role: "Pacient Implantologie", text: "O experiență incredibilă. Mi-am recăpătat zâmbetul după ani de zile. Echipa este extrem de profesionistă." },
    { name: "Ion Rusu", role: "Pacient Ortodonție", text: "Tehnologie de vârf și o atmosferă foarte primitoare. Recomand cu încredere CristAlex Dent." },
    { name: "Elena Munteanu", role: "Estetică Dentară", text: "Fațetele dentare arată perfect natural. Mulțumesc doamnei doctor pentru răbdare și perfecționism." },
  ];

  // Use API data if available, otherwise fall back to static data
  const doctors = apiTeamMembers && apiTeamMembers.length > 0 
    ? apiTeamMembers.map((m: any) => ({ name: m.name, role: m.role, img: m.imageUrl, bio: m.bio }))
    : staticDoctors;
    
  const testimonialsData = apiTestimonials && apiTestimonials.length > 0
    ? apiTestimonials
    : staticTestimonials;

  return (
    <Layout>
      {/* HERO SECTION - More Corporate & Impactful */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden brandbook-overlay">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Dental Clinic Interior" 
            className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-6 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-12 bg-secondary"></span>
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">CristAlex Dent Corporate</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                {t("hero.title")}
              </h1>
              <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-10 leading-relaxed max-w-xl border-l-4 border-secondary pl-6">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <BookingModal 
                  buttonText={t("hero.cta")}
                  buttonClassName="bg-secondary hover:bg-secondary/90 text-white font-bold px-8 h-14 text-lg rounded-none"
                />
                <Link href="/services">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 font-bold px-8 h-14 text-lg rounded-none">
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
              <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md ml-auto relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-red-50 p-3 rounded-full">
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
      <section className="bg-slate-900 py-12 text-white relative z-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="p-4">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
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
             <Link href="/services">
               <Button className="bg-primary hover:bg-primary/90 active:bg-primary/80 text-white px-8 font-bold transition-all hover:shadow-lg active:shadow-md cursor-pointer">Vezi Toate Serviciile</Button>
             </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: t("services.implant"), 
                  desc: t("services.implant_desc"), 
                  img: implantImage,
                  details: "Restaurarea dinților pierduți cu ajutorul implanturilor dentare de ultimă generație. Folosim tehnologii avansate pentru planificare digitală 3D, asigurând precizie maximă și timp de vindecare redus. Beneficiezi de implanturi premium Straumann sau Nobel Biocare, recunoscute mondial pentru durabilitate și integrare osoasă rapidă.",
                  features: ["Planificare 3D", "Implanturi Premium", "Sedare Conștientă", "Garanție pe Viață"]
                },
                { 
                  title: t("services.ortho"), 
                  desc: t("services.ortho_desc"), 
                  img: orthoImage,
                  details: "Corectarea poziției dinților și a mușcăturii folosind aparate dentare moderne. Oferim atât soluții clasice (metalice/ceramice), cât și alignere invizibile (Invisalign) pentru un tratament discret și confortabil. Obține un zâmbet perfect aliniat indiferent de vârstă.",
                  features: ["Invisalign", "Aparate Safir", "Digital Scanning", "Fără Durere"]
                },
                { 
                  title: t("services.aesthetics"), 
                  desc: t("services.aesthetics_desc"), 
                  img: aestheticImage,
                  details: "Transformă-ți zâmbetul cu fațete dentare ceramice E-MAX sau proceduri de albire profesională. Proiectăm noul tău zâmbet digital (DSD) înainte de a începe tratamentul, astfel încât să vezi rezultatul final încă de la prima vizită.",
                  features: ["Digital Smile Design", "Fațete E-MAX", "Albire Zoom", "Minim Invaziv"]
                },
                { 
                  title: t("services.endo"), 
                  desc: t("services.endo_desc"), 
                  img: endoImage,
                  details: "Tratamente de canal realizate exclusiv la microscop pentru salvarea dinților naturali. Precizia magnificată de până la 25x permite curățarea perfectă a canalelor și sigilarea lor tridimensională, eliminând infecțiile și durerea pe termen lung.",
                  features: ["Microscop Leica", "Izolare cu Digă", "Vindecare Rapidă", "Rată de Succes 98%"]
                }
              ].map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedService(s)}
                  className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg transform transition-all duration-300 hover:-translate-y-2"
                >
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-6 text-white transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-xl font-bold mb-2 text-white">{s.title}</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{s.desc}</p>
                    <div className="mt-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
           </div>

           <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
            <DialogContent className="sm:max-w-[600px] bg-white p-0 overflow-hidden gap-0 border-0">
              {selectedService && (
                <>
                  <div className="relative h-48 w-full">
                    <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{selectedService.title}</h2>
                  </div>
                  
                  <div className="p-6">
                    <DialogHeader className="mb-4 text-left">
                      <DialogDescription className="text-lg text-gray-700 leading-relaxed">
                        {selectedService.details}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {selectedService.features?.map((feat: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-gray-700">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                      <Button variant="outline" onClick={() => setSelectedService(null)}>Închide</Button>
                      <BookingModal 
                        buttonText={`Programează ${selectedService.title}`}
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

      {/* DOCTORS TEAM */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">{t("nav.team")}</h2>
            <p className="section-subtitle">Echipa noastră de specialiști pregătiți să îți ofere cel mai bun tratament.</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
             <Carousel className="w-full">
                <CarouselContent>
                  {doctors.map((doc, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-6">
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group h-full hover:shadow-xl transition-all duration-300">
                        <div className="h-[350px] overflow-hidden relative">
                          <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                          <div className="absolute bottom-0 left-0 p-6 text-white w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                            <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                            <p className="text-red-200 text-sm font-medium">{doc.role}</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{doc.bio}</p>
                          <div className="flex gap-2">
                            <div className="h-1 w-12 bg-primary rounded-full"></div>
                            <div className="h-1 w-4 bg-secondary rounded-full"></div>
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

      {/* ABOUT US SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-12 bg-primary"></span>
                <span className="text-primary font-bold tracking-widest uppercase text-sm">{t("about.title")}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">{t("about.history_title")}</h2>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {t("about.history_p1")}
              </p>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t("about.history_p2")}
              </p>

              <div className="bg-red-50 p-8 rounded-xl mb-8">
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  {t("about.mission_text")}
                </p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-primary pl-6">
                {t("about.promise_text")}
              </p>

              <div className="mt-8">
                <Link href="/about">
                  <Button className="bg-primary hover:bg-primary/90 active:bg-primary/80 text-white px-8 gap-2 font-bold transition-all hover:shadow-lg active:shadow-md cursor-pointer">
                    Citește mai mult <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={doctorImage} alt="CristAlex Dent" className="w-full h-full object-cover" />
              </div>
              
              {/* Stats Cards Overlay */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="text-4xl font-bold text-primary mb-2">2008</div>
                <div className="text-gray-600 font-medium">Anul Fondării</div>
              </div>
              
              <div className="absolute -top-8 -right-8 bg-primary text-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold mb-2">{new Date().getFullYear() - 2008}+</div>
                <div className="text-red-100 font-medium">Ani Experiență</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Bento Grid Style */}
      <section className="py-24 bg-gray-50 brandbook-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">{t("features.title")}</h2>
            <p className="section-subtitle">Standarde ridicate, tehnologie de ultimă oră și o abordare umană.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Feature */}
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
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
                <h3 className="text-xl font-bold mb-2 text-white">{t("features.garantie_title")}</h3>
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

      {/* BEFORE/AFTER SECTION */}
      <BeforeAfter 
        beforeImage={aestheticImage}
        afterImage={endoImage}
        title={t("beforeafter.title")}
        subtitle={t("beforeafter.subtitle")}
      />

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title block">{t("testimonials.title")}</h2>
          <p className="section-subtitle">{t("testimonials.subtitle")}</p>
          
          <div className="max-w-5xl mx-auto">
             <Carousel className="w-full">
                <CarouselContent>
                  {testimonialsData.map((item: any, index: number) => (
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

      {/* LATEST FROM BLOG */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="section-title block text-left">Articole Recente</h2>
              <p className="text-gray-500 text-lg">Noutăți și sfaturi pentru sănătatea ta orală.</p>
            </div>
            <Link href="/blog" className="text-primary font-bold hover:underline flex items-center gap-2">
              Vezi tot Blogul <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(apiBlogPosts && apiBlogPosts.length > 0 ? apiBlogPosts : blogPosts).slice(0, 3).map((post: any) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group cursor-pointer block">
                <div className="rounded-2xl overflow-hidden h-64 mb-6 relative">
                  <img src={post.imageUrl || post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                    {post.category}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                  <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }) : post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
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
      <section className="py-20 bg-primary relative overflow-hidden brandbook-gradient">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">{t("cta_banner.title")}</h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto">
            {t("cta_banner.text")}
          </p>
          <BookingModal 
            buttonText={t("cta_banner.btn")}
            buttonClassName="bg-white text-primary hover:bg-gray-100 font-bold px-12 h-16 text-xl shadow-2xl rounded-full"
          />
        </div>
      </section>
    </Layout>
  );
}