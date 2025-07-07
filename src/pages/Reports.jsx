import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useReports } from '../hooks/useReports';
import { format } from 'date-fns';
import SearchFilter from '../components/Common/SearchFilter';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiCalendar, FiMapPin, FiDownload } = FiIcons;

const Reports = () => {
  const { t, language } = useLanguage();
  const { reports, loading, error } = useReports();
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ year: '', category: '', status: '' });

  useEffect(() => {
    setFilteredReports(reports);
  }, [reports]);

  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.title_gr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.report_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.aircraft_type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.year) {
      filtered = filtered.filter(report =>
        new Date(report.publication_date).getFullYear().toString() === filters.year
      );
    }

    if (filters.category) {
      filtered = filtered.filter(report => report.category === filters.category);
    }

    if (filters.status) {
      filtered = filtered.filter(report => report.status === filters.status);
    }

    setFilteredReports(filtered);
  }, [searchTerm, filters, reports]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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
      key: 'category',
      placeholder: 'Category',
      value: filters.category,
      options: [
        { value: 'Accident', label: 'Accident' },
        { value: 'Serious Incident', label: 'Serious Incident' },
        { value: 'Incident', label: 'Incident' }
      ]
    },
    {
      key: 'status',
      placeholder: 'Status',
      value: filters.status,
      options: [
        { value: 'Final', label: 'Final' },
        { value: 'Interim', label: 'Interim' },
        { value: 'Preliminary', label: 'Preliminary' }
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
          <p className="text-red-600">Error loading reports: {error}</p>
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
            {t('reports')}
          </h1>
          <p className="text-lg text-secondary-600">
            Investigation reports of aviation accidents and incidents
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
            {filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'} found
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-soft hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiFileText} className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {report.report_number}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        report.category === 'Accident' ? 'bg-red-100 text-red-800' :
                        report.category === 'Serious Incident' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-secondary-500 bg-secondary-100 px-2 py-1 rounded">
                    {report.status}
                  </span>
                </div>

                <h4 className="text-xl font-semibold text-secondary-900 mb-3 line-clamp-2">
                  {language === 'gr' ? report.title_gr : report.title_en}
                </h4>

                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {language === 'gr' ? report.description_gr : report.description_en}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-secondary-500">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                    <span>Published: {format(new Date(report.publication_date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-sm text-secondary-500">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                    <span>{language === 'gr' ? report.location_gr : report.location_en}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                  <Link
                    to={`/reports/${report.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                  >
                    {t('view')} Details
                  </Link>
                  {report.pdf_url && (
                    <a
                      href={report.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-800 transition-colors duration-200"
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4" />
                      <span className="text-sm">PDF</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiFileText} className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No reports found</h3>
            <p className="text-secondary-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;