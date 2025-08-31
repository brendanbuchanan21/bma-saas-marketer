import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// POST /api/auth/verify - Verify Firebase token and return user info
router.post('/verify', authenticateUser, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// GET /api/auth/profile - Get current user profile
router.get('/profile', authenticateUser, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

export default router;