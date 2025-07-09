import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import InvestorSidebar from '../components/InvestorSidebar';
import Topbar from '../components/Topbar';
import ProfileSummary from '../components/ProfileSummary';

const InvestorDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fceeff] flex flex-col">
      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar onToggleSidebar={() => setSidebarOpen(true)} />
      </div>

      {/* Sidebar: handles both desktop and mobile */}
      <InvestorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Layout */}
      <div className="flex flex-1 pt-[64px] overflow-hidden">
        {/* Push content for sidebar on desktop */}
        <div className="hidden md:block w-[80px] flex-shrink-0" />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 h-[calc(100vh-64px)] scrollbar-hidden">
          <Outlet />
        </main>

        {/* Right Panel */}
        <aside className="hidden xl:block w-[300px] p-6 bg-[#f4eaff] border-l border-purple-200 flex-shrink-0">
          <ProfileSummary />
        </aside>
      </div>
    </div>
  );
};

export default InvestorDashboardLayout;
