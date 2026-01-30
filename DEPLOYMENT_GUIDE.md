# Guide de déploiement - Digital & AI Academy Formation Platform

Ce guide vous aide à déployer votre plateforme de vente de formation en ligne avec un domaine personnalisé.

## Table des matières
1. [Prérequis](#prérequis)
2. [Configurer Supabase](#configurer-supabase)
3. [Déployer sur Vercel](#déployer-sur-vercel)
4. [Configurer le domaine personnalisé](#configurer-le-domaine-personnalisé)
5. [Intégration des paiements](#intégration-des-paiements)
6. [Configuration des emails](#configuration-des-emails)
7. [Vérifications avant lancement](#vérifications-avant-lancement)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir:
- [ ] Un compte GitHub (pour v0 et Vercel)
- [ ] Un compte Supabase gratuit
- [ ] Un domaine (da-academy.digital avec le sous-domaine alibaba-trainning)
- [ ] Un compte email fonctionnel pour les notifications
- [ ] Accès à votre registraire de domaine (GoDaddy, Namecheap, OVH, etc.)

---

## Configurer Supabase

### Étape 1: Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez "Start your project"
3. Choisissez un nom: `da-academy-formation`
4. Choisissez une région proche (ex: Paris)
5. Attendez que le projet soit créé

### Étape 2: Récupérer vos clés

1. Allez dans Settings → API
2. Copier:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

### Étape 3: Exécuter la migration

1. Allez dans l'éditeur SQL de Supabase
2. Créez une nouvelle requête
3. Copiez le contenu de `/scripts/setup-database.sql`
4. Exécutez la requête
5. Vérifiez que toutes les tables sont créées

---

## Déployer sur Vercel

### Étape 1: Préparer votre code

1. Assurez-vous que vous avez cloné le projet
2. Vérifiez que le `.gitignore` inclut les secrets
3. Pushez votre code sur GitHub

### Étape 2: Créer un projet Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez "New Project"
3. Connectez votre repository GitHub
4. Cliquez "Import"

### Étape 3: Configurer les variables d'environnement

1. Allez dans Settings → Environment Variables
2. Ajoutez toutes les variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_APP_URL=https://alibaba-trainning.da-academy.digital

# Email (optionnel, pour la fonctionnalité d'email)
EMAIL_FROM=your-email@gmail.com
EMAIL_PASSWORD=your_app_password
# OU
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your_password
SMTP_SECURE=false

# Paiement (optionnel, pour Flutterwave)
FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key

# Stockage fichier (optionnel, pour Vercel Blob)
BLOB_READ_WRITE_TOKEN=your_blob_token
```

3. Cliquez "Save"
4. Attendez le déploiement automatique

### Étape 4: Vérifier le déploiement

1. Une fois déployé, cliquez sur "Visit"
2. Vérifiez que le site se charge correctement
3. L'URL temporaire sera quelque chose comme: `da-academy-formation.vercel.app`

---

## Configurer le domaine personnalisé

### Option A: Domaine chez Vercel (Recommandé)

1. Chez Vercel, allez dans Settings → Domains
2. Entrez: `alibaba-trainning.da-academy.digital`
3. Cliquez "Add"
4. Vercel vous donnera des instructions DNS
5. Allez chez votre registraire de domaine
6. Ajoutez les enregistrements DNS fournis par Vercel

### Option B: Configuration manuelle DNS

Si votre registraire ne supporte pas l'ajout automatique:

1. Chez votre registraire, allez dans les paramètres DNS
2. Ajoutez un enregistrement CNAME:
   - **Nom**: `alibaba-trainning`
   - **Type**: `CNAME`
   - **Valeur**: `cname.vercel.com`

3. Chez Vercel, Settings → Domains → Entrez votre domaine
4. Attendez que le DNS se propage (5-48 heures)

### Vérifier la configuration

```bash
# Depuis votre terminal, vérifiez le DNS:
nslookup alibaba-trainning.da-academy.digital
```

Vous devriez voir un enregistrement CNAME pointant vers `cname.vercel.com`

---

## Intégration des paiements

### Setup Flutterwave (Recommandé pour l'Afrique)

1. Créez un compte sur [Flutterwave](https://dashboard.flutterwave.io)
2. Allez dans Settings → API Keys
3. Copiez vos clés:
   - `FLUTTERWAVE_PUBLIC_KEY`
   - `FLUTTERWAVE_SECRET_KEY`
4. Ajoutez-les à vos variables d'environnement Vercel

### Intégrer Flutterwave dans le code

Modifiez `/app/api/payment/initiate/route.ts`:

```typescript
import { Flutterwave } from '@flutterwave/node'

const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY!,
  process.env.FLUTTERWAVE_SECRET_KEY!
)

// Dans la fonction POST:
const response = await flw.Transaction.initialize({
  tx_ref: `order_${order.id}`,
  amount: amount,
  currency: 'XAF',
  payment_options: 'card,mobilemoney,ussd',
  customer: {
    email: email,
    phonenumber: phone,
  },
  customizations: {
    title: 'Formation Chine → Afrique',
    description: 'Importation et Dropshipping',
    logo: 'https://alibaba-trainning.da-academy.digital/logo.png',
  },
  redirect_url: `${baseUrl}/payment-success?orderId=${order.id}`,
})

return NextResponse.json({
  orderId: order.id,
  redirectUrl: response.data.link,
})
```

---

## Configuration des emails

### Option A: Gmail + OAuth2

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet
3. Activez l'API Gmail
4. Créez des identifiants OAuth2
5. Générez un App Password
6. Ajoutez à vos variables:
   ```
   EMAIL_FROM=your-email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

### Option B: Service Resend (Recommandé)

1. Inscrivez-vous sur [Resend](https://resend.com)
2. Créez une clé API
3. Modifiez `/lib/email.ts` pour utiliser Resend:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendDownloadEmail(...) {
  const response = await resend.emails.send({
    from: 'formations@da-academy.digital',
    to: email,
    subject: '...',
    html: '...'
  })
}
```

---

## Vérifications avant lancement

### Checklist technique

- [ ] Domaine configuré et fonctionnel
- [ ] Supabase tables créées
- [ ] Variables d'environnement ajoutées
- [ ] Admin password changé
- [ ] Email fonctionnel (test)
- [ ] Paiements testés en mode sandbox
- [ ] PDF uploadé et accessible
- [ ] SSL/HTTPS actif (automatique avec Vercel)

### Checklist légale

- [ ] CGU (Conditions Générales d'Utilisation) créées
- [ ] Politique de confidentialité mise à jour
- [ ] Politique de remboursement claire
- [ ] Mentions légales complètes

### Test complet

1. **Depuis le client**:
   - Visiter la landing page
   - Cliquer "Acheter maintenant"
   - Remplir le formulaire
   - Simuler un paiement
   - Vérifier la commande en admin

2. **Depuis l'admin**:
   - Accéder au dashboard `/admin`
   - Voir la commande listée
   - Cliquer "Accorder l'accès"
   - Vérifier que l'email a été envoyé
   - Cliquer sur le lien de téléchargement

3. **Après accès**:
   - Vérifier que le PDF se télécharge
   - Vérifier que le lien expire après 48h

---

## Maintenance et monitoring

### Logs et monitoring

Vercel fournit automatiquement:
- **Logs en temps réel**: Settings → Function Logs
- **Monitoring**: Analytics & Monitoring dans le dashboard
- **Alertes**: Settings → Alerts

### Backup Supabase

1. Allez dans Supabase → Settings
2. Activez les backups automatiques
3. Téléchargez les backups régulièrement

### Mises à jour

- Mettez à jour les dépendances mensuellement
- Testez les mises à jour en environnement de staging
- Redéployez après mises à jour critiques

---

## Troubleshooting

### Le domaine ne fonctionne pas
- Attendez 24-48 heures pour la propagation DNS
- Vérifiez les enregistrements DNS chez votre registraire
- Utilisez `nslookup` pour vérifier
- Videz le cache du navigateur

### Les emails ne sont pas envoyés
- Vérifiez vos identifiants email
- Vérifiez les logs Vercel pour les erreurs
- Testez l'email manuellement avec `curl`
- Vérifiez les spams

### Les paiements ne fonctionnent pas
- Testez en mode sandbox Flutterwave d'abord
- Vérifiez les clés API
- Vérifiez les logs d'erreur
- Consultez la doc Flutterwave

---

## Support et ressources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Flutterwave Docs**: https://developer.flutterwave.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## Prochaines étapes après lancement

1. Annoncez votre formation sur vos réseaux sociaux
2. Configurez Google Analytics pour tracker les visites
3. Mettez en place une stratégie d'email marketing
4. Créez un forum ou communauté pour vos étudiants
5. Préparez les vidéos de formation que vous mentionnez

Bonne chance avec votre plateforme!
