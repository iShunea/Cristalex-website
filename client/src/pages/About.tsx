import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import teamPhoto from "@assets/team_cristalexdent.jpg";
import { Award, Users, Microscope, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "@/lib/api";
import { BookingModal } from "@/components/BookingModal";

import drScutelnic from "@assets/dr_scutelnic_daniela_real.jpg";
import drRobu from "@assets/dr_ludmila_robu_real.jpg";
import drPlesca from "@assets/generated_images/portrait_of_dr._denis_plesca.png";
import drZanoaga from "@assets/generated_images/portrait_of_dr._zanoaga_oleg.png";
import drCraciun from "@assets/dr_craciun_daniela_real.jpg";
import asstBarbarasa from "@assets/generated_images/portrait_of_asist._barbarasa_ludmila.png";

export default function About() {
  const { t, i18n } = useTranslation();

  const { data: apiTeamMembers } = useQuery({
    queryKey: ["team-members"],
    queryFn: getTeamMembers,
  });

  const staticDoctors = useMemo(() => [
    { name: t("about.doctors.dr_scutelnic_name"), role: t("about.doctors.dr_scutelnic_role"), img: drScutelnic, bio: t("about.doctors.dr_scutelnic_bio") },
    { name: t("about.doctors.dr_robu_name"), role: t("about.doctors.dr_robu_role"), img: drRobu, bio: t("about.doctors.dr_robu_bio") },
    { name: t("about.doctors.dr_plesca_name"), role: t("about.doctors.dr_plesca_role"), img: drPlesca, bio: t("about.doctors.dr_plesca_bio") },
    { name: t("about.doctors.dr_zanoaga_name"), role: t("about.doctors.dr_zanoaga_role"), img: drZanoaga, bio: t("about.doctors.dr_zanoaga_bio") },
    { name: t("about.doctors.dr_craciun_name"), role: t("about.doctors.dr_craciun_role"), img: drCraciun, bio: t("about.doctors.dr_craciun_bio") },
    { name: t("about.doctors.asst_barbarasa_name"), role: t("about.doctors.asst_barbarasa_role"), img: asstBarbarasa, bio: t("about.doctors.asst_barbarasa_bio") }
  ], [t, i18n.language]);

  const doctors = apiTeamMembers && apiTeamMembers.length > 0 
    ? apiTeamMembers.map((m: any) => ({ name: m.name, role: m.role, img: m.imageUrl, bio: m.bio }))
    : staticDoctors;

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-12 bg-primary"></span>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">{t("about.about_us_label")}</span>
            </div>
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
                <div className="text-gray-600 text-sm">{t("about.founded_year")}</div>
              </div>
              <div className="text-center p-6 bg-red-50 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">{new Date().getFullYear() - 2008}+</div>
                <div className="text-gray-600 text-sm">{t("about.years_experience")}</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl">
             <img src={teamPhoto} alt={t("images.team_photo_alt")} className="w-full h-full object-cover" />
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
            <h3 className="font-bold text-lg mb-2">{t("about.excellence")}</h3>
            <p className="text-gray-600 text-sm">{t("about.excellence_desc")}</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t("about.dedication")}</h3>
            <p className="text-gray-600 text-sm">{t("about.dedication_desc")}</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Microscope className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t("about.technology")}</h3>
            <p className="text-gray-600 text-sm">{t("about.technology_desc")}</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t("about.safety")}</h3>
            <p className="text-gray-600 text-sm">{t("about.safety_desc")}</p>
          </div>
        </div>

        {/* Team Members Section - Vertical List */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t("about.team_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {doctors.map((doc, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="h-[320px] overflow-hidden relative">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-6 text-white w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                    <p className="text-primary text-sm font-medium">{doc.role}</p>
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
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Booking */}
      <section className="py-16 bg-gradient-to-r from-primary via-secondary to-accent brandbook-pattern">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("cta_banner.free_title")}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            {t("cta_banner.free_subtitle")}
          </p>
          <BookingModal 
            buttonText={t("cta_banner.free_btn")}
            buttonClassName="bg-white text-primary hover:bg-gray-100 active:bg-gray-200 font-bold px-10 h-14 text-lg shadow-2xl rounded-full transition-all hover:shadow-xl active:shadow-lg cursor-pointer"
          />
        </div>
      </section>
    </Layout>
  );
}