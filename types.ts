
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Vollzeit' | 'Teilzeit' | 'Freelance' | 'Ausbildung';
  salary: string;
  description: string;
  postedAt: string;
  logo: string;
}

export interface SearchFilters {
  query: string;
  location: string;
  category: string;
}
