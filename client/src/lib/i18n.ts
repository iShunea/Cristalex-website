import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ro: {
    translation: {
      nav: {
        home: "Acasă",
        about: "Despre Noi",
        services: "Servicii",
        contact: "Contact",
        book: "Programează-te"
      },
      hero: {
        title: "Zâmbetul Tău, Prioritatea Noastră",
        subtitle: "Servicii stomatologice de top în inima Chișinăului. Tehnologie modernă, medici experți și grijă pentru pacienți.",
        cta: "Fă o Programare"
      },
      features: {
        tech: "Tehnologie Avansată",
        team: "Echipă Expertă",
        care: "Grijă Personalizată"
      },
      services: {
        title: "Serviciile Noastre",
        implant: "Implantologie",
        ortho: "Ortodonție",
        cosmetic: "Estetică Dentară",
        general: "Stomatologie Generală"
      },
      about: {
        title: "Despre CristalEx Dent",
        text: "Suntem o clinică stomatologică dedicată excelenței. Cu o echipă de specialiști pasionați, oferim tratamente personalizate pentru sănătatea ta orală."
      },
      contact: {
        title: "Contactează-ne",
        address: "Strada Exemplu 123, Chișinău, Moldova",
        phone: "+373 22 000 000",
        email: "info@cristalexdent.md"
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: "Главная",
        about: "О Нас",
        services: "Услуги",
        contact: "Контакты",
        book: "Записаться"
      },
      hero: {
        title: "Ваша Улыбка - Наш Приоритет",
        subtitle: "Стоматологические услуги высшего класса в центре Кишинева. Современные технологии, экспертные врачи и забота о пациентах.",
        cta: "Записаться на Прием"
      },
      features: {
        tech: "Передовые Технологии",
        team: "Команда Экспертов",
        care: "Индивидуальный Подход"
      },
      services: {
        title: "Наши Услуги",
        implant: "Имплантология",
        ortho: "Ортодонтия",
        cosmetic: "Эстетическая Стоматология",
        general: "Общая Стоматология"
      },
      about: {
        title: "О CristalEx Dent",
        text: "Мы - стоматологическая клиника, стремящаяся к совершенству. С командой увлеченных специалистов мы предлагаем индивидуальное лечение для здоровья вашей улыбки."
      },
      contact: {
        title: "Свяжитесь с Нами",
        address: "Улица Пример 123, Кишинев, Молдова",
        phone: "+373 22 000 000",
        email: "info@cristalexdent.md"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ro", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;