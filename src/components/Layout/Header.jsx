import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiUser, FiLogOut, FiExternalLink } = FiIcons;

const Header = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const logoSrc = language === 'gr' 
    ? 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751747035836-002%20HARSIA%20LOGO-09%20%20GR%20text%20below%201920px%20PNG%20Transparent.png'
    : 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751747029189-001%20HARSIA%20LOGO-09%20%20%C3%8E%C2%95%C3%8E%C2%9D%20text%20below%201920_1920%20PNG%20transparent.png';

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50 relative">
      {/* Background overlay for better contrast */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logoSrc}
              alt="HARSIA Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              {t('home')}
            </Link>
            <Link
              to="/reports"
              className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              {t('reports')}
            </Link>
            <Link
              to="/recommendations"
              className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              {t('recommendations')}
            </Link>
            <Link
              to="/about"
              className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              {t('about')}
            </Link>
            <a
              href="https://www.harsia.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium flex items-center space-x-1"
            >
              <span>{language === 'gr' ? 'Επίσημη Ιστοσελίδα' : 'Official Website'}</span>
              <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-secondary-800 hover:text-primary-600 transition-colors duration-200"
                >
                  <SafeIcon icon={FiUser} className="w-5 h-5" />
                  <span className="hidden sm:inline">{t('dashboard')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-secondary-800 hover:text-red-600 transition-colors duration-200"
                >
                  <SafeIcon icon={FiLogOut} className="w-5 h-5" />
                  <span className="hidden sm:inline">{t('logout')}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {t('login')}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-secondary-200"
          >
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                to="/reports"
                className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('reports')}
              </Link>
              <Link
                to="/recommendations"
                className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('recommendations')}
              </Link>
              <Link
                to="/about"
                className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about')}
              </Link>
              <a
                href="https://www.harsia.gr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-800 hover:text-primary-600 transition-colors duration-200 font-medium flex items-center space-x-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{language === 'gr' ? 'Επίσημη Ιστοσελίδα' : 'Official Website'}</span>
                <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;