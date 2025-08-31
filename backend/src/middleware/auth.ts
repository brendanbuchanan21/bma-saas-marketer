import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to get or create user in database
async function getOrCreateUser(userData: {
  firebaseUid: string;
  email: string;
  name: string;
}) {
  try {
    // Try to find existing user
    let user = await prisma.user.findUnique({
      where: { firebaseUid: userData.firebaseUid }
    });

    if (!user) {
      // Create new user if doesn't exist
      const role = userData.email === 'admin@bma.com' ? 'ADMIN' : 'CLIENT';
      
      user = await prisma.user.create({
        data: {
          firebaseUid: userData.firebaseUid,
          email: userData.email,
          name: userData.name,
          role
        }
      });
    }

    return user;
  } catch (error) {
    console.error('Error getting or creating user:', error);
    throw error;
  }
}

// Initialize Firebase Admin with environment variables
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        uid: string;
        email: string;
        name: string;
        role: 'ADMIN' | 'CLIENT';
      };
    }
  }
}

/**
 * Middleware to verify Firebase ID token
 */
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No valid authorization token provided'
      });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the ID token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Get or create user in database
    const user = await getOrCreateUser({
      firebaseUid: decodedToken.uid,
      email: decodedToken.email || '',
      name: decodedToken.name || decodedToken.email || 'User'
    });
    
    // Add user info to request object
    req.user = {
      id: user.id,
      uid: user.firebaseUid,
      email: user.email,
      name: user.name,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to check if user has admin role
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Admin access required'
    });
  }

  next();
};

/**
 * Optional authentication - adds user if token present, but doesn't require it
 */
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      
      const user = await getOrCreateUser({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email || '',
        name: decodedToken.name || decodedToken.email || 'User'
      });
      
      req.user = {
        id: user.id,
        uid: user.firebaseUid,
        email: user.email,
        name: user.name,
        role: user.role
      };
    }
    
    next();
  } catch (error) {
    // If token is invalid, continue without user (optional auth)
    next();
  }
};