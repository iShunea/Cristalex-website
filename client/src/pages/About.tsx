import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import doctorImage from "@assets/generated_images/friendly_professional_dentist_portrait.png";
import teamPhoto from "@assets/team_cristalexdent.jpg";
import { Award, Users, Microscope, Shield } from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-primary py-20 relative overflow-hidden brandbook-gradient">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-center mb-4 text-white">{t("about.title")}</h1>
          <p className="text-center text-red-100 max-w-2xl mx-auto text-xl">
            {t("about.subtitle")}
          </p>
        </div>
      </div>

      {/* Historia Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">{t("about.history_title")}</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {t("about.history_p1")}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {t("about.history_p2")}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-red-50 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">2008</div>
                <div className="text-gray-600 text-sm">Anul Fondării</div>
              </div>
              <div className="text-center p-6 bg-red-50 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">{new Date().getFullYear() - 2008}+</div>
                <div className="text-gray-600 text-sm">Ani Experiență</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl">
             <img src={doctorImage} alt="CristAlex Dent Team" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">{t("about.mission_title")}</h2>
          <p className="text-gray-700 text-xl mb-6 leading-relaxed text-center max-w-4xl mx-auto">
            {t("about.mission_text")}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {t("about.promise_text")}
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Excelență</h3>
            <p className="text-gray-600 text-sm">Standarde înalte în fiecare tratament</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Dedicare</h3>
            <p className="text-gray-600 text-sm">Echipă de profesioniști dedicați</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Microscope className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Tehnologie</h3>
            <p className="text-gray-600 text-sm">Echipamente de ultimă generație</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Siguranță</h3>
            <p className="text-gray-600 text-sm">Protocoale stricte de sterilizare</p>
          </div>
        </div>

        {/* Team Photo Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Echipa Noastră</h2>
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={teamPhoto} 
                alt="Echipa CristAlex Dent" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-gray-600 mt-8 text-lg leading-relaxed max-w-3xl mx-auto">
              O echipă unită de profesioniști dedicați sănătății tale orale. 
              Fiecare membru al echipei noastre aduce experiență, pasiune și grijă pentru fiecare pacient.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}