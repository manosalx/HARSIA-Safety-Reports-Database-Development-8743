import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useReports } from '../hooks/useReports';
import { useRecommendations } from '../hooks/useRecommendations';
import { toast } from 'react-toastify';
import SafeIcon from '../common/SafeIcon';
import ReportForm from '../components/Forms/ReportForm';
import RecommendationForm from '../components/Forms/RecommendationForm';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash2, FiFileText, FiShield, FiBarChart } = FiIcons;

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { reports, loading: reportsLoading, deleteReport } = useReports();
  const { recommendations, loading: recommendationsLoading, deleteRecommendation } = useRecommendations();
  const [activeTab, setActiveTab] = useState('overview');
  const [showReportForm, setShowReportForm] = useState(false);
  const [showRecommendationForm, setShowRecommendationForm] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [editingRecommendation, setEditingRecommendation] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: '', item: null });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Final': return 'bg-green-100 text-green-800';
      case 'Open': return 'bg-red-100 text-red-800';
      case 'Implemented': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditReport = (report) => {
    setEditingReport(report);
    setShowReportForm(true);
  };

  const handleEditRecommendation = (recommendation) => {
    setEditingRecommendation(recommendation);
    setShowRecommendationForm(true);
  };

  const handleDeleteReport = (report) => {
    setConfirmDialog({
      isOpen: true,
      type: 'report',
      item: report
    });
  };

  const handleDeleteRecommendation = (recommendation) => {
    setConfirmDialog({
      isOpen: true,
      type: 'recommendation',
      item: recommendation
    });
  };

  const confirmDelete = async () => {
    const { type, item } = confirmDialog;
    
    try {
      let result;
      if (type === 'report') {
        result = await deleteReport(item.id);
      } else {
        result = await deleteRecommendation(item.id);
      }

      if (result.success) {
        toast.success(`${type === 'report' ? 'Report' : 'Recommendation'} deleted successfully`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(`Failed to delete ${type}`);
    }

    setConfirmDialog({ isOpen: false, type: '', item: null });
  };

  const handleFormClose = () => {
    setShowReportForm(false);
    setShowRecommendationForm(false);
    setEditingReport(null);
    setEditingRecommendation(null);
  };

  const handleFormSave = (data) => {
    // The form will handle the save and refresh the data
    // through the hooks
  };

  const stats = [
    {
      icon: FiFileText,
      label: 'Total Reports',
      value: reports.length.toString(),
      change: '+12',
      changeType: 'increase'
    },
    {
      icon: FiShield,
      label: 'Total Recommendations',
      value: recommendations.length.toString(),
      change: '+5',
      changeType: 'increase'
    },
    {
      icon: FiBarChart,
      label: 'Implemented',
      value: recommendations.filter(r => r.status === 'Implemented').length.toString(),
      change: '+8',
      changeType: 'increase'
    }
  ];

  const recentReports = reports.slice(0, 3);
  const recentRecommendations = recommendations.slice(0, 3);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart },
    { id: 'reports', label: 'Manage Reports', icon: FiFileText },
    { id: 'recommendations', label: 'Manage Recommendations', icon: FiShield }
  ];

  if (reportsLoading || recommendationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            {t('dashboard')}
          </h1>
          <p className="text-lg text-secondary-600">
            Welcome back, {user?.name || user?.email}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-secondary-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-soft p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary-600 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-secondary-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100">
                      <SafeIcon icon={stat.icon} className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Reports */}
              <div className="bg-white rounded-lg shadow-soft p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Recent Reports
                  </h3>
                  <button
                    onClick={() => setActiveTab('reports')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary-50">
                      <div className="flex-1">
                        <p className="font-medium text-secondary-900">
                          {report.report_number}
                        </p>
                        <p className="text-sm text-secondary-600">
                          {report.title_en}
                        </p>
                        <p className="text-xs text-secondary-500 mt-1">
                          {report.publication_date}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Recommendations */}
              <div className="bg-white rounded-lg shadow-soft p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Recent Recommendations
                  </h3>
                  <button
                    onClick={() => setActiveTab('recommendations')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentRecommendations.map((recommendation) => (
                    <div key={recommendation.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary-50">
                      <div className="flex-1">
                        <p className="font-medium text-secondary-900">
                          {recommendation.recommendation_number}
                        </p>
                        <p className="text-sm text-secondary-600">
                          {recommendation.title_en}
                        </p>
                        <p className="text-xs text-secondary-500 mt-1">
                          {recommendation.issue_date}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(recommendation.status)}`}>
                        {recommendation.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Management Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-900">
                Manage Reports
              </h2>
              <button
                onClick={() => setShowReportForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Add Report</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Report Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-200">
                    {reports.map((report) => (
                      <tr key={report.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                          {report.report_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                          {report.title_en}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {report.publication_date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditReport(report)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <SafeIcon icon={FiEdit} className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteReport(report)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Management Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-900">
                Manage Recommendations
              </h2>
              <button
                onClick={() => setShowRecommendationForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Add Recommendation</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Recommendation Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-200">
                    {recommendations.map((recommendation) => (
                      <tr key={recommendation.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                          {recommendation.recommendation_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                          {recommendation.title_en}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {recommendation.issue_date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(recommendation.status)}`}>
                            {recommendation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditRecommendation(recommendation)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <SafeIcon icon={FiEdit} className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRecommendation(recommendation)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Forms */}
      {showReportForm && (
        <ReportForm
          report={editingReport}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}

      {showRecommendationForm && (
        <RecommendationForm
          recommendation={editingRecommendation}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, type: '', item: null })}
        onConfirm={confirmDelete}
        title={`Delete ${confirmDialog.type === 'report' ? 'Report' : 'Recommendation'}`}
        message={`Are you sure you want to delete this ${confirmDialog.type}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Dashboard;