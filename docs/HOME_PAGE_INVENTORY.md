# Documentație: Inventar Home Page pentru Admin Panel Extern

## Obiectiv
Documentație de referință pentru echipa Admin Panel-ului (repository separat, port 5001).
Conține inventarul complet al elementelor de pe pagina Home - ce este deja dinamic și ce trebuie adăugat.

**Admin Panel:** Repository separat (port 5001)
**Website Frontend:** Acest repository (port 5000)

---

## INVENTAR COMPLET - HOME PAGE

### Legendă Status
- ✅ **DINAMIC** - Se încarcă din API backend (localhost:5001)
- ❌ **STATIC** - Hardcodat în cod sau fișiere i18n
- ⚠️ **HIBRID** - API cu fallback static

---

## 1. HERO SECTION
**Status: ❌ STATIC**

| Element | Câmp actual | Tip | Editabil din Admin |
|---------|-------------|-----|-------------------|
| Titlu principal | `t("hero.title")` | i18n | NU |
| Subtitlu | `t("hero.subtitle")` | i18n | NU |
| Buton CTA | `t("hero.cta")` | i18n | NU |
| Badge text | "Cristalexdent Professional" | Hardcodat | NU |
| Imagine fundal | `heroImage` | Import static | NU |
| Imagine doctor | `doctorImage` | Import static | NU |
| Text urgență | `t("hero.emergency")` | i18n | NU |
| Beneficiu 1 | `t("hero.free_consultation")` | i18n | NU |
| Beneficiu 2 | `t("hero.digital_plan")` | i18n | NU |
| Beneficiu 3 | `t("hero.parking")` | i18n | NU |

**Câmpuri necesare pentru Admin:**
- Titlu (RO, RU, EN)
- Subtitlu (RO, RU, EN)
- Text buton CTA (RO, RU, EN)
- Imagine hero (upload)
- Imagine doctor (upload)
- Lista beneficii (array cu traduceri)

---

## 2. STATS BANNER
**Status: ❌ STATIC**

| Element | Valoare actuală | Tip |
|---------|-----------------|-----|
| Pacienți | "5000+" | Hardcodat |
| Ani experiență | "15+" | Hardcodat |
| Implanturi | "10k+" | Hardcodat |
| Doctori | "12" | Hardcodat |

**Câmpuri necesare pentru Admin:**
- 4 perechi valoare + label (multilingv)

---

## 3. SERVICII (Preview - 4 carduri)
**Status: ✅ DINAMIC** (cu fallback static)

| Element | Sursă | API Endpoint |
|---------|-------|--------------|
| Lista servicii | `getExternalServices()` | `/api/services` |
| Nume serviciu | `translations[lang].name` | ✅ |
| Descriere | `translations[lang].description` | ✅ |
| Imagine | `service.image` | ✅ |
| Features | `service.features[]` | ✅ |
| Status activ | `service.isActive` | ✅ |

**Deja editabil din Admin Panel extern (port 5001)**

---

## 4. BEFORE/AFTER GALLERY
**Status: ❌ STATIC**

| Element | Sursă actuală |
|---------|---------------|
| Caz 1 - Albire | `beforeWhitening`, `afterWhitening` |
| Caz 2 - Aparat dentar | `beforeBraces`, `afterBraces` |
| Caz 3 - Restaurare | `beforeRestoration`, `afterRestoration` |
| Titluri cazuri | `t("before_after_cases.*)` |

**Câmpuri necesare pentru Admin:**
- Titlu secțiune (multilingv)
- Subtitlu (multilingv)
- Array de cazuri:
  - Titlu caz (multilingv)
  - Imagine BEFORE (upload)
  - Imagine AFTER (upload)

---

## 5. CTA BANNER - Consultație Gratuită
**Status: ❌ STATIC**

| Element | Sursă |
|---------|-------|
| Titlu | `t("cta_banner.free_title")` |
| Subtitlu | `t("cta_banner.free_subtitle")` |
| iFrame URL | Hardcodat businessdent.md |

**Câmpuri necesare pentru Admin:**
- Titlu (multilingv)
- Subtitlu (multilingv)
- URL iframe programări

---

## 6. WHY CHOOSE US (4 Features)
**Status: ❌ STATIC**

| Feature | Titlu | Descriere |
|---------|-------|-----------|
| Tehnologie | `t("features.tech_title")` | `t("features.tech_desc")` |
| Fără durere | `t("features.pain_title")` | `t("features.pain_desc")` |
| Garanție | `t("features.garantie_title")` | `t("features.garantie_desc")` |
| Sterilizare | `t("features.steril_title")` | `t("features.steril_desc")` |

**Câmpuri necesare pentru Admin:**
- Titlu secțiune (multilingv)
- 4 carduri features:
  - Icon (select din lista)
  - Titlu (multilingv)
  - Descriere (multilingv)
  - Culoare background

---

## 7. ECHIPA / DOCTORI (Carusel)
**Status: ✅ DINAMIC** (cu fallback static)

| Element | Sursă | API Endpoint |
|---------|-------|--------------|
| Lista doctori | `getExternalTeamMembers()` | `/api/team-members` |
| Nume | `member.name` | ✅ |
| Rol/Specializare | `translations[lang].role` | ✅ |
| Bio | `translations[lang].bio` | ✅ |
| Imagine | `member.imageUrl` | ✅ |
| Ordine | `member.orderIndex` | ✅ |

**Deja editabil din Admin Panel extern (port 5001)**

---

## 8. TESTIMONIALE (Carusel)
**Status: ✅ DINAMIC** (cu fallback static)

| Element | Sursă | API Endpoint |
|---------|-------|--------------|
| Lista testimoniale | `getExternalTestimonials()` | `/api/testimonials` |
| Nume client | `testimonial.name` | ✅ |
| Rol | `translations[lang].role` | ✅ |
| Text recenzie | `translations[lang].text` | ✅ |
| Rating | `testimonial.rating` | ✅ |

**Deja editabil din Admin Panel extern (port 5001)**

---

## 9. SOCIAL MEDIA REVIEWS
**Status: ✅ DINAMIC**

| Element | Sursă | API Endpoint |
|---------|-------|--------------|
| Posturi sociale | `getExternalSocialMediaPosts()` | `/api/social-media-posts` |
| Platformă | `post.platform` | ✅ (tiktok/instagram) |
| URL video | `post.url` | ✅ |
| Titlu | `translations[lang].title` | ✅ |
| Thumbnail | `post.thumbnail` | ✅ |

**Deja editabil din Admin Panel extern (port 5001)**

---

## 10. ABOUT US SECTION
**Status: ❌ STATIC**

| Element | Sursă |
|---------|-------|
| Tagline | `t("about.title")` |
| Titlu istorie | `t("about.history_title")` |
| Paragraf 1 | `t("about.history_p1")` |
| Paragraf 2 | `t("about.history_p2")` |
| Text misiune | `t("about.mission_text")` |
| Text promisiune | `t("about.promise_text")` |
| An fondare | Hardcodat "2008" |
| Imagine echipă | `teamPhoto` import |

**Câmpuri necesare pentru Admin:**
- Toate texturile (multilingv)
- An fondare
- Imagine echipă (upload)

---

## 11. BLOG PREVIEW (3 articole)
**Status: ✅ DINAMIC** (cu fallback static)

| Element | Sursă | API Endpoint |
|---------|-------|--------------|
| Articole blog | `getExternalBlogPosts()` | `/api/blog-posts` |
| Titlu | `translations[lang].title` | ✅ |
| Excerpt | `translations[lang].excerpt` | ✅ |
| Imagine | `post.image` | ✅ |
| Autor | `post.author` | ✅ |
| Data | `post.publishedAt` | ✅ |
| Categorie | `post.category` | ✅ |

**Deja editabil din Admin Panel extern (port 5001)**

---

## 12. FAQ SECTION
**Status: ❌ STATIC**

| Element | Sursă |
|---------|-------|
| Întrebare 1 | `t("faq.q1")` / `t("faq.a1")` |
| Întrebare 2 | `t("faq.q2")` / `t("faq.a2")` |
| Întrebare 3 | `t("faq.q3")` / `t("faq.a3")` |

**Câmpuri necesare pentru Admin:**
- Titlu secțiune (multilingv)
- Array de întrebări:
  - Întrebare (multilingv)
  - Răspuns (multilingv)

---

## 13. FINAL CTA BANNER
**Status: ❌ STATIC**

| Element | Sursă |
|---------|-------|
| Titlu | `t("cta_banner.title")` |
| Subtitlu | `t("cta_banner.text")` |
| Text buton | `t("cta_banner.btn")` |

**Câmpuri necesare pentru Admin:**
- Titlu (multilingv)
- Subtitlu (multilingv)
- Text buton (multilingv)

---

## REZUMAT STATUS

| # | Secțiune | Status | Prioritate |
|---|----------|--------|------------|
| 1 | Hero | ❌ STATIC | ÎNALTĂ |
| 2 | Stats Banner | ❌ STATIC | MEDIE |
| 3 | Servicii | ✅ DINAMIC | - (deja funcțional) |
| 4 | Before/After | ❌ STATIC | ÎNALTĂ |
| 5 | CTA Consultație | ❌ STATIC | JOASĂ |
| 6 | Why Choose Us | ❌ STATIC | MEDIE |
| 7 | Echipa/Doctori | ✅ DINAMIC | - (deja funcțional) |
| 8 | Testimoniale | ✅ DINAMIC | - (deja funcțional) |
| 9 | Social Media | ✅ DINAMIC | - (deja funcțional) |
| 10 | About Us | ❌ STATIC | MEDIE |
| 11 | Blog Preview | ✅ DINAMIC | - (deja funcțional) |
| 12 | FAQ | ❌ STATIC | MEDIE |
| 13 | Final CTA | ❌ STATIC | JOASĂ |

**Total: 5 secțiuni DINAMICE, 8 secțiuni STATICE**

---

## API-URI EXISTENTE (Backend port 5001)

```
GET/POST/PUT/DELETE /api/services
GET/POST/PUT/DELETE /api/team-members
GET/POST/PUT/DELETE /api/testimonials
GET/POST/PUT/DELETE /api/blog-posts
GET/POST/PUT/DELETE /api/social-media-posts
```

---

## CE TREBUIE ADĂUGAT ÎN ADMIN PANEL (port 5001)

### Prioritate ÎNALTĂ - Secțiuni vizibile, des actualizate

#### 1. Hero Section
**Endpoint nou necesar:** `POST/PUT /api/page-content/home/hero`
```typescript
{
  title: { ro: string, ru: string, en: string },
  subtitle: { ro: string, ru: string, en: string },
  ctaButtonText: { ro: string, ru: string, en: string },
  badgeText: string,
  heroImage: string, // URL
  doctorImage: string, // URL
  benefits: [
    { text: { ro: string, ru: string, en: string }, icon: string }
  ]
}
```

#### 2. Before/After Gallery
**Endpoint nou necesar:** `POST/PUT /api/before-after-cases`
```typescript
{
  _id: string,
  title: { ro: string, ru: string, en: string },
  beforeImage: string, // URL
  afterImage: string, // URL
  order: number,
  isActive: boolean
}
```

#### 3. Stats Banner
**Endpoint nou necesar:** `POST/PUT /api/page-content/home/stats`
```typescript
{
  stats: [
    { value: string, label: { ro: string, ru: string, en: string }, icon: string }
  ]
}
```

### Prioritate MEDIE

#### 4. Why Choose Us (Features)
**Endpoint:** `POST/PUT /api/page-content/home/features`
```typescript
{
  sectionTitle: { ro: string, ru: string, en: string },
  features: [
    {
      icon: string,
      title: { ro: string, ru: string, en: string },
      description: { ro: string, ru: string, en: string },
      bgColor: string
    }
  ]
}
```

#### 5. About Section
**Endpoint:** `POST/PUT /api/page-content/home/about`
```typescript
{
  tagline: { ro: string, ru: string, en: string },
  historyTitle: { ro: string, ru: string, en: string },
  historyParagraph1: { ro: string, ru: string, en: string },
  historyParagraph2: { ro: string, ru: string, en: string },
  missionText: { ro: string, ru: string, en: string },
  promiseText: { ro: string, ru: string, en: string },
  foundedYear: number,
  teamImage: string // URL
}
```

#### 6. FAQ Section
**Endpoint:** `POST/PUT /api/faqs`
```typescript
{
  _id: string,
  question: { ro: string, ru: string, en: string },
  answer: { ro: string, ru: string, en: string },
  order: number,
  isActive: boolean,
  pageId: "home" | "services" | "about"
}
```

### Prioritate JOASĂ

#### 7. CTA Banners
**Endpoint:** `POST/PUT /api/page-content/home/cta`
```typescript
{
  consultationCta: {
    title: { ro: string, ru: string, en: string },
    subtitle: { ro: string, ru: string, en: string },
    iframeUrl: string
  },
  finalCta: {
    title: { ro: string, ru: string, en: string },
    subtitle: { ro: string, ru: string, en: string },
    buttonText: { ro: string, ru: string, en: string }
  }
}
```

---

## DEJA FUNCȚIONALE (Nu necesită modificări)

Aceste secțiuni sunt deja conectate la API-ul de pe port 5001:

| Secțiune | Endpoint | Status |
|----------|----------|--------|
| Servicii | `/api/services` | ✅ Funcțional |
| Echipa/Doctori | `/api/team-members` | ✅ Funcțional |
| Testimoniale | `/api/testimonials` | ✅ Funcțional |
| Social Media | `/api/social-media-posts` | ✅ Funcțional |
| Blog Posts | `/api/blog-posts` | ✅ Funcțional |

---

## NOTE TEHNICE PENTRU ADMIN PANEL

### Suport Multilingv
Toate câmpurile text trebuie să aibă 3 versiuni: RO, RU, EN

### Upload Imagini
Secțiunile noi necesită upload pentru:
- Hero: 2 imagini (fundal + doctor)
- Before/After: 2 imagini per caz
- About: 1 imagine (echipa)
- Features: iconițe (opțional, pot fi din bibliotecă)

### Validare în Frontend (acest repo)
Website-ul are deja fallback la date statice dacă API-ul nu returnează date.
Când Admin Panel-ul va popula API-ul, site-ul va prelua automat datele noi.

### Fișier API Client
`client/src/lib/api.ts`
- Trebuie adăugate funcții noi pentru endpoint-urile de conținut static
- Exemplu: `getPageContent(pageId, sectionId)`

---

## FIȘIERE RELEVANTE DIN FRONTEND

| Fișier | Descriere |
|--------|-----------|
| `client/src/pages/Home.tsx` | Pagina principală cu toate secțiunile |
| `client/src/lib/api.ts` | Client API pentru comunicare cu backend |
| `client/src/components/BeforeAfter.tsx` | Componenta Before/After gallery |
| `client/src/components/SocialReviews.tsx` | Componenta Social Media |
| `client/src/components/BookingModal.tsx` | Modal programări |
| `client/src/locales/*.json` | Fișiere traduceri (fallback static) |

---

## INTERFEȚE TYPESCRIPT EXISTENTE

```typescript
// Din client/src/lib/api.ts

export interface ExternalService {
  _id: string;
  name?: string;
  description?: string;
  price?: string;
  duration?: string;
  image?: string;
  category?: string;
  features?: string[];
  isActive?: boolean;
  translations?: {
    ro?: { name?: string; description?: string };
    ru?: { name?: string; description?: string };
    en?: { name?: string; description?: string };
  };
}

export interface ExternalTeamMember {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  image?: string;
  imageUrl?: string;
  specialization?: string;
  education?: string[];
  experience?: string;
  isActive?: boolean;
  order?: number;
  orderIndex?: number;
  translations?: {
    ro?: { role?: string; bio?: string; specialization?: string };
    ru?: { role?: string; bio?: string; specialization?: string };
    en?: { role?: string; bio?: string; specialization?: string };
  };
}

export interface ExternalTestimonial {
  _id: string;
  name: string;
  role?: string;
  text?: string;
  rating?: number;
  image?: string;
  isActive?: boolean;
  translations?: {
    ro?: { text?: string; role?: string };
    ru?: { text?: string; role?: string };
    en?: { text?: string; role?: string };
  };
}

export interface ExternalSocialMediaPost {
  _id: string;
  platform?: string;
  url?: string;
  embedCode?: string;
  thumbnail?: string;
  title?: string;
  isActive?: boolean;
  translations?: {
    ro?: { title?: string };
    ru?: { title?: string };
    en?: { title?: string };
  };
}

export interface ExternalBlogPost {
  _id: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  publishedAt?: string;
  isActive?: boolean;
  translations?: {
    ro?: { title?: string; excerpt?: string; content?: string };
    ru?: { title?: string; excerpt?: string; content?: string };
    en?: { title?: string; excerpt?: string; content?: string };
  };
}
```

---

## CHECKLIST IMPLEMENTARE

### Pentru Admin Panel (port 5001):
- [ ] Creare endpoint `/api/page-content/:pageId/:sectionId`
- [ ] Creare endpoint `/api/before-after-cases`
- [ ] Creare endpoint `/api/faqs`
- [ ] UI pentru editare Hero section
- [ ] UI pentru editare Stats
- [ ] UI pentru editare Before/After cases
- [ ] UI pentru editare Features
- [ ] UI pentru editare About section
- [ ] UI pentru editare FAQ
- [ ] UI pentru editare CTA banners
- [ ] Upload imagini pentru secțiunile noi

### Pentru Frontend (acest repo - după ce API-ul e gata):
- [ ] Adăugare funcții în `api.ts` pentru noile endpoint-uri
- [ ] Modificare Home.tsx pentru a folosi datele din API
- [ ] Păstrare fallback la date statice

---

*Documentație generată: Decembrie 2024*
*Ultima actualizare: Vezi git history*
