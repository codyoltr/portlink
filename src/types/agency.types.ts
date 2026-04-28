export interface Subcontractor {
  id: string;
  fullName: string;
  companyName: string;
  phone?: string;
  country?: string;
  city?: string;
  logoUrl?: string;
  rating: number;
  totalCompleted: number;
  expertiseTags: string[];
  isVerified: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  subcontractorId: string;
  subcontractorCompanyName: string;
  subcontractorLogoUrl?: string;
  subcontractorRating: number;
  price: number;
  currency: string;
  estimatedDays: number;
  coverNote?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface AssignedJob {
  id: string;
  jobId: string;
  jobTitle: string;
  agentCompanyName: string;
  subcontractorCompanyName: string;
  progress: number;
  status: string;
  startDate?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
}
