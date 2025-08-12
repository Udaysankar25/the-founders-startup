import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ProfileSummary from '../components/ProfileSummary';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fceeff] flex flex-col">
      {/* Fixed Topbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      </div>

      <div className="flex flex-1 pt-[72px] overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-scroll md:ml-[80px] p-4 md:p-6 h-[calc(100vh-72px)] scrollbar-hide">
  <Outlet />
</main>


        {/* Right Panel */}
        <aside className="hidden xl:block w-[300px] p-4 bg-[#f4eaff] border-l border-purple-200">
          <ProfileSummary />
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
