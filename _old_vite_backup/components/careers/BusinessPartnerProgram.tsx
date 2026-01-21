
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const BusinessPartnerProgram = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            💰 Programme <span className="text-purple-600">Apporteur d'Affaires</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Profitez de rémunérations attractives en apportant des projets à Techtrust. 
            Plus vous nous référez de clients, plus votre commission augmente !
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Rémunération par projet</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Nombre de projets</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {projects: "1 projet", commission: "5% Commission"},
                    {projects: "2 projets", commission: "7.5% Commission"},
                    {projects: "3 projets", commission: "10% Commission"},
                    {projects: "4 projets", commission: "12.5% Commission"},
                    {projects: "5 projets et plus", commission: "15% Commission"}
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-200 px-4 py-3">{row.projects}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium text-purple-600">{row.commission}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">📋 Conditions</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Remplissez et signez le modèle de contrat disponible ci-dessous</li>
                <li>• Contactez-nous en cas de questions</li>
                <li>• La validation de l'apport est conditionnée par la signature d'un devis comportant une clause mentionnant votre rôle dans la mise en relation</li>
              </ul>
            </div>

            <div className="flex justify-center gap-4">
              <Button className="bg-purple-600 hover:bg-purple-600/90 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Télécharger le contrat
              </Button>
              <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                <a href="/contact">Nous contacter</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPartnerProgram;
