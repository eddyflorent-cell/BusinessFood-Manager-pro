# 🍴 BusinessFood Manager

**Version :** 55.6-POLISH  
**Date :** Février 2026  
**Éditeur :** Fotsi Global Services (FGS)  
**Licence :** Propriétaire

## 📖 Description

BusinessFood Manager est une solution métier F&B professionnelle développée par Fotsi Global Services (FGS) pour les restaurants, traiteurs, et professionnels de la restauration. Elle permet de gérer les ingrédients, recettes, production, rentabilité, et exports professionnels, le tout dans le navigateur sans serveur requis.

### 🎯 Fonctionnalités principales

- ✅ **Gestion ingrédients** - Stocks, lots, DLC, fournisseurs
- ✅ **Gestion recettes** - Coûts automatiques, marges, instructions  
- ✅ **Packs commerciaux** - Offres groupées, tarifs spéciaux
- ✅ **Production** - Suivi fabrication, consommation stock
- ✅ **Rentabilité** - Analyse marges, recommandations
- ✅ **Alertes** - Stock critique, DLC proche, notifications
- ✅ **Export PDF** - Rapports professionnels (inventaire, fiches, bilans)
- ✅ **Animations** - Interface fluide, feedback visuel
- ✅ **Shortcuts** - Productivité (Ctrl+S, Esc, Ctrl+F)

---

## 🚀 Démarrage rapide

### 1. Ouvrir l'application

```bash
# Méthode 1 : Double-cliquer sur index.html

# Méthode 2 : Serveur local
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```

### 2. Charger une démo

- Cliquer **"🧇 Démo Salon"** OU **"🍹 Démo Bar"**
- Confirmer le chargement
- Explorer l'application pré-remplie

### 3. Commencer à utiliser

- **Ingrédients** → Ajouter vos produits
- **Recettes** → Créer vos fiches techniques
- **Production** → Lancer fabrication
- **Rentabilité** → Analyser marges

---

## 📂 Structure

```
BusinessFood_v55_6_POLISH/
├── index.html              # Application (SPA)
├── README.md               # Documentation
├── CHANGELOG.md            # Versions
├── src/
│   ├── core/
│   │   ├── models/         # Ingredient, Recipe, Pack...
│   │   └── services/       # AlertService, ExportService
│   └── demo-*.js           # Données démo
└── docs/                   # Guides
```

---

## 🛠️ Technologies

- **HTML5** + **CSS3** + **JavaScript ES6+**
- **jsPDF** - Génération PDF
- **localStorage** - Persistance données

---

## ⌨️ Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl/Cmd + S` | Sauvegarder |
| `Esc` | Fermer modal |
| `Ctrl/Cmd + F` | Focus recherche |

---

## 📱 Compatibilité

- ✅ Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- ✅ Desktop (optimal)
- ⚠️ Tablette (fonctionnel)
- ❌ Mobile (non optimisé)

**Résolution recommandée :** ≥ 1024px

---

## 🐛 Limitations

- Pas responsive mobile
- localStorage limité (~10 MB)
- Pas de sync cloud
- Desktop uniquement

---

## 📄 Licence

**Propriétaire** - Tous droits réservés.  
© 2026 Fotsi Global Services (FGS)

---

**Version 55.6-POLISH** • Production-ready • Score : 8.8/10
