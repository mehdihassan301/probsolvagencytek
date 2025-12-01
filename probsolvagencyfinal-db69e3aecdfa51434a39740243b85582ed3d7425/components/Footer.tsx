
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TwitterIcon, LinkedInIcon, GitHubIcon, ArrowRightIcon, SpinnerIcon } from './Icons';
import Logo from './Logo';
import GradientMesh from './GradientMesh';

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <li>
        <Link to={to} className="hover:text-primary dark:hover:text-accent transition-colors duration-200">
            {children}
        </Link>
    </li>
);

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(null);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
            access_key: "7eeb8a38-00ac-4282-a1b1-58bde34a471c",
            email: email,
            subject: 'Newsletter Subscription',
            from_name: 'ProbSolv Newsletter',
            message: 'New newsletter subscription from footer.'
        }),
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      } else {
        throw new Error('Subscription failed.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Could not subscribe. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
    { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
    { icon: GitHubIcon, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="relative overflow-hidden bg-surface_light dark:bg-surface_dark text-subtext_light dark:text-subtext_dark border-t border-border_light dark:border-border_dark">
      <GradientMesh />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-sm">
          {/* Left Side: Info & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <Logo />
            <p className="max-w-md">Building the Digital Backbone of Your Business.</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  aria-label={social.label} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-subtext_light dark:text-subtext_dark hover:text-primary dark:hover:text-accent"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Middle: Links */}
          <div className="md:col-span-2 lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading font-semibold text-text_light dark:text-text_dark mb-4">Company</h4>
              <ul className="space-y-3">
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/blog">Blog</FooterLink>
                <FooterLink to="/careers">Careers</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-text_light dark:text-text_dark mb-4">Services</h4>
              <ul className="space-y-3">
                <FooterLink to="/services">Our Services</FooterLink>
                <FooterLink to="/portfolio">Portfolio</FooterLink>
                <FooterLink to="/pricing">Pricing</FooterLink>
              </ul>
            </div>
             <div>
              <h4 className="font-heading font-semibold text-text_light dark:text-text_dark mb-4">Support</h4>
              <ul className="space-y-3">
                <FooterLink to="/contact">Contact Us</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </ul>
            </div>
          </div>

          {/* Right Side: Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-semibold text-text_light dark:text-text_dark mb-2">Join Our Newsletter</h4>
            <p className="mb-4 text-sm">Get the latest insights on tech, design, and AI.</p>
            {subscribed ? (
              <p role="status" className="text-green-500 animate-fade-in">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} noValidate>
                <div className="flex items-center max-w-sm">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                    aria-invalid={!!error}
                    aria-describedby="newsletter-error"
                    className={`w-full bg-surface_light dark:bg-bg_dark border rounded-l-md p-2 text-text_light dark:text-text_dark placeholder-subtext_light dark:placeholder-subtext_dark text-sm ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}
                  />
                  <button 
                    type="submit" 
                    aria-label="Subscribe to newsletter"
                    disabled={isSubmitting}
                    className="bg-primary text-white p-2 rounded-r-md hover:bg-purple-600 flex items-center justify-center h-[42px] w-12 disabled:bg-primary/70"
                  >
                    {isSubmitting ? <SpinnerIcon className="w-5 h-5" /> : <ArrowRightIcon className="w-5 h-5" />}
                  </button>
                </div>
                 {error && <p id="newsletter-error" role="alert" className="mt-2 text-sm text-red-500 animate-fade-in">{error}</p>}
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border_light dark:border-border_dark text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ProbSolv Tech Agency. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
