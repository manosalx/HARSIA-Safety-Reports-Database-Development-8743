import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin } = FiIcons;

const Footer = () => {
  const { t, language } = useLanguage();

  const contactInfo = {
    en: {
      address: "98 Athinon Avenue, 10442 Athens, Greece",
      phone: "+30 210 516 4000",
      email: "info@harsia.gr",
      description: "Hellenic Air and Rail Safety Investigation Authority"
    },
    gr: {
      address: "Βυτίνης 14-18 Ν.Φιλαδέλφεια, Ταχ. Κωδ.: 143 42",
      phone: "+30 210 9608080",
      email: "info@harsia.gr",
      description: "Εθνικός Οργανισμός Διερεύνησης Αεροπορικών & Σιδηροδρομικών Ατυχημάτων & Ασφάλειας Μεταφορών"
    }
  };

  const currentContact = contactInfo[language];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('organizationShort')}</h3>
            <p className="text-secondary-300 text-sm leading-relaxed">
              {currentContact.description}
            </p>
            <div className="flex items-start space-x-2 text-secondary-300">
              <SafeIcon icon={FiMapPin} className="w-4 h-4 mt-1 flex-shrink-0" />
              <span className="text-sm">{currentContact.address}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {language === 'gr' ? 'Γρήγοροι Σύνδεσμοι' : 'Quick Links'}
            </h3>
            <div className="space-y-2">
              <a
                href="/reports"
                className="block text-secondary-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {t('reports')}
              </a>
              <a
                href="/recommendations"
                className="block text-secondary-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {t('recommendations')}
              </a>
              <a
                href="/about"
                className="block text-secondary-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {t('about')}
              </a>
              <a
                href="https://www.harsia.gr"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-secondary-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {language === 'gr' ? 'Επίσημη Ιστοσελίδα' : 'Official Website'}
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {language === 'gr' ? 'Επικοινωνία' : 'Contact'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-secondary-300">
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <a 
                  href={`mailto:${currentContact.email}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {currentContact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-secondary-300">
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <a 
                  href={`tel:${currentContact.phone}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {language === 'gr' ? 'Τηλεφωνικό κέντρο: ' : 'Phone: '}{currentContact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 text-center">
          <p className="text-secondary-400 text-sm">
            © {new Date().getFullYear()} {t('organizationShort')}. {language === 'gr' ? 'Όλα τα δικαιώματα διατηρούνται.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;