# Fonctionnalité "Edit Translation" ajoutée

## ✅ Nouvelle fonctionnalité implémentée

### Checkbox "Edit Translation"
La checkbox permettant de basculer en mode édition de traduction a été ajoutée au bloc Transposh FSE Language Switcher.

## Fonctionnement

### Dans l'éditeur :
1. **Nouveau paramètre** : "Afficher 'Edit Translation'" dans la sidebar
2. **Contrôle** : Toggle pour activer/désactiver l'affichage de la checkbox
3. **Aperçu** : Indication visuelle dans l'éditeur quand la fonctionnalité est activée (✏️ Edit Translation)

### Sur le front-end :
1. **Checkbox fonctionnelle** : Identique au comportement natif de Transposh
2. **Basculement** : Clic sur la checkbox = changement d'URL pour activer/désactiver le mode édition
3. **État persistant** : La checkbox reflète l'état actuel du mode édition

## Code implémenté

### Nouvel attribut dans block.json :
```json
"showEditTranslation": {
    "type": "boolean",
    "default": true
}
```

### Fonction `create_edit_translation_checkbox()` :
- Vérifie les permissions d'édition via `$my_transposh_plugin->is_editing_permitted()`
- Utilise `transposh_utils::rewrite_url_lang_param()` pour créer l'URL de basculement
- Génère une checkbox avec l'état correct (cochée/non cochée)
- Utilise JavaScript pour rediriger lors du clic

### Intégration dans le widget :
- Ajoutée à la fin de chaque style de widget (horizontal, vertical, dropdown)
- Contrôlable via le paramètre `showEditTranslation`
- Style CSS intégré pour un affichage cohérent

## Utilisation

### Pour l'utilisateur :
1. Insérer le bloc "Transposh Switcher"
2. Dans la sidebar, configurez "Afficher 'Edit Translation'" selon vos besoins
3. Sur le front-end, la checkbox apparaît sous les drapeaux/langues
4. Cliquer sur la checkbox active/désactive le mode édition de traduction

### Comportement :
- **Mode normal** : Les textes sont affichés normalement
- **Mode édition** : Les textes traduits deviennent éditables (surligné, cliquable)
- **Permissions** : La checkbox n'apparaît que si l'utilisateur a les droits d'édition

## Avantages

✅ **Fonctionnalité complète** : Identique aux widgets natifs Transposh  
✅ **Configurable** : Peut être activée/désactivée selon les besoins  
✅ **Sécurisée** : Respecte les permissions Transposh  
✅ **Intégrée** : S'affiche de manière cohérente avec le reste du widget  

## Résultat

🎉 **Le bloc Transposh FSE Language Switcher est maintenant complet avec toutes les fonctionnalités du widget natif Transposh !**

- ✅ Sélection de langues (drapeaux, noms, styles)
- ✅ Configuration personnalisable 
- ✅ Mode édition de traduction (Edit Translation)
- ✅ Gestion des erreurs robuste
- ✅ Compatible FSE (Full Site Editing)
