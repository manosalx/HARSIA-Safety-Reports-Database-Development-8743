import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiLock, FiEye, FiEyeOff, FiInfo } = FiIcons;

const LoginForm = () => {
  const { login, sendOTP, verifyOTP } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otpCode: ''
  });
  const [step, setStep] = useState('login'); // 'login', 'otp', 'verify'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Send OTP for 2FA
        const otpResult = await sendOTP(formData.email);
        if (otpResult.success) {
          setStep('otp');
          toast.success('OTP sent to your email (Demo: enter any 6-digit code)');
        } else {
          toast.error(otpResult.error);
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await verifyOTP(formData.email, formData.otpCode);
      if (result.success) {
        toast.success(t('loginSuccess'));
        navigate('/dashboard');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setFormData({
      ...formData,
      email: 'manos.alexandrakis@harsia.gr',
      password: 'anuNXKnXd3fUw3nWZxRL'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-secondary-900">
            {t('login')}
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            Administrator Access
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
            <div className="text-sm">
              <h3 className="font-medium text-blue-900 mb-2">Administrator Access</h3>
              <div className="space-y-2 text-blue-800">
                <div>
                  <strong>Admin:</strong>
                  <button
                    onClick={fillAdminCredentials}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    manos.alexandrakis@harsia.gr
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xs text-blue-700">
                Click on credentials to auto-fill the form
              </p>
            </div>
          </div>
        </div>

        {step === 'login' && (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                  {t('email')}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiMail} className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-secondary-300 rounded-lg placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="manos.alexandrakis@harsia.gr"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-700">
                  {t('password')}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiLock} className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none block w-full pl-10 pr-10 py-3 border border-secondary-300 rounded-lg placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <SafeIcon
                      icon={showPassword ? FiEyeOff : FiEye}
                      className="h-5 w-5 text-secondary-400 hover:text-secondary-600"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? t('loading') : t('login')}
              </button>
            </div>
          </form>
        )}

        {step === 'otp' && (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <p className="text-sm text-secondary-600">
                We've sent a verification code to your email. Please enter it below.
              </p>
              <p className="text-xs text-blue-600 mt-2">
                Demo: Enter any 6-digit number (e.g., 123456)
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label htmlFor="otpCode" className="block text-sm font-medium text-secondary-700">
                  {t('twoFactorCode')}
                </label>
                <input
                  id="otpCode"
                  name="otpCode"
                  type="text"
                  required
                  value={formData.otpCode}
                  onChange={handleInputChange}
                  className="mt-1 appearance-none block w-full px-3 py-3 border border-secondary-300 rounded-lg placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center text-lg tracking-wider"
                  placeholder="123456"
                  maxLength="6"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? t('loading') : t('verifyCode')}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginForm;