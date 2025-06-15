
import { useState } from 'react';
import { toast } from 'sonner';

export const useAdminActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createNewClient = async () => {
    setIsLoading(true);
    try {
      // Rediriger vers la page de création d'utilisateur
      window.location.href = '/admin/users/create';
      toast.success('Redirection vers la création de client');
    } catch (error) {
      toast.error('Erreur lors de la redirection');
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async () => {
    setIsLoading(true);
    try {
      // Simulation de génération de rapport
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Rapport généré avec succès');
      // Ici on pourrait télécharger un PDF ou ouvrir une modale
    } catch (error) {
      toast.error('Erreur lors de la génération du rapport');
    } finally {
      setIsLoading(false);
    }
  };

  const viewPerformances = () => {
    window.location.href = '/admin/analytics/performance';
    toast.success('Redirection vers les performances');
  };

  const viewAllUsers = () => {
    window.location.href = '/admin/users/all';
    toast.success('Redirection vers tous les utilisateurs');
  };

  return {
    createNewClient,
    generateReport,
    viewPerformances,
    viewAllUsers,
    isLoading
  };
};
