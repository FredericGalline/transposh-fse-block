# Librairies d'icônes de drapeaux - Guide d'utilisation

## Nouvelles fonctionnalités

Le bloc Transposh FSE Language Switcher prend désormais en charge plusieurs librairies d'icônes de drapeaux avec différentes tailles personnalisables.

## Librairies disponibles

### 1. **FlagCDN** (par défaut)
- **URL**: `https://flagcdn.com`
- **Format**: PNG
- **Tailles**: 20px, 40px, 80px, 160px
- **Style**: Rectangulaire classique
- **Exemple**: 🇫🇷 France

### 2. **FlagIcons**
- **URL**: `https://flagicons.lipis.dev`
- **Format**: SVG
- **Ratios**: 1x1 (carré), 4x3 (rectangulaire)
- **Style**: Vectoriel moderne
- **Exemple**: 🇫🇷 France

### 3. **Circle Flags** ⭐ **Nouveau**
- **URL**: `https://hatscripts.github.io/circle-flags`
- **Format**: SVG
- **Style**: **Drapeaux ronds** avec bordure circulaire
- **Exemple**: 🔵🇫🇷 France

### 4. **Rounded Flags** ⭐ **Nouveau**
- **URL**: `https://www.countries-ofthe-world.com`
- **Format**: PNG
- **Style**: **Coins arrondis** (border-radius: 4px)
- **Exemple**: 🟫🇫🇷 France

### 5. **Twemoji**
- **URL**: `https://twemoji.maxcdn.com`
- **Format**: SVG
- **Style**: Style emoji Twitter
- **Exemple**: 🇫🇷 France

### 6. **Emoji natifs**
- **Format**: Unicode
- **Style**: Émojis natifs du système
- **Exemple**: 🇫🇷 France

## Tailles disponibles

### 1. **Très petit (tiny)**
- **Dimensions**: 16px × 12px
- **Usage**: Interfaces compactes, menus déroulants

### 2. **Petit (small)** - Par défaut
- **Dimensions**: 20px × 15px
- **Usage**: Navigation principale, barres d'outils

### 3. **Moyen (medium)**
- **Dimensions**: 32px × 24px
- **Usage**: Sections importantes, pages dédiées

### 4. **Grand (large)**
- **Dimensions**: 48px × 36px
- **Usage**: Headers, pages d'accueil, mise en avant

## Configuration dans l'éditeur

### Panneau de paramètres

1. **Librairie d'icônes**
   - Sélection via `SelectControl`
   - Options : FlagCDN, FlagIcons, Emoji, Twemoji, Circle Flags, Rounded Flags

2. **Taille des drapeaux**
   - Sélection via `SelectControl`
   - Options : Très petit, Petit, Moyen, Grand

### Attributs de bloc

```json
{
  "flagLibrary": {
    "type": "string",
    "default": "flagcdn",
    "enum": ["flagcdn", "flagicons", "emoji", "twemoji", "circle-flags", "rounded-flags"]
  },
  "flagSize": {
    "type": "string",
    "default": "small",
    "enum": ["tiny", "small", "medium", "large"]
  }
}
```

## Rendu côté frontend

### Attributs de données

Le conteneur principal reçoit des attributs de données pour faciliter le stylage CSS :

```html
<div class="wp-block-transposh-fse-language-switcher" 
     data-flag-library="circle-flags" 
     data-flag-size="medium">
  <!-- Contenu du bloc -->
</div>
```

### Classes CSS automatiques

```css
/* Classes de taille */
.transposh-flag-tiny { width: 16px; height: 12px; }
.transposh-flag-small { width: 20px; height: 15px; }
.transposh-flag-medium { width: 32px; height: 24px; }
.transposh-flag-large { width: 48px; height: 36px; }

/* Classes de style */
.transposh-flag-circle-flags { border-radius: 50%; }
.transposh-flag-rounded-flags { border-radius: 4px; }
.transposh-flag-emoji { font-style: normal; }
```

## Recommandations d'usage

### Pour les drapeaux ronds (Circle Flags)
- **Idéal pour**: Designs modernes, interfaces épurées
- **Tailles recommandées**: Medium ou Large
- **Styles**: Parfait pour les thèmes avec coins arrondis

### Pour les drapeaux à coins arrondis (Rounded Flags)
- **Idéal pour**: Designs équilibrés, interfaces professionnelles
- **Tailles recommandées**: Small ou Medium
- **Styles**: Bon compromis entre classique et moderne

### Pour les émojis
- **Idéal pour**: Designs ludiques, interfaces informelles
- **Tailles recommandées**: Small ou Medium
- **Compatibilité**: Dépend du système d'exploitation

## Fallback

Si une librairie n'est pas disponible ou si l'URL échoue, le système utilise automatiquement les drapeaux par défaut du plugin Transposh.

## Support technique

- **Codes de pays**: Mapping automatique des codes de langue vers codes de pays
- **Optimisation**: URLs CDN pour des performances optimales
- **Accessibilité**: Attributs `alt` et `title` automatiques
- **Responsivité**: Dimensions adaptatives selon la taille choisie

## Exemples d'utilisation

### Design moderne avec drapeaux ronds
```
Librairie: Circle Flags
Taille: Medium (32px)
Style: Horizontal
```

### Design classique avec coins arrondis
```
Librairie: Rounded Flags
Taille: Small (20px)
Style: Vertical
```

### Design minimaliste avec émojis
```
Librairie: Emoji
Taille: Small (20px)
Style: Horizontal
```
