import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGlobe } = FiIcons;

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      flag: '🇬🇧',
      shortName: 'EN'
    },
    { 
      code: 'gr', 
      name: 'Ελληνικά', 
      flag: '🇬🇷',
      shortName: 'GR'
    }
  ];

  return (
    <div className="flex items-center space-x-2 bg-secondary-100 rounded-lg p-1">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            language === lang.code
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-secondary-600 hover:text-secondary-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg select-none" role="img" aria-label={`${lang.name} flag`}>
            {lang.flag}
          </span>
          <span className="hidden sm:inline">{lang.name}</span>
          <span className="sm:hidden font-semibold">{lang.shortName}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;