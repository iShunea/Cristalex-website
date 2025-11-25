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
      desc: t("services.implant_desc"),
      price: t("services.implant_price"),
      features: [t("services.implant_feat1"), t("services.implant_feat2"), t("services.implant_feat3"), t("services.implant_feat4")],
      image: implantImage
    },
    {
      id: "therapy",
      title: t("services.therapy"),
      desc: t("services.therapy_desc"),
      price: t("services.therapy_price"),
      features: [t("services.therapy_feat1"), t("services.therapy_feat2"), t("services.therapy_feat3"), t("services.therapy_feat4")],
      image: orthoImage
    },
    {
      id: "endo",
      title: t("services.endo"),
      desc: t("services.endo_desc"),
      price: t("services.endo_price"),
      features: [t("services.endo_feat1"), t("services.endo_feat2"), t("services.endo_feat3"), t("services.endo_feat4")],
      image: aestheticImage
    },
    {
      id: "prophy",
      title: t("services.prophy"),
      desc: t("services.prophy_desc"),
      price: t("services.prophy_price"),
      features: [t("services.prophy_feat1"), t("services.prophy_feat2"), t("services.prophy_feat3"), t("services.prophy_feat4")],
      image: implantImage
    },
    {
      id: "prosth",
      title: t("services.prosth"),
      desc: t("services.prosth_desc"),
      price: t("services.prosth_price"),
      features: [t("services.prosth_feat1"), t("services.prosth_feat2"), t("services.prosth_feat3"), t("services.prosth_feat4")],
      image: orthoImage
    },
    {
      id: "pedo",
      title: t("services.pedo"),
      desc: t("services.pedo_desc"),
      price: t("services.pedo_price"),
      features: [t("services.pedo_feat1"), t("services.pedo_feat2"), t("services.pedo_feat3"), t("services.pedo_feat4")],
      image: aestheticImage
    },
    {
      id: "extraction",
      title: t("services.extraction"),
      desc: t("services.extraction_desc"),
      price: t("services.extraction_price"),
      features: [t("services.extraction_feat1"), t("services.extraction_feat2"), t("services.extraction_feat3"), t("services.extraction_feat4")],
      image: implantImage
    },
    {
      id: "sinus",
      title: t("services.sinus"),
      desc: t("services.sinus_desc"),
      price: t("services.sinus_price"),
      features: [t("services.sinus_feat1"), t("services.sinus_feat2"), t("services.sinus_feat3"), t("services.sinus_feat4")],
      image: orthoImage
    }
  ];

  return (
    <Layout>
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden brandbook-overlay">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 transform origin-top-right"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-6 text-white">{t("services.title")}</h1>
          <p className="text-xl text-red-100 max-w-2xl">
            {t("services.subtitle")}
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
                   <div className="bg-red-50 text-primary px-3 py-1 rounded text-sm font-bold tracking-wider uppercase">
                     {t("services.specialization")}
                   </div>
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
                    buttonText={t("services.book_consult")}
                    buttonClassName="bg-primary hover:bg-primary/90 text-white px-8"
                  />
                  <Button variant="outline" className="gap-2">
                    {t("services.details")} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mt-32 bg-gray-50 rounded-3xl p-12 text-center">
           <h2 className="text-3xl font-bold mb-12">{t("services.process_title")}</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             {/* Connector Line */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

             {[
               { step: "01", title: t("services.process_step1"), desc: t("services.process_step1_desc") },
               { step: "02", title: t("services.process_step2"), desc: t("services.process_step2_desc") },
               { step: "03", title: t("services.process_step3"), desc: t("services.process_step3_desc") },
               { step: "04", title: t("services.process_step4"), desc: t("services.process_step4_desc") }
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