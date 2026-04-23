export interface AdminStat {
  title: string;
  value: string | number;
  change?: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "agent" | "subcontractor" | "technical_expert";
  isActive: boolean;
  createdAt: string;
}

export interface AdminJob {
  id: string;
  title: string;
  category: string;
  ownerName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface AdminApplication {
  id: string;
  applicantName: string;
  jobTitle: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}