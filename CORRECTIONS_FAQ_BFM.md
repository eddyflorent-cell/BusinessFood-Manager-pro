# ⚠️ Corrections à apporter au document bfm-offre-faq.html

## 🔴 SUPPRESSIONS OBLIGATOIRES (promesses non tenues)

### 1. Supprimer section "Multi-sites" (lignes 582-598)
**Raison** : BFM v55.1 ne gère PAS le multi-sites

```html
<!-- À SUPPRIMER -->
<h3>Multi-sites et concepts</h3>
<div class="faq-item">
  <div class="faq-question">BFM convient-il si j'ai plusieurs restaurants ou concepts&nbsp;?</div>
  ...
</div>
```

**Alternative** : Mentionner comme "roadmap" ou "à venir"

---

### 2. Modifier "Connexion POS" (ligne 427-429)
**Texte actuel** :
```
Connexion avec vos données de ventes (export POS / intégrations) 
pour rapprocher ventes et coût matière.
```

**Correction** :
```
Saisie de vos données de ventes pour rapprocher ventes et coût matière. 
Import CSV possible depuis votre POS.
```

**Raison** : Pas d'intégration automatique, seulement saisie manuelle ou import

---

### 3. Modifier "Paramétrage profils" (ligne 421)
**Texte actuel** :
```
Paramétrage de l'outil : sites, familles, TVA, profils utilisateurs.
```

**Correction** :
```
Paramétrage de l'outil : catégories, devises, coefficient overhead.
```

**Raison** : Pas de gestion profils/permissions dans v55.1

---

### 4. Modifier "Accès sécurisé" (ligne 628-632)
**Texte actuel** :
```
La logique standard d'un SaaS de gestion inclut connexions sécurisées, 
sauvegardes régulières et séparation des données par client.
```

**Correction** :
```
Application web moderne utilisant le stockage local de votre navigateur. 
Vos données restent sur votre appareil. Export/Sauvegarde manuelle recommandée.
```

**Raison** : LocalStorage, pas de backend cloud

---

## 🟡 AJUSTEMENTS RECOMMANDÉS

### 5. Préciser "Module Stocks" (lignes 602-616)
**Texte actuel** : Suggère un module stocks complet

**Ajout à faire** :
```html
<div class="faq-item">
  <div class="faq-question">BFM gère-t-il mes inventaires physiques ?</div>
  <div class="faq-answer">
    BFM suit les lots d'ingrédients (quantités, DLC, FIFO) et consomme 
    automatiquement le stock lors des productions. Pour les inventaires 
    physiques et écarts de stock, une saisie manuelle est nécessaire.
  </div>
</div>
```

---

### 6. Ajouter section "Données et Sauvegarde"
**À insérer dans FAQ** :

```html
<h3>Données et sauvegarde</h3>

<div class="faq-item">
  <div class="faq-question">Où sont stockées mes données ?</div>
  <div class="faq-answer">
    BFM utilise le LocalStorage de votre navigateur. Vos données restent 
    sur votre appareil et ne sont pas envoyées vers un serveur externe.
  </div>
</div>

<div class="faq-item">
  <div class="faq-question">Comment sauvegarder mes données ?</div>
  <div class="faq-answer">
    Utilisez la fonction Export dans Paramètres pour télécharger 
    une copie JSON de toutes vos données. Conservez-la précieusement.
  </div>
</div>

<div class="faq-item">
  <div class="faq-question">Puis-je utiliser BFM sur plusieurs appareils ?</div>
  <div class="faq-answer">
    Chaque navigateur/appareil a son propre stockage local. Pour synchroniser, 
    exportez vos données depuis un appareil et importez-les sur l'autre.
  </div>
</div>
```

---

### 7. Préciser "Support" (lignes 635-640)
**Texte actuel** : Suggère un support client dédié

**Correction** :
```html
<div class="faq-item">
  <div class="faq-question">Que se passe-t-il si j'ai une question ?</div>
  <div class="faq-answer">
    Une documentation complète est disponible. Pour les questions 
    d'utilisation ou suggestions d'amélioration, contactez-nous 
    par email à [votre-email].
  </div>
</div>
```

---

## 🟢 À AJOUTER (valoriser ce qui existe)

### 8. Nouvelle section "Coefficient Overhead"
**À insérer dans FAQ** :

```html
<h3>Coefficient Overhead et coûts réels</h3>

<div class="faq-item">
  <div class="faq-question">Qu'est-ce que le coefficient overhead ?</div>
  <div class="faq-answer">
    Le coefficient overhead intègre vos dépenses fixes (loyer, salaires, 
    électricité) dans le calcul du coût réel de production. 
    Par exemple : coût ingrédients 10€ × coefficient 1.40 = coût réel 14€.
  </div>
</div>

<div class="faq-item">
  <div class="faq-question">Pourquoi est-ce important ?</div>
  <div class="faq-answer">
    Le coût ingrédients seul ne suffit pas. Le coefficient overhead vous donne 
    le VRAI coût de production incluant toutes vos charges, pour fixer 
    des prix de vente rentables.
  </div>
</div>

<div class="faq-item">
  <div class="faq-question">Comment calculer mon coefficient ?</div>
  <div class="faq-answer">
    BFM peut le calculer automatiquement : 1 + (Total dépenses / CA).
    Ou configurez-le manuellement selon votre type d'établissement.
  </div>
</div>
```

---

### 9. Nouvelle section "Protection Anti-Perte"
**À insérer dans FAQ** :

```html
<h3>Protection anti-perte</h3>

<div class="faq-item">
  <div class="faq-question">Comment BFM m'évite de vendre à perte ?</div>
  <div class="faq-answer">
    Lors de la création d'un pack, BFM bloque automatiquement si le prix 
    de vente est inférieur au coût réel. Un badge visuel (🟢🟡🔴) 
    indique immédiatement la rentabilité.
  </div>
</div>

<div class="faq-item">
  <div class="faq-question">Puis-je quand même vendre à perte si je veux ?</div>
  <div class="faq-answer">
    Oui, mais BFM vous demande une confirmation explicite pour 
    s'assurer que c'est un choix conscient (promotion, produit d'appel, etc.).
  </div>
</div>
```

---

### 10. Nouvelle section "Vendors & Équipe"
**À insérer dans FAQ** :

```html
<h3>Gestion de l'équipe et commissions vendeurs</h3>

<div class="faq-item">
  <div class="faq-question">Puis-je suivre mes vendeurs et leurs commissions ?</div>
  <div class="faq-answer">
    Oui. BFM permet de configurer des vendeurs avec des taux de commission. 
    Lors d'une vente, la commission est calculée automatiquement et le 
    bénéfice net tient compte de cette commission.
  </div>
</div>

<div class="faq-item">
  <div class="faq-question">Puis-je tracer qui a produit ou réceptionné ?</div>
  <div class="faq-answer">
    Oui (optionnel). BFM permet d'associer un opérateur à chaque production 
    et un réceptionnaire à chaque lot pour une traçabilité HACCP complète.
  </div>
</div>
```

---

## 📊 Résumé des corrections

### À SUPPRIMER / MODIFIER
- ❌ Multi-sites (supprimer)
- ⚠️ Intégration POS automatique (nuancer)
- ⚠️ Profils utilisateurs (remplacer par catégories/devises)
- ⚠️ Sauvegardes cloud (remplacer par LocalStorage + export)
- ⚠️ Support client dédié (nuancer)

### À AJOUTER
- ✅ Coefficient Overhead (force de BFM)
- ✅ Protection Anti-Perte (force de BFM)
- ✅ Vendors & Commissions (nouveauté v55.1)
- ✅ Traçabilité optionnelle (nouveauté v55.1)
- ✅ Section Données/Sauvegarde (important)

---

## 🎯 Verdict global

**Le document est à 70% juste** mais survend certaines fonctionnalités non implémentées :

### ✅ Honnête sur :
- Fiches techniques ✅
- Calcul coûts ✅
- Import ingrédients ✅
- Food cost & marges ✅

### ❌ Trompeur sur :
- Multi-sites ❌ (n'existe pas)
- Intégration POS auto ❌ (seulement import CSV)
- Profils utilisateurs ❌ (pas d'auth)
- Cloud/Sauvegardes ❌ (LocalStorage seulement)

### 😐 Imprécis sur :
- Stocks (existe partiellement)
- Dashboard (existe mais basique)

---

**Recommandation** : Créer **2 versions** du document :
1. **Version "Actuellement"** → Ce que v55.1 fait vraiment
2. **Version "Roadmap"** → Ce qui sera développé (multi-sites, POS, cloud)

Veux-tu que je te génère une version corrigée complète du HTML ?
