/**
 * TEK HÔTEL LAKOTA — APPLICATION JAVASCRIPT (SPA)
 * Données réelles & Architecture modulaire
 */

// ============================================================================
// 1. CONFIGURATION & PLACEHOLDERS (Supabase & EmailJS)
// ============================================================================
const CONFIG = {
  SUPABASE_URL: '[PLACEHOLDER: SUPABASE_URL]',
  SUPABASE_ANON_KEY: '[PLACEHOLDER: SUPABASE_ANON_KEY]',
  EMAILJS_SERVICE_ID: '[PLACEHOLDER: EMAILJS_SERVICE_ID]',
  EMAILJS_TEMPLATE_ID_CLIENT: '[PLACEHOLDER: EMAILJS_TEMPLATE_ID_CLIENT]',
  EMAILJS_TEMPLATE_ID_ADMIN: '[PLACEHOLDER: EMAILJS_TEMPLATE_ID_ADMIN]',
  EMAILJS_PUBLIC_KEY: '[PLACEHOLDER: EMAILJS_PUBLIC_KEY]',
  COORDINATES: {
    lat: 5.3549615,
    lng: -3.9574489,
    status: '[À CONFIRMER : Coordonnées Google Maps "TEK immobilier" à Lakota]'
  },
  CONTACT: {
    telephone: '079 808 10 10',
    telephone_intl: '+2250798081010',
    email_principal: 'tekhotellakota@gmail.com',
    email_secondaire: 'agencetekimmobilier@gmail.com',
    adresse: 'Quartier Résidentiel, Lakota, Côte d\'Ivoire'
  }
};

// ============================================================================
// 2. DONNÉES DES LOGEMENTS (Avec mode de climatisation & Mini-bar)
// ============================================================================
// TODO: remplacer par appel Supabase (SELECT * FROM logements WHERE disponible = true)
const MOCK_LOGEMENTS = [
  {
    id: "studio-prestige",
    titre: "Studio Prestige Affaires",
    type: "Studio",
    type_climatisation: "Climatisée",
    capacite: 2,
    nb_chambres: 1,
    nb_salles_bain: 1,
    superficie: 28,
    quartier: "Quartier Résidentiel, Lakota, Côte d'Ivoire",
    note: 4.9,
    prix_nuit: null, // Prix vide/placeholder — sera renseigné par le client via le panneau admin
    prix_mois: null,
    en_vedette: true,
    equipements: [
      "Mini-bar privatif",
      "Climatisation split silencieuse",
      "Wifi haut débit gratuit",
      "Kitchenette équipée (micro-ondes, frigo)",
      "TV Écran plat (Chaînes Canal+ & Sat)",
      "Lit Queen Size avec literie prestige",
      "Bureau de travail ergonomique",
      "Douche italienne avec eau chaude continue",
      "Service de ménage quotidien",
      "Parking privé sécurisé 24h/24",
      "Groupe électrogène automatique"
    ],
    images: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90"
    ],
    description: "Le Studio Prestige est conçu pour les professionnels en mission et voyageurs solos ou en couple à la recherche d'un cadre alliant calme, confort thermique optimal et fonctionnalité. Équipé d'un mini-bar et d'une literie hôtelière de pointe au Quartier Résidentiel de Lakota.",
    disponible: true,
    latitude: 5.3549615,
    longitude: -3.9574489
  },
  {
    id: "appartement-confort-t2",
    titre: "Appartement Confort T2",
    type: "T2",
    type_climatisation: "Climatisée",
    capacite: 3,
    nb_chambres: 1,
    nb_salles_bain: 1,
    superficie: 52,
    quartier: "Quartier Résidentiel, Lakota, Côte d'Ivoire",
    note: 4.8,
    prix_nuit: null, // Prix vide/placeholder — sera renseigné par le client via le panneau admin
    prix_mois: null,
    en_vedette: true,
    equipements: [
      "Mini-bar garni & Réfrigérateur",
      "Climatisation intégrale multi-splits",
      "Wifi haut débit gratuit",
      "Grand salon meublé avec canapé convertible",
      "Cuisine américaine complète (feux, four, vaisselle)",
      "Chambre indépendante avec lit King Size",
      "TV Smart 50 pouces connectée",
      "Balcon avec vue dégagée",
      "Service de blanchisserie & ménage",
      "Parking intérieur clos et surveillé"
    ],
    images: [
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90",
      "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90"
    ],
    description: "Cet appartement 2 pièces climatisé offre une séparation idéale entre espace de vie et chambre de repos. Idéal pour les séjours professionnels prolongés ou les familles à Lakota, avec tout le confort d'un chez-soi et les prestations d'un appart'hôtel d'élite.",
    disponible: true,
    latitude: 5.3549615,
    longitude: -3.9574489
  },
  {
    id: "suite-executive-t3",
    titre: "Suite Exécutive F3 & Salon Privé",
    type: "Suite",
    type_climatisation: "Climatisée",
    capacite: 5,
    nb_chambres: 2,
    nb_salles_bain: 2,
    superficie: 85,
    quartier: "Quartier Résidentiel, Lakota, Côte d'Ivoire",
    note: 5.0,
    prix_nuit: null, // Prix vide/placeholder — sera renseigné par le client via le panneau admin
    prix_mois: null,
    en_vedette: true,
    equipements: [
      "Mini-bar executive & Machine à café",
      "Climatisation intégrale réversible",
      "Wifi ultra haut débit fibré",
      "2 Suites parentales avec salles de bain privatives",
      "Grand salon de réception & salle à manger",
      "Cuisine américaine haut de gamme avec îlot",
      "Double TV 4K connectées",
      "Terrasse privée aménagée",
      "Service de conciergerie dédiée",
      "Place de parking réservée"
    ],
    images: [
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90",
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90"
    ],
    description: "Le fleuron de Tek Hôtel à Lakota. Suite climatisée de 85 m² dotée de 2 chambres avec salles de bains privatives, mini-bar de prestige et salon d'accueil spacieux pour vos rendez-vous et séjours d'honneur.",
    disponible: true,
    latitude: 5.3549615,
    longitude: -3.9574489
  },
  {
    id: "chambre-standard-ventilee",
    titre: "Chambre Standard Ventilée Supérieure",
    type: "Studio",
    type_climatisation: "Ventilée",
    capacite: 2,
    nb_chambres: 1,
    nb_salles_bain: 1,
    superficie: 25,
    quartier: "Quartier Résidentiel, Lakota, Côte d'Ivoire",
    note: 4.7,
    prix_nuit: null, // Prix vide/placeholder — sera renseigné par le client via le panneau admin
    prix_mois: null,
    en_vedette: false,
    equipements: [
      "Mini-bar & rafraîchissements",
      "Ventilation plafonnière silencieuse haute performance",
      "Wifi haut débit gratuit",
      "Lit King Size confort hôtelier",
      "TV Écran plat (Chaînes Sat)",
      "Salle d'eau privative avec douche",
      "Service de ménage quotidien",
      "Parking surveillé 24h/24"
    ],
    images: [
      "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90"
    ],
    description: "Une chambre aérée et lumineuse bénéficiant d'une ventilation naturelle et plafonnière silencieuse. Idéale pour les personnes préférant un confort tempéré au naturel avec mini-bar et literie de haut vol.",
    disponible: true,
    latitude: 5.3549615,
    longitude: -3.9574489
  },
  {
    id: "suite-junior-ventilee",
    titre: "Suite Junior Ventilée & Coin Salon",
    type: "Suite",
    type_climatisation: "Ventilée",
    capacite: 3,
    nb_chambres: 1,
    nb_salles_bain: 1,
    superficie: 42,
    quartier: "Quartier Résidentiel, Lakota, Côte d'Ivoire",
    note: 4.85,
    prix_nuit: null, // Prix vide/placeholder — sera renseigné par le client via le panneau admin
    prix_mois: null,
    en_vedette: false,
    equipements: [
      "Mini-bar",
      "Système de brasseurs d'air silencieux",
      "Wifi haut débit gratuit",
      "Coin salon privatif avec fauteuils",
      "Kitchenette compacte",
      "Lit King Size prestige",
      "TV 50 pouces connectée",
      "Salle de bain moderne",
      "Ménage hôtelier régulier"
    ],
    images: [
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90"
    ],
    description: "Une suite spacieuse et aérée avec coin salon, parfaite pour ceux qui privilégient une brise naturelle tout en profitant d'équipements de haut standing.",
    disponible: true,
    latitude: 5.3549615,
    longitude: -3.9574489
  },
  {
    id: "appartement-familial-t3",
    titre: "Appartement Familial T3 Grand Confort",
    type: "T3",
    type_climatisation: "Climatisée",
    capacite: 6,
    nb_chambres: 2,
    nb_salles_bain: 2,
    superficie: 70,
    quartier: "Quartier Résidentiel, Lakota, Côte d'Ivoire",
    note: 4.9,
    prix_nuit: null, // Prix vide/placeholder — sera renseigné par le client via le panneau admin
    prix_mois: null,
    en_vedette: false,
    equipements: [
      "Mini-bar & Grand réfrigérateur",
      "Climatisation intégrale dans toutes les pièces",
      "Wifi haut débit illimité",
      "2 Chambres doubles spacieuses",
      "Grand séjour convivial avec canapé-lit",
      "Cuisine complète équipée",
      "2 Salles de bain indépendantes",
      "Machine à laver le linge",
      "Parking clos sécurisé"
    ],
    images: [
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600&q=90"
    ],
    description: "Idéal pour les séjours en famille ou délégations à Lakota, cet appartement T3 climatisé offre de généreux volumes, deux salles de bains et un mini-bar complet.",
    disponible: true,
    latitude: 5.3549615,
    longitude: -3.9574489
  }
];

// État global de l'application
const STATE = {
  currentRoute: 'accueil',
  activeHousingId: null,
  searchDates: {
    dateIn: '',
    dateOut: ''
  },
  filters: {
    climate: 'all', // 'all' | 'Climatisée' | 'Ventilée'
    types: [],
    capacity: 'all',
    amenities: []
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 6
  }
};

// ============================================================================
// 3. UTILITAIRES (Anti-XSS, Formats, Toasts)
// ============================================================================

function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatFCFA(amount) {
  if (isNaN(amount) || amount === null) return 'Sur demande';
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
  
  const iconName = type === 'error' ? 'error' : 'check_circle';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px]">${iconName}</span>
    <span>${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ============================================================================
// 4. ROUTEUR SPA (Hash-based)
// ============================================================================

function handleRouting() {
  const hash = window.location.hash.slice(1) || 'accueil';

  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }

  document.querySelectorAll('.spa-section').forEach(sec => {
    sec.classList.remove('active');
  });

  document.querySelectorAll('header nav a, #mobile-menu a').forEach(link => {
    link.classList.remove('text-primary', 'font-bold');
    link.classList.add('text-on-surface-variant');
  });

  if (hash.startsWith('logement-')) {
    const housingId = hash.replace('logement-', '');
    STATE.currentRoute = 'fiche-logement';
    STATE.activeHousingId = housingId;

    const detailSection = document.getElementById('section-fiche-logement');
    if (detailSection) {
      detailSection.classList.add('active');
      renderHousingDetail(housingId);
    }
    
    document.querySelectorAll('header nav a[data-path="nos-logements"], #mobile-menu a[data-path="nos-logements"]').forEach(logementsLink => {
      logementsLink.classList.add('text-primary', 'font-bold');
      logementsLink.classList.remove('text-on-surface-variant');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  let targetId = hash;
  if (hash === 'logements') targetId = 'nos-logements';
  if (hash === 'services') targetId = 'nos-services';

  STATE.currentRoute = targetId;
  STATE.activeHousingId = null;

  const targetSection = document.getElementById(`section-${targetId}`);
  const targetNavLinks = document.querySelectorAll(`header nav a[data-path="${targetId}"], #mobile-menu a[data-path="${targetId}"]`);

  if (targetSection) {
    targetSection.classList.add('active');
    targetNavLinks.forEach(link => {
      link.classList.add('text-primary', 'font-bold');
      link.classList.remove('text-on-surface-variant');
    });

    updatePageMetadata(targetId);

    if (targetId === 'accueil') {
      renderFeaturedLogements();
    } else if (targetId === 'nos-logements') {
      syncFilterUI();
      renderAllLogements();
    }
  } else {
    const notFoundSection = document.getElementById('section-404');
    if (notFoundSection) notFoundSection.classList.add('active');
    updatePageMetadata('404', "Page non trouvée — Tek Hôtel Lakota", "La page demandée est introuvable sur le site de Tek Hôtel Lakota.");
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updatePageMetadata(route, customTitle = null, customDesc = null) {
  const metaMap = {
    'accueil': {
      title: "Tek Hôtel Lakota — Appart'Hôtel & Chambres Meublées d'Exception",
      desc: "Découvrez Tek Hôtel Lakota, votre appart'hôtel de haut standing au Quartier Résidentiel de Lakota, Côte d'Ivoire. Studios, appartements et suites climatisés et ventilés avec mini-bar."
    },
    'nos-logements': {
      title: "Nos Logements — Chambres Climatisées & Ventilées à Lakota",
      desc: "Explorez le catalogue des hébergements de Tek Hôtel Lakota : studios prestige, appartements T2/T3 et suites exécutives climatisés ou ventilés avec mini-bar inclus."
    },
    'qui-sommes-nous': {
      title: "Qui sommes-nous — L'Hospitalité Ivoirienne à Lakota",
      desc: "Découvrez l'histoire, les engagements qualité et les espaces de Tek Hôtel Lakota, référence de l'hébergement meublé dans le Lôh-Djiboua."
    },
    'nos-services': {
      title: "Nos Services — Court & Long Séjour, Conciergerie Tek Hôtel",
      desc: "Profitez de nos prestations hôtelières sur mesure à Lakota : location courte et longue durée, ménage régulier, sécurité 24/7 et conciergerie privée."
    },
    'contact': {
      title: "Contact & Réservations — Tek Hôtel Lakota (079 808 10 10)",
      desc: "Contactez la réception de Tek Hôtel Lakota 24h/24 au 079 808 10 10 ou par email à tekhotellakota@gmail.com. Quartier Résidentiel, Lakota."
    },
    'mentions-legales': {
      title: "Mentions Légales & CGV — Tek Hôtel Lakota",
      desc: "Consultez les mentions légales, conditions générales et informations relatives à la confidentialité de Tek Hôtel Lakota."
    }
  };

  const finalTitle = customTitle || metaMap[route]?.title || document.title;
  const finalDesc = customDesc || metaMap[route]?.desc || "";

  document.title = finalTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && finalDesc) metaDesc.setAttribute('content', finalDesc);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && finalTitle) ogTitle.setAttribute('content', finalTitle);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && finalDesc) ogDesc.setAttribute('content', finalDesc);
}

// ============================================================================
// 5. RENDU DES LOGEMENTS
// ============================================================================

function renderFeaturedLogements() {
  const container = document.getElementById('featured-logements-grid');
  if (!container) return;

  const featured = MOCK_LOGEMENTS.filter(item => item.en_vedette).slice(0, 3);
  container.innerHTML = featured.map(item => createStitchCardHTML(item)).join('');
}

function createStitchCardHTML(item) {
  const primaryImg = item.images[0];
  const isClimatise = item.type_climatisation === "Climatisée";
  
  return `
    <div class="group bg-surface-white rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(30,42,110,0.08)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-surface-container">
      <div class="relative h-64 overflow-hidden">
        <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${escapeHTML(primaryImg)}" alt="${escapeHTML(item.titre)}"/>
        
        <!-- Badges Supérieurs -->
        <div class="absolute top-4 left-4 flex gap-2">
          <span class="bg-surface-white text-deep-navy font-label-md text-xs px-3 py-1 rounded shadow-sm uppercase tracking-wider font-bold">
            ${escapeHTML(item.type)}
          </span>
          <span class="${isClimatise ? 'bg-deep-navy text-on-primary' : 'bg-surface-container-highest text-deep-navy'} font-label-md text-xs px-2.5 py-1 rounded shadow-sm flex items-center gap-1 font-semibold">
            <span class="material-symbols-outlined text-[14px]">${isClimatise ? 'ac_unit' : 'mode_fan'}</span>
            ${escapeHTML(item.type_climatisation)}
          </span>
        </div>

        <div class="absolute top-4 right-4 bg-surface-white/90 backdrop-blur-sm px-2.5 py-1 rounded flex items-center gap-1 shadow-sm">
          <span class="material-symbols-outlined text-[16px] text-accent-gold" style="font-variation-settings: 'FILL' 1;">star</span>
          <span class="font-label-md text-[14px] text-deep-navy font-bold">${item.note.toFixed(1)}</span>
        </div>
      </div>

      <div class="p-6 flex flex-col flex-1">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-headline-md text-headline-md text-deep-navy text-xl">${escapeHTML(item.titre)}</h3>
        </div>
        <p class="font-body-md text-sm text-on-surface-variant mb-6 line-clamp-2">${escapeHTML(item.description)}</p>
        
        <!-- Amenities Strip avec Mini-Bar mis en avant -->
        <div class="flex items-center gap-3 mb-6 text-on-surface-variant/80 text-xs">
          <div class="flex items-center gap-1 font-semibold text-deep-navy bg-surface-container-low px-2 py-1 rounded" title="Mini-bar inclus">
            <span class="material-symbols-outlined text-[16px] text-accent-gold">local_bar</span>
            Mini-bar
          </div>
          <div class="w-1 h-1 rounded-full bg-surface-container-highest"></div>
          <div class="flex items-center gap-1" title="Wifi"><span class="material-symbols-outlined text-[18px]">wifi</span></div>
          <div class="w-1 h-1 rounded-full bg-surface-container-highest"></div>
          <div class="flex items-center gap-1 font-label-md">${item.capacite} Pers.</div>
          <div class="w-1 h-1 rounded-full bg-surface-container-highest"></div>
          <div class="flex items-center gap-1 font-label-md">${item.superficie} m²</div>
        </div>

        <div class="mt-auto pt-4 border-t border-surface-container flex items-center justify-between">
          <div>
            <span class="block font-label-md text-[11px] text-text-muted uppercase tracking-wider mb-0.5">Tarif de base</span>
            <span class="font-price-tag text-lg text-deep-navy font-bold">
              ${item.prix_nuit ? `${formatFCFA(item.prix_nuit)} <span class="font-body-md text-[13px] text-text-muted font-normal">/ nuit</span>` : 'Tarif sur demande'}
            </span>
          </div>
          <a href="#logement-${item.id}" class="bg-surface-container text-deep-navy w-11 h-11 rounded-full flex items-center justify-center hover:bg-deep-navy hover:text-on-primary transition-colors shadow-sm">
            <span class="material-symbols-outlined text-lg">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderAllLogements() {
  const gridContainer = document.getElementById('all-logements-grid');
  const countSpan = document.getElementById('results-count');
  const paginationContainer = document.getElementById('pagination-container');
  if (!gridContainer) return;

  let filtered = MOCK_LOGEMENTS.filter(item => {
    // Filtre climatisation
    if (STATE.filters.climate !== 'all' && item.type_climatisation !== STATE.filters.climate) return false;

    // Filtre types
    if (STATE.filters.types.length > 0 && !STATE.filters.types.includes(item.type)) return false;
    
    // Filtre capacité
    if (STATE.filters.capacity === '2' && item.capacite > 2) return false;
    if (STATE.filters.capacity === '4' && (item.capacite < 3 || item.capacite > 4)) return false;
    if (STATE.filters.capacity === '5' && item.capacite < 5) return false;

    // Filtre équipements
    if (STATE.filters.amenities.length > 0) {
      const hasAll = STATE.filters.amenities.every(amenity => 
        item.equipements.some(e => e.toLowerCase().includes(amenity.toLowerCase()))
      );
      if (!hasAll) return false;
    }
    return true;
  });

  if (countSpan) {
    countSpan.textContent = `${filtered.length} hébergement${filtered.length > 1 ? 's' : ''} disponible${filtered.length > 1 ? 's' : ''}`;
  }

  const totalPages = Math.ceil(filtered.length / STATE.pagination.itemsPerPage) || 1;
  if (STATE.pagination.currentPage > totalPages) STATE.pagination.currentPage = 1;

  const startIndex = (STATE.pagination.currentPage - 1) * STATE.pagination.itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + STATE.pagination.itemsPerPage);

  if (paginatedItems.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center bg-surface-white rounded-2xl border border-surface-container p-8">
        <span class="material-symbols-outlined text-4xl text-text-muted mb-2">search_off</span>
        <h4 class="font-headline-md text-deep-navy text-lg">Aucun logement ne correspond à vos critères</h4>
        <p class="font-body-md text-text-muted text-sm mt-1">Essayez de réinitialiser vos filtres (Climatisation, Capacité ou Type).</p>
        <button id="clear-filters-cta" class="mt-4 px-6 py-2.5 bg-deep-navy text-on-primary font-label-md text-sm rounded-lg">Réinitialiser les filtres</button>
      </div>
    `;
    const clearBtn = document.getElementById('clear-filters-cta');
    if (clearBtn) clearBtn.addEventListener('click', resetFilters);
  } else {
    gridContainer.innerHTML = paginatedItems.map(item => createStitchCardHTML(item)).join('');
  }

  if (paginationContainer) {
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
    } else {
      let paginationHTML = `
        <nav aria-label="Pagination" class="flex items-center gap-2 bg-surface-white p-2 rounded-xl shadow-sm border border-surface-container">
          <button class="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                  ${STATE.pagination.currentPage === 1 ? 'disabled' : ''} 
                  onclick="changePage(${STATE.pagination.currentPage - 1})">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
      `;

      for (let p = 1; p <= totalPages; p++) {
        const isActive = p === STATE.pagination.currentPage;
        paginationHTML += `
          <button class="w-10 h-10 flex items-center justify-center rounded-lg font-label-md transition-colors ${isActive ? 'bg-primary text-on-primary font-bold shadow-md' : 'text-on-surface hover:bg-surface-container'}" 
                  onclick="changePage(${p})">
            ${p}
          </button>
        `;
      }

      paginationHTML += `
          <button class="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                  ${STATE.pagination.currentPage === totalPages ? 'disabled' : ''} 
                  onclick="changePage(${STATE.pagination.currentPage + 1})">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </nav>
      `;
      paginationContainer.innerHTML = paginationHTML;
    }
  }
}

window.changePage = function(page) {
  STATE.pagination.currentPage = page;
  renderAllLogements();
  window.scrollTo({ top: 200, behavior: 'smooth' });
};

function syncFilterUI() {
  document.querySelectorAll('input[name="climate_filter"]').forEach(r => {
    r.checked = (r.value === STATE.filters.climate);
  });
  document.querySelectorAll('input[name="type_filter"]').forEach(cb => {
    cb.checked = STATE.filters.types.includes(cb.value);
  });
  document.querySelectorAll('input[name="amenity_filter"]').forEach(cb => {
    cb.checked = STATE.filters.amenities.includes(cb.value);
  });
  document.querySelectorAll('.capacity-btn').forEach(btn => {
    const isActive = btn.dataset.capacity === STATE.filters.capacity;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      btn.classList.add('bg-deep-navy', 'text-on-primary');
      btn.classList.remove('bg-surface-white', 'text-on-surface');
    } else {
      btn.classList.remove('bg-deep-navy', 'text-on-primary');
      btn.classList.add('bg-surface-white', 'text-on-surface');
    }
  });
}

function resetFilters() {
  STATE.filters.climate = 'all';
  STATE.filters.types = [];
  STATE.filters.capacity = 'all';
  STATE.filters.amenities = [];
  STATE.pagination.currentPage = 1;

  syncFilterUI();
  renderAllLogements();
}

// ============================================================================
// 6. FICHE LOGEMENT DÉTAILLÉE
// ============================================================================

function renderHousingDetail(housingId) {
  const container = document.getElementById('logement-detail-view');
  if (!container) return;

  const housing = MOCK_LOGEMENTS.find(item => item.id === housingId);
  if (!housing) {
    container.innerHTML = `
      <div class="max-w-container-max mx-auto px-gutter py-16 text-center bg-surface-white rounded-2xl border border-surface-container">
        <h2 class="font-headline-lg text-deep-navy text-2xl">Logement introuvable</h2>
        <p class="font-body-md text-text-muted mt-2">Ce logement est actuellement indisponible.</p>
        <a href="#nos-logements" class="inline-block mt-6 px-8 py-3 bg-deep-navy text-on-primary font-label-md rounded-lg">Retour aux logements</a>
      </div>
    `;
    return;
  }

  updatePageMetadata(
    'fiche-logement',
    `${housing.titre} (${housing.type_climatisation}) — Tek Hôtel Lakota`,
    housing.description
  );

  const mainImage = housing.images[0];
  const secondaryImage1 = housing.images[1] || mainImage;
  const secondaryImage2 = housing.images[2] || mainImage;
  const isClimatise = housing.type_climatisation === "Climatisée";

  const VISIBLE_AMENITIES_COUNT = 6;
  const hasMoreAmenities = housing.equipements.length > VISIBLE_AMENITIES_COUNT;

  const amenitiesListHTML = housing.equipements.map((amenity, idx) => `
    <div class="flex items-center gap-4 ${idx >= VISIBLE_AMENITIES_COUNT ? 'extra-amenity hidden' : ''}">
      <div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
        <span class="material-symbols-outlined">${amenity.includes('Mini-bar') ? 'local_bar' : 'check_circle'}</span>
      </div>
      <span class="font-body-lg text-body-lg text-on-surface font-medium">${escapeHTML(amenity)}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <!-- Image Gallery Section -->
    <section class="max-w-[1440px] mx-auto px-gutter w-full mb-12">
      <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-base h-[50vh] min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden shadow-lg bg-surface-container">
        <div class="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-surface-container-high bg-cover bg-center" style="background-image: url('${mainImage}')">
          <div class="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors duration-300"></div>
        </div>
        <div class="hidden md:block relative group overflow-hidden bg-surface-container-high bg-cover bg-center" style="background-image: url('${secondaryImage1}')">
          <div class="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors duration-300"></div>
        </div>
        <div class="hidden md:block relative group overflow-hidden bg-surface-container-high bg-cover bg-center" style="background-image: url('${secondaryImage2}')">
          <div class="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors duration-300"></div>
        </div>
        <div class="hidden md:block relative group overflow-hidden bg-surface-container-high bg-cover bg-center" style="background-image: url('${mainImage}')">
          <div class="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors duration-300"></div>
        </div>
        <div class="hidden md:block relative group overflow-hidden bg-surface-container-high bg-cover bg-center cursor-pointer" style="background-image: url('${secondaryImage1}')" onclick="window.open('${mainImage}', '_blank')">
          <div class="absolute inset-0 bg-deep-navy/40 group-hover:bg-deep-navy/50 transition-colors duration-300 flex items-center justify-center">
            <span class="font-label-md text-label-md text-on-primary bg-surface-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Voir les photos</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Layout -->
    <section class="max-w-container-max mx-auto px-gutter w-full grid grid-cols-1 xl:grid-cols-12 gap-12 relative">
      
      <!-- Left Column: Details (8 cols) -->
      <div class="xl:col-span-8 flex flex-col gap-12">
        <div class="flex flex-col gap-6">
          <div class="flex flex-wrap items-center gap-3">
            <span class="bg-deep-navy text-on-primary px-3.5 py-1.5 rounded-lg font-label-md text-sm shadow-sm flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">${isClimatise ? 'ac_unit' : 'mode_fan'}</span>
              Chambre ${escapeHTML(housing.type_climatisation)}
            </span>
            <span class="bg-surface-container-high text-on-surface-variant px-3.5 py-1.5 rounded-lg font-label-md text-sm font-semibold">
              Type : ${escapeHTML(housing.type)}
            </span>
            <span class="flex items-center gap-1.5 bg-surface-container-high text-on-surface-variant px-3.5 py-1.5 rounded-lg font-label-md text-sm">
              <span class="material-symbols-outlined text-[16px]">group</span>
              Jusqu'à ${housing.capacite} personnes
            </span>
          </div>

          <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <h1 class="font-headline-lg text-headline-lg text-deep-navy leading-tight md:max-w-[70%]">
              ${escapeHTML(housing.titre)}
            </h1>
            <div class="flex flex-col items-start md:items-end bg-surface-white p-4 rounded-xl shadow-md border border-surface-container">
              <span class="font-price-tag text-price-tag text-accent-gold font-bold">${housing.prix_nuit ? formatFCFA(housing.prix_nuit) : 'Tarif sur demande'}</span>
              <span class="font-body-md text-xs text-on-surface-variant">${housing.prix_nuit ? 'par nuitée' : 'Contactez la réception'}</span>
            </div>
          </div>
        </div>

        <!-- Bento Quick Stats (Chambres, Salles de bain, Mini-bar, Climatisation, Superficie) -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 shadow-sm border border-surface-container">
            <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">bed</span>
            <span class="font-label-md text-label-md text-on-surface">${housing.nb_chambres} Chambre${housing.nb_chambres > 1 ? 's' : ''}</span>
            <span class="font-body-md text-text-muted text-xs">Literie Prestige</span>
          </div>
          <div class="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 shadow-sm border border-surface-container">
            <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">bathtub</span>
            <span class="font-label-md text-label-md text-on-surface">${housing.nb_salles_bain} Salle${housing.nb_salles_bain > 1 ? 's' : ''} d'eau</span>
            <span class="font-body-md text-text-muted text-xs">Eau chaude continue</span>
          </div>
          <div class="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 shadow-sm border border-surface-container">
            <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">local_bar</span>
            <span class="font-label-md text-label-md text-on-surface">Mini-bar</span>
            <span class="font-body-md text-text-muted text-xs">Inclus en chambre</span>
          </div>
          <div class="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 shadow-sm border border-surface-container">
            <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">${isClimatise ? 'ac_unit' : 'mode_fan'}</span>
            <span class="font-label-md text-label-md text-on-surface">${escapeHTML(housing.type_climatisation)}</span>
            <span class="font-body-md text-text-muted text-xs">Confort thermique</span>
          </div>
          <div class="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 shadow-sm border border-surface-container col-span-2 md:col-span-1">
            <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">square_foot</span>
            <span class="font-label-md text-label-md text-on-surface">Superficie</span>
            <span class="font-body-md text-text-muted text-xs">${housing.superficie} m²</span>
          </div>
        </div>

        <div class="w-full h-px bg-surface-container-high"></div>

        <!-- Description -->
        <div class="flex flex-col gap-4">
          <h2 class="font-headline-md text-headline-md text-deep-navy">À propos de ce logement</h2>
          <div class="font-body-lg text-body-lg text-on-surface-variant space-y-4">
            <p>${escapeHTML(housing.description)}</p>
          </div>
        </div>

        <div class="w-full h-px bg-surface-container-high"></div>

        <!-- Amenities avec bouton pliable -->
        <div class="flex flex-col gap-6">
          <h2 class="font-headline-md text-headline-md text-deep-navy">Ce que propose ce logement</h2>
          <div id="amenities-grid" class="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
            ${amenitiesListHTML}
          </div>
          ${hasMoreAmenities ? `
            <div>
              <button id="toggle-amenities-btn" type="button" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-deep-navy text-deep-navy font-label-md text-sm hover:bg-deep-navy hover:text-on-primary transition-colors">
                <span id="toggle-amenities-label">Afficher les ${housing.equipements.length} équipements</span>
                <span id="toggle-amenities-icon" class="material-symbols-outlined text-base">expand_more</span>
              </button>
            </div>
          ` : ''}
        </div>

        <div class="w-full h-px bg-surface-container-high"></div>

        <!-- Location -->
        <div class="flex flex-col gap-6">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="font-headline-md text-headline-md text-deep-navy">Emplacement & Accès</h2>
              <p class="font-body-md text-sm text-on-surface-variant mt-1">${escapeHTML(housing.quartier)}</p>
            </div>
            <a href="https://maps.google.com/?q=${housing.latitude},${housing.longitude}" target="_blank" rel="noopener noreferrer" class="font-label-md text-xs text-primary underline flex items-center gap-1">
              <span>Google Maps</span>
              <span class="material-symbols-outlined text-xs">open_in_new</span>
            </a>
          </div>
          <div class="w-full h-[320px] rounded-xl shadow-md bg-surface-container relative overflow-hidden border border-surface-container">
            <iframe 
              class="w-full h-full border-0" 
              src="https://www.openstreetmap.org/export/embed.html?bbox=-3.965%2C5.350%2C-3.950%2C5.360&amp;layer=mapnik&amp;marker=${housing.latitude}%2C${housing.longitude}" 
              title="Localisation ${housing.titre}" 
              loading="lazy">
            </iframe>
          </div>
        </div>
      </div>

      <!-- Right Column: STICKY BOOKING SIDEBAR (4 cols) -->
      <div class="xl:col-span-4 relative">
        <div class="sticky top-28 bg-surface-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col gap-6 border border-surface-container">
          <div class="flex flex-col gap-1">
            <h3 class="font-headline-md text-headline-md text-deep-navy">Demande de Réservation</h3>
            <p class="font-body-md text-text-muted text-xs">Assistance directe au <strong class="text-deep-navy">${CONFIG.CONTACT.telephone}</strong></p>
          </div>

          <form id="booking-request-form" class="flex flex-col gap-4" data-housing-id="${housing.id}" data-price-per-night="${housing.prix_nuit || ''}">
            <input type="text" name="website_hp" style="display:none !important;" tabindex="-1" autocomplete="off">
            
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="font-label-md text-on-surface text-xs uppercase tracking-wider">Arrivée</label>
                <input id="booking-arrival" name="date_debut" required class="w-full bg-surface-container px-3 py-2.5 rounded-lg font-body-md text-sm text-on-surface outline-none focus:bg-surface-white focus:ring-2 focus:ring-deep-navy" type="date"/>
              </div>
              <div class="flex flex-col gap-1">
                <label class="font-label-md text-on-surface text-xs uppercase tracking-wider">Départ</label>
                <input id="booking-departure" name="date_fin" required class="w-full bg-surface-container px-3 py-2.5 rounded-lg font-body-md text-sm text-on-surface outline-none focus:bg-surface-white focus:ring-2 focus:ring-deep-navy" type="date"/>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-label-md text-on-surface text-xs uppercase tracking-wider">Voyageurs</label>
              <select name="nb_personnes" class="w-full bg-surface-container px-3 py-2.5 rounded-lg font-body-md text-sm text-on-surface outline-none focus:bg-surface-white focus:ring-2 focus:ring-deep-navy cursor-pointer">
                <option value="1">1 Personne</option>
                <option selected value="2">2 Personnes</option>
                <option value="3">3 Personnes</option>
                <option value="4">4 Personnes</option>
                <option value="5">5+ Personnes</option>
              </select>
            </div>

            <div class="flex flex-col gap-3 pt-2">
              <input name="nom" required class="w-full bg-surface-container px-4 py-3 rounded-lg font-body-md text-sm text-on-surface placeholder:text-text-muted outline-none focus:bg-surface-white focus:ring-2 focus:ring-deep-navy" placeholder="Nom complet *" type="text"/>
              <input name="telephone" required class="w-full bg-surface-container px-4 py-3 rounded-lg font-body-md text-sm text-on-surface placeholder:text-text-muted outline-none focus:bg-surface-white focus:ring-2 focus:ring-deep-navy" placeholder="Téléphone / WhatsApp *" type="tel"/>
              <input name="email" class="w-full bg-surface-container px-4 py-3 rounded-lg font-body-md text-sm text-on-surface placeholder:text-text-muted outline-none focus:bg-surface-white focus:ring-2 focus:ring-deep-navy" placeholder="Email (pour confirmation)" type="email"/>
              <textarea name="message" class="w-full bg-surface-container px-4 py-2.5 rounded-lg font-body-md text-sm text-on-surface placeholder:text-text-muted outline-none focus:bg-surface-white focus:ring-2 focus:ring-deep-navy resize-none" placeholder="Précisions éventuelles..." rows="2"></textarea>
            </div>

            <!-- Résumé Estimation -->
            <div class="bg-surface-container-low p-4 rounded-lg mt-1 border border-surface-container">
              <div class="flex justify-between items-center mb-1.5 text-xs">
                <span id="price-calc-label" class="text-on-surface-variant">${housing.prix_nuit ? `${formatFCFA(housing.prix_nuit)} x 0 nuit` : 'Sélectionnez vos dates'}</span>
                <span id="price-calc-subtotal" class="text-on-surface font-semibold">${housing.prix_nuit ? '0 FCFA' : '—'}</span>
              </div>
              <div class="w-full h-px bg-surface-container-high my-2"></div>
              <div class="flex justify-between items-center">
                <span class="font-label-md text-deep-navy font-bold text-sm">Total estimé</span>
                <span id="price-calc-total" class="font-price-tag text-accent-gold text-lg font-bold">${housing.prix_nuit ? '0 FCFA' : 'Sur demande'}</span>
              </div>
            </div>

            <button class="w-full bg-deep-navy text-on-primary font-label-md text-sm py-4 rounded-lg shadow-md hover:shadow-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2" type="submit">
              <span class="material-symbols-outlined text-base">send</span>
              <span>Réserver ce logement</span>
            </button>
            
            <a href="https://wa.me/2250798081010?text=Bonjour%20Tek%20Hôtel,%20je%20souhaite%20réserver%20le%20logement%20${encodeURIComponent(housing.titre)}" target="_blank" rel="noopener noreferrer" class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-label-md text-xs py-2.5 rounded-lg text-center flex items-center justify-center gap-2 transition-colors">
              <span class="material-symbols-outlined text-sm">chat</span>
              <span>Réserver via WhatsApp</span>
            </a>
          </form>
        </div>
      </div>

    </section>
  `;

  // Listener bouton pliable "Afficher les X équipements"
  const toggleAmenitiesBtn = document.getElementById('toggle-amenities-btn');
  if (toggleAmenitiesBtn) {
    let expanded = false;
    toggleAmenitiesBtn.addEventListener('click', () => {
      expanded = !expanded;
      document.querySelectorAll('#amenities-grid .extra-amenity').forEach(el => {
        el.classList.toggle('hidden', !expanded);
      });
      const label = document.getElementById('toggle-amenities-label');
      const icon = document.getElementById('toggle-amenities-icon');
      if (label) {
        label.textContent = expanded
          ? 'Réduire la liste des équipements'
          : `Afficher les ${housing.equipements.length} équipements`;
      }
      if (icon) {
        icon.textContent = expanded ? 'expand_less' : 'expand_more';
      }
    });
  }

  setupBookingFormListeners();
}

function setupBookingFormListeners() {
  const form = document.getElementById('booking-request-form');
  const arrivalInput = document.getElementById('booking-arrival');
  const departureInput = document.getElementById('booking-departure');
  const calcLabel = document.getElementById('price-calc-label');
  const calcSubtotal = document.getElementById('price-calc-subtotal');
  const calcTotal = document.getElementById('price-calc-total');

  if (!form || !arrivalInput || !departureInput) return;

  const rawPrice = parseFloat(form.dataset.pricePerNight);
  const hasPrice = !isNaN(rawPrice) && rawPrice > 0;

  // Pré-remplir avec les dates saisies dans la barre Hero si présentes
  if (STATE.searchDates.dateIn) arrivalInput.value = STATE.searchDates.dateIn;
  if (STATE.searchDates.dateOut) departureInput.value = STATE.searchDates.dateOut;

  function updatePriceCalculation() {
    if (arrivalInput.value && departureInput.value) {
      const start = new Date(arrivalInput.value);
      const end = new Date(departureInput.value);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        if (hasPrice) {
          const total = diffDays * rawPrice;
          calcLabel.textContent = `${formatFCFA(rawPrice)} x ${diffDays} nuit${diffDays > 1 ? 's' : ''}`;
          calcSubtotal.textContent = formatFCFA(total);
          calcTotal.textContent = formatFCFA(total);
        } else {
          calcLabel.textContent = `Séjour de ${diffDays} nuit${diffDays > 1 ? 's' : ''}`;
          calcSubtotal.textContent = `${diffDays} nuit${diffDays > 1 ? 's' : ''}`;
          calcTotal.textContent = 'Tarif sur demande';
        }
        return;
      }
    }
    calcLabel.textContent = hasPrice ? `${formatFCFA(rawPrice)} x 0 nuit` : 'Sélectionnez vos dates';
    calcSubtotal.textContent = hasPrice ? '0 FCFA' : '—';
    calcTotal.textContent = hasPrice ? '0 FCFA' : 'Sur demande';
  }

  arrivalInput.addEventListener('change', () => {
    departureInput.min = arrivalInput.value;
    STATE.searchDates.dateIn = arrivalInput.value;
    updatePriceCalculation();
  });
  departureInput.addEventListener('change', () => {
    STATE.searchDates.dateOut = departureInput.value;
    updatePriceCalculation();
  });

  updatePriceCalculation();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const hp = form.querySelector('input[name="website_hp"]');
    if (hp && hp.value.trim() !== '') return;

    const fd = new FormData(form);
    const data = {
      logement_id: form.dataset.housingId,
      nom: escapeHTML(fd.get('nom')),
      telephone: escapeHTML(fd.get('telephone')),
      email: escapeHTML(fd.get('email')),
      date_debut: fd.get('date_debut'),
      date_fin: fd.get('date_fin'),
      nb_personnes: parseInt(fd.get('nb_personnes'), 10),
      message: escapeHTML(fd.get('message')),
      statut: 'nouvelle'
    };

    console.log("Demande de réservation enregistrée :", data);
    showToast("Votre demande a bien été envoyée. La réception vous contacte sous peu !", "success");
    form.reset();
    STATE.searchDates.dateIn = '';
    STATE.searchDates.dateOut = '';
    updatePriceCalculation();
  });
}

// ============================================================================
// 7. FORMULAIRES & FILTRES
// ============================================================================

function setupEventListeners() {
  // Hero Search
  const heroSearchBtn = document.getElementById('hero-search-btn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const type = document.getElementById('hero-filter-type')?.value;
      const climate = document.getElementById('hero-filter-climatisation')?.value;
      const dateIn = document.getElementById('hero-date-in')?.value || '';
      const dateOut = document.getElementById('hero-date-out')?.value || '';

      STATE.filters.types = type ? [type] : [];
      STATE.filters.climate = climate || 'all';
      STATE.searchDates.dateIn = dateIn;
      STATE.searchDates.dateOut = dateOut;
      STATE.pagination.currentPage = 1;

      syncFilterUI();

      if (window.location.hash === '#nos-logements') {
        renderAllLogements();
      } else {
        window.location.hash = '#nos-logements';
      }
    });
  }

  // Filtre Climatisation radio
  document.querySelectorAll('input[name="climate_filter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      STATE.filters.climate = e.target.value;
      STATE.pagination.currentPage = 1;
      renderAllLogements();
    });
  });

  // Filtres catalogue types
  document.querySelectorAll('input[name="type_filter"]').forEach(cb => {
    cb.addEventListener('change', () => {
      STATE.filters.types = Array.from(document.querySelectorAll('input[name="type_filter"]:checked')).map(c => c.value);
      STATE.pagination.currentPage = 1;
      renderAllLogements();
    });
  });

  // Filtres équipements
  document.querySelectorAll('input[name="amenity_filter"]').forEach(cb => {
    cb.addEventListener('change', () => {
      STATE.filters.amenities = Array.from(document.querySelectorAll('input[name="amenity_filter"]:checked')).map(c => c.value);
      STATE.pagination.currentPage = 1;
      renderAllLogements();
    });
  });

  // Filtre capacité
  document.querySelectorAll('.capacity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.capacity-btn').forEach(b => {
        b.classList.remove('bg-deep-navy', 'text-on-primary');
        b.classList.add('bg-surface-white', 'text-on-surface');
      });
      btn.classList.add('bg-deep-navy', 'text-on-primary');
      btn.classList.remove('bg-surface-white', 'text-on-surface');

      STATE.filters.capacity = btn.dataset.capacity;
      STATE.pagination.currentPage = 1;
      renderAllLogements();
    });
  });

  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) resetBtn.addEventListener('click', resetFilters);

  // Formulaire contact accueil
  const homeContactForm = document.getElementById('home-contact-form');
  if (homeContactForm) {
    homeContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const hp = homeContactForm.querySelector('input[name="website_hp"]');
      if (hp && hp.value.trim() !== '') return;
      showToast("Merci pour votre message. Nous vous répondrons sous 24h au 079 808 10 10.", "success");
      homeContactForm.reset();
    });
  }

  // Formulaire contact page
  const mainContactForm = document.getElementById('main-contact-form');
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const hp = mainContactForm.querySelector('input[name="website_hp"]');
      if (hp && hp.value.trim() !== '') return;
      showToast("Votre message a été transmis avec succès à Tek Hôtel Lakota.", "success");
      mainContactForm.reset();
    });
  }

  // Newsletter Footer
  const footerNewsletterForm = document.getElementById('footer-newsletter-form');
  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const hp = footerNewsletterForm.querySelector('input[name="website_hp"]');
      if (hp && hp.value.trim() !== '') return;
      showToast("Merci pour votre inscription à notre newsletter !", "success");
      footerNewsletterForm.reset();
    });
  }

  // Mobile menu button
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// ============================================================================
// 8. INITIALISATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  handleRouting();
  window.addEventListener('hashchange', handleRouting);
});
