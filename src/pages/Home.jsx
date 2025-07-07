import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiShield, FiTrendingUp, FiUsers } = FiIcons;

const Home = () => {
  const { t, language } = useLanguage();

  const stats = [
    { icon: FiFileText, label: t('reports'), value: '245', color: 'text-blue-600' },
    { icon: FiShield, label: t('recommendations'), value: '189', color: 'text-green-600' },
    { icon: FiTrendingUp, label: 'Implemented', value: '156', color: 'text-purple-600' },
    { icon: FiUsers, label: 'Active Cases', value: '33', color: 'text-orange-600' }
  ];

  const heroImage = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751755295248-blob";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundBlendMode: 'multiply'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {t('organizationShort')}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('organizationName')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/reports"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-secondary-100 transition-colors duration-200 inline-flex items-center justify-center"
              >
                {t('reports')}
              </Link>
              <Link
                to="/recommendations"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200 inline-flex items-center justify-center"
              >
                {t('recommendations')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 mb-4`}>
                  <SafeIcon icon={stat.icon} className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-secondary-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Ensuring aviation safety through comprehensive investigation and evidence-based recommendations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiFileText,
                title: 'Investigation Reports',
                description: 'Comprehensive analysis of aviation incidents and accidents with detailed findings and conclusions.'
              },
              {
                icon: FiShield,
                title: 'Safety Recommendations',
                description: 'Evidence-based recommendations to prevent future occurrences and improve aviation safety.'
              },
              {
                icon: FiTrendingUp,
                title: 'Continuous Improvement',
                description: 'Monitoring implementation of safety recommendations and tracking industry progress.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg p-6 shadow-soft hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Informed About Aviation Safety
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Access the latest investigation reports and safety recommendations to stay current with aviation safety developments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reports"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-secondary-100 transition-colors duration-200 inline-flex items-center justify-center"
            >
              Browse Reports
            </Link>
            <Link
              to="/recommendations"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200 inline-flex items-center justify-center"
            >
              View Recommendations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;