# 🎯 BusinessFood Manager v55.1 - Acteurs Optionnels

## 📦 Contenu de l'archive

```
BusinessFood_v55.1/
├── index.html                          Application principale (~7,700 lignes)
├── src/
│   ├── core/
│   │   ├── models/                     Classes métier (Ingredient, Recipe, etc.)
│   │   ├── services/                   Logique business (RecipeService, etc.)
│   │   ├── data/                       Persistance (StorageManager, etc.)
│   │   └── utils/                      Utilitaires (math, date, units)
│   └── demo-we-salon.js                Démo "Salon Moderne" avec vendors/staff
├── CHANGELOG_v55.1.md                  📝 Détails des modifications v55.1
├── GUIDE_VENDORS_STAFF.md              👥 Guide d'utilisation vendors/staff
└── README.md                           Ce fichier
```

---

## 🆕 Nouveautés v55.1

### ✅ Champs acteurs rendus optionnels
- **Réceptionnaire** (`receivedBy`) dans les lots d'ingrédients
- **Opérateur** (`operator`) dans les productions
- **Vendeur** (`vendorId`) dans les ventes (déjà optionnel)

### ✅ Exemples ajoutés dans la démo
- **3 Vendors** : Sophie Martin (5%), Lucas Dubois (7%), Emma Bernard (6%)
- **4 Staff** : Marie Lefevre (Chef), Thomas Petit (Commis), Julie Moreau (Réception), Alexandre Roux (Vendeur)
- **Lots avec receivedBy** : Quelques lots préchargés avec exemples

### ✅ Documentation complète
- CHANGELOG détaillé avec exemples de code
- Guide d'utilisation vendors/staff avec scénarios

---

## 🚀 Démarrage rapide

### 1. Ouvrir l'application
```bash
# Ouvrir index.html dans votre navigateur
open index.html
```

### 2. Charger la démo
- Cliquer sur **Paramètres** (icône ⚙️)
- Descendre à **Gestion des données**
- Cliquer sur **Charger démo "Salon Moderne"**
- Confirmer

### 3. Explorer les nouveautés

#### Vendors (dans le module Ventes)
1. Aller dans **Ventes** → **Nouvelle vente**
2. Sélectionner un pack
3. Choisir un vendeur dans la liste déroulante
4. Observer le calcul automatique de la commission

#### Staff (dans Production ou Ingrédients)
1. **Production** : Produire une recette → Sélectionner un opérateur
2. **Ingrédients** : Ajouter un lot → Sélectionner un réceptionnaire

---

## 📊 Modules fonctionnels

### ✅ Opérationnels (v55.1)
- **Ingrédients** : CRUD, lots, multi-devises, rendements
- **Recettes** : Création, coût, assaisonnements
- **Production** : FIFO, traçabilité, opérateur optionnel
- **Packs** : Bundles, coefficient overhead, protection anti-perte
- **Ventes** : Historique, commissions vendors, statistiques
- **Dépenses** : Catégories, calcul overhead auto
- **Dashboard** : Vue d'ensemble, graphiques, KPIs
- **Rentabilité** : Analyse marges, top produits

---

## 🎨 Fonctionnalités clés v55.x

### Coefficient Overhead (v55.0)
```
Coût réel = Coût ingrédients × Coefficient
Exemple : 10€ × 1.40 = 14€ (40% overhead)
```

### Protection Anti-Perte (v54.2)
- Blocage si prix vente < coût
- Confirmation obligatoire pour accepter une perte
- Badges visuels 🟢🟡🔴

### Acteurs Optionnels (v55.1)
- Réceptionnaire, Opérateur, Vendeur : tous optionnels
- Exemples préchargés dans la démo
- Traçabilité à la carte

---

## 🔧 Configuration recommandée

### Coefficient Overhead
Selon le type d'établissement :
- **Boulangerie artisanale** : 1.30 - 1.50 (30-50%)
- **Pâtisserie haut de gamme** : 1.50 - 1.80 (50-80%)
- **Salon de thé** : 1.40 - 1.60 (40-60%)
- **Restauration collective** : 1.20 - 1.40 (20-40%)

### Commissions Vendors
Taux typiques :
- **Vendeur junior** : 3-5%
- **Vendeur confirmé** : 5-8%
- **Commercial senior** : 8-12%

---

## 📝 Notes importantes

### Traçabilité HACCP
Bien que les champs soient optionnels, **il est recommandé** de renseigner :
- Le **réceptionnaire** pour les lots (responsabilité en cas de problème)
- L'**opérateur** pour les productions (traçabilité sanitaire)

### Données de démonstration
Les données de la démo sont **fictives** mais basées sur :
- Prix réels du marché européen (EUR)
- Recettes cohérentes de pâtisserie/viennoiserie
- Rendements calculés

---

## 🆘 Support & Ressources

### Documentation
- **CHANGELOG_v55.1.md** : Détails techniques
- **GUIDE_VENDORS_STAFF.md** : Guide d'utilisation complet

### Fichiers clés à consulter
- `index.html` lignes 1479-1510 : Structure appState
- `src/core/models/Sale.js` : Modèle Vente avec vendor
- `src/core/models/Production.js` : Modèle Production avec operator
- `src/core/models/Lot.js` : Modèle Lot avec receivedBy

### Patterns de code
```javascript
// Model
class MyModel {
  constructor(data) { /* ... */ }
  toJSON() { /* ... */ }
  static fromJSON(json) { /* ... */ }
}

// Service
class MyService {
  static create(data) { /* validation + business logic */ }
  static update(item, updates) { /* ... */ }
}
```

---

## 🎯 Prochaines versions

### v56.0 (suggérée) : Modules CRUD
- Interface de gestion des **Vendors**
- Interface de gestion du **Staff**
- Statistiques par vendeur
- Rapports d'activité

### v57.0 (suggérée) : Analytics avancé
- Dashboard temps réel
- Graphiques interactifs
- Prévisions de ventes
- Alertes intelligentes

---

## 🔄 Migration

### Depuis v55.0
**Aucune action requise** ! Compatibilité totale.

### Depuis v54.x ou antérieur
1. Charger vos données existantes
2. Optionnel : Configurer vendors/staff dans les paramètres
3. Les champs acteurs seront vides (normal)

---

## 📜 Historique des versions

- **v55.1** (08/02/2026) : Acteurs optionnels + exemples vendors/staff
- **v55.0** (07/02/2026) : Coefficient Overhead
- **v54.2** (06/02/2026) : Protection Anti-Perte pour packs
- **v54.0** (05/02/2026) : Module Packs complet

---

## 💻 Stack technique

- **Frontend** : HTML/CSS/JS vanilla (pas de framework)
- **Architecture** : ES6 modules, pattern MVC-like
- **Persistance** : LocalStorage
- **Design** : Responsive, mobile-first

---

## 📄 Licence

**BusinessFood Manager** est un projet de démonstration.  
Utilisation libre pour usage personnel ou éducatif.

---

**Version** : v55.1  
**Date** : 8 février 2026  
**Taille** : ~400 KB (HTML + JS)  
**Navigateurs** : Chrome, Firefox, Safari, Edge (modernes)
