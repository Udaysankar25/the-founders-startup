import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleSelection from './pages/RoleSelection';

// Founder Flow
import SignupFounder from './flows/founderFlow/SignupFounder';
import LoginFounder from './flows/founderFlow/LoginFounder';
import AccountSetupFounder from './flows/founderFlow/AccountSetupFounder';
import Step1_ProfileBasics from './flows/founderFlow/Step1_ProfileBasics';
import Step2_InterestAreas from './flows/founderFlow/Step2_InterestAreas';
import Step3_SocialLinks from './flows/founderFlow/Step3_SocialLinks';
import DashboardLayout from './flows/founderFlow/dashboard/DashboardLayout';

import HomePage from './flows/founderFlow/dashboard/pages/HomePage';
import TeamsPage from './flows/founderFlow/dashboard/pages/TeamsPage';
import MessagesPage from './flows/founderFlow/dashboard/pages/MessagesPage';
import NotificationsPage from './flows/founderFlow/dashboard/pages/NotificationsPage';
import ProfilePage from './flows/founderFlow/dashboard/pages/ProfilePage';

// Investor Flow
import SignupInvestor from './flows/investorFlow/SignupInvestor';
import LoginInvestor from './flows/investorFlow/LoginInvestor';
import AccountSetupInvestor from './flows/investorFlow/AccountSetupInvestor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Role Selection */}
        <Route path="/" element={<RoleSelection />} />

        {/* Founder Routes */}
        <Route path="/founder/signup" element={<SignupFounder />} />
        <Route path="/founder/login" element={<LoginFounder />} />
        <Route path="/founder/account-setup" element={<AccountSetupFounder />} />
        <Route path="/founder/onboarding/step-1" element={<Step1_ProfileBasics />} />
        <Route path="/founder/onboarding/step-2" element={<Step2_InterestAreas />} />
        <Route path="/founder/onboarding/step-3" element={<Step3_SocialLinks />} />

        {/* Founder Dashboard with nested pages */}
        <Route path="/founder/dashboard" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Investor Routes */}
        <Route path="/investor/signup" element={<SignupInvestor />} />
        <Route path="/investor/login" element={<LoginInvestor />} />
        <Route path="/investor/account-setup" element={<AccountSetupInvestor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
