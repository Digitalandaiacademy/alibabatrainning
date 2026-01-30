# Tech Stack - Détails technologiques

Ce document explique les technologies utilisées et pourquoi elles ont été choisies.

## Vue d'ensemble

```
Frontend (Client)           Backend (Serveur)          Base de données
──────────────────         ─────────────────          ──────────────
   React 19                Next.js 16                   Supabase
   Tailwind CSS            TypeScript                   PostgreSQL
   Lucide Icons            Node.js                      RLS Security
   Next.js                 Express (Routes)
   TypeScript              Nodemailer
                          Crypto
```

## Frontend

### Next.js 16
**Pourquoi?**
- Framework React moderne et performant
- App Router pour navigation optimale
- Support des Server Components
- Build optimisé avec Turbopack
- Déploiement facile sur Vercel

**Fichiers clés:**
- `/app/page.tsx` - Landing page
- `/app/checkout/page.tsx` - Formulaire d'achat
- `/app/admin/page.tsx` - Dashboard admin

### React 19
**Nouvelles fonctionnalités utilisées:**
- Server Components pour meilleure performance
- `use cache` directive pour caching
- Hooks optimisés

### Tailwind CSS v4
**Pourquoi?**
- Utility-first CSS framework
- Responsive design automatique
- Performance optimale
- Dark mode simple à implémenter
- Personnalisation via design tokens

**Colors utilisées:**
- Primary: Bleu (de votre logo) - `oklch(0.35 0.15 254)`
- Secondary: Rouge (de votre logo) - `oklch(0.52 0.19 18)`
- Neutrals: Blanc, gris, noir

### TypeScript
**Pourquoi?**
- Type safety complet
- Meilleure expérience développeur
- Erreurs détectées plus tôt
- Documentation de code améliorée
- Production plus stable

### Lucide Icons
**Pourquoi?**
- Plus de 1000 icônes SVG
- Légères (10-15kb)
- Responsive
- Customisables via props
- Cohérentes avec le design

**Icônes utilisées:**
- `Check` - Validation et statuts
- `Heart` - Marqué dans le footer
- `AlertCircle` - Messages d'erreur
- `ShoppingCart`, `DollarSign` - Commerce
- Etc.

## Backend

### Next.js API Routes
**Fichiers:**
```
/app/api/
├── payment/
│   └── initiate/route.ts           ← Créer une commande
├── download/
│   ├── pdf/route.ts                ← Vérifier l'accès
│   └── pdf/file/route.ts           ← Servir le PDF
└── admin/
    └── grant-access/route.ts       ← Accorder l'accès
```

**Avantages:**
- Pas de serveur séparé à gérer
- Déploiement unifié
- Sécurité via variables d'environnement
- Scaling automatique

### TypeScript + Node.js
**Utilisation:**
- Type safety sur le backend
- Async/await pour les opérations
- Crypto pour tokens sécurisés
- JSON parsing/serialization

### Nodemailer
**Pour quoi?**
- Envoyer les emails de confirmation
- Support de multiples providers (Gmail, Outlook, SMTP custom)
- Templates HTML
- Piècces jointes optionnelles

**Exemple de configuration:**
```typescript
// Gmail
transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
})

// SMTP custom
transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { ... }
})
```

### Crypto (Node.js natif)
**Utilisation:**
```typescript
// Générer un token aléatoire sécurisé
const token = crypto.randomBytes(32).toString('hex')
// Résultat: "a1b2c3d4e5f6..." (64 caractères)
```

**Sécurité:**
- Impossible à deviner
- Génération cryptographiquement sûre
- Unique pour chaque téléchargement

## Base de données

### Supabase (PostgreSQL)
**Pourquoi Supabase?**
- PostgreSQL robuste et fiable
- Gratuit jusqu'à une certaine limite
- Intégration Auth natif
- RLS (Row Level Security) intégré
- Real-time capabilities
- Backups automatiques
- Dashboard moderne et facile d'usage

**Tables créées:**
```
profiles
├── id (UUID)
├── user_id (UUID)
├── email
├── full_name
├── phone
└── timestamps

orders
├── id (UUID)
├── email
├── phone
├── amount (5000 FCFA)
├── currency
├── payment_method (orange_money, mtn_momo, stripe)
├── status (pending, completed, failed)
├── timestamps

course_access
├── id (UUID)
├── order_id (FK)
├── access_granted (boolean)
├── pdf_download_count
├── last_accessed
└── expires_at

payment_logs (audit trail)
├── id (UUID)
├── order_id (FK)
├── action
├── status
├── response_data (JSON)
└── created_at

download_tokens
├── id (UUID)
├── order_id (FK)
├── token (unique, 64 chars)
├── expires_at
└── created_at
```

### Row Level Security (RLS)
**Exemple:**
```sql
-- Utilisateurs ne peuvent voir que leurs propres commandes
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Admins peuvent tout voir
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (is_admin(auth.uid()));
```

## Paiements

### Architecture de paiement

```
CLIENT
  ↓
CHECKOUT PAGE (Choix du prestataire)
  ↓
┌─────────────────┬──────────────┬────────────────┐
│ Orange Money    │ MTN MoMo     │ Carte bancaire │
└─────────────────┴──────────────┴────────────────┘
  ↓                 ↓                ↓
Flutterwave      Flutterwave      Stripe
  ↓                 ↓                ↓
Redirection      Redirection      Redirection
  ↓                 ↓                ↓
PAYMENT_SUCCESS PAGE
  ↓
Commande créée en BD avec statut "pending"
  ↓
ADMIN DASHBOARD
  ↓
Admin valide le paiement
  ↓
Accès accordé + Email envoyé
  ↓
CLIENT REÇOIT TÉLÉCHARGEMENT
```

### Intégrations disponibles

#### 1. Flutterwave (Recommandé pour l'Afrique)
**API:**
```typescript
POST https://api.flutterwave.com/v3/payments

{
  tx_ref: `order_${orderId}`,
  amount: 5000,
  currency: 'XAF',
  payment_options: 'card,mobilemoney,ussd',
  customer: {
    email: email,
    phonenumber: phone
  },
  redirect_url: `${baseUrl}/payment-success`
}
```

**Avantages:**
- Supporté au Cameroun
- Orange Money + MTN MoMo
- Cartes bancaires
- Wallets

#### 2. Stripe
**Intégration simple:**
```typescript
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'xaf',
      product_data: {
        name: 'Formation Chine → Afrique'
      },
      unit_amount: 500000 // 5000 FCFA en centimes
    },
    quantity: 1
  }],
  mode: 'payment',
  success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${baseUrl}/checkout`
})
```

## Sécurité

### Principe Zero Trust
Tout est vérifié:
```
Client demande → Backend valide → BD confirme → Servir le fichier
```

### Token d'accès sécurisé

```typescript
// Génération
const token = crypto.randomBytes(32).toString('hex')
// Stockage en BD avec expiration
INSERT INTO download_tokens 
  (token, order_id, expires_at)
VALUES 
  ('a1b2c3...', 'order123', '2025-02-15')

// Vérification avant téléchargement
SELECT * FROM download_tokens
WHERE token = ? 
  AND order_id = ?
  AND expires_at > now()
```

### Variables d'environnement
**Ne jamais commettre:**
- Clés API
- Mots de passe
- Tokens de service

**Utiliser `.env.local` et `.env` dans `.gitignore`:**
```
.env.local          ← Local only
.env.local.example  ← Template (committer sans valeurs)
```

## Déploiement

### Vercel
**Pourquoi?**
- Déploiement en 1 clic depuis GitHub
- Auto-scaling
- CDN global
- Logs en temps réel
- Support des variables d'environnement
- Intégration Git native
- Domaines personnalisés faciles

**Process:**
```
Git push to main
    ↓
Vercel détecte changements
    ↓
Installe dépendances
    ↓
Build (npm run build)
    ↓
Déploiement
    ↓
Preview URLs + Production
    ↓
HTTPS automatique
```

### Vercel Blob (Optionnel pour PDFs)
**Stocker et servir les PDFs:**
```typescript
import { put, get } from '@vercel/blob'

// Upload
await put('cours.pdf', file, {
  access: 'public'
})

// Récupérer
const blob = await get('cours.pdf')
```

**Avantages:**
- Stockage simple et rapide
- URLs publiques automatiques
- CDN global
- Gratuit jusqu'à une limite

## Performance

### Optimisations implémentées

1. **Image Optimization (Next.js)**
   ```jsx
   <Image src="/logo.png" width={120} height={40} />
   // Automatiquement optimisée, responsive, lazy-loaded
   ```

2. **Server Components**
   ```tsx
   // Pas de JS client inutile
   export default async function Page() {
     const data = await db.fetch() // Sur le serveur!
     return <div>{data}</div>
   }
   ```

3. **CSS Minification (Tailwind)**
   - Seules les classes utilisées sont incluses
   - Production: ~30-50KB CSS gzipped

4. **Database Indexes**
   ```sql
   CREATE INDEX idx_orders_user_id ON orders(user_id)
   CREATE INDEX idx_download_tokens_expires_at ON download_tokens(expires_at)
   ```

## Monitoring et Logs

### Vercel Logs
```
Vercel Dashboard → Functions Logs
  ↓
Toutes les erreurs et avertissements visibles
  ↓
Stack traces complètes
  ↓
Temps d'exécution des fonctions
```

### Supabase Logs
```
Supabase Dashboard → Database Logs
  ↓
Toutes les requêtes SQL
  ↓
Erreurs RLS
  ↓
Performance des requêtes
```

## Maintenance des dépendances

### Mise à jour mensuelle recommandée

```bash
# Voir les dépendances obsolètes
npm outdated

# Mettre à jour les dépendances
npm update

# Pour les mises à jour majeures
npm install -g npm-check-updates
ncu -u
npm install

# Tester avant production
npm run build
npm run dev
```

## Conclusion

Cette stack technologique a été choisie pour:

1. **Performance**: Très rapide, optimisé pour production
2. **Sécurité**: TypeScript, RLS, tokens sécurisés, variables d'environnement
3. **Maintenabilité**: Code clair, documenté, facile à modifier
4. **Coût**: Gratuit jusqu'à une certaine limite (scaling progressif)
5. **Support**: Communautés actives et larges pour chaque outil
6. **Africain**: Flutterwave supporté pour paiements mobiles
7. **Scalable**: Peut gérer des milliers de clients sans modification majeure

Vous avez tous les outils pour démarrer et croître votre plateforme!
