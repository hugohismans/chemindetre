# Guide — Modifier le site Chemin d'Être

Ce document récapitule **tout ce que tu dois savoir** pour gérer le site en autonomie : modifier les textes, les images, les tarifs, les rendez-vous, etc.

---

## 🗂️ Vue d'ensemble

Ton site est composé de **trois services connectés** :

| Service | À quoi ça sert | Compte à créer |
|---|---|---|
| **GitHub** | Héberge le site et te permet de modifier le contenu | ✅ Obligatoire |
| **Calendly** | Gère le calendrier des rendez-vous | ✅ Obligatoire |
| **Formspree** | Reçoit les messages du formulaire de contact | ✅ Obligatoire |

Tu modifies tout le contenu **depuis une seule interface** : `https://hugohismans.github.io/chemindetre/admin`

---

## 1. Compte GitHub (le plus important)

GitHub héberge ton site et c'est là que tu te connectes pour modifier le contenu.

### Création du compte

1. Va sur https://github.com/signup
2. Utilise ton **email habituel**
3. Choisis un nom d'utilisateur (par ex. `michel-vrins`) — il sera visible dans l'historique des modifications
4. Mot de passe solide (note-le bien)
5. Valide ton email

### Recevoir l'accès au site

Hugo doit t'**inviter** comme collaborateur sur le dépôt. Une fois fait :

1. Tu reçois un email de GitHub : *"You have been invited to..."*
2. Clique sur **"View invitation"** puis **"Accept invitation"**
3. C'est tout — tu peux maintenant modifier le site

### Se connecter au CMS

1. Va sur **https://hugohismans.github.io/chemindetre/admin**
2. Clique sur **"Login with GitHub"**
3. La première fois, GitHub te demande d'autoriser l'application — clique **"Authorize"**
4. Te voilà dans l'interface d'édition

---

## 2. Compte Calendly (pour les rendez-vous)

Calendly affiche ton calendrier sur le site. Les visiteurs choisissent un créneau, et toi tu reçois un email.

### Création

1. Va sur https://calendly.com/signup
2. Inscription avec ton email (formule gratuite suffit)
3. Crée un **type d'événement** (ex: "Consultation 60 min", "Massage 1h", etc.)
4. Connecte ton **Google Calendar** ou **Outlook** pour que Calendly voie tes disponibilités
5. Récupère ton URL personnelle, du genre `https://calendly.com/michel-vrins`

### Brancher Calendly au site

Dans le CMS (interface `/admin`) :

1. Va dans **"Prendre rendez-vous"**
2. Champ **"URL Calendly"** : colle ton URL
3. Sauvegarde

C'est cette URL qui s'ouvre quand un visiteur clique sur **"Prendre rendez-vous"**.

---

## 3. Compte Formspree (pour le formulaire de contact)

Formspree transforme le formulaire de contact du site en emails que tu reçois dans ta boîte.

### Création

1. Va sur https://formspree.io/register
2. Inscription avec ton email (formule gratuite : 50 messages/mois)
3. Clique sur **"+ New Form"**
4. Donne un nom (ex: "Contact Chemin d'Être")
5. Indique l'adresse email où tu veux recevoir les messages
6. Formspree te donne un **identifiant** du genre `xyzabc12` (visible dans l'URL `formspree.io/f/xyzabc12`)

### Brancher Formspree au site

Dans le CMS :

1. Va dans **"Contact"**
2. Champ **"Identifiant Formspree"** : colle l'identifiant (juste `xyzabc12`, pas l'URL complète)
3. Sauvegarde

⚠️ La **première fois** qu'un visiteur envoie un message, Formspree t'enverra un mail pour confirmer ton adresse. Clique sur le lien — sinon tu ne recevras rien.

---

## 🛠️ Comment modifier le contenu du site

### Le principe

1. Connecte-toi sur `/admin`
2. Choisis la section à modifier dans la liste de gauche
3. Modifie ce que tu veux
4. Clique sur **"Save"** en haut à droite
5. **Attends 1 à 2 minutes** : le site se met à jour automatiquement
6. Recharge la page du site (Ctrl+R) pour voir le changement

### Sections disponibles

- **Bulle « Prochaine formation »** : la petite bulle en bas de page (tu peux l'activer/désactiver)
- **Page d'accueil — Bandeau principal** : le grand titre en haut
- **À propos** : ta photo, ton bio, tes paragraphes
- **Prestations** : la liste de tes services (massage, AT, aquarelle…) avec leurs détails
- **Aquarelle** : la section dédiée à l'aquarelle
- **Séjour bien-être (Godinne)** : la section sur le séjour
- **Témoignages** : les citations de tes clients
- **Prendre rendez-vous** : le lien Calendly
- **Contact** : email, téléphone, adresses, Formspree
- **Pied de page** : le bas du site

### Quelques règles importantes

✅ **Pour les images** : utilise le bouton **"Choose an image"** dans le CMS. Pas besoin de faire de la technique — tu sélectionnes ton fichier et c'est fait.

✅ **Pour les textes en gras ou italique** : dans certains champs il est écrit *"HTML autorisé"* — ça veut dire que tu peux utiliser :
- `<strong>texte</strong>` pour mettre en **gras**
- `<em>texte</em>` pour mettre en *italique*
- `<br />` pour faire un retour à la ligne

⚠️ **Ne touche pas aux champs marqués "Identifiant interne"** (par ex. `id` dans les prestations) — c'est utilisé techniquement pour faire fonctionner le site.

⚠️ **Si tu as un doute, n'hésite pas** : toutes tes modifications sont sauvegardées dans l'historique GitHub. Hugo peut toujours revenir en arrière si quelque chose casse.

---

## 📝 Cas pratiques fréquents

### Annoncer une nouvelle formation
1. CMS → **Bulle « Prochaine formation »**
2. Coche **"Afficher la bulle"**
3. Modifie le texte (ex: *"Prochaine formation · 15 mai"*)
4. Mets le lien Calendly correspondant
5. Save

### Cacher la bulle après la formation
1. CMS → **Bulle « Prochaine formation »**
2. Décoche **"Afficher la bulle"**
3. Save

### Changer un tarif
1. CMS → **Prestations**
2. Trouve la prestation concernée
3. Champ **"Tarif"** : change le montant
4. Save

### Ajouter un témoignage
1. CMS → **Témoignages** → **"Autres témoignages (cartes)"**
2. Clique **"Add"**
3. Saisis la citation et le nom de l'auteur
4. Save

### Ajouter une photo dans le séjour Godinne
1. CMS → **Séjour bien-être (Godinne)** → **"Photos du séjour"**
2. Clique **"Add"**
3. **"Photo"** → upload ton image
4. **"Description"** : décris brièvement ce qu'on voit (utile pour les malvoyants)
5. Save

---

## 🆘 Si quelque chose ne va pas

| Problème | Solution |
|---|---|
| Je ne vois pas ma modification sur le site | Attends 2 minutes puis recharge la page (Ctrl+F5) |
| Le CMS ne se charge pas | Vérifie que tu es bien connecté à GitHub |
| Je n'arrive plus à me connecter | Mot de passe GitHub oublié ? https://github.com/password_reset |
| J'ai cassé quelque chose | Appelle Hugo — l'historique GitHub permet de revenir en arrière |
| Je ne reçois pas les messages du formulaire | Vérifie tes spams + confirme ton email Formspree |

---

## 📋 Récap des comptes à créer aujourd'hui

- [ ] **GitHub** — `https://github.com/signup` → accepter l'invitation envoyée par Hugo
- [ ] **Calendly** — `https://calendly.com/signup` → créer un type d'événement → noter l'URL
- [ ] **Formspree** — `https://formspree.io/register` → créer un form → noter l'identifiant
- [ ] **Tester la connexion au CMS** : `https://hugohismans.github.io/chemindetre/admin`
- [ ] **Coller l'URL Calendly** dans la section "Prendre rendez-vous" du CMS
- [ ] **Coller l'identifiant Formspree** dans la section "Contact" du CMS
- [ ] **Faire une modification test** (par ex. changer un mot dans le bandeau d'accueil) pour valider que tout fonctionne

---

*Si quoi que ce soit n'est pas clair, n'hésite pas à appeler Hugo — c'est exactement à ça que sert ce premier essai ensemble.*
