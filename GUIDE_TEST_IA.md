# 🤖 Guide pour tester BusinessFood Manager v55.1 (Pour IA)

## 🎯 Mission
Tester l'application web **BusinessFood Manager v55.1** localement sans GitHub.

---

## 📦 Étape 1 : Extraire l'archive

```bash
# Télécharger/recevoir l'archive
BusinessFood_v55_1_ACTEURS_OPTIONNELS.tar.gz

# Extraire
tar -xzf BusinessFood_v55_1_ACTEURS_OPTIONNELS.tar.gz

# Naviguer dans le dossier
cd BusinessFood_v55_1_ACTEURS_OPTIONNELS
```

**Contenu après extraction** :
```
BusinessFood_v55_1_ACTEURS_OPTIONNELS/
├── index.html              ← Application principale
├── src/                    ← Modules JavaScript
├── launch.sh              ← Script de lancement automatique
├── README.md
├── CHANGELOG_v55.1.md
└── GUIDE_VENDORS_STAFF.md
```

---

## 🚀 Étape 2 : Lancer l'application

### Option A : Script automatique (RECOMMANDÉ)
```bash
# Rendre le script exécutable (une seule fois)
chmod +x launch.sh

# Lancer sur le port 8000 (par défaut)
./launch.sh

# Ou sur un autre port
./launch.sh 3000
```

Le script **détecte automatiquement** le serveur disponible (Python, Node, PHP) et lance l'application.

### Option B : Manuel avec Python
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option C : Manuel avec Node.js
```bash
# Avec npx (pas besoin d'installer)
npx http-server -p 8000

# Ou installer puis lancer
npm install -g http-server
http-server -p 8000
```

### Option D : Manuel avec PHP
```bash
php -S localhost:8000
```

---

## 🌐 Étape 3 : Accéder à l'application

### Dans un navigateur classique
```
http://localhost:8000/index.html
```

### Avec Computer Use (Claude Desktop)
1. Utiliser l'outil `navigate` :
   ```
   navigate(url="http://localhost:8000/index.html")
   ```

2. Ou utiliser l'outil `computer` pour ouvrir le navigateur :
   ```bash
   # Linux
   xdg-open http://localhost:8000/index.html
   
   # macOS
   open http://localhost:8000/index.html
   
   # Windows
   start http://localhost:8000/index.html
   ```

---

## ✅ Étape 4 : Tester les nouveautés v55.1

### Test 1 : Charger la démo
1. Ouvrir l'application
2. Cliquer sur **Paramètres** (icône ⚙️)
3. Descendre à **Gestion des données**
4. Cliquer sur **"Charger démo Salon Moderne"**
5. Confirmer

**✅ Attendu** :
- 21 ingrédients chargés
- 7 recettes chargées
- Vendors et Staff préchargés

### Test 2 : Vérifier les Vendors
1. Aller dans **Ventes**
2. Cliquer sur **Nouvelle vente**
3. Observer le select **Vendeur**

**✅ Attendu** :
```
Aucun vendeur
Sophie Martin (5% commission)
Lucas Dubois (7% commission)
Emma Bernard (6% commission)
```

### Test 3 : Vérifier le Staff dans Production
1. Aller dans **Production**
2. Cliquer sur **Nouvelle production**
3. Observer le select **Opérateur (optionnel)**

**✅ Attendu** :
```
Qui produit ?
Marie Lefevre (Chef Pâtissier)
Thomas Petit (Commis)
Julie Moreau (Responsable Réception)
Alexandre Roux (Vendeur)
```

**✅ Validation** : Le champ est OPTIONNEL (pas de *)

### Test 4 : Vérifier le Staff dans Ingrédients
1. Aller dans **Ingrédients**
2. Cliquer sur **Ajouter ingrédient**
3. Descendre à **Réception du lot**
4. Observer le select **Réceptionnaire (optionnel)**

**✅ Attendu** :
```
Qui a réceptionné ce lot ?
Marie Lefevre (Chef Pâtissier)
Thomas Petit (Commis)
Julie Moreau (Responsable Réception)
Alexandre Roux (Vendeur)
```

**✅ Validation** : Le champ est OPTIONNEL (pas de *)

### Test 5 : Créer un lot SANS réceptionnaire
1. Dans **Ingrédients** → **Ajouter ingrédient**
2. Remplir les champs obligatoires (nom, catégorie, etc.)
3. **Laisser vide** le champ réceptionnaire
4. Cliquer sur **Créer ingrédient**

**✅ Attendu** :
- ✅ L'ingrédient est créé sans erreur
- ✅ Pas de message "Réceptionnaire obligatoire"
- ✅ L'ingrédient apparaît dans la liste

### Test 6 : Créer une production SANS opérateur
1. Dans **Production** → **Nouvelle production**
2. Sélectionner une recette
3. Définir la quantité
4. **Laisser vide** le champ opérateur
5. Cliquer sur **Produire**

**✅ Attendu** :
- ✅ La production est créée sans erreur
- ✅ Pas de message "Opérateur obligatoire"
- ✅ La production apparaît dans l'historique

### Test 7 : Créer une vente AVEC vendor
1. Dans **Ventes** → **Nouvelle vente**
2. Sélectionner un pack
3. **Sélectionner un vendeur** (ex: Sophie Martin 5%)
4. Définir quantité et prix
5. Vérifier l'aperçu de la vente

**✅ Attendu** :
```
CA Total       : 40.00€
Coût           : 14.80€
Marge brute    : 25.20€ (63%)
Commission     : 2.00€ (5%)    ← AUTO-CALCULÉE !
Bénéfice net   : 23.20€
```

---

## 🧪 Scénarios de test avancés

### Scénario A : Workflow complet sans acteurs
```
1. Créer un ingrédient (SANS réceptionnaire)
2. Créer une recette utilisant cet ingrédient
3. Produire la recette (SANS opérateur)
4. Créer un pack avec cette recette
5. Vendre le pack (SANS vendeur)
```

**✅ Attendu** : Tout fonctionne, aucun blocage

### Scénario B : Workflow complet avec acteurs
```
1. Créer un ingrédient (AVEC réceptionnaire: Julie Moreau)
2. Créer une recette
3. Produire (AVEC opérateur: Marie Lefevre)
4. Créer un pack
5. Vendre (AVEC vendeur: Sophie Martin)
```

**✅ Attendu** :
- Lot affiche "Réceptionné par Julie Moreau"
- Production affiche "Produit par Marie Lefevre"
- Vente affiche "Vendeur: Sophie Martin" + commission

### Scénario C : Mixte (optionnel utilisé partiellement)
```
1. Créer ingrédient A (SANS réceptionnaire)
2. Créer ingrédient B (AVEC réceptionnaire)
3. Recette utilisant A + B
4. Produire (AVEC opérateur)
5. Vendre (SANS vendeur)
```

**✅ Attendu** : Flexibilité totale, pas d'erreur

---

## 📊 Points de vérification

### Interface
- [ ] Labels "OBLIGATOIRE" supprimés pour réceptionnaire/opérateur
- [ ] Textes d'aide mentionnent "(optionnel)"
- [ ] Selects ont des options par défaut vides
- [ ] Staff et Vendors s'affichent correctement

### Validation
- [ ] Peut créer lot sans réceptionnaire (pas d'erreur)
- [ ] Peut produire sans opérateur (pas d'erreur)
- [ ] Peut vendre sans vendeur (commission = 0€)

### Calculs
- [ ] Commission vendeur auto-calculée
- [ ] Bénéfice net = Marge - Commission
- [ ] Commission = 0€ si pas de vendeur

### Données de démo
- [ ] 3 vendors préchargés
- [ ] 4 staff préchargés
- [ ] Quelques lots ont receivedBy

---

## 🐛 Debugging en cas de problème

### Problème : Page blanche
**Cause** : Modules ES6 bloqués avec `file://`
**Solution** : Utiliser un serveur HTTP (launch.sh)

### Problème : Erreur CORS
**Cause** : Navigateur bloque les modules locaux
**Solution** : Utiliser un serveur HTTP (launch.sh)

### Problème : Vendors/Staff vides
**Cause** : Démo pas chargée
**Solution** : Paramètres → Charger démo "Salon Moderne"

### Problème : Console errors
1. Ouvrir DevTools (F12)
2. Onglet **Console**
3. Chercher erreurs rouges
4. Partager les erreurs pour debug

---

## 📸 Screenshots attendus

### 1. Select Vendeur
![Select avec 3 vendors + "Aucun vendeur"]

### 2. Select Opérateur
![Select avec 4 staff + "Qui produit ?"]

### 3. Select Réceptionnaire
![Select avec 4 staff + "Qui a réceptionné..."]

### 4. Aperçu vente avec commission
![CA, Marge, Commission (X%), Bénéfice net]

---

## 🎯 Checklist finale

### Installation
- [ ] Archive extraite
- [ ] Serveur HTTP lancé
- [ ] Application accessible sur localhost

### Tests basiques
- [ ] Démo chargée
- [ ] Vendors visibles dans select Ventes
- [ ] Staff visible dans select Production
- [ ] Staff visible dans select Ingrédients

### Tests fonctionnels
- [ ] Lot créé SANS réceptionnaire → OK
- [ ] Production créée SANS opérateur → OK
- [ ] Vente créée SANS vendeur → OK (commission = 0€)
- [ ] Vente créée AVEC vendeur → OK (commission calculée)

### Régression (vérifier que rien n'est cassé)
- [ ] Module Ingrédients fonctionne
- [ ] Module Recettes fonctionne
- [ ] Module Production fonctionne
- [ ] Module Packs fonctionne
- [ ] Module Ventes fonctionne
- [ ] Module Dépenses fonctionne
- [ ] Module Dashboard fonctionne

---

## 💡 Commandes utiles

### Vérifier structure
```bash
ls -la
# Doit afficher: index.html, src/, README.md, etc.
```

### Vérifier port occupé
```bash
# Linux/macOS
lsof -i :8000

# Windows
netstat -ano | findstr :8000
```

### Tuer processus sur port
```bash
# Linux/macOS
kill -9 $(lsof -t -i:8000)

# Windows
# Récupérer PID avec netstat puis:
taskkill /PID <PID> /F
```

---

## 🎓 Rapport de test suggéré

Après les tests, créer un rapport :

```markdown
# Rapport de test BusinessFood v55.1

## Environnement
- OS: [Linux/macOS/Windows]
- Navigateur: [Chrome/Firefox/Safari]
- Serveur: [Python/Node/PHP]
- Port: 8000

## Tests réussis ✅
- [x] Chargement démo
- [x] Vendors affichés
- [x] Staff affiché
- [x] Lot sans réceptionnaire
- [x] Production sans opérateur
- [x] Vente avec vendor + commission
- [x] Vente sans vendor

## Tests échoués ❌
- [ ] [Description si échec]

## Bugs identifiés 🐛
- [Aucun / Liste des bugs]

## Suggestions 💡
- [Améliorations possibles]

## Screenshots
[Joindre captures d'écran]
```

---

## 🚀 Pour aller plus loin

### Après validation v55.1
1. Tester les modules existants (Ingrédients, Recettes, etc.)
2. Vérifier la compatibilité avec anciennes données
3. Tester sur différents navigateurs
4. Tester la persistence LocalStorage

### Développements futurs suggérés
1. Interface CRUD pour Vendors
2. Interface CRUD pour Staff
3. Statistiques par vendeur
4. Rapports d'activité

---

**Version** : v55.1  
**Date** : 8 février 2026  
**Pour** : IA testeur  
**Durée estimée** : 15-30 minutes
