# Guide de Configuration des Variables d'Environnement (.env.local)

## Vue d'ensemble

Le fichier `.env.local` contient toutes les informations sensibles et la configuration locale de votre application. **Ne le commitez jamais sur GitHub!**

---

## 1. Configuration Supabase (OBLIGATOIRE)

### Comment obtenir vos clés Supabase:

1. Allez sur [c](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Cliquez sur **Settings** → **API**
4. Copiez les valeurs:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 2. Configuration Admin Dashboard (OBLIGATOIRE)

### Créez un mot de passe sécurisé

Choisissez un mot de passe fort pour accéder à `/admin`:

```env
ADMIN_PASSWORD=votre_mot_de_passe_tres_secure_12345
```

**Exemple d'accès admin:**
- URL: `http://localhost:3000/admin`
- Mot de passe: La valeur de `ADMIN_PASSWORD`

---

## 3. Configuration Email (TRÈS RECOMMANDÉ)

### Option 1: Gmail SMTP (Gratuit, facile)

#### Étapes:

1. **Activez l'accès moins sécurisé (pour Gmail):**
   - Allez sur [myaccount.google.com/security](https://myaccount.google.com/security)
   - Activez "Accès aux apps moins sécurisées"

2. **Créez un mot de passe d'application:**
   - Allez sur [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Sélectionnez **Mail** et **Windows Computer**
   - Google générera un mot de passe à 16 caractères
   - Copiez-le (sans espaces)

3. **Configurez le `.env.local`:**

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_app_16_chars
EMAIL_FROM=noreply@da-academy.digital
```

#### Exemple complet:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=joseph.obah@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM=noreply@da-academy.digital
```

---

### Option 2: Resend Email Service (Professionnel)

1. Créez un compte gratuit sur [https://resend.com](https://resend.com)
2. Vérifiez votre domaine ou utilisez `onboarding@resend.dev`
3. Générez une clé API
4. Configurez:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
```

---

## 4. Configuration Paiements USSD (IMPORTANT)

### Orange Money

Vous avez déjà le code:
```env
ORANGE_MONEY_MERCHANT_CODE=0525056
```

### MTN Mobile Money

Si vous avez un code MTN, configurez-le:
```env
MTN_MOMO_MERCHANT_CODE=votre_code_mtn
```

Si vous n'en avez pas, laissez vide:
```env
MTN_MOMO_MERCHANT_CODE=
```

---

## 5. Configuration Application

### En Développement (Local)

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### En Production (Vercel)

Une fois déployé sur Vercel, changez à:
```env
NEXT_PUBLIC_APP_URL=https://alibaba-trainning.da-academy.digital
```

---

## Fichier Complet `.env.local` - Template

Copiez ceci et remplissez les valeurs:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_ici
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici

# Admin
ADMIN_PASSWORD=votre_mot_de_passe_admin

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_app_password_gmail
EMAIL_FROM=noreply@da-academy.digital

# Paiements
ORANGE_MONEY_MERCHANT_CODE=0525056
MTN_MOMO_MERCHANT_CODE=

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Étapes de Configuration Complète

### 1. Fichier Local

```bash
# Créez le fichier (déjà fait)
ls -la .env.local
```

### 2. Remplissez les Variables

Ouvrez `.env.local` et complétez:
- Supabase URLs et clés
- Mot de passe admin
- Détails Gmail
- Codes marchands

### 3. Testez

```bash
# Démarrez le serveur local
npm run dev

# Testez l'admin
# http://localhost:3000/admin
```

### 4. Vercel (Production)

Quand vous déployez sur Vercel:
1. Allez à [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. **Settings** → **Environment Variables**
4. Ajoutez les mêmes variables (sauf `NEXT_PUBLIC_APP_URL` = votre domaine)

---

## Checklist de Sécurité

- ✅ `.env.local` est dans `.gitignore` (ne pas committer)
- ✅ Mot de passe admin est fort (minimum 12 caractères)
- ✅ Clés Supabase sont secretes (ne pas partager)
- ✅ Gmail app password est correct (16 caractères)
- ✅ Domaine configuré correctement en production

---

## Dépannage

### "Email not sending"
- Vérifiez que `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASSWORD` sont corrects
- Activez "Accès aux apps moins sécurisées" sur Gmail
- Générateur un nouveau mot de passe d'application Gmail

### "Supabase connection error"
- Vérifiez `NEXT_PUBLIC_SUPABASE_URL` et clés
- Assurez-vous que Supabase est actif
- Vérifiez votre connexion internet

### "Admin dashboard won't login"
- Vérifiez que `ADMIN_PASSWORD` est correctement configuré
- Assurez-vous de taper le mot de passe exact
- Pas d'espaces au début ou fin

---

## Support

Si vous avez des questions:
- **WhatsApp**: +237 672 991 834
- **Email**: joseph@da-academy.digital

Bon courage avec votre configuration! 🚀
