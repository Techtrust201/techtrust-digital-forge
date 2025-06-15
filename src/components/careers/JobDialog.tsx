
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import JobApplicationForm from './JobApplicationForm';

interface JobDialogProps {
  job: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
    requirements: string;
    salary: string;
    types: string[];
  };
  getTypeColor: (type: string) => string;
  getButtonClasses: (color: string) => string;
}

const JobDialog = ({ job, getTypeColor, getButtonClasses }: JobDialogProps) => {
  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3">
          <job.icon className={`w-6 h-6 text-${job.color}`} />
          {job.title}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Description du poste</h4>
          <p className="text-gray-600">{job.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Salaire:</span>
              <span className="ml-2 font-medium">{job.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Types:</span>
              <div className="flex gap-1 flex-wrap">
                {job.types.map((type, typeIndex) => (
                  <span 
                    key={typeIndex} 
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getTypeColor(type)}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Compétences requises</h4>
          <p className="text-gray-600">{job.requirements}</p>
        </div>

        <JobApplicationForm job={job} getButtonClasses={getButtonClasses} />
      </div>
    </DialogContent>
  );
};

export default JobDialog;
