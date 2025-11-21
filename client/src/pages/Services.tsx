import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { CheckCircle2, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import implantImage from "@assets/generated_images/dental_implant_model.png";
import orthoImage from "@assets/generated_images/invisible_dental_aligners.png";
import aestheticImage from "@assets/generated_images/perfect_dental_veneers_smile.png";

export default function Services() {
  const { t } = useTranslation();

  const categories = [
    {
      id: "implant",
      title: t("services.implant"),
      desc: "Soluții complete pentru edentații, de la un singur dinte la arcade complete.",
      price: "de la 350€",
      features: ["Implanturi Straumann/Nobel", "Chirurgie ghidată digital", "Garanție pe viață", "Sedare conștientă"],
      image: implantImage
    },
    {
      id: "ortho",
      title: t("services.ortho"),
      desc: "Îndreptarea dinților pentru copii și adulți folosind tehnologii moderne.",
      price: "de la 500€",
      features: ["Alignere Invizibile (Invisalign)", "Aparate Safir/Ceramice", "Planificare Digitală", "Consultație gratuită"],
      image: orthoImage
    },
    {
      id: "aesthetic",
      title: t("services.aesthetics"),
      desc: "Transformarea zâmbetului prin proceduri minim invazive.",
      price: "de la 200€",
      features: ["Fațete E-MAX", "Albire Zoom", "Coroane Zirconiu", "DSD - Digital Smile Design"],
      image: aestheticImage
    }
  ];

  return (
    <Layout>
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 transform origin-top-right"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-6 text-white">{t("services.title")}</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Tehnologie de ultimă oră și medici specialiști pentru fiecare ramură a stomatologiei.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="space-y-24">
          {categories.map((cat, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              <div className="lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <img src={cat.image} alt={cat.title} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                   <div className="bg-blue-50 text-primary px-3 py-1 rounded text-sm font-bold tracking-wider uppercase">
                     Specializare
                   </div>
                   <div className="text-gray-400 text-sm">{cat.price}</div>
                </div>
                
                <h2 className="text-4xl font-bold mb-6 text-gray-900">{cat.title}</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {cat.desc}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {cat.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span className="text-gray-700 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <BookingModal 
                    buttonText="Programează Consult"
                    buttonClassName="bg-primary hover:bg-primary/90 text-white px-8"
                  />
                  <Button variant="outline" className="gap-2">
                    Detalii <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mt-32 bg-gray-50 rounded-3xl p-12 text-center">
           <h2 className="text-3xl font-bold mb-12">Cum decurge tratamentul?</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             {/* Connector Line */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

             {[
               { step: "01", title: "Consultație", desc: "Evaluare completă și radiografii" },
               { step: "02", title: "Planificare", desc: "Discutarea opțiunilor și costurilor" },
               { step: "03", title: "Tratament", desc: "Execuție precisă și fără durere" },
               { step: "04", title: "Întreținere", desc: "Controale periodice și garanție" }
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