
// Configuration de base de données indépendante de Supabase
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
}

// Interface pour les opérations de base de données
export interface DatabaseClient {
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  queryOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
  execute(sql: string, params?: any[]): Promise<void>;
}

// Client PostgreSQL simple utilisant fetch pour les requêtes
class PostgreSQLClient implements DatabaseClient {
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      // Pour l'instant, nous utilisons une API REST custom qui communique avec PostgreSQL
      const response = await fetch('/api/database/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql, params }),
      });

      if (!response.ok) {
        throw new Error(`Database query failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.rows || [];
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const results = await this.query<T>(sql, params);
    return results.length > 0 ? results[0] : null;
  }

  async execute(sql: string, params: any[] = []): Promise<void> {
    await this.query(sql, params);
  }
}

// Instance du client de base de données
const dbConfig: DatabaseConfig = {
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  username: 'postgres.psaacanfxpqfhrgmvjjn',
  password: 'V7KhB3zWmJ6nVLN8',
  ssl: true,
};

export const db = new PostgreSQLClient(dbConfig);
