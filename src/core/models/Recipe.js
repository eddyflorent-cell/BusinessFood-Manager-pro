/**
 * Modèle Recipe - Représente une recette avec ses ingrédients
 * @module core/models/Recipe
 */

/**
 * Ingrédient dans une recette
 */
export class RecipeIngredient {
  /**
   * @param {Object} data
   * @param {string} data.ingredientId - ID de l'ingrédient
   * @param {string} data.ingredientName - Nom de l'ingrédient
   * @param {number} data.quantity - Quantité nécessaire
   * @param {string} data.unit - Unité (kg, L, piece)
   * @param {number} data.baseQty - Quantité en unité de base (g, ml, piece)
   * @param {string} data.baseUnit - Unité de base
   */
  constructor(data) {
    this.ingredientId = data.ingredientId;
    this.ingredientName = data.ingredientName;
    this.quantity = Number(data.quantity);
    this.unit = data.unit;
    this.baseQty = Number(data.baseQty);
    this.baseUnit = data.baseUnit;
  }

  toJSON() {
    return {
      ingredientId: this.ingredientId,
      ingredientName: this.ingredientName,
      quantity: this.quantity,
      unit: this.unit,
      baseQty: this.baseQty,
      baseUnit: this.baseUnit
    };
  }

  static fromJSON(json) {
    return new RecipeIngredient(json);
  }
}

/**
 * Classe Recipe
 * Représente une recette avec liste d'ingrédients et historique de productions
 */
export class Recipe {
  /**
   * @param {Object} data
   * @param {string} data.id - ID unique
   * @param {string} data.name - Nom de la recette
   * @param {string} [data.category] - Catégorie
   * @param {RecipeIngredient[]} data.ingredients - Liste des ingrédients
   * @param {number} data.producedQty - Quantité produite par batch
   * @param {string} data.producedUnit - Unité produite (piece, kg, L)
   * @param {number} [data.preparationTime] - Temps de préparation (minutes)
   * @param {string} [data.instructions] - Instructions de préparation
   * @param {Date} [data.createdAt]
   * @param {Date} [data.updatedAt]
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category || '';
    this.ingredients = Array.isArray(data.ingredients) ? data.ingredients.map(i =>
      i instanceof RecipeIngredient ? i : RecipeIngredient.fromJSON(i)
    ) : [];
    this.producedQty = Number(data.producedQty) || 1;
    this.producedUnit = data.producedUnit || 'piece';
    this.preparationTime = Number(data.preparationTime) || 0;
    this.instructions = data.instructions || '';
    this.seasoningPercent = Number(data.seasoningPercent) || 3; // Forfait assaisonnements (sel, poivre, huile)
    this.createdAt = data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt || Date.now());
    this.updatedAt = data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt || Date.now());
  }

  /**
   * Ajoute un ingrédient à la recette
   * @param {RecipeIngredient} ingredient
   */
  addIngredient(ingredient) {
    if (!(ingredient instanceof RecipeIngredient)) {
      throw new Error('L\'ingrédient doit être une instance de RecipeIngredient');
    }
    this.ingredients.push(ingredient);
    this.updatedAt = new Date();
  }

  /**
   * Retire un ingrédient de la recette
   * @param {string} ingredientId
   */
  removeIngredient(ingredientId) {
    const index = this.ingredients.findIndex(i => i.ingredientId === ingredientId);
    if (index !== -1) {
      this.ingredients.splice(index, 1);
      this.updatedAt = new Date();
    }
  }

  /**
   * Trouve un ingrédient dans la recette
   * @param {string} ingredientId
   * @returns {RecipeIngredient|undefined}
   */
  findIngredient(ingredientId) {
    return this.ingredients.find(i => i.ingredientId === ingredientId);
  }

  /**
   * Calcule la quantité d'ingrédients nécessaire pour un multiplicateur
   * @param {number} multiplier - Multiplicateur (ex: 3 pour 3 batches)
   * @returns {Object[]} - [{ingredientId, baseQty}, ...]
   */
  getRequiredIngredients(multiplier = 1) {
    return this.ingredients.map(ing => ({
      ingredientId: ing.ingredientId,
      ingredientName: ing.ingredientName,
      baseQty: ing.baseQty * multiplier,
      baseUnit: ing.baseUnit
    }));
  }

  /**
   * Vérifie si la recette est valide (au moins 1 ingrédient)
   * @returns {boolean}
   */
  isValid() {
    return this.ingredients.length > 0 && this.producedQty > 0;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      ingredients: this.ingredients.map(i => i.toJSON()),
      producedQty: this.producedQty,
      producedUnit: this.producedUnit,
      preparationTime: this.preparationTime,
      instructions: this.instructions,
      seasoningPercent: this.seasoningPercent,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  /**
   * Calcule le coût par unité de la recette basé sur les ingrédients
   * Formule PRO : (Prix / Rendement) × Quantité × (1 + Assaisonnement%)
   * @param {Ingredient[]} ingredients - Liste des ingrédients avec stock/prix
   * @returns {number}
   */
  getCostPerUnit(ingredients) {
    let totalCost = 0;
    
    for (const recipeIng of this.ingredients) {
      const ingredient = ingredients.find(i => i.id === recipeIng.ingredientId);
      if (ingredient && ingredient.lots && ingredient.lots.length > 0) {
        // Utiliser prix moyen pondéré des lots disponibles
        const totalQty = ingredient.lots.reduce((sum, lot) => sum + lot.quantite, 0);
        const totalValue = ingredient.lots.reduce((sum, lot) => {
          const unitPrice = lot.quantite > 0 ? (lot.prixTotal + lot.fraisApproche) / lot.quantiteInitiale : 0;
          return sum + (lot.quantite * unitPrice);
        }, 0);
        const avgPricePerBaseUnit = totalQty > 0 ? totalValue / totalQty : 0;
        
        // FORMULE PRO : Prendre en compte le rendement (perte)
        // Si rendement = 70%, on doit acheter 100g pour avoir 70g net
        // Donc coût réel = prix / (rendement / 100)
        const yieldPercent = ingredient.yieldPercent || 100;
        const realPricePerBaseUnit = avgPricePerBaseUnit / (yieldPercent / 100);
        
        totalCost += realPricePerBaseUnit * recipeIng.baseQty;
      }
    }
    
    // Ajouter forfait assaisonnements (sel, poivre, huile, etc.)
    // Ex: 3% du coût total
    const seasoningMultiplier = 1 + (this.seasoningPercent / 100);
    const totalCostWithSeasoning = totalCost * seasoningMultiplier;
    
    return this.producedQty > 0 ? totalCostWithSeasoning / this.producedQty : 0;
  }

  static fromJSON(json) {
    return new Recipe({
      id: json.id,
      name: json.name,
      category: json.category,
      ingredients: json.ingredients || [],
      producedQty: json.producedQty,
      producedUnit: json.producedUnit,
      preparationTime: json.preparationTime,
      instructions: json.instructions,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt
    });
  }
}
