import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/layout";
import HomePage from "./pages/home/HomePage";
import LearnPage from "./pages/learn/LearnPage";
import AboutPage from "./pages/About/AboutPage";
import PricingPage from "./pages/Pricing/PricingPage";
import WebAppSecurityPricing from "./pages/Pricing/WebAppSecurityPricing";
import NetworkPenTestingPricing from "./pages/Pricing/NetworkPenTestingPricing";
import CloudSecurityPricing from "./pages/Pricing/CloudSecurityPricing";
import AdvancedEthicalHackingPricing from "./pages/Pricing/AdvancedEthicalHackingPricing";
import ContactPage from "./pages/contact/ContactPage";
import SignupPage from "./pages/Auth/SignupPage";
import SigninPage from "./pages/Auth/SigninPage";
import { AuthProvider } from "./contexts/AuthContext";
import PaymentPage from "./pages/Pricing/PaymentPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Labpage from "./pages/Labpage/Labpage";
import IntroductiontoCyberSecurity from "./pages/learn/courses/IntroductiontoCyberSecurity/IntroductiontoCyberSecurity";
import IntroCoursefoundation from "./pages/learn/courses/IntroductiontoCyberSecurity/Coursefoundation";
import WebApplicationSecurity from "./pages/learn/courses/WebApplicationSecurity/WebApplicationSecurity";
import WebAppCoursefoundation from "./pages/learn/courses/WebApplicationSecurity/Coursefoundation";
import NetworkPenetrationTesting from "./pages/learn/courses/NetworkPenetrationTesting/NetworkPenetrationTesting";
import NetworkCoursefoundation from "./pages/learn/courses/NetworkPenetrationTesting/Coursefoundation";
import MalwareAnalysis from "./pages/learn/courses/MalwareAnalysis/MalwareAnalysis";
import MalwareCoursefoundation from "./pages/learn/courses/MalwareAnalysis/Coursefoundation";
import CloudSecurityFundamentals from "./pages/learn/courses/CloudSecurityFundamentals/CloudSecurityFundamentals";
import CloudCoursefoundation from "./pages/learn/courses/CloudSecurityFundamentals/Coursefoundation";
import AdvancedEthicalHacking from "./pages/learn/courses/AdvancedEthicalHacking/AdvancedEthicalHacking";
import AdvancedCoursefoundation from "./pages/learn/courses/AdvancedEthicalHacking/Coursefoundation";
import Certificate from "./pages/certificate/certificate";






function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          <Route path="/learn/1" element={<IntroductiontoCyberSecurity />} />
          <Route path="/learn/1/foundation" element={<IntroCoursefoundation />} />
          <Route path="/learn/2" element={<WebApplicationSecurity />} />
          <Route path="/learn/2/foundation" element={<WebAppCoursefoundation />} />
          <Route path="/learn/3" element={<NetworkPenetrationTesting />} />
          <Route path="/learn/3/foundation" element={<NetworkCoursefoundation />} />
          <Route path="/learn/4" element={<MalwareAnalysis />} />
          <Route path="/learn/4/foundation" element={<MalwareCoursefoundation />} />
          <Route path="/learn/5" element={<CloudSecurityFundamentals />} />
          <Route path="/learn/5/foundation" element={<CloudCoursefoundation />} />
          <Route path="/learn/6" element={<AdvancedEthicalHacking />} />
          <Route path="/learn/6/foundation" element={<AdvancedCoursefoundation />} />

            
            <Route path="/learn" element={<LearnPage />} />
            
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/pricing/web-app-security" element={<WebAppSecurityPricing />} />
            <Route path="/pricing/network-pentesting" element={<NetworkPenTestingPricing />} />
            <Route path="/pricing/cloud-security" element={<CloudSecurityPricing />} />
            <Route path="/pricing/advanced-ethical-hacking" element={<AdvancedEthicalHackingPricing />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/lab" element={<Labpage />} />
            <Route path="/certificate/:courseId" element={<Certificate />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
