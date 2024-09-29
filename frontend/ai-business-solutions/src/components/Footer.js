import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Cpu } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-cyan-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4 col-span-2">
            <Link to="/" className="text-cyan-400 font-bold text-2xl flex items-center">
              <Cpu className="mr-2 h-8 w-8 animate-pulse" />
              <span>EcoPulse AI</span>
            </Link>
            <p className="text-sm text-cyan-300">Empowering businesses with AI-driven sustainability solutions. Our cutting-edge tools help you make informed decisions for a greener future.</p>
            <div className="flex space-x-4 mt-4">
              <SocialLink href="https://github.com" Icon={Github} label="GitHub" />
              <SocialLink href="https://twitter.com" Icon={Twitter} label="Twitter" />
              <SocialLink href="https://linkedin.com" Icon={Linkedin} label="LinkedIn" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-300">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/sustainability-report" label="Sustainability Report" />
              <FooterLink to="/environmental-impact" label="Environmental Impact" />
              <FooterLink to="/business-model" label="Business Model" />
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-300">Our AI Tools</h3>
            <ul className="space-y-2">
              <FooterLink to="/predict" label="AI Prediction" />
              <FooterLink to="/generate-text" label="Text Generation" />
              <FooterLink to="/generate-image" label="Image Generation" />
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-cyan-300">&copy; {currentYear} EcoPulse AI. All rights reserved.</p>
          <p className="text-xs text-cyan-400 mt-2">Powered by sustainable AI technologies</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
    >
      {label}
    </Link>
  </li>
);

const SocialLink = ({ href, Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </a>
);

export default Footer;