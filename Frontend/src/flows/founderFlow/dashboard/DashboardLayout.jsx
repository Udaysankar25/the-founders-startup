import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ProfileSummary from '../components/ProfileSummary';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#fceeff] flex flex-col">
      {/* Fixed Topbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar />
      </div>

      {/* Main Layout below the fixed topbar */}
      <div className="flex flex-1 pt-[64px] overflow-hidden">
        {/* Sidebar */}
        <div className="w-[80px] bg-[#f4eaff] shadow-inner flex-shrink-0">
          <Sidebar />
        </div>

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

export default DashboardLayout;
