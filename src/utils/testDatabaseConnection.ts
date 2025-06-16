
export const testDatabaseConnection = async () => {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test simple avec une requête basique
    const response = await fetch('/api/test-db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ test: true })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Database connection successful:', result);
      return { success: true, data: result };
    } else {
      const error = await response.text();
      console.error('❌ Database connection failed:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('❌ Database connection test error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
