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
          <p className="text-gray-500">{t("contact_page.subtitle")}</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2721.8936256546166!2d28.365234!3d47.22463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1c1e1c1e1c1c1%3A0x1c1c1c1c1c1c1c1c!2sstr.%20Alba%20Iulia%2023%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sen!2smd!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="CristAlex Dent Location"
        ></iframe>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold mb-8">{t("contact_page.info_title")}</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t("contact_page.address")}</h4>
                  <p className="text-gray-600">{t("contact.address")}</p>
                  <a href="https://www.google.com/maps/search/str.+Alba+Iulia+23,+Chi%C8%99in%C4%83u,+Moldova" target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline mt-1 inline-block">{t("contact_page.view_map")}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t("contact_page.phone")}</h4>
                  <p className="text-gray-600">{t("contact.phone")}</p>
                  <p className="text-gray-500 text-sm">{t("contact_page.emergency_available")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t("contact_page.email")}</h4>
                  <p className="text-gray-600">{t("contact.email")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t("contact_page.schedule_title")}</h4>
                  <p className="text-gray-600">{t("contact_page.schedule_weekdays")}</p>
                  <p className="text-gray-600">{t("contact_page.schedule_saturday")}</p>
                  <p className="text-gray-600">{t("contact_page.schedule_sunday")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">{t("contact_page.message_title")}</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact_page.name")}</label>
                  <Input placeholder={t("contact_page.name_placeholder")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("contact_page.phone")}</label>
                  <Input placeholder={t("contact_page.phone_placeholder")} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("contact_page.email")}</label>
                <Input type="email" placeholder={t("contact_page.email_placeholder")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("contact_page.message")}</label>
                <Textarea placeholder={t("contact_page.message_placeholder")} className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">
                {t("contact_page.send")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}