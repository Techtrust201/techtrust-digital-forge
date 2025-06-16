
import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Liste des origines autorisées
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'https://preview--techtrust-digital-forge.lovable.app',
  'https://www.tech-trust.fr'
];

// Configuration CORS appropriée pour les cookies
app.use(cors({
  origin: (origin, callback) => {
    // Permet les requêtes sans origin (ex: Postman, mobile apps)
    if (!origin) return callback(null, true);
    
    // Vérifie si l'origin est dans la liste autorisée
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // Permet l'envoi de cookies
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Gestion explicite des requêtes OPTIONS (preflight)
app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));

// Handler Better Auth
app.all('/api/auth/*', toNodeHandler(auth));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Auth server running on port ${PORT}`);
  console.log(`📍 Auth endpoints available at /api/auth/*`);
  console.log(`🌐 Allowed origins:`, allowedOrigins);
});
