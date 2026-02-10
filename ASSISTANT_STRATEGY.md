# 🧙 Stratégie Assistant d'Import

## ❓ Question : Champs manquants

### Champs actuels (5)
✅ Nom  
✅ Catégorie  
✅ Quantité  
✅ Unité  
✅ Prix  
✅ Fournisseur (optionnel)

### Champs absents
❌ DLC (Date Limite Consommation)  
❌ Date réception  
❌ Frais d'approche  
❌ Rendement (%)  
❌ Type perte  
❌ Numéro de lot  
❌ Réceptionnaire  
❌ Seuil alerte stock

---

## 💡 3 Options possibles

### Option A : Garder simple (RECOMMANDÉ)
**Philosophie** : "Quick start, raffiner après"

**Champs assistant** : 5 essentiels (actuels)  
**Valeurs par défaut** :
```javascript
DLC: +1 an
Date réception: Aujourd'hui
Frais d'approche: 0€
Rendement: 100%
Type perte: Aucune
Seuil alerte: Auto (1kg solides, 1L liquides, 5 pièces)
```

**Avantages** :
- ✅ Rapide (30 sec par ingrédient)
- ✅ Pas intimidant pour débutants
- ✅ Permet d'importer 20-30 ingrédients facilement
- ✅ Édition possible après pour affiner

**Inconvénients** :
- ⚠️ Données imprécises initialement
- ⚠️ Nécessite édition manuelle pour HACCP strict

---

### Option B : Formulaire complet
**Philosophie** : "Tout remplir dès le départ"

**Champs assistant** : 13 champs (tous)

**Avantages** :
- ✅ Données complètes dès l'import
- ✅ Conforme HACCP immédiatement
- ✅ Pas besoin d'éditer après

**Inconvénients** :
- ❌ Long (2-3 min par ingrédient)
- ❌ Complexe (13 champs = scary)
- ❌ Tue l'intérêt de l'assistant vs CSV

---

### Option C : Mode expert optionnel (COMPROMIS)
**Philosophie** : "Simple par défaut, détails si besoin"

**Flow** :
```
Étape 1: Accueil + choix
  [ ] Mode rapide (5 champs)
  [ ] Mode expert (13 champs)

Si Mode rapide → Formulaire 5 champs
Si Mode expert → Formulaire 13 champs
```

**Avantages** :
- ✅ Flexibilité max
- ✅ Simple pour débutants
- ✅ Complet pour pros

**Inconvénients** :
- ⚠️ Plus complexe à coder
- ⚠️ Peut créer confusion sur le choix

---

## 🎯 Recommandation finale

### Option A + Amélioration UX

**Garder l'assistant simple (5 champs)** mais :

1. **Message informatif** dans l'assistant :
```
💡 Astuce : Les détails avancés (DLC, frais, etc.) 
peuvent être ajoutés plus tard en éditant chaque ingrédient.
```

2. **Valeurs par défaut intelligentes** :
```javascript
DLC: 
- Sec (farines, sucres) → +2 ans
- Frais (beurre, lait) → +1 mois
- Surgelés → +6 mois

Seuil alerte:
- Basé sur la quantité moyenne achetée
```

3. **Bouton "Éditer" visible** après import :
```
✅ 20 ingrédients importés !

[🔍 Réviser maintenant]  [✅ C'est bon]
```

4. **Guide post-import** :
```
📋 Prochaines étapes (optionnel) :
1. Ajouter les DLC précises
2. Configurer les seuils d'alerte
3. Ajouter les réceptionnaires
```

---

## 📊 Comparaison workflow

### Workflow actuel (Option A)
```
1. Clic "Assistant"
2. Formulaire 5 champs × 20 ingrédients = 10 min
3. Import
4. [Optionnel] Éditer 3-4 ingrédients critiques = 5 min
Total: 15 min pour 20 ingrédients ✅
```

### Workflow Option B (complet)
```
1. Clic "Assistant"
2. Formulaire 13 champs × 20 ingrédients = 40 min
Total: 40 min pour 20 ingrédients ❌
```

### Workflow CSV actuel
```
1. Télécharger modèle
2. Ouvrir Excel
3. Remplir 6 colonnes × 20 lignes = 15 min
4. Sauvegarder CSV
5. Importer
Total: 20 min pour 20 ingrédients ⚠️
```

---

## 🚀 Plan d'action

### Court terme (v55.4 actuel)
✅ Garder assistant simple  
✅ Valeurs par défaut intelligentes  
✅ Message info sur édition post-import

### Moyen terme (v56.0)
- [ ] Ajouter toggle "Mode expert" dans l'assistant
- [ ] Formulaire conditionnel (5 ou 13 champs)
- [ ] Détection auto DLC (selon catégorie)

### Long terme (v57.0)
- [ ] Import photo étiquette → OCR DLC
- [ ] Synchronisation fournisseurs API
- [ ] Suggestions prix basées sur historique

---

## ✨ Conclusion

**Réponse à "À quel moment on remplit DLC, frais d'approche, etc. ?"**

### Dans l'assistant actuel :
- ❌ **Pas remplis** (valeurs par défaut)
- ✅ **Après import** via édition manuelle

### Alternative si tu veux :
Je peux ajouter **Option C** (choix mode rapide/expert) en 15 min.

**Que préfères-tu ?**
- A = Garder simple (comme maintenant)
- C = Ajouter choix rapide/expert à l'étape 1

---

**Version** : v55.4  
**Date** : 8 février 2026  
**Status** : En discussion 💬
