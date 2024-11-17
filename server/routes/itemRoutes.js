const express = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Create an Item
router.post('/', authenticate, async (req, res) => {
  const { name, price, quantity, category } = req.body;

  if (!name || !price || !quantity || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newItem = await Item.create({
      name,
      price,
      quantity,
      category,
      userId: req.user.id, // Associate item with logged-in user
    });

    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Read all Items (only user's items)
router.get('/', authenticate, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id }); // Filter by userId
    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Read a single Item (only user's item)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.user.id }); // Match by item ID and userId
    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.status(200).json({ item });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update an Item (only user's item)
router.put('/:id', authenticate, async (req, res) => {
  const { name, price, quantity, category } = req.body;

  try {
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Match by item ID and userId
      { name, price, quantity, category },
      { new: true, runValidators: true }
    );

    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete an Item (only user's item)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); // Match by item ID and userId

    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
