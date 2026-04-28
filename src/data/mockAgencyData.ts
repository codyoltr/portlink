import { Subcontractor, Application } from '../types/agency.types';

export const mockSubcontractors: Subcontractor[] = [
  {
    id: 'b3f5c71a-289d-482a-a9e0-826c457f5c71',
    fullName: 'Ahmet Yılmaz',
    companyName: 'Eren Marine Services',
    phone: '+90 555 222 11 00',
    country: 'Turkey',
    city: 'Tuzla',
    rating: 4.8,
    totalCompleted: 142,
    expertiseTags: ['Main Engine', 'Hull Painting', 'Steel Work', 'Pipe Line'],
    isVerified: true
  },
  {
    id: 'e9b2a64c-7c15-4c01-b3b4-1a93b4f62d1a',
    fullName: 'Mehmet Demir',
    companyName: 'Port Tech',
    phone: '+90 555 333 22 11',
    country: 'Turkey',
    city: 'Yalova',
    rating: 4.2,
    totalCompleted: 85,
    expertiseTags: ['Automation', 'Wiring', 'Electronics'],
    isVerified: true
  },
  {
    id: 'd4c1b97e-128a-4d2c-8a19-9c5d6e2b8f3a',
    fullName: 'Ali Veli',
    companyName: 'Global Ship Repairs',
    phone: '+90 555 444 33 22',
    country: 'Turkey',
    city: 'Ambarlı',
    rating: 3.9,
    totalCompleted: 45,
    expertiseTags: ['Hydraulics', 'Deck Machinery'],
    isVerified: false
  }
];

export const mockApplications: Application[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    jobId: 'f9e8d7c6-b5a4-3210-fedc-ba0987654321',
    jobTitle: 'Main Engine Overhaul',
    subcontractorId: 'b3f5c71a-289d-482a-a9e0-826c457f5c71',
    subcontractorCompanyName: 'Eren Marine Services',
    subcontractorRating: 4.8,
    price: 15000,
    currency: 'USD',
    estimatedDays: 10,
    coverNote: 'We have 10 years of experience with this specific engine model.',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 'fedcba09-8765-4321-fedc-ba0987654321',
    jobId: 'f9e8d7c6-b5a4-3210-fedc-ba0987654321',
    jobTitle: 'Main Engine Overhaul',
    subcontractorId: 'e9b2a64c-7c15-4c01-b3b4-1a93b4f62d1a',
    subcontractorCompanyName: 'Port Tech',
    subcontractorRating: 4.2,
    price: 12000,
    currency: 'USD',
    estimatedDays: 14,
    coverNote: 'Ready to start immediately.',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];
