import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useReports } from '../../hooks/useReports';
import { toast } from 'react-toastify';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX } = FiIcons;

const ReportForm = ({ report, onClose, onSave }) => {
  const { t } = useLanguage();
  const { createReport, updateReport } = useReports();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    report_number: '',
    title_en: '',
    title_gr: '',
    description_en: '',
    description_gr: '',
    investigation_date: '',
    publication_date: '',
    aircraft_type: '',
    location_en: '',
    location_gr: '',
    category: 'Accident',
    status: 'Draft',
    pdf_url: ''
  });

  useEffect(() => {
    if (report) {
      setFormData({
        report_number: report.report_number || '',
        title_en: report.title_en || '',
        title_gr: report.title_gr || '',
        description_en: report.description_en || '',
        description_gr: report.description_gr || '',
        investigation_date: report.investigation_date || '',
        publication_date: report.publication_date || '',
        aircraft_type: report.aircraft_type || '',
        location_en: report.location_en || '',
        location_gr: report.location_gr || '',
        category: report.category || 'Accident',
        status: report.status || 'Draft',
        pdf_url: report.pdf_url || ''
      });
    }
  }, [report]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (report) {
        result = await updateReport(report.id, formData);
      } else {
        result = await createReport(formData);
      }

      if (result.success) {
        toast.success(report ? 'Report updated successfully' : 'Report created successfully');
        onSave(result.data);
        onClose();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to save report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-secondary-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-secondary-900">
              {report ? 'Edit Report' : 'Add New Report'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Report Number *
              </label>
              <input
                type="text"
                name="report_number"
                value={formData.report_number}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., HARSIA-2024-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Accident">Accident</option>
                <option value="Serious Incident">Serious Incident</option>
                <option value="Incident">Incident</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Draft">Draft</option>
                <option value="Under Review">Under Review</option>
                <option value="Final">Final</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Aircraft Type
              </label>
              <input
                type="text"
                name="aircraft_type"
                value={formData.aircraft_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Boeing 737-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Investigation Date
              </label>
              <input
                type="date"
                name="investigation_date"
                value={formData.investigation_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Publication Date
              </label>
              <input
                type="date"
                name="publication_date"
                value={formData.publication_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Title (English) *
            </label>
            <input
              type="text"
              name="title_en"
              value={formData.title_en}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Report title in English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Title (Greek) *
            </label>
            <input
              type="text"
              name="title_gr"
              value={formData.title_gr}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Τίτλος έκθεσης στα ελληνικά"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Location (English)
            </label>
            <input
              type="text"
              name="location_en"
              value={formData.location_en}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Location in English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Location (Greek)
            </label>
            <input
              type="text"
              name="location_gr"
              value={formData.location_gr}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Τοποθεσία στα ελληνικά"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Description (English) *
            </label>
            <textarea
              name="description_en"
              value={formData.description_en}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Report description in English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Description (Greek) *
            </label>
            <textarea
              name="description_gr"
              value={formData.description_gr}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Περιγραφή έκθεσης στα ελληνικά"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              PDF URL
            </label>
            <input
              type="url"
              name="pdf_url"
              value={formData.pdf_url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="https://example.com/report.pdf"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-secondary-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Report'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ReportForm;