import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRecommendations } from '../../hooks/useRecommendations';
import { useReports } from '../../hooks/useReports';
import { toast } from 'react-toastify';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX } = FiIcons;

const RecommendationForm = ({ recommendation, onClose, onSave }) => {
  const { t } = useLanguage();
  const { createRecommendation, updateRecommendation } = useRecommendations();
  const { reports } = useReports();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recommendation_number: '',
    title_en: '',
    title_gr: '',
    description_en: '',
    description_gr: '',
    issue_date: '',
    recipient_en: '',
    recipient_gr: '',
    status: 'Open',
    category: 'Operational',
    related_report_id: ''
  });

  useEffect(() => {
    if (recommendation) {
      setFormData({
        recommendation_number: recommendation.recommendation_number || '',
        title_en: recommendation.title_en || '',
        title_gr: recommendation.title_gr || '',
        description_en: recommendation.description_en || '',
        description_gr: recommendation.description_gr || '',
        issue_date: recommendation.issue_date || '',
        recipient_en: recommendation.recipient_en || '',
        recipient_gr: recommendation.recipient_gr || '',
        status: recommendation.status || 'Open',
        category: recommendation.category || 'Operational',
        related_report_id: recommendation.related_report_id || ''
      });
    }
  }, [recommendation]);

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
      if (recommendation) {
        result = await updateRecommendation(recommendation.id, formData);
      } else {
        result = await createRecommendation(formData);
      }

      if (result.success) {
        toast.success(recommendation ? 'Recommendation updated successfully' : 'Recommendation created successfully');
        onSave(result.data);
        onClose();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to save recommendation');
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
              {recommendation ? 'Edit Recommendation' : 'Add New Recommendation'}
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
                Recommendation Number *
              </label>
              <input
                type="text"
                name="recommendation_number"
                value={formData.recommendation_number}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., HARSIA-SR-2024-001"
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
                <option value="Operational">Operational</option>
                <option value="Training">Training</option>
                <option value="Technical">Technical</option>
                <option value="Regulatory">Regulatory</option>
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
                <option value="Open">Open</option>
                <option value="Under Review">Under Review</option>
                <option value="Implemented">Implemented</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Issue Date *
              </label>
              <input
                type="date"
                name="issue_date"
                value={formData.issue_date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Related Report
              </label>
              <select
                name="related_report_id"
                value={formData.related_report_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select a related report (optional)</option>
                {reports.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.report_number} - {report.title_en}
                  </option>
                ))}
              </select>
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
              placeholder="Recommendation title in English"
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
              placeholder="Τίτλος σύστασης στα ελληνικά"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Recipient (English) *
            </label>
            <input
              type="text"
              name="recipient_en"
              value={formData.recipient_en}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Recipient organization in English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Recipient (Greek) *
            </label>
            <input
              type="text"
              name="recipient_gr"
              value={formData.recipient_gr}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Οργανισμός παραλήπτη στα ελληνικά"
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
              placeholder="Recommendation description in English"
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
              placeholder="Περιγραφή σύστασης στα ελληνικά"
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
              <span>{loading ? 'Saving...' : 'Save Recommendation'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RecommendationForm;