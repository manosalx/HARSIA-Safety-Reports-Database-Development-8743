import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiUsers, FiShield, FiGlobe } = FiIcons;

const About = () => {
  const { t, language } = useLanguage();

  const logoSrc = language === 'gr' 
    ? 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751747035836-002%20HARSIA%20LOGO-09%20%20GR%20text%20below%201920px%20PNG%20Transparent.png'
    : 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751747029189-001%20HARSIA%20LOGO-09%20%20%C3%8E%C2%95%C3%8E%C2%9D%20text%20below%201920_1920%20PNG%20transparent.png';

  const contactInfo = {
    en: {
      address: "98 Athinon Avenue, 10442 Athens, Greece",
      phone: "+30 210 516 4000",
      email: "info@harsia.gr"
    },
    gr: {
      address: "Βυτίνης 14-18 Ν.Φιλαδέλφεια, Ταχ. Κωδ.: 143 42", 
      phone: "+30 210 9608080",
      email: "info@harsia.gr"
    }
  };

  const currentContact = contactInfo[language];

  const values = [
    {
      icon: FiTarget,
      title: 'Independence',
      titleGr: 'Ανεξαρτησία',
      description: 'We conduct investigations with complete independence and impartiality.',
      descriptionGr: 'Διεξάγουμε διερευνήσεις με πλήρη ανεξαρτησία και αμεροληψία.'
    },
    {
      icon: FiShield,
      title: 'Safety First',
      titleGr: 'Ασφάλεια Πρώτα',
      description: 'Our primary focus is improving aviation safety through evidence-based recommendations.',
      descriptionGr: 'Ο κύριος στόχος μας είναι η βελτίωση της ασφάλειας της αεροπορίας μέσω συστάσεων βασισμένων σε στοιχεία.'
    },
    {
      icon: FiUsers,
      title: 'Expertise',
      titleGr: 'Εξειδίκευση',
      description: 'Our team consists of highly qualified aviation safety experts.',
      descriptionGr: 'Η ομάδα μας αποτελείται από άρτια καταρτισμένους ειδικούς ασφάλειας αεροπορίας.'
    },
    {
      icon: FiGlobe,
      title: 'International Standards',
      titleGr: 'Διεθνή Πρότυπα',
      description: 'We follow international standards and best practices in aviation safety investigation.',
      descriptionGr: 'Ακολουθούμε διεθνή πρότυπα και βέλτιστες πρακτικές στη διερεύνηση ασφάλειας αεροπορίας.'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <img
                src={logoSrc}
                alt="ΕΟΔΑΣΑΑΜ Logo"
                className="h-24 w-auto mx-auto mb-6"
              />
              <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                {language === 'gr' ? 'Σχετικά με τον ΕΟΔΑΣΑΑΜ' : `${t('about')} ${t('organizationShort')}`}
              </h1>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                {t('organizationName')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                {language === 'gr' ? 'Η Αποστολή μας' : 'Our Mission'}
              </h2>
              <div className="space-y-4 text-lg text-secondary-700">
                {language === 'gr' ? (
                  <>
                    <p>
                      Ο ΕΟΔΑΣΑΑΜ είναι η Εθνική αρχή υπεύθυνη για τη διερεύνηση ατυχημάτων και συμβάντων αεροπορίας στην Ελλάδα. Αναλάβαμε τις αρμοδιότητες της πρώην ΕΔΑΑΠ (Επιτροπή Διερεύνησης Ατυχημάτων και Ασφάλειας Πτήσεων) για να συνεχίσουμε το ζωτικό έργο της Διερεύνησης Ασφάλειας Πολιτικής Αεροπορίας.
                    </p>
                    <p>
                      Η αποστολή μας είναι η βελτίωση της ασφάλειας της πολιτικής αεροπορίας μέσω της διεξαγωγής εις βάθος, ανεξάρτητων διερευνήσεων ατυχημάτων και σοβαρών συμβάντων και της έκδοσης συστάσεων ασφάλειας βασισμένων σε στοιχεία για την πρόληψη μελλοντικών περιστατικών.
                    </p>
                    <p>
                      Συνεργαζόμαστε στενά με διεθνείς οργανισμούς ασφάλειας αεροπορίας και ακολουθούμε καθιερωμένα διεθνή πρότυπα για να διασφαλίσουμε την υψηλότερη ποιότητα διερεύνησης και αναφοράς.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      HARSIA is the independent authority responsible for investigating aviation accidents and incidents in Greece. We took over the responsibilities of the former AAIASB (Air Accidents Investigation and Aviation Safety Board) to continue the vital work of aviation safety investigation.
                    </p>
                    <p>
                      Our mission is to improve aviation safety by conducting thorough, independent investigations of aviation accidents and incidents, and issuing evidence-based safety recommendations to prevent future occurrences.
                    </p>
                    <p>
                      We work closely with international aviation safety organizations and follow established international standards to ensure the highest quality of investigation and reporting.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <img
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751755295248-blob"
                alt="Aviation Safety"
                className="rounded-lg shadow-soft"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              {language === 'gr' ? 'Οι Αξίες μας' : 'Our Values'}
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              {language === 'gr' 
                ? 'Οι αρχές που καθοδηγούν το έργο μας στη διερεύνηση ασφάλειας αεροπορίας'
                : 'The principles that guide our work in aviation safety investigation'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                  <SafeIcon icon={value.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {language === 'gr' ? value.titleGr : value.title}
                </h3>
                <p className="text-secondary-600">
                  {language === 'gr' ? value.descriptionGr : value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              {language === 'gr' ? 'Οι Αρμοδιότητές μας' : 'Our Responsibilities'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-soft"
            >
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                {language === 'gr' ? 'Δραστηριότητες Διερεύνησης' : 'Investigation Activities'}
              </h3>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'gr' 
                      ? 'Διεξαγωγή εις βάθος διερευνήσεων ατυχημάτων και σοβαρών συμβάντων αεροπορίας'
                      : 'Conduct thorough investigations of aviation accidents and serious incidents'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'gr'
                      ? 'Προσδιορισμός των αιτιών και συμβάλλοντων παραγόντων των περιστατικών αεροπορίας'
                      : 'Determine the causes and contributing factors of aviation occurrences'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'gr'
                      ? 'Δημοσίευση λεπτομερών εκθέσεων διερεύνησης με ευρήματα και συμπεράσματα'
                      : 'Publish detailed investigation reports with findings and conclusions'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'gr'
                      ? 'Συντονισμός με διεθνείς αρχές διερεύνησης όταν απαιτείται'
                      : 'Coordinate with international investigation authorities when required'
                    }
                  </span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg p-8 shadow-soft"
            >
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                {language === 'gr' ? 'Συστάσεις Ασφάλειας' : 'Safety Recommendations'}
              </h3>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'gr'
                      ? 'Έκδοση συστάσεων ασφάλειας βασισμένων σε στοιχεία για την πρόληψη μελλοντικών περιστατικών'
                      : 'Issue evidence-based safety recommendations to prevent future occurrences'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'gr'
                      ? 'Παρακολούθηση της υλοποίησης των συστάσεων ασφάλειας'
                      : 'Monitor the implementation of safety recommendations'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'gr'
                      ? 'Συνεργασία με αρχές αεροπορίας και ενδιαφερόμενους φορείς της βιομηχανίας'
                      : 'Collaborate with aviation authorities and industry stakeholders'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'gr'
                      ? 'Συμβολή στη συνεχή βελτίωση της ασφάλειας αεροπορίας'
                      : 'Contribute to the continuous improvement of aviation safety'
                    }
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'gr' ? 'Επικοινωνήστε μαζί μας' : 'Contact Us'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'gr' 
              ? 'Για ερωτήματα σχετικά με τις διερευνήσεις ή τις συστάσεις ασφάλειας μας, παρακαλώ επικοινωνήστε μαζί μας.'
              : 'For inquiries about our investigations or safety recommendations, please contact us.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="mailto:info@harsia.gr"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-secondary-100 transition-colors duration-200 inline-flex items-center justify-center"
            >
              {language === 'gr' ? 'Αποστολή Email' : 'Email Us'}
            </a>
            <a
              href="tel:+302109608080"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200 inline-flex items-center justify-center"
            >
              {language === 'gr' ? 'Τηλέφωνο' : 'Call Us'}
            </a>
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">
              {currentContact.address}
            </p>
            <p>
              {language === 'gr' ? 'Τηλεφωνικό κέντρο: ' : 'Phone: '}{currentContact.phone}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;