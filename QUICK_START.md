# Quick Start - Votre plateforme de formation en 5 étapes

Suivez ces étapes simples pour lancer votre plateforme de vente de formation.

## ⚡ Étapes rapides

### Étape 1: Préparer Supabase (10 minutes)

```bash
# 1. Allez sur https://supabase.com et créez un compte
# 2. Créez un nouveau projet "da-academy-formation"
# 3. Une fois créé, allez dans l'éditeur SQL (icône }>_)
# 4. Créez une nouvelle requête et copiez tout le contenu de:
# /scripts/setup-database.sql
# 5. Exécutez (Ctrl+Enter)
# 6. Allez dans Settings → API et copiez vos clés:
```

**Clés à récupérer:**
```
NEXT_PUBLIC_SUPABASE_URL = Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY = anon key
SUPABASE_SERVICE_ROLE_KEY = service_role key
```

### Étape 2: Configurez votre projet local (5 minutes)

```bash
# 1. Téléchargez et extraire le code du projet
cd formation-platform

# 2. Installez les dépendances
npm install

# 3. Créez un fichier .env.local et ajoutez vos clés:
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=votre_url_ici
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_ici
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role_ici
NEXT_PUBLIC_ADMIN_PASSWORD=motdepasse123
NEXT_PUBLIC_APP_URL=https://alibaba-trainning.da-academy.digital
EOF

# 4. Lancez le serveur local
npm run dev

# Ouvrez http://localhost:3000 dans votre navigateur
```

### Étape 3: Testez votre plateforme (10 minutes)

1. **Landing page**: Visitez http://localhost:3000
   - Vérifiez que tout s'affiche correctement
   - Vérifiez votre logo

2. **Achetez la formation**: Cliquez "Acheter maintenant"
   - Remplissez email et téléphone
   - Choisissez une méthode de paiement
   - Validez l'achat

3. **Dashboard admin**: Allez sur http://localhost:3000/admin
   - Entrez le mot de passe: `motdepasse123`
   - Vous verrez votre commande de test
   - Cliquez "Accorder l'accès"
   - Vérifiez que le lien de téléchargement fonctionne

### Étape 4: Déployer sur Vercel (10 minutes)

```bash
# 1. Créez un compte GitHub et pushez votre code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/formation-platform
git push -u origin main

# 2. Allez sur https://vercel.com
# 3. Cliquez "New Project" et importez votre repository GitHub
# 4. Vercel détectera qu'c'est un Next.js project
# 5. Dans Settings → Environment Variables, ajoutez:
```

**Variables à ajouter dans Vercel:**
```
NEXT_PUBLIC_SUPABASE_URL=votre_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role
NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe_fort
NEXT_PUBLIC_APP_URL=https://alibaba-trainning.da-academy.digital
```

```bash
# 6. Cliquez "Deploy"
# 7. Attendez le déploiement (2-3 minutes)
# 8. Une fois déployé, vous aurez une URL Vercel (ex: formation.vercel.app)
```

### Étape 5: Configurer votre domaine (15 minutes)

#### Option A: Via Vercel (Recommandé)

```bash
# 1. Chez Vercel, allez dans Settings → Domains
# 2. Entrez: alibaba-trainning.da-academy.digital
# 3. Cliquez "Add Domain"
# 4. Vercel vous donnera les instructions DNS
# 5. Chez votre registraire (GoDaddy, Namecheap, OVH, etc.):
#    - Allez dans les paramètres DNS
#    - Ajoutez les enregistrements fournis par Vercel
# 6. Attendez 24-48 heures pour la propagation
# 7. Votre domaine devrait fonctionner!
```

#### Option B: Via votre registraire (Si Vercel ne peut pas aider)

```bash
# 1. Chez votre registraire, allez dans les paramètres DNS
# 2. Ajoutez un enregistrement CNAME:
#    Nom: alibaba-trainning
#    Type: CNAME
#    Valeur: cname.vercel.com
# 3. Attendez 24-48 heures
# 4. Vérifiez: https://albibaba-trainning.da-academy.digital
```

## ✅ Checklist de vérification

Avant de lancer, vérifiez:

- [ ] Supabase est configuré et la base de données existe
- [ ] Code déployé sur Vercel
- [ ] Toutes les variables d'environnement sont ajoutées
- [ ] Le domaine pointe vers Vercel
- [ ] La landing page s'affiche correctement
- [ ] Le formulaire d'achat fonctionne
- [ ] L'admin dashboard accessible (avec mot de passe)
- [ ] Test complet: achat → admin → accorder l'accès

## 🚨 Problèmes courants et solutions

### Le site ne se charge pas
```
→ Vérifiez que vous avez ajouté toutes les variables d'environnement
→ Vérifiez que Supabase n'a pas d'erreurs (onglet Logs dans Vercel)
```

### Le domaine ne fonctionne pas
```
→ Attendez 24-48 heures pour la propagation DNS
→ Videz le cache du navigateur (Ctrl+Shift+Delete)
→ Vérifiez les enregistrements DNS chez votre registraire
```

### Les emails ne s'envoient pas
```
→ C'est normal! Les emails ne sont pas configurés par défaut
→ Voir IMPLEMENTATION_GUIDE.md pour configurer les emails
```

### Admin dashboard ne fonctionne pas
```
→ Vérifiez que vous utilisez le bon mot de passe
→ Vérifiez que NEXT_PUBLIC_ADMIN_PASSWORD est défini
```

## 📞 Pour obtenir de l'aide

Si vous avez des problèmes:

1. **Consultez d'abord**: `/IMPLEMENTATION_GUIDE.md` et `/DEPLOYMENT_GUIDE.md`
2. **Vérifiez les logs**: Vercel → Deployments → Function Logs
3. **Contactez Joseph**: +237 672 991 834 sur WhatsApp Business

## 🎉 C'est fait!

Bravo! Votre plateforme est en ligne. Prochaines étapes:

1. Testez un achat réel
2. Intégrez les paiements véritables (Flutterwave, Stripe, etc.)
3. Configurez l'envoi d'emails
4. Uploadez votre PDF de formation
5. Lancez et annoncez votre formation!

Bonne chance! 🚀
