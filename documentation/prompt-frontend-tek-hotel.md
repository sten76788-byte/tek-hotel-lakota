# PROMPT FRONTEND — Tek Hôtel Lakota (pour Antigravity)

## Contexte projet

Site web pour "Tek Hôtel Lakota", appart'hôtel et service de location meublée à Lakota, Côte d'Ivoire. Le design a été validé sur Google Stitch (7 écrans : Accueil, Nos logements, Fiche logement, Qui sommes-nous, Nos services, Page 404, Mentions légales — desktop + versions mobiles) et exporté en zip — **importe le HTML/CSS Stitch tel quel comme base visuelle, ne redessine rien**. Ton travail : restructurer ce rendu en SPA fonctionnelle selon l'architecture ci-dessous.

## Architecture technique (pattern validé Réveil Immobilier / Africa Home)

- **Un seul `index.html`** contenant toutes les sections (Accueil, Nos logements, Fiche logement, Qui sommes-nous, Nos services, Contact, Mentions légales, 404)
- **`app.js`** : logique de navigation par toggle de sections (pas de vrai routing serveur), gestion des filtres, formulaires, appels Supabase
- **`styles.css`** : reprend la charte Stitch (voir tokens ci-dessous)
- Navigation en `history.pushState` ou simple hash (`#accueil`, `#logements`, `#logement-{id}`, `#qui-sommes-nous`, `#services`, `#contact`) pour permettre le lien direct vers une fiche logement
- Mobile-first, breakpoints cohérents avec les versions mobiles Stitch

## Assets fournis

- **Logo** : fichier `WhatsApp Image 2026-08-15 at 09.59.55.jpeg` présent dans le dossier `Tek-Hotel` — c'est le sceau/médaillon bleu marine "Tek Hôtel Appart'Hôtel Location Meublée Lakota". Utilise-le tel quel dans le header (à gauche de la navbar) et génère le favicon à partir de ce fichier. Ne le remplace par aucun placeholder texte ou logo générique.
- **Design source — deux accès possibles, utilise le MCP Stitch en priorité** :
  - **Accès direct (préféré)** : la connexion MCP Stitch est active dans cet environnement. Utilise-la (`list_projects`, puis les outils d'accès aux écrans) pour retrouver le projet "Tek Hôtel Lakota" et récupérer le HTML/CSS à jour de chacun des 7 écrans. C'est la source la plus fiable, elle reflète l'état actuel du design, contrairement au zip qui peut être une version figée.
  - **Repli** : si le MCP échoue ou est indisponible, utilise le dossier `stitch_tek_hotel` (zip Stitch décompressé) comme base visuelle à reprendre telle quelle.
  - Dans les deux cas, ne redessine rien — reprends le HTML/CSS existant et restructure-le en SPA selon ce prompt.

## Design tokens

| Token | Valeur |
|---|---|
| Couleur principale | Bleu marine profond `#1E2A6E` (variante plus sombre `#031159` selon contexte) |
| Fond principal | Blanc pur `#FFFFFF`, fond doux secondaire `#F8F9FC` |
| Accent doré | `#C5A059` (badges, éléments premium/hôtelier, à utiliser avec parcimonie) |
| Texte principal | `#0F172A` |
| Texte secondaire | `#64748B` |
| Titres | Poppins Bold/ExtraBold/Black |
| Texte courant / UI | Inter |
| Devise | **FCFA** (jamais € ni $) |
| Ton | Hôtelier/hospitalité — confort, accueil, commodité (pas un site immo froid) |

Ces tokens sont ceux effectivement générés dans le design system Stitch ("Ivoirian Hospitality Excellence") — reprends-les exactement, ne les réinterprète pas.

## Sections / écrans à intégrer

1. **Accueil** : hero plein écran, barre de recherche flottante (type de logement, capacité, dates), grille logements en vedette, témoignages (avec **notation étoiles 1-5**), "Pourquoi nous choisir", bannière CTA réservation, section contact (formulaire + carte)
2. **Nos logements** : sidebar de filtres persistants (type de logement, capacité, checkboxes équipements — Climatisation, Wifi Gratuit, Vue sur piscine, Mini-bar, etc. — + bouton "Réinitialiser"), grille de cartes, **pagination numérotée** (`1 2 3 ... 8`)
3. **Fiche logement** (`#logement-{id}`) : galerie d'images, titre, ligne d'icônes Chambres / Salles de bain / Cuisine / Superficie, section "À propos de ce logement" (description longue), section "Ce que propose ce logement" (grille d'équipements avec lien pliable "Afficher les X équipements"), section "Où se situe le logement" (nom du quartier + mini-carte), et un **panneau de réservation sticky** à droite (desktop) contenant : dates d'arrivée/départ, nombre de voyageurs, nom complet, email, téléphone, récap prix, bouton "Réserver ce logement" — ce panneau reste visible au scroll sur desktop, passe en bloc normal en fin de page sur mobile
4. **Qui sommes-nous** : présentation, valeurs, section "Nos Réalisations/Nos Espaces" en grille
5. **Nos services** : grille de cartes (courte durée, longue durée, ménage, conciergerie, sécurité — ajuster aux services réels une fois fournis)
6. **Footer** (présent sur tous les écrans, visible dans les captures Stitch) :
   - Colonne Contact (adresse, téléphone, email)
   - Colonne Navigation (liens rapides)
   - Colonne Newsletter (champ email + bouton inscription)
   - Ligne de copyright + liens "Confidentialité" et "CGV" (en plus du lien Mentions légales dans la colonne Navigation)
7. **Page 404** simple, dans la charte
8. **Mentions légales** — contenu en placeholder `[PLACEHOLDER: TEXTE_MENTIONS_LEGALES]`

## Données (structure attendue, en attendant Supabase)

Utilise un tableau JS de mock data en placeholder pour chaque logement :

```js
{
  id: "",
  titre: "",
  type: "", // Studio | T2 | T3 | Suite
  capacite: 0,
  nb_chambres: 0,
  nb_salles_bain: 0,
  superficie: 0, // m²
  quartier: "", // ex: "Quartier Résidentiel, Lakota, Côte d'Ivoire"
  note: 0, // 1 à 5, affichée sur les cartes (ex: 4.9)
  prix_nuit: 0, // FCFA
  prix_mois: 0, // FCFA
  equipements: [], // ["Wifi haut débit gratuit", "Climatisation centrale", "TV Écran plat", "Parking privé sécurisé", "Service de ménage quotidien", "Fer et planche à repasser", ...] — prévoir jusqu'à ~24 items, avec repli "Afficher tout"
  images: [], // placeholders /assets/placeholder-1.jpg
  description: "",
  disponible: true,
  latitude: null,
  longitude: null
}
```

Marque clairement dans le code `// TODO: remplacer par appel Supabase` partout où ce mock est utilisé, pour faciliter le branchement backend ensuite.

## Formulaires

- **Demande de réservation** (fiche logement) : nom, téléphone, email, dates souhaitées, nombre de personnes, message
- **Contact** (accueil) : nom, email, téléphone, message
- **Newsletter** (footer) : email uniquement
- Tous les formulaires : validation côté client, **champ honeypot anti-bot invisible**, pas d'injection HTML brute des valeurs saisies (échapper systématiquement avant tout affichage — leçon XSS de Réveil Immobilier)

## Sécurité dès le frontend (pattern Réveil)

- Aucun `innerHTML` avec du contenu utilisateur non échappé
- Sanitisation basique de toutes les entrées avant envoi (trim, échappement HTML)
- Pas de clé/secret en dur dans le JS — tout passe par `[PLACEHOLDER: SUPABASE_URL]`, `[PLACEHOLDER: SUPABASE_ANON_KEY]`, `[PLACEHOLDER: EMAILJS_SERVICE_ID]`, `[PLACEHOLDER: EMAILJS_TEMPLATE_ID]`, `[PLACEHOLDER: EMAILJS_PUBLIC_KEY]`

## SEO / méta

- Title, meta description par section (via JS au changement de hash)
- Balises Open Graph de base (og:title, og:description, og:image)
- Alt text sur toutes les images (utilise le titre du logement / nom de la section)

## Ce qui n'est PAS dans ce prompt (à traiter séparément)

- Interface admin (prompt backend séparé)
- Vrai contenu (textes définitifs, photos réelles, services exacts) → placeholders explicites partout
- Intégration Supabase réelle (voir prompt backend)
