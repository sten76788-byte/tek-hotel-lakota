---
name: Ivoirian Hospitality Excellence
colors:
  surface: '#f8f9fc'
  surface-dim: '#d9dadd'
  surface-bright: '#f8f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f6'
  surface-container: '#edeef1'
  surface-container-high: '#e7e8eb'
  surface-container-highest: '#e1e2e5'
  on-surface: '#191c1e'
  on-surface-variant: '#454650'
  inverse-surface: '#2e3133'
  inverse-on-surface: '#f0f1f4'
  outline: '#767682'
  outline-variant: '#c6c5d2'
  surface-tint: '#4e599f'
  primary: '#031159'
  on-primary: '#ffffff'
  primary-container: '#1e2a6e'
  on-primary-container: '#8994de'
  inverse-primary: '#bbc3ff'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#341200'
  on-tertiary: '#ffffff'
  tertiary-container: '#552200'
  on-tertiary-container: '#d3865b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bbc3ff'
  on-primary-fixed: '#031159'
  on-primary-fixed-variant: '#354185'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb68f'
  on-tertiary-fixed: '#331200'
  on-tertiary-fixed-variant: '#703712'
  background: '#f8f9fc'
  on-background: '#191c1e'
  surface-variant: '#e1e2e5'
  deep-navy: '#1E2A6E'
  surface-white: '#FFFFFF'
  soft-gray: '#E2E8F0'
  text-main: '#0F172A'
  text-muted: '#64748B'
  accent-gold: '#C5A059'
typography:
  display-lg:
    fontFamily: Poppins
    fontSize: 56px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Poppins
    fontSize: 40px
    fontWeight: '900'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  price-tag:
    fontFamily: Poppins
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
---

## Brand & Style

The design system is crafted for a premium apart-hotel experience in Lakota, Côte d'Ivoire. It balances the reliability of a high-end corporate establishment with the warmth of West African hospitality. The personality is authoritative yet welcoming, professional yet comfortable.

The chosen style is **Corporate / Modern** with a focus on high-end hospitality. It utilizes generous whitespace, structured layouts, and a "solid" visual weight that mirrors the brand's classic medallion logo. The aesthetic communicates security, cleanliness, and modern convenience, moving away from "budget rental" vibes toward an "executive stay" experience.

## Colors

The palette is anchored by a deep, authoritative navy blue which serves as the primary brand identifier. White is used as the dominant background color to maintain a sense of cleanliness and space.

- **Primary (Deep Navy):** Used for the navbar, primary action buttons, headers, and structural elements.
- **Secondary (White):** The primary canvas for all content, ensuring high contrast and a premium feel.
- **Neutral (Soft Gray/Navy Tints):** Used for subtle background sections and borders to maintain structure without introducing visual noise.
- **Accents:** While not explicitly requested, a subtle "Accent Gold" is introduced for star ratings and high-end highlights to reinforce the "hotel" prestige.

## Typography

The typography system relies on the interplay between the heavy, impactful weights of **Poppins** and the clinical precision of **Inter**.

- **Headlines:** Poppins ExtraBold and Black provide a "sturdy" feel. Display sizes use tight letter spacing for maximum impact on hero sections.
- **Body:** Inter provides excellent legibility for property descriptions and service lists.
- **Currency:** Prices in FCFA should always be rendered in Poppins Bold to ensure they are prominent and easy to scan.
- **French Language Support:** All typographic scales are optimized for French text lengths, which tend to be longer than English.

## Layout & Spacing

This design system employs a **Fixed Grid** for desktop (12 columns) and a **Fluid Grid** for mobile. 

- **The Rhythm:** Based on an 8px base unit. Section vertical spacing is generous (80px - 120px) to allow the "premium" personality to breathe.
- **Navigation:** The header is fixed to provide constant access to the "Réserver" call to action.
- **Grids:** Logement cards are arranged in a 3-column grid on desktop, 2-column on tablet, and 1-column on mobile.
- **Search Bar:** A floating search/filter bar is a core layout element, positioned to overlap the Hero section to drive immediate conversion.

## Elevation & Depth

To maintain a "modern and professional" vibe, this design system uses **Tonal Layers** supplemented by **Ambient Shadows**.

- **Surfaces:** Use `#FFFFFF` for primary cards and `#F8F9FC` for section backgrounds to create subtle depth without high-contrast borders.
- **Shadows:** Soft, large-radius shadows (e.g., `0 10px 25px rgba(30, 42, 110, 0.08)`) are used specifically for the floating search bar and property cards to make them feel "tangible."
- **Interactive States:** On hover, cards should lift slightly using a more pronounced shadow to indicate interactivity.

## Shapes

The shape language is **Rounded**, reflecting a modern and welcoming hospitality environment. 

- **Standard Elements:** Buttons, input fields, and property cards use a `0.5rem` (8px) radius. This provides a soft, approachable feel while remaining professional.
- **Large Elements:** Galerie images and large containers use `1rem` (16px) for a more luxurious, modern aesthetic.
- **Icons:** Use geometric, solid-style icons that match the weight of the Inter typeface.

## Components

### Buttons
- **Primary:** Deep Navy (#1E2A6E) background with white text. Solid, blocky, and dependable.
- **Secondary:** White background with Deep Navy border and text. Used for "En savoir plus" actions.
- **Action:** For "Réserver," use a slightly larger padding and bold weight to distinguish it from navigation links.

### Property Cards (Fiche Logement)
- High-quality image at the top with a subtle 16px corner radius.
- Price clearly displayed in FCFA using Poppins Bold.
- Icon-based "Equipements" strip (Wifi, AC, Kitchen) using small, clean line icons.

### Search/Filter Bar
- A centralized component with a white background and heavy ambient shadow. 
- Inputs for "Type de logement," "Capacité," and "Dates" separated by subtle vertical dividers.

### Badges & Tags
- Used for "Nouveauté" or "Indisponible." 
- Small, uppercase labels using the `label-md` typography style, with a subtle navy or light gray background.

### Inputs & Forms
- Large, clear fields with `16px` padding. 
- Focus state should use a `2px` Deep Navy border to ensure accessibility and professional polish.
