
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { Lock } from 'lucide-react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setError('');
    
    // Simple validation - normally this would be handled by a real authentication system
    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    // Demo authentication - NEVER do this in a real app, this is just for the demo
    // In a real app, you'd validate against an API
    if (username === 'admin' && password === 'admin123') {
      onAuthenticated();
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Lock className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm mb-4">
          {error}
        </div>
      )}
      
      <div>
        <Label htmlFor="username">Nom d'utilisateur</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
        />
      </div>
      
      <div>
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      
      <DialogFooter>
        <Button type="submit">Se connecter</Button>
      </DialogFooter>
      
      <div className="text-center text-sm text-gray-500 pt-2">
        <p>Pour la démo, utilisez:</p>
        <p>Utilisateur: <code className="bg-gray-100 px-1 rounded">admin</code></p>
        <p>Mot de passe: <code className="bg-gray-100 px-1 rounded">admin123</code></p>
      </div>
    </form>
  );
};

export default AdminAuth;
