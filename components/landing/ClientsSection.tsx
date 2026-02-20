import { ExternalLink } from 'lucide-react';

const clients = [
  {
    name: 'Palais des Festivals',
    subtitle: 'Cannes',
    category: 'Événementiel',
  },
  {
    name: 'Chopard',
    subtitle: 'Horlogerie de luxe',
    category: 'Luxe',
  },
  {
    name: 'Dolby',
    subtitle: 'Cinéma & Audio',
    category: 'Technologie',
  },
  {
    name: 'Arodata',
    subtitle: 'Services IT — Mougins',
    category: 'Partenaire',
    url: 'https://www.arodata.fr',
  },
  {
    name: 'LC Auto Solutions',
    subtitle: 'Vitrage & Auto — Le Cannet',
    category: 'Automobile',
  },
  {
    name: 'NuisiProd',
    subtitle: 'Désinsectisation — 06',
    category: 'Services',
  },
  {
    name: 'Event Experts',
    subtitle: 'Événementiel pro',
    category: 'Événementiel',
  },
  {
    name: 'Speed Expo',
    subtitle: 'Événementiel',
    category: 'Événementiel',
  },
];

const ClientsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-custom-purple/10 text-custom-purple text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Références
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ils nous font <span className="text-custom-purple">confiance</span>
          </h2>
          <p className="text-gray-600">
            Du Palais des Festivals de Cannes aux entreprises locales de la Côte d&apos;Azur, 
            nous accompagnons des clients de toutes tailles.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <p className="font-bold text-gray-900 text-lg group-hover:text-custom-blue transition-colors">
                {client.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">{client.subtitle}</p>
              {client.url && (
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-custom-blue mt-2 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  Voir le site
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClientsSection;
