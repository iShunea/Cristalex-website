import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import { ArrowLeft, GraduationCap, Award, Calendar, CheckCircle2 } from "lucide-react";
import { getTeamMembers, type TeamMember, EXTERNAL_BASE_URL } from "@/lib/api";
import placeholderDoctor from "@assets/generated_images/friendly_professional_dentist_portrait.png";
import { useSEO } from "@/hooks/useSEO";

export default function DoctorDetail() {
  const [, params] = useRoute("/team/:id");
  const [, navigate] = useLocation();
  const { t, i18n } = useTranslation();
  const [doctor, setDoctor] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  const getLocalizedField = (obj: any, field: string) => {
    const lang = i18n.language;
    return obj.translations?.[lang]?.[field] || obj[field] || "";
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const allTeam = await getTeamMembers();
        const foundDoctor = allTeam.find(m => m._id === params?.id);
        setDoctor(foundDoctor || null);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchDoctor();
    }
  }, [params?.id]);

  useSEO({
    title: doctor ? `${doctor.name} - Echipa Cristalex Dent` : "Doctor - Cristalex Dent",
    description: doctor ? getLocalizedField(doctor, 'bio') : "Detalii medic Cristalex Dent"
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-gray-500">Se încarcă...</div>
        </div>
      </Layout>
    );
  }

  if (!doctor) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Doctor negăsit</h1>
          <Button onClick={() => navigate("/")}>Înapoi la pagina principală</Button>
        </div>
      </Layout>
    );
  }

  const education = Array.isArray(doctor.education) ? doctor.education : [];
  const experience = getLocalizedField(doctor, 'experience');

  return (
    <Layout>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi la echipă
        </Button>
      </div>

      {/* Hero Section */}
      <section className="compact-section bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={(() => {
                    const imgPath = doctor.imageUrl || doctor.image || '';
                    if (!imgPath) return placeholderDoctor;
                    return imgPath.startsWith('http') ? imgPath : `${EXTERNAL_BASE_URL}${imgPath}`;
                  })()}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {doctor.name}
              </h1>
              <div className="flex items-center gap-2 text-primary text-2xl font-semibold mb-6">
                <Award className="w-6 h-6" />
                {getLocalizedField(doctor, 'role')}
              </div>

              {doctor.specialization && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Specializare</h3>
                  <p className="text-gray-600 text-lg">
                    {getLocalizedField(doctor, 'specialization')}
                  </p>
                </div>
              )}

              <Button
                size="lg"
                onClick={() => setShowBooking(true)}
                className="w-full md:w-auto"
              >
                Programează Consultație
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      {doctor.bio && (
        <section className="compact-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title">Despre</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {getLocalizedField(doctor, 'bio')}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="compact-section bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Educație și Certificări</h2>
              </div>
              <ul className="space-y-4">
                {education.map((edu, idx) => (
                  <li key={idx} className="flex items-start gap-3 glass-card p-4 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-lg">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience && (
        <section className="compact-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Experiență</h2>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {experience}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="compact-section bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Programează o consultație
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contactează-ne astăzi pentru a discuta despre nevoile tale de îngrijire dentară
          </p>
          <BookingModal
            buttonText="Programează Acum"
            buttonClassName="bg-white text-primary hover:bg-gray-100 active:bg-gray-200 font-bold px-10 h-14 text-lg shadow-2xl rounded-full transition-all hover:shadow-xl active:shadow-lg cursor-pointer"
          />
        </div>
      </section>
    </Layout>
  );
}
