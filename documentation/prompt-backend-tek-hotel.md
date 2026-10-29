# PROMPT BACKEND — Tek Hôtel Lakota (pour Antigravity)

## Contexte

Backend Supabase + EmailJS pour "Tek Hôtel Lakota", à brancher sur la SPA frontend déjà construite (`index.html` / `app.js` / `styles.css`). Pattern identique à Réveil Immobilier, avec la sécurité posée dès le départ (pas patchée après coup cette fois) et le rate limiting effectivement implémenté (contrairement à Réveil, où il restait en TODO).

## Assets fournis

- **Logo** : fichier `WhatsApp Image 2026-08-15 at 09.59.55.jpeg` (dossier `Tek-Hotel`) — à uploader dans le bucket `logements-images` (ou un bucket dédié `branding`) si le logo doit être servi depuis Supabase Storage plutôt qu'en asset statique du frontend.

## Tables Supabase

### `logements`
```sql
id uuid primary key default gen_random_uuid(),
titre text not null,
type text not null, -- Studio | T2 | T3 | Suite
capacite int not null,
nb_chambres int,
nb_salles_bain int,
superficie numeric, -- m²
quartier text, -- ex: "Quartier Résidentiel, Lakota, Côte d'Ivoire"
note numeric default 0, -- moyenne calculée ou saisie admin, 1 à 5
prix_nuit numeric,
prix_mois numeric,
equipements text[],
images text[], -- URLs storage
description text,
disponible boolean default true,
latitude numeric,
longitude numeric,
created_at timestamptz default now()
```

### `demandes_reservation`
```sql
id uuid primary key default gen_random_uuid(),
logement_id uuid references logements(id),
nom text not null,
telephone text not null,
email text,
date_debut date,
date_fin date,
nb_personnes int,
message text,
statut text default 'nouvelle', -- nouvelle | traitee | archivee
created_at timestamptz default now()
```

### `messages_contact`
```sql
id uuid primary key default gen_random_uuid(),
nom text not null,
email text not null,
telephone text,
message text not null,
statut text default 'nouveau',
created_at timestamptz default now()
```

### `newsletter_abonnes`
```sql
id uuid primary key default gen_random_uuid(),
email text unique not null,
created_at timestamptz default now()
```

### `temoignages`
```sql
id uuid primary key default gen_random_uuid(),
nom_client text not null,
note int check (note between 1 and 5),
commentaire text not null,
publie boolean default false, -- validation admin avant affichage public
created_at timestamptz default now()
```

### `services`
```sql
id uuid primary key default gen_random_uuid(),
titre text not null,
description text,
icone text,
ordre int default 0,
created_at timestamptz default now()
```

## RLS — règles à appliquer à CHAQUE table dès la création (pas après)

Principe général : **lecture publique limitée au strictement nécessaire, écriture publique uniquement en INSERT, jamais en UPDATE/DELETE, tout le CRUD complet réservé au rôle admin authentifié.**

- `logements` : SELECT public sur `disponible = true` uniquement. INSERT/UPDATE/DELETE réservés à `auth.role() = 'authenticated'`
- `demandes_reservation` : INSERT public autorisé (formulaire), SELECT/UPDATE/DELETE réservés à l'admin authentifié uniquement — **aucun SELECT anonyme** (données personnelles clients)
- `messages_contact` : même logique — INSERT public, tout le reste admin only
- `newsletter_abonnes` : INSERT public (avec contrainte unique sur email pour éviter les doublons), SELECT/DELETE admin only
- `temoignages` : SELECT public sur `publie = true` uniquement. INSERT possible en public si tu veux un formulaire d'avis client (sinon admin only). UPDATE/DELETE admin only
- `services` : SELECT public sans restriction (contenu vitrine), écriture admin only

Vérifie explicitement qu'aucune policy ne laisse passer un `UPDATE` ou `DELETE` anonyme — c'est le trou de sécurité qui a dû être patché après coup sur Réveil Immobilier, à éviter ici dès le départ.

## Anti-spam / rate limiting (à implémenter, pas juste noter en TODO)

- Champ honeypot invisible sur chaque formulaire, rejeté côté insert si rempli
- Limiter les insertions par IP/session sur `demandes_reservation`, `messages_contact`, `newsletter_abonnes` — via une Edge Function Supabase qui vérifie un compteur (ex: table `rate_limit_log` avec IP hashée + timestamp, ou triggers SQL) avant d'autoriser l'insert direct côté client
- Alternative plus simple si Edge Functions trop lourd pour ce projet : passer TOUS les inserts publics par une Edge Function (pas d'insert direct depuis le client) pour pouvoir y appliquer une limite de fréquence

## Storage

- Bucket `logements-images` : lecture publique, écriture réservée à l'authenticated
- Bucket `services-images` : même règle si besoin d'icônes/images custom pour les services

## Auth admin

- Un seul compte admin (email/mot de passe Supabase Auth), pattern identique à Réveil Immobilier — utilisateur non technique
- Route SPA `#tek-admin` protégée côté frontend (redirection si non connecté) ET côté backend (RLS, jamais de confiance uniquement dans le frontend)
- Dashboard admin à prévoir : CRUD `logements`, liste des `demandes_reservation` (marquer traitée/archivée), liste `messages_contact`, validation des `temoignages` (publier/dépublier), export ou visualisation `newsletter_abonnes`, gestion `services`

## EmailJS

- Un template pour confirmation automatique au client après `demandes_reservation`
- Un template pour notification à l'admin (nouvelle demande / nouveau message contact)
- Placeholders : `[PLACEHOLDER: EMAILJS_SERVICE_ID]`, `[PLACEHOLDER: EMAILJS_TEMPLATE_ID_CLIENT]`, `[PLACEHOLDER: EMAILJS_TEMPLATE_ID_ADMIN]`, `[PLACEHOLDER: EMAILJS_PUBLIC_KEY]`

## Variables d'environnement / placeholders à centraliser

```
SUPABASE_URL=[PLACEHOLDER]
SUPABASE_ANON_KEY=[PLACEHOLDER]
EMAILJS_SERVICE_ID=[PLACEHOLDER]
EMAILJS_PUBLIC_KEY=[PLACEHOLDER]
ADMIN_EMAIL_NOTIFICATION=[PLACEHOLDER]
```

## Checklist sécurité avant mise en prod (à cocher explicitement)

- [ ] RLS activé sur TOUTES les tables (pas une seule laissée en accès libre par oubli)
- [ ] Aucun UPDATE/DELETE anonyme possible nulle part
- [ ] Rate limiting actif sur les 3 formulaires publics
- [ ] Honeypot actif sur les 3 formulaires publics
- [ ] Sanitisation des inputs avant insert (pas de confiance aveugle au frontend)
- [ ] HTTPS forcé sur le domaine final
- [ ] Clés Supabase = anon key uniquement côté client, jamais la service_role key
