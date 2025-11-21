import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("nav.contact")}</h1>
          <p className="text-gray-500">Suntem aici pentru a-ți răspunde la orice întrebare.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Informații de Contact</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Adresa</h4>
                  <p className="text-gray-600">{t("contact.address")}</p>
                  <a href="#" className="text-primary text-sm font-medium hover:underline mt-1 inline-block">Vezi pe hartă</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Telefon</h4>
                  <p className="text-gray-600">{t("contact.phone")}</p>
                  <p className="text-gray-500 text-sm">Disponibil pentru urgențe</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600">{t("contact.email")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Programul nostru</h4>
                  <p className="text-gray-600">Luni - Vineri: 09:00 - 18:00</p>
                  <p className="text-gray-600">Sâmbătă: 09:00 - 13:00</p>
                  <p className="text-gray-600">Duminică: Zi liberă</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Scrie-ne un mesaj</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nume</label>
                  <Input placeholder="Numele tău" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefon</label>
                  <Input placeholder="+373..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="email@exemplu.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mesaj</label>
                <Textarea placeholder="Cu ce te putem ajuta?" className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">
                Trimite Mesajul
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}