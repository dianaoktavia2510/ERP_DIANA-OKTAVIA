export type NavigationItem = 'dashboard' | 'finance' | 'patients' | 'inventory' | 'settings';

export interface User {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface MetricData {
  name: string;
  value: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  projection: number;
}

export interface Patient {
  id: string;
  name: string;
  admissionDate: string;
  diagnosis: string;
  status: 'Admitted' | 'Discharged' | 'Critical' | 'Outpatient';
  department: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  reference: string;
  debit: number;
  credit: number;
  status: 'Posted' | 'Draft' | 'Review';
  riskScore: number; // AI Anomaly Score (0-100)
}

export interface InventoryItem {
  id: string;
  name: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Expired';
}
