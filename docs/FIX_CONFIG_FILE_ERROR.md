# Fix : Erreur "Failed to open stream flag-libraries-config.php"

## 🚨 Problème identifié

```php
PHP Fatal error: Failed opening required '/var/www/html/wp-content/themes/lamaisonsurlasorgue/blocks/transposh/build/flag-libraries-config.php'
```

## 🔍 Cause du problème

Le fichier `flag-libraries-config.php` n'était pas copié dans le dossier `build` lors de la compilation du bloc. Le script de build ne copiait que `render.php`.

## ✅ Solution appliquée

### 1. Modification du script de build

**Fichier modifié** : `package.json`

**Avant** :
```json
"build": "wp-scripts build --blocks-manifest && cp render.php build/render.php"
```

**Après** :
```json
"build": "wp-scripts build --blocks-manifest && cp render.php build/render.php && cp flag-libraries-config.php build/flag-libraries-config.php"
```

### 2. Modification du script start

**Avant** :
```json
"start": "wp-scripts start --blocks-manifest && cp render.php build/render.php"
```

**Après** :
```json
"start": "wp-scripts start --blocks-manifest && cp render.php build/render.php && cp flag-libraries-config.php build/flag-libraries-config.php"
```

## 🛠️ Commande de correction

```bash
cd /path/to/blocks/transposh
npm run build
```

## 📁 Résultat

Le dossier `build` contient maintenant :
- ✅ `render.php`
- ✅ `flag-libraries-config.php`
- ✅ `block.json`
- ✅ `index.js`
- ✅ Autres fichiers de build

## 🔧 Vérification

Pour vérifier que le fichier est bien présent :
```bash
ls -la build/flag-libraries-config.php
```

## 🎯 Impact

- ✅ **Erreur PHP résolue** : Le fichier est maintenant accessible
- ✅ **Nouvelles librairies fonctionnelles** : Circle Flags, Rounded Flags, etc.
- ✅ **Contrôle des tailles** : Tiny, Small, Medium, Large
- ✅ **Rendu côté frontend** : Toutes les fonctionnalités disponibles

## 📝 Note importante

**Après chaque modification du fichier `flag-libraries-config.php`**, il faut relancer :
```bash
npm run build
```

Cela garantit que la version dans `build/` est à jour avec la version source.

## 🔄 Processus de développement

1. **Modifier** : `flag-libraries-config.php` (source)
2. **Compiler** : `npm run build`
3. **Tester** : Vérifier le fonctionnement sur WordPress
4. **Déployer** : Le dossier `build` est prêt

## 🎉 Statut

**✅ RÉSOLU** - Le bloc Transposh FSE fonctionne maintenant correctement avec toutes les nouvelles librairies d'icônes de drapeaux.
