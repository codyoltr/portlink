import { apiClient } from '../axios';
import type { ApiResponse } from './authService';

export interface CreateJobListingRequest {
  title: string;
  listingType: string;
  shipName?: string;
  portCode?: string;
  portName?: string;
  location?: string;
  category: string;
  selectedServices: string[];
  eta?: string;
  needText?: string;
  budgetMin?: number;
  budgetMax?: number;
  currency?: string;
  deadline?: string;
}

export interface UpdateJobListingRequest {
  title?: string;
  shipName?: string;
  portCode?: string;
  location?: string;
  category?: string;
  selectedServices?: string[];
  eta?: string;
  needText?: string;
  budgetMin?: number;
  budgetMax?: number;
  currency?: string;
  deadline?: string;
  status?: string;
}

export interface JobFileResponse {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  fileType?: string;
  createdAt: string;
}

export interface JobListingResponse {
  id: string;
  agentId: string;
  agentCompanyName: string;
  agentLogoUrl?: string;
  title: string;
  listingType: string;
  shipName?: string;
  portCode?: string;
  portName?: string;
  location?: string;
  category: string;
  selectedServices: string[];
  eta?: string;
  needText?: string;
  budgetMin?: number;
  budgetMax?: number;
  currency: string;
  status: string;
  offerCount: number;
  deadline?: string;
  createdAt: string;
}

export interface JobListingDetailResponse extends JobListingResponse {
  files: JobFileResponse[];
}

export interface OfferResponse {
  id: string;
  jobId: string;
  subcontractorId: string;
  subcontractorCompanyName: string;
  subcontractorLogoUrl?: string;
  subcontractorRating: number;
  subcontractorTotalJobs: number;
  coverLetter?: string;
  price: number;
  currency: string;
  estimatedDays?: number;
  status: string; // "pending", "accepted", "rejected"
  createdAt: string;
}

export interface AssignedJobResponse {
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

export interface JobLogResponse {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

export interface JobReportResponse {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  fileType?: string;
  createdAt: string;
}

export interface AssignedJobDetailResponse extends AssignedJobResponse {
  logs: JobLogResponse[];
  reports: JobReportResponse[];
}

export interface AddJobLogRequest {
  title: string;
  description?: string;
}

export interface UpdateAssignedJobRequest {
  progress?: number;
  status?: string;
  startDate?: string;
  dueDate?: string;
}

export const agencyService = {
  // GET /api/agent/jobs
  getJobs: async (status?: string, category?: string, page = 1, pageSize = 20): Promise<JobListingResponse[]> => {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (category) params.append('category', category);
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());

    const response = await apiClient.get<ApiResponse<JobListingResponse[]>>(`/agent/jobs?${params.toString()}`);
    return response.data.data;
  },

  // POST /api/agent/jobs
  createJob: async (data: CreateJobListingRequest): Promise<JobListingResponse> => {
    const response = await apiClient.post<ApiResponse<JobListingResponse>>('/agent/jobs', data);
    return response.data.data;
  },

  // GET /api/agent/jobs/:id
  getJobDetail: async (id: string): Promise<JobListingDetailResponse> => {
    const response = await apiClient.get<ApiResponse<JobListingDetailResponse>>(`/agent/jobs/${id}`);
    return response.data.data;
  },

  // PUT /api/agent/jobs/:id
  updateJob: async (id: string, data: UpdateJobListingRequest): Promise<JobListingResponse> => {
    const response = await apiClient.put<ApiResponse<JobListingResponse>>(`/agent/jobs/${id}`, data);
    return response.data.data;
  },

  // DELETE /api/agent/jobs/:id
  deleteJob: async (id: string): Promise<void> => {
    await apiClient.delete(`/agent/jobs/${id}`);
  },

  // GET /api/agent/jobs/:id/offers
  getJobOffers: async (id: string): Promise<OfferResponse[]> => {
    const response = await apiClient.get<ApiResponse<OfferResponse[]>>(`/agent/jobs/${id}/offers`);
    return response.data.data;
  },

  // POST /api/agent/jobs/:id/files
  uploadJobFile: async (id: string, file: File): Promise<JobFileResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<ApiResponse<JobFileResponse>>(`/agent/jobs/${id}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  // PUT /api/agent/offers/:offerId/accept
  acceptOffer: async (offerId: string): Promise<AssignedJobResponse> => {
    const response = await apiClient.put<ApiResponse<AssignedJobResponse>>(`/agent/offers/${offerId}/accept`);
    return response.data.data;
  },

  // PUT /api/agent/offers/:offerId/reject
  rejectOffer: async (offerId: string): Promise<void> => {
    await apiClient.put(`/agent/offers/${offerId}/reject`);
  },

  // GET /api/agent/assigned-jobs
  getAssignedJobs: async (status?: string, page = 1, pageSize = 20): Promise<AssignedJobResponse[]> => {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());

    const response = await apiClient.get<ApiResponse<AssignedJobResponse[]>>(`/agent/assigned-jobs?${params.toString()}`);
    return response.data.data;
  },

  // GET /api/agent/assigned-jobs/:id
  getAssignedJobDetail: async (id: string): Promise<AssignedJobDetailResponse> => {
    const response = await apiClient.get<ApiResponse<AssignedJobDetailResponse>>(`/agent/assigned-jobs/${id}`);
    return response.data.data;
  },

  // POST /api/agent/assigned-jobs/:id/logs
  addJobLog: async (id: string, data: AddJobLogRequest): Promise<JobLogResponse> => {
    const response = await apiClient.post<ApiResponse<JobLogResponse>>(`/agent/assigned-jobs/${id}/logs`, data);
    return response.data.data;
  },

  // POST /api/agent/assigned-jobs/:id/request-report
  requestReport: async (id: string): Promise<void> => {
    await apiClient.post(`/agent/assigned-jobs/${id}/request-report`);
  },

  // PUT /api/agent/assigned-jobs/:id
  updateAssignedJob: async (id: string, data: UpdateAssignedJobRequest): Promise<AssignedJobResponse> => {
    const response = await apiClient.put<ApiResponse<AssignedJobResponse>>(`/agent/assigned-jobs/${id}`, data);
    return response.data.data;
  }
};
