
import React from 'react';
import { MapPin, Clock, ChevronRight, Stethoscope, CheckCircle2 } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 group cursor-pointer transition-all hover:border-cyan-200">
      <div className="w-24 h-24 rounded-2xl bg-white flex-shrink-0 flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
        <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-2xl" />
      </div>
      
      <div className="flex-grow text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-cyan-600 transition-colors mb-1 font-clinical uppercase tracking-tight">
              {job.title}
            </h3>
            <p className="text-cyan-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
              <Stethoscope size={14} /> {job.company}
            </p>
          </div>
          <div className="bg-slate-900 text-cyan-400 font-black text-lg px-6 py-2 rounded-xl border border-slate-800 shadow-sm">
            {job.salary}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs font-bold text-slate-400 mb-6 uppercase tracking-[0.1em]">
          <span className="flex items-center gap-2">
            <MapPin size={16} className="text-cyan-600" />
            {job.location}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-cyan-600" />
            {job.type}
          </span>
          <span className="text-slate-300 font-medium lowercase bg-slate-100 px-2 py-0.5 rounded italic">{job.postedAt}</span>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {['Tarifliche Zulage', 'Fachweiterbildung', 'Modernstes Equipment'].map(tag => (
            <span key={tag} className="bg-white text-slate-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-slate-100 group-hover:bg-cyan-50 transition-colors">
              <CheckCircle2 size={12} className="text-cyan-600" /> {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <div className="w-14 h-14 rounded-xl bg-slate-50 text-slate-200 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-inner">
          <ChevronRight size={32} />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
