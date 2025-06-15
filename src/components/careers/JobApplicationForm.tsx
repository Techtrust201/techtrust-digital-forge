
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

interface JobApplicationFormProps {
  job: {
    title: string;
    color: string;
  };
  getButtonClasses: (color: string) => string;
}

const JobApplicationForm = ({ job, getButtonClasses }: JobApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    motivation: '',
    experience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Candidature:', { ...formData, job: job.title });
    // Logique de soumission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="font-semibold text-gray-900">Postuler maintenant</h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
        />
      </div>
      
      <div>
        <Label htmlFor="experience">Expérience pertinente *</Label>
        <Textarea
          id="experience"
          placeholder="Décrivez votre expérience en lien avec ce poste..."
          value={formData.experience}
          onChange={(e) => setFormData(prev => ({...prev, experience: e.target.value}))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="motivation">Motivation *</Label>
        <Textarea
          id="motivation"
          placeholder="Pourquoi souhaitez-vous rejoindre Techtrust ?"
          value={formData.motivation}
          onChange={(e) => setFormData(prev => ({...prev, motivation: e.target.value}))}
          required
        />
      </div>
      
      <div>
        <Label>CV (PDF) *</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Cliquez pour télécharger votre CV</p>
        </div>
      </div>
      
      <Button type="submit" className={`w-full ${getButtonClasses(job.color)}`}>
        Envoyer ma candidature
      </Button>
    </form>
  );
};

export default JobApplicationForm;
