
// API endpoint pour tester la connexion à la base de données
import { Client } from 'pg';

const client = new Client({
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  port: 5432, // Port direct PostgreSQL au lieu de 6543 (pooler)
  database: 'postgres',
  user: 'postgres.psaacanfxpqfhrgmvjjn',
  password: 'V7KhB3zWmJ6nVLN8',
  ssl: { rejectUnauthorized: false }
});

let isConnected = false;

async function ensureConnection() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log('✅ Database connected successfully');
  }
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await ensureConnection();
    
    // Test simple avec une requête sur la table user
    const result = await client.query('SELECT COUNT(*) as user_count FROM "user"');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Database connection successful',
      userCount: result.rows[0].user_count,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Database test error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
