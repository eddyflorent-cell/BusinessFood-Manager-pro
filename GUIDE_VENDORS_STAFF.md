# 👥 Guide - Gestion de l'Équipe et des Vendeurs

## 📋 Vue d'ensemble

BusinessFood Manager v55.1 permet de gérer deux types d'acteurs :
- **Staff (Équipe)** : Personnel impliqué dans la production et la réception
- **Vendors (Vendeurs)** : Personnel commercial avec système de commissions

---

## 👨‍🍳 Staff (Équipe)

### Rôles disponibles
- **Chef Pâtissier** : Responsable de la production
- **Commis** : Aide à la production et à la réception
- **Responsable Réception** : Gère l'arrivée des marchandises
- **Vendeur** : Personnel de vente (peut aussi être vendor)

### Utilisation dans l'application

#### 1. **Module Ingrédients - Réception de lots**
Lors de l'ajout d'un nouvel ingrédient avec son premier lot :
```
┌─────────────────────────────────────┐
│ Réceptionnaire (optionnel)          │
├─────────────────────────────────────┤
│ Qui a réceptionné ce lot ?       ▼ │
│  → Julie Moreau (Responsable Récep.)│
│  → Thomas Petit (Commis)            │
│  → Marie Lefevre (Chef Pâtissier)   │
└─────────────────────────────────────┘
```

**Pourquoi ?**
- ✅ Traçabilité HACCP : Savoir qui a vérifié la livraison
- ✅ Responsabilité : En cas de problème, identifier le réceptionnaire
- ✅ Contrôle qualité : Associer une personne à chaque lot

**Note** : Le champ est optionnel. Vous pouvez laisser vide si non nécessaire.

#### 2. **Module Production**
Lors de la production d'une recette :
```
┌─────────────────────────────────────┐
│ Opérateur (optionnel)               │
├─────────────────────────────────────┤
│ Qui produit ?                    ▼  │
│  → Marie Lefevre (Chef Pâtissier)   │
│  → Thomas Petit (Commis)            │
└─────────────────────────────────────┘
```

**Pourquoi ?**
- ✅ Traçabilité : Savoir qui a fabriqué le produit
- ✅ Qualité : Suivre les productions par opérateur
- ✅ Formation : Identifier qui a besoin de formation
- ✅ Statistiques : Nombre de productions par personne

**Note** : Le champ est optionnel. Vous pouvez laisser vide si non nécessaire.

---

## 💼 Vendors (Vendeurs)

### Qu'est-ce qu'un Vendor ?
Un **vendor** est un vendeur avec un **taux de commission** sur les ventes qu'il réalise.

### Configuration
Chaque vendor a :
- **Nom** : Prénom + Nom
- **Taux de commission** : Pourcentage du CA (ex: 5%)
- **Statut** : Actif / Inactif

### Exemples dans la démo
```javascript
Sophie Martin    → 5% de commission
Lucas Dubois     → 7% de commission
Emma Bernard     → 6% de commission
```

### Utilisation dans le module Ventes

#### Créer une vente avec vendor
```
┌─────────────────────────────────────┐
│ Pack à vendre                       │
├─────────────────────────────────────┤
│ Brunch Gourmand (20.00€)         ▼  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Vendeur                             │
├─────────────────────────────────────┤
│ Aucun vendeur                    ▼  │
│  → Sophie Martin (5% commission)    │
│  → Lucas Dubois (7% commission)     │
│  → Emma Bernard (6% commission)     │
└─────────────────────────────────────┘

Prix unitaire : 20.00€
Quantité      : 2

┌─────────────────────────────────────┐
│ Aperçu de la vente                  │
├─────────────────────────────────────┤
│ CA Total       : 40.00€             │
│ Coût           : 14.80€             │
│ Marge brute    : 25.20€ (63%)       │
│ Commission     : 2.00€ (5%)         │ ← Auto-calculée
│ Bénéfice net   : 23.20€             │
└─────────────────────────────────────┘
```

#### Calcul automatique de la commission
```javascript
CA = 40.00€
Taux = 5%
Commission = 40.00€ × 5% = 2.00€
Bénéfice net = Marge - Commission = 25.20€ - 2.00€ = 23.20€
```

### Vente sans vendor
Si vous ne sélectionnez **aucun vendeur** :
- Commission = 0€
- Bénéfice net = Marge brute
- Pas de suivi par vendeur

**Cas d'usage** :
- Vente en ligne (pas de vendeur physique)
- Vente par borne automatique
- Vente au comptoir sans attribution

---

## 🎯 Bonnes pratiques

### Pour le Staff

#### ✅ À FAIRE
- Créer un compte par personne réelle
- Utiliser des rôles descriptifs (Chef, Commis, etc.)
- Renseigner le réceptionnaire pour les livraisons importantes
- Renseigner l'opérateur pour les productions à haute valeur

#### ❌ À ÉVITER
- Créer des comptes génériques ("Equipe", "Staff")
- Mélanger les rôles (un chef n'est pas un commis)
- Ne jamais renseigner les acteurs (perte de traçabilité)

### Pour les Vendors

#### ✅ À FAIRE
- Configurer un taux de commission réaliste (3-10% typique)
- Attribuer les ventes au bon vendeur
- Suivre les statistiques par vendeur pour les primes
- Désactiver (au lieu de supprimer) les anciens vendeurs

#### ❌ À ÉVITER
- Taux de commission trop élevé (>15%)
- Oublier d'attribuer les ventes (statistiques faussées)
- Créer plusieurs comptes pour la même personne

---

## 📊 Statistiques disponibles

### Par Staff
- Nombre de lots réceptionnés
- Nombre de productions réalisées
- Valeur totale des productions
- Taux d'erreur / retours

### Par Vendor
- Nombre de ventes réalisées
- CA généré
- Commission totale gagnée
- Taux de conversion
- Produits les plus vendus

**Note** : Ces statistiques seront disponibles dans le module **Dashboard** (à venir).

---

## 🔧 Gestion future (modules à développer)

### Module Staff (à venir)
```
┌─────────────────────────────────────┐
│ Gestion de l'Équipe                 │
├─────────────────────────────────────┤
│ [+] Ajouter un membre               │
│                                     │
│ 👤 Marie Lefevre                    │
│    Chef Pâtissier                   │
│    Actif • Depuis 10/01/2026        │
│    [Modifier] [Désactiver]          │
│                                     │
│ 👤 Thomas Petit                     │
│    Commis                           │
│    Actif • Depuis 10/01/2026        │
│    [Modifier] [Désactiver]          │
└─────────────────────────────────────┘
```

### Module Vendors (à venir)
```
┌─────────────────────────────────────┐
│ Gestion des Vendeurs                │
├─────────────────────────────────────┤
│ [+] Ajouter un vendeur              │
│                                     │
│ 💼 Sophie Martin                    │
│    Commission : 5%                  │
│    CA ce mois : 1,245€ (18 ventes)  │
│    [Modifier] [Statistiques]        │
│                                     │
│ 💼 Lucas Dubois                     │
│    Commission : 7%                  │
│    CA ce mois : 2,890€ (31 ventes)  │
│    [Modifier] [Statistiques]        │
└─────────────────────────────────────┘
```

---

## 🎓 Exemples d'utilisation

### Scénario 1 : Petite pâtisserie artisanale
- **Staff** : 1 chef + 1 apprenti
- **Vendors** : Pas de vendeurs (vente directe au comptoir)
- **Usage** :
  - Réceptionne tous les lots (chef ou apprenti)
  - Produit avec opérateur (pour tracer qui a fait quoi)
  - Vend sans vendor (pas de commission)

### Scénario 2 : Salon de thé avec personnel commercial
- **Staff** : 1 chef + 2 commis + 1 réceptionnaire
- **Vendors** : 3 vendeurs avec commissions différentes
- **Usage** :
  - Réception dédiée (responsable réception)
  - Production avec opérateur (chef ou commis)
  - Vente avec attribution vendeur (suivi des performances)

### Scénario 3 : Entreprise de restauration collective
- **Staff** : 2 chefs + 5 commis + 1 responsable réception
- **Vendors** : Pas de vendeurs (service inclus dans contrat)
- **Usage** :
  - Réception centralisée (responsable réception)
  - Production en équipe (chaque opérateur trace ses productions)
  - Vente sans vendor (facturation globale au client)

---

## 🔗 Intégration avec les autres modules

### Liens Ingrédients ↔ Staff
```
Lot de Farine T45
├── Réceptionné par : Julie Moreau
├── Date réception  : 01/02/2026
└── Fournisseur     : Metro Cash & Carry
```

### Liens Production ↔ Staff
```
Production : Croissant
├── Produit par  : Marie Lefevre
├── Date         : 07/02/2026 08:30
├── Quantité     : 50 pièces
└── Coût total   : 47.50€
```

### Liens Ventes ↔ Vendors
```
Vente #12345
├── Vendeur      : Sophie Martin
├── Commission   : 5% (2.50€)
├── CA           : 50.00€
├── Bénéfice net : 27.50€
└── Date         : 08/02/2026 14:15
```

---

## 💡 FAQ

### Q : Dois-je obligatoirement renseigner un réceptionnaire ?
**R** : Non, c'est optionnel depuis la v55.1. Mais c'est recommandé pour la traçabilité HACCP.

### Q : Puis-je avoir un staff qui est aussi vendor ?
**R** : Oui ! Par exemple, Alexandre Roux est "Vendeur" dans le staff ET peut être configuré comme vendor avec une commission.

### Q : Que se passe-t-il si je ne sélectionne pas de vendor lors d'une vente ?
**R** : La vente est enregistrée avec commission = 0€, et le bénéfice net = marge brute.

### Q : Puis-je modifier le taux de commission d'un vendor ?
**R** : Actuellement non (pas d'interface de gestion). Mais ce sera possible dans le module Vendors à venir.

### Q : Comment désactiver un membre du staff ou un vendor ?
**R** : Actuellement, vous devez modifier manuellement `active: false` dans les données. L'interface CRUD sera disponible prochainement.

### Q : Les commissions sont-elles déduites du bénéfice ?
**R** : Oui ! Le **bénéfice net** = Marge brute - Commission. C'est le vrai profit après rémunération du vendeur.

---

## 📚 Ressources complémentaires

- **CHANGELOG_v55.1.md** : Détails techniques des modifications
- **Module Paramètres** : Configuration des taux, devises, etc.
- **Module Ventes** : Documentation du calcul des commissions
- **HACCP Guidelines** : Normes de traçabilité alimentaire

---

**Version** : v55.1  
**Date** : 8 février 2026  
**Auteur** : BusinessFood Manager Team
