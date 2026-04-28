# Admin CMS — Chemin d'Être

Sveltia CMS pour que Michel modifie textes et photos sans toucher au code.

URL admin : `https://hugohismans.github.io/chemindetre/admin/`

---

## Mise en route (à faire 1x par toi, Hugo)

### 1. Activer GitHub Pages sur le repo

1. <https://github.com/hugohismans/chemindetre/settings/pages>
2. **Source** : `Deploy from a branch`
3. **Branch** : `main` / `/ (root)` → **Save**

URL finale : `https://hugohismans.github.io/chemindetre/`

### 2. Créer la GitHub OAuth App

1. Va sur <https://github.com/settings/developers> → **OAuth Apps** → **New OAuth App**
2. Remplis :
   - **Application name** : `Chemin d'Être CMS`
   - **Homepage URL** : `https://hugohismans.github.io/chemindetre/`
   - **Authorization callback URL** : `https://sveltia-auth.<ton-sous-domaine>.workers.dev/oauth/callback`
     (URL provisoire — à mettre à jour après l'étape 3)
3. Note **Client ID** + **Client Secret**

### 3. Déployer le proxy OAuth (Cloudflare Worker)

Sveltia a besoin d'un proxy parce que GitHub Pages est statique. On utilise le worker officiel `sveltia-cms-auth` (gratuit, ~5 min).

```bash
# Si tu n'as pas encore wrangler
npm i -g wrangler
wrangler login

# Cloner et déployer le worker
git clone https://github.com/sveltia/sveltia-cms-auth
cd sveltia-cms-auth
wrangler secret put GITHUB_CLIENT_ID       # colle le Client ID
wrangler secret put GITHUB_CLIENT_SECRET   # colle le Client Secret
wrangler secret put ALLOWED_DOMAINS        # colle: hugohismans.github.io
wrangler deploy
```

Wrangler te donne l'URL du worker (ex : `https://sveltia-auth.tonusername.workers.dev`).

### 4. Mettre à jour les URLs

Dans **GitHub OAuth App** (étape 2), édite **Authorization callback URL** avec la vraie URL du worker :
`https://sveltia-auth.tonusername.workers.dev/oauth/callback`

Dans `admin/config.yml` ligne `base_url:` remplace `PLACEHOLDER` par ton sous-domaine, puis commit/push.

### 5. Inviter Michel comme collaborateur

1. <https://github.com/hugohismans/chemindetre/settings/access> → **Add people**
2. Invite Michel (il devra créer un compte GitHub gratuit s'il n'en a pas)
3. Permission : **Write** (suffit pour commit, pas besoin d'admin)

---

## Guide pour Michel (à lui transmettre)

1. **Créer ton compte GitHub** sur <https://github.com> si tu n'en as pas — c'est gratuit.
2. **Accepter l'invitation** que Hugo t'enverra par email (sujet : "invitation to collaborate").
3. **Aller sur l'admin** : <https://hugohismans.github.io/chemindetre/admin/>
4. **Se connecter avec GitHub** (un seul clic).
5. **Modifier le contenu** :
   - Cliquer sur "Contenu du site" puis sur la section à modifier (À propos, Prestations…)
   - Changer le texte ou cliquer sur une photo pour la remplacer
   - Cliquer sur **Save** (ou **Publish**) en haut à droite
6. **Patienter ~30 secondes** — le site se met à jour automatiquement, il faut juste rafraîchir la page.

> Si quelque chose se passe mal, **ne pas paniquer** : aucune modif n'est définitive, tout est versionné. Hugo peut toujours revenir en arrière.

---

## Architecture technique (rappel)

- `content.json` : source de vérité unique, contient tout le contenu éditable
- `index.html` : squelette avec `data-key` attributes
- `script.js` : fetch `content.json` au chargement et hydrate le DOM
- `admin/` : page Sveltia CMS qui édite `content.json` via commits GitHub
- `images/` : dossier où Michel upload ses nouvelles photos (les images existantes restent à la racine)

Le site reste 100 % statique côté hébergement — pas de backend.
