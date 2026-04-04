/**
 * Category Mapping Configuration
 * Maps raw MobileNet labels to standardized waste categories
 * Includes pricing, weight estimates, and CO2 savings
 */

const categoryMappings = {
  Plastic: {
    keywords: ['bottle', 'plastic', 'polyethylene', 'pet', 'pvc', 'cup', 'container', 'bag', 'film', 'wrap'],
    defaultWeight: 0.5,
    pricePerKg: 0.50,
    co2PerKg: 2.5,
    description: 'Plastic waste including bottles, containers, and packaging',
  },
  Paper: {
    keywords: ['paper', 'cardboard', 'newspaper', 'magazine', 'box', 'carton', 'document', 'envelope'],
    defaultWeight: 0.3,
    pricePerKg: 0.20,
    co2PerKg: 1.8,
    description: 'Paper and cardboard waste including packaging and documents',
  },
  Metal: {
    keywords: ['aluminum', 'can', 'steel', 'tin', 'iron', 'copper', 'metal', 'foil', 'wire'],
    defaultWeight: 0.2,
    pricePerKg: 1.20,
    co2PerKg: 8.0,
    description: 'Metal waste including aluminum cans, steel, and other metal products',
  },
  Organic: {
    keywords: ['food', 'fruit', 'vegetable', 'organic', 'waste', 'compost', 'leaves', 'grass', 'wood'],
    defaultWeight: 0.8,
    pricePerKg: 0.10,
    co2PerKg: 0.5,
    description: 'Organic waste including food scraps and garden waste',
  },
  'E-waste': {
    keywords: ['electronic', 'phone', 'computer', 'laptop', 'circuit', 'battery', 'wire', 'pcb', 'chip', 'device'],
    defaultWeight: 0.4,
    pricePerKg: 5.00,
    co2PerKg: 15.0,
    description: 'Electronic waste including phones, computers, and circuit boards',
  },
};

/**
 * Maps a raw TensorFlow.js / MobileNet label to a standardized waste category
 * @param {string} rawLabel - Raw label from TensorFlow (e.g., "plastic bottle")
 * @returns {object} Mapped category object with metadata
 */
export const mapLabelToCategory = (rawLabel) => {
  const normalizedLabel = rawLabel.toLowerCase().trim();

  // Search for matching category
  for (const [category, config] of Object.entries(categoryMappings)) {
    const isMatch = config.keywords.some((keyword) => normalizedLabel.includes(keyword));
    if (isMatch) {
      return {
        category,
        rawLabel,
        weight: config.defaultWeight,
        unit: 'kg',
        pricePerKg: config.pricePerKg,
        price: Number((config.defaultWeight * config.pricePerKg).toFixed(2)),
        co2PerKg: config.co2PerKg,
        co2Saved: Number((config.defaultWeight * config.co2PerKg).toFixed(2)),
        description: config.description,
      };
    }
  }

  // Fallback to generic category if no match found
  return {
    category: 'Plastic',
    rawLabel,
    weight: 0.5,
    unit: 'kg',
    pricePerKg: 0.30,
    price: 0.15,
    co2PerKg: 1.5,
    co2Saved: 0.75,
    description: 'Unclassified waste material',
  };
};

/**
 * Validates if a category is valid
 * @param {string} category - Category name to validate
 * @returns {boolean} True if category exists
 */
export const isValidCategory = (category) => {
  return Object.keys(categoryMappings).includes(category);
};

/**
 * Gets all available waste categories
 * @returns {array} Array of category names
 */
export const getAllCategories = () => {
  return Object.keys(categoryMappings);
};

/**
 * Recalculates pricing and CO2 based on weight
 * @param {string} category - Waste category
 * @param {number} weight - Weight in kg
 * @returns {object} Updated calculations
 */
export const calculateMetrics = (category, weight) => {
  if (!categoryMappings[category] || weight <= 0) {
    return null;
  }

  const config = categoryMappings[category];
  return {
    weight,
    price: Number((weight * config.pricePerKg).toFixed(2)),
    co2Saved: Number((weight * config.co2PerKg).toFixed(2)),
  };
};

export default {
  mapLabelToCategory,
  isValidCategory,
  getAllCategories,
  calculateMetrics,
};
