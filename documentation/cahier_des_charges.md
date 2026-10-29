# Cahier des Charges — Tek Hôtel Lakota

## 1. Présentation du Projet
- **Nom de l'établissement** : Tek Hôtel Lakota
- **Type d'activité** : Appart'Hôtel, Chambres meublées & Location haut standing
- **Adresse officielle** : Quartier Résidentiel, Lakota, Côte d'Ivoire
- **Coordonnées publiques** :
  - **Téléphone** : `079 808 10 10` (lien direct `tel:+2250798081010` et WhatsApp)
  - **Email principal** : `tekhotellakota@gmail.com`
  - **Email secondaire** : `agencetekimmobilier@gmail.com`
- **Localisation GPS** :
  - **Latitude** : `5.3549615`
  - **Longitude** : `-3.9574489`
  - > [!IMPORTANT]
    > **[À CONFIRMER]** : Ces coordonnées géographiques correspondent à *"TEK immobilier"* sur Google Maps. Vérifier avec le client si le Tek Hôtel partage rigoureusement la même localisation avant validation définitive.
- **Objectif** : Création d'une plateforme web (Single Page Application - SPA) premium, moderne et réactive permettant de valoriser les hébergements, présenter les services, faciliter les réservations et gérer l'activité via un espace d'administration sécurisé.

---

## 2. Charte Graphique & Design System
*Référence complète : [DESIGN.md](file:///c:/Users/lenovo/Documents/BDD%20sites/Tek-Hotel/DESIGN.md) (Design System : "Ivoirian Hospitality Excellence" issu de Google Stitch)*

### 2.1 Couleurs
- **Bleu Marine Profond (Primary)** : `#1E2A6E` (variante sombre `#031159`)
- **Blanc Pur (Canvas)** : `#FFFFFF`
- **Fond Doux / Neutral (Surface)** : `#F8F9FC`
- **Accent Doré (Prestige / Étoiles / Badges)** : `#C5A059`
- **Textes** : Principal `#0F172A`, Secondaire `#64748B`

### 2.2 Typographie
- **Titres & Prix** : **Poppins** (Bold, ExtraBold, Black)
- **Corps de texte & UI** : **Inter** (Regular, Medium, SemiBold)
- **Devise** : **FCFA** (obligatoire, pas de symbole € ou $)

---

## 3. Architecture Technique

### 3.1 Frontend (SPA Vanilla)
- **Fichiers** : `index.html`, `styles.css`, `app.js`
- **Routage** : Navigation client par hash (`#accueil`, `#nos-logements`, `#logement-{id}`, `#qui-sommes-nous`, `#nos-services`, `#contact`, `#mentions-legales`, `#404`)
- **Assets** : Logo médaillon bleu marine (`WhatsApp Image 2026-08-15 at 09.59.55.jpeg`), photographies haute résolution (Pexels, CDN Aida, etc.).

### 3.2 Backend & Services Tiers
- **Base de données** : Supabase (PostgreSQL avec Row Level Security - RLS)
- **Authentification** : Supabase Auth (Email / Mot de passe pour l'administrateur)
- **Stockage d'images** : Supabase Storage (Bucket `logements-images`, `services-images`)
- **Notifications & Emails** : EmailJS (Templates pour confirmation client et notification admin)

---

## 4. Modèle de Données & Nouveaux Attributs

### 4.1 Table `logements`
- `id` (uuid, primary key)
- `titre` (text)
- `type` (text: 'Studio', 'T2', 'T3', 'Suite')
- `type_climatisation` (**text**: `'Climatisée'` ou `'Ventilée'`) — *Nouvel attribut distinct affiché sur les cartes et utilisé comme filtre.*
- `capacite` (int)
- `nb_chambres` (int)
- `nb_salles_bain` (int)
- `superficie` (int, en m²)
- `quartier` (text, ex: "Quartier Résidentiel, Lakota")
- `note` (numeric, 1.0 à 5.0)
- `prix_nuit` (numeric, en FCFA) — *Modifiable par le client via le panneau admin.*
- `prix_mois` (numeric, en FCFA)
- `equipements` (jsonb/array: inclut obligatoirement **"Mini-bar"**, "Wifi", "Climatisation/Ventilation", "TV", "Cuisine", etc.)
- `images` (text[])
- `description` (text)
- `disponible` (boolean, default true)
- `en_vedette` (boolean, default false)
- `latitude` (numeric, default 5.3549615)
- `longitude` (numeric, default -3.9574489)

---

## 5. Structure & Écrans Fonctionnels

### 5.1 Accueil (`#accueil`)
- **Hero Header** : Accroche percutante avec visuel immersif.
- **Barre de recherche flottante** : Sélecteur par type de logement, confort thermique (Climatisée / Ventilée), dates de séjour.
- **Logements en vedette** : Grille des meilleures offres avec prix en FCFA, note étoilée, badges et mini-bar.
- **Pourquoi nous choisir** : Cartes d'avantages (Sécurité 24/7, Confort thermique, Emplacement calme).
- **Témoignages clients** : Avis avec étoiles (1-5) et retour d'expérience.
- **Bannière CTA & Contact** : Formulaire de contact direct, téléphone `079 808 10 10`, emails et carte interactive OpenStreetMap.

### 5.2 Nos Logements (`#nos-logements`)
- **Sidebar de filtres persistante** :
  - **Filtre Confort thermique** : Tous / Climatisée / Ventilée.
  - **Filtre Type de logement** : Studio, T2, T3, Suite Executive.
  - **Filtre Capacité** : 1-2, 3-4, 5+ personnes.
  - **Filtre Équipements** : Mini-bar, Climatisation, Wifi, Cuisine, Parking.
  - Bouton "Réinitialiser les filtres".
- **Grille de cartes logements** : Affichage dynamique avec badges thermiques et statut de disponibilité.
- **Pagination numérotée** : Gestion fluide du catalogue.

### 5.3 Fiche Logement Détaillée (`#logement-{id}`)
- **Galerie photos** immersive.
- **Badges & Bento Stats** : Chambres, Salles de bain, Mini-bar, Mode de climatisation, Superficie.
- **Section "À propos" & "Équipements"** : Liste exhaustive des prestations.
- **Localisation & Carte interactive** : Repérage avec lien direct Google Maps.
- **Panneau de réservation Sticky** : Formulaire avec calcul automatique du coût estimé et bouton de contact WhatsApp direct.

### 5.4 Qui sommes-nous (`#qui-sommes-nous`)
- Présentation de la vision Tek Hôtel, engagements qualité et galerie "Nos Espaces".

### 5.5 Nos Services (`#nos-services`)
- Court séjour, long séjour, ménage hôtelier régulier, conciergerie privée.

### 5.6 Contact (`#contact`)
- Formulaire sécurisé, coordonnées directes (`079 808 10 10`, emails), horaires d'accueil 24h/24 et carte OpenStreetMap.

### 5.7 Mentions Légales & 404
- Mentions légales conformes avec coordonnées officielles.
- Page 404 interactive avec bouton retour à l'accueil.

---

## 6. Sécurité & Performance

1. **Row Level Security (RLS)** :
   - Lecture publique restreinte aux logements disponibles.
   - Écriture publique strictement limitée aux `INSERT` de formulaires.
2. **Protection Anti-Spam** :
   - Champ Honeypot invisible sur tous les formulaires.
3. **Protection XSS & Injection** :
   - Échappement HTML strict et sanitisation de toutes les données saisies avant affichage.
