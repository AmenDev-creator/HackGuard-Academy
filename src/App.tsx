import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/layout";
import HomePage from "./pages/home/HomePage";
import LearnPage from "./pages/learn/LearnPage";
import CourseDetailsPage from "./pages/learn/CourseDetailsPage";
import AboutPage from "./pages/About/AboutPage";
import PricingPage from "./pages/Pricing/PricingPage";
import ContactPage from "./pages/contact/ContactPage";
import SignupPage from "./pages/Auth/SignupPage";
import SigninPage from "./pages/Auth/SigninPage";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:id" element={<CourseDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/practice" element={<h1>Practice Page</h1>} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
