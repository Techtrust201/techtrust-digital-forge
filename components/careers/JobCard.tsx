"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';

interface JobCardProps {
  job: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
    requirements: string;
    salary: string;
    types: string[];
  };
  onJobSelect: (job: any) => void;
  getTypeColor: (type: string) => string;
  getButtonClasses: (color: string) => string;
}

const JobCard = ({ job, onJobSelect, getTypeColor, getButtonClasses }: JobCardProps) => {
  return (
    <DialogTrigger asChild>
      <div 
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all cursor-pointer group"
        onClick={() => onJobSelect(job)}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
          job.color === 'blue-600' ? 'bg-blue-100' :
          job.color === 'purple-600' ? 'bg-purple-100' :
          job.color === 'pink-600' ? 'bg-pink-100' :
          job.color === 'green-600' ? 'bg-green-100' :
          job.color === 'indigo-600' ? 'bg-indigo-100' :
          'bg-orange-100'
        }`}>
          <job.icon className={`w-6 h-6 ${
            job.color === 'blue-600' ? 'text-blue-600' :
            job.color === 'purple-600' ? 'text-purple-600' :
            job.color === 'pink-600' ? 'text-pink-600' :
            job.color === 'green-600' ? 'text-green-600' :
            job.color === 'indigo-600' ? 'text-indigo-600' :
            'text-orange-600'
          }`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{job.description}</p>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Salaire:</span>
            <span className="font-medium">{job.salary}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Type:</span>
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
        <Button className={`w-full mt-4 ${getButtonClasses(job.color)}`}>
          Postuler <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </DialogTrigger>
  );
};

export default JobCard;
