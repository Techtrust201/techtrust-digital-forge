
// API endpoint pour les requêtes de base de données
import { Client } from 'pg';

const client = new Client({
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  port: 6543,
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
  }
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    await ensureConnection();
    
    const { sql, params } = await req.json();
    
    // Sécurité basique - filtrer les requêtes dangereuses
    const dangerousKeywords = ['DROP', 'DELETE FROM auth', 'DELETE FROM storage', 'TRUNCATE'];
    const upperSql = sql.toUpperCase();
    
    if (dangerousKeywords.some(keyword => upperSql.includes(keyword))) {
      return new Response('Forbidden SQL operation', { status: 403 });
    }

    const result = await client.query(sql, params);
    
    return new Response(JSON.stringify({
      rows: result.rows,
      rowCount: result.rowCount
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({
      error: 'Database query failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
