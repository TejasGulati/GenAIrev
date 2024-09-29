import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User, LogOut, Cpu, LineChart, BookOpen, Zap, BarChart, Image, FileText } from 'lucide-react';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || isMenuOpen ? 'bg-slate-900 shadow-lg' : 'bg-transparent backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-cyan-400 font-bold text-xl flex items-center">
              <Cpu className="mr-2 h-8 w-8 animate-pulse" />
              <span className="hidden sm:inline">EcoPulse</span>
              <span className="sm:hidden">AI</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/" label="Home" icon={<BookOpen className="w-4 h-4 mr-1" />} />
              {isAuthenticated ? (
                <>
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="text-cyan-400 hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Tools <ChevronDown className="ml-1 h-4 w-4" />
                    </motion.button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 divide-y divide-slate-700 focus:outline-none"
                        >
                          <div className="py-1">
                            <DropdownLink to="/sustainability-report" label="Sustainability Report" icon={<FileText className="w-4 h-4 mr-2" />} />
                            <DropdownLink to="/environmental-impact" label="Environmental Impact" icon={<BarChart className="w-4 h-4 mr-2" />} />
                            <DropdownLink to="/business-model" label="Business Model" icon={<LineChart className="w-4 h-4 mr-2" />} />
                            <DropdownLink to="/predict" label="Prediction" icon={<Zap className="w-4 h-4 mr-2" />} />
                            <DropdownLink to="/generate-text" label="Generate Text" icon={<FileText className="w-4 h-4 mr-2" />} />
                            <DropdownLink to="/generate-image" label="Generate Image" icon={<Image className="w-4 h-4 mr-2" />} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <NavLink to="/profile" icon={<User className="w-4 h-4 mr-1" />} label="Profile" />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="text-cyan-400 hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <NavLink to="/register" label="Register" />
                  <NavLink to="/login" label="Login" />
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-400 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? <Menu className="block h-6 w-6" /> : <X className="block h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900 shadow-lg overflow-hidden"
            id="mobile-menu"
          >
            <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to="/" label="Home" icon={<BookOpen className="w-4 h-4 mr-2" />} onClick={() => setIsMenuOpen(false)} />
              {isAuthenticated ? (
                <>
                  <MobileNavLink to="/profile" label="Profile" icon={<User className="w-4 h-4 mr-2" />} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/sustainability-report" label="Sustainability Report" icon={<FileText className="w-4 h-4 mr-2" />} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/environmental-impact" label="Environmental Impact" icon={<BarChart className="w-4 h-4 mr-2" />} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/business-model" label="Business Model" icon={<LineChart className="w-4 h-4 mr-2" />} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/predict" label="Prediction" icon={<Zap className="w-4 h-4 mr-2" />} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/generate-text" label="Generate Text" icon={<FileText className="w-4 h-4 mr-2" />} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/generate-image" label="Generate Image" icon={<Image className="w-4 h-4 mr-2" />} onClick={() => setIsMenuOpen(false)} />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-cyan-400 hover:bg-slate-800 transition-colors duration-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <MobileNavLink to="/register" label="Register" onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/login" label="Login" onClick={() => setIsMenuOpen(false)} />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ to, label, icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center ${
          isActive ? 'bg-slate-800 text-cyan-400' : 'text-cyan-400 hover:bg-slate-800'
        }`}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {label}
      </Link>
    </motion.div>
  );
}

function MobileNavLink({ to, label, icon, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={to}
        onClick={onClick}
        className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
          isActive ? 'bg-slate-800 text-cyan-400' : 'text-cyan-400 hover:bg-slate-800'
        }`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </Link>
    </motion.div>
  );
}

function DropdownLink({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-2 text-sm text-cyan-400 hover:bg-slate-700 transition-colors duration-300"
      role="menuitem"
    >
      {icon}
      {label}
    </Link>
  );
}

export default Navbar;