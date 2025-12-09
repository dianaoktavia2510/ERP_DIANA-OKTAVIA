import { RevenueData, Patient, JournalEntry, InventoryItem } from './types';

export const APP_NAME = "HOSPI-A.I.";

export const MOCK_REVENUE_DATA: RevenueData[] = [
  { month: 'Jan', revenue: 450000, expenses: 320000, projection: 460000 },
  { month: 'Feb', revenue: 480000, expenses: 340000, projection: 470000 },
  { month: 'Mar', revenue: 470000, expenses: 310000, projection: 490000 },
  { month: 'Apr', revenue: 520000, expenses: 360000, projection: 510000 },
  { month: 'May', revenue: 560000, expenses: 390000, projection: 550000 },
  { month: 'Jun', revenue: 590000, expenses: 410000, projection: 600000 },
];

export const MOCK_PATIENTS: Patient[] = [
  { id: 'P-001', name: 'Sarah Connor', admissionDate: '2023-10-24', diagnosis: 'Acute Bronchitis', status: 'Admitted', department: 'Pulmonology' },
  { id: 'P-002', name: 'James Howlett', admissionDate: '2023-10-25', diagnosis: 'Fractured Femur', status: 'Critical', department: 'Orthopedics' },
  { id: 'P-003', name: 'Diana Prince', admissionDate: '2023-10-26', diagnosis: 'Routine Checkup', status: 'Outpatient', department: 'General' },
  { id: 'P-004', name: 'Bruce Wayne', admissionDate: '2023-10-23', diagnosis: 'Insomnia', status: 'Discharged', department: 'Neurology' },
  { id: 'P-005', name: 'Clark Kent', admissionDate: '2023-10-27', diagnosis: 'Vision Therapy', status: 'Admitted', department: 'Ophthalmology' },
];

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  { id: 'JE-2024-001', date: '2023-10-27', description: 'Pharmacy Inventory Restock', reference: 'PO-8821', debit: 12500, credit: 0, status: 'Posted', riskScore: 5 },
  { id: 'JE-2024-002', date: '2023-10-27', description: 'Emergency Surgery Revenue', reference: 'INV-9921', debit: 0, credit: 45000, status: 'Posted', riskScore: 12 },
  { id: 'JE-2024-003', date: '2023-10-26', description: 'Consultant Fees Adjustment', reference: 'ADJ-112', debit: 3200, credit: 0, status: 'Review', riskScore: 85 }, // High risk
  { id: 'JE-2024-004', date: '2023-10-26', description: 'Utility Payment (Electricity)', reference: 'UTIL-Oct', debit: 4500, credit: 0, status: 'Draft', riskScore: 2 },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'INV-001', name: 'Amoxicillin 500mg', batchNumber: 'BAT-992', expiryDate: '2024-12-01', quantity: 1500, unit: 'Capsules', status: 'In Stock' },
  { id: 'INV-002', name: 'Surgical Gloves (L)', batchNumber: 'BAT-112', expiryDate: '2025-06-15', quantity: 240, unit: 'Pairs', status: 'Low Stock' },
  { id: 'INV-003', name: 'Propofol Inj.', batchNumber: 'BAT-773', expiryDate: '2023-11-10', quantity: 50, unit: 'Vials', status: 'Low Stock' },
  { id: 'INV-004', name: 'Paracetamol IV', batchNumber: 'BAT-881', expiryDate: '2024-08-20', quantity: 3000, unit: 'Bottles', status: 'In Stock' },
];
