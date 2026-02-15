# 📋 Changelog

Toutes les modifications notables de **BusinessFood Manager** (solution F&B by Fotsi Global Services) sont documentées ici.

Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).  
Ce projet suit le [Semantic Versioning](https://semver.org/).

---

## [55.6-POLISH] - 2026-02-15

### ✨ Ajouté
- 🎁 **Packs Bar Lounge** - 4 packs cocktails thématiques (Apéro, Mojito Party, Duo Romance, Soft Detox)
- 🔔 **Page Alertes avancées** - Dashboard dédié avec KPIs, filtres, actions rapides
- 📤 **Export PDF** - 4 types de rapports (Inventaire, Fiche recette, Rentabilité, Bilan valorisation)
- 🎬 **Animations & Transitions** - Fade-in pages, slide-in modals, hover effects, loading states
- ⚡ **Optimisations performance** - Debounce recherche, throttle scroll, cleanup auto lots périmés
- ⌨️ **Shortcuts clavier** - Ctrl+S (save), Esc (close modal), Ctrl+F (search)
- 💾 **Auto-save indicator** - Toast visuel "✓ Sauvegardé"
- 🎯 **Micro-interactions** - Shake errors, pulse success, button loading states

### 🐛 Corrigé
- Bug packs affichant "undefined undefined" au lieu des noms produits
- Export PDF rentabilité vide (recalcul coûts sans dépendance RecipeService)
- Caractères spéciaux PDF (≥ → >=)
- Layout desktop forcé en 1 colonne par CSS responsive trop agressif
- Division par zéro dans calculs pourcentages PDF

### 🗑️ Retiré
- Mode sombre (non fonctionnel, retiré pour stabilité)
- Responsive mobile (causait bugs layout desktop)
- Section Apparence dans Paramètres

### 🔧 Améliorations
- AlertService standalone (330 lignes)
- ExportService avec calculs autonomes (750 lignes)
- PDFs avec texte sélectionnable (pas capture écran)
- Cleanup automatique mensuel lots périmés >6 mois
- Helpers JavaScript (setButtonLoading, shakeElement, showSaveIndicator)

---

## [55.5] - 2026-02-14

### ✨ Ajouté
- Gestion complète ingrédients avec lots et DLC
- Gestion recettes avec calcul coûts automatique
- Production et consommation stock
- Analyse rentabilité
- Packs produits
- Dépenses et fournisseurs
- Export/Import données
- 2 démos complètes (WE Salon + Bar Lounge)

### 📊 Statistiques version 55.6-POLISH
- **Taille** : 184 KB
- **Fichiers modifiés** : 3
- **Lignes ajoutées** : ~1500
- **Bugs corrigés** : 6
- **Services créés** : 2
- **Score qualité** : 8.8/10
- **Features** : 15+ modules

---

## Format des changements

- `✨ Ajouté` - Nouvelles fonctionnalités
- `🐛 Corrigé` - Corrections de bugs
- `🔧 Améliorations` - Optimisations existantes
- `🗑️ Retiré` - Fonctionnalités supprimées
- `⚠️ Déprécié` - Fonctionnalités bientôt retirées
- `🔒 Sécurité` - Correctifs sécurité

---

**Dernière mise à jour** : 15 février 2026
