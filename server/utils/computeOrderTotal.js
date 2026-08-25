const Plant = require('../models/Plant');

async function computeOrderTotal(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('No items provided');
  }

  const resolvedItems = [];
  let totalAmount = 0;

  for (const item of items) {
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Item quantity must be at least 1');
    }

    const plantId = item.plantId || item._id;
    const plant = plantId
      ? await Plant.findById(plantId)
      : await Plant.findOne({ name: item.name });

    if (!plant) {
      throw new Error(`Plant not found for ${item.name || item.plantId || 'unknown item'}`);
    }

    resolvedItems.push({
      plantId: plant._id,
      name: plant.name,
      price: plant.price,
      quantity,
    });

    totalAmount += plant.price * quantity;
  }

  return { resolvedItems, totalAmount };
}

module.exports = computeOrderTotal;