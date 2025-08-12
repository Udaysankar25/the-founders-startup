import React from 'react';
import InvestorDashboardLayout from '../dashboard/InvestorDashboardLayout';
import InvestorFeed from '../components/InvestorFeed';

const InvestorDashboard = () => {
  return (
    <InvestorDashboardLayout>
      <InvestorFeed />
    </InvestorDashboardLayout>
  );
};

export default InvestorDashboard;
