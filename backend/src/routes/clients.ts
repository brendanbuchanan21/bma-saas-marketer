import { Router } from 'express';
import { authenticateUser, requireAdmin } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/clients - Get all clients (admin) or user's clients
router.get('/', authenticateUser, async (req, res) => {
  try {
    let clients;
    
    if (req.user?.role === 'ADMIN') {
      // Admin can see all clients
      clients = await prisma.client.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } else {
      // Regular users can only see their own clients
      clients = await prisma.client.findMany({
        where: { userId: req.user?.id || '' },
        orderBy: { createdAt: 'desc' }
      });
    }

    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch clients'
    });
  }
});

// POST /api/clients - Create new client
router.post('/', authenticateUser, async (req, res) => {
  try {
    const {
      name,
      industry,
      description,
      services = [],
      targetKeywords = [],
      brandVoice,
      website,
      linkedinProfile,
      contentPreferences = {},
      publishingSchedule = {}
    } = req.body;

    // Validate required fields
    if (!name || !industry) {
      return res.status(400).json({
        success: false,
        error: 'Business name and industry are required'
      });
    }

    // Create the client
    const client = await prisma.client.create({
      data: {
        name,
        industry,
        description: description || '',
        services,
        targetKeywords,
        brandVoice: brandVoice || '',
        website: website || '',
        linkedinProfile: linkedinProfile || '',
        contentPreferences,
        publishingSchedule,
        userId: req.user?.id || '',
        isActive: true
      }
    });

    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create client'
    });
  }
});

// GET /api/clients/:id - Get specific client
router.get('/:id', authenticateUser, (req, res) => {
  res.json({
    success: true,
    message: `Get client ${req.params.id} - coming soon`
  });
});

// PUT /api/clients/:id - Update client
router.put('/:id', authenticateUser, (req, res) => {
  res.json({
    success: true,
    message: `Update client ${req.params.id} - coming soon`
  });
});

// DELETE /api/clients/:id - Delete client (admin only)
router.delete('/:id', authenticateUser, requireAdmin, (req, res) => {
  res.json({
    success: true,
    message: `Delete client ${req.params.id} - coming soon`
  });
});

export default router;