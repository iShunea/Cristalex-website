import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ro: {
    translation: {
      nav: {
        home: "Acasă",
        about: "Despre Noi",
        services: "Tratamente",
        prices: "Tarife",
        team: "Echipa",
        contact: "Contact",
        blog: "Blog",
        book: "Programare Online"
      },
      hero: {
        title: "Excelență în Stomatologie Modernă",
        subtitle: "Redescoperă încrederea zâmbetului tău la CristAlex Dent. Tehnologie digitală 3D, materiale premium și o echipă dedicată perfecțiunii.",
        cta: "Programează o Consultație",
        emergency: "Urgențe: +373 78388000"
      },
      contact: {
        address: "Chișinău, str. Alba Iulia 23",
        phone: "+373 78388000",
        email: "cristalexdent23@gmail.com"
      },
      stats: {
        patients: "Pacienți Fericiți",
        years: "Ani de Experiență",
        implants: "Implanturi Inserate",
        doctors: "Medici Specialiști"
      },
      features: {
        title: "De ce să alegi CristAlex Dent?",
        tech_title: "Tehnologie Digitală 3D",
        tech_desc: "Scanare intraorală și planificare digitală pentru precizie maximă și confort.",
        pain_title: "Tratamente Fără Durere",
        pain_desc: "Utilizăm cele mai noi metode de sedare și anestezie pentru confortul tău.",
        garantie_title: "Garanție Extinsă",
        garantie_desc: "Oferim certificat de garanție pentru toate lucrările protetice și implanturi.",
        steril_title: "Sterilizare Premium",
        steril_desc: "Protocoale stricte de sterilizare conform standardelor europene."
      },
      testimonials: {
        title: "Ce spun pacienții noștri",
        subtitle: "Părerile celor care ne-au trecut pragul sunt cartea noastră de vizită."
      },
      faq: {
        title: "Întrebări Frecvente",
        q1: "Cât costă un implant dentar?",
        a1: "Prețul unui implant variază în funcție de tipul și marca aleasă. Vă invităm la o consultație pentru un plan de tratament personalizat.",
        q2: "Oferiți servicii de urgență?",
        a2: "Da, preluăm urgențe stomatologice în timpul programului de lucru cu prioritate.",
        q3: "Se poate plăti în rate?",
        a3: "Colaborăm cu parteneri bancari pentru a oferi soluții flexibile de plată în rate fără dobândă."
      },
      services: {
        title: "Spectrul Nostru de Servicii",
        subtitle: "Abordăm fiecare caz multidisciplinar pentru rezultate estetice și funcționale optime.",
        implant: "Implantologie Avansată",
        implant_desc: "Restaurarea completă a danturii folosind implanturi premium (Straumann, Nobel).",
        ortho: "Ortodonție Digitală",
        ortho_desc: "Aparate dentare invizibile (Aligners) și clasice pentru toate vârstele.",
        aesthetics: "Estetică Dentară",
        aesthetics_desc: "Fațete dentare ceramice E-MAX și albire profesională cu lampă.",
        endo: "Endodonție la Microscop",
        endo_desc: "Tratamente de canal precise sub magnificație pentru salvarea dinților."
      },
      cta_banner: {
        title: "Ești pregătit pentru o schimbare?",
        text: "Nu lăsa problemele dentare să se agraveze. Programează-te acum.",
        btn: "Vreau o Programare"
      },
      about: {
        title: "Despre Noi",
        subtitle: "Cristalex Dent – Zâmbetul tău, pasiunea noastră",
        history_title: "Istoria Noastră",
        history_p1: "Clinica stomatologică Cristalex Dent și-a lansat activitatea în 2008. Dispune de două cabinete stomatologice dotate cu tehnologii de ultimă generație, cabinet chirurgical, cabinet de sterilizare și cabinet de radioviziografie dentară.",
        history_p2: "Pe parcursul a peste 16 ani de activitate s-a consolidat o echipă de medici care au devenit experți în domeniul medicinei dentare.",
        mission_title: "Misiunea Noastră",
        mission_text: "Fiind niște stomatologi dedicați, echipa Cristalex Dent lucrează cu profesionalism pentru a vă oferi formula perfectă: zâmbetul mult visat cu o sănătate dentară optimă.",
        promise_text: "Aici vei beneficia de un tratament individual și personalizat, la prețuri atractive. Sănătatea dentară e mult mai accesibilă decât te așteptai.",
        team_title: "Echipa Noastră"
      },
      footer: {
        desc: "CristAlex Dent - Standardul de aur în stomatologia din Chișinău. Investim continuu în oameni și tehnologie.",
        links: "Link-uri Utile",
        program: "Program Clinica",
        contact: "Informații Contact"
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: "Главная",
        about: "О Клинике",
        services: "Услуги",
        prices: "Цены",
        team: "Команда",
        contact: "Контакты",
        blog: "Блог",
        book: "Запись Онлайн"
      },
      hero: {
        title: "Совершенство в Современной Стоматологии",
        subtitle: "Верните уверенность в своей улыбке в CristAlex Dent. Цифровые 3D технологии, премиальные материалы и команда, преданная совершенству.",
        cta: "Записаться на Консультацию",
        emergency: "Срочно: +373 78388000"
      },
      contact: {
        address: "Кишинев, ул. Альба Юлия 23",
        phone: "+373 78388000",
        email: "cristalexdent23@gmail.com"
      },
      stats: {
        patients: "Счастливых Пациентов",
        years: "Лет Опыта",
        implants: "Установленных Имплантов",
        doctors: "Врачей Специалистов"
      },
      features: {
        title: "Почему выбирают CristAlex Dent?",
        tech_title: "Цифровые 3D Технологии",
        tech_desc: "Интраоральное сканирование и цифровое планирование для максимальной точности.",
        pain_title: "Лечение Без Боли",
        pain_desc: "Используем новейшие методы седации и анестезии для вашего комфорта.",
        garantie_title: "Расширенная Гарантия",
        garantie_desc: "Предоставляем гарантийный сертификат на все протезные работы и импланты.",
        steril_title: "Премиум Стерилизация",
        steril_desc: "Строгие протоколы стерилизации в соответствии с европейскими стандартами."
      },
      testimonials: {
        title: "Отзывы наших пациентов",
        subtitle: "Мнения тех, кто доверил нам свою улыбку - наша визитная карточка."
      },
      faq: {
        title: "Частые Вопросы",
        q1: "Сколько стоит зубной имплант?",
        a1: "Цена импланта варьируется в зависимости от типа и бренда. Приглашаем на консультацию для составления плана лечения.",
        q2: "Оказываете ли вы срочную помощь?",
        a2: "Да, мы принимаем стоматологические срочные случаи в рабочее время в приоритетном порядке.",
        q3: "Можно ли платить в рассрочку?",
        a3: "Мы сотрудничаем с банковскими партнерами для предоставления гибких решений по оплате в рассрочку."
      },
      services: {
        title: "Наш Спектр Услуг",
        subtitle: "Мы подходим к каждому случаю мультидисциплинарно для оптимальных эстетических и функциональных результатов.",
        implant: "Передовая Имплантология",
        implant_desc: "Полное восстановление зубов с использованием премиальных имплантов (Straumann, Nobel).",
        ortho: "Цифровая Ортодонтия",
        ortho_desc: "Невидимые брекеты (Элайнеры) и классические системы для всех возрастов.",
        aesthetics: "Эстетическая Стоматология",
        aesthetics_desc: "Керамические виниры E-MAX и профессиональное отбеливание лампой.",
        endo: "Эндодонтия под Микроскопом",
        endo_desc: "Точное лечение каналов под увеличением для спасения зубов."
      },
      cta_banner: {
        title: "Готовы к переменам?",
        text: "Не позволяйте стоматологическим проблемам усугубляться. Запишитесь сейчас.",
        btn: "Хочу Записаться"
      },
      about: {
        title: "О Нас",
        subtitle: "Cristalex Dent – Ваша улыбка, наша страсть",
        history_title: "Наша История",
        history_p1: "Стоматологическая клиника Cristalex Dent начала свою деятельность в 2008 году. Располагает двумя стоматологическими кабинетами, оснащенными новейшими технологиями, хирургическим кабинетом, кабинетом стерилизации и кабинетом радиовизиографии.",
        history_p2: "За более чем 16 лет работы сформировалась команда врачей, ставших экспертами в области стоматологии.",
        mission_title: "Наша Миссия",
        mission_text: "Являясь преданными стоматологами, команда Cristalex Dent работает профессионально, чтобы предложить вам идеальную формулу: желанную улыбку с оптимальным здоровьем зубов.",
        promise_text: "Здесь вы получите индивидуальное и персонализированное лечение по привлекательным ценам. Здоровье зубов намного доступнее, чем вы ожидали.",
        team_title: "Наша Команда"
      },
      footer: {
        desc: "CristAlex Dent - Золотой стандарт стоматологии в Кишиневе. Мы постоянно инвестируем в людей и технологии.",
        links: "Полезные Ссылки",
        program: "График Работы",
        contact: "Контактная Информация"
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