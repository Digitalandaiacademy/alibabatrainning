# Configuration Admin - Guide de démarrage rapide

## Joseph! Voici votre checklist de configuration

### ✅ **ÉTAPE 1: Configurez votre mot de passe admin**

1. Allez dans votre fichier `.env.local` (ou créez-le)
2. Ajoutez cette ligne:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe_super_secret
```

**Exemple:**
```env
NEXT_PUBLIC_ADMIN_PASSWORD=JosephChanel2024!
```

> **Conseil:** Utilisez un mot de passe fort (majuscules, minuscules, chiffres, caractères spéciaux)

### ✅ **ÉTAPE 2: Configurez l'envoi d'emails**

Vous avez 2 options:

#### Option A: Gmail (Recommandé, gratuit)

1. Activez la vérification 2FA sur votre compte Gmail
2. Générez un "App Password" (mot de passe d'application):
   - Allez sur: https://myaccount.google.com/apppasswords
   - Sélectionnez "Mail" et "Windows Computer" (ou autre device)
   - Google vous génère un mot de passe de 16 caractères
3. Ajoutez à votre `.env.local`:
```env
EMAIL_FROM=votre.email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

#### Option B: SMTP personnalisé

Si vous avez un serveur de mail:
```env
SMTP_HOST=mail.example.com
SMTP_PORT=587
SMTP_USER=votre_email@example.com
SMTP_PASSWORD=votre_mot_de_passe
SMTP_SECURE=true
```

### ✅ **ÉTAPE 3: Installer la base de données Supabase**

1. Vous devez avoir déjà Supabase connecté (c'est dans le chat)
2. Allez dans votre projet Supabase
3. Allez dans "SQL Editor"
4. Créez une nouvelle requête
5. Copiez-collez le contenu du fichier `/scripts/setup-database.sql`
6. Exécutez-la

**Cela va créer:**
- Table `orders` (vos commandes)
- Table `download_tokens` (jetons de téléchargement)
- Table `payment_logs` (historique de paiements)
- Tous les indexes et sécurités nécessaires

### ✅ **ÉTAPE 4: Testez votre configuration locale**

1. Exécutez:
```bash
npm run dev
```

2. Accédez à:
```
http://localhost:3000/
```

3. Testez le formulaire de checkout avec:
   - Prénom: Jean
   - Nom: Test
   - Email: jean@example.com
   - Téléphone: +237672991834
   - Méthode: Orange Money

4. Vous devriez être redirigé vers la page de paiement

5. Visitez le dashboard admin:
```
http://localhost:3000/admin
```

6. Connectez-vous avec votre mot de passe admin

7. Vous devriez voir la commande de test dans la liste

### ✅ **ÉTAPE 5: Déploiement sur Vercel**

1. Préparez votre code pour le déploiement
2. Connectez votre repository GitHub à Vercel
3. Allez dans "Settings" → "Environment Variables"
4. Ajoutez vos variables:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe
EMAIL_FROM=votre.email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

5. Déploiement automatique à chaque push

### ✅ **ÉTAPE 6: Configurez votre domaine**

Pour que le site soit accessible sur `alibaba-trainning.da-academy.digital`:

#### Si vous utilisez Vercel:

1. Allez dans votre projet Vercel
2. Onglet "Domains"
3. Cliquez "Add Domain"
4. Entrez: `alibaba-trainning.da-academy.digital`
5. Vercel vous donnera les enregistrements DNS à ajouter
6. Allez dans votre registraire de domaine (GoDaddy, Namecheap, OVH, etc)
7. Éditez les enregistrements DNS
8. Ajoutez les enregistrements Vercel (CNAME ou A records)
9. Attendez 24-48h pour la propagation DNS

## Quotidiennement: Comment utiliser votre plateforme

### 🔐 Accéder à votre dashboard admin

1. Allez sur:
```
https://alibaba-trainning.da-academy.digital/admin
```

2. Entrez votre mot de passe admin

3. Vous verrez:
   - ✅ Statistiques (total commandes, revenue, etc)
   - ✅ Liste de toutes les commandes
   - ✅ Bouton pour valider/accorder l'accès

### 💰 Quand un client achète

1. **Vous recevez une notification** (dans votre dashboard)
2. Client remplit le formulaire et clique "Payer"
3. Client reçoit un code USSD ou QR code
4. Client exécute le code depuis son téléphone
5. **Vous voyez la commande en statut "PENDING"**

### ✅ Valider le paiement

1. Vérifiez que vous avez reçu l'argent:
   - Consultez votre compte Orange Money ou MTN
   - Ou vérifiez l'SMS du client
2. Cliquez le bouton **"Accorder l'accès"** dans le dashboard
3. **Automatiquement:**
   - Statut change à "COMPLETED"
   - Email envoyé au client avec lien de téléchargement
   - Lien valide 48 heures
   - Lien à usage unique (après téléchargement = invalidé)

### 📧 Emails automatiques

Vous RECEVEZ PAS d'emails. Les emails sont envoyés AU CLIENT:

**Email 1: Confirmation de commande**
```
À: jean@example.com
Sujet: Commande confirmée - Formation Chine → Afrique

Contenu:
- Numéro de commande
- Montant payé
- Méthode de paiement
- Statut: "En attente de vérification"
```

**Email 2: Formation approuvée** (après que vous cliquiez "Accorder l'accès")
```
À: jean@example.com
Sujet: Votre formation Chine → Afrique est prête à télécharger!

Contenu:
- Bouton "Télécharger ma formation"
- Lien valide 48 heures
- Instructions
```

## Informations importantes à retenir

### 🔐 Sécurité

- ✅ Les PDF ne sont téléchargées QUE si:
  1. Le lien est valide (pas expiré)
  2. Le token est correct (unique par commande)
  3. C'est le premier usage du token

- ✅ Après téléchargement:
  1. Le token est marqué comme utilisé
  2. Aucun autre téléchargement possible
  3. Client peut re-demander s'il a besoin (nouveau lien)

### 💾 Données stockées

**Base de données Supabase** (sécurisée):
- Noms et emails des clients
- Historique de tous les paiements
- Historique de tous les téléchargements
- Tokens (un par commande)

### 📞 Support client

Si un client dit "Je n'ai pas reçu mon email":
1. Vérifiez qu'il a bien saisi son email lors de l'achat
2. Demandez-lui de vérifier son dossier "Spam"
3. Vous pouvez réenvoyer manuellement le lien depuis l'admin

## Résumé des fichiers importants

```
📁 Votre projet
├─ .env.local (créez ce fichier avec vos configurations)
├─ /scripts/setup-database.sql (pour créer les tables)
├─ /app/checkout/page.tsx (formulaire d'achat)
├─ /app/payment/page.tsx (page de paiement)
├─ /app/admin/page.tsx (votre dashboard)
├─ /lib/ussd.ts (codes USSD)
├─ /lib/email.tsx (envoi d'emails)
└─ /public/logo.png (votre logo)
```

## Checklist finale

- [ ] Mot de passe admin configuré dans `.env.local`
- [ ] Email configuré (Gmail ou SMTP)
- [ ] Base de données Supabase créée
- [ ] Testé en local (`npm run dev`)
- [ ] Variables d'environnement ajoutées à Vercel
- [ ] Domaine configuré (DNS)
- [ ] Première commande de test réussie
- [ ] Premier paiement validé
- [ ] Premier PDF téléchargé avec succès

## Besoin d'aide?

Si quelque chose ne fonctionne pas:

1. **Vérifiez les logs:**
   - Ouvrez votre navigateur (F12 → Console)
   - Vérifiez s'il y a des erreurs en rouge

2. **Contactez le support:**
   - WhatsApp: +237 672 991 834
   - Email: joseph@da-academy.digital

3. **Fichiers d'aide disponibles:**
   - `README.md` - Vue d'ensemble du projet
   - `USSD_PAYMENT_GUIDE.md` - Guide complet des paiements
   - `IMPLEMENTATION_GUIDE.md` - Guide d'implémentation technique
   - `DEPLOYMENT_GUIDE.md` - Guide de déploiement

Bon courage! Votre plateforme de formation en ligne est prête! 🚀
