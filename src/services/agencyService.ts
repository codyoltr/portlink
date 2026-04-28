import { apiClient } from './apiClient';
import { Subcontractor, Application } from '../types/agency.types';
import { mockSubcontractors, mockApplications } from '../data/mockAgencyData';

export const agencyService = {
  // Get subcontractors from API or fallback to mock data
  getSubcontractors: async (search?: string): Promise<Subcontractor[]> => {
    try {
      const response = await apiClient.get('/agent/subcontractors', {
        params: { search }
      });
      if (response.data?.success) {
        return response.data.data;
      }
      return mockSubcontractors;
    } catch (error) {
      console.warn('Failed to fetch subcontractors from API, using mock data.', error);
      return search ? mockSubcontractors.filter(s => 
        s.companyName.toLowerCase().includes(search.toLowerCase()) || 
        s.city?.toLowerCase().includes(search.toLowerCase())
      ) : mockSubcontractors;
    }
  },

  // Rate a subcontractor
  rateSubcontractor: async (id: string, rating: number): Promise<boolean> => {
    try {
      const response = await apiClient.post(`/agent/subcontractors/${id}/rate`, {}, {
        params: { rating }
      });
      return response.data?.success || false;
    } catch (error) {
      console.error('Failed to rate subcontractor.', error);
      // Mock logic update
      const sub = mockSubcontractors.find(s => s.id === id);
      if (sub) {
        sub.rating = (sub.rating * sub.totalCompleted + rating) / (sub.totalCompleted + 1);
        sub.totalCompleted++;
      }
      return true;
    }
  },

  // Get all applications (offers)
  getAllApplications: async (): Promise<Application[]> => {
    try {
      const response = await apiClient.get('/agent/offers');
      if (response.data?.success) {
        return response.data.data;
      }
      return mockApplications;
    } catch (error) {
      console.warn('Failed to fetch applications from API, using mock data.', error);
      return mockApplications;
    }
  },

  // Accept an application (offer)
  acceptApplication: async (offerId: string): Promise<boolean> => {
    try {
      const response = await apiClient.put(`/agent/offers/${offerId}/accept`);
      return response.data?.success || false;
    } catch (error) {
      console.error('Failed to accept application.', error);
      return false;
    }
  },

  // Reject an application (offer)
  rejectApplication: async (offerId: string): Promise<boolean> => {
    try {
      const response = await apiClient.put(`/agent/offers/${offerId}/reject`);
      return response.data?.success || false;
    } catch (error) {
      console.error('Failed to reject application.', error);
      return false;
    }
  }
};
