// Environment Configuration
// Sử dụng các biến môi trường từ file .env

const config = {
  // App Configuration
  appName: process.env.REACT_APP_NAME || 'BookStore',
  appVersion: process.env.REACT_APP_VERSION || '1.0.0',
  appDescription: process.env.REACT_APP_DESCRIPTION || 'Ứng dụng bán sách trực tuyến',

  // API Configuration
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,

  // Authentication
  jwtSecret: process.env.REACT_APP_JWT_SECRET || 'default_secret_key',
  tokenExpiry: process.env.REACT_APP_TOKEN_EXPIRY || '24h',

  // Admin Configuration
  adminEmail: process.env.REACT_APP_ADMIN_EMAIL || 'admin@bookstore.com',
  adminPassword: process.env.REACT_APP_ADMIN_PASSWORD || 'admin123',

  // Database Configuration
  database: {
    host: process.env.REACT_APP_DB_HOST || 'localhost',
    port: parseInt(process.env.REACT_APP_DB_PORT) || 5432,
    name: process.env.REACT_APP_DB_NAME || 'bookstore',
    user: process.env.REACT_APP_DB_USER || 'postgres',
    password: process.env.REACT_APP_DB_PASSWORD || 'your_db_password',
  },

  // Payment Gateway
  payment: {
    stripePublicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY || '',
    paypalClientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || '',
  },

  // Email Service
  email: {
    service: process.env.REACT_APP_EMAIL_SERVICE || 'gmail',
    user: process.env.REACT_APP_EMAIL_USER || '',
    password: process.env.REACT_APP_EMAIL_PASSWORD || '',
  },

  // File Upload
  fileUpload: {
    maxFileSize: parseInt(process.env.REACT_APP_MAX_FILE_SIZE) || 5242880, // 5MB
    allowedTypes: process.env.REACT_APP_ALLOWED_FILE_TYPES?.split(',') || ['image/jpeg', 'image/png', 'image/gif'],
  },

  // Social Login
  socialLogin: {
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    facebookAppId: process.env.REACT_APP_FACEBOOK_APP_ID || '',
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '',
    facebookPixelId: process.env.REACT_APP_FACEBOOK_PIXEL_ID || '',
  },

  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  generateSourcemap: process.env.GENERATE_SOURCEMAP === 'true',

  // Build Configuration
  buildDate: process.env.REACT_APP_BUILD_DATE || new Date().toISOString().split('T')[0],
  buildVersion: process.env.REACT_APP_BUILD_VERSION || '1.0.0',

  // Feature Flags
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    payment: process.env.REACT_APP_ENABLE_PAYMENT === 'true',
    socialLogin: process.env.REACT_APP_ENABLE_SOCIAL_LOGIN === 'true',
    emailNotifications: process.env.REACT_APP_ENABLE_EMAIL_NOTIFICATIONS === 'true',
  },
};

// Validation function
export const validateConfig = () => {
  const requiredFields = [
    'appName',
    'apiUrl',
    'jwtSecret',
  ];

  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    console.warn('Missing required environment variables:', missingFields);
  }

  return missingFields.length === 0;
};

// Helper functions
export const getApiUrl = (endpoint = '') => {
  return `${config.apiUrl}${endpoint}`;
};

export const isFeatureEnabled = (feature) => {
  return config.features[feature] || false;
};

export const getFileUploadConfig = () => {
  return {
    maxSize: config.fileUpload.maxFileSize,
    allowedTypes: config.fileUpload.allowedTypes,
  };
};

export default config;

