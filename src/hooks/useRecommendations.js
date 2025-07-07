import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('safety_recommendations_hr2024')
        .select(`
          *,
          related_report:investigation_reports_hr2024(
            id,
            report_number,
            title_en,
            title_gr
          )
        `)
        .order('issue_date', { ascending: false });

      if (error) throw error;
      setRecommendations(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('safety_recommendations_hr2024')
        .select(`
          *,
          related_report:investigation_reports_hr2024(
            id,
            report_number,
            title_en,
            title_gr
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching recommendation:', err);
      return null;
    }
  };

  const createRecommendation = async (recommendationData) => {
    try {
      const { data, error } = await supabase
        .from('safety_recommendations_hr2024')
        .insert([recommendationData])
        .select()
        .single();

      if (error) throw error;
      setRecommendations(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      console.error('Error creating recommendation:', err);
      return { success: false, error: err.message };
    }
  };

  const updateRecommendation = async (id, recommendationData) => {
    try {
      const { data, error } = await supabase
        .from('safety_recommendations_hr2024')
        .update({ ...recommendationData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setRecommendations(prev => prev.map(rec => 
        rec.id === id ? data : rec
      ));
      return { success: true, data };
    } catch (err) {
      console.error('Error updating recommendation:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteRecommendation = async (id) => {
    try {
      const { error } = await supabase
        .from('safety_recommendations_hr2024')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setRecommendations(prev => prev.filter(rec => rec.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting recommendation:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return {
    recommendations,
    loading,
    error,
    fetchRecommendations,
    getRecommendationById,
    createRecommendation,
    updateRecommendation,
    deleteRecommendation
  };
};