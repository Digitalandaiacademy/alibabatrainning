# Guide d'intégration des paiements USSD - Orange Money & MTN MoMo

## Vue d'ensemble

Ce système permet aux clients de payer votre formation "Chine → Afrique" directement via:
- **Orange Money** (code USSD)
- **MTN Mobile Money** (code USSD)
- **Carte bancaire** (via Stripe - futur)

## Comment cela fonctionne

### 1. **Sur Ordinateur (Desktop)**
```
Client → Click "Orange Money/MTN" → Voir code USSD + QR code
→ Scanner QR code avec téléphone → Code s'exécute → Valider avec code secret
```

### 2. **Sur Téléphone (Mobile)**
```
Client → Click "Orange Money/MTN" → Bouton "Lancer le paiement"
→ Application s'ouvre automatiquement → Valider avec code secret
```

## Codes USSD

### Orange Money
```
#150*46*MERCHANT_CODE*AMOUNT#
```
**Exemple:** `#150*46*0525056*5000#`

### MTN Mobile Money
```
*126*1*1*MERCHANT_ID*AMOUNT#
```
**Exemple:** `*126*1*1*237672991834*5000#`

## Flux de paiement complet

### 1. **Formulaire de Checkout**
Le client remplit:
- Prénom ✓
- Nom ✓
- Email ✓
- Numéro de téléphone ✓
- Choix de la méthode de paiement ✓

### 2. **Création de la commande**
```
POST /api/payment/initiate
{
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean@example.com",
  phone: "+237672991834",
  amount: 5000,
  currency: "XAF",
  method: "orange" | "mtn" | "stripe"
}
```

La commande est créée avec le statut **"pending"** en attente de paiement.

### 3. **Instructions de paiement**
L'utilisateur est redirigé vers `/payment?orderId=...&method=...`

Il reçoit:
- Code USSD à copier (Desktop) ou à lancer (Mobile)
- QR code à scanner
- Instructions détaillées
- Numéro de commande à référencer

### 4. **Vérification de paiement (Admin)**
Vous allez sur `/admin` et:
1. Connectez-vous avec votre mot de passe
2. Vous voyez la liste des commandes en attente
3. Vous vérifiez le paiement via Orange Money ou MTN
4. Vous cliquez "Accorder l'accès"

### 5. **Confirmation client**
Dès que vous validez:
- Email automatique avec lien de téléchargement sécurisé
- Lien valide pendant 48 heures
- Token unique à usage unique

## Architecture technique

### Fichiers clés

```
/lib/
  ├─ ussd.ts              # Génération codes USSD
  ├─ qrcode.ts            # Génération QR codes
  └─ email.tsx            # Envoi emails

/components/
  ├─ checkout-form.tsx    # Formulaire d'achat
  └─ ussd-payment-instructions.tsx  # Instructions paiement

/app/
  ├─ payment/
  │  └─ page.tsx          # Page d'instructions paiement
  ├─ admin/
  │  └─ page.tsx          # Dashboard admin
  └─ api/
     ├─ payment/
     │  └─ initiate/route.ts
     ├─ orders/[id]/route.ts
     ├─ admin/
     │  └─ grant-access/route.ts
     └─ download/pdf/file/route.ts
```

### Base de données

```sql
-- Table commandes
orders {
  id UUID
  first_name TEXT
  last_name TEXT
  email TEXT
  phone TEXT
  amount DECIMAL
  currency TEXT
  payment_method TEXT
  status TEXT: 'pending' | 'completed' | 'failed'
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

-- Table jetons de téléchargement
download_tokens {
  id UUID
  order_id UUID (FK)
  token TEXT (unique)
  expires_at TIMESTAMP
  used_at TIMESTAMP
}
```

## Configuration requise

### Variables d'environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Email (Gmail, SMTP, etc)
EMAIL_FROM=joseph@da-academy.digital
EMAIL_PASSWORD=votre_mot_de_passe_ou_app_password

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe_admin
```

## Processus client étape par étape

### 1️⃣ Accès à la page de paiement

```
https://alibaba-trainning.da-academy.digital/checkout
```

### 2️⃣ Remplissage du formulaire

```
Prénom:      Jean
Nom:         Dupont
Email:       jean@example.com
Téléphone:   +237672991834
Méthode:     Orange Money (ou MTN)
```

### 3️⃣ Paiement

**Si sur téléphone:**
- Appuyer sur "Lancer le paiement"
- L'app Orange Money/MTN s'ouvre
- Entrer le code secret
- Validation instantanée

**Si sur ordinateur:**
- Copier le code USSD fourni
- Aller sur son téléphone
- Valider le code
- Recevoir confirmation par SMS

### 4️⃣ Attente de vérification

Email reçu:
```
Merci Jean!

Votre commande #12345678 a été créée.
Montant: 5000 FCFA
Méthode: Orange Money
Status: En attente de vérification

Vous recevrez un email de confirmation dans 2-4 heures.
```

### 5️⃣ Accès à la formation

Une fois que vous (l'admin) validez le paiement:

Email reçu:
```
Votre formation est prête!

Télécharger la formation: [LIEN SÉCURISÉ]

Lien valide pendant 48 heures.
```

## Procédure admin

### Connexion
```
https://alibaba-trainning.da-academy.digital/admin
Mot de passe: [votre mot de passe]
```

### Dashboard
Vous voyez:
- Nombre total de commandes
- Nombre complétées
- Nombre en attente
- Revenus totaux
- Liste détaillée des commandes

### Vérification et validation
```
1. Voir la commande "Jean Dupont - jean@example.com - 5000 FCFA"
2. Vérifier manuellement le paiement via:
   - Orange Money: Consulter votre compte merchant
   - MTN MoMo: Consulter votre compte merchant
   - SMS de confirmation du client
3. Cliquer "Accorder l'accès"
4. Email automatique envoyé au client avec le lien de téléchargement
```

## Génération des codes USSD

### Fonction TypeScript

```typescript
import { getUSSDCode } from '@/lib/ussd'

const ussdCode = getUSSDCode('orange', {
  amount: 5000,
  phone: '+237672991834',
  orderId: 'order-123',
})
// Result: "#150*46*0525056*5000#"
```

### Formatage du numéro de téléphone

Le système accepte:
- `6XXXXXXXX` → `237XXXXXXXX`
- `+2376XXXXXXXX` → `2376XXXXXXXX`
- `2376XXXXXXXX` → `2376XXXXXXXX`

## Génération des QR codes

### QR Server API (gratuit, pas de dépendances)

```typescript
import { generateQRCodeURL } from '@/lib/qrcode'

const qrUrl = generateQRCodeURL('#150*46*0525056*5000#', 300)
// Result: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=..."
```

Le QR code peut être affiché directement dans une balise `<img>`:
```jsx
<img src={qrUrl} alt="QR Code" />
```

## Téléchargement sécurisé du PDF

### Tokens de téléchargement

```typescript
interface DownloadToken {
  id: UUID
  order_id: UUID
  token: string (random 64 char)
  expires_at: timestamp (now + 48h)
  used_at: timestamp | null
}
```

### Lien de téléchargement sécurisé

```
https://alibaba-trainning.da-academy.digital/api/download/pdf/file?token=abc123def456...
```

### Sécurité

- ✅ Token aléatoire de 64 caractères
- ✅ Unique par commande
- ✅ Expiration après 48 heures
- ✅ Invalidé après premier usage
- ✅ Vérifié avant chaque téléchargement

## Troubleshooting

### Le QR code ne s'affiche pas
- Vérifier la connexion internet
- Vérifier que QR Server API est accessible
- Fallback: utiliser le code copié manuellement

### Le code USSD ne fonctionne pas
- Vérifier le format du numéro de téléphone
- Vérifier le code merchant Orange Money
- Tester directement sur un téléphone

### Email de confirmation non reçu
- Vérifier les variables EMAIL_FROM et EMAIL_PASSWORD
- Vérifier que le transporter est correctement configuré
- Consulter les logs du serveur

### Admin ne peut pas valider le paiement
- Vérifier le mot de passe admin
- Vérifier les permissions Supabase
- Consulter les logs du navigateur (F12)

## Prochaines étapes

1. ✅ USSD Orange Money & MTN implémenté
2. ⏳ Intégration Stripe pour cartes bancaires
3. ⏳ Webhook de confirmation automatique (si API dispo)
4. ⏳ Emails récurrentes de rappel après 24h si non validé
5. ⏳ Dashboard client pour voir l'historique d'achat

## Support

Pour des questions ou problèmes:
- **WhatsApp:** +237 672 991 834
- **Email:** joseph@da-academy.digital
- **Lieu:** Douala, Bonaberi, Cameroon
