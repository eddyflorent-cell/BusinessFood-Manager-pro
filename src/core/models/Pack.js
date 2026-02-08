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
   * @param {Object} [settings] - Paramètres (overheadCoefficient)
   * @returns {number|Object} - Coût total ou {direct, total} si showDirectCost
   */
  getCost(recipes, ingredients, settings = null) {
    let totalCost = 0;
    let totalDirectCost = 0;
    
    for (const item of this.items) {
      // Trouver la recette
      const recipe = recipes.find(r => r.id === item.productionId);
      
      if (recipe && recipe.getCostPerUnit) {
        const cost = recipe.getCostPerUnit(ingredients, settings);
        
        // Si settings.showDirectCost, cost est un objet
        if (cost && typeof cost === 'object' && cost.total !== undefined) {
          totalDirectCost += cost.direct * item.quantity;
          totalCost += cost.total * item.quantity;
        } else {
          totalCost += cost * item.quantity;
        }
      }
    }
    
    // Retourner détails si demandé
    if (settings?.showDirectCost && totalDirectCost > 0) {
      return {
        direct: totalDirectCost,
        total: totalCost,
        coefficient: settings.overheadCoefficient || 1.0
      };
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
   * @param {number} [quantity=1] - Nombre de packs à vérifier
   * @returns {boolean}
   */
  hasStock(productions, quantity = 1) {
    for (const item of this.items) {
      // ✅ BUG FIX: Utiliser p.recipeId (pas p.productionId)
      const availableProds = productions.filter(p => 
        p.recipeId === item.productionId && p.remainingQty > 0
      );
      
      const totalAvailable = availableProds.reduce((sum, p) => sum + p.remainingQty, 0);
      const required = item.quantity * quantity;
      
      if (totalAvailable < required) {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Obtient le détail de disponibilité du stock
   * @param {Production[]} productions
   * @param {number} [quantity=1] - Nombre de packs
   * @returns {Object} - {available: boolean, details: [...]}
   */
  getStockDetails(productions, quantity = 1) {
    const details = this.items.map(item => {
      const availableProds = productions.filter(p => 
        p.recipeId === item.productionId && p.remainingQty > 0
      );
      
      const totalAvailable = availableProds.reduce((sum, p) => sum + p.remainingQty, 0);
      const required = item.quantity * quantity;
      
      return {
        productionId: item.productionId,
        productionName: item.productionName,
        required,
        available: totalAvailable,
        unit: item.unit,
        sufficient: totalAvailable >= required,
        productions: availableProds.map(p => ({
          id: p.id,
          qty: p.remainingQty,
          date: p.productionDate
        }))
      };
    });
    
    return {
      available: details.every(d => d.sufficient),
      details
    };
  }
  
  /**
   * Calcule le prix suggéré basé sur le coût + marge
   * @param {Recipe[]} recipes
   * @param {Ingredient[]} ingredients
   * @param {number} [marginPercent=30] - Marge en %
   * @param {Object} [settings] - Paramètres (overheadCoefficient)
   * @returns {number}
   */
  getSuggestedPrice(recipes, ingredients, marginPercent = 30, settings = null) {
    const costResult = this.getCost(recipes, ingredients, settings);
    
    // Si c'est un objet (showDirectCost), prendre le coût total
    const cost = typeof costResult === 'object' ? costResult.total : costResult;
    
    if (cost === 0) return 0;
    
    // Prix = Coût / (1 - Marge%)
    const price = cost / (1 - marginPercent / 100);
    
    return Math.round(price * 100) / 100;
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
