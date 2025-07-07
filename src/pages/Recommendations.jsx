import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useRecommendations } from '../hooks/useRecommendations';
import { format } from 'date-fns';
import SearchFilter from '../components/Common/SearchFilter';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiCalendar, FiUser, FiLink } = FiIcons;

const Recommendations = () => {
  const { t, language } = useLanguage();
  const { recommendations, loading, error } = useRecommendations();
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ year: '', status: '', recipient: '' });

  useEffect(() => {
    setFilteredRecommendations(recommendations);
  }, [recommendations]);

  useEffect(() => {
    let filtered = recommendations;

    if (searchTerm) {
      filtered = filtered.filter(recommendation =>
        recommendation.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recommendation.title_gr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recommendation.recommendation_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recommendation.recipient_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recommendation.recipient_gr?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.year) {
      filtered = filtered.filter(recommendation =>
        new Date(recommendation.issue_date).getFullYear().toString() === filters.year
      );
    }

    if (filters.status) {
      filtered = filtered.filter(recommendation => recommendation.status === filters.status);
    }

    if (filters.recipient) {
      filtered = filtered.filter(recommendation =>
        recommendation.recipient_en?.toLowerCase().includes(filters.recipient.toLowerCase()) ||
        recommendation.recipient_gr?.toLowerCase().includes(filters.recipient.toLowerCase())
      );
    }

    setFilteredRecommendations(filtered);
  }, [searchTerm, filters, recommendations]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Implemented': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterOptions = [
    {
      key: 'year',
      placeholder: 'Year',
      value: filters.year,
      options: [
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' }
      ]
    },
    {
      key: 'status',
      placeholder: 'Status',
      value: filters.status,
      options: [
        { value: 'Open', label: 'Open' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Implemented', label: 'Implemented' },
        { value: 'Closed', label: 'Closed' }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading recommendations: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            {t('recommendations')}
          </h1>
          <p className="text-lg text-secondary-600">
            Safety recommendations issued based on investigation findings
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filterOptions}
          onFilterChange={handleFilterChange}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-secondary-600">
            {filteredRecommendations.length} {filteredRecommendations.length === 1 ? 'recommendation' : 'recommendations'} found
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-soft hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiShield} className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {recommendation.recommendation_number}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        recommendation.category === 'Operational' ? 'bg-blue-100 text-blue-800' :
                        recommendation.category === 'Training' ? 'bg-purple-100 text-purple-800' :
                        recommendation.category === 'Technical' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {recommendation.category}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(recommendation.status)}`}>
                    {recommendation.status}
                  </span>
                </div>

                <h4 className="text-xl font-semibold text-secondary-900 mb-3 line-clamp-2">
                  {language === 'gr' ? recommendation.title_gr : recommendation.title_en}
                </h4>

                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {language === 'gr' ? recommendation.description_gr : recommendation.description_en}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-secondary-500">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                    <span>Issued: {format(new Date(recommendation.issue_date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-sm text-secondary-500">
                    <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
                    <span>{language === 'gr' ? recommendation.recipient_gr : recommendation.recipient_en}</span>
                  </div>
                  {recommendation.related_report && (
                    <div className="flex items-center text-sm text-secondary-500">
                      <SafeIcon icon={FiLink} className="w-4 h-4 mr-2" />
                      <span>Related Report: {recommendation.related_report.report_number}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                  <Link
                    to={`/recommendations/${recommendation.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                  >
                    {t('view')} Details
                  </Link>
                  {recommendation.related_report && (
                    <Link
                      to={`/reports/${recommendation.related_report.id}`}
                      className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-800 transition-colors duration-200"
                    >
                      <SafeIcon icon={FiLink} className="w-4 h-4" />
                      <span className="text-sm">View Report</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiShield} className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No recommendations found</h3>
            <p className="text-secondary-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;