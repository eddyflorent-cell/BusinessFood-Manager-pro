/**
 * Modèle Pack - Ensemble de produits finis vendus ensemble
 * @module core/models/Pack
 */

/**
 * Élément d'un pack (produit + quantité)
 */
export class PackItem {
  /**
   * @param {Object} data
   * @param {string} data.productionId - ID de la production
   * @param {string} data.productionName - Nom du produit
   * @param {number} data.quantity - Quantité dans le pack
   * @param {string} data.unit - Unité
   */
  constructor(data) {
    this.productionId = data.productionId;
    this.productionName = data.productionName;
    this.quantity = Number(data.quantity);
    this.unit = data.unit;
  }

  toJSON() {
    return {
      productionId: this.productionId,
      productionName: this.productionName,
      quantity: this.quantity,
      unit: this.unit
    };
  }

  static fromJSON(json) {
    return new PackItem(json);
  }
}

/**
 * Classe Pack
 * Représente un ensemble de produits vendus ensemble
 */
export class Pack {
  /**
   * @param {Object} data
   * @param {string} data.id - ID unique
   * @param {string} data.name - Nom du pack
   * @param {string} data.description - Description
   * @param {PackItem[]} data.items - Produits inclus
   * @param {number} data.price - Prix de vente du pack
   * @param {boolean} data.active - Pack actif ?
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description || '';
    this.items = Array.isArray(data.items) ? data.items.map(i =>
      i instanceof PackItem ? i : PackItem.fromJSON(i)
    ) : [];
    this.price = Number(data.price);
    this.active = Boolean(data.active);
    this.createdAt = data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt || Date.now());
  }

  /**
   * Calcule le coût total du pack (somme des coûts recettes)
   * @param {Recipe[]} recipes - Recettes
   * @param {Ingredient[]} ingredients - Ingrédients pour calcul coût
   * @returns {number}
   */
  getCost(recipes, ingredients) {
    let totalCost = 0;
    
    for (const item of this.items) {
      // Trouver la recette
      const recipe = recipes.find(r => r.id === item.productionId);
      
      if (recipe && recipe.getCostPerUnit) {
        const costPerUnit = recipe.getCostPerUnit(ingredients);
        totalCost += costPerUnit * item.quantity;
      }
    }
    
    return totalCost;
  }

  /**
   * Calcule la marge du pack
   * @param {Recipe[]} recipes
   * @param {Ingredient[]} ingredients
   * @returns {number}
   */
  getMargin(recipes, ingredients) {
    return this.price - this.getCost(recipes, ingredients);
  }

  /**
   * Vérifie si le stock est suffisant pour le pack
   * @param {Production[]} productions
   * @returns {boolean}
   */
  hasStock(productions) {
    for (const item of this.items) {
      const availableProds = productions.filter(p => 
        p.recipeId === item.productionId && p.remainingQty > 0
      );
      
      const totalAvailable = availableProds.reduce((sum, p) => sum + p.remainingQty, 0);
      
      if (totalAvailable < item.quantity) {
        return false;
      }
    }
    
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      items: this.items.map(i => i.toJSON()),
      price: this.price,
      active: this.active,
      createdAt: this.createdAt.toISOString()
    };
  }

  static fromJSON(json) {
    return new Pack(json);
  }
}
