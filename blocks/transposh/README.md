# Transposh FSE Language Switcher

Un bloc Gutenberg dynamique pour afficher le widget de sélection de langue Transposh, compatible FSE (Full Site Editing).

## Description

Ce bloc permet d'intégrer facilement le sélecteur de langues Transposh dans l'éditeur Gutenberg et l'éditeur de site WordPress. Il offre toutes les fonctionnalités du widget natif Transposh avec une interface moderne et configurable.

## Fonctionnalités

- **3 styles d'affichage** : Horizontal, Vertical, Menu déroulant
- **Personnalisation complète** : Drapeaux, noms de langues, titre personnalisé
- **Mode édition** : Checkbox "Edit Translation" pour la traduction manuelle
- **Options avancées** : Masquage de la langue actuelle, attribut nofollow
- **Compatible FSE** : Utilisable dans l'éditeur de site WordPress
- **Robuste** : Gestion d'erreurs et vérifications de sécurité

## Installation

1. Assurez-vous que le plugin **Transposh** est installé et activé
2. Copiez le dossier `transposh` dans `/wp-content/themes/votre-theme/blocks/`
3. Ajoutez l'inclusion du bloc dans votre `functions.php` :

```php
// Inclure le bloc Transposh FSE
if (file_exists(get_template_directory() . '/blocks/transposh/transposh.php')) {
    require_once get_template_directory() . '/blocks/transposh/transposh.php';
}
```

## Utilisation

### Dans l'éditeur Gutenberg :
1. Recherchez "Transposh Switcher" dans la bibliothèque de blocs
2. Insérez le bloc dans votre contenu
3. Configurez les paramètres dans la sidebar de droite

### Dans l'éditeur de site (FSE) :
1. Ouvrez l'éditeur de site WordPress
2. Ajoutez le bloc "Transposh Switcher" dans vos templates
3. Personnalisez selon vos besoins

## Paramètres disponibles

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| **Titre du widget** | Texte | Vide | Titre affiché au-dessus du sélecteur |
| **Style d'affichage** | Sélection | Horizontal | Horizontal, Vertical ou Menu déroulant |
| **Afficher les drapeaux** | Toggle | Oui | Affiche les drapeaux des pays |
| **Afficher les noms de langues** | Toggle | Oui | Affiche les noms des langues |
| **Masquer la langue actuelle** | Toggle | Non | Cache la langue actuellement sélectionnée |
| **Ajouter rel='nofollow'** | Toggle | Oui | Ajoute l'attribut nofollow aux liens |
| **Afficher 'Edit Translation'** | Toggle | Oui | Affiche la checkbox de mode édition |

## Prérequis

- WordPress 6.6+
- PHP 7.2+
- Plugin Transposh installé et configuré

## Support et développement

Développé par Frédéric Galliné  
Version: 1.0.0  
Licence: GPL-2.0-or-later

---

*Ce bloc respecte toutes les bonnes pratiques WordPress et s'intègre parfaitement avec le système FSE.*
