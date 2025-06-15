
import { useState } from 'react';
import { toast } from 'sonner';

export const useSystemActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveConfiguration = async (configData: any) => {
    setIsLoading(true);
    try {
      localStorage.setItem('system_config', JSON.stringify({
        ...configData,
        updatedAt: new Date().toISOString()
      }));
      
      toast.success('Configuration sauvegardée');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshLogs = async () => {
    setIsLoading(true);
    try {
      // Simulation de rechargement des logs
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockLogs = [
        { id: 1, timestamp: new Date().toISOString(), level: 'INFO', message: 'Système démarré avec succès' },
        { id: 2, timestamp: new Date(Date.now() - 60000).toISOString(), level: 'WARNING', message: 'Utilisation mémoire élevée' },
        { id: 3, timestamp: new Date(Date.now() - 120000).toISOString(), level: 'ERROR', message: 'Connexion base de données échouée' }
      ];
      
      localStorage.setItem('system_logs', JSON.stringify(mockLogs));
      toast.success('Logs actualisés');
      return mockLogs;
    } catch (error) {
      toast.error('Erreur lors de l\'actualisation');
    } finally {
      setIsLoading(false);
    }
  };

  const exportLogs = async () => {
    setIsLoading(true);
    try {
      const logs = JSON.parse(localStorage.getItem('system_logs') || '[]');
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Timestamp,Level,Message\n"
        + logs.map((log: any) => `${log.timestamp},${log.level},"${log.message}"`).join("\n");
      
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `system-logs-${new Date().toISOString().split('T')[0]}.csv`);
      link.click();
      
      toast.success('Logs exportés');
    } catch (error) {
      toast.error('Erreur lors de l\'export');
    } finally {
      setIsLoading(false);
    }
  };

  const createBackup = async () => {
    setIsLoading(true);
    try {
      // Simulation de création de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const existingBackups = JSON.parse(localStorage.getItem('system_backups') || '[]');
      const newBackup = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Backup-${new Date().toISOString().split('T')[0]}`,
        createdAt: new Date().toISOString(),
        size: Math.floor(Math.random() * 1000) + 100 + ' MB',
        status: 'completed'
      };
      
      const updatedBackups = [newBackup, ...existingBackups];
      localStorage.setItem('system_backups', JSON.stringify(updatedBackups));
      
      toast.success('Sauvegarde créée avec succès');
      return newBackup;
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const runSecurityAudit = async () => {
    setIsLoading(true);
    try {
      // Simulation d'audit de sécurité
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const auditResults = {
        timestamp: new Date().toISOString(),
        vulnerabilities: Math.floor(Math.random() * 3),
        warnings: Math.floor(Math.random() * 5),
        status: 'completed',
        recommendations: [
          'Mettre à jour les dépendances obsolètes',
          'Renforcer les mots de passe admin',
          'Activer l\'authentification à deux facteurs'
        ]
      };
      
      localStorage.setItem('security_audit', JSON.stringify(auditResults));
      toast.success('Audit de sécurité terminé');
      return auditResults;
    } catch (error) {
      toast.error('Erreur lors de l\'audit');
    } finally {
      setIsLoading(false);
    }
  };

  const generateApiKey = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newApiKey = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      const existingKeys = JSON.parse(localStorage.getItem('api_keys') || '[]');
      const updatedKeys = [...existingKeys, {
        id: Math.random().toString(36).substr(2, 9),
        key: newApiKey,
        createdAt: new Date().toISOString(),
        lastUsed: null,
        status: 'active'
      }];
      
      localStorage.setItem('api_keys', JSON.stringify(updatedKeys));
      toast.success('Nouvelle clé API générée');
      return newApiKey;
    } catch (error) {
      toast.error('Erreur lors de la génération');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveConfiguration,
    refreshLogs,
    exportLogs,
    createBackup,
    runSecurityAudit,
    generateApiKey,
    isLoading
  };
};
