const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (Admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      stock,
      category,
      isEcoFriendly,
      carbonFootprint,
      plasticContent,
      recyclable,
      locallySourced
    } = req.body;

    console.log('Creating product with data:', {
      name,
      description,
      price,
      imageUrl,
      stock,
      category,
      isEcoFriendly,
      carbonFootprint,
      plasticContent,
      recyclable,
      locallySourced
    });

    // Create product with all fields including sustainability
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        stock: parseInt(stock),
        category,
        // Sustainability fields with proper type conversion
        isEcoFriendly: Boolean(isEcoFriendly),
        carbonFootprint: parseFloat(carbonFootprint) || 0.0,
        plasticContent: parseFloat(plasticContent) || 0.0,
        recyclable: Boolean(recyclable),
        locallySourced: Boolean(locallySourced),
        sustainabilityScore: 0,
        ecoTags: []
      }
    });

    console.log('Product created successfully:', product);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      stock,
      category,
      isEcoFriendly,
      carbonFootprint,
      plasticContent,
      recyclable,
      locallySourced
    } = req.body;

    console.log('Updating product with data:', {
      name,
      description,
      price,
      imageUrl,
      stock,
      category,
      isEcoFriendly,
      carbonFootprint,
      plasticContent,
      recyclable,
      locallySourced
    });

    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        stock: parseInt(stock),
        category,
        // Sustainability fields with proper type conversion
        isEcoFriendly: Boolean(isEcoFriendly),
        carbonFootprint: parseFloat(carbonFootprint) || 0.0,
        plasticContent: parseFloat(plasticContent) || 0.0,
        recyclable: Boolean(recyclable),
        locallySourced: Boolean(locallySourced)
      }
    });

    console.log('Product updated successfully:', product);
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;