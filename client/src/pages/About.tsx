import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import doctorImage from "@assets/generated_images/friendly_professional_dentist_portrait.png";

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">{t("nav.about")}</h1>
          <p className="text-center text-gray-500 max-w-2xl mx-auto">
            Cunoaște echipa care are grijă de zâmbetul tău.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">Misiunea Noastră</h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              La CristAlex Dent, misiunea noastră este să oferim servicii stomatologice de cea mai înaltă calitate într-un mediu confortabil și prietenos. Ne dedicăm sănătății pacienților noștri prin educație continuă și tehnologie de vârf.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Fiecare pacient este tratat cu respect și atenție, având parte de un plan de tratament personalizat adaptat nevoilor și dorințelor sale.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
             <img src={doctorImage} alt="Team" className="w-full h-full object-cover" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-12">Echipa Noastră</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                 {/* Placeholder for other doctors */}
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                    Foto Doctor {i}
                 </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Dr. Nume Prenume</h3>
                <p className="text-primary text-sm font-medium mb-4">Medic Stomatolog Generalist</p>
                <p className="text-gray-500 text-sm">
                  Specialist cu peste 10 ani de experiență în stomatologia estetică și restaurativă.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}