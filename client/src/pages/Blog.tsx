import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Calendar, User, ArrowRight } from "lucide-react";
import implantImage from "@assets/generated_images/dental_implants_guide_blog_post_thumbnail.png";
import whiteningImage from "@assets/generated_images/teeth_whitening_tips_blog_post_thumbnail.png";
import childImage from "@assets/generated_images/child_dental_care_blog_post_thumbnail.png";
import hygieneImage from "@assets/generated_images/oral_hygiene_routine_blog_post_thumbnail.png";

export const blogPosts = [
  {
    id: 1,
    title: "Ghid Complet Despre Implanturile Dentare: Tot Ce Trebuie Să Știi",
    excerpt: "Implanturile dentare sunt soluția ideală pentru înlocuirea dinților lipsă. Află care sunt etapele tratamentului, beneficiile și cum să le îngrijești corect.",
    date: "15 Noiembrie 2025",
    author: "Dr. Zănoagă Oleg",
    category: "Implantologie",
    image: implantImage,
    content: `
      <p>Implanturile dentare reprezintă standardul de aur în stomatologia modernă pentru înlocuirea dinților pierduți. Spre deosebire de protezele mobile sau punțile dentare, implanturile oferă o soluție permanentă, estetică și funcțională care se simte exact ca dinții naturali.</p>
      
      <h3>Ce este un implant dentar?</h3>
      <p>Un implant dentar este o rădăcină artificială, realizată de obicei din titan biocompatibil, care este inserată în osul maxilar pentru a susține o coroană, o punte sau o proteză. Titanul este ales datorită proprietății sale unice de a se integra perfect cu osul, proces numit osteointegrare.</p>

      <h3>Etapele tratamentului</h3>
      <ol>
        <li><strong>Consultația și Planificarea:</strong> Totul începe cu o evaluare completă, incluzând radiografii 3D (CBCT) pentru a analiza calitatea osului.</li>
        <li><strong>Inserarea Implantului:</strong> O procedură chirurgicală minim invazivă, realizată sub anestezie locală, în care implantul este plasat în os.</li>
        <li><strong>Perioada de Vindecare:</strong> Durează între 3 și 6 luni, timp în care implantul fuzionează cu osul.</li>
        <li><strong>Montarea Coroanei:</strong> După vindecare, se atașează bontul protetic și coroana finală, redând zâmbetul complet.</li>
      </ol>

      <h3>Beneficiile Implanturilor</h3>
      <ul>
        <li>Aspect și funcționalitate naturală.</li>
        <li>Previn pierderea osoasă (atrofia).</li>
        <li>Nu afectează dinții vecini (spre deosebire de punți).</li>
        <li>Durabilitate pe viață cu o îngrijire corectă.</li>
      </ul>
    `
  },
  {
    id: 2,
    title: "Secretele Unui Zâmbet Alb și Strălucitor: Sfaturi de la Experți",
    excerpt: "Îți dorești un zâmbet mai alb? Descoperă metodele sigure de albire dentară și cum poți menține rezultatele pe termen lung.",
    date: "10 Noiembrie 2025",
    author: "Dr. Ludmila Robu",
    category: "Estetică",
    image: whiteningImage,
    content: `
      <p>Un zâmbet alb și strălucitor este adesea asociat cu sănătatea și încrederea în sine. Deși există numeroase produse de albire pe piață, este esențial să alegi metode sigure care nu afectează smalțul dinților.</p>
      
      <h3>De ce se îngălbenesc dinții?</h3>
      <p>Factorii principali includ consumul de cafea, ceai, vin roșu, fumatul, dar și îmbătrânirea naturală. Anumite medicamente pot, de asemenea, să afecteze culoarea dentinei.</p>

      <h3>Metode Profesionale vs. Acasă</h3>
      <p>Albirea profesională realizată în cabinet (ex: cu lampa Zoom) oferă rezultate imediate și spectaculoase, sub supravegherea medicului. Kit-urile pentru acasă recomandate de medic sunt o alternativă bună pentru întreținere, dar necesită mai mult timp.</p>
    `
  },
  {
    id: 3,
    title: "Prima Vizită a Copilului la Stomatolog: Cum Să O Faci Plăcută",
    excerpt: "Frica de dentist se învață, nu este înnăscută. Iată cum poți pregăti copilul pentru o primă experiență pozitivă la clinica dentară.",
    date: "05 Noiembrie 2025",
    author: "Dr. Scutelnic Daniela",
    category: "Pedodonție",
    image: childImage,
    content: `
      <p>Prima vizită la stomatolog este un moment crucial care poate defini relația copilului cu sănătatea orală pentru tot restul vieții. Scopul nostru este să transformăm această experiență într-o joacă educativă.</p>
      
      <h3>Când ar trebui să aibă loc prima vizită?</h3>
      <p>Recomandăm ca prima vizită să aibă loc odată cu apariția primului dinte sau cel târziu la vârsta de un an. Aceasta este o vizită de acomodare și prevenție.</p>
    `
  },
  {
    id: 4,
    title: "Rutina Corectă de Igienă Orală: Mai Mult Decât Periaj",
    excerpt: "Periajul de două ori pe zi nu este suficient. Află cum să folosești ața dentară și apa de gură pentru o curățare completă.",
    date: "01 Noiembrie 2025",
    author: "Dr. Crăciun Daniela",
    category: "Profilaxie",
    image: hygieneImage,
    content: `
      <p>O igienă orală corectă este baza sănătății dentare. Mulți pacienți cred că periajul este suficient, dar acesta curăță doar 60% din suprafețele dinților.</p>
      
      <h3>Pașii unei igiene complete:</h3>
      <ol>
        <li><strong>Periajul:</strong> De două ori pe zi, dimineața și seara, timp de 2 minute.</li>
        <li><strong>Ața Dentară:</strong> Obligatoriu o dată pe zi, seara, înainte de periaj, pentru a curăța spațiile interdentare.</li>
        <li><strong>Apa de Gură:</strong> Pentru a reduce bacteriile și a împrospăta respirația.</li>
        <li><strong>Dușul Bucal:</strong> Ideal pentru pacienții cu lucrări protetice sau aparate dentare.</li>
      </ol>
    `
  }
];

export default function Blog() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 transform origin-top-right"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Blog & Noutăți</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Informații utile, sfaturi de la experți și noutăți din lumea stomatologiei moderne.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <a className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-bold text-sm mt-auto group-hover:translate-x-2 transition-transform">
                    Citește Articolul <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}