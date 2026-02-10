# BusinessFood Manager Pro — Changelog v55.6 DEMO_POLISH

**Date :** 2026-02-10  
**Version :** v55.6-POLISH  
**Objectif :** Note globale ≥ 18/20 — stabilité, cohérence métier, ergonomie tablette, HACCP terrain

---

## ✅ PROBLÈME #1 RÉSOLU — Modules Dépenses / Fournisseurs / Clients

### Dépenses (`expenses`)
- ➕ Page `renderExpensesPage()` créée : tableau complet avec filtre par mois et total affiché
- ➕ Filtre mois natif `<input type="month">` avec recalcul automatique du total
- ➕ CRUD complet : `showNewExpenseModal()`, `editExpense()`, `deleteExpense()`
- ➕ Catégories métier : Loyer, Énergie, Salaires, Équipement, Emballages, Livraison, Marketing, Assurance, Maintenance, Autre
- ➕ Persistance `localStorage` via `saveData()`

### Fournisseurs (`suppliers`)
- ➕ Page `renderSuppliersPage()` créée : cards avec infos contact complètes
- ➕ CRUD complet : `showNewSupplierModal()`, `editSupplier()`, `deleteSupplier()`
- ➕ Export CSV : `exportSuppliers()`
- ➕ Champs : Nom, Catégorie, Contact, Téléphone, Email, Adresse, Notes

### Clients (`clients`)
- ➕ Page `renderClientsPage()` créée : cards avec historique d'achats minimal (CA cumulé)
- ➕ CRUD complet : `showNewClientModal()`, `editClient()`, `deleteClient()`
- ➕ Export CSV : `exportClients()`
- ➕ Système de tags (VIP, Professionnel, Récurrent, etc.)
- ➕ Liaison automatique avec les ventes (`clientId`)

### Routeur showPage()
- ✅ Ajout des cas `expenses → renderExpensesPage()`, `suppliers → renderSuppliersPage()`, `clients → renderClientsPage()`
- ✅ Fin du `En développement...` fantôme pour ces 3 modules

---

## ✅ PROBLÈME #2 RÉSOLU — HACCP / FIFO visible terrain

### 2.1 Boutons actions visibles
- ✅ Refonte complète des boutons sur les cards ingrédients :
  - **📊 Détails** (était 👁️ sans label)
  - **➕ Réception** (était ➕ sans label)
  - **🗑 Perte** (était ❌ sans label — couleur danger)
  - **📋 Inventaire** (était 📊 sans label)
  - **✎ Fiche** — NOUVEAU : permet de modifier nom, catégorie, seuil, rendement

### 2.2 Lots FIFO/DLC lisibles
- ✅ Tableau lots actifs enrichi dans `showIngredientDetails()` :
  - Indicateur **J-1** (badge rouge)
  - Indicateur **J-2** (badge orange)
  - Indicateur **EXPIRÉ** (badge rouge foncé)
  - Fond rouge pâle sur les lignes urgentes
  - Valeur calculée correctement (quantité × coût unitaire)

### 2.3 Perte (waste) pro — modal amélioré
- ✅ Motifs HACCP officiels : Périmé (DLC), **Chaîne du froid rompue**, Casse, Contamination/Hygiène, Problème qualité, Vol, Autre
- ✅ Bouton **🗑 Tout jeter** : remplit automatiquement la quantité avec le stock total
- ✅ Historique des pertes visible dans la modal Détails (8 dernières)

### 2.4 Inventaire physique
- ✅ Modal déjà fonctionnel (v55.5), maintenu
- ✅ `inputmode="decimal"` sur les champs numériques

---

## ✅ PROBLÈME #3 RÉSOLU — 3 tuiles HACCP Dashboard

Ajout en haut du Dashboard de 3 tuiles colorées mise à jour en temps réel :

1. **🗑 Pertes alimentaires (mois)** — valeur en € + % CA mensuel + nombre de pertes
2. **📦 Valeur stock instant T** — ingrédients + produits finis
3. **⚠️ Lots DLC urgents (J-2/J-1)** — nombre + noms + lien cliquable vers la page Ingrédients

Les tuiles se recalculent à chaque visite du Dashboard depuis les données live.

---

## ✅ PROBLÈME #4 RÉSOLU — Mode Démo & cohérence données

### Données démo réalistes
- ✅ **Lait entier liquide** : DLC dynamique à J+1 (toujours actuel)
- ✅ **Levure fraîche** : DLC dynamique à J+2 (toujours actuel)
- ✅ **1 perte démo** : Lait, motif "Chaîne du froid rompue", valeur 1 200 €
- ✅ **2 dépenses démo** : Loyer (850€) + Énergie (210€) du mois courant
- ✅ **2 fournisseurs démo** : Minoterie du Cameroun + Laiterie Centrale
- ✅ **2 clients démo** : Restaurant Le Palais (VIP) + Hôtel Azur (Professionnel)

### loadDemoData() mis à jour
- ✅ Charge maintenant : `suppliers`, `clients`, `lossHistory`, `vendors`, `staff`

---

## ✅ PROBLÈME #5 — Stabilité & Maintenabilité

### Tracking des pertes (lossHistory)
- ✅ Nouveau champ `appState.data.lossHistory[]` : enregistre chaque perte avec `{ id, timestamp, ingredientId, ingredientName, quantity, unit, reason, notes, value }`
- ✅ Le Dashboard calcule `monthLossValue` depuis ce champ
- ✅ Migrations idempotentes : `if (!appState.data.lossHistory) appState.data.lossHistory = [];`

### Nouveaux champs state
- ✅ `appState.data.suppliers` — fournisseurs
- ✅ `appState.data.clients` — clients  
- ✅ `appState.data.lossHistory` — historique pertes
- ✅ `appState.data.movements` — réservé mouvements futurs

### Migration loadData()
- ✅ Après `appState.data = saved`, injection des champs manquants si ancienne sauvegarde

### Version & Diagnostic
- ✅ Section dans Paramètres : version `v55.6-POLISH`, schemaVersion `55.6`, buildDate `2026-02-10`
- ✅ Bouton **📊 Exporter diagnostic** : JSON sans données sensibles

### Fiche ingrédient (Edit)
- ✅ Nouvelle fonction `showEditIngredientModal()` accessible depuis bouton ✎ Fiche
- ✅ Modifie : nom, catégorie, seuil alerte, rendement, type déchet

---

## 🧪 Checklist de tests manuels

| Test | Attendu |
|------|---------|
| Démo → Dashboard | 3 tuiles HACCP visibles avec valeurs |
| Démo → Ingrédients | Badges J-1/J-2 sur Lait et Levure |
| Démo → Ingrédients → Lait → 📊 Détails | Tableau lots avec badge J-1 |
| Ingrédients → Lait → 🗑 Perte | Modal avec motif "Chaîne du froid" |
| Perte "Chaîne du froid" → soumettre | Toast ✅, tuile Dashboard mise à jour |
| Perte → 🗑 Tout jeter | Quantité = stock total auto-remplie |
| Ingrédients → Lait → 📊 Détails | Section "Dernières pertes" visible |
| Ingrédients → ✎ Fiche | Édition nom/catégorie/seuil, persistance refresh |
| Ingrédients → 📋 Inventaire | Modal, ajustement stock, mouvement INVENTAIRE |
| Menu → Dépenses | Page avec filtre mois et tableau |
| Dépenses → ➕ Nouvelle | CRUD + persistance après refresh |
| Menu → Fournisseurs | Page cards fournisseurs |
| Fournisseurs → ➕ Nouveau | CRUD + persistance |
| Fournisseurs → 📤 Exporter | Téléchargement CSV |
| Menu → Clients | Page cards clients avec CA |
| Clients → ➕ Nouveau | CRUD + tags + persistance |
| Clients → 📤 Exporter | Téléchargement CSV |
| Paramètres → Version | v55.6-POLISH + bouton diagnostic |
| Paramètres → Exporter diagnostic | JSON téléchargé |
| Console navigateur | Zéro erreur ReferenceError/SyntaxError |

---

## 🔧 Fichiers modifiés

- `index.html` — Fichier principal (8 268 → 9 095 lignes, +827 lignes)

## ⚠️ Non modifié (hors scope)
- `src/core/*` — Les services restent intacts
- Système de vente / recipeDeltas — Architecture v55.5 conservée
- Module production — Inchangé

---

*Note : l'app reste offline-first. Aucune dépendance réseau ajoutée.*
