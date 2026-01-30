# Digital & AI Academy - Formation Chine → Afrique Platform

Bienvenue! Cette plateforme vous permet de vendre votre formation "Chine → Afrique: Importation, Dropshipping et Profits" en ligne avec un système de paiement et de gestion complètement automatisé.

## 🎯 Fonctionnalités principales

- **Landing page convaincante**: Présentation attractive de votre formation avec aperçu du PDF
- **Système de paiement**: Orange Money, MTN MoMo et Stripe intégrés
- **Gestion des commandes**: Dashboard admin pour vérifier les paiements et accorder l'accès
- **Téléchargement sécurisé**: Tokens d'accès avec expiration pour les PDFs
- **Emails automatiques**: Confirmation et lien de téléchargement envoyés au client
- **Design moderne**: Interface responsive et moderne avec les couleurs de votre marque

## 📋 Stack technologique

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4
- **Backend**: Next.js API Routes
- **Base de données**: Supabase (PostgreSQL)
- **Paiements**: Orange Money, MTN MoMo (via Flutterwave), Stripe
- **Emails**: Nodemailer / Resend
- **Hosting**: Vercel (recommandé)
- **Storage**: Vercel Blob (pour les PDFs)

## 🚀 Démarrage rapide

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd formation-platform
npm install
```

### 2. Configurer Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans l'éditeur SQL et exécutez `/scripts/setup-database.sql`
4. Récupérez vos clés API

### 3. Variables d'environnement

Créez un fichier `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role
NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe_admin_sécurisé
NEXT_PUBLIC_APP_URL=https://alibaba-trainning.da-academy.digital
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
.
├── app/
│   ├── page.tsx                    # Landing page
│   ├── checkout/                   # Page de paiement
│   ├── payment-success/            # Confirmation de paiement
│   ├── admin/                      # Dashboard admin
│   └── api/
│       ├── payment/                # API de paiement
│       ├── download/               # API de téléchargement sécurisé
│       └── admin/                  # API admin
├── components/
│   ├── hero.tsx                    # Section héro
│   ├── course-preview.tsx          # Aperçu du cours
│   ├── checkout-form.tsx           # Formulaire d'achat
│   ├── admin-dashboard.tsx         # Dashboard admin
│   └── ...
├── lib/
│   ├── email.ts                    # Envoi d'emails
│   ├── tokens.ts                   # Gestion des tokens d'accès
│   └── utils.ts
├── scripts/
│   └── setup-database.sql          # Migration de base de données
└── public/
    └── logo.png                    # Logo de votre entreprise
```

## 🔐 Sécurité

- **Tokens d'accès**: URLs de téléchargement valides pendant 48 heures uniquement
- **Row Level Security**: Supabase RLS pour la sécurité des données
- **Validation serveur**: Tous les paiements vérifiés en backend
- **HTTPS**: Automatique avec Vercel
- **Variables d'environnement**: Clés sensibles jamais exposées

## 💳 Intégration des paiements

### Orange Money & MTN MoMo
Utilisez Flutterwave ou Paytech pour accepter ces paiements. Voir `/IMPLEMENTATION_GUIDE.md` pour les détails.

### Stripe
Intégration simple avec Stripe Checkout. Modifiez `/app/api/payment/initiate/route.ts` pour ajouter Stripe.

## 📧 Configuration des emails

### Option 1: Gmail
Utilisez un mot de passe d'application Gmail. Voir `/DEPLOYMENT_GUIDE.md`.

### Option 2: Resend
Service email spécialisé pour Next.js. Très simple à configurer.

## 🛠️ Personnalisation

### Changer les couleurs
Modifiez `/app/globals.css` - Les variables CSS au début du fichier définissent toutes les couleurs de la marque.

### Changer le contenu
- **Landing page**: Modifiez les composants dans `/components/`
- **Prix de la formation**: Cherchez "5000" dans le code
- **Textes**: Cherchez et remplacez directement

### Ajouter votre logo
Remplacez `/public/logo.png` avec votre logo (en PNG)

## 📚 Documentation complète

- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)**: Guide d'implémentation détaillé
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**: Guide de déploiement et configuration du domaine

## 🎬 Prochaines étapes

### Phase 1 (Maintenant)
- [ ] Configurez Supabase et déployez
- [ ] Testez l'intégration des paiements
- [ ] Configurez votre domaine personnalisé
- [ ] Testez le flux complet client

### Phase 2 (Court terme)
- [ ] Intégrez l'envoi d'emails automatiques
- [ ] Uploadez votre PDF sur Vercel Blob
- [ ] Testez les téléchargements sécurisés
- [ ] Lancez la plateforme!

### Phase 3 (Futur)
- [ ] Intégrez les cours vidéos (vous les mentionnez comme "à venir")
- [ ] Ajoutez une communauté d'étudiants
- [ ] Système de certification
- [ ] Upsells et produits complémentaires

## 💬 Support et contact

**Digital & AI Academy**
- **Directeur**: Joseph Chanel OBAH, PDG et fondateur
- **WhatsApp Business**: +237 672 991 834
- **Email**: joseph@da-academy.digital
- **Localisation**: Douala, Bonaberi, Cameroon

## 📄 Licence

Ce projet est propriétaire à Digital & AI Academy.

## 🙏 Remerciements

Merci d'utiliser cette plateforme pour diffuser votre expertise en entrepreneuriat et commerce électronique en Afrique!

---

**Questions ou problèmes?** Contactez Joseph Chanel OBAH via WhatsApp Business ou email.

Bonne chance avec votre formation! 🚀
