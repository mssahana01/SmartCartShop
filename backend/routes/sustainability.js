const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET user's sustainability dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        greenPoints: true,
        totalCO2Saved: true,
        totalPlasticSaved: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get user's eco-friendly purchases count
    const ecoOrders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: {
        orderItems: {
          include: {
            product: {
              select: { isEcoFriendly: true }
            }
          }
        }
      }
    });
    
    const ecoProductCount = ecoOrders.reduce((count, order) => {
      return count + order.orderItems.filter(item => item.product.isEcoFriendly).length;
    }, 0);
    
    // Calculate ranking
    const allUsers = await prisma.user.findMany({
      orderBy: { greenPoints: 'desc' },
      select: { id: true }
    });
    
    const userRank = allUsers.findIndex(u => u.id === req.userId) + 1;
    
    res.json({
      greenPoints: user.greenPoints || 0,
      totalCO2Saved: user.totalCO2Saved || 0,
      totalPlasticSaved: user.totalPlasticSaved || 0,
      ecoProductsPurchased: ecoProductCount,
      globalRank: userRank || 0,
      totalUsers: allUsers.length
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
});

// GET user preferences
router.get('/preferences', authMiddleware, async (req, res) => {
  try {
    let preferences = await prisma.userPreference.findUnique({
      where: { userId: req.userId }
    });
    
    if (!preferences) {
      preferences = await prisma.userPreference.create({
        data: { 
          userId: req.userId,
          packagingPreference: 'standard',
          notifyGreenDeals: true,
          showCarbonFootprint: true
        }
      });
    }
    
    res.json(preferences);
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

// UPDATE user preferences
router.put('/preferences', authMiddleware, async (req, res) => {
  try {
    const { packagingPreference, notifyGreenDeals, showCarbonFootprint } = req.body;
    
    const preferences = await prisma.userPreference.upsert({
      where: { userId: req.userId },
      update: {
        packagingPreference,
        notifyGreenDeals,
        showCarbonFootprint
      },
      create: {
        userId: req.userId,
        packagingPreference,
        notifyGreenDeals,
        showCarbonFootprint
      }
    });
    
    res.json(preferences);
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// GET leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const topUsers = await prisma.user.findMany({
      orderBy: { greenPoints: 'desc' },
      take: 10,
      select: {
        name: true,
        greenPoints: true,
        totalCO2Saved: true,
        totalPlasticSaved: true
      }
    });
    
    res.json(topUsers);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Calculate cart's environmental impact
router.get('/cart-impact', authMiddleware, async (req, res) => {
  try {
    console.log('=== CART IMPACT DEBUG ===');
    console.log('User ID from token:', req.userId);
    console.log('User role:', req.userRole);
    
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.userId },
      include: { product: true }
    });
    
    console.log('Cart items found:', cartItems.length);
    console.log('Cart items:', JSON.stringify(cartItems, null, 2));
    
    let totalCO2 = 0;
    let totalPlastic = 0;
    let ecoFriendlyCount = 0;
    
    cartItems.forEach(item => {
      totalCO2 += (item.product.carbonFootprint || 0) * item.quantity;
      totalPlastic += (item.product.plasticContent || 0) * item.quantity;
      if (item.product.isEcoFriendly) ecoFriendlyCount++;
    });
    
    // Calculate potential green points
    const potentialGreenPoints = Math.floor(ecoFriendlyCount * 10);
    
    res.json({
      totalCO2: Math.round(totalCO2 * 10) / 10, // Round to 1 decimal as number
      totalPlastic: Math.round(totalPlastic), // Round to integer as number
      ecoFriendlyItems: ecoFriendlyCount,
      totalItems: cartItems.length,
      potentialGreenPoints,
      ecoPercentage: cartItems.length > 0 ? Math.round((ecoFriendlyCount / cartItems.length) * 100) : 0
    });
  } catch (error) {
    console.error('Cart impact error:', error);
    res.status(500).json({ error: 'Failed to calculate impact' });
  }
});

module.exports = router;