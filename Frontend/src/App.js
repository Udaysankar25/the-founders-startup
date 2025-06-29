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
import ForgotPassword from './flows/founderFlow/ForgotPassword';
import VerifyCode from './flows/founderFlow/VerifyCode';
import SetNewPassword from './flows/founderFlow/SetNewPassword';
import ResetSuccess from './flows/founderFlow/ResetSuccess';
import VerifyEmail from './flows/founderFlow/VerifyEmail';

import HomePage from './flows/founderFlow/dashboard/pages/HomePage';
import TeamsPage from './flows/founderFlow/dashboard/pages/TeamsPage';
import MessagesPage from './flows/founderFlow/dashboard/pages/MessagesPage';
import NotificationsPage from './flows/founderFlow/dashboard/pages/NotificationsPage';
import ProfilePage from './flows/founderFlow/dashboard/pages/ProfilePage';

// Investor Flow
import SignupInvestor from './flows/investorFlow/SignupInvestor';
import LoginInvestor from './flows/investorFlow/LoginInvestor';
import AccountSetupInvestor from './flows/investorFlow/AccountSetupInvestor';
import InvestorAbout from './flows/investorFlow/InvestorAbout';
import ForgotPasswordInvestor from './flows/investorFlow/ForgotPasswordInvestor';
import VerifyCodeInvestor from './flows/investorFlow/VerifyCodeInvestor';
import SetNewPasswordInvestor from './flows/investorFlow/SetNewPasswordInvestor';
import VerifyEmailInvestor from './flows/investorFlow/VerifyEmailInvestor';
import InvestorStep3_SocialLinks from './flows/investorFlow/InvestorStep3_SocialLinks'; // Uncomment if needed
import InvestorStep2_InterestAreas from './flows/investorFlow/InvestorStep2_InterestAreas';


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
        <Route path="/founder/forgot-password" element={<ForgotPassword />} />
        <Route path="/founder/verify-code" element={<VerifyCode />} />
        <Route path="/founder/reset-password" element={<SetNewPassword />} />
        <Route path="/founder/reset-success" element={<ResetSuccess />} />
        <Route path="/founder/verify-email" element={<VerifyEmail />} />


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
        <Route path="/investor/onboarding/step-1" element={<InvestorAbout />} />
        <Route path="/investor/forgot-password" element={<ForgotPasswordInvestor />} />
        <Route path="/investor/verify-code" element={<VerifyCodeInvestor />} />
        <Route path="/investor/reset-password" element={<SetNewPasswordInvestor />} />
        <Route path="/investor/verify-email" element={<VerifyEmailInvestor />} />
        <Route path="/investor/onboarding/step-2" element={<InvestorStep2_InterestAreas />} />
        <Route path="/investor/onboarding/step-3" element={<InvestorStep3_SocialLinks />} />
        
        {/* Add more investor onboarding steps as needed */}
        
        {/* Catch-all route for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
