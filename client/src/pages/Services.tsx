import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";

export default function Services() {
  const { t } = useTranslation();

  const servicesList = [
    {
      category: "Profilaxie",
      items: ["Detartraj ultrasonic", "Periaj profesional", "Air-flow", "Fluorizare"]
    },
    {
      category: "Estetică Dentară",
      items: ["Albire dentară profesională", "Fațete ceramice", "Coroane de zirconiu", "Obturații estetice"]
    },
    {
      category: "Implantologie",
      items: ["Implanturi dentare", "Sinus lift", "Adiție de os", "All-on-4 / All-on-6"]
    },
    {
      category: "Ortodonție",
      items: ["Aparat dentar metalic", "Aparat dentar safir", "Alignere invizibile", "Contenție"]
    },
    {
      category: "Endodonție",
      items: ["Tratament de canal la microscop", "Retratament endodontic", "Obturație de canal 3D"]
    }
  ];

  return (
    <Layout>
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("nav.services")}</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Soluții complete pentru sănătatea orală, de la prevenție la reabilitări complexe.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {servicesList.map((category, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                {category.category}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 group cursor-pointer">
                    <CheckCircle className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                    <span className="text-gray-700 group-hover:text-primary transition-colors font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}