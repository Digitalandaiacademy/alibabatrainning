# Customer Journey - Vue d'ensemble de l'expérience client

Ce document décrit le parcours complet d'un client, du premier clic jusqu'à l'accès à la formation.

## 1. Phase de découverte (Landing Page)

### URL: `https://alibaba-trainning.da-academy.digital/`

```
┌─────────────────────────────────────────────────┐
│  HEADER avec logo Digital & AI Academy          │
├─────────────────────────────────────────────────┤
│                                                 │
│  SECTION HÉRO                                   │
│  ========================                       │
│  Titre: "Chine → Afrique"                      │
│  Sous-titre: "Importation, Dropshipping et     │
│  Profits Pas à Pas"                            │
│                                                 │
│  Boutons:                                       │
│  [Voir l'aperçu]  [Me contacter]              │
│                                                 │
│  Stats: 100+ pages | 5000 FCFA | ♾️ Accès     │
│                                                 │
├─────────────────────────────────────────────────┤
│  SECTION CARACTÉRISTIQUES                       │
│  ========================                       │
│  ✓ Guides complets sur l'importation            │
│  ✓ Stratégies de dropshipping proven           │
│  ✓ Méthodes de négociation                     │
│  ✓ Gestion logistique et douanes               │
│  ✓ Calcul des marges et pricing                │
│  ✓ Études de marché pour l'Afrique             │
│  ✓ Construction de votre brand                 │
│  ✓ Mise en place de votre boutique              │
│                                                 │
├─────────────────────────────────────────────────┤
│  SECTION APERÇU DU COURS                       │
│  ========================                       │
│  [PDF Preview]              | Formation        │
│                              | Complète         │
│  📄 Document PDF (30Mo+)     |────────────     │
│  ✓ 100+ pages               | Prix: 5000 FCFA │
│  ✓ Guides pratiques         |────────────     │
│  ✓ Listes de fournisseurs   | ✓ Accès à vie   │
│  ✓ Calculatrices            | ✓ Mises à jour  │
│                              | ✓ Support email │
│  [Voir aperçu] ←            |                  │
│  [Acheter maintenant] ──────→ [REDIRECTION]   │
│                                                 │
├─────────────────────────────────────────────────┤
│  SECTION CONTACT                                │
│  ========================                       │
│  Joseph Chanel OBAH, PDG & Fondateur           │
│                                                 │
│  📱 WhatsApp: +237 672 991 834                 │
│  📍 Localisation: Douala, Bonaberi             │
│  📧 Email: joseph@da-academy.digital           │
│                                                 │
├─────────────────────────────────────────────────┤
│  FOOTER                                         │
│  © 2025 Digital & AI Academy. Fait avec        │
│  ❤️ au Cameroon                                 │
└─────────────────────────────────────────────────┘
```

### Actions possibles:
- Scroller pour voir plus d'informations
- Cliquer "Voir l'aperçu" pour consulter le sommaire du PDF
- Cliquer "Acheter maintenant" → Redirection vers checkout
- Cliquer "Me contacter" → Scroll vers section contact
- Cliquer sur les coordonnées → WhatsApp/Email

---

## 2. Phase d'achat (Page Checkout)

### URL: `https://alibaba-trainning.da-academy.digital/checkout`

```
┌─────────────────────────────────────┬──────────────────────────────┐
│  HEADER                             │  HEADER                      │
├─────────────────────────────────────┼──────────────────────────────┤
│                                     │                              │
│  Finaliser votre achat              │  RÉSUMÉ DE COMMANDE         │
│                                     │  ════════════════════       │
│  Formation:                         │  Formation PDF              │
│  "Chine → Afrique"                  │  Chine → Afrique            │
│                                     │                              │
│                                     │  Sous-total:  5000 FCFA     │
│  ┌─────────────────────────┐        │  Frais:        0 FCFA       │
│  │ Infos de contact        │        │  ─────────────────────      │
│  ├─────────────────────────┤        │  TOTAL:      5000 FCFA     │
│  │ Email: ___________      │        │                              │
│  │ Tél: ______________     │        │                              │
│  └─────────────────────────┘        │                              │
│                                     ├──────────────────────────────┤
│  ┌─────────────────────────┐        │ Méthode de paiement:       │
│  │ Paiement                │        │                              │
│  ├─────────────────────────┤        │ ┌──────────────────────────┐│
│  │ [Orange Money]          │        │ │ Orange Money             ││
│  │  Portefeuille mobile    │◄───────├─│ Paiement portefeuille    ││
│  │                         │        │ └──────────────────────────┘│
│  │ ┌──────────────────────┐│        │                              │
│  │ │ MTN Mobile Money     ││        │ ┌──────────────────────────┐│
│  │ │ Paiement portefeuille││◄───────├─│ MTN Mobile Money         ││
│  │ └──────────────────────┘│        │ │ Paiement portefeuille    ││
│  │                         │        │ └──────────────────────────┘│
│  │ ┌──────────────────────┐│        │                              │
│  │ │ Carte bancaire      ││        │ ┌──────────────────────────┐│
│  │ │ Visa, Mastercard    ││◄───────├─│ Carte bancaire           ││
│  │ │ via Stripe          ││        │ │ Visa, Mastercard         ││
│  │ └──────────────────────┘│        │ └──────────────────────────┘│
│  │                         │        │                              │
│  │ Note: Vous serez       │        │                              │
│  │ redirigé vers la       │        │                              │
│  │ plateforme de paiement │        │                              │
│  │                         │        │                              │
│  └─────────────────────────┘        │                              │
│                                     │                              │
│                                     │                              │
└─────────────────────────────────────┴──────────────────────────────┘
```

### Actions possibles:
1. Remplir email et téléphone
2. Choisir une méthode de paiement
3. Cliquer pour payer

### Cas 1: Orange Money ou MTN
→ Redirection vers Flutterwave/Paytech
→ Client entre le numéro de téléphone
→ Reçoit une demande de paiement sur son téléphone
→ Confirme le paiement
→ Redirection vers page de succès

### Cas 2: Carte bancaire (Stripe)
→ Redirection vers Stripe Hosted Checkout
→ Client entre les détails de sa carte
→ Effectue le paiement
→ Redirection vers page de succès

---

## 3. Confirmation de paiement

### URL: `https://alibaba-trainning.da-academy.digital/payment-success?orderId=...`

```
┌──────────────────────────────────────────────────┐
│                  HEADER                          │
├──────────────────────────────────────────────────┤
│                                                  │
│                 ✅ Paiement reçu!               │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ N° de commande: 550e8400-e29b-41d4...  │    │
│  │ Statut: En attente de vérification      │    │
│  │                                         │    │
│  │ Nous vérifierons votre paiement...     │    │
│  │ 📧 Vous recevrez un email dès qu'il   │    │
│  │ sera confirmé (généralement 2-4h)     │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  PROCHAINES ÉTAPES:                             │
│  1️⃣  Vérification du paiement                  │
│  2️⃣  Confirmation par email                    │
│  3️⃣  Téléchargement de la formation            │
│                                                  │
│  BESOIN D'AIDE?                                 │
│  📱 WhatsApp: +237 672 991 834                 │
│                                                  │
│  [Retour à l'accueil]                          │
│                                                  │
├──────────────────────────────────────────────────┤
│                  FOOTER                         │
└──────────────────────────────────────────────────┘
```

### À ce stade:
- ✅ Commande créée en base de données
- ✅ Email de confirmation envoyé
- ⏳ En attente de vérification par l'admin
- 📧 Client attend l'email avec le lien de téléchargement

---

## 4. Étape Admin - Vérification et Validation

### URL: `https://alibaba-trainning.da-academy.digital/admin`

```
LOGIN PAGE:
┌─────────────────────────┐
│ Connexion Admin         │
├─────────────────────────┤
│ Mot de passe: ****      │
│ [Connexion]             │
└─────────────────────────┘
                          ↓
DASHBOARD ADMIN:

┌─────────────────────────────────────────────────────────────┐
│                    TABLEAU DE BORD ADMIN                    │
├─────────────────────────────────────────────────────────────┤
│                                        [Déconnexion]        │
│                                                             │
│  STATISTIQUES:                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Cdes    │ │ Revenus │ │Complétée│ │Attente  │          │
│  │   12    │ │60000 XAF│ │    8    │ │    4    │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  COMMANDES RÉCENTES:                                        │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Email│Tél│Montant│Méthode│Statut│Date│Actions      │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │john@ │672│5000XAF│Orange │⏳    │13/2│[Accorder]   │ │
│  │      │991│       │Money  │      │    │            │ │
│  │      │834│       │       │      │    │            │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │marie@│676│5000XAF│MTN    │⏳    │13/2│[Accorder]   │ │
│  │      │123│       │MoMo   │      │    │            │ │
│  │      │456│       │       │      │    │            │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │paul@ │677│5000XAF│Stripe │✅    │12/2│Accordé      │ │
│  │      │456│       │       │      │    │            │ │
│  │      │789│       │       │      │    │            │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  FLUX DE VALIDATION:                                        │
│  1. Un client passe commande via Orange Money/MTN/Stripe   │
│  2. La commande apparaît ici avec statut "En attente"     │
│  3. Vérifiez le paiement dans votre compte Orange/MTN/etc │
│  4. Cliquez "Accorder" → Email envoyé au client           │
│  5. Client reçoit lien de téléchargement!                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Actions de l'admin:
1. Se connecter avec le mot de passe admin
2. Voir la liste des commandes
3. Vérifier le paiement dans son compte (Orange Money/MTN/etc)
4. Cliquer "Accorder" pour confirmer l'accès

---

## 5. Email de confirmation reçu par le client

```
SUBJECT: Votre formation Chine → Afrique est prête à télécharger!

┌──────────────────────────────────────────────────┐
│  DIGITAL & AI ACADEMY                            │
│                                                  │
│  Bienvenue à Digital & AI Academy!              │
│                                                  │
│  Merci pour votre achat!                        │
│  Votre formation est maintenant disponible.     │
│                                                  │
│  ⏰ IMPORTANT: Ce lien est valide pendant      │
│     48 heures. Téléchargez avant l'expiration. │
│                                                  │
│  [TÉLÉCHARGER MA FORMATION]                    │
│   ↑                                             │
│   Lien sécurisé avec token d'accès            │
│                                                  │
│  Contenu de la formation:                       │
│  • 100+ pages de contenu détaillé              │
│  • Guides pratiques sur l'importation           │
│  • Stratégies de dropshipping                  │
│  • Gestion logistique et douanes               │
│  • Calcul des marges et pricing                │
│  • Études de marché pour l'Afrique             │
│  • Cas pratiques et études de cas              │
│                                                  │
│  Questions ou problèmes?                        │
│  📱 WhatsApp Business: +237 672 991 834       │
│  📧 Email: joseph@da-academy.digital          │
│                                                  │
│  © 2025 Digital & AI Academy - Douala          │
└──────────────────────────────────────────────────┘
```

---

## 6. Téléchargement sécurisé

### URL: `https://alibaba-trainning.da-academy.digital/api/download/pdf?token=xxx&orderId=yyy`

```
CLIENT CLIQUE SUR LE LIEN
          ↓
SYSTÈME VÉRIFIE:
 ✓ Token valide?
 ✓ Token expiré? (48h max)
 ✓ Commande existe?
 ✓ Accès accordé?
          ↓
SI OK:
 ✓ Log la action dans la base
 ✓ Lance le téléchargement du PDF
 ✓ Client reçoit: Chine→Afrique-Importation-Dropshipping.pdf

SI NON OK:
 ✗ Message d'erreur: "Lien expiré ou invalide"
 ✗ Instruction: "Contactez support"
```

### Limite de sécurité:
- Token valide: 48 heures après validation
- Après 48h: Token automatiquement expiré
- Client doit demander un nouveau lien (contact support)

---

## 7. Accès à la formation

À ce stade, le client a:
- ✅ La formation PDF téléchargée
- ✅ Accès à vie au contenu
- ✅ Support par email si questions

### Parcours terminé!

```
CUSTOMER JOURNEY COMPLET:

Landing Page → Achat → Paiement → Confirmation → 
Admin Valide → Email Client → Téléchargement → ✅ Formation!

Durée typique: 2-4 heures (du paiement à l'accès)
```

---

## Variantes possibles

### Variante 1: Client cherche l'aperçu d'abord
```
Landing Page → [Voir aperçu] → Sommaire du PDF
                                       ↓
                              [Acheter maintenant]
                                       ↓
                                    Checkout
```

### Variante 2: Client contacte d'abord
```
Landing Page → [Me contacter] → WhatsApp Business
                                    ↓
                       Discussion avec Joseph
                                    ↓
                        Client obtient infos
                                    ↓
                          Puis revient acheter
```

### Variante 3: Admin refuse l'accès (paiement non effectué)
```
Admin Dashboard → Voit commande → Vérifie paiement
                                        ↓
                    Paiement non reçu? N'accorde PAS l'accès
                                        ↓
                    Client ne reçoit jamais d'email
                                        ↓
                    Client peut contacter pour savoir (contact support)
```

---

## Points clés à retenir

1. **Sécurité**: Tous les téléchargements sécurisés par tokens avec expiration
2. **Flux clair**: Chaque étape est bien définie et logique
3. **Communication**: Emails automatiques à chaque étape importante
4. **Admin simple**: Validation manuelle facile en un clic
5. **Protection PDF**: Impossible de télécharger sans lien valide

Bonne chance!
