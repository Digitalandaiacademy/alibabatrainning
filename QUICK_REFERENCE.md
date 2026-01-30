# Carte de référence rapide - Plateforme de vente formation

## 🌐 URLs principales

| Page | URL | Accès |
|------|-----|-------|
| **Accueil** | `https://alibaba-trainning.da-academy.digital/` | Public |
| **Achat Formation** | `/checkout` | Public |
| **Paiement USSD** | `/payment?orderId=...` | Auto (après achat) |
| **Admin Dashboard** | `/admin` | Mot de passe requis |
| **Statut Commande** | `/payment-success` | Auto (après paiement) |

## 💳 Méthodes de paiement

### Orange Money
```
Code: #150*46*0525056*5000#
Montant: 5000 FCFA
Exécution: Téléphone (clavier)
```

### MTN Mobile Money
```
Code: *126*1*1*237672991834*5000#
Montant: 5000 FCFA
Exécution: Téléphone (clavier)
```

## 📋 Informations client à collecter

```
✓ Prénom (ex: Jean)
✓ Nom (ex: Dupont)
✓ Email (ex: jean@example.com)
✓ Téléphone (ex: +237672991834)
✓ Méthode paiement (orange/mtn)
```

## 🔐 Accès Admin

```
URL: https://alibaba-trainning.da-academy.digital/admin
Identifiant: (aucun - directement mot de passe)
Mot de passe: [Votre mot de passe fort]
```

## ⚙️ Variables d'environnement essentielles

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe

# Email
EMAIL_FROM=votre.email@gmail.com
EMAIL_PASSWORD=app_password_16_caracteres
```

## 📊 Flux de commande

```
1. Client acheteur → Remplit formulaire
   ↓
2. Commande créée → Status: PENDING
   ↓
3. Email confirmation → Envoyé au client
   ↓
4. Page paiement → Code USSD + QR code
   ↓
5. Client paie → Via Orange Money/MTN
   ↓
6. Admin valide → Dashboard /admin
   ↓
7. Accès accordé → Email + lien téléchargement
   ↓
8. PDF téléchargé → Lien valide 48h, usage unique
```

## 📧 Emails envoyés

### Email 1: Confirmation commande
```
À: client@example.com
Sujet: Commande confirmée - Formation Chine → Afrique
Contient: #commande, montant, statut "en attente"
```

### Email 2: Lien téléchargement
```
À: client@example.com
Sujet: Votre formation est prête à télécharger!
Contient: Bouton téléchargement + lien sécurisé
Validité: 48 heures
```

## 📱 Détection appareil

| Appareil | Action | Résultat |
|----------|--------|----------|
| **Desktop** | Copier code | Client copie → Va téléphone |
| **Mobile** | Lancer paiement | App s'ouvre directement |
| **Tablette** | Variable | Dépend du navigateur |

## 🔑 Codes de statut commande

```
PENDING  → En attente de paiement/validation
COMPLETED → Paiement validé, accès accordé
FAILED   → Paiement non reçu
REFUNDED → Remboursement traité
```

## 💾 Tables base de données

### orders
```sql
id, first_name, last_name, email, phone,
amount, currency, payment_method, status,
payment_reference, created_at, updated_at
```

### download_tokens
```sql
id, order_id, token (unique, 64 char),
expires_at (now + 48h), used_at
```

### payment_logs
```sql
id, order_id, action, status, response_data,
created_at
```

## 🛡️ Sécurité téléchargement

```
1. Token généré (64 caractères aléatoires)
2. Valide pendant 48 heures
3. Usage unique (après téléchargement = invalidé)
4. Vérification avant chaque accès
5. Lien n'expose pas le PDF directement
```

## 📞 Infos support client

```
Nom: Joseph Chanel OBAH
Fonction: PDG, Digital & AI Academy
Localisation: Douala, Bonaberi, Cameroon
WhatsApp: +237 672 991 834
Email: joseph@da-academy.digital
```

## 📈 Statistiques admin

```
Dashboard affiche:
- Total commandes
- Total revenue (FCFA)
- Commandes complétées
- Commandes en attente
- Dernier paiement
- Taux de complétion
```

## 🔧 Commandes utiles

```bash
# Installation
npm install

# Développement local
npm run dev

# Build production
npm run build

# Démarrage production
npm start
```

## 📍 Structure fichiers importantes

```
/lib/
  ├─ ussd.ts ..................... Codes USSD
  ├─ qrcode.ts ................... QR codes
  └─ email.tsx ................... Emails

/components/
  ├─ checkout-form.tsx ........... Formulaire achat
  ├─ ussd-payment-instructions.tsx Page paiement
  └─ admin-dashboard.tsx ......... Tableau de bord

/app/
  ├─ payment/ .................... Instructions paiement
  ├─ admin/ ...................... Dashboard admin
  ├─ api/payment/ ................ Endpoints paiement
  ├─ api/admin/ .................. Endpoints admin
  └─ api/download/ ............... Téléchargement

/scripts/
  └─ setup-database.sql .......... Création tables
```

## ✅ Avant lancement

- [ ] Mot de passe admin défini
- [ ] Email configuré et testé
- [ ] Base de données créée
- [ ] Test local réussi
- [ ] Déployé sur Vercel
- [ ] Domaine configuré
- [ ] Première vente testée

## 🔗 Liens rapides

- Supabase: https://app.supabase.com
- Vercel: https://vercel.com
- GitHub: https://github.com
- Gmail App Passwords: https://myaccount.google.com/apppasswords

## 💡 Tips & Tricks

1. **QR code n'affiche pas?**
   - Vérifier connexion internet
   - Rafraîchir la page
   - Utiliser code manuellement en fallback

2. **Email non reçu?**
   - Vérifier dossier spam
   - Vérifier variables EMAIL_*
   - Consulter logs du serveur

3. **Paiement non reconnu?**
   - Vérifier montant exact (5000 FCFA)
   - Vérifier numéro téléphone (format 237...)
   - Vérifier compte merchant

4. **Admin ne charge pas?**
   - Vérifier mot de passe (sensible à la casse)
   - Vérifier console (F12) pour erreurs
   - Vérifier variables d'environnement

---

**Version: 1.0**  
**Dernière mise à jour: 2026-01-30**  
**Statut: Production Ready ✅**
