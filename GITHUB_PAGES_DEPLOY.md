# 🚀 Guide déploiement GitHub Pages - BusinessFood v55.1

## ✅ Problème résolu

**Erreur initiale** : `The requested module does not provide an export named 'demoWESalon'`

**Cause** : Cache de version obsolète (`v=53.0` au lieu de `v=55.1`)

**Solution** : Tous les imports mis à jour vers `v=55.1`

---

## 📦 Fichiers à uploader sur GitHub

### Structure requise :
```
ton-repo/
├── index.html              ← Fichier corrigé (v55.1)
├── src/                    ← Dossier complet
│   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   ├── data/
│   │   └── utils/
│   ├── demo-we-salon.js
│   └── ...
├── .nojekyll              ← IMPORTANT !
└── README.md
```

---

## 🔧 Étapes de déploiement

### 1. Créer `.nojekyll`

Ce fichier désactive Jekyll (processeur GitHub) pour éviter les problèmes avec les modules ES6.

```bash
# À la racine de ton repo
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll for ES6 modules support"
git push
```

### 2. Remplacer `index.html`

```bash
# Remplacer par le fichier corrigé
cp index.html /chemin/vers/ton/repo/
cd /chemin/vers/ton/repo/

git add index.html
git commit -m "Fix: Update module versions to v55.1"
git push
```

### 3. Vérifier la structure `src/`

```bash
# S'assurer que tous les fichiers sont présents
git add src/
git commit -m "Update src files to v55.1"
git push
```

### 4. Configurer GitHub Pages

1. Aller sur ton repo : `https://github.com/ton-username/BusinessFood-Manager-pro`
2. **Settings** → **Pages**
3. **Source** : Deploy from a branch
4. **Branch** : `main` (ou `master`) → `/` (root)
5. **Save**

### 5. Attendre le déploiement

GitHub met ~1-2 minutes pour déployer. Tu verras :
```
✅ Your site is live at https://ton-username.github.io/BusinessFood-Manager-pro/
```

---

## 🧪 Test après déploiement

### 1. Vider le cache du navigateur
```
Chrome/Edge : Ctrl + Shift + Delete
Firefox     : Ctrl + Shift + Delete
Safari      : Cmd + Option + E
```

Ou ouvrir en navigation privée.

### 2. Accéder au site
```
https://eddyflorent-cell.github.io/BusinessFood-Manager-pro/
```

### 3. Ouvrir la console (F12)
Vérifier qu'il n'y a **aucune erreur rouge**.

### 4. Charger la démo
- Cliquer sur **Paramètres** (⚙️)
- **Gestion des données**
- **"Charger démo Salon Moderne"**

**✅ Attendu** :
- 21 ingrédients chargés
- 7 recettes chargées
- 3 vendors + 4 staff

---

## 🐛 Si ça ne marche toujours pas

### Problème : Cache navigateur
**Solution** : Vider le cache ou tester en navigation privée

### Problème : Erreur 404 sur les modules
**Cause** : Dossier `src/` mal uploadé
**Solution** :
```bash
git add src/ -f
git commit -m "Force add src folder"
git push
```

### Problème : Page blanche
**Cause** : `.nojekyll` manquant
**Solution** :
```bash
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll"
git push
```

### Problème : CORS errors
**Cause** : GitHub Pages bloque les modules
**Solution** : Attendre 5-10 minutes, le temps que GitHub propage les changements

---

## 📋 Checklist finale

Avant de pousser sur GitHub :
- [ ] Fichier `.nojekyll` créé
- [ ] `index.html` avec versions `v=55.1`
- [ ] Dossier `src/` complet uploadé
- [ ] Branche correcte sélectionnée dans Settings → Pages
- [ ] Cache navigateur vidé avant test

---

## 🎯 Commandes Git complètes

```bash
# 1. Se positionner dans le repo
cd /chemin/vers/BusinessFood-Manager-pro

# 2. Créer .nojekyll
touch .nojekyll

# 3. Copier les fichiers corrigés
cp /chemin/vers/index.html ./
cp -r /chemin/vers/src ./

# 4. Ajouter tous les fichiers
git add .
git status  # Vérifier que tout est bien ajouté

# 5. Commit
git commit -m "v55.1: Fix module versions and add vendors/staff examples"

# 6. Push
git push origin main  # ou 'master' selon ta branche

# 7. Attendre 1-2 minutes puis tester
```

---

## 🔍 Vérification des imports (pour debug)

Si tu veux vérifier que tous les imports ont la bonne version :

```bash
# Dans ton repo local
grep -n "\.js?v=" index.html

# Doit afficher uniquement v=55.1, pas v=53.0 ou v=54.0
```

---

## ✨ Résultat final

Après ces étapes, ton site devrait :
- ✅ Se charger sans erreur
- ✅ Afficher le dashboard vide
- ✅ Charger la démo avec vendors/staff
- ✅ Fonctionner comme en local

---

## 📞 En cas de problème persistant

1. **Copier l'URL de la console** (F12 → Console → erreurs)
2. **Faire une capture d'écran** de l'onglet Network (F12 → Network)
3. **Vérifier la structure** dans le repo GitHub (tous les fichiers présents ?)

---

**Version** : v55.1 FIXED  
**Date** : 8 février 2026  
**Compatible** : GitHub Pages ✅
