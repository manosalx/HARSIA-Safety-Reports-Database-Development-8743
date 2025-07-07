import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userProfile = await getUserProfile(session.user.id);
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: userProfile?.name || session.user.email,
            role: userProfile?.role || 'user'
          });
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userProfile = await getUserProfile(session.user.id);
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: userProfile?.name || session.user.email,
            role: userProfile?.role || 'user'
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('admin_users_hr2024')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      // Check if user exists in admin_users table
      const { data: adminUser } = await supabase
        .from('admin_users_hr2024')
        .select('*')
        .eq('email', email)
        .single();

      if (!adminUser) {
        return { success: false, error: 'User not authorized for admin access' };
      }

      // Only admin credentials are valid
      const validCredentials = [
        { email: 'manos.alexandrakis@harsia.gr', password: 'anuNXKnXd3fUw3nWZxRL' }
      ];

      const isValid = validCredentials.some(cred => 
        cred.email === email && cred.password === password
      );

      if (!isValid) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Create session manually for demo
      const userSession = {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      };

      setUser(userSession);
      localStorage.setItem('harsia-user', JSON.stringify(userSession));

      return { success: true, data: userSession };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('harsia-user');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  const sendOTP = async (email) => {
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, data: { message: 'OTP sent successfully' } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const verifyOTP = async (email, token) => {
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo, accept any 6-digit code
      if (token.length === 6 && /^\d+$/.test(token)) {
        return { success: true, data: { message: 'OTP verified successfully' } };
      } else {
        return { success: false, error: 'Invalid OTP code' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    sendOTP,
    verifyOTP,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};