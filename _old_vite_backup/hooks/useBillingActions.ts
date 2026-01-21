
import { useState } from 'react';
import { toast } from 'sonner';

export const useBillingActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createInvoice = async (invoiceData: any) => {
    setIsLoading(true);
    try {
      const existingInvoices = JSON.parse(localStorage.getItem('billing_invoices') || '[]');
      const newInvoice = {
        id: Math.random().toString(36).substr(2, 9),
        ...invoiceData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        amount: invoiceData.amount || 0,
        dueDate: invoiceData.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      const updatedInvoices = [...existingInvoices, newInvoice];
      localStorage.setItem('billing_invoices', JSON.stringify(updatedInvoices));
      
      toast.success('Facture créée avec succès');
      return newInvoice;
    } catch (error) {
      toast.error('Erreur lors de la création de la facture');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = async (invoiceId: string) => {
    setIsLoading(true);
    try {
      // Simulation de génération PDF
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('PDF généré avec succès');
      
      // Ici on pourrait intégrer jsPDF ou une autre librairie
      const pdfUrl = `data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQLQKMC4wNzcgMCBUZAooRmFjdHVyZSAjJHtpbnZvaWNlSWR9KSBUagpFVApzdHJlYW0KZW5kb2JqCnhyZWYKMCAxClswMDAwMDAwMDAwIDY1NTM1IGYgXQp0cmFpbGVyCjw8Ci9TaXplIDEKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjEwOApzdHJlYW0KZW5kb2JqCg==`;
      
      // Télécharger le PDF
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `facture-${invoiceId}.pdf`;
      link.click();
      
    } catch (error) {
      toast.error('Erreur lors de la génération PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const processPayment = async (paymentData: any) => {
    setIsLoading(true);
    try {
      const existingPayments = JSON.parse(localStorage.getItem('billing_payments') || '[]');
      const newPayment = {
        id: Math.random().toString(36).substr(2, 9),
        ...paymentData,
        status: 'completed',
        processedAt: new Date().toISOString(),
        method: paymentData.method || 'stripe'
      };

      const updatedPayments = [...existingPayments, newPayment];
      localStorage.setItem('billing_payments', JSON.stringify(updatedPayments));
      
      toast.success('Paiement traité avec succès');
      return newPayment;
    } catch (error) {
      toast.error('Erreur lors du traitement du paiement');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = async (subscriptionId: string, subscriptionData: any) => {
    setIsLoading(true);
    try {
      const subscriptions = JSON.parse(localStorage.getItem('billing_subscriptions') || '[]');
      const updatedSubscriptions = subscriptions.map((sub: any) => 
        sub.id === subscriptionId 
          ? { ...sub, ...subscriptionData, updatedAt: new Date().toISOString() }
          : sub
      );
      
      localStorage.setItem('billing_subscriptions', JSON.stringify(updatedSubscriptions));
      toast.success('Abonnement modifié avec succès');
    } catch (error) {
      toast.error('Erreur lors de la modification');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async (subscriptionId: string) => {
    setIsLoading(true);
    try {
      const subscriptions = JSON.parse(localStorage.getItem('billing_subscriptions') || '[]');
      const updatedSubscriptions = subscriptions.map((sub: any) => 
        sub.id === subscriptionId 
          ? { ...sub, status: 'cancelled', cancelledAt: new Date().toISOString() }
          : sub
      );
      
      localStorage.setItem('billing_subscriptions', JSON.stringify(updatedSubscriptions));
      toast.success('Abonnement annulé');
    } catch (error) {
      toast.error('Erreur lors de l\'annulation');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createInvoice,
    generatePDF,
    processPayment,
    updateSubscription,
    cancelSubscription,
    isLoading
  };
};
