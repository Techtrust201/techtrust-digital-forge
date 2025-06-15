
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import JobCard from './JobCard';
import JobDialog from './JobDialog';
import { jobCategories } from '../data/jobCategories';

const getTypeColor = (type: string) => {
  switch (type) {
    case 'CDI':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Freelance':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Stage':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getButtonClasses = (color: string) => {
  switch (color) {
    case 'blue-600':
      return 'bg-blue-600 hover:bg-blue-700 text-white';
    case 'purple-600':
      return 'bg-purple-600 hover:bg-purple-700 text-white';
    case 'pink-600':
      return 'bg-pink-600 hover:bg-pink-700 text-white';
    case 'green-600':
      return 'bg-green-600 hover:bg-green-700 text-white';
    case 'indigo-600':
      return 'bg-indigo-600 hover:bg-indigo-700 text-white';
    case 'orange-600':
      return 'bg-orange-600 hover:bg-orange-700 text-white';
    default:
      return 'bg-blue-600 hover:bg-blue-700 text-white';
  }
};

const JobsSection = () => {
  const [selectedJob, setSelectedJob] = useState<typeof jobCategories[0] | null>(null);

  const handleJobSelect = (job: typeof jobCategories[0]) => {
    setSelectedJob(job);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
            Nos <span className="text-blue-600">Métiers</span> Tech
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Cliquez sur le métier qui vous intéresse pour découvrir le poste et postuler directement
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((job, index) => (
              <Dialog key={index}>
                <JobCard 
                  job={job}
                  onJobSelect={handleJobSelect}
                  getTypeColor={getTypeColor}
                  getButtonClasses={getButtonClasses}
                />
                <JobDialog 
                  job={job}
                  getTypeColor={getTypeColor}
                  getButtonClasses={getButtonClasses}
                />
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
