# Deployare Site CristAlex Dent pe Vercel

Site-ul este pregătit complet pentru deployment pe Vercel! ✅

## Ce a fost configurat:

1. ✅ **API Serverless** - Toate endpoint-urile sunt în `api/index.js`
2. ✅ **MongoDB cu Connection Pooling** - Optimizat pentru serverless
3. ✅ **Build Configuration** - Vite compilează frontend în `dist/public/`
4. ✅ **Routing** - `/api/*` merge la serverless, rest la frontend
5. ✅ **ES Modules** - Compatibil cu Vercel

## Pași pentru Deployment:

### 1. Creează MongoDB Database (gratuit)

1. Mergi la [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Creează cont (gratuit)
3. Creează un cluster nou (Free Tier - M0)
4. În **Database Access**: Creează un user cu username și password
5. În **Network Access**: Adaugă IP `0.0.0.0/0` (permite toate IP-urile)
6. Click pe **Connect** → **Connect your application**
7. Copiază connection string-ul (arată ca: `mongodb+srv://username:password@cluster.mongodb.net/cristalexdent`)

### 2. Push Code pe GitHub

```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin TU_REPOSITORY_URL_AICI
git push -u origin main
```

### 3. Deploy pe Vercel

1. Mergi la [vercel.com](https://vercel.com)
2. Sign in cu GitHub
3. Click **Add New Project**
4. Selectează repository-ul tău
5. **Configurare (IMPORTANT - Modifică Setările):**
   - **Framework Preset**: Selectează **Vite** (default corect ✅)
   - **Build Command**: `npm run build` (default corect ✅)
   - **Output Directory**: ⚠️ **SCHIMBĂ din `dist` în `dist/public`**
     - Click pe **Override** lângă "Output Directory"
     - Scrie: `dist/public`
   - **Install Command**: `npm install` (default corect ✅)
6. **Environment Variables** - Adaugă:
   - Name: `MONGODB_URI`
   - Value: Connection string-ul de la MongoDB
   - (Exemplu: `mongodb+srv://user:pass@cluster.mongodb.net/cristalexdent`)
7. Click **Deploy**

### ⚠️ FOARTE IMPORTANT

Dacă după deploy vezi **codul sursă** în loc de site, cauza este că **Output Directory** este setat greșit!

**Soluție:**
1. Mergi în Project Settings → General → Build & Development Settings
2. La **Output Directory**, apasă **Override**
3. Schimbă din `dist` în `dist/public`
4. Salvează și fă **Redeploy** din Deployments

### 4. Verifică Deployment

După ce deployment-ul este gata (2-3 minute):

1. Vizitează URL-ul primit (ex: `cristalexdent.vercel.app`)
2. Verifică că site-ul se încarcă corect
3. Testează API-ul:
   - Deschide `https://YOUR_URL.vercel.app/api/services`
   - Ar trebui să vezi date JSON

## Custom Domain (Opțional)

După deployment de succes:

1. În Vercel Dashboard → Settings → Domains
2. Adaugă domeniul tău (ex: `cristalexdent.md`)
3. Configurează DNS-ul conform instrucțiunilor Vercel

## Troubleshooting

### "Database not available"
- Verifică că `MONGODB_URI` este setat în Vercel
- Asigură-te că IP-ul `0.0.0.0/0` este whitelisted în MongoDB

### Site-ul nu se încarcă
- Verifică **Deployment Logs** în Vercel Dashboard
- Asigură-te că build-ul a reușit (verde)

### API returnează erori
- Verifică **Function Logs** în Vercel Dashboard
- Testează local cu `npm run build && npm start`

## Structura Fișierelor

```
cristalexdent/
├── api/
│   └── index.js          # Serverless API (MongoDB + Express)
├── client/               # Frontend React
├── dist/
│   └── public/          # Build output pentru Vercel
├── vercel.json          # Configurare Vercel
└── package.json
```

## Support

- Documentație Vercel: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Docs: [docs.mongodb.com](https://docs.mongodb.com/)

---

**Gata de deployment! 🚀**
