import React from 'react';
import { BankingSecurityDashboard } from '@/components/platform/BankingSecurityDashboard';

// TODO: Connect to backend for real-time security data
// TODO: Add role-based dashboard customization
// TODO: Integrate with all security modules (APK, ATM, Analytics, Emergency)

export const DashboardPage: React.FC = () => {
  return <BankingSecurityDashboard />;
};
