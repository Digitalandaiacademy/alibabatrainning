# Guide d'implémentation - Plateforme de vente de formation Digital & AI Academy

## Vue d'ensemble

Vous avez maintenant une plateforme complète pour vendre votre formation "Chine → Afrique" en ligne. Voici comment faire fonctionner chaque partie.

---

## 1. Configuration du domaine

### Accédez à votre registraire de domaine (GoDaddy, Namecheap, OVH, etc.)

1. **Si vous utilisez Vercel pour l'hébergement** (recommandé):
   - Connectez votre domaine via les paramètres du projet Vercel
   - Vercel configurera automatiquement les enregistrements DNS

2. **Configuration manuelle des DNS**:
   - Créez un enregistrement **CNAME** pour `alibaba-trainning`
   - Pointez-le vers votre serveur de déploiement
   - Exemple avec Vercel: `albibaba-trainning.da-academy.digital` → `cname.vercel.com`

---

## 2. Intégration des paiements

### Option A: Orange Money & MTN MoMo (Recommandé pour l'Afrique)

Nous vous recommandons d'utiliser un agrégateur de paiement qui supporte Orange Money et MTN:

**Solutions recommandées:**
1. **Flutterwave** (Meilleur pour l'Afrique)
   - Supporte Orange Money et MTN MoMo
   - Documentation: https://flutterwave.com/
   - Inscription: https://dashboard.flutterwave.io

2. **Paytech**
   - Spécialisé dans les paiements mobiles Africains
   - Documentation: https://www.paytechsolutions.com/

3. **Stripe** (Avec adaptatation)
   - Via des partenaires locaux

**Étapes d'intégration:**
1. Créez un compte sur Flutterwave
2. Récupérez vos clés API (public_key et secret_key)
3. Ajoutez-les à vos variables d'environnement:
   ```
   FLUTTERWAVE_PUBLIC_KEY=your_public_key
   FLUTTERWAVE_SECRET_KEY=your_secret_key
   ```
4. Modifiez `/app/api/payment/initiate/route.ts` pour appeler l'API Flutterwave

**Exemple d'intégration Flutterwave:**
```typescript
// Dans /app/api/payment/initiate/route.ts
const flutterwave_response = await fetch('https://api.flutterwave.com/v3/payments', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tx_ref: `order_${order.id}`,
    amount: amount,
    currency: 'XAF',
    customer: {
      email: email,
      phonenumber: phone,
    },
    customizations: {
      title: 'Formation Chine → Afrique',
      description: 'Importation et Dropshipping',
    },
    redirect_url: `${baseUrl}/payment-success?orderId=${order.id}`
  })
})
```

---

## 3. Gestion des fichiers PDF

### Important: Stocker votre PDF de manière sécurisée

Vous avez plusieurs options:

**Option A: Vercel Blob Storage** (Recommandé et inclus)
1. Uploadez votre PDF de 30Mo sur Vercel Blob
2. Générez des URLs signées avec expiration
3. L'accès est automatiquement révoqué après l'expiration

**Option B: AWS S3**
1. Bucket S3 privé
2. URLs signées avec courte durée de vie
3. Plus de contrôle sur les permissions

**Configuration Vercel Blob:**

```typescript
// Dans /app/api/download/pdf/file/route.ts
import { list, get } from '@vercel/blob'

export async function GET(request: NextRequest) {
  const orderId = searchParams.get('orderId')
  
  // Vérifier que le client a accès
  const order = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('access_granted', true)
    .single()
  
  if (!order) {
    return NextResponse.json({ error: 'No access' }, { status: 403 })
  }
  
  // Récupérer l'URL du PDF
  const blob = await get('chine-afrique-formation.pdf')
  
  return NextResponse.redirect(blob.url)
}
```

---

## 4. Tableau de bord Admin

### Accès au tableau de bord
- URL: `https://alibaba-trainning.da-academy.digital/admin`
- Mot de passe par défaut: `admin123` (À CHANGER!)

### Fonctionnalités:
1. **Vue des commandes**: Toutes les commandes s'affichent ici
2. **Vérification des paiements**: Vérifiez dans votre compte Orange Money/MTN que le paiement est reçu
3. **Attribution d'accès**: Cliquez "Accorder" pour confirmer l'accès
4. **Email automatique**: L'email de téléchargement est envoyé au client

### Sécurité du mot de passe admin

**CHANGEZ IMMÉDIATEMENT** le mot de passe admin:

1. Allez dans les variables d'environnement de votre projet
2. Modifiez `NEXT_PUBLIC_ADMIN_PASSWORD` avec un mot de passe fort
3. Déployez les changements

**Meilleure pratique pour production:**
Implémentez l'authentification avec Auth.js ou Supabase Auth pour une sécurité maximale.

---

## 5. Emails aux clients

### Configuration des emails

Vous devez configurer l'envoi d'emails pour:
1. Confirmation de commande
2. Lien de téléchargement après paiement validé
3. Rappels d'accès à la formation

**Solutions recommandées:**
- **SendGrid** (Gratuit jusqu'à 100 emails/jour)
- **Resend** (Spécialisé pour Next.js)
- **Mailgun** (Bon marché pour gros volumes)

**Exemple avec Resend:**

```typescript
// Dans /app/api/payment/success/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'formations@da-academy.digital',
  to: order.email,
  subject: 'Votre formation Chine → Afrique est prête!',
  html: `
    <h1>Bienvenue!</h1>
    <p>Votre paiement a été confirmé.</p>
    <p>Téléchargez votre formation: <a href="...">Cliquez ici</a></p>
  `
})
```

---

## 6. Déploiement

### Déployer sur Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Ajoutez vos variables d'environnement:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   FLUTTERWAVE_PUBLIC_KEY=...
   FLUTTERWAVE_SECRET_KEY=...
   RESEND_API_KEY=...
   NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
   ```
3. Cliquez "Deploy"
4. Configurez votre domaine personnalisé

### Alternative: Hébergement personnalisé
- Docker + AWS/DigitalOcean
- Next.js peut être auto-hébergé facilement

---

## 7. Flux complet de vente

### Étapes pour chaque client:

1. **Client visite le site**
   - Voit la landing page avec présentation
   - Peut voir l'aperçu du PDF

2. **Client clique "Acheter maintenant"**
   - Va sur la page checkout
   - Choisit sa méthode de paiement
   - Entre ses informations

3. **Paiement effectué**
   - Commande créée en base de données
   - Client reçoit email de confirmation
   - Admin voit la commande dans le dashboard

4. **Vous validez le paiement**
   - Vérifiez via Orange Money/MTN que l'argent est reçu
   - Cliquez "Accorder l'accès" dans le dashboard

5. **Client reçoit accès**
   - Email avec lien de téléchargement sécurisé
   - PDF disponible pendant 24 heures (configurable)
   - Peut télécharger autant qu'il veut pendant cette période

---

## 8. Fonctionnalités à ajouter (Futur)

### Phase 2:
- [ ] Intégration complète Flutterwave/Paytech
- [ ] Système d'email automatique
- [ ] Statistiques de ventes
- [ ] Système de coupon/code promo
- [ ] Intégration du PDF document

### Phase 3:
- [ ] Cours vidéo en ligne (vous mentionnez les cours vidéos futurs)
- [ ] Forum/communauté d'apprenants
- [ ] Certification après formation
- [ ] Refund/remboursement automatique

---

## 9. Conseils importants

### Sécurité:
1. ✅ Tous les paiements sont vérifiés en backend
2. ✅ Les URLs de téléchargement ont des tokens d'expiration
3. ✅ Les clés API ne sont pas exposées au client
4. ⚠️ Changez le mot de passe admin
5. ⚠️ Utilisez HTTPS (inclus avec Vercel)

### Performance:
1. La landing page est optimisée pour mobile et desktop
2. Les images sont compressées
3. Les tokens Next.js font cache automatique

### Conformité:
1. Ajoutez vos CGU (Conditions Générales d'Utilisation)
2. Ajoutez votre politique de confidentialité
3. Prévoyez un processus de remboursement

---

## 10. Support et ressources

### Pour les questions sur:
- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs
- **Flutterwave**: https://developer.flutterwave.com/docs
- **Next.js**: https://nextjs.org/docs

---

## Contacts importants

- **PDG**: Joseph Chanel OBAH
- **WhatsApp Business**: +237 672 991 834
- **Email**: joseph@da-academy.digital
- **Localisation**: Douala, Bonaberi, Cameroun

---

## Checklist de lancement

- [ ] Configurer le domaine `alibaba-trainning.da-academy.digital`
- [ ] S'inscrire à Flutterwave et récupérer les clés API
- [ ] Ajouter les variables d'environnement
- [ ] Configurer l'envoi d'emails
- [ ] Uploader le PDF sur Vercel Blob
- [ ] Changer le mot de passe admin
- [ ] Déployer sur Vercel
- [ ] Tester un paiement complet
- [ ] Vérifier les emails reçus
- [ ] Ajouter les CGU et politique de confidentialité
- [ ] Annoncer le lancement! 🚀

---

Bonne chance avec votre formation! C'est un excellent projet pour l'entrepreneuriat en Afrique.
