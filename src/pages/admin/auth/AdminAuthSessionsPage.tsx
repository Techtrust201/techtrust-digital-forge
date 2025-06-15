
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Monitor, Smartphone, Tablet, MapPin, Clock, X } from 'lucide-react';
import { toast } from 'sonner';

interface ActiveSession {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  ipAddress: string;
  location: string;
  lastActivity: string;
  duration: number;
  isCurrentSession: boolean;
}

const AdminAuthSessionsPage = () => {
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActiveSessions();
  }, []);

  const loadActiveSessions = async () => {
    setIsLoading(true);
    try {
      // Simuler des sessions actives pour la démo
      const mockSessions: ActiveSession[] = [
        {
          id: 'session-1',
          userId: 'admin-1',
          userEmail: 'admin@techtrust.fr',
          userName: 'Admin Techtrust',
          deviceType: 'desktop',
          browser: 'Chrome 120',
          ipAddress: '192.168.1.100',
          location: 'Paris, France',
          lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          duration: 3600,
          isCurrentSession: true
        },
        {
          id: 'session-2',
          userId: 'client-business-1',
          userEmail: 'business@techtrust.fr',
          userName: 'Client Business',
          deviceType: 'mobile',
          browser: 'Safari Mobile',
          ipAddress: '192.168.1.101',
          location: 'Lyon, France',
          lastActivity: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          duration: 1800,
          isCurrentSession: false
        },
        {
          id: 'session-3',
          userId: 'manager-1',
          userEmail: 'manager@techtrust.fr',
          userName: 'Manager',
          deviceType: 'tablet',
          browser: 'Chrome Mobile',
          ipAddress: '192.168.1.102',
          location: 'Marseille, France',
          lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          duration: 2400,
          isCurrentSession: false
        }
      ];
      
      setSessions(mockSessions);
    } catch (error) {
      console.error('Erreur lors du chargement des sessions:', error);
      toast.error('Erreur lors du chargement des sessions');
    } finally {
      setIsLoading(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      // Simuler la révocation de session
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      toast.success('Session révoquée avec succès');
    } catch (error) {
      console.error('Erreur lors de la révocation:', error);
      toast.error('Erreur lors de la révocation de la session');
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getLastActivityLabel = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes}min`;
    
    const hours = Math.floor(minutes / 60);
    return `Il y a ${hours}h`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sessions Actives</h1>
          <p className="text-gray-500 mt-2">
            Surveillez et gérez toutes les sessions utilisateur actives
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sessions Actives</p>
                  <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Desktop</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sessions.filter(s => s.deviceType === 'desktop').length}
                  </p>
                </div>
                <Monitor className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Mobile</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sessions.filter(s => s.deviceType === 'mobile').length}
                  </p>
                </div>
                <Smartphone className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tablette</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sessions.filter(s => s.deviceType === 'tablet').length}
                  </p>
                </div>
                <Tablet className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions List */}
        <Card>
          <CardHeader>
            <CardTitle>Sessions Utilisateur</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Chargement des sessions...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => {
                  const DeviceIcon = getDeviceIcon(session.deviceType);
                  
                  return (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg">
                          <DeviceIcon className="w-5 h-5 text-gray-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{session.userName}</h3>
                            {session.isCurrentSession && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Session actuelle
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{session.userEmail}</p>
                          
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {session.location}
                            </span>
                            <span>{session.browser}</span>
                            <span>{session.ipAddress}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-3 h-3" />
                            {formatDuration(session.duration)}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {getLastActivityLabel(session.lastActivity)}
                          </p>
                        </div>
                        
                        {!session.isCurrentSession && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revokeSession(session.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAuthSessionsPage;
