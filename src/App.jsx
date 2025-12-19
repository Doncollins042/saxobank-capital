import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, TrendingUp, Shield, Users, ArrowRight, Eye, EyeOff, Mail, Lock, User, Phone,
  Home, PieChart, Wallet, Settings, ChevronRight, Building2, Bitcoin, BarChart3, Gem,
  Bell, X, Check, CheckCircle, Clock, CreditCard, Building, Copy, LogOut, Menu,
  FileText, Search, Download, MessageCircle, Send, Headphones, ChevronDown,
  Star, Gift, History, Calculator, Globe, Briefcase, ArrowLeft, ShieldCheck,
  MapPin, DollarSign, Target, Award, RefreshCw, Camera, Upload, Key, Smartphone,
  Ticket, Share2, Link2, UserPlus, Percent, BadgeDollarSign, ChevronUp, AlertCircle,
  Plus, Edit, Trash2, Image, Calendar
} from 'lucide-react';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  resetPassword,
  resendVerificationEmail,
  onAuthChange,
  auth,
  getCurrentUserData
} from './firebase';

// ============ THEME COLORS ============
const theme = {
  navy: '#0a1628',
  navyLight: '#1a2d4a',
  navyMedium: '#0f2039',
  gold: '#D4AF37',
  goldLight: '#f4d03f',
  goldDark: '#b8962e',
  green: '#0FAF76',
  greenDark: '#0d9962',
  cream: '#faf8f5',
  charcoal: '#374151',
  white: '#ffffff',
  red: '#ef4444'
};

// ============ RELIABLE IMAGE URLS ============
const images = {
  hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  realEstate1: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  realEstate2: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  realEstate3: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  realEstate4: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
  crypto1: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80',
  crypto2: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80',
  crypto3: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80',
  stocks1: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  stocks2: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
  stocks3: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80',
  gold1: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80',
  gold2: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800&q=80',
  gold3: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80',
  plans1: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  plans2: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
  plans3: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80'
};

// ============ INVESTMENT DATA ============
const investments = [
  { id: 1, name: 'Greenwich Towers', category: 'Real Estate', type: 'real-estate', min: 25000, returns: '12-15%', term: '24-36 months', desc: 'Premium commercial development in Manhattan financial district with returns generated through pre-sales and project monetization.', progress: 78, goal: 5000000, img: images.realEstate1, features: ['Development Funding', 'Pre-Sale Revenue', 'Tax Benefits', 'Quarterly Reports'], investors: 234, rating: 4.9, status: 'Funding' },
  { id: 2, name: 'Liberty Suites Hotel', category: 'Real Estate', type: 'real-estate', min: 15000, returns: '7-9%', term: '12 months', desc: 'Income-generating boutique hotel chain. Acquire a stake in operational assets and receive quarterly net operating income.', progress: 92, goal: 3500000, img: images.realEstate2, features: ['Quarterly Income', 'Operational Asset', 'NOI Distribution', 'Hotel Revenue'], investors: 189, rating: 4.8, status: 'Active' },
  { id: 3, name: 'Urban Renaissance Fund', category: 'Real Estate', type: 'real-estate', min: 10000, returns: '18-22%', term: '12-18 months', desc: 'Crowdfunding model to acquire, enhance, and sell premium properties with profits distributed upon sale.', progress: 65, goal: 8000000, img: images.realEstate3, features: ['Value-Add Strategy', 'Profit on Exit', 'Pooled Capital', 'Professional Management'], investors: 456, rating: 4.7, status: 'Funding' },
  { id: 4, name: 'Marina Bay Residences', category: 'Real Estate', type: 'real-estate', min: 50000, returns: '14-18%', term: '36 months', desc: 'Exclusive waterfront luxury development with private marina access and capital appreciation potential.', progress: 45, goal: 12000000, img: images.realEstate4, features: ['Waterfront Premium', 'Capital Growth', 'Luxury Market', 'Pre-Construction'], investors: 78, rating: 4.6, status: 'Funding' },
  { id: 5, name: 'Blue-Chip Crypto Fund', category: 'Cryptocurrency', type: 'crypto', min: 5000, returns: '15-25%', term: '12 months', desc: 'Managed portfolio focusing on Blue-Chip cryptocurrencies with expert trading strategies.', progress: 85, goal: 2000000, img: images.crypto1, features: ['BTC & ETH Focus', 'Expert Trading', 'Risk Managed', 'Monthly Reports'], investors: 567, rating: 4.5, status: 'Active' },
  { id: 6, name: 'DeFi Yield Strategy', category: 'Cryptocurrency', type: 'crypto', min: 10000, returns: '20-35%', term: '6 months', desc: 'Advanced yield farming across multiple DeFi protocols with automated compounding.', progress: 67, goal: 1500000, img: images.crypto2, features: ['Yield Farming', 'Auto-Compound', 'Profit Share', 'Multi-Protocol'], investors: 312, rating: 4.4, status: 'Active' },
  { id: 7, name: 'Altcoin Growth Portfolio', category: 'Cryptocurrency', type: 'crypto', min: 2500, returns: '25-40%', term: '12 months', desc: 'Selective altcoin portfolio targeting high-growth opportunities with professional management.', progress: 78, goal: 3000000, img: images.crypto3, features: ['High Growth', 'Diversified Alts', 'Controls', 'Quarterly Rebalance'], investors: 423, rating: 4.3, status: 'Funding' },
  { id: 8, name: 'Dividend Aristocrats Bundle', category: 'Stocks & Bonds', type: 'stocks', min: 5000, returns: '6-10%', term: '12 months', desc: 'Portfolio of dividend-paying stocks with 25+ years of consecutive dividend increases.', img: images.stocks1, features: ['Dividend Income', '25+ Year Track', 'Quarterly Payouts', 'Blue Chip Stocks'], investors: 892, rating: 4.8, status: 'Open' },
  { id: 9, name: 'Tech Growth ETF Portfolio', category: 'Stocks & Bonds', type: 'stocks', min: 3000, returns: '12-20%', term: '12 months', desc: 'Thematic ETF portfolio focused on technology sector leaders including AI and cloud computing.', img: images.stocks2, features: ['Tech Focused', 'ETF Structure', 'AI & Cloud', 'Growth Oriented'], investors: 1234, rating: 4.6, status: 'Open' },
  { id: 10, name: 'Corporate Bond Ladder', category: 'Stocks & Bonds', type: 'stocks', min: 10000, returns: '5-7%', term: '24 months', desc: 'Investment-grade corporate bond portfolio with staggered maturities for predictable income.', img: images.stocks3, features: ['Investment Grade', 'Laddered Maturities', 'Predictable Income', 'Capital Preservation'], investors: 456, rating: 4.9, status: 'Open' },
  { id: 11, name: 'Gold Liquidity Strategy', category: 'Precious Metals', type: 'metals', min: 5000, returns: '8-12%', term: '12 months', desc: 'Algorithm-driven gold trading strategy buying at optimized lows and selling at strategic highs.', progress: 89, goal: 10000000, img: images.gold1, features: ['Algorithmic Trading', 'No Physical Delivery', 'Market Timing', 'Managed'], investors: 678, rating: 4.7, status: 'Active' },
  { id: 12, name: 'Silver Industrial Fund', category: 'Precious Metals', type: 'metals', min: 2500, returns: '10-15%', term: '18 months', desc: 'Silver investment benefiting from industrial demand in solar panels and EV industries.', progress: 65, goal: 3000000, img: images.gold2, features: ['Industrial Demand', 'Solar & EV Growth', 'Physical Backed', 'Quarterly Reports'], investors: 345, rating: 4.5, status: 'Funding' },
  { id: 13, name: 'Platinum & Palladium Fund', category: 'Precious Metals', type: 'metals', min: 15000, returns: '12-18%', term: '24 months', desc: 'Rare metals portfolio with automotive catalyst and hydrogen economy demand drivers.', progress: 42, goal: 5000000, img: images.gold3, features: ['Rare Metals', 'Auto Industry', 'Hydrogen Economy', 'Supply Limited'], investors: 123, rating: 4.4, status: 'Funding' },
  { id: 14, name: 'Conservative Growth Plan', category: 'Investment Plans', type: 'plans', min: 10000, returns: '8-10%', term: '12 months', desc: 'Balanced portfolio combining stable bonds, dividend stocks, and gold for conservative investors.', img: images.plans1, features: ['Capital Protected', 'Quarterly Dividends', 'Low Volatility', 'Professional Management'], investors: 2345, rating: 4.9, status: 'Open' },
  { id: 15, name: 'Balanced Wealth Builder', category: 'Investment Plans', type: 'plans', min: 25000, returns: '12-16%', term: '24 months', desc: 'Diversified portfolio across real estate, stocks, and alternative assets for steady growth.', img: images.plans2, features: ['Diversified Assets', 'Compound Growth', 'Tax Efficient', 'Flexible Withdrawals'], investors: 1567, rating: 4.8, status: 'Open' },
  { id: 16, name: 'Aggressive Growth Fund', category: 'Investment Plans', type: 'plans', min: 15000, returns: '20-30%', term: '18 months', desc: 'High-growth portfolio targeting maximum returns through tech stocks, crypto, and emerging markets.', img: images.plans3, features: ['High Returns', 'Tech & Crypto', 'Active Management', 'Monthly Rebalancing'], investors: 987, rating: 4.5, status: 'Open' }
];

const categories = [
  { id: 'all', name: 'All', icon: Globe, count: investments.length },
  { id: 'real-estate', name: 'Real Estate', icon: Building2, count: 4 },
  { id: 'crypto', name: 'Crypto', icon: Bitcoin, count: 3 },
  { id: 'stocks', name: 'Stocks', icon: BarChart3, count: 3 },
  { id: 'metals', name: 'Metals', icon: Gem, count: 3 },
  { id: 'plans', name: 'Plans', icon: Briefcase, count: 3 }
];

// ============ ALL COUNTRIES LIST ============
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// ============ AUTH PAGE WITH REAL FIREBASE AUTHENTICATION ============
function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', referralCode: '', country: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (mode === 'register') {
      if (!form.name.trim()) newErrors.name = 'Name is required';
      if (!form.country) newErrors.country = 'Country is required';
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    }
    if (!form.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (mode === 'register') {
      // Register new user
      const result = await registerUser(form.email, form.password, {
        name: form.name,
        phone: form.phone,
        country: form.country,
        referralCode: form.referralCode
      });

      if (result.success) {
        setStep(2); // Show verification message
        setMessage({ type: 'success', text: result.message });
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } else {
      // Login existing user
      const result = await loginUser(form.email, form.password);

      if (result.success) {
        // Pass user data to parent
        onLogin(result.userData);
      } else if (result.needsVerification) {
        setStep(2); // Show verification reminder
        setMessage({ type: 'warning', text: result.error });
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    }
    
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    const result = await resetPassword(resetEmail);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setShowForgotPassword(false);
      setResetEmail('');
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    setLoading(false);
  };

  const handleResendVerification = async () => {
    setLoading(true);
    // Re-login to get current user, then resend
    const result = await loginUser(form.email, form.password);
    if (result.needsVerification) {
      setMessage({ type: 'success', text: 'Verification email sent! Please check your inbox.' });
    }
    setLoading(false);
  };

  // Email Verification Step
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: theme.cream }}>
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
          <div className="absolute inset-0">
            <img src={images.hero} alt="" className="w-full h-full object-cover opacity-20" />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center p-16 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
              className="mb-8">
              <svg viewBox="0 0 50 55" className="w-20 h-20 lg:w-24 lg:h-24">
                <defs>
                  <linearGradient id="authLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4a853"/>
                    <stop offset="50%" stopColor="#f4d078"/>
                    <stop offset="100%" stopColor="#d4a853"/>
                  </linearGradient>
                </defs>
                <path d="M25 0 L50 8 L50 30 C50 42 38 50 25 55 C12 50 0 42 0 30 L0 8 Z" fill="rgba(255,255,255,0.15)"/>
                <path d="M25 5 L45 12 L45 29 C45 39 35 46 25 50 C15 46 5 39 5 29 L5 12 Z" fill="none" stroke="url(#authLogoGold)" strokeWidth="2"/>
                <text x="25" y="36" fontFamily="Georgia, serif" fontSize="26" fontWeight="bold" fill="url(#authLogoGold)" textAnchor="middle">S</text>
              </svg>
            </motion.div>
            <div className="flex items-baseline gap-2 mb-2">
              <h1 className="font-serif text-4xl lg:text-5xl text-white">SAXO</h1>
              <h1 className="font-serif text-4xl lg:text-5xl" style={{ color: theme.gold }}>VAULT</h1>
            </div>
            <p className="text-lg tracking-[0.3em] uppercase text-white/70">Capital</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <div className="w-14 h-14 mx-auto mb-3">
                <svg viewBox="0 0 50 55" className="w-full h-full">
                  <defs>
                    <linearGradient id="authMobileGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4a853"/>
                      <stop offset="50%" stopColor="#f4d078"/>
                      <stop offset="100%" stopColor="#d4a853"/>
                    </linearGradient>
                    <linearGradient id="authMobileNavy" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1a2d4a"/>
                      <stop offset="100%" stopColor="#0a1628"/>
                    </linearGradient>
                  </defs>
                  <path d="M25 0 L50 8 L50 30 C50 42 38 50 25 55 C12 50 0 42 0 30 L0 8 Z" fill="url(#authMobileNavy)"/>
                  <path d="M25 5 L45 12 L45 29 C45 39 35 46 25 50 C15 46 5 39 5 29 L5 12 Z" fill="none" stroke="url(#authMobileGold)" strokeWidth="1.5"/>
                  <text x="25" y="35" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="url(#authMobileGold)" textAnchor="middle">S</text>
                </svg>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-serif text-xl" style={{ color: theme.navy }}>SAXO</span>
                <span className="font-serif text-xl" style={{ color: theme.gold }}>VAULT</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: `${theme.green}15` }}>
                <Mail className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: theme.green }} />
              </motion.div>
              <h2 className="font-serif text-2xl lg:text-3xl mb-2" style={{ color: theme.navy }}>Check Your Email!</h2>
              <p className="text-gray-500 text-sm lg:text-base mb-2">We've sent a verification link to:</p>
              <p className="font-semibold" style={{ color: theme.navy }}>{form.email}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-800 text-sm font-medium">Verification Required</p>
                  <p className="text-blue-600 text-xs mt-1">
                    Click the link in your email to verify your account. Check your spam folder if you don't see it.
                  </p>
                </div>
              </div>
            </div>

            {message.text && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className={`mb-4 p-3 rounded-xl text-sm flex items-center gap-2 ${
                  message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                  message.type === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                  'bg-red-50 text-red-700 border border-red-200'
                }`}>
                {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message.text}
              </motion.div>
            )}

            <motion.button onClick={handleResendVerification} disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 lg:py-4 rounded-xl font-semibold text-base lg:text-lg flex items-center justify-center gap-3 border-2 mb-4"
              style={{ borderColor: theme.navy, color: theme.navy }}>
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Mail className="w-5 h-5" /> Resend Verification Email</>}
            </motion.button>

            <motion.button onClick={() => { setStep(1); setMode('login'); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 lg:py-4 rounded-xl text-white font-semibold text-base lg:text-lg flex items-center justify-center gap-3"
              style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
              Back to Login
            </motion.button>

            <p className="text-center text-gray-500 text-xs mt-6">
              Already verified? Go back to login and sign in.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Forgot Password Modal
  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: theme.cream }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          <button onClick={() => setShowForgotPassword(false)} className="mb-4 flex items-center gap-2 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: `${theme.gold}15` }}>
              <Key className="w-8 h-8" style={{ color: theme.gold }} />
            </div>
            <h2 className="font-serif text-2xl mb-2" style={{ color: theme.navy }}>Reset Password</h2>
            <p className="text-gray-500 text-sm">Enter your email to receive a reset link</p>
          </div>

          {message.text && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-3 rounded-xl text-sm flex items-center gap-2 ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
              {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleForgotPassword}>
            <div className="relative mb-4">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email" />
            </div>

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-3"
              style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Send Reset Link</>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Login/Register Form
  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: theme.cream }}>
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
        <div className="absolute inset-0">
          <img src={images.hero} alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center p-16 text-center">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', duration: 0.8 }}
            className="mb-8">
            <svg viewBox="0 0 50 55" className="w-24 h-24">
              <defs>
                <linearGradient id="regLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4a853"/>
                  <stop offset="50%" stopColor="#f4d078"/>
                  <stop offset="100%" stopColor="#d4a853"/>
                </linearGradient>
              </defs>
              <path d="M25 0 L50 8 L50 30 C50 42 38 50 25 55 C12 50 0 42 0 30 L0 8 Z" fill="rgba(255,255,255,0.15)"/>
              <path d="M25 5 L45 12 L45 29 C45 39 35 46 25 50 C15 46 5 39 5 29 L5 12 Z" fill="none" stroke="url(#regLogoGold)" strokeWidth="2"/>
              <text x="25" y="36" fontFamily="Georgia, serif" fontSize="26" fontWeight="bold" fill="url(#regLogoGold)" textAnchor="middle">S</text>
            </svg>
          </motion.div>
          <div className="flex items-baseline gap-2 mb-2">
            <h1 className="font-serif text-5xl text-white">SAXO</h1>
            <h1 className="font-serif text-5xl" style={{ color: theme.gold }}>VAULT</h1>
          </div>
          <p className="text-lg tracking-[0.3em] uppercase text-white/70">Capital</p>
          <p className="text-white/60 text-lg max-w-md mt-4">
            Access curated Real Estate, Cryptocurrency, Stocks, and Precious Metals investments.
          </p>
          
          <div className="mt-12 space-y-4 text-left max-w-sm">
            {['Institutional-grade investments', 'Professional asset management', 'Refer & earn bonus rewards'].map((item, i) => (
              <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `${theme.gold}30` }}>
                  <Check className="w-4 h-4" style={{ color: theme.gold }} />
                </div>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-3">
              <svg viewBox="0 0 50 55" className="w-full h-full">
                <defs>
                  <linearGradient id="regMobileGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4a853"/>
                    <stop offset="50%" stopColor="#f4d078"/>
                    <stop offset="100%" stopColor="#d4a853"/>
                  </linearGradient>
                  <linearGradient id="regMobileNavy" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a2d4a"/>
                    <stop offset="100%" stopColor="#0a1628"/>
                  </linearGradient>
                </defs>
                <path d="M25 0 L50 8 L50 30 C50 42 38 50 25 55 C12 50 0 42 0 30 L0 8 Z" fill="url(#regMobileNavy)"/>
                <path d="M25 5 L45 12 L45 29 C45 39 35 46 25 50 C15 46 5 39 5 29 L5 12 Z" fill="none" stroke="url(#regMobileGold)" strokeWidth="1.5"/>
                <text x="25" y="35" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="url(#regMobileGold)" textAnchor="middle">S</text>
              </svg>
            </div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-serif text-xl" style={{ color: theme.navy }}>SAXO</span>
              <span className="font-serif text-xl" style={{ color: theme.gold }}>VAULT</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-serif text-2xl lg:text-3xl mb-2" style={{ color: theme.navy }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-sm lg:text-base">
              {mode === 'login' ? 'Sign in to access your investments' : 'Start your investment journey today'}
            </p>
          </div>

          {message.text && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-3 rounded-xl text-sm flex items-center gap-2 ${
                message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                message.type === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                'bg-red-50 text-red-700 border border-red-200'
              }`}>
              {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {message.text}
            </motion.div>
          )}

          <div className="flex mb-6 bg-gray-100 rounded-xl p-1.5">
            {['login', 'register'].map((m) => (
              <button key={m} onClick={() => { setMode(m); setErrors({}); setMessage({ type: '', text: '' }); }}
                className={`flex-1 py-2.5 lg:py-3 rounded-lg font-medium text-sm lg:text-base transition-all ${mode === m ? 'bg-white shadow-md' : 'text-gray-500'}`}
                style={mode === m ? { color: theme.navy } : {}}>
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="John Doe" />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="john@example.com" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <>
                  <motion.div key="phone" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none"
                        placeholder="+1 234 567 890" />
                    </div>
                  </motion.div>

                  <motion.div key="country" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select value={form.country} onChange={(e) => setForm({...form, country: e.target.value})}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none appearance-none bg-white ${errors.country ? 'border-red-500' : 'border-gray-200'}`}>
                        <option value="">Select your country</option>
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}
                  className={`w-full pl-12 pr-14 py-3 border rounded-xl focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <>
                  <motion.div key="confirm" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type={showPass ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="••••••••" />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </motion.div>

                  <motion.div key="referral" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Referral Code (Optional)</label>
                    <div className="relative">
                      <Gift className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" value={form.referralCode} onChange={(e) => setForm({...form, referralCode: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none"
                        placeholder="Enter referral code" />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowForgotPassword(true)} className="text-sm font-medium hover:underline" style={{ color: theme.navy }}>Forgot Password?</button>
              </div>
            )}

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-3 shadow-lg disabled:opacity-70"
              style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5" /></>}
            </motion.button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: theme.green }} />
              <span>Bank-level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" style={{ color: theme.green }} />
              <span>256-bit SSL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============ NAVIGATION BAR (RESPONSIVE) ============
function Navbar({ activePage, onNavigate, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showNavDeposit, setShowNavDeposit] = useState(false);
  const [showNavWithdraw, setShowNavWithdraw] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'investments', label: 'Investments', icon: TrendingUp },
    { id: 'dashboard', label: 'Dashboard', icon: PieChart },
    { id: 'deposit', label: 'Deposit', icon: Download, isAction: true, color: '#10b981' },
    { id: 'withdraw', label: 'Withdraw', icon: Upload, isAction: true, color: '#f59e0b' },
    { id: 'referral', label: 'Referral', icon: Gift },
    { id: 'calculator', label: 'Calculator', icon: Calculator }
  ];

  const handleNavClick = (id) => {
    if (id === 'deposit') {
      setShowNavDeposit(true);
    } else if (id === 'withdraw') {
      setShowNavWithdraw(true);
    } else {
      onNavigate(id);
    }
    setMobileMenu(false);
  };

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || activePage !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 lg:gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              {/* Shield Logo Icon */}
              <div className="relative w-10 h-10 lg:w-11 lg:h-11">
                <svg viewBox="0 0 50 55" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4a853"/>
                      <stop offset="50%" stopColor="#f4d078"/>
                      <stop offset="100%" stopColor="#d4a853"/>
                    </linearGradient>
                    <linearGradient id="logoNavy" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1a2d4a"/>
                      <stop offset="100%" stopColor="#0a1628"/>
                    </linearGradient>
                  </defs>
                  <path d="M25 0 L50 8 L50 30 C50 42 38 50 25 55 C12 50 0 42 0 30 L0 8 Z" fill="url(#logoNavy)"/>
                  <path d="M25 5 L45 12 L45 29 C45 39 35 46 25 50 C15 46 5 39 5 29 L5 12 Z" fill="none" stroke="url(#logoGold)" strokeWidth="1.5"/>
                  <text x="25" y="35" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="url(#logoGold)" textAnchor="middle">S</text>
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-lg lg:text-xl font-semibold" style={{ color: scrolled || activePage !== 'home' ? theme.navy : 'white' }}>SAXO</span>
                  <span className="font-serif text-lg lg:text-xl font-semibold" style={{ color: theme.gold }}>VAULT</span>
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: scrolled || activePage !== 'home' ? '#6b7280' : 'rgba(255,255,255,0.7)' }}>Capital</p>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button key={item.id} onClick={() => handleNavClick(item.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    item.isAction 
                      ? 'text-white shadow-lg' 
                      : activePage === item.id 
                        ? 'text-white shadow-lg' 
                        : scrolled || activePage !== 'home' 
                          ? 'text-gray-600 hover:bg-gray-100' 
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  style={
                    item.isAction 
                      ? { background: item.color } 
                      : activePage === item.id 
                        ? { background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` } 
                        : {}
                  }>
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              {/* Notification Bell */}
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={() => onNavigate('notifications')}
                className={`relative p-2 rounded-xl transition-all ${scrolled || activePage !== 'home' ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}>
                <Bell className={`w-5 h-5 ${scrolled || activePage !== 'home' ? 'text-gray-600' : 'text-white'}`} />
                {(() => {
                  const userNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
                  const unread = (userNotifs[user.uid] || []).filter(n => !n.read).length;
                  return unread > 0 ? (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      {unread > 9 ? '9+' : unread}
                    </span>
                  ) : null;
                })()}
              </motion.button>

              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 px-2 lg:px-4 py-2 rounded-xl transition-all">
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-sm font-bold text-white overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
                  {user.profileImage ? <img src={user.profileImage} alt="" className="w-full h-full object-cover" /> : user.name.charAt(0)}
                </div>
                <span className={`text-sm font-medium hidden md:block ${scrolled || activePage !== 'home' ? 'text-gray-700' : 'text-white'}`}>
                  {user.name.split(' ')[0]}
                </span>
              </motion.button>
              
              <button onClick={onLogout} className="hidden lg:flex p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all">
                <LogOut className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 rounded-xl"
                style={{ color: scrolled || activePage !== 'home' ? theme.navy : 'white' }}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)} className="fixed inset-0 bg-black/50 z-50 lg:hidden" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-2xl lg:hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9">
                      <svg viewBox="0 0 50 55" className="w-full h-full">
                        <defs>
                          <linearGradient id="mobileLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#d4a853"/>
                            <stop offset="50%" stopColor="#f4d078"/>
                            <stop offset="100%" stopColor="#d4a853"/>
                          </linearGradient>
                          <linearGradient id="mobileLogoNavy" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1a2d4a"/>
                            <stop offset="100%" stopColor="#0a1628"/>
                          </linearGradient>
                        </defs>
                        <path d="M25 0 L50 8 L50 30 C50 42 38 50 25 55 C12 50 0 42 0 30 L0 8 Z" fill="url(#mobileLogoNavy)"/>
                        <path d="M25 5 L45 12 L45 29 C45 39 35 46 25 50 C15 46 5 39 5 29 L5 12 Z" fill="none" stroke="url(#mobileLogoGold)" strokeWidth="1.5"/>
                        <text x="25" y="35" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="url(#mobileLogoGold)" textAnchor="middle">S</text>
                      </svg>
                    </div>
                    <div>
                      <span className="font-serif text-sm" style={{ color: theme.navy }}>SAXO</span>
                      <span className="font-serif text-sm" style={{ color: theme.gold }}>VAULT</span>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenu(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {navItems.map((item) => (
                    <button key={item.id} onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        item.isAction 
                          ? 'text-white' 
                          : activePage === item.id 
                            ? 'text-white' 
                            : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      style={
                        item.isAction 
                          ? { background: item.color } 
                          : activePage === item.id 
                            ? { background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` } 
                            : {}
                      }>
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
                  <button onClick={() => { onNavigate('profile'); setMobileMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
                    <Settings className="w-5 h-5" /> Profile & Settings
                  </button>
                  <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Deposit Modal from Nav */}
      <AnimatePresence>
        {showNavDeposit && <DepositModal onClose={() => setShowNavDeposit(false)} />}
        {showNavWithdraw && <WithdrawModal onClose={() => setShowNavWithdraw(false)} balance={user.balance} />}
      </AnimatePresence>
    </>
  );
}

// ============ MOBILE BOTTOM NAV ============
function MobileBottomNav({ activePage, onNavigate }) {
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'investments', label: 'Invest', icon: TrendingUp },
    { id: 'dashboard', label: 'Portfolio', icon: PieChart },
    { id: 'referral', label: 'Referral', icon: Gift },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => (
          <button key={item.id} onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${activePage === item.id ? 'text-white' : 'text-gray-500'}`}
            style={activePage === item.id ? { background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` } : {}}>
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ FLOATING CONTACT (PROFESSIONAL) ============
function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('options');
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', category: '', priority: 'medium', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const id = 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Store ticket locally for admin dashboard
    const tickets = JSON.parse(localStorage.getItem('saxovault_tickets') || '[]');
    const newTicket = {
      id: id,
      name: ticketForm.name,
      email: ticketForm.email,
      category: ticketForm.category,
      priority: ticketForm.priority,
      subject: ticketForm.subject,
      message: ticketForm.message,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    tickets.unshift(newTicket);
    localStorage.setItem('saxovault_tickets', JSON.stringify(tickets));
    
    // Add notification for admin
    Storage.addNotification({ type: 'ticket', message: `New ticket from ${ticketForm.name}: ${ticketForm.subject}`, ticketId: id });
    
    // Open email client to send to support (as backup)
    const mailBody = `Ticket ID: ${id}%0D%0AFrom: ${ticketForm.name} (${ticketForm.email})%0D%0ACategory: ${ticketForm.category}%0D%0APriority: ${ticketForm.priority}%0D%0A%0D%0A${ticketForm.message}`;
    
    setTicketId(id);
    setSubmitted(true);
    
    setSubmitting(false);
    setTimeout(() => {
      setSubmitted(false);
      setTicketForm({ name: '', email: '', category: '', priority: 'medium', subject: '', message: '' });
      setActiveTab('options');
    }, 5000);
  };

  return (
    <>
      <motion.button onClick={() => setOpen(!open)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 w-14 h-14 lg:w-16 lg:h-16 rounded-full shadow-2xl flex items-center justify-center text-white z-40"
        style={{ background: `linear-gradient(135deg, ${theme.green} 0%, ${theme.greenDark} 100%)` }}>
        <AnimatePresence mode="wait">
          {open ? <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }}><X className="w-6 h-6" /></motion.div>
               : <motion.div key="msg" initial={{ rotate: 90 }} animate={{ rotate: 0 }}><MessageCircle className="w-6 h-6" /></motion.div>}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
            
            <motion.div initial={{ opacity: 0, y: 100, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.8 }}
              className="fixed bottom-36 lg:bottom-28 right-4 lg:right-8 w-[calc(100%-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[70vh] overflow-y-auto">
              
              <div className="p-5 lg:p-6" style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${theme.gold}30` }}>
                    <MessageCircle className="w-6 h-6" style={{ color: theme.gold }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg lg:text-xl text-white">Need Help?</h3>
                    <p className="text-white/60 text-sm">Choose how to reach us</p>
                  </div>
                </div>
              </div>

              {activeTab === 'options' && (
                <div className="p-5 lg:p-6 space-y-4">
                  {/* WhatsApp */}
                  <motion.a href="https://wa.me/14642395280?text=Hello! I need assistance with my SaxoVault account." target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all border border-green-200">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-green-500 shadow-lg">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-800 text-lg">WhatsApp</p>
                      <p className="text-sm text-green-600">Chat instantly • 24/7 Available</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-green-500" />
                  </motion.a>

                  {/* Submit Ticket */}
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('ticket')}
                    className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all border border-blue-200">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-500 shadow-lg">
                      <Ticket className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-blue-800 text-lg">Submit a Ticket</p>
                      <p className="text-sm text-blue-600">Email support • Response within 24hrs</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-blue-500" />
                  </motion.button>

                  <div className="pt-3 mt-2 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">We typically respond within <span className="font-semibold text-gray-600">5 minutes</span> on WhatsApp</p>
                  </div>
                </div>
              )}

              {activeTab === 'ticket' && (
                <div className="p-5 lg:p-6">
                  {submitted ? (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
                      <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: `${theme.green}20` }}>
                        <CheckCircle className="w-8 h-8" style={{ color: theme.green }} />
                      </div>
                      <h4 className="font-semibold text-lg" style={{ color: theme.navy }}>Ticket Submitted!</h4>
                      <p className="text-gray-500 text-sm mt-2 mb-4">Your ticket ID is:</p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                        <span className="font-mono font-bold" style={{ color: theme.navy }}>{ticketId}</span>
                        <button onClick={() => navigator.clipboard.writeText(ticketId)}>
                          <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-4">We'll respond within 24 hours</p>
                    </motion.div>
                  ) : (
                    <>
                      <button onClick={() => setActiveTab('options')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      
                      <h4 className="font-semibold mb-4" style={{ color: theme.navy }}>Submit Support Ticket</h4>
                      
                      <form onSubmit={handleSubmitTicket} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Name *</label>
                            <input type="text" value={ticketForm.name} onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})} required
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Email *</label>
                            <input type="email" value={ticketForm.email} onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})} required
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Category *</label>
                            <select value={ticketForm.category} onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})} required
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                              <option value="">Select</option>
                              <option value="investment">Investment</option>
                              <option value="withdrawal">Withdrawal</option>
                              <option value="deposit">Deposit</option>
                              <option value="account">Account</option>
                              <option value="kyc">KYC</option>
                              <option value="referral">Referral</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Priority</label>
                            <select value={ticketForm.priority} onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="urgent">Urgent</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Subject *</label>
                          <input type="text" value={ticketForm.subject} onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})} required
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Brief description of your issue" />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Message *</label>
                          <textarea value={ticketForm.message} onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})} rows={4} required
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            placeholder="Please describe your issue in detail..." />
                        </div>

                        <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className="w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                          style={{ background: `linear-gradient(135deg, ${theme.green} 0%, ${theme.greenDark} 100%)` }}>
                          {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          {submitting ? 'Submitting...' : 'Submit Ticket'}
                        </motion.button>
                      </form>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ============ DOCUMENTS FOLDER (EXPANDABLE) ============
function DocumentsFolder({ onViewDocument }) {
  const [isOpen, setIsOpen] = useState(false);

  const documents = [
    { title: 'White Paper', desc: 'Investment philosophy, technology infrastructure, and growth roadmap', icon: FileText, pages: '42 pages', color: theme.gold },
    { title: 'Terms of Service', desc: 'Platform usage terms, account management, and service agreements', icon: Shield, pages: '28 pages', color: '#3b82f6' },
    { title: 'Privacy Policy', desc: 'Data collection, protection, GDPR & CCPA compliance procedures', icon: Lock, pages: '18 pages', color: '#10b981' },
    { title: 'Risk Disclosure', desc: 'Investment risks, market volatility, and important warnings', icon: Bell, pages: '24 pages', color: '#ef4444' },
    { title: 'AML/KYC Policy', desc: 'Anti-Money Laundering and identity verification procedures', icon: ShieldCheck, pages: '16 pages', color: '#8b5cf6' },
    { title: 'Investment Guide', desc: 'Portfolio strategies, asset allocation, and payout structures', icon: Target, pages: '32 pages', color: '#f59e0b' },
    { title: 'Fee Schedule', desc: 'Complete breakdown of all fees, charges, and commissions', icon: DollarSign, pages: '8 pages', color: '#06b6d4' },
    { title: 'FAQ & Support', desc: 'Frequently asked questions and comprehensive support guide', icon: Headphones, pages: '36 pages', color: '#ec4899' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-md rounded-2xl lg:rounded-3xl border border-white/10 overflow-hidden">
      
      {/* Folder Header - Clickable */}
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 lg:p-6 flex items-center justify-between hover:bg-white/5 transition-all"
        whileTap={{ scale: 0.99 }}>
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ rotateY: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${theme.gold}40 0%, ${theme.gold}20 100%)` }}>
            <FileText className="w-7 h-7 lg:w-8 lg:h-8" style={{ color: theme.gold }} />
          </motion.div>
          <div className="text-left">
            <h3 className="font-serif text-lg lg:text-xl text-white mb-1">Legal Documents & Policies</h3>
            <p className="text-white/50 text-sm">{documents.length} documents available</p>
          </div>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <ChevronDown className="w-5 h-5 text-white/70" />
        </motion.div>
      </motion.button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <div className="px-4 lg:px-6 pb-5 lg:pb-6">
              {/* Divider */}
              <div className="h-px bg-white/10 mb-4" />
              
              {/* Documents List */}
              <div className="space-y-2">
                {documents.map((doc, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => onViewDocument(doc.title)}
                    className="w-full flex items-center gap-4 p-3 lg:p-4 rounded-xl hover:bg-white/10 transition-all group text-left">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${doc.color}20` }}>
                      <doc.icon className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: doc.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-medium text-white group-hover:text-yellow-400 transition-colors text-sm lg:text-base">{doc.title}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/50 text-xs hidden sm:inline">PDF</span>
                      </div>
                      <p className="text-white/40 text-xs lg:text-sm truncate">{doc.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-white/30 text-xs hidden sm:inline">{doc.pages}</span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-yellow-400 transition-colors" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer Note */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/40 text-xs text-center">
                  All documents are available for viewing. Click any document to read the full content.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============ HOME PAGE ============
function HomePage({ onNavigate, onSelectInvestment }) {
  const [viewingDocument, setViewingDocument] = useState(null);

  // Get investments from localStorage (admin controlled) or fallback to defaults
  const displayInvestments = JSON.parse(localStorage.getItem('saxovault_investments') || 'null') || investments;

  const onViewDocument = (docTitle) => {
    setViewingDocument(docTitle);
  };

  return (
    <div className="min-h-screen" style={{ background: theme.cream }}>
      {/* Document Viewer Modal */}
      <AnimatePresence>
        {viewingDocument && (
          <DocumentViewerModal document={viewingDocument} onClose={() => setViewingDocument(null)} />
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${theme.navy}ee 0%, ${theme.navyLight}dd 50%, ${theme.navy}ee 100%)` }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-6 text-center pt-24 lg:pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 lg:mb-8">
              <Crown className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: theme.gold }} />
              <span style={{ color: theme.gold }} className="text-xs lg:text-sm tracking-wide">Institutional-Grade Investment Platform</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white mb-4 lg:mb-6 leading-tight">
              Your Gateway to<br />
              <span style={{ color: theme.gold }}>Diversified Investments</span>
            </h1>

            <p className="text-base lg:text-xl text-white/80 mb-3 lg:mb-4 max-w-3xl mx-auto px-4">
              Access curated Real Estate, Cryptocurrency, Stock & Bond Portfolios, and Precious Metals.
            </p>
            <p className="text-white/60 mb-8 lg:mb-12 text-sm lg:text-base">
              All with clear targets, defined timelines, and professional management.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center px-4">
              <motion.button onClick={() => onNavigate('investments')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                className="px-8 lg:px-10 py-3.5 lg:py-4 rounded-xl text-white font-semibold text-base lg:text-lg shadow-2xl flex items-center justify-center gap-3"
                style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
                Explore Opportunities <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button onClick={() => onNavigate('referral')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                className="px-8 lg:px-10 py-3.5 lg:py-4 rounded-xl font-semibold text-base lg:text-lg border-2 border-white/30 text-white hover:bg-white/10 flex items-center justify-center gap-3">
                <Gift className="w-5 h-5" /> Referral Program
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Verticals */}
      <section className="py-16 lg:py-20 px-4 lg:px-6" style={{ background: theme.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl mb-3 lg:mb-4" style={{ color: theme.navy }}>Investment Verticals</h2>
            <p className="text-gray-600 text-sm lg:text-base">Four distinct pathways to building wealth.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { title: 'Real Estate', desc: 'Development funding & income properties', icon: Building2, color: '#3b82f6', img: images.realEstate1 },
              { title: 'Cryptocurrency', desc: 'Managed crypto portfolios', icon: Bitcoin, color: '#f59e0b', img: images.crypto1 },
              { title: 'Stocks & Bonds', desc: 'Curated market portfolios', icon: BarChart3, color: '#10b981', img: images.stocks1 },
              { title: 'Precious Metals', desc: 'Gold, silver & platinum', icon: Gem, color: '#D4AF37', img: images.gold1 }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }} onClick={() => onNavigate('investments')}
                className="group cursor-pointer bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-28 lg:h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${item.color}cc, transparent)` }} />
                  <div className="absolute top-2 lg:top-4 left-2 lg:left-4 w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <item.icon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
                <div className="p-3 lg:p-6">
                  <h3 className="font-serif text-sm lg:text-xl mb-1 lg:mb-2" style={{ color: theme.navy }}>{item.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm hidden sm:block">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Investments */}
      <section className="py-16 lg:py-20 px-4 lg:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div>
              <h2 className="font-serif text-2xl lg:text-4xl mb-1 lg:mb-2" style={{ color: theme.navy }}>Featured Opportunities</h2>
              <p className="text-gray-600 text-sm lg:text-base">Top-performing investments</p>
            </div>
            <motion.button onClick={() => onNavigate('investments')} whileHover={{ scale: 1.05 }}
              className="px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-medium text-sm flex items-center gap-2"
              style={{ background: `${theme.navy}10`, color: theme.navy }}>
              View All <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {displayInvestments.slice(0, 6).map((inv, i) => (
              <motion.div key={inv.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onClick={() => onSelectInvestment(inv)}
                className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
                <div className="relative h-36 lg:h-48">
                  <img src={inv.img} alt={inv.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ background: inv.status === 'Active' ? theme.green : theme.gold }}>{inv.status}</div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white/80 text-xs">{inv.category}</p>
                    <h3 className="font-serif text-base lg:text-xl text-white">{inv.name}</h3>
                  </div>
                </div>
                <div className="p-4 lg:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xl lg:text-2xl font-bold" style={{ color: theme.green }}>{inv.returns}</p>
                      <p className="text-xs text-gray-500">Target Return</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base lg:text-lg font-bold" style={{ color: theme.navy }}>${inv.min.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Min Investment</p>
                    </div>
                  </div>
                  {inv.progress && (
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${inv.progress}%`, background: `linear-gradient(90deg, ${theme.green} 0%, ${theme.gold} 100%)` }} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Documents Section - Expandable Folder */}
      <section className="py-16 lg:py-20 px-4 lg:px-6" style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-4">
              <FileText className="w-4 h-4" style={{ color: theme.gold }} />
              <span style={{ color: theme.gold }} className="text-sm">Legal & Compliance</span>
            </motion.div>
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-3">Required Documents</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm lg:text-base">
              Transparency is at the core of our operations. Review our comprehensive documentation below.
            </p>
          </div>

          <DocumentsFolder onViewDocument={onViewDocument} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 lg:py-12 px-4 lg:px-6" style={{ background: theme.navy }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">
                <svg viewBox="0 0 50 55" className="w-full h-full">
                  <defs>
                    <linearGradient id="footerGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4a853"/>
                      <stop offset="50%" stopColor="#f4d078"/>
                      <stop offset="100%" stopColor="#d4a853"/>
                    </linearGradient>
                  </defs>
                  <path d="M25 0 L50 8 L50 30 C50 42 38 50 25 55 C12 50 0 42 0 30 L0 8 Z" fill="rgba(255,255,255,0.1)"/>
                  <path d="M25 5 L45 12 L45 29 C45 39 35 46 25 50 C15 46 5 39 5 29 L5 12 Z" fill="none" stroke="url(#footerGold)" strokeWidth="1.5"/>
                  <text x="25" y="35" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="url(#footerGold)" textAnchor="middle">S</text>
                </svg>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-white text-sm lg:text-base">SAXO</span>
                <span className="font-serif text-sm lg:text-base" style={{ color: theme.gold }}>VAULT</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-white/60 text-xs lg:text-sm">
              <span>© 2024 SaxoVault Capital</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============ INVESTMENTS PAGE ============
function InvestmentsPage({ onSelectInvestment }) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  // Get investments from localStorage (admin controlled) or fallback to defaults
  const adminInvestments = JSON.parse(localStorage.getItem('saxovault_investments') || 'null') || investments;

  const filtered = adminInvestments.filter(inv =>
    (category === 'all' || inv.type === category) &&
    inv.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-8 lg:mb-12">
          <h1 className="font-serif text-2xl lg:text-4xl mb-1 lg:mb-2" style={{ color: theme.navy }}>Investment Opportunities</h1>
          <p className="text-gray-600 text-sm lg:text-base">Explore our curated selection across multiple asset classes.</p>
        </div>

        <div className="flex flex-col gap-4 mb-6 lg:mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none"
              placeholder="Search investments..." />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-xl whitespace-nowrap font-medium text-sm transition-all ${
                  category === cat.id ? 'text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200'
                }`}
                style={category === cat.id ? { background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` } : {}}>
                <cat.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{cat.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${category === cat.id ? 'bg-white/20' : 'bg-gray-100'}`}>{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} investments found</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filtered.map((inv, i) => (
            <motion.div key={inv.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => onSelectInvestment(inv)}
              className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group">
              <div className="relative h-40 lg:h-52">
                <img src={inv.img} alt={inv.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white"
                    style={{ background: inv.status === 'Active' ? theme.green : inv.status === 'Open' ? theme.navy : theme.gold }}>
                    {inv.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white/70 text-xs">{inv.category}</p>
                  <h3 className="font-serif text-lg lg:text-2xl text-white">{inv.name}</h3>
                </div>
              </div>

              <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div>
                    <p className="text-xl lg:text-2xl font-bold" style={{ color: theme.green }}>{inv.returns}</p>
                    <p className="text-xs text-gray-500">Target Return</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg lg:text-xl font-bold" style={{ color: theme.navy }}>${inv.min.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Min Investment</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-4 text-xs lg:text-sm text-gray-500 mb-3 lg:mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4" />{inv.term}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 lg:w-4 lg:h-4" />{inv.investors}</span>
                </div>

                {inv.progress && (
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-500">{inv.progress}% funded</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${inv.progress}%`, background: `linear-gradient(90deg, ${theme.green} 0%, ${theme.gold} 100%)` }} />
                    </div>
                  </div>
                )}

                <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100 flex flex-wrap gap-1.5 lg:gap-2">
                  {inv.features.slice(0, 2).map((f, j) => (
                    <span key={j} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{f}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ INVESTMENT DETAIL MODAL ============
function InvestmentModal({ investment, onClose, onInvest }) {
  if (!investment) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end lg:items-center justify-center" onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween' }}
        className="bg-white rounded-t-3xl lg:rounded-3xl w-full lg:max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        
        <div className="relative h-48 lg:h-72">
          <img src={investment.img} alt={investment.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2.5 lg:p-3 bg-white/20 backdrop-blur rounded-full hover:bg-white/30">
            <X className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </button>
          <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6">
            <div className="flex gap-2 mb-2 lg:mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white bg-white/20 backdrop-blur">{investment.category}</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ background: investment.status === 'Active' ? theme.green : theme.gold }}>{investment.status}</span>
            </div>
            <h2 className="font-serif text-2xl lg:text-4xl text-white">{investment.name}</h2>
          </div>
        </div>

        <div className="p-4 lg:p-8 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
            {[
              { label: 'Target Return', value: investment.returns, color: theme.green },
              { label: 'Min Investment', value: `$${investment.min.toLocaleString()}`, color: theme.navy },
              { label: 'Duration', value: investment.term, color: theme.gold },
              { label: 'Investors', value: investment.investors, color: theme.charcoal }
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 lg:p-4 rounded-xl bg-gray-50">
                <p className="text-lg lg:text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 lg:mb-8">
            <h3 className="font-serif text-lg lg:text-xl mb-2 lg:mb-3" style={{ color: theme.navy }}>About This Investment</h3>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{investment.desc}</p>
          </div>

          <div className="mb-6 lg:mb-8">
            <h3 className="font-serif text-lg lg:text-xl mb-2 lg:mb-3" style={{ color: theme.navy }}>Key Features</h3>
            <div className="grid grid-cols-2 gap-2 lg:gap-3">
              {investment.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 lg:gap-3 p-2.5 lg:p-3 bg-gray-50 rounded-xl">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center" style={{ background: `${theme.green}20` }}>
                    <Check className="w-3 h-3 lg:w-4 lg:h-4" style={{ color: theme.green }} />
                  </div>
                  <span className="text-gray-700 text-xs lg:text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {investment.progress && (
            <div className="mb-6 lg:mb-8 p-4 lg:p-6 rounded-2xl bg-gray-50">
              <div className="flex justify-between mb-2 lg:mb-3">
                <span className="font-medium text-sm" style={{ color: theme.navy }}>Funding Progress</span>
                <span className="font-bold">{investment.progress}%</span>
              </div>
              <div className="h-3 lg:h-4 bg-gray-200 rounded-full overflow-hidden mb-2 lg:mb-3">
                <div className="h-full rounded-full" style={{ width: `${investment.progress}%`, background: `linear-gradient(90deg, ${theme.green} 0%, ${theme.gold} 100%)` }} />
              </div>
              <div className="flex justify-between text-xs lg:text-sm text-gray-500">
                <span>${((investment.progress / 100) * investment.goal).toLocaleString()} raised</span>
                <span>Goal: ${investment.goal.toLocaleString()}</span>
              </div>
            </div>
          )}

          <motion.button onClick={onInvest} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 lg:py-4 rounded-xl text-white font-semibold text-base lg:text-lg shadow-xl"
            style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
            Invest Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ INVEST FLOW MODAL ============
function InvestFlowModal({ investment, onClose, balance }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(investment.min);
  const [method, setMethod] = useState('balance');

  const expectedReturn = amount * (parseFloat(investment.returns) / 100 || 0.12);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end lg:items-center justify-center p-0 lg:p-4" onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween' }}
        className="bg-white rounded-t-3xl lg:rounded-3xl w-full lg:max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
        
        <div className="p-5 lg:p-8">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>
              {step === 3 ? '🎉 Confirmed!' : `Invest in ${investment.name}`}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 lg:w-6 lg:h-6" /></button>
          </div>

          {step === 1 && (
            <div>
              <label className="block font-medium text-gray-700 mb-2 lg:mb-3 text-sm lg:text-base">Investment Amount</label>
              <div className="relative mb-3 lg:mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl lg:text-3xl font-bold text-gray-400">$</span>
                <input type="number" value={amount} onChange={(e) => setAmount(Math.max(investment.min, +e.target.value))}
                  className="w-full pl-12 pr-4 py-3 lg:py-4 text-2xl lg:text-3xl font-bold border-2 rounded-xl text-center focus:outline-none"
                  style={{ borderColor: theme.gold }} />
              </div>
              <p className="text-xs lg:text-sm text-gray-500 mb-3 lg:mb-4">Minimum: ${investment.min.toLocaleString()}</p>
              
              <div className="flex gap-2 mb-4 lg:mb-6">
                {[1, 2, 5, 10].map((m) => (
                  <button key={m} onClick={() => setAmount(investment.min * m)}
                    className={`flex-1 py-2.5 lg:py-3 rounded-xl text-sm font-medium border-2 transition-all ${amount === investment.min * m ? 'text-white' : 'border-gray-200'}`}
                    style={amount === investment.min * m ? { background: theme.navy, borderColor: theme.navy } : {}}>
                    ${(investment.min * m / 1000)}K
                  </button>
                ))}
              </div>

              <div className="p-4 lg:p-5 rounded-2xl" style={{ background: `${theme.green}10` }}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Projected Return</span>
                  <span className="font-bold" style={{ color: theme.green }}>+${expectedReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Total at Maturity</span>
                  <span className="font-bold" style={{ color: theme.navy }}>${(amount + expectedReturn).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 lg:space-y-4">
              <p className="text-gray-500 mb-3 lg:mb-4 text-sm">Select Payment Method</p>
              {[
                { id: 'balance', label: 'Account Balance', desc: `$${balance.toLocaleString()} available`, icon: Wallet },
                { id: 'card', label: 'Credit/Debit Card', desc: '•••• 4242', icon: CreditCard },
                { id: 'bank', label: 'Bank Transfer', desc: 'ACH Transfer', icon: Building }
              ].map((m) => (
                <button key={m.id} onClick={() => setMethod(m.id)}
                  className={`w-full flex items-center gap-3 lg:gap-4 p-4 lg:p-5 rounded-2xl border-2 transition-all ${method === m.id ? 'shadow-lg' : 'border-gray-200'}`}
                  style={method === m.id ? { borderColor: theme.gold, background: `${theme.gold}05` } : {}}>
                  <div className={`w-11 h-11 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center ${method === m.id ? 'text-white' : 'bg-gray-100'}`}
                    style={method === m.id ? { background: theme.navy } : {}}>
                    <m.icon className="w-5 h-5 lg:w-7 lg:h-7" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-sm lg:text-base" style={{ color: theme.navy }}>{m.label}</p>
                    <p className="text-xs lg:text-sm text-gray-500">{m.desc}</p>
                  </div>
                  {method === m.id && <CheckCircle className="w-5 h-5 lg:w-7 lg:h-7" style={{ color: theme.gold }} />}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4 lg:py-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                className="w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-full flex items-center justify-center mb-4 lg:mb-6" style={{ background: `${theme.green}20` }}>
                <CheckCircle className="w-12 h-12 lg:w-14 lg:h-14" style={{ color: theme.green }} />
              </motion.div>
              <h3 className="font-serif text-xl lg:text-2xl mb-2" style={{ color: theme.navy }}>Investment Successful!</h3>
              <p className="text-gray-500 text-sm mb-4 lg:mb-6">Your ${amount.toLocaleString()} investment is now active.</p>
              <div className="p-4 lg:p-5 bg-gray-50 rounded-2xl text-left space-y-2 lg:space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-bold">${amount.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Expected Return</span><span className="font-bold" style={{ color: theme.green }}>+${expectedReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-bold">{investment.term}</span></div>
              </div>
            </div>
          )}

          <motion.button onClick={handleNext} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 lg:py-4 mt-6 lg:mt-8 rounded-xl text-white font-semibold"
            style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
            {step === 1 ? 'Continue' : step === 2 ? 'Confirm Investment' : 'Done'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ DASHBOARD PAGE ============
function DashboardPage({ user, onNavigate }) {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  // Get investments from localStorage (admin controlled)
  const storedInvestments = JSON.parse(localStorage.getItem('saxovault_investments') || 'null');
  const currentInvestments = storedInvestments || investments;

  const portfolio = [
    { name: 'Greenwich Towers', type: 'Real Estate', invested: 25000, current: 28750, returns: 15, color: '#3b82f6' },
    { name: 'Blue-Chip Crypto Fund', type: 'Crypto', invested: 15000, current: 18750, returns: 25, color: '#f59e0b' },
    { name: 'Dividend Aristocrats', type: 'Stocks', invested: 10000, current: 10800, returns: 8, color: '#10b981' }
  ];

  const totalInvested = portfolio.reduce((sum, p) => sum + p.invested, 0);
  const totalCurrent = portfolio.reduce((sum, p) => sum + p.current, 0);
  const totalReturns = totalCurrent - totalInvested;

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, {user.name || 'Investor'}</p>
          </div>
        </div>

        {/* Balance Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 lg:p-6 mb-6 text-white"
          style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Available Balance</p>
              <p className="text-3xl lg:text-4xl font-bold">${user.balance.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <motion.button onClick={() => setShowDeposit(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-sm font-medium"
                style={{ background: theme.green, color: 'white' }}>
                <Download className="w-4 h-4 inline mr-1" /> Deposit
              </motion.button>
              <motion.button onClick={() => setShowWithdraw(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-white/20 text-white">
                <Upload className="w-4 h-4 inline mr-1" /> Withdraw
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Portfolio</p>
            <p className="text-lg font-bold" style={{ color: theme.navy }}>${totalCurrent.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Invested</p>
            <p className="text-lg font-bold" style={{ color: theme.gold }}>${totalInvested.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Returns</p>
            <p className="text-lg font-bold" style={{ color: theme.green }}>+${totalReturns.toLocaleString()}</p>
          </div>
        </div>

        {/* My Investments */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-medium" style={{ color: theme.navy }}>My Investments</h2>
            <button onClick={() => onNavigate('investments')} className="text-sm" style={{ color: theme.gold }}>View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {portfolio.map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                    <TrendingUp className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: theme.navy }}>{item.name}</p>
                    <p className="text-xs text-gray-400">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">${item.current.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{item.returns}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: TrendingUp, label: 'Invest', color: theme.navy, action: () => onNavigate('investments') },
            { icon: Users, label: 'Refer', color: '#8b5cf6', action: () => onNavigate('referral') },
            { icon: Calculator, label: 'Calc', color: theme.gold, action: () => onNavigate('calculator') },
            { icon: User, label: 'Profile', color: theme.green, action: () => onNavigate('profile') }
          ].map((item, i) => (
            <motion.button key={i} onClick={item.action} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <span className="text-xs font-medium text-gray-600">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} />}
        {showWithdraw && <WithdrawModal onClose={() => setShowWithdraw(false)} balance={user.balance} />}
      </AnimatePresence>
    </div>
  );
}

// ============ DEPOSIT MODAL ============
function DepositModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [copied, setCopied] = useState(false);

  const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#f7931a', address: 'bc1qzmgg6hw0fttfpczh2whp8f44k497d6pucghk58', network: 'Bitcoin Network' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627eea', address: '0x83057882eC7B7EE0cBe63C2fE2b8957e7ab69655', network: 'ERC-20' },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '₮', color: '#26a17b', address: 'TLGH9FucAuPNUoQw2XUFEDtCg4FFdJ2jKG', network: 'TRC-20' },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', icon: '$', color: '#2775ca', address: '0x83057882eC7B7EE0cBe63C2fE2b8957e7ab69655', network: 'ERC-20' },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', icon: 'B', color: '#f3ba2f', address: '0x83057882eC7B7EE0cBe63C2fE2b8957e7ab69655', network: 'BEP-20' },
    { id: 'ltc', name: 'Litecoin', symbol: 'LTC', icon: 'Ł', color: '#bfbbbb', address: 'bc1qzmgg6hw0fttfpczh2whp8f44k497d6pucghk58', network: 'Litecoin Network' }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end lg:items-center justify-center" onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween' }}
        className="bg-white rounded-t-3xl lg:rounded-3xl w-full lg:max-w-lg max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        
        <div className="p-5 lg:p-6" style={{ background: `linear-gradient(135deg, ${theme.green} 0%, ${theme.greenDark} 100%)` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-white">Deposit Funds</h2>
                <p className="text-white/70 text-sm">Add money to your account</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="p-5 lg:p-6 overflow-y-auto max-h-[70vh]">
          {step === 1 && (
            <div>
              <h3 className="font-semibold mb-4" style={{ color: theme.navy }}>Select Cryptocurrency</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {cryptoOptions.map((crypto) => (
                  <motion.button key={crypto.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${selectedCrypto?.id === crypto.id ? 'shadow-lg' : 'border-gray-200'}`}
                    style={selectedCrypto?.id === crypto.id ? { borderColor: crypto.color, background: `${crypto.color}10` } : {}}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ background: crypto.color }}>
                        {crypto.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: theme.navy }}>{crypto.symbol}</p>
                        <p className="text-xs text-gray-500">{crypto.name}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.00" />
                </div>
                <div className="flex gap-2 mt-2">
                  {[100, 500, 1000, 5000].map((v) => (
                    <button key={v} onClick={() => setAmount(v.toString())}
                      className="flex-1 py-2 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-50">
                      ${v.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button onClick={() => selectedCrypto && amount && setStep(2)}
                disabled={!selectedCrypto || !amount}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-white font-semibold disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${theme.green} 0%, ${theme.greenDark} 100%)` }}>
                Continue
              </motion.button>
            </div>
          )}

          {step === 2 && selectedCrypto && (
            <div>
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold"
                  style={{ background: selectedCrypto.color }}>
                  {selectedCrypto.icon}
                </div>
                <h3 className="font-semibold text-lg" style={{ color: theme.navy }}>Send {selectedCrypto.symbol}</h3>
                <p className="text-gray-500 text-sm">Network: {selectedCrypto.network}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <p className="text-xs text-gray-500 mb-2">Deposit Address</p>
                <div className="flex items-center gap-2">
                  <p className="flex-1 font-mono text-xs break-all" style={{ color: theme.navy }}>{selectedCrypto.address}</p>
                  <button onClick={() => handleCopy(selectedCrypto.address)}
                    className={`p-2 rounded-lg transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800 text-sm">Important</p>
                    <p className="text-yellow-700 text-xs mt-1">
                      Only send {selectedCrypto.symbol} to this address. Sending any other cryptocurrency may result in permanent loss.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount to deposit</span>
                  <span className="font-bold" style={{ color: theme.navy }}>${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Network fee</span>
                  <span className="font-bold text-gray-600">Paid by sender</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="text-blue-700 text-xs">
                    For other deposit methods not listed here, please <span className="font-semibold">contact Customer Support</span> via WhatsApp or Live Chat.
                  </p>
                </div>
              </div>

              <motion.button onClick={() => setStep(3)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-white font-semibold"
                style={{ background: `linear-gradient(135deg, ${theme.green} 0%, ${theme.greenDark} 100%)` }}>
                I've Sent the Payment
              </motion.button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: `${theme.green}20` }}>
                <Clock className="w-10 h-10" style={{ color: theme.green }} />
              </motion.div>
              <h3 className="font-serif text-xl mb-2" style={{ color: theme.navy }}>Deposit Pending</h3>
              <p className="text-gray-500 text-sm mb-6">
                Your deposit is being processed. It may take 10-30 minutes for the transaction to be confirmed on the blockchain.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>
                </div>
              </div>
              <motion.button onClick={onClose} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-semibold"
                style={{ background: `${theme.navy}10`, color: theme.navy }}>
                Done
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ WITHDRAW MODAL ============
function WithdrawModal({ onClose, balance }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#f7931a', network: 'Bitcoin Network', minWithdraw: 50 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627eea', network: 'ERC-20', minWithdraw: 50 },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '₮', color: '#26a17b', network: 'TRC-20', minWithdraw: 20 },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', icon: '$', color: '#2775ca', network: 'ERC-20', minWithdraw: 20 },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', icon: 'B', color: '#f3ba2f', network: 'BEP-20', minWithdraw: 30 },
    { id: 'ltc', name: 'Litecoin', symbol: 'LTC', icon: 'Ł', color: '#bfbbbb', network: 'Litecoin Network', minWithdraw: 25 }
  ];

  const isValidAmount = amount && parseFloat(amount) >= (selectedCrypto?.minWithdraw || 0) && parseFloat(amount) <= balance;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end lg:items-center justify-center" onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween' }}
        className="bg-white rounded-t-3xl lg:rounded-3xl w-full lg:max-w-lg max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        
        <div className="p-5 lg:p-6" style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-white">Withdraw Funds</h2>
                <p className="text-white/70 text-sm">Balance: ${balance.toLocaleString()}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="p-5 lg:p-6 overflow-y-auto max-h-[70vh]">
          {step === 1 && (
            <div>
              <h3 className="font-semibold mb-4" style={{ color: theme.navy }}>Select Cryptocurrency</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {cryptoOptions.map((crypto) => (
                  <motion.button key={crypto.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${selectedCrypto?.id === crypto.id ? 'shadow-lg' : 'border-gray-200'}`}
                    style={selectedCrypto?.id === crypto.id ? { borderColor: crypto.color, background: `${crypto.color}10` } : {}}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ background: crypto.color }}>
                        {crypto.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: theme.navy }}>{crypto.symbol}</p>
                        <p className="text-xs text-gray-500">Min: ${crypto.minWithdraw}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="0.00" max={balance} />
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    {selectedCrypto && `Min withdrawal: $${selectedCrypto.minWithdraw}`}
                  </p>
                  <button onClick={() => setAmount(balance.toString())} className="text-xs font-medium" style={{ color: theme.gold }}>
                    Max: ${balance.toLocaleString()}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Wallet Address</label>
                <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono text-sm"
                  placeholder={selectedCrypto ? `Enter your ${selectedCrypto.symbol} address` : "Select cryptocurrency first"} />
                {selectedCrypto && (
                  <p className="text-xs text-gray-500 mt-1">Network: {selectedCrypto.network}</p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="text-blue-700 text-xs">
                    For other withdrawal methods not listed here, please <span className="font-semibold">contact Customer Support</span> via WhatsApp or Live Chat.
                  </p>
                </div>
              </div>

              <motion.button onClick={() => isValidAmount && walletAddress && setStep(2)}
                disabled={!isValidAmount || !walletAddress || !selectedCrypto}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-white font-semibold disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
                Continue
              </motion.button>
            </div>
          )}

          {step === 2 && selectedCrypto && (
            <div>
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <h3 className="font-semibold text-lg mb-4" style={{ color: theme.navy }}>Confirm Withdrawal</h3>

              <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold text-lg" style={{ color: theme.navy }}>${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Cryptocurrency</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: selectedCrypto.color }}>{selectedCrypto.icon}</div>
                    <span className="font-medium">{selectedCrypto.symbol}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Network</span>
                  <span className="font-medium">{selectedCrypto.network}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <span className="text-gray-500 text-sm">Wallet Address</span>
                  <p className="font-mono text-xs mt-1 break-all" style={{ color: theme.navy }}>{walletAddress}</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <Bell className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <p className="text-yellow-700 text-xs">
                    Please verify the wallet address is correct. Withdrawals to incorrect addresses cannot be reversed.
                  </p>
                </div>
              </div>

              <motion.button onClick={() => setStep(3)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-white font-semibold"
                style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
                Confirm Withdrawal
              </motion.button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: `${theme.green}20` }}>
                <CheckCircle className="w-10 h-10" style={{ color: theme.green }} />
              </motion.div>
              <h3 className="font-serif text-xl mb-2" style={{ color: theme.navy }}>Withdrawal Submitted</h3>
              <p className="text-gray-500 text-sm mb-6">
                Your withdrawal request has been submitted and is being processed. You will receive your {selectedCrypto?.symbol} within 24 hours.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Cryptocurrency</span>
                  <span className="font-bold">{selectedCrypto?.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Processing</span>
                </div>
              </div>
              <motion.button onClick={onClose} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-semibold"
                style={{ background: `${theme.navy}10`, color: theme.navy }}>
                Done
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ DOCUMENT VIEWER MODAL ============
function DocumentViewerModal({ document, onClose }) {
  const documents = {
    'White Paper': {
      title: 'SaxoVault Capital White Paper',
      version: 'Version 2.1 | January 2024',
      sections: [
        {
          title: 'Executive Summary',
          content: `SaxoVault Capital is a premier institutional-grade investment platform designed to democratize access to high-yield investment opportunities traditionally reserved for accredited investors and financial institutions.

Our platform leverages cutting-edge technology, rigorous due diligence processes, and diversified asset allocation strategies to deliver consistent, risk-adjusted returns across multiple asset classes including Real Estate, Cryptocurrency, Stocks & Bonds, and Precious Metals.

Founded in 2019, SaxoVault Capital has grown to manage over $600 million in assets under management (AUM), serving more than 12,000 investors across 45+ countries.`
        },
        {
          title: '1. Introduction & Vision',
          content: `1.1 Mission Statement
To provide retail and institutional investors with secure, transparent, and profitable investment opportunities through innovative technology and expert portfolio management.

1.2 Core Values
• Transparency: Full disclosure of investment strategies, risks, and performance
• Security: Bank-level encryption and multi-layer authentication
• Accessibility: Institutional-grade investments with retail-friendly minimums
• Education: Comprehensive investor resources and market insights

1.3 Platform Overview
SaxoVault Capital offers curated opportunities across four primary asset verticals: Real Estate, Cryptocurrency & Digital Assets, Stocks & Fixed Income, and Precious Metals.`
        },
        {
          title: '2. Investment Philosophy',
          content: `2.1 Diversification Strategy
Our portfolio construction emphasizes strategic diversification across asset classes, geographies, and investment horizons to mitigate concentration risk.

2.2 Due Diligence Framework
Every investment undergoes a rigorous 5-stage vetting process:
• Stage 1: Initial Screening & Market Analysis
• Stage 2: Financial Modeling & Stress Testing
• Stage 3: Legal & Regulatory Compliance Review
• Stage 4: Third-Party Audit & Verification
• Stage 5: Investment Committee Approval

2.3 Risk Management
We employ sophisticated risk management including position sizing limits, stop-loss mechanisms, and real-time monitoring. Maximum exposure to any single investment is capped at 15% of total AUM.`
        },
        {
          title: '3. Asset Allocation',
          content: `Real Estate (35%): Development funding and income properties
Cryptocurrency (25%): Blue-chip holdings and DeFi strategies
Stocks & Bonds (25%): Dividend aristocrats and growth ETFs
Precious Metals (15%): Gold, silver, and platinum exposure`
        },
        {
          title: '4. Technology & Security',
          content: `• 256-bit SSL/TLS encryption
• Multi-factor authentication (MFA)
• Cold storage for 95% of digital assets
• SOC 2 Type II certified data centers
• Regular penetration testing and security audits
• Smart contract integration for transparent transactions`
        },
        {
          title: '5. Regulatory Compliance',
          content: `SaxoVault Capital maintains appropriate licenses and adheres to AML/KYC procedures. We implement robust Anti-Money Laundering and Know Your Customer procedures with segregated client accounts and independent custodian relationships.`
        },
        {
          title: '6. Fee Structure',
          content: `Management Fee: 1.5% annually
Performance Fee: 20% of profits above 8% hurdle
Deposit Fee: 0% (no deposit fees)
Withdrawal Fee: Network fees only for cryptocurrency`
        }
      ]
    },
    'Terms of Service': {
      title: 'Terms of Service',
      version: 'Last Updated: December 2024',
      sections: [
        { title: '1. Agreement to Terms', content: 'By accessing SaxoVault Capital, you agree to these Terms. If you do not agree, you may not use the Platform. We may modify these Terms at any time.' },
        { title: '2. Eligibility', content: 'You must be 18+ years old, have legal capacity to contract, not be in a prohibited jurisdiction, complete KYC verification, and provide accurate information.' },
        { title: '3. Account Security', content: 'You are responsible for maintaining credential confidentiality. Notify us immediately of unauthorized access. One account per person.' },
        { title: '4. Investment Services', content: 'We provide access to curated investment opportunities as an intermediary. All investments carry risk. Past performance does not guarantee future results.' },
        { title: '5. Deposits & Withdrawals', content: 'We accept cryptocurrency deposits. Withdrawals are processed within 24-48 hours. Large withdrawals may require additional verification.' },
        { title: '6. Prohibited Activities', content: 'No money laundering, market manipulation, fraud, unauthorized bots, security circumvention, impersonation, or illegal activity.' },
        { title: '7. Limitation of Liability', content: 'SaxoVault Capital is not liable for indirect, incidental, or consequential damages. Total liability is limited to fees paid in the preceding 12 months.' }
      ]
    },
    'Privacy Policy': {
      title: 'Privacy Policy',
      version: 'GDPR & CCPA Compliant | December 2024',
      sections: [
        { title: '1. Information We Collect', content: 'Identity info (name, DOB, ID), contact info (email, phone, address), financial info (wallet addresses), verification documents, device info, and usage data.' },
        { title: '2. How We Use Information', content: 'Verify identity, process transactions, communicate about your account, comply with regulations, improve services, and detect security threats.' },
        { title: '3. Data Sharing', content: 'We share with service providers, regulatory authorities, and professional advisors. We do NOT sell your personal information.' },
        { title: '4. Data Security', content: '256-bit encryption, multi-factor authentication, regular audits, employee access controls, and SOC 2 certified data centers.' },
        { title: '5. Your Rights', content: 'Access, rectification, erasure, restriction, portability, and objection rights. Contact privacy@saxobankcapital.com to exercise.' },
        { title: '6. Data Retention', content: 'We retain data as long as necessary for services and legal compliance. After account closure, certain data is retained for up to 7 years.' }
      ]
    },
    'Risk Disclosure': {
      title: 'Risk Disclosure Statement',
      version: 'Required Reading | All Investors',
      sections: [
        { title: 'IMPORTANT WARNING', content: 'Investing involves risk including possible loss of principal. Values can go down as well as up. This does not disclose all risks. Consult a financial advisor.' },
        { title: '1. Market Risk', content: 'Values fluctuate based on economic events, political developments, and market sentiment.' },
        { title: '2. Real Estate Risks', content: 'Property values may decline, projects may face delays, rental income affected by vacancies, regulatory changes, environmental issues.' },
        { title: '3. Cryptocurrency Risks', content: 'Extreme volatility, regulatory uncertainty, security risks, technology vulnerabilities, market manipulation, no intrinsic value.' },
        { title: '4. Stock & Bond Risks', content: 'Equity risk, credit risk, sector concentration, currency fluctuations, dividend reductions.' },
        { title: '5. Precious Metals Risks', content: 'Price volatility, no income generation, storage costs, industrial demand cycles.' },
        { title: 'Acknowledgment', content: 'By investing, you acknowledge reading this disclosure, understanding risks, accepting potential losses, and conducting your own due diligence.' }
      ]
    },
    'AML/KYC Policy': {
      title: 'Anti-Money Laundering & KYC Policy',
      version: 'FATF Compliant | December 2024',
      sections: [
        { title: '1. Policy Statement', content: 'SaxoVault Capital is committed to highest AML/CTF standards, adhering to FATF recommendations and applicable laws.' },
        { title: '2. Customer Identification', content: 'Required: Government photo ID, proof of address (within 90 days), selfie verification. Enhanced due diligence for high-value transactions and PEPs.' },
        { title: '3. Ongoing Monitoring', content: 'Transaction monitoring, periodic reviews, sanctions screening, automated alerts for unusual activity.' },
        { title: '4. Suspicious Activity', content: 'We file SARs and CTRs as required, cooperate with law enforcement, and maintain records for 5+ years.' },
        { title: '5. Prohibited Activities', content: 'Money laundering, terrorist financing, sanctioned transactions, structuring, false identities, illegal proceeds.' },
        { title: '6. Sanctions Compliance', content: 'We screen against OFAC, UN, EU, and other sanctions lists. Transactions with sanctioned parties are blocked and reported.' }
      ]
    },
    'Investment Guide': {
      title: 'Investment Guidelines & Handbook',
      version: 'Investor Reference | 2024',
      sections: [
        { title: '1. Getting Started', content: 'Register → Complete KYC → Enable 2FA → Fund account → Browse investments. Account levels: Basic (<$25K), Premium ($25K-$100K), Elite ($100K+).' },
        { title: '2. Investment Categories', content: 'Real Estate: $10K-$50K min, 12-36 months, 7-22% target. Crypto: $2.5K-$10K min, 6-12 months, 15-40% target. Stocks: $3K-$10K min, 12 months, 5-20% target. Metals: $2.5K-$15K min, 12-24 months, 8-18% target.' },
        { title: '3. Portfolio Strategies', content: 'Conservative: 50% bonds, 30% RE income, 15% metals, 5% crypto. Balanced: 35% RE, 25% stocks, 25% crypto, 15% metals. Aggressive: 40% crypto, 30% growth stocks, 20% RE dev, 10% altcoins.' },
        { title: '4. Payouts', content: 'Methods: Cryptocurrency or reinvestment. Schedule: Monthly, quarterly, or at maturity. Compound option available.' },
        { title: '5. Withdrawals', content: 'Crypto: 24-48 hours. Large (>$50K): 3-5 days. Daily limit: $100K (Elite: $500K).' }
      ]
    },
    'Fee Schedule': {
      title: 'Fee Schedule',
      version: 'Effective January 2024',
      sections: [
        { title: 'Account Fees', content: 'Opening: FREE. Maintenance: FREE. Closure: FREE. Inactivity (12+ months): $25/month.' },
        { title: 'Deposit Fees', content: 'All cryptocurrency deposits: FREE. Network fees paid by sender.' },
        { title: 'Withdrawal Fees', content: 'Network fees only. Express processing (4 hours): 0.1% of amount.' },
        { title: 'Management Fees', content: '1.5% annually (0.375% quarterly). Performance fee: 20% of profits above 8% hurdle.' },
        { title: 'Early Redemption', content: '0-30 days: 5%. 31-90 days: 3%. 91-180 days: 1%. 180+ days: No penalty.' },
        { title: 'Elite Discounts', content: '25% off management fees, free express withdrawals, dedicated account manager.' }
      ]
    },
    'FAQ & Support': {
      title: 'Frequently Asked Questions',
      version: 'Updated December 2024',
      sections: [
        { title: 'Account', content: 'Q: How to register? A: Click Register, enter details, complete KYC.\nQ: Verification time? A: 24-48 hours standard, 4 hours express.\nQ: Multiple accounts? A: No, one per person.' },
        { title: 'Deposits', content: 'Q: Which cryptos? A: BTC, ETH, USDT, USDC, BNB, LTC.\nQ: Minimum? A: No account minimum. Each investment has its own.\nQ: How long? A: 10-30 minutes after confirmation.' },
        { title: 'Investments', content: 'Q: Minimum investment? A: $2,500 - $50,000 depending on opportunity.\nQ: Early withdrawal? A: May incur penalties per terms.\nQ: When payouts? A: Monthly, quarterly, or at maturity.' },
        { title: 'Withdrawals', content: 'Q: Processing time? A: 24-48 hours standard.\nQ: Limits? A: $100K daily ($500K for Elite).\nQ: Delayed? A: Contact support if >72 hours.' },
        { title: 'Contact Support', content: 'WhatsApp: +1 (464) 239-5280 (24/7)\nLive Chat: Available on website\nEmail: support@saxovault.com\nResponse: Under 24 hours' }
      ]
    }
  };

  const doc = documents[document] || documents['White Paper'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-2xl lg:rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        
        <div className="p-5 lg:p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>{doc.title}</h2>
            <p className="text-gray-500 text-sm">{doc.version}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" style={{ color: theme.navy }} />
          </button>
        </div>

        <div className="p-5 lg:p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="space-y-8">
            {doc.sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <h3 className="font-serif text-lg lg:text-xl mb-3 pb-2 border-b border-gray-100" style={{ color: theme.navy }}>
                  {section.title}
                </h3>
                <div className="text-gray-600 text-sm lg:text-base leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
              style={{ background: `${theme.navy}10`, color: theme.navy }}>
              <Download className="w-4 h-4" /> Download PDF
            </motion.button>
            <motion.button onClick={onClose} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl text-white font-medium"
              style={{ background: theme.navy }}>
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ REFERRAL PROGRAM PAGE ============
function ReferralPage({ user }) {
  const referralCode = 'SAXO' + user.name.split(' ')[0].toUpperCase().slice(0, 4) + Math.random().toString(36).substr(2, 4).toUpperCase();
  const referralLink = `https://saxobank.capital/ref/${referralCode}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    { name: 'John D.', date: '2024-01-15', deposits: 15000, bonus: 150, status: 'Active' },
    { name: 'Sarah M.', date: '2024-01-20', deposits: 25000, bonus: 250, status: 'Active' },
    { name: 'Mike R.', date: '2024-02-01', deposits: 5000, bonus: 50, status: 'Pending' }
  ];

  const totalEarnings = referrals.reduce((sum, r) => sum + r.bonus, 0);
  const totalReferrals = referrals.length;
  const activeReferrals = referrals.filter(r => r.status === 'Active').length;

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-2xl flex items-center justify-center mb-4"
            style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
            <Gift className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </motion.div>
          <h1 className="font-serif text-2xl lg:text-4xl mb-2" style={{ color: theme.navy }}>Referral Program</h1>
          <p className="text-gray-600 text-sm lg:text-base max-w-lg mx-auto">Earn rewards when your friends invest. Get 1% bonus on every deposit your referrals make!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 lg:gap-6 mb-6 lg:mb-8">
          {[
            { label: 'Total Earnings', value: `$${totalEarnings}`, icon: BadgeDollarSign, color: theme.green },
            { label: 'Total Referrals', value: totalReferrals, icon: Users, color: theme.navy },
            { label: 'Active Referrals', value: activeReferrals, icon: UserPlus, color: theme.gold }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg text-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: stat.color }} />
              </div>
              <p className="text-xl lg:text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs lg:text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Referral Code & Link */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-5 lg:p-8 mb-6 lg:mb-8">
          <h2 className="font-serif text-lg lg:text-xl mb-4 lg:mb-6" style={{ color: theme.navy }}>Your Referral Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-500 mb-2">Referral Code</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 lg:py-4 bg-gray-50 rounded-xl font-mono font-bold text-lg lg:text-xl text-center" style={{ color: theme.navy }}>
                  {referralCode}
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleCopy(referralCode)}
                  className="p-3 lg:p-4 rounded-xl text-white"
                  style={{ background: copied ? theme.green : theme.navy }}>
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-500 mb-2">Referral Link</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-600 truncate">
                  {referralLink}
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleCopy(referralLink)}
                  className="p-3 rounded-xl"
                  style={{ background: `${theme.gold}15`, color: theme.gold }}>
                  <Link2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="font-medium mb-3" style={{ color: theme.navy }}>Share via</h3>
            <div className="flex gap-3">
              {[
                { name: 'WhatsApp', color: '#25D366', icon: MessageCircle },
                { name: 'Email', color: '#EA4335', icon: Mail },
                { name: 'Copy Link', color: theme.navy, icon: Copy }
              ].map((platform, i) => (
                <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => platform.name === 'Copy Link' ? handleCopy(referralLink) : null}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-medium"
                  style={{ background: platform.color }}>
                  <platform.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{platform.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-5 lg:p-8 mb-6 lg:mb-8">
          <h2 className="font-serif text-lg lg:text-xl mb-4 lg:mb-6" style={{ color: theme.navy }}>How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
            {[
              { step: '1', title: 'Share Your Link', desc: 'Send your unique referral link to friends and family' },
              { step: '2', title: 'They Sign Up', desc: 'When they register using your link or code' },
              { step: '3', title: 'Earn Rewards', desc: 'Get 1% bonus on every deposit they make!' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
                  {item.step}
                </div>
                <h3 className="font-semibold text-sm lg:text-base mb-1" style={{ color: theme.navy }}>{item.title}</h3>
                <p className="text-gray-500 text-xs lg:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-gray-100">
            <h2 className="font-serif text-lg lg:text-xl" style={{ color: theme.navy }}>Your Referrals</h2>
          </div>
          {referrals.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {referrals.map((ref, i) => (
                <div key={i} className="p-4 lg:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
                      {ref.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm lg:text-base" style={{ color: theme.navy }}>{ref.name}</p>
                      <p className="text-xs text-gray-500">Joined {ref.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm lg:text-base" style={{ color: theme.green }}>+${ref.bonus}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ref.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {ref.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No referrals yet. Share your link to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ CALCULATOR PAGE ============
function CalculatorPage() {
  const [principal, setPrincipal] = useState(25000);
  const [rate, setRate] = useState(12);
  const [period, setPeriod] = useState(24);

  const finalValue = principal * Math.pow(1 + rate / 100 / 12, period);
  const totalReturn = finalValue - principal;

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="font-serif text-2xl lg:text-4xl mb-2" style={{ color: theme.navy }}>Investment Calculator</h1>
          <p className="text-gray-600 text-sm lg:text-base">Project your potential returns.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-8 shadow-xl">
            <h2 className="font-serif text-lg lg:text-xl mb-4 lg:mb-6" style={{ color: theme.navy }}>Parameters</h2>
            
            <div className="space-y-5 lg:space-y-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2 text-sm lg:text-base">Initial Investment</label>
                <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)}
                  className="w-full px-4 py-3 lg:py-4 text-xl font-bold border-2 border-gray-200 rounded-xl text-center focus:outline-none" />
                <div className="flex gap-2 mt-2">
                  {[10000, 25000, 50000, 100000].map((v) => (
                    <button key={v} onClick={() => setPrincipal(v)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border ${principal === v ? 'text-white' : 'border-gray-200'}`}
                      style={principal === v ? { background: theme.navy } : {}}>
                      ${v/1000}K
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 text-sm lg:text-base">Annual Return (%)</label>
                <input type="number" value={rate} onChange={(e) => setRate(+e.target.value)}
                  className="w-full px-4 py-3 lg:py-4 text-xl font-bold border-2 border-gray-200 rounded-xl text-center focus:outline-none" />
                <div className="flex gap-2 mt-2">
                  {[8, 12, 15, 20].map((v) => (
                    <button key={v} onClick={() => setRate(v)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border ${rate === v ? 'text-white' : 'border-gray-200'}`}
                      style={rate === v ? { background: theme.navy } : {}}>
                      {v}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2 text-sm lg:text-base">Period (Months)</label>
                <input type="number" value={period} onChange={(e) => setPeriod(+e.target.value)}
                  className="w-full px-4 py-3 lg:py-4 text-xl font-bold border-2 border-gray-200 rounded-xl text-center focus:outline-none" />
                <div className="flex gap-2 mt-2">
                  {[12, 24, 36, 60].map((v) => (
                    <button key={v} onClick={() => setPeriod(v)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border ${period === v ? 'text-white' : 'border-gray-200'}`}
                      style={period === v ? { background: theme.navy } : {}}>
                      {v}mo
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl lg:rounded-3xl p-5 lg:p-8 text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
            <h2 className="font-serif text-lg lg:text-xl mb-6 lg:mb-8" style={{ color: theme.gold }}>Projected Returns</h2>

            <div className="space-y-4 lg:space-y-6">
              <div>
                <p className="text-white/60 text-xs lg:text-sm mb-1">Final Value</p>
                <p className="font-serif text-4xl lg:text-5xl font-bold">${finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>

              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <p className="text-white/60 text-xs lg:text-sm mb-1">Total Return</p>
                  <p className="text-xl lg:text-2xl font-bold" style={{ color: theme.gold }}>+${totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs lg:text-sm mb-1">Return %</p>
                  <p className="text-xl lg:text-2xl font-bold" style={{ color: theme.green }}>+{((totalReturn / principal) * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10">
                <p className="text-white/60 text-xs lg:text-sm mb-2">Summary</p>
                <p className="text-xs lg:text-sm">
                  <span className="font-bold">${principal.toLocaleString()}</span> at <span className="font-bold">{rate}%</span> for <span className="font-bold">{period} months</span> = <span className="font-bold" style={{ color: theme.gold }}>${finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs lg:text-sm text-gray-500 mt-6 lg:mt-8">
          * Estimates only. Actual returns may vary.
        </p>
      </div>
    </div>
  );
}

// ============ NOTIFICATIONS PAGE ============
function NotificationsPage({ user }) {
  const [notifications, setNotifications] = useState(() => {
    const userNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
    return userNotifs[user.uid] || [];
  });

  const markAsRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    const allNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
    allNotifs[user.uid] = updated;
    localStorage.setItem('saxovault_user_notifications', JSON.stringify(allNotifs));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    const allNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
    allNotifs[user.uid] = updated;
    localStorage.setItem('saxovault_user_notifications', JSON.stringify(allNotifs));
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>Notifications</h1>
            <p className="text-gray-500 text-sm">{notifications.filter(n => !n.read).length} unread</p>
          </div>
          {notifications.some(n => !n.read) && (
            <motion.button onClick={markAllAsRead} whileHover={{ scale: 1.02 }}
              className="text-sm px-4 py-2 rounded-xl" style={{ background: `${theme.navy}10`, color: theme.navy }}>
              Mark all as read
            </motion.button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notif, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 lg:p-5 cursor-pointer hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.type === 'broadcast' ? 'bg-blue-100' : 'bg-green-100'}`}>
                      {notif.type === 'broadcast' ? <Bell className="w-5 h-5 text-blue-600" /> : <Mail className="w-5 h-5 text-green-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm" style={{ color: theme.navy }}>{notif.title}</p>
                        {!notif.read && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                      </div>
                      <p className="text-gray-600 text-sm">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{new Date(notif.sentAt).toLocaleDateString()} at {new Date(notif.sentAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Bell className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ PROFILE & SETTINGS PAGE ============
function ProfilePage({ user, setUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({ name: user.name, email: user.email, phone: user.phone, address: user.address });
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [kycStatus, setKycStatus] = useState('pending');
  const [kycStep, setKycStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleProfileSave = () => {
    setUser({ ...user, ...profileForm });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.new.length < 8) {
      alert('Password must be at least 8 characters!');
      return;
    }
    setSaved(true);
    setPasswordForm({ current: '', new: '', confirm: '' });
    setTimeout(() => setSaved(false), 3000);
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setTimeout(() => {
          setUser({ ...user, profileImage: reader.result });
          setUploading(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKycSubmit = () => {
    setKycStatus('submitted');
    setTimeout(() => setKycStatus('verified'), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'kyc', label: 'KYC', icon: ShieldCheck },
    { id: 'notifications', label: 'Alerts', icon: Bell }
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden mb-6">
          <div className="p-6 lg:p-8 text-center" style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
            <div className="relative inline-block">
              <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-full flex items-center justify-center text-3xl lg:text-4xl font-bold text-white overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
                {user.profileImage ? <img src={user.profileImage} alt="" className="w-full h-full object-cover" /> : user.name.charAt(0)}
              </div>
              <button onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                {uploading ? <RefreshCw className="w-4 h-4 animate-spin" style={{ color: theme.navy }} /> : <Camera className="w-4 h-4" style={{ color: theme.navy }} />}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" />
            </div>
            <h2 className="text-xl lg:text-2xl font-serif text-white mt-3">{user.name}</h2>
            <p className="text-white/60 text-sm">{user.email}</p>
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full" style={{ background: `${theme.green}30` }}>
              <CheckCircle className="w-3.5 h-3.5" style={{ color: theme.green }} />
              <span style={{ color: theme.green }} className="text-xs font-medium">Verified Investor</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'text-white shadow-lg' : 'bg-white text-gray-600'
              }`}
              style={activeTab === tab.id ? { background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` } : {}}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-5 lg:p-8">
            <h2 className="font-serif text-lg lg:text-2xl mb-4 lg:mb-6" style={{ color: theme.navy }}>Profile Information</h2>
            
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Full Name</label>
                <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  className="w-full px-4 py-2.5 lg:py-3 border border-gray-200 rounded-xl focus:outline-none text-sm lg:text-base" />
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Email Address</label>
                <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  className="w-full px-4 py-2.5 lg:py-3 border border-gray-200 rounded-xl focus:outline-none text-sm lg:text-base" />
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Phone Number</label>
                <input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                  className="w-full px-4 py-2.5 lg:py-3 border border-gray-200 rounded-xl focus:outline-none text-sm lg:text-base" />
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">Address</label>
                <input type="text" value={profileForm.address} onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                  className="w-full px-4 py-2.5 lg:py-3 border border-gray-200 rounded-xl focus:outline-none text-sm lg:text-base" />
              </div>
            </div>

            <motion.button onClick={handleProfileSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="mt-6 px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl text-white font-semibold flex items-center gap-2 text-sm lg:text-base"
              style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
              {saved ? <><CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" /> Saved!</> : <>Save Changes</>}
            </motion.button>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-5 lg:p-8">
              <h2 className="font-serif text-lg lg:text-2xl mb-4 lg:mb-6" style={{ color: theme.navy }}>Change Password</h2>
              
              <div className="space-y-4 max-w-md">
                {[
                  { key: 'current', label: 'Current Password', icon: Lock },
                  { key: 'new', label: 'New Password', icon: Key },
                  { key: 'confirm', label: 'Confirm New Password', icon: Key }
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5 lg:mb-2">{field.label}</label>
                    <div className="relative">
                      <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                      <input type={showPasswords[field.key] ? 'text' : 'password'}
                        value={passwordForm[field.key]}
                        onChange={(e) => setPasswordForm({...passwordForm, [field.key]: e.target.value})}
                        className="w-full pl-11 lg:pl-12 pr-12 py-2.5 lg:py-3 border border-gray-200 rounded-xl focus:outline-none text-sm lg:text-base"
                        placeholder="••••••••" />
                      <button onClick={() => setShowPasswords({...showPasswords, [field.key]: !showPasswords[field.key]})}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPasswords[field.key] ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button onClick={handlePasswordChange} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="mt-6 px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl text-white font-semibold flex items-center gap-2 text-sm lg:text-base"
                style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
                {saved ? <><CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" /> Updated!</> : <><Lock className="w-4 h-4 lg:w-5 lg:h-5" /> Update Password</>}
              </motion.button>
            </div>

            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-5 lg:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-serif text-lg lg:text-xl mb-1 lg:mb-2" style={{ color: theme.navy }}>Two-Factor Authentication</h2>
                  <p className="text-gray-500 text-xs lg:text-sm">Extra security layer for your account</p>
                </div>
                <button className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium" style={{ background: `${theme.green}15`, color: theme.green }}>
                  Enable
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-5 lg:p-8">
              <h2 className="font-serif text-lg lg:text-xl mb-4 lg:mb-6" style={{ color: theme.navy }}>Login Activity</h2>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'New York', time: 'Now', current: true },
                  { device: 'Safari on iPhone', location: 'New York', time: '1 day ago', current: false }
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm" style={{ color: theme.navy }}>{session.device}</p>
                        <p className="text-xs text-gray-500">{session.location} • {session.time}</p>
                      </div>
                    </div>
                    {session.current && <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: `${theme.green}15`, color: theme.green }}>Current</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* KYC Tab */}
        {activeTab === 'kyc' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-5 lg:p-8">
            <h2 className="font-serif text-lg lg:text-2xl mb-2" style={{ color: theme.navy }}>KYC Verification</h2>
            <p className="text-gray-500 text-sm mb-6 lg:mb-8">Complete verification to unlock all features</p>

            {kycStatus === 'verified' ? (
              <div className="text-center py-8 lg:py-12">
                <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-full flex items-center justify-center mb-4 lg:mb-6" style={{ background: `${theme.green}20` }}>
                  <CheckCircle className="w-12 h-12 lg:w-14 lg:h-14" style={{ color: theme.green }} />
                </div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2" style={{ color: theme.navy }}>Verified</h3>
                <p className="text-gray-500 text-sm">Your identity has been verified.</p>
              </div>
            ) : kycStatus === 'submitted' ? (
              <div className="text-center py-8 lg:py-12">
                <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-full flex items-center justify-center mb-4 lg:mb-6" style={{ background: `${theme.gold}20` }}>
                  <Clock className="w-12 h-12 lg:w-14 lg:h-14" style={{ color: theme.gold }} />
                </div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2" style={{ color: theme.navy }}>Under Review</h3>
                <p className="text-gray-500 text-sm">We're reviewing your documents (1-2 business days).</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mb-6 lg:mb-8">
                  {[1, 2, 3].map((s) => (
                    <React.Fragment key={s}>
                      <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-sm ${kycStep >= s ? 'text-white' : 'bg-gray-200 text-gray-500'}`}
                        style={kycStep >= s ? { background: theme.navy } : {}}>
                        {kycStep > s ? <Check className="w-4 h-4" /> : s}
                      </div>
                      {s < 3 && <div className={`w-12 lg:w-20 h-1 mx-1 lg:mx-2 ${kycStep > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
                    </React.Fragment>
                  ))}
                </div>

                {kycStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold" style={{ color: theme.navy }}>Personal Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1.5">Full Legal Name</label>
                        <input type="text" defaultValue={user.name} placeholder="As shown on ID" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1.5">Date of Birth</label>
                        <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1.5">ID Number</label>
                        <input type="text" placeholder="Enter your ID number" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1.5">ID Type</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select ID Type</option>
                          <option value="passport">International Passport</option>
                          <option value="drivers_license">Driver's License</option>
                          <option value="national_id">National ID Card</option>
                          <option value="residence_permit">Residence Permit</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {kycStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold" style={{ color: theme.navy }}>Upload Documents</h3>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 lg:p-8 text-center cursor-pointer hover:border-gray-300">
                      <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                      <p className="font-medium text-sm" style={{ color: theme.navy }}>Upload ID (Front)</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 lg:p-8 text-center cursor-pointer hover:border-gray-300">
                      <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                      <p className="font-medium text-sm" style={{ color: theme.navy }}>Upload ID (Back)</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF</p>
                    </div>
                  </div>
                )}

                {kycStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold" style={{ color: theme.navy }}>Take a Selfie</h3>
                    <p className="text-gray-500 text-sm">Hold your ID next to your face</p>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 lg:p-12 text-center cursor-pointer hover:border-gray-300">
                      <Camera className="w-14 h-14 mx-auto text-gray-400 mb-3" />
                      <p className="font-medium text-sm" style={{ color: theme.navy }}>Take or Upload Selfie</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6 lg:mt-8">
                  {kycStep > 1 && (
                    <button onClick={() => setKycStep(kycStep - 1)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 text-sm">
                      Back
                    </button>
                  )}
                  <motion.button onClick={() => kycStep < 3 ? setKycStep(kycStep + 1) : handleKycSubmit()}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="ml-auto px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl text-white font-semibold text-sm"
                    style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
                    {kycStep === 3 ? 'Submit' : 'Continue'}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-5 lg:p-8">
            <h2 className="font-serif text-lg lg:text-2xl mb-4 lg:mb-6" style={{ color: theme.navy }}>Notifications</h2>
            
            <div className="space-y-4">
              {[
                { title: 'Investment Updates', desc: 'Portfolio performance alerts', enabled: true },
                { title: 'New Opportunities', desc: 'New investment alerts', enabled: true },
                { title: 'Payouts', desc: 'Payout notifications', enabled: true },
                { title: 'Referral Bonuses', desc: 'Earn alerts from referrals', enabled: true },
                { title: 'Marketing', desc: 'Promotional emails', enabled: false }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-sm" style={{ color: theme.navy }}>{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <button className={`w-11 h-6 lg:w-12 lg:h-7 rounded-full transition-colors ${item.enabled ? '' : 'bg-gray-300'}`}
                    style={item.enabled ? { background: theme.green } : {}}>
                    <div className={`w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full shadow transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Logout Button */}
        <motion.button onClick={onLogout} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-3.5 rounded-xl text-red-500 font-semibold bg-red-50 flex items-center justify-center gap-2 lg:hidden">
          <LogOut className="w-5 h-5" /> Logout
        </motion.button>
      </div>
    </div>
  );
}

// ============ ADMIN CREDENTIALS ============
const ADMIN_CREDENTIALS = {
  email: 'saxovaultadmin@saxovault.com',
  password: 'SaxoAdmin2024!'
};

// ============ LOCAL STORAGE HELPERS ============
const Storage = {
  getUsers: () => JSON.parse(localStorage.getItem('saxovault_users') || '[]'),
  setUsers: (users) => localStorage.setItem('saxovault_users', JSON.stringify(users)),
  
  getTransactions: () => JSON.parse(localStorage.getItem('saxovault_transactions') || '[]'),
  setTransactions: (txs) => localStorage.setItem('saxovault_transactions', JSON.stringify(txs)),
  addTransaction: (tx) => {
    const txs = Storage.getTransactions();
    txs.unshift({ ...tx, id: Date.now(), createdAt: new Date().toISOString(), status: 'pending' });
    Storage.setTransactions(txs);
    return txs[0];
  },
  
  getSettings: () => JSON.parse(localStorage.getItem('saxovault_settings') || JSON.stringify({
    wallets: {
      btc: 'bc1qzmgg6hw0fttfpczh2whp8f44k497d6pucghk58',
      eth: '0x83057882eC7B7EE0cBe63C2fE2b8957e7ab69655',
      usdt: 'TLGH9FucAuPNUoQw2XUFEDtCg4FFdJ2jKG'
    },
    whatsapp: '+14642395280',
    email: 'support@saxovault.com',
    siteName: 'SaxoVault Capital'
  })),
  setSettings: (settings) => localStorage.setItem('saxovault_settings', JSON.stringify(settings)),
  
  getNotifications: () => JSON.parse(localStorage.getItem('saxovault_notifications') || '[]'),
  addNotification: (notif) => {
    const notifs = Storage.getNotifications();
    notifs.unshift({ ...notif, id: Date.now(), read: false, createdAt: new Date().toISOString() });
    localStorage.setItem('saxovault_notifications', JSON.stringify(notifs.slice(0, 100)));
  }
};

// ============ ADMIN LOGIN PAGE ============
function AdminLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('saxovault_admin', 'true');
        onLogin();
      } else {
        setError('Invalid admin credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
            style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-2xl" style={{ color: theme.navy }}>Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">SaxoVault Capital Management</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@saxovault.com" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••" required />
            </div>
          </div>

          <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-5 h-5" /> Access Admin Panel</>}
          </motion.button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-500 hover:underline">← Back to Website</a>
        </div>
      </motion.div>
    </div>
  );
}

// ============ ADMIN DASHBOARD ============
function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState(Storage.getUsers());
  const [transactions, setTransactions] = useState(Storage.getTransactions());
  const [settings, setSettings] = useState(Storage.getSettings());
  const [notifications, setNotifications] = useState(Storage.getNotifications());
  const [editingUser, setEditingUser] = useState(null);

  // Refresh data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(Storage.getUsers());
      setTransactions(Storage.getTransactions());
      setNotifications(Storage.getNotifications());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Stats
  const totalUsers = users.length;
  const totalDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const pendingDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'pending').length;
  const pendingWithdrawals = transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending').length;

  const handleUpdateUser = (userId, updates) => {
    const updatedUsers = users.map(u => u.uid === userId ? { ...u, ...updates } : u);
    setUsers(updatedUsers);
    Storage.setUsers(updatedUsers);
    Storage.addNotification({ type: 'user_update', message: `User updated successfully` });
    setEditingUser(null);
  };

  const handleUpdateTransaction = (txId, status) => {
    const updatedTxs = transactions.map(t => t.id === txId ? { ...t, status, updatedAt: new Date().toISOString() } : t);
    setTransactions(updatedTxs);
    Storage.setTransactions(updatedTxs);
    Storage.addNotification({ type: 'tx_update', message: `Transaction ${status}` });
  };

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    Storage.setSettings(newSettings);
    Storage.addNotification({ type: 'settings_update', message: 'Settings updated successfully' });
    alert('Settings saved successfully!');
  };

  // Get tickets
  const tickets = JSON.parse(localStorage.getItem('saxovault_tickets') || '[]');
  const openTickets = tickets.filter(t => t.status === 'open').length;

  // Investment management state
  const [adminInvestments, setAdminInvestments] = useState(() => {
    const stored = localStorage.getItem('saxovault_investments');
    return stored ? JSON.parse(stored) : investments;
  });
  const [editingInvestment, setEditingInvestment] = useState(null);
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: '', category: 'Real Estate', type: 'real-estate', min: 1000, returns: '10-15%',
    term: '12 months', desc: '', status: 'Funding', progress: 0, goal: 1000000
  });

  const handleSaveInvestment = (inv) => {
    let updated;
    if (inv.id) {
      updated = adminInvestments.map(i => i.id === inv.id ? inv : i);
    } else {
      inv.id = Date.now();
      updated = [...adminInvestments, inv];
    }
    setAdminInvestments(updated);
    localStorage.setItem('saxovault_investments', JSON.stringify(updated));
    Storage.addNotification({ type: 'investment', message: inv.id ? 'Investment updated' : 'Investment added' });
    setEditingInvestment(null);
    setShowAddInvestment(false);
  };

  const handleDeleteInvestment = (id) => {
    if (confirm('Are you sure you want to delete this investment?')) {
      const updated = adminInvestments.filter(i => i.id !== id);
      setAdminInvestments(updated);
      localStorage.setItem('saxovault_investments', JSON.stringify(updated));
      Storage.addNotification({ type: 'investment', message: 'Investment deleted' });
    }
  };

  // Messaging state
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [showPersonalMessage, setShowPersonalMessage] = useState(false);
  const [messageUser, setMessageUser] = useState(null);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [personalSubject, setPersonalSubject] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  const handleSendBroadcast = () => {
    if (!broadcastTitle || !broadcastMessage) {
      alert('Please enter both title and message');
      return;
    }
    const msg = {
      id: Date.now(),
      type: 'broadcast',
      title: broadcastTitle,
      message: broadcastMessage,
      sentAt: new Date().toISOString(),
      recipients: users.length
    };
    const existing = JSON.parse(localStorage.getItem('saxovault_messages') || '[]');
    localStorage.setItem('saxovault_messages', JSON.stringify([msg, ...existing]));
    
    // Add to each user's notifications
    const userNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
    users.forEach(u => {
      if (!userNotifs[u.uid]) userNotifs[u.uid] = [];
      userNotifs[u.uid].unshift({ ...msg, read: false });
    });
    localStorage.setItem('saxovault_user_notifications', JSON.stringify(userNotifs));
    
    Storage.addNotification({ type: 'broadcast', message: `Broadcast sent to ${users.length} users` });
    setBroadcastTitle('');
    setBroadcastMessage('');
    setShowBroadcast(false);
    alert(`✅ Message sent to ${users.length} users!`);
  };

  const handleSendPersonalMessage = () => {
    if (!personalSubject || !personalMessage || !messageUser) {
      alert('Please enter both subject and message');
      return;
    }
    const msg = {
      id: Date.now(),
      type: 'personal',
      title: personalSubject,
      message: personalMessage,
      sentAt: new Date().toISOString(),
      recipient: messageUser.email,
      recipientId: messageUser.uid
    };
    const existing = JSON.parse(localStorage.getItem('saxovault_messages') || '[]');
    localStorage.setItem('saxovault_messages', JSON.stringify([msg, ...existing]));
    
    // Add to user's notifications
    const userNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
    if (!userNotifs[messageUser.uid]) userNotifs[messageUser.uid] = [];
    userNotifs[messageUser.uid].unshift({ ...msg, read: false });
    localStorage.setItem('saxovault_user_notifications', JSON.stringify(userNotifs));
    
    Storage.addNotification({ type: 'personal_msg', message: `Message sent to ${messageUser.email}` });
    setPersonalSubject('');
    setPersonalMessage('');
    setMessageUser(null);
    setShowPersonalMessage(false);
    alert(`✅ Message sent to ${messageUser.name || messageUser.email}!`);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: PieChart },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'transactions', name: 'Transactions', icon: CreditCard },
    { id: 'investments', name: 'Investments', icon: TrendingUp },
    { id: 'tickets', name: 'Tickets', icon: Ticket, badge: openTickets },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen" style={{ background: theme.cream }}>
      {/* Admin Header */}
      <div className="bg-white shadow-md px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)` }}>
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-lg lg:text-xl" style={{ color: theme.navy }}>Admin Dashboard</h1>
            <p className="text-gray-500 text-xs">SaxoVault Capital</p>
          </div>
        </div>
        <motion.button onClick={onLogout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-sm">
          <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Mobile: horizontal scroll, Desktop: vertical */}
        <div className="lg:w-64 bg-white shadow-lg lg:min-h-screen">
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-2 lg:p-4 gap-2">
            {tabs.map((tab) => (
              <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl whitespace-nowrap transition-all ${activeTab === tab.id ? 'shadow-md' : 'hover:bg-gray-50'}`}
                style={activeTab === tab.id ? { background: `${theme.navy}10`, color: theme.navy } : { color: '#6b7280' }}>
                <tab.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="font-medium text-sm">{tab.name}</span>
                {tab.id === 'transactions' && (pendingDeposits + pendingWithdrawals) > 0 && (
                  <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-red-500 text-white">
                    {pendingDeposits + pendingWithdrawals}
                  </span>
                )}
                {tab.id === 'tickets' && openTickets > 0 && (
                  <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-purple-500 text-white">
                    {openTickets}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="font-serif text-xl lg:text-2xl mb-6" style={{ color: theme.navy }}>Dashboard Overview</h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                {[
                  { label: 'Total Users', value: totalUsers, icon: Users, color: theme.navy },
                  { label: 'Total Deposits', value: `$${totalDeposits.toLocaleString()}`, icon: Download, color: theme.green },
                  { label: 'Pending Deposits', value: pendingDeposits, icon: Clock, color: theme.gold },
                  { label: 'Pending Withdrawals', value: pendingWithdrawals, icon: Upload, color: '#ef4444' }
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: `${stat.color}15` }}>
                      <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: stat.color }} />
                    </div>
                    <p className="text-gray-500 text-xs lg:text-sm">{stat.label}</p>
                    <p className="text-xl lg:text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                <h3 className="font-serif text-lg mb-4" style={{ color: theme.navy }}>Recent Transactions</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-3 lg:p-4 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-100' : 'bg-orange-100'}`}>
                          {tx.type === 'deposit' ? <Download className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" /> : <Upload className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm" style={{ color: theme.navy }}>{tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</p>
                          <p className="text-xs text-gray-500">{tx.userEmail}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm lg:text-base">${tx.amount?.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                          tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>{tx.status}</span>
                      </div>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No transactions yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>User Management</h2>
                <motion.button onClick={() => setShowBroadcast(true)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
                  style={{ background: theme.navy }}>
                  <Send className="w-4 h-4" /> Broadcast Message
                </motion.button>
              </div>
              
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-gray-500 text-sm">{users.length} registered users</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {users.map((user, i) => (
                    <div key={i} className={`p-4 hover:bg-gray-50 transition-colors ${user.status === 'banned' ? 'bg-red-50' : user.status === 'suspended' ? 'bg-yellow-50' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm relative"
                            style={{ background: user.status === 'banned' ? '#ef4444' : user.status === 'suspended' ? '#f59e0b' : `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
                            {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                            {user.status === 'banned' && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center"><X className="w-3 h-3 text-white" /></span>}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm" style={{ color: theme.navy }}>{user.name || 'No Name'}</p>
                              {user.status === 'banned' && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">Banned</span>}
                              {user.status === 'suspended' && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Suspended</span>}
                            </div>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-3">
                          <div className="text-right hidden sm:block">
                            <p className="font-bold text-sm" style={{ color: theme.green }}>${(user.balance || 0).toLocaleString()}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${user.kycStatus === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {user.kycStatus || 'pending'}
                            </span>
                          </div>
                          <motion.button onClick={() => { setMessageUser(user); setShowPersonalMessage(true); }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg hover:bg-blue-100" title="Send Message">
                            <Mail className="w-4 h-4 text-blue-500" />
                          </motion.button>
                          <motion.button onClick={() => setEditingUser(user)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg hover:bg-gray-100" title="Edit User">
                            <Settings className="w-4 h-4 text-gray-500" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p className="text-center text-gray-500 py-12">No users registered yet</p>
                  )}
                </div>
              </div>

              {/* Edit User Modal */}
              <AnimatePresence>
                {editingUser && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setEditingUser(null)}>
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                      className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
                      <h3 className="font-serif text-xl mb-4" style={{ color: theme.navy }}>Edit User: {editingUser.name || editingUser.email}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Balance ($)</label>
                          <input type="number" value={editingUser.balance || 0}
                            onChange={(e) => setEditingUser({...editingUser, balance: parseFloat(e.target.value) || 0})}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">KYC Status</label>
                          <select value={editingUser.kycStatus || 'pending'}
                            onChange={(e) => setEditingUser({...editingUser, kycStatus: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl">
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                          <select value={editingUser.status || 'active'}
                            onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl">
                            <option value="active">✅ Active</option>
                            <option value="suspended">⚠️ Suspended</option>
                            <option value="banned">🚫 Banned</option>
                          </select>
                          {editingUser.status === 'suspended' && (
                            <p className="text-xs text-yellow-600 mt-1">User can't withdraw or invest while suspended</p>
                          )}
                          {editingUser.status === 'banned' && (
                            <p className="text-xs text-red-600 mt-1">User cannot access their account</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <motion.button onClick={() => setEditingUser(null)} whileHover={{ scale: 1.02 }}
                          className="flex-1 py-2.5 rounded-xl border border-gray-200">Cancel</motion.button>
                        <motion.button onClick={() => handleUpdateUser(editingUser.uid, editingUser)} whileHover={{ scale: 1.02 }}
                          className="flex-1 py-2.5 rounded-xl text-white"
                          style={{ background: theme.navy }}>Save Changes</motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Broadcast Message Modal */}
              <AnimatePresence>
                {showBroadcast && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowBroadcast(false)}>
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                      className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
                      <h3 className="font-serif text-xl mb-4" style={{ color: theme.navy }}>📢 Broadcast Message to All Users</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Message Title</label>
                          <input type="text" value={broadcastTitle} onChange={(e) => setBroadcastTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl" placeholder="Important Announcement" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                          <textarea rows={4} value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl resize-none"
                            placeholder="Enter your message to all users..." />
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                          <p className="text-sm text-blue-700">📨 This message will be sent to <strong>{users.length}</strong> users</p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <motion.button onClick={() => setShowBroadcast(false)} whileHover={{ scale: 1.02 }}
                          className="flex-1 py-2.5 rounded-xl border border-gray-200">Cancel</motion.button>
                        <motion.button onClick={handleSendBroadcast} whileHover={{ scale: 1.02 }}
                          className="flex-1 py-2.5 rounded-xl text-white flex items-center justify-center gap-2"
                          style={{ background: theme.navy }}>
                          <Send className="w-4 h-4" /> Send to All
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Personal Message Modal */}
              <AnimatePresence>
                {showPersonalMessage && messageUser && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => { setShowPersonalMessage(false); setMessageUser(null); }}>
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                      className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
                      <h3 className="font-serif text-xl mb-4" style={{ color: theme.navy }}>💬 Message to {messageUser.name || messageUser.email}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                          <input type="text" value={personalSubject} onChange={(e) => setPersonalSubject(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl" placeholder="Account Update" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                          <textarea rows={4} value={personalMessage} onChange={(e) => setPersonalMessage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl resize-none"
                            placeholder="Enter your message..." />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <motion.button onClick={() => { setShowPersonalMessage(false); setMessageUser(null); }} whileHover={{ scale: 1.02 }}
                          className="flex-1 py-2.5 rounded-xl border border-gray-200">Cancel</motion.button>
                        <motion.button onClick={handleSendPersonalMessage} whileHover={{ scale: 1.02 }}
                          className="flex-1 py-2.5 rounded-xl text-white flex items-center justify-center gap-2"
                          style={{ background: theme.green }}>
                          <Send className="w-4 h-4" /> Send Message
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div>
              <h2 className="font-serif text-xl lg:text-2xl mb-6" style={{ color: theme.navy }}>Transaction Management</h2>
              
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                      {pendingDeposits} pending deposits
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
                      {pendingWithdrawals} pending withdrawals
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {transactions.map((tx, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'deposit' ? 'bg-green-100' : 'bg-orange-100'}`}>
                            {tx.type === 'deposit' ? <Download className="w-5 h-5 text-green-600" /> : <Upload className="w-5 h-5 text-orange-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm" style={{ color: theme.navy }}>
                              {tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'} - {tx.crypto}
                            </p>
                            <p className="text-xs text-gray-500">{tx.userEmail}</p>
                            <p className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <div className="text-right">
                            <p className="font-bold">${tx.amount?.toLocaleString()}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                              tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>{tx.status}</span>
                          </div>
                          {tx.status === 'pending' && (
                            <div className="flex gap-2">
                              <motion.button onClick={() => handleUpdateTransaction(tx.id, 'completed')}
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
                                <Check className="w-4 h-4" />
                              </motion.button>
                              <motion.button onClick={() => handleUpdateTransaction(tx.id, 'rejected')}
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                                <X className="w-4 h-4" />
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <p className="text-center text-gray-500 py-12">No transactions yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="font-serif text-xl lg:text-2xl mb-6" style={{ color: theme.navy }}>Activity Log</h2>
              
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {notifications.map((notif, i) => (
                    <div key={i} className={`p-4 ${notif.read ? '' : 'bg-blue-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <Bell className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm" style={{ color: theme.navy }}>{notif.message}</p>
                          <p className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-center text-gray-500 py-12">No activity yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Investments Tab - FULL CONTROL */}
          {activeTab === 'investments' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>Investment Plans</h2>
                <motion.button onClick={() => setShowAddInvestment(true)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
                  style={{ background: theme.green }}>
                  <Plus className="w-4 h-4" /> Add Investment
                </motion.button>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm text-gray-500">{adminInvestments.length} investment plans</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {adminInvestments.map((inv, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-gray-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold truncate" style={{ color: theme.navy }}>{inv.name}</p>
                            <p className="text-xs text-gray-500">{inv.category} • Min ${inv.min?.toLocaleString()}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{inv.returns}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{inv.term}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${inv.status === 'Active' ? 'bg-green-100 text-green-700' : inv.status === 'Funding' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{inv.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <motion.button onClick={() => setEditingInvestment(inv)} whileHover={{ scale: 1.1 }}
                            className="p-2 rounded-lg bg-blue-100 text-blue-600">
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button onClick={() => handleDeleteInvestment(inv.id)} whileHover={{ scale: 1.1 }}
                            className="p-2 rounded-lg bg-red-100 text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add/Edit Investment Modal */}
              <AnimatePresence>
                {(showAddInvestment || editingInvestment) && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => { setShowAddInvestment(false); setEditingInvestment(null); }}>
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                      className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}>
                      <h3 className="font-serif text-xl mb-4" style={{ color: theme.navy }}>
                        {editingInvestment ? 'Edit Investment' : 'Add New Investment'}
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                          <input type="text" value={editingInvestment?.name || newInvestment.name}
                            onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, name: e.target.value}) : setNewInvestment({...newInvestment, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl" placeholder="Greenwich Towers" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select value={editingInvestment?.category || newInvestment.category}
                              onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, category: e.target.value}) : setNewInvestment({...newInvestment, category: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl">
                              <option>Real Estate</option>
                              <option>Cryptocurrency</option>
                              <option>Stocks & Bonds</option>
                              <option>Precious Metals</option>
                              <option>Investment Plans</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select value={editingInvestment?.status || newInvestment.status}
                              onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, status: e.target.value}) : setNewInvestment({...newInvestment, status: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl">
                              <option>Funding</option>
                              <option>Active</option>
                              <option>Open</option>
                              <option>Closed</option>
                              <option>Coming Soon</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Returns (e.g. 12-15%)</label>
                            <input type="text" value={editingInvestment?.returns || newInvestment.returns}
                              onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, returns: e.target.value}) : setNewInvestment({...newInvestment, returns: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl" placeholder="12-15%" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Term (e.g. 24 months)</label>
                            <input type="text" value={editingInvestment?.term || newInvestment.term}
                              onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, term: e.target.value}) : setNewInvestment({...newInvestment, term: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl" placeholder="24 months" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Min Investment ($)</label>
                            <input type="number" value={editingInvestment?.min || newInvestment.min}
                              onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, min: parseInt(e.target.value)}) : setNewInvestment({...newInvestment, min: parseInt(e.target.value)})}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Funding Goal ($)</label>
                            <input type="number" value={editingInvestment?.goal || newInvestment.goal}
                              onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, goal: parseInt(e.target.value)}) : setNewInvestment({...newInvestment, goal: parseInt(e.target.value)})}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                          <input type="number" min="0" max="100" value={editingInvestment?.progress || newInvestment.progress}
                            onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, progress: parseInt(e.target.value)}) : setNewInvestment({...newInvestment, progress: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea rows={3} value={editingInvestment?.desc || newInvestment.desc}
                            onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, desc: e.target.value}) : setNewInvestment({...newInvestment, desc: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl resize-none"
                            placeholder="Premium mixed-use development..." />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
                          <input type="text" value={editingInvestment?.customImg || ''}
                            onChange={(e) => editingInvestment ? setEditingInvestment({...editingInvestment, customImg: e.target.value}) : setNewInvestment({...newInvestment, customImg: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl"
                            placeholder="https://example.com/image.jpg" />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <motion.button onClick={() => { setShowAddInvestment(false); setEditingInvestment(null); }} 
                          whileHover={{ scale: 1.02 }} className="flex-1 py-2.5 rounded-xl border border-gray-200">
                          Cancel
                        </motion.button>
                        <motion.button onClick={() => handleSaveInvestment(editingInvestment || newInvestment)} 
                          whileHover={{ scale: 1.02 }} className="flex-1 py-2.5 rounded-xl text-white"
                          style={{ background: theme.green }}>
                          {editingInvestment ? 'Save Changes' : 'Add Investment'}
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === 'tickets' && (
            <div>
              <h2 className="font-serif text-xl lg:text-2xl mb-6" style={{ color: theme.navy }}>Support Tickets</h2>
              
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                      {openTickets} open tickets
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      {tickets.filter(t => t.status === 'closed').length} closed
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {tickets.map((ticket, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100" style={{ color: theme.navy }}>{ticket.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              ticket.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                              ticket.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                              ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>{ticket.priority}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              ticket.status === 'open' ? 'bg-purple-100 text-purple-700' :
                              ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>{ticket.status}</span>
                          </div>
                          <p className="font-medium text-sm" style={{ color: theme.navy }}>{ticket.subject}</p>
                          <p className="text-xs text-gray-500 mt-1">From: {ticket.name} ({ticket.email})</p>
                          <p className="text-xs text-gray-400">{new Date(ticket.createdAt).toLocaleString()}</p>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{ticket.message}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {ticket.status === 'open' && (
                            <>
                              <motion.button 
                                onClick={() => {
                                  const updatedTickets = tickets.map(t => t.id === ticket.id ? {...t, status: 'in-progress'} : t);
                                  localStorage.setItem('saxovault_tickets', JSON.stringify(updatedTickets));
                                  window.location.reload();
                                }}
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs font-medium">
                                In Progress
                              </motion.button>
                              <motion.a 
                                href={`mailto:${ticket.email}?subject=Re: ${ticket.subject} [${ticket.id}]&body=Hi ${ticket.name},%0D%0A%0D%0AThank you for contacting SaxoVault Capital support.%0D%0A%0D%0A[Your response here]%0D%0A%0D%0ABest regards,%0D%0ASaxoVault Capital Support Team`}
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                                <Mail className="w-3 h-3" /> Reply
                              </motion.a>
                            </>
                          )}
                          {ticket.status !== 'closed' && (
                            <motion.button 
                              onClick={() => {
                                const updatedTickets = tickets.map(t => t.id === ticket.id ? {...t, status: 'closed'} : t);
                                localStorage.setItem('saxovault_tickets', JSON.stringify(updatedTickets));
                                window.location.reload();
                              }}
                              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                              className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium">
                              Close
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {tickets.length === 0 && (
                    <p className="text-center text-gray-500 py-12">No tickets yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="font-serif text-xl lg:text-2xl mb-6" style={{ color: theme.navy }}>Platform Settings</h2>
              
              <div className="space-y-6">
                {/* Wallet Addresses */}
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                  <h3 className="font-serif text-lg mb-4 flex items-center gap-2" style={{ color: theme.navy }}>
                    <Wallet className="w-5 h-5" /> Deposit Wallet Addresses
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bitcoin (BTC)</label>
                      <input type="text" value={settings.wallets?.btc || ''}
                        onChange={(e) => setSettings({...settings, wallets: {...settings.wallets, btc: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ethereum (ETH)</label>
                      <input type="text" value={settings.wallets?.eth || ''}
                        onChange={(e) => setSettings({...settings, wallets: {...settings.wallets, eth: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">USDT (TRC-20)</label>
                      <input type="text" value={settings.wallets?.usdt || ''}
                        onChange={(e) => setSettings({...settings, wallets: {...settings.wallets, usdt: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl font-mono text-sm" />
                    </div>
                  </div>
                </div>

                {/* Contact Settings */}
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                  <h3 className="font-serif text-lg mb-4 flex items-center gap-2" style={{ color: theme.navy }}>
                    <Phone className="w-5 h-5" /> Contact Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                      <input type="text" value={settings.whatsapp || ''}
                        onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                        placeholder="+1234567890" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                      <input type="email" value={settings.email || ''}
                        onChange={(e) => setSettings({...settings, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                    </div>
                  </div>
                </div>

                {/* Site Settings */}
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                  <h3 className="font-serif text-lg mb-4 flex items-center gap-2" style={{ color: theme.navy }}>
                    <Globe className="w-5 h-5" /> Site Settings
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input type="text" value={settings.siteName || ''}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                  </div>
                </div>

                <motion.button onClick={() => handleUpdateSettings(settings)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl text-white font-semibold"
                  style={{ background: `linear-gradient(135deg, ${theme.green} 0%, ${theme.greenDark} 100%)` }}>
                  Save All Settings
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [page, setPage] = useState('home');
  const [selected, setSelected] = useState(null);
  const [showInvest, setShowInvest] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    balance: 0,
    profileImage: null
  });

  // Check for admin route
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setShowAdminLogin(true);
    }
    // Check if admin is already logged in
    if (localStorage.getItem('saxovault_admin') === 'true') {
      setIsAdmin(true);
      setShowAdminLogin(true);
    }
  }, []);

  const handleLogin = (userData) => {
    if (userData) {
      setUser({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        country: userData.country || '',
        balance: userData.balance || 0,
        profileImage: userData.profileImage || null
      });
      // Save to localStorage for admin to see
      const users = Storage.getUsers();
      const existingUser = users.find(u => u.email === userData.email);
      if (!existingUser) {
        users.push({ ...userData, uid: userData.uid || Date.now().toString(), createdAt: new Date().toISOString() });
        Storage.setUsers(users);
      }
    }
    setIsAuth(true);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    setIsAuth(false);
    setUser({ name: '', email: '', phone: '', address: '', balance: 0, profileImage: null });
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('saxovault_admin');
    setIsAdmin(false);
    setShowAdminLogin(false);
  };

  // Admin Login Page
  if (showAdminLogin && !isAdmin) {
    return <AdminLoginPage onLogin={() => setIsAdmin(true)} />;
  }

  // Admin Dashboard
  if (isAdmin) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // User Auth Page
  if (!isAuth) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const handleSelectInvestment = (inv) => setSelected(inv);

  // Main app content continues below

  return (
    <div className="min-h-screen" style={{ background: theme.cream }}>
      <Navbar activePage={page} onNavigate={setPage} user={user} onLogout={() => setAuth(false)} />

      <AnimatePresence>
        {selected && !showInvest && <InvestmentModal investment={selected} onClose={() => setSelected(null)} onInvest={() => setShowInvest(true)} />}
        {showInvest && selected && <InvestFlowModal investment={selected} onClose={() => { setShowInvest(false); setSelected(null); }} balance={user.balance} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {page === 'home' && <HomePage key="home" onNavigate={setPage} onSelectInvestment={handleSelectInvestment} />}
        {page === 'investments' && <InvestmentsPage key="investments" onSelectInvestment={handleSelectInvestment} />}
        {page === 'dashboard' && <DashboardPage key="dashboard" user={user} onNavigate={setPage} />}
        {page === 'referral' && <ReferralPage key="referral" user={user} />}
        {page === 'calculator' && <CalculatorPage key="calculator" />}
        {page === 'notifications' && <NotificationsPage key="notifications" user={user} />}
        {page === 'profile' && <ProfilePage key="profile" user={user} setUser={setUser} onLogout={() => setAuth(false)} />}
      </AnimatePresence>

      <MobileBottomNav activePage={page} onNavigate={setPage} />
      <FloatingContact />
    </div>
  );
}
