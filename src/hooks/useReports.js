import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('investigation_reports_hr2024')
        .select('*')
        .order('publication_date', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('investigation_reports_hr2024')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching report:', err);
      return null;
    }
  };

  const createReport = async (reportData) => {
    try {
      const { data, error } = await supabase
        .from('investigation_reports_hr2024')
        .insert([reportData])
        .select()
        .single();

      if (error) throw error;
      setReports(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      console.error('Error creating report:', err);
      return { success: false, error: err.message };
    }
  };

  const updateReport = async (id, reportData) => {
    try {
      const { data, error } = await supabase
        .from('investigation_reports_hr2024')
        .update({ ...reportData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setReports(prev => prev.map(report => 
        report.id === id ? data : report
      ));
      return { success: true, data };
    } catch (err) {
      console.error('Error updating report:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteReport = async (id) => {
    try {
      const { error } = await supabase
        .from('investigation_reports_hr2024')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setReports(prev => prev.filter(report => report.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting report:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
    fetchReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
  };
};