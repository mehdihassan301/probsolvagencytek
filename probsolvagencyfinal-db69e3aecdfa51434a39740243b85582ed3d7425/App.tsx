import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Theme, Page } from './types';
import { Header } from './components/Header';
import AnimatedOrbs from './components/AnimatedOrbs';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import BackToTopButton from './components/BackToTopButton';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PricingPage from './pages/PricingPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CareersPage from './pages/CareersPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ProjectBriefPage from './pages/ProjectBriefPage';
import VisibilityPage from './pages/VisibilityPage';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'dark'
  );
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Trigger loading spinner on route change
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1600); // 1.6s to cover the 1.5s animation duration fully

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const setPage = (page: Page, id?: string) => {
    switch (page) {
      case 'Home':
        navigate('/');
        break;
      case 'Services':
        navigate('/services');
        break;
      case 'ServiceDetail':
        navigate(id ? `/services/${id}` : '/services');
        break;
      case 'Pricing':
        navigate('/pricing');
        break;
      case 'Portfolio':
        navigate('/portfolio');
        break;
      case 'CaseStudy':
        navigate(id ? `/portfolio/${id}` : '/portfolio');
        break;
      case 'ProjectBrief':
        navigate(id ? `/brief/${id}` : '/brief');
        break;
      case 'About':
        navigate('/about');
        break;
      case 'Testimonials':
        navigate('/testimonials');
        break;
      case 'Careers':
        navigate('/careers');
        break;
      case 'Contact':
        navigate('/contact');
        break;
      case 'Blog':
        navigate('/blog');
        break;
      case 'BlogPost':
        navigate(id ? `/blog/${id}` : '/blog');
        break;
      case 'Visibility':
        navigate('/visibility');
        break;
      case 'PrivacyPolicy':
        navigate('/privacy');
        break;
      case 'TermsOfService':
        navigate('/terms');
        break;
      default:
        navigate('/');
    }
  };

  // Animation key based on path
  const locationKey = location.pathname;

  return (
    <div className="font-sans text-text_light dark:text-text_dark min-h-screen bg-400% bg-gradient-animated-light dark:bg-gradient-animated-dark animate-gradient-bg">
      <LoadingSpinner isLoading={isLoading} />
      <ScrollToTop />
      <AnimatedOrbs theme={theme} />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header theme={theme} setTheme={setTheme} />
        
        <main className="flex-grow pt-24 overflow-x-hidden">
          <div key={locationKey} className="animate-fade-in">
            <Routes>
              {/* Core Pages */}
              <Route path="/" element={<><SEO title="AI Automation, Vibe Coding & Web Design" canonical="/" /><HomePage /></>} />
              <Route path="/services" element={<><SEO title="Our Services" canonical="/services" /><ServicesPage setPage={setPage} /></>} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
              
              <Route path="/portfolio" element={<><SEO title="Our Portfolio" canonical="/portfolio" /><PortfolioPage /></>} />
              <Route path="/portfolio/:id" element={<CaseStudyPage />} />
              
              <Route path="/pricing" element={<><SEO title="Pricing & Plans" canonical="/pricing" /><PricingPage setPage={setPage} /></>} />
              <Route path="/brief/:plan?" element={<><SEO title="Project Brief" canonical="/brief" /><ProjectBriefPage /></>} />
              
              <Route path="/about" element={<><SEO title="About Us" canonical="/about" /><AboutPage /></>} />
              <Route path="/testimonials" element={<><SEO title="Testimonials" canonical="/testimonials" /><TestimonialsPage /></>} />
              <Route path="/careers" element={<><SEO title="Careers" canonical="/careers" /><CareersPage /></>} />
              <Route path="/contact" element={<><SEO title="Contact Us" canonical="/contact" /><ContactPage /></>} />
              
              {/* Blog */}
              <Route path="/blog" element={<><SEO title="Insights & Blog" canonical="/blog" /><BlogPage /></>} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              
              {/* Legal & Misc */}
              <Route path="/visibility" element={<><SEO title="Get Visibility Now" canonical="/visibility" /><VisibilityPage setPage={setPage} /></>} />
              <Route path="/privacy" element={<><SEO title="Privacy Policy" canonical="/privacy" /><PrivacyPolicyPage /></>} />
              <Route path="/terms" element={<><SEO title="Terms of Service" canonical="/terms" /><TermsOfServicePage /></>} />
              
              {/* Fallback */}
              <Route path="*" element={<><SEO title="404 Not Found" /><div className="pt-32 text-center"><h1>404 - Page Not Found</h1></div></>} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
      
      <CookieConsentBanner />
      <BackToTopButton />
    </div>
  );
};

export default App;
