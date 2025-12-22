import React, { useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Crown, TrendingUp, Shield, Users, ArrowRight, Eye, EyeOff, Mail, Lock, User, Phone,
  Home, PieChart, Wallet, Settings, ChevronRight, Building2, Bitcoin, BarChart3, Gem,
  Bell, X, Check, CheckCircle, Clock, CreditCard, Building, Copy, LogOut, Menu,
  FileText, Search, Download, MessageCircle, Send, Headphones, ChevronDown,
  Star, Gift, History, Calculator, Globe, Briefcase, ArrowLeft, ShieldCheck,
  MapPin, DollarSign, Target, Award, RefreshCw, Camera, Upload, Key, Smartphone,
  Ticket, Share2, Link2, UserPlus, Percent, BadgeDollarSign, ChevronUp, AlertCircle,
  Plus, Edit, Trash2, Image, Calendar, Moon, Sun, ExternalLink, Timer, Activity,
  Languages, HelpCircle, Zap, Filter, DownloadCloud, QrCode
} from 'lucide-react';

// Theme Context for Dark Mode
const ThemeContext = createContext();

const lightTheme = {
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
  red: '#ef4444',
  bg: '#faf8f5',
  cardBg: '#ffffff',
  textPrimary: '#0a1628',
  textSecondary: '#6b7280',
  border: '#e5e7eb'
};

const darkTheme = {
  navy: '#f8fafc',
  navyLight: '#e2e8f0',
  navyMedium: '#cbd5e1',
  gold: '#fbbf24',
  goldLight: '#fcd34d',
  goldDark: '#f59e0b',
  green: '#34d399',
  greenDark: '#10b981',
  cream: '#0f172a',
  charcoal: '#94a3b8',
  white: '#1e293b',
  red: '#f87171',
  bg: '#0f172a',
  cardBg: '#1e293b',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  border: '#334155'
};

// Global theme (will be set dynamically)
let theme = lightTheme;

// ============ FIREBASE IMPORTS ============
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  resetPassword,
  resendVerificationEmail,
  onAuthChange,
  auth,
  getCurrentUserData,
  signInWithGoogle,
  // Firestore functions
  saveUserToFirestore,
  getUserFromFirestore,
  getAllUsersFromFirestore,
  updateUserInFirestore,
  addTransactionToFirestore,
  getAllTransactionsFromFirestore,
  updateTransactionInFirestore,
  getUserTransactionsFromFirestore,
  subscribeToTransactions,
  subscribeToUsers
} from './firebase';

// Multi-language support - 30+ Languages
const translations = {
  // English
  en: {
    welcome: 'Welcome', dashboard: 'Dashboard', investments: 'Investments', deposit: 'Deposit', withdraw: 'Withdraw',
    balance: 'Balance', pending: 'Pending', approved: 'Approved', home: 'Home', profile: 'Profile', settings: 'Settings',
    logout: 'Logout', login: 'Login', register: 'Register', email: 'Email', password: 'Password', name: 'Name',
    phone: 'Phone', submit: 'Submit', cancel: 'Cancel', confirm: 'Confirm', amount: 'Amount', history: 'History',
    notifications: 'Notifications', referral: 'Referral', calculator: 'Calculator', investNow: 'Invest Now',
    minInvestment: 'Min Investment', returns: 'Returns', duration: 'Duration', status: 'Status', copyAddress: 'Copy Address',
    paymentPending: 'Payment Pending', transactionHistory: 'Transaction History', noTransactions: 'No transactions yet',
    securityTips: 'Security Tips', activityLog: 'Activity Log', viewAll: 'View All', search: 'Search',
    filter: 'Filter', export: 'Export', support: 'Support', help: 'Help', about: 'About', terms: 'Terms',
    privacy: 'Privacy', contact: 'Contact', language: 'Language', darkMode: 'Dark Mode', lightMode: 'Light Mode'
  },
  // Spanish
  es: {
    welcome: 'Bienvenido', dashboard: 'Panel', investments: 'Inversiones', deposit: 'Depositar', withdraw: 'Retirar',
    balance: 'Saldo', pending: 'Pendiente', approved: 'Aprobado', home: 'Inicio', profile: 'Perfil', settings: 'Ajustes',
    logout: 'Cerrar sesión', login: 'Iniciar sesión', register: 'Registrarse', email: 'Correo', password: 'Contraseña', name: 'Nombre',
    phone: 'Teléfono', submit: 'Enviar', cancel: 'Cancelar', confirm: 'Confirmar', amount: 'Cantidad', history: 'Historial',
    notifications: 'Notificaciones', referral: 'Referidos', calculator: 'Calculadora', investNow: 'Invertir Ahora',
    minInvestment: 'Inversión Mínima', returns: 'Retornos', duration: 'Duración', status: 'Estado', copyAddress: 'Copiar Dirección',
    paymentPending: 'Pago Pendiente', transactionHistory: 'Historial de Transacciones', noTransactions: 'Sin transacciones',
    securityTips: 'Consejos de Seguridad', activityLog: 'Registro de Actividad', viewAll: 'Ver Todo', search: 'Buscar',
    filter: 'Filtrar', export: 'Exportar', support: 'Soporte', help: 'Ayuda', about: 'Acerca de', terms: 'Términos',
    privacy: 'Privacidad', contact: 'Contacto', language: 'Idioma', darkMode: 'Modo Oscuro', lightMode: 'Modo Claro'
  },
  // French
  fr: {
    welcome: 'Bienvenue', dashboard: 'Tableau de bord', investments: 'Investissements', deposit: 'Dépôt', withdraw: 'Retirer',
    balance: 'Solde', pending: 'En attente', approved: 'Approuvé', home: 'Accueil', profile: 'Profil', settings: 'Paramètres',
    logout: 'Déconnexion', login: 'Connexion', register: "S'inscrire", email: 'E-mail', password: 'Mot de passe', name: 'Nom',
    phone: 'Téléphone', submit: 'Soumettre', cancel: 'Annuler', confirm: 'Confirmer', amount: 'Montant', history: 'Historique',
    notifications: 'Notifications', referral: 'Parrainage', calculator: 'Calculatrice', investNow: 'Investir Maintenant',
    minInvestment: 'Investissement Min', returns: 'Rendements', duration: 'Durée', status: 'Statut', copyAddress: "Copier l'adresse",
    paymentPending: 'Paiement en attente', transactionHistory: 'Historique des transactions', noTransactions: 'Aucune transaction',
    securityTips: 'Conseils de sécurité', activityLog: "Journal d'activité", viewAll: 'Voir tout', search: 'Rechercher',
    filter: 'Filtrer', export: 'Exporter', support: 'Support', help: 'Aide', about: 'À propos', terms: 'Conditions',
    privacy: 'Confidentialité', contact: 'Contact', language: 'Langue', darkMode: 'Mode sombre', lightMode: 'Mode clair'
  },
  // German
  de: {
    welcome: 'Willkommen', dashboard: 'Übersicht', investments: 'Investitionen', deposit: 'Einzahlung', withdraw: 'Auszahlung',
    balance: 'Guthaben', pending: 'Ausstehend', approved: 'Genehmigt', home: 'Startseite', profile: 'Profil', settings: 'Einstellungen',
    logout: 'Abmelden', login: 'Anmelden', register: 'Registrieren', email: 'E-Mail', password: 'Passwort', name: 'Name',
    phone: 'Telefon', submit: 'Absenden', cancel: 'Abbrechen', confirm: 'Bestätigen', amount: 'Betrag', history: 'Verlauf',
    notifications: 'Benachrichtigungen', referral: 'Empfehlung', calculator: 'Rechner', investNow: 'Jetzt investieren',
    minInvestment: 'Mindestanlage', returns: 'Rendite', duration: 'Laufzeit', status: 'Status', copyAddress: 'Adresse kopieren'
  },
  // Portuguese
  pt: {
    welcome: 'Bem-vindo', dashboard: 'Painel', investments: 'Investimentos', deposit: 'Depósito', withdraw: 'Saque',
    balance: 'Saldo', pending: 'Pendente', approved: 'Aprovado', home: 'Início', profile: 'Perfil', settings: 'Configurações',
    logout: 'Sair', login: 'Entrar', register: 'Cadastrar', email: 'E-mail', password: 'Senha', name: 'Nome',
    phone: 'Telefone', submit: 'Enviar', cancel: 'Cancelar', confirm: 'Confirmar', amount: 'Valor', history: 'Histórico',
    notifications: 'Notificações', referral: 'Indicação', calculator: 'Calculadora', investNow: 'Investir Agora'
  },
  // Italian
  it: {
    welcome: 'Benvenuto', dashboard: 'Pannello', investments: 'Investimenti', deposit: 'Deposito', withdraw: 'Prelievo',
    balance: 'Saldo', pending: 'In attesa', approved: 'Approvato', home: 'Home', profile: 'Profilo', settings: 'Impostazioni',
    logout: 'Esci', login: 'Accedi', register: 'Registrati', email: 'Email', password: 'Password', name: 'Nome',
    phone: 'Telefono', submit: 'Invia', cancel: 'Annulla', confirm: 'Conferma', amount: 'Importo', history: 'Cronologia',
    investNow: 'Investi Ora', minInvestment: 'Investimento Minimo', returns: 'Rendimenti', duration: 'Durata'
  },
  // Dutch
  nl: {
    welcome: 'Welkom', dashboard: 'Dashboard', investments: 'Investeringen', deposit: 'Storting', withdraw: 'Opname',
    balance: 'Saldo', pending: 'In behandeling', approved: 'Goedgekeurd', home: 'Home', profile: 'Profiel', settings: 'Instellingen',
    logout: 'Uitloggen', login: 'Inloggen', register: 'Registreren', investNow: 'Nu Investeren'
  },
  // Russian
  ru: {
    welcome: 'Добро пожаловать', dashboard: 'Панель', investments: 'Инвестиции', deposit: 'Депозит', withdraw: 'Вывод',
    balance: 'Баланс', pending: 'Ожидание', approved: 'Одобрено', home: 'Главная', profile: 'Профиль', settings: 'Настройки',
    logout: 'Выйти', login: 'Войти', register: 'Регистрация', email: 'Эл. почта', password: 'Пароль', name: 'Имя',
    phone: 'Телефон', submit: 'Отправить', cancel: 'Отмена', confirm: 'Подтвердить', amount: 'Сумма', history: 'История',
    investNow: 'Инвестировать', minInvestment: 'Мин. инвестиция', returns: 'Доходность', duration: 'Срок'
  },
  // Chinese (Simplified)
  zh: {
    welcome: '欢迎', dashboard: '仪表板', investments: '投资', deposit: '存款', withdraw: '取款',
    balance: '余额', pending: '待处理', approved: '已批准', home: '首页', profile: '个人资料', settings: '设置',
    logout: '退出', login: '登录', register: '注册', email: '电子邮件', password: '密码', name: '姓名',
    phone: '电话', submit: '提交', cancel: '取消', confirm: '确认', amount: '金额', history: '历史',
    investNow: '立即投资', minInvestment: '最低投资', returns: '回报', duration: '期限', notifications: '通知'
  },
  // Japanese
  ja: {
    welcome: 'ようこそ', dashboard: 'ダッシュボード', investments: '投資', deposit: '入金', withdraw: '出金',
    balance: '残高', pending: '保留中', approved: '承認済み', home: 'ホーム', profile: 'プロフィール', settings: '設定',
    logout: 'ログアウト', login: 'ログイン', register: '登録', email: 'メール', password: 'パスワード', name: '名前',
    phone: '電話', submit: '送信', cancel: 'キャンセル', confirm: '確認', amount: '金額', history: '履歴',
    investNow: '今すぐ投資', minInvestment: '最低投資額', returns: 'リターン', duration: '期間'
  },
  // Korean
  ko: {
    welcome: '환영합니다', dashboard: '대시보드', investments: '투자', deposit: '입금', withdraw: '출금',
    balance: '잔액', pending: '대기 중', approved: '승인됨', home: '홈', profile: '프로필', settings: '설정',
    logout: '로그아웃', login: '로그인', register: '가입', email: '이메일', password: '비밀번호', name: '이름',
    phone: '전화', submit: '제출', cancel: '취소', confirm: '확인', amount: '금액', history: '내역',
    investNow: '지금 투자', minInvestment: '최소 투자', returns: '수익률', duration: '기간'
  },
  // Arabic
  ar: {
    welcome: 'مرحبًا', dashboard: 'لوحة القيادة', investments: 'الاستثمارات', deposit: 'إيداع', withdraw: 'سحب',
    balance: 'الرصيد', pending: 'قيد الانتظار', approved: 'موافق عليه', home: 'الرئيسية', profile: 'الملف الشخصي', settings: 'الإعدادات',
    logout: 'تسجيل الخروج', login: 'تسجيل الدخول', register: 'التسجيل', email: 'البريد الإلكتروني', password: 'كلمة المرور',
    name: 'الاسم', phone: 'الهاتف', submit: 'إرسال', cancel: 'إلغاء', confirm: 'تأكيد', amount: 'المبلغ', history: 'السجل',
    investNow: 'استثمر الآن', minInvestment: 'الحد الأدنى للاستثمار', returns: 'العوائد', duration: 'المدة'
  },
  // Hindi
  hi: {
    welcome: 'स्वागत है', dashboard: 'डैशबोर्ड', investments: 'निवेश', deposit: 'जमा', withdraw: 'निकासी',
    balance: 'शेष राशि', pending: 'लंबित', approved: 'स्वीकृत', home: 'होम', profile: 'प्रोफ़ाइल', settings: 'सेटिंग्स',
    logout: 'लॉग आउट', login: 'लॉग इन', register: 'रजिस्टर', email: 'ईमेल', password: 'पासवर्ड', name: 'नाम',
    phone: 'फ़ोन', submit: 'जमा करें', cancel: 'रद्द करें', confirm: 'पुष्टि करें', amount: 'राशि', history: 'इतिहास',
    investNow: 'अभी निवेश करें', minInvestment: 'न्यूनतम निवेश', returns: 'रिटर्न', duration: 'अवधि'
  },
  // Turkish
  tr: {
    welcome: 'Hoş geldiniz', dashboard: 'Kontrol Paneli', investments: 'Yatırımlar', deposit: 'Para Yatır', withdraw: 'Para Çek',
    balance: 'Bakiye', pending: 'Beklemede', approved: 'Onaylandı', home: 'Ana Sayfa', profile: 'Profil', settings: 'Ayarlar',
    logout: 'Çıkış', login: 'Giriş', register: 'Kayıt Ol', email: 'E-posta', password: 'Şifre', name: 'Ad',
    phone: 'Telefon', submit: 'Gönder', cancel: 'İptal', confirm: 'Onayla', amount: 'Tutar', history: 'Geçmiş',
    investNow: 'Şimdi Yatırım Yap', minInvestment: 'Min Yatırım', returns: 'Getiri', duration: 'Süre'
  },
  // Polish
  pl: {
    welcome: 'Witamy', dashboard: 'Panel', investments: 'Inwestycje', deposit: 'Wpłata', withdraw: 'Wypłata',
    balance: 'Saldo', pending: 'Oczekujące', approved: 'Zatwierdzone', home: 'Strona główna', profile: 'Profil', settings: 'Ustawienia',
    logout: 'Wyloguj', login: 'Zaloguj', register: 'Zarejestruj', investNow: 'Inwestuj Teraz'
  },
  // Vietnamese
  vi: {
    welcome: 'Chào mừng', dashboard: 'Bảng điều khiển', investments: 'Đầu tư', deposit: 'Nạp tiền', withdraw: 'Rút tiền',
    balance: 'Số dư', pending: 'Đang chờ', approved: 'Đã duyệt', home: 'Trang chủ', profile: 'Hồ sơ', settings: 'Cài đặt',
    logout: 'Đăng xuất', login: 'Đăng nhập', register: 'Đăng ký', investNow: 'Đầu tư ngay'
  },
  // Thai
  th: {
    welcome: 'ยินดีต้อนรับ', dashboard: 'แดชบอร์ด', investments: 'การลงทุน', deposit: 'ฝากเงิน', withdraw: 'ถอนเงิน',
    balance: 'ยอดเงิน', pending: 'รอดำเนินการ', approved: 'อนุมัติแล้ว', home: 'หน้าแรก', profile: 'โปรไฟล์', settings: 'ตั้งค่า',
    logout: 'ออกจากระบบ', login: 'เข้าสู่ระบบ', register: 'ลงทะเบียน', investNow: 'ลงทุนเลย'
  },
  // Indonesian
  id: {
    welcome: 'Selamat datang', dashboard: 'Dasbor', investments: 'Investasi', deposit: 'Setor', withdraw: 'Tarik',
    balance: 'Saldo', pending: 'Tertunda', approved: 'Disetujui', home: 'Beranda', profile: 'Profil', settings: 'Pengaturan',
    logout: 'Keluar', login: 'Masuk', register: 'Daftar', investNow: 'Investasi Sekarang'
  },
  // Malay
  ms: {
    welcome: 'Selamat datang', dashboard: 'Papan pemuka', investments: 'Pelaburan', deposit: 'Deposit', withdraw: 'Pengeluaran',
    balance: 'Baki', pending: 'Menunggu', approved: 'Diluluskan', home: 'Laman utama', profile: 'Profil', settings: 'Tetapan',
    logout: 'Log keluar', login: 'Log masuk', register: 'Daftar', investNow: 'Labur Sekarang'
  },
  // Filipino/Tagalog
  tl: {
    welcome: 'Maligayang pagdating', dashboard: 'Dashboard', investments: 'Mga Pamumuhunan', deposit: 'Deposito', withdraw: 'Withdraw',
    balance: 'Balanse', pending: 'Nakabinbin', approved: 'Aprubado', home: 'Home', profile: 'Profile', settings: 'Settings',
    logout: 'Mag-logout', login: 'Mag-login', register: 'Mag-register', investNow: 'Mamuhunan Ngayon'
  },
  // Greek
  el: {
    welcome: 'Καλώς ήρθατε', dashboard: 'Πίνακας ελέγχου', investments: 'Επενδύσεις', deposit: 'Κατάθεση', withdraw: 'Ανάληψη',
    balance: 'Υπόλοιπο', pending: 'Εκκρεμεί', approved: 'Εγκρίθηκε', home: 'Αρχική', profile: 'Προφίλ', settings: 'Ρυθμίσεις',
    logout: 'Αποσύνδεση', login: 'Σύνδεση', register: 'Εγγραφή', investNow: 'Επενδύστε Τώρα'
  },
  // Czech
  cs: {
    welcome: 'Vítejte', dashboard: 'Přehled', investments: 'Investice', deposit: 'Vklad', withdraw: 'Výběr',
    balance: 'Zůstatek', pending: 'Čekající', approved: 'Schváleno', home: 'Domů', profile: 'Profil', settings: 'Nastavení',
    logout: 'Odhlásit', login: 'Přihlásit', register: 'Registrace', investNow: 'Investovat nyní'
  },
  // Swedish
  sv: {
    welcome: 'Välkommen', dashboard: 'Instrumentpanel', investments: 'Investeringar', deposit: 'Insättning', withdraw: 'Uttag',
    balance: 'Saldo', pending: 'Väntande', approved: 'Godkänd', home: 'Hem', profile: 'Profil', settings: 'Inställningar',
    logout: 'Logga ut', login: 'Logga in', register: 'Registrera', investNow: 'Investera Nu'
  },
  // Norwegian
  no: {
    welcome: 'Velkommen', dashboard: 'Kontrollpanel', investments: 'Investeringer', deposit: 'Innskudd', withdraw: 'Uttak',
    balance: 'Saldo', pending: 'Venter', approved: 'Godkjent', home: 'Hjem', profile: 'Profil', settings: 'Innstillinger',
    logout: 'Logg ut', login: 'Logg inn', register: 'Registrer', investNow: 'Invester Nå'
  },
  // Danish
  da: {
    welcome: 'Velkommen', dashboard: 'Kontrolpanel', investments: 'Investeringer', deposit: 'Indbetaling', withdraw: 'Udbetaling',
    balance: 'Saldo', pending: 'Afventer', approved: 'Godkendt', home: 'Hjem', profile: 'Profil', settings: 'Indstillinger',
    logout: 'Log ud', login: 'Log ind', register: 'Registrer', investNow: 'Invester Nu'
  },
  // Finnish
  fi: {
    welcome: 'Tervetuloa', dashboard: 'Hallintapaneeli', investments: 'Sijoitukset', deposit: 'Talletus', withdraw: 'Nosto',
    balance: 'Saldo', pending: 'Odottaa', approved: 'Hyväksytty', home: 'Etusivu', profile: 'Profiili', settings: 'Asetukset',
    logout: 'Kirjaudu ulos', login: 'Kirjaudu', register: 'Rekisteröidy', investNow: 'Sijoita Nyt'
  },
  // Hebrew
  he: {
    welcome: 'ברוך הבא', dashboard: 'לוח בקרה', investments: 'השקעות', deposit: 'הפקדה', withdraw: 'משיכה',
    balance: 'יתרה', pending: 'ממתין', approved: 'אושר', home: 'בית', profile: 'פרופיל', settings: 'הגדרות',
    logout: 'התנתק', login: 'התחבר', register: 'הרשמה', investNow: 'השקע עכשיו'
  },
  // Ukrainian
  uk: {
    welcome: 'Ласкаво просимо', dashboard: 'Панель', investments: 'Інвестиції', deposit: 'Депозит', withdraw: 'Виведення',
    balance: 'Баланс', pending: 'Очікує', approved: 'Схвалено', home: 'Головна', profile: 'Профіль', settings: 'Налаштування',
    logout: 'Вийти', login: 'Увійти', register: 'Реєстрація', investNow: 'Інвестувати зараз'
  },
  // Romanian
  ro: {
    welcome: 'Bun venit', dashboard: 'Panou', investments: 'Investiții', deposit: 'Depunere', withdraw: 'Retragere',
    balance: 'Sold', pending: 'În așteptare', approved: 'Aprobat', home: 'Acasă', profile: 'Profil', settings: 'Setări',
    logout: 'Deconectare', login: 'Conectare', register: 'Înregistrare', investNow: 'Investește Acum'
  },
  // Hungarian
  hu: {
    welcome: 'Üdvözöljük', dashboard: 'Irányítópult', investments: 'Befektetések', deposit: 'Befizetés', withdraw: 'Kifizetés',
    balance: 'Egyenleg', pending: 'Függőben', approved: 'Jóváhagyott', home: 'Főoldal', profile: 'Profil', settings: 'Beállítások',
    logout: 'Kijelentkezés', login: 'Bejelentkezés', register: 'Regisztráció', investNow: 'Befektetés Most'
  },
  // Bengali
  bn: {
    welcome: 'স্বাগতম', dashboard: 'ড্যাশবোর্ড', investments: 'বিনিয়োগ', deposit: 'জমা', withdraw: 'উত্তোলন',
    balance: 'ব্যালেন্স', pending: 'মুলতুবি', approved: 'অনুমোদিত', home: 'হোম', profile: 'প্রোফাইল', settings: 'সেটিংস',
    logout: 'লগআউট', login: 'লগইন', register: 'রেজিস্টার', investNow: 'এখনই বিনিয়োগ করুন'
  },
  // Swahili
  sw: {
    welcome: 'Karibu', dashboard: 'Dashibodi', investments: 'Uwekezaji', deposit: 'Amana', withdraw: 'Kutoa',
    balance: 'Salio', pending: 'Inasubiri', approved: 'Imeidhinishwa', home: 'Nyumbani', profile: 'Wasifu', settings: 'Mipangilio',
    logout: 'Ondoka', login: 'Ingia', register: 'Jisajili', investNow: 'Wekeza Sasa'
  },
  // Yoruba (Nigerian)
  yo: {
    welcome: 'Ẹ káàbọ̀', dashboard: 'Pánẹ́lì', investments: 'Ìdókòwò', deposit: 'Ìfipamọ́', withdraw: 'Ìmúkúrò',
    balance: 'Ìyókù', pending: 'Ń dúró', approved: 'Ti fọwọ́sí', home: 'Ilé', profile: 'Àkọsílẹ̀', settings: 'Ètò',
    investNow: 'Ṣe ìdókòwò báyìí'
  },
  // Hausa (Nigerian)
  ha: {
    welcome: 'Barka da zuwa', dashboard: 'Dashboard', investments: 'Saka hannun jari', deposit: 'Ajiya', withdraw: 'Cire kuɗi',
    balance: 'Ragowar kuɗi', pending: 'Ana jira', approved: 'An amince', home: 'Gida', profile: 'Bayani', settings: 'Saiti',
    investNow: 'Saka hannun jari yanzu'
  },
  // Igbo (Nigerian)
  ig: {
    welcome: 'Nnọọ', dashboard: 'Dashboard', investments: 'Ntinye ego', deposit: 'Tinyere ego', withdraw: 'Wepu ego',
    balance: 'Ego fọdụrụ', pending: 'Na-echere', approved: 'Kwadoro', home: 'Ụlọ', profile: 'Profaịlụ', settings: 'Ntọala',
    investNow: 'Tinye ego ugbu a'
  }
};

// Language names for dropdown
const languageNames = {
  en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch', pt: 'Português',
  it: 'Italiano', nl: 'Nederlands', ru: 'Русский', zh: '中文', ja: '日本語',
  ko: '한국어', ar: 'العربية', hi: 'हिन्दी', tr: 'Türkçe', pl: 'Polski',
  vi: 'Tiếng Việt', th: 'ไทย', id: 'Bahasa Indonesia', ms: 'Bahasa Melayu',
  tl: 'Filipino', el: 'Ελληνικά', cs: 'Čeština', sv: 'Svenska', no: 'Norsk',
  da: 'Dansk', fi: 'Suomi', he: 'עברית', uk: 'Українська', ro: 'Română',
  hu: 'Magyar', bn: 'বাংলা', sw: 'Kiswahili', yo: 'Yorùbá', ha: 'Hausa', ig: 'Igbo'
};

// Auto-detect user's language from browser
const detectUserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  return translations[langCode] ? langCode : 'en';
};

// Get current language from localStorage or detect
const getCurrentLanguage = () => {
  return localStorage.getItem('saxovault_language') || detectUserLanguage();
};

// Translation helper function
const t = (key) => {
  const lang = getCurrentLanguage();
  return translations[lang]?.[key] || translations.en[key] || key;
};

// Language Selector Component
const LanguageSelector = ({ onClose }) => {
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  const handleSelectLanguage = (langCode) => {
    localStorage.setItem('saxovault_language', langCode);
    setCurrentLang(langCode);
    window.location.reload(); // Refresh to apply new language
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl" style={{ color: theme.navy }}>
            <Languages className="w-5 h-5 inline mr-2" />
            Select Language
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto">
          {Object.entries(languageNames).map(([code, name]) => (
            <button key={code} onClick={() => handleSelectLanguage(code)}
              className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${
                currentLang === code 
                  ? 'text-white shadow-lg' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              style={currentLang === code ? { background: theme.navy } : {}}>
              {name}
              {currentLang === code && <Check className="w-4 h-4 inline ml-2" />}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Loading Skeleton Component
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// SSL Badge Component
const SSLBadge = () => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
    <ShieldCheck className="w-4 h-4 text-green-600" />
    <span className="text-xs font-medium text-green-700">SSL Secured</span>
  </div>
);

// Trust Badges Component
const TrustBadges = () => (
  <div className="flex flex-wrap items-center justify-center gap-3 py-4">
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg">
      <ShieldCheck className="w-4 h-4 text-green-600" />
      <span className="text-xs text-gray-600">256-bit SSL</span>
    </div>
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg">
      <Lock className="w-4 h-4 text-blue-600" />
      <span className="text-xs text-gray-600">Bank-Level Security</span>
    </div>
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg">
      <Award className="w-4 h-4 text-yellow-600" />
      <span className="text-xs text-gray-600">Licensed</span>
    </div>
  </div>
);

// ============ ONBOARDING TOUR ============
function OnboardingTour({ onComplete }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to SaxoVault! 🎉',
      description: 'Your journey to smart investing starts here. Let us show you around.',
      icon: '👋'
    },
    {
      title: 'Explore Investments',
      description: 'Browse our curated investment opportunities across real estate, crypto, stocks, and more.',
      icon: '📊'
    },
    {
      title: 'Easy Deposits',
      description: 'Fund your account instantly using Bitcoin, Ethereum, or USDT cryptocurrency.',
      icon: '💰'
    },
    {
      title: 'Track Your Portfolio',
      description: 'Monitor your investments, returns, and transaction history from your dashboard.',
      icon: '📈'
    },
    {
      title: 'Secure & Trusted',
      description: 'Your investments are protected with bank-level security and 24/7 support.',
      icon: '🔒'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Mark onboarding complete for this specific user
      const currentUser = JSON.parse(localStorage.getItem('saxovault_current_user') || '{}');
      if (currentUser.uid) {
        localStorage.setItem(`saxovault_onboarding_${currentUser.uid}`, 'true');
      }
      localStorage.setItem('saxovault_onboarding_complete', 'true');
      onComplete();
    }
  };

  const handleSkip = () => {
    // Mark onboarding complete for this specific user
    const currentUser = JSON.parse(localStorage.getItem('saxovault_current_user') || '{}');
    if (currentUser.uid) {
      localStorage.setItem(`saxovault_onboarding_${currentUser.uid}`, 'true');
    }
    localStorage.setItem('saxovault_onboarding_complete', 'true');
    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
        
        {/* Progress */}
        <div className="flex gap-1 mb-6 justify-center">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i <= step ? 'w-8' : 'w-4'}`}
              style={{ background: i <= step ? theme.gold : '#e5e7eb' }} />
          ))}
        </div>

        {/* Icon */}
        <div className="text-5xl mb-4">{steps[step].icon}</div>

        {/* Content */}
        <h2 className="font-serif text-xl mb-2" style={{ color: theme.navy }}>{steps[step].title}</h2>
        <p className="text-gray-500 text-sm mb-6">{steps[step].description}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button onClick={handleSkip} className="flex-1 py-3 rounded-xl text-gray-500 text-sm hover:bg-gray-100">
            Skip
          </button>
          <motion.button onClick={handleNext} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 rounded-xl text-white text-sm font-medium"
            style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
            {step === steps.length - 1 ? "Let's Go!" : 'Next'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
  // ========== TEST PLAN (Special - $500 fixed, One per user, 1% daily for 5 days) ==========
  { id: 100, name: 'Test Plan', category: 'Cryptocurrency', type: 'crypto', min: 500, max: 500, returns: '5%', term: '5 days', desc: 'Starter test plan to experience our platform. Earn 1% daily profit for 5 days. Limited to one investment per account. Perfect for first-time investors to test our system.', progress: 99, goal: 100000, img: images.crypto1, features: ['1% Daily Returns', '5-Day Duration', 'One Per Account', 'Quick Payout'], investors: 12847, rating: 5.0, status: 'Active', payoutSchedule: 'End of Term', dailyRate: 1, totalDays: 5, isTestPlan: true, onePerUser: true },
  
  // ========== REAL ESTATE ==========
  { id: 1, name: 'Greenwich Towers', category: 'Real Estate', type: 'real-estate', min: 5000, returns: '12-15%', term: '12 months', desc: 'Premium commercial development in Manhattan financial district with returns generated through pre-sales and project monetization.', progress: 78, goal: 5000000, img: images.realEstate1, features: ['Monthly Income', 'Pre-Sale Revenue', 'Tax Benefits', 'Quarterly Reports'], investors: 234, rating: 4.9, status: 'Active', dailyRate: 0.04, totalDays: 365 },
  { id: 2, name: 'Liberty Suites Hotel', category: 'Real Estate', type: 'real-estate', min: 2500, returns: '8-10%', term: '6 months', desc: 'Income-generating boutique hotel chain. Acquire a stake in operational assets and receive monthly net operating income distributions.', progress: 92, goal: 3500000, img: images.realEstate2, features: ['Monthly Income', 'Operational Asset', 'NOI Distribution', 'Hotel Revenue'], investors: 189, rating: 4.8, status: 'Active', dailyRate: 0.05, totalDays: 180 },
  { id: 3, name: 'Urban Renaissance Fund', category: 'Real Estate', type: 'real-estate', min: 1000, returns: '15-18%', term: '12 months', desc: 'Crowdfunding model to acquire, enhance, and sell premium properties with profits distributed upon sale.', progress: 65, goal: 8000000, img: images.realEstate3, features: ['Value-Add Strategy', 'Profit on Exit', 'Pooled Capital', 'Monthly Updates'], investors: 456, rating: 4.7, status: 'Funding', dailyRate: 0.045, totalDays: 365 },
  { id: 4, name: 'Marina Bay Residences', category: 'Real Estate', type: 'real-estate', min: 10000, returns: '14-18%', term: '18 months', desc: 'Exclusive waterfront luxury development with private marina access and capital appreciation potential.', progress: 45, goal: 12000000, img: images.realEstate4, features: ['Waterfront Premium', 'Capital Growth', 'Luxury Market', 'Quarterly Payouts'], investors: 78, rating: 4.6, status: 'Funding', dailyRate: 0.03, totalDays: 540 },
  
  // ========== CRYPTOCURRENCY (Tiered - Higher investment = Higher returns) ==========
  // Tier 1: $2,500 - Entry Crypto
  { id: 5, name: 'Crypto Foundation', category: 'Cryptocurrency', type: 'crypto', min: 2500, returns: '12-15%', term: '30 days', desc: 'Entry-level crypto fund focusing on Bitcoin and Ethereum. Professional management with weekly profit distributions. Perfect starting point for crypto investing.', progress: 95, goal: 2000000, img: images.crypto1, features: ['Weekly Payouts', 'BTC & ETH Focus', 'Low Risk', 'Capital Protected'], investors: 3247, rating: 4.8, status: 'Active', payoutSchedule: 'Weekly', dailyRate: 0.45, totalDays: 30 },
  
  // Tier 2: $5,000 - Intermediate
  { id: 6, name: 'DeFi Yield Pro', category: 'Cryptocurrency', type: 'crypto', min: 5000, returns: '20-28%', term: '45 days', desc: 'Advanced DeFi staking across premium protocols. Higher capital unlocks access to exclusive yield farming pools with enhanced returns and bi-weekly distributions.', progress: 92, goal: 3000000, img: images.crypto2, features: ['Bi-Weekly Payouts', 'Multi-Protocol', 'Auto-Compound', 'Priority Support'], investors: 2156, rating: 4.8, status: 'Active', payoutSchedule: 'Bi-Weekly', dailyRate: 0.55, totalDays: 45 },
  
  // Tier 3: $10,000 - Advanced
  { id: 7, name: 'Altcoin Alpha Fund', category: 'Cryptocurrency', type: 'crypto', min: 10000, returns: '30-42%', term: '60 days', desc: 'Premium altcoin portfolio with AI-powered selection. Access emerging tokens before major listings. Weekly payouts with institutional-grade risk management.', progress: 88, goal: 5000000, img: images.crypto3, features: ['Weekly Payouts', 'AI Selection', 'Early Access', 'VIP Support'], investors: 1876, rating: 4.7, status: 'Active', payoutSchedule: 'Weekly', dailyRate: 0.6, totalDays: 60 },
  
  // Tier 4: $25,000 - Professional
  { id: 17, name: 'Whale Insider Fund', category: 'Cryptocurrency', type: 'crypto', min: 25000, returns: '45-60%', term: '90 days', desc: 'Follow institutional whale movements with our proprietary algorithm. Track large wallet activities and capitalize on major market moves before they happen.', progress: 85, goal: 10000000, img: images.crypto1, features: ['Weekly Payouts', 'Whale Tracking', 'Real-Time Alerts', 'Dedicated Manager'], investors: 567, rating: 4.9, status: 'Active', payoutSchedule: 'Weekly', dailyRate: 0.6, totalDays: 90 },
  
  // Tier 5: $50,000 - Elite
  { id: 18, name: 'Crypto Elite Vault', category: 'Cryptocurrency', type: 'crypto', min: 50000, returns: '60-85%', term: '120 days', desc: 'Our flagship crypto fund for serious investors. Maximum returns through exclusive arbitrage opportunities, OTC deals, and pre-ICO access. Personal account manager included.', progress: 75, goal: 25000000, img: images.crypto2, features: ['Weekly Payouts', 'Arbitrage Access', 'Pre-ICO Deals', 'Personal Manager'], investors: 234, rating: 5.0, status: 'Active', payoutSchedule: 'Weekly', dailyRate: 0.65, totalDays: 120 },
  
  // Tier 6: $100,000 - Institutional
  { id: 19, name: 'Institutional Crypto Fund', category: 'Cryptocurrency', type: 'crypto', min: 100000, returns: '80-120%', term: '180 days', desc: 'Institutional-grade crypto investment with maximum security and returns. Direct access to our top traders, custom strategies, and guaranteed principal protection.', progress: 60, goal: 50000000, img: images.crypto3, features: ['Daily Payouts', 'Principal Protected', 'Custom Strategy', 'White Glove Service'], investors: 89, rating: 5.0, status: 'Active', payoutSchedule: 'Daily', dailyRate: 0.55, totalDays: 180 },
  
  // ========== STOCKS & BONDS ==========
  { id: 8, name: 'Dividend Aristocrats', category: 'Stocks & Bonds', type: 'stocks', min: 1000, returns: '8-12%', term: '6 months', desc: 'Portfolio of dividend-paying stocks with 25+ years of consecutive dividend increases. Reliable quarterly income from blue-chip companies.', img: images.stocks1, features: ['Dividend Income', '25+ Year Track', 'Quarterly Payouts', 'Blue Chip Stocks'], investors: 1892, rating: 4.8, status: 'Open', dailyRate: 0.055, totalDays: 180 },
  { id: 9, name: 'Tech Growth ETF', category: 'Stocks & Bonds', type: 'stocks', min: 500, returns: '15-25%', term: '6 months', desc: 'Thematic ETF portfolio focused on technology sector leaders including AI, cloud computing, and semiconductors.', img: images.stocks2, features: ['Tech Focused', 'ETF Structure', 'AI & Cloud', 'Monthly Updates'], investors: 2234, rating: 4.7, status: 'Open', dailyRate: 0.11, totalDays: 180 },
  { id: 10, name: 'Corporate Bond Fund', category: 'Stocks & Bonds', type: 'stocks', min: 2000, returns: '6-8%', term: '12 months', desc: 'Investment-grade corporate bond portfolio with staggered maturities for predictable income and capital preservation.', img: images.stocks3, features: ['Investment Grade', 'Laddered Maturities', 'Monthly Income', 'Capital Safe'], investors: 756, rating: 4.9, status: 'Open', dailyRate: 0.02, totalDays: 365 },
  
  // ========== PRECIOUS METALS ==========
  { id: 11, name: 'Gold Trading Strategy', category: 'Precious Metals', type: 'metals', min: 1000, returns: '10-15%', term: '3 months', desc: 'Algorithm-driven gold trading strategy buying at optimized lows and selling at strategic highs. Monthly profit distributions.', progress: 89, goal: 10000000, img: images.gold1, features: ['Algorithmic Trading', 'No Physical Delivery', 'Monthly Payouts', 'Professional Managed'], investors: 1678, rating: 4.7, status: 'Active', dailyRate: 0.14, totalDays: 90 },
  { id: 12, name: 'Silver Industrial Fund', category: 'Precious Metals', type: 'metals', min: 500, returns: '12-18%', term: '6 months', desc: 'Silver investment benefiting from industrial demand in solar panels and EV industries. Bi-monthly profit distributions.', progress: 65, goal: 3000000, img: images.gold2, features: ['Industrial Demand', 'Solar & EV Growth', 'Bi-Monthly Payouts', 'High Growth'], investors: 945, rating: 4.6, status: 'Funding', dailyRate: 0.08, totalDays: 180 },
  { id: 13, name: 'Platinum Portfolio', category: 'Precious Metals', type: 'metals', min: 2500, returns: '15-22%', term: '12 months', desc: 'Rare metals portfolio with automotive catalyst and hydrogen economy demand drivers. Quarterly distributions.', progress: 42, goal: 5000000, img: images.gold3, features: ['Rare Metals', 'Auto Industry', 'Hydrogen Economy', 'Quarterly Payouts'], investors: 423, rating: 4.5, status: 'Funding', dailyRate: 0.05, totalDays: 365 },
  
  // ========== INVESTMENT PLANS ==========
  { id: 14, name: 'Starter Growth Plan', category: 'Investment Plans', type: 'plans', min: 500, returns: '10-12%', term: '3 months', desc: 'Perfect entry-level plan combining stable assets for new investors. Low risk with consistent monthly returns and full capital protection.', img: images.plans1, features: ['Capital Protected', 'Monthly Payouts', 'Low Risk', 'Beginner Friendly'], investors: 4345, rating: 4.9, status: 'Open', dailyRate: 0.12, totalDays: 90 },
  { id: 15, name: 'Balanced Wealth Builder', category: 'Investment Plans', type: 'plans', min: 2500, returns: '15-20%', term: '6 months', desc: 'Diversified portfolio across real estate, stocks, and crypto for steady growth. Bi-weekly distributions with compound option.', img: images.plans2, features: ['Diversified Assets', 'Bi-Weekly Payouts', 'Compound Option', 'Flexible'], investors: 2567, rating: 4.8, status: 'Open', dailyRate: 0.1, totalDays: 180 },
  { id: 16, name: 'Premium Growth Fund', category: 'Investment Plans', type: 'plans', min: 5000, returns: '25-35%', term: '12 months', desc: 'High-growth portfolio targeting maximum returns through tech stocks, crypto, and emerging markets. Weekly profit distributions.', img: images.plans3, features: ['High Returns', 'Weekly Payouts', 'Active Management', 'VIP Support'], investors: 1287, rating: 4.7, status: 'Open', dailyRate: 0.08, totalDays: 365 }
];

const categories = [
  { id: 'all', name: 'All', icon: Globe, count: investments.length },
  { id: 'real-estate', name: 'Real Estate', icon: Building2, count: 4 },
  { id: 'crypto', name: 'Crypto', icon: Bitcoin, count: 7 },
  { id: 'stocks', name: 'Stocks', icon: BarChart3, count: 3 },
  { id: 'metals', name: 'Metals', icon: Gem, count: 3 },
  { id: 'plans', name: 'Plans', icon: Briefcase, count: 3 }
];

// ============ AUTH PAGE WITH REAL FIREBASE AUTHENTICATION ============
// ============ GOOGLE SIGN-IN BUTTON ============
function GoogleSignInButton({ onLogin, setMessage, setLoading, loading }) {
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        // Send admin notification for new Google users
        if (result.isNewUser) {
          EmailService.sendNewUserNotification(
            result.userData.email, 
            result.userData.name, 
            'Google'
          ).catch(console.error);
        }
        // Successfully signed in with Google
        onLogin(result.userData);
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Google sign-in failed. Please try again.' });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading || googleLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-3 border-2 border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-70 transition-all"
    >
      {googleLoading ? (
        <RefreshCw className="w-5 h-5 animate-spin text-gray-600" />
      ) : (
        <>
          {/* Google Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span style={{ color: theme.navy }}>Continue with Google</span>
        </>
      )}
    </motion.button>
  );
}

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', referralCode: '', country: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Countries with phone codes (alphabetical - single dropdown)
  const countries = [
    { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
    { name: 'Albania', code: '+355', flag: '🇦🇱' },
    { name: 'Algeria', code: '+213', flag: '🇩🇿' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
    { name: 'Austria', code: '+43', flag: '🇦🇹' },
    { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
    { name: 'Belgium', code: '+32', flag: '🇧🇪' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'Chile', code: '+56', flag: '🇨🇱' },
    { name: 'China', code: '+86', flag: '🇨🇳' },
    { name: 'Colombia', code: '+57', flag: '🇨🇴' },
    { name: 'Czech Republic', code: '+420', flag: '🇨🇿' },
    { name: 'Denmark', code: '+45', flag: '🇩🇰' },
    { name: 'Egypt', code: '+20', flag: '🇪🇬' },
    { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
    { name: 'Finland', code: '+358', flag: '🇫🇮' },
    { name: 'France', code: '+33', flag: '🇫🇷' },
    { name: 'Germany', code: '+49', flag: '🇩🇪' },
    { name: 'Ghana', code: '+233', flag: '🇬🇭' },
    { name: 'Greece', code: '+30', flag: '🇬🇷' },
    { name: 'Hong Kong', code: '+852', flag: '🇭🇰' },
    { name: 'Hungary', code: '+36', flag: '🇭🇺' },
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
    { name: 'Ireland', code: '+353', flag: '🇮🇪' },
    { name: 'Israel', code: '+972', flag: '🇮🇱' },
    { name: 'Italy', code: '+39', flag: '🇮🇹' },
    { name: 'Japan', code: '+81', flag: '🇯🇵' },
    { name: 'Kenya', code: '+254', flag: '🇰🇪' },
    { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
    { name: 'Mexico', code: '+52', flag: '🇲🇽' },
    { name: 'Morocco', code: '+212', flag: '🇲🇦' },
    { name: 'Nepal', code: '+977', flag: '🇳🇵' },
    { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
    { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
    { name: 'Norway', code: '+47', flag: '🇳🇴' },
    { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
    { name: 'Peru', code: '+51', flag: '🇵🇪' },
    { name: 'Philippines', code: '+63', flag: '🇵🇭' },
    { name: 'Poland', code: '+48', flag: '🇵🇱' },
    { name: 'Portugal', code: '+351', flag: '🇵🇹' },
    { name: 'Romania', code: '+40', flag: '🇷🇴' },
    { name: 'Russia', code: '+7', flag: '🇷🇺' },
    { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
    { name: 'Singapore', code: '+65', flag: '🇸🇬' },
    { name: 'South Africa', code: '+27', flag: '🇿🇦' },
    { name: 'South Korea', code: '+82', flag: '🇰🇷' },
    { name: 'Spain', code: '+34', flag: '🇪🇸' },
    { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
    { name: 'Sweden', code: '+46', flag: '🇸🇪' },
    { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
    { name: 'Taiwan', code: '+886', flag: '🇹🇼' },
    { name: 'Tanzania', code: '+255', flag: '🇹🇿' },
    { name: 'Thailand', code: '+66', flag: '🇹🇭' },
    { name: 'Turkey', code: '+90', flag: '🇹🇷' },
    { name: 'UAE', code: '+971', flag: '🇦🇪' },
    { name: 'Uganda', code: '+256', flag: '🇺🇬' },
    { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
    { name: 'Zimbabwe', code: '+263', flag: '🇿🇼' }
  ];
  
  // Get selected country object
  const selectedCountry = countries.find(c => c.name === form.country) || null;
  
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
        phone: selectedCountry ? `${selectedCountry.code} ${form.phone}` : form.phone,
        country: form.country,
        referralCode: form.referralCode
      });

      if (result.success) {
        setStep(2); // Show verification message
        setMessage({ type: 'success', text: result.message });
        // Notify admin of new user registration
        EmailService.sendNewUserNotification(form.email, form.name, 'Email').catch(console.error);
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
                  {/* Country Selection (sets phone code automatically) */}
                  <motion.div key="country" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select 
                        value={form.country} 
                        onChange={(e) => setForm({...form, country: e.target.value})}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none appearance-none bg-white ${errors.country ? 'border-red-500' : 'border-gray-200'}`}>
                        <option value="">Select your country</option>
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>{c.flag} {c.name} ({c.code})</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </motion.div>

                  {/* Phone Number (country code auto-filled) */}
                  <motion.div key="phone" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <div className="flex gap-2">
                      {/* Country Code Display (read-only, auto-set from country) */}
                      <div className="relative w-24 flex-shrink-0">
                        <div 
                          className="w-full px-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm font-medium flex items-center justify-center gap-1"
                          style={{ color: theme.navy }}>
                          {selectedCountry ? (
                            <>{selectedCountry.flag} {selectedCountry.code}</>
                          ) : (
                            <span className="text-gray-400">Code</span>
                          )}
                        </div>
                      </div>
                      {/* Phone Number Input */}
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="tel" 
                          value={form.phone} 
                          onChange={(e) => setForm({...form, phone: e.target.value.replace(/\D/g, '')})}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none"
                          placeholder="Phone number" 
                          maxLength="15" 
                        />
                      </div>
                    </div>
                    {selectedCountry && form.phone && (
                      <p className="text-xs text-gray-500 mt-1">Full number: {selectedCountry.code} {form.phone}</p>
                    )}
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

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Sign-In Button */}
          <GoogleSignInButton onLogin={onLogin} setMessage={setMessage} setLoading={setLoading} loading={loading} />

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
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Get investments from localStorage (admin controlled) or fallback to defaults
  const adminInvestments = JSON.parse(localStorage.getItem('saxovault_investments') || 'null') || investments;

  const filtered = adminInvestments.filter(inv =>
    (category === 'all' || inv.type === category) &&
    inv.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="font-serif text-2xl lg:text-3xl mb-1" style={{ color: theme.navy }}>Investment Opportunities</h1>
          <p className="text-gray-500 text-sm">Explore our curated selection across multiple asset classes.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search investments..." />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
                    category === cat.id ? 'text-white shadow' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  style={category === cat.id ? { background: theme.navy } : {}}>
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} investments found</p>

        {/* Investment Grid - Clean Elegant Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filtered.map((inv, i) => (
            <motion.div key={inv.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              onClick={() => onSelectInvestment(inv)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group">
              {/* Image - Taller for better visibility */}
              <div className="relative h-44 lg:h-48">
                <img src={inv.img || inv.customImg} alt={inv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                    style={{ background: inv.status === 'Active' ? 'rgba(16,185,129,0.9)' : inv.status === 'Open' ? 'rgba(10,22,40,0.9)' : 'rgba(212,175,55,0.9)' }}>
                    {inv.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">{inv.category}</p>
                  <h3 className="font-serif text-white text-xl leading-tight">{inv.name}</h3>
                </div>
              </div>

              {/* Content - Cleaner, Less Bold */}
              <div className="p-5">
                {/* Key Stats Row - Softer colors */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="text-center flex-1">
                    <p className="text-base font-semibold" style={{ color: theme.green }}>{inv.returns}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Returns</p>
                  </div>
                  <div className="w-px h-10 bg-gray-100" />
                  <div className="text-center flex-1">
                    <p className="text-base font-semibold" style={{ color: theme.navy }}>${(inv.min / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-400 mt-0.5">Min</p>
                  </div>
                  <div className="w-px h-10 bg-gray-100" />
                  <div className="text-center flex-1">
                    <p className="text-base font-semibold" style={{ color: theme.gold }}>{inv.term?.split(' ')[0] || '12'}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Months</p>
                  </div>
                </div>

                {/* Description Preview */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {inv.desc || 'Premium investment opportunity with professional management and strong projected returns.'}
                </p>

                {/* Progress Bar */}
                {inv.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-600 font-medium">{inv.progress}% funded</span>
                      <span className="text-gray-400">${((inv.progress / 100) * (inv.goal || 1000000) / 1000).toFixed(0)}K raised</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${inv.progress}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${theme.green}, ${theme.gold})` }} />
                    </div>
                  </div>
                )}

                {/* View Button - Softer */}
                <button className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all hover:shadow-lg group-hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
                  View Details
                  <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No investments found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ INVESTMENT DETAIL MODAL ============
function InvestmentModal({ investment, onClose, onInvest }) {
  if (!investment) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto">
      
      {/* Header with back button */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <span className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ background: investment.status === 'Active' ? theme.green : theme.gold }}>
            {investment.status}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="relative h-48 lg:h-64 rounded-2xl overflow-hidden mb-6">
          <img src={investment.img || investment.customImg} alt={investment.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="px-2 py-1 rounded bg-white/20 backdrop-blur text-white text-xs mb-2 inline-block">
              {investment.category}
            </span>
            <h1 className="font-serif text-2xl lg:text-3xl text-white">{investment.name}</h1>
          </div>
        </div>

        {/* Key Stats - Horizontal Row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl lg:text-2xl font-bold" style={{ color: theme.green }}>{investment.returns}</p>
            <p className="text-xs text-gray-500">Returns</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl lg:text-2xl font-bold" style={{ color: theme.navy }}>
              {investment.min >= 1000 ? `$${(investment.min / 1000)}K` : `$${investment.min}`}
            </p>
            <p className="text-xs text-gray-500">Min</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl lg:text-2xl font-bold" style={{ color: theme.gold }}>{investment.term?.split(' ')[0] || '12'}</p>
            <p className="text-xs text-gray-500">{investment.term?.includes('month') ? 'Months' : 'Term'}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl lg:text-2xl font-bold text-gray-700">{investment.investors || '50+'}</p>
            <p className="text-xs text-gray-500">Investors</p>
          </div>
        </div>

        {/* Progress Bar (if funding) */}
        {investment.progress !== undefined && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium" style={{ color: theme.navy }}>Funding Progress</span>
              <span className="font-bold">{investment.progress}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full transition-all" 
                style={{ width: `${investment.progress}%`, background: `linear-gradient(90deg, ${theme.green}, ${theme.gold})` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>${((investment.progress / 100) * (investment.goal || 1000000)).toLocaleString()} raised</span>
              <span>Goal: ${(investment.goal || 1000000).toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2" style={{ color: theme.navy }}>About This Investment</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {investment.desc || 'A premium investment opportunity with strong projected returns and professional management. This carefully vetted opportunity offers investors exposure to a high-growth sector with risk-managed strategies.'}
          </p>
        </div>

        {/* Features */}
        {investment.features && investment.features.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-3" style={{ color: theme.navy }}>Key Features</h2>
            <div className="grid grid-cols-2 gap-2">
              {investment.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mb-6">
          <TrustBadges />
        </div>

        {/* CTA Button - Fixed at bottom on mobile */}
        <div className="sticky bottom-0 bg-white pt-4 pb-6 -mx-4 px-4 border-t border-gray-100 lg:relative lg:border-0 lg:pt-0 lg:pb-0 lg:mx-0 lg:px-0">
          <motion.button onClick={onInvest} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl text-white font-semibold text-lg shadow-xl"
            style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
            Invest Now - Min ${investment.min?.toLocaleString()}
          </motion.button>
          <p className="text-center text-xs text-gray-400 mt-2">Secure • Instant Confirmation • 24/7 Support</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============ INVEST FLOW MODAL WITH CRYPTO PAYMENT ============
function InvestFlowModal({ investment, onClose, balance }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(investment.min);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [countdown, setCountdown] = useState(1800); // 30 minutes
  const [copied, setCopied] = useState(false);
  const [hasTestPlan, setHasTestPlan] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('saxovault_current_user') || '{}');
  
  // Check if user already has Test Plan
  useEffect(() => {
    if (investment.isTestPlan && investment.onePerUser) {
      const userInvestments = JSON.parse(localStorage.getItem(`investments_${currentUser.uid}`) || '[]');
      const transactions = Storage.getTransactions().filter(t => t.userId === currentUser.uid);
      const hasExisting = userInvestments.some(inv => inv.investmentId === 100 || inv.investmentName === 'Test Plan') ||
                          transactions.some(t => t.investmentId === 100 || t.investmentName === 'Test Plan');
      setHasTestPlan(hasExisting);
    }
  }, [investment, currentUser.uid]);

  const settings = JSON.parse(localStorage.getItem('saxovault_settings') || '{}');
  const walletAddresses = settings.wallets || {
    BTC: 'bc1qzmgg6hw0fttfpczh2whp8f44k497d6pucghk58',
    ETH: '0x83057882eC7B7EE0cBe63C2fE2b8957e7ab69655',
    USDT: 'TLGH9FucAuPNUoQw2XUFEDtCg4FFdJ2jKG'
  };

  const cryptoOptions = [
    { id: 'BTC', name: 'Bitcoin', icon: '₿', color: '#f7931a' },
    { id: 'ETH', name: 'Ethereum', icon: 'Ξ', color: '#627eea' },
    { id: 'USDT', name: 'USDT (TRC-20)', icon: '₮', color: '#26a17b' }
  ];

  // Calculate expected return based on dailyRate and totalDays
  const getReturnRate = () => {
    if (investment.dailyRate && investment.totalDays) {
      // Calculate total return from daily rate
      return (investment.dailyRate / 100) * investment.totalDays;
    }
    // Fallback to parsing returns string
    const returnsStr = investment.returns || '12%';
    const match = returnsStr.match(/(\d+)/);
    return match ? parseFloat(match[1]) / 100 : 0.12;
  };
  
  const returnRate = getReturnRate();
  const dailyProfit = investment.dailyRate ? (amount * investment.dailyRate / 100) : (amount * returnRate / (investment.totalDays || 30));
  const expectedReturn = amount * returnRate;
  const totalReturn = amount + expectedReturn;

  // Countdown timer
  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setInterval(() => setCountdown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWallet = () => {
    const walletUrl = selectedCrypto === 'BTC' 
      ? `bitcoin:${walletAddresses.BTC}?amount=${(amount / 40000).toFixed(8)}`
      : selectedCrypto === 'ETH'
        ? `ethereum:${walletAddresses.ETH}?value=${(amount / 2000).toFixed(8)}`
        : null;
    if (walletUrl) window.location.href = walletUrl;
  };

  const handleConfirmPayment = async () => {
    const currentUser = JSON.parse(localStorage.getItem('saxovault_current_user') || '{}');
    
    // Parse term to get days
    const termMatch = investment.term?.match(/(\d+)/);
    let termDays = investment.totalDays || 30;
    if (termMatch) {
      const num = parseInt(termMatch[1]);
      if (investment.term.includes('month')) {
        termDays = num * 30;
      } else if (investment.term.includes('day')) {
        termDays = num;
      } else if (investment.term.includes('year')) {
        termDays = num * 365;
      }
    }
    
    // Maturity date will be calculated from approval date (set when admin approves)
    const maturityDate = new Date();
    maturityDate.setDate(maturityDate.getDate() + termDays);
    
    // Create investment transaction with all details
    const investmentTransaction = {
      type: 'investment',
      investmentId: investment.id,
      investmentName: investment.name,
      category: investment.category,
      amount: parseFloat(amount),
      crypto: selectedCrypto,
      walletAddress: walletAddresses[selectedCrypto],
      returnRate: (returnRate * 100).toFixed(1) + '%',
      dailyRate: investment.dailyRate || (returnRate * 100 / termDays),
      dailyProfit: parseFloat(dailyProfit.toFixed(2)),
      expectedReturn: parseFloat(expectedReturn.toFixed(2)),
      totalReturn: parseFloat(totalReturn.toFixed(2)),
      term: investment.term,
      totalDays: termDays,
      maturityDate: maturityDate.toISOString(),
      userEmail: currentUser.email || 'unknown',
      userId: currentUser.uid || 'unknown',
      userName: currentUser.name || 'User',
      isTestPlan: investment.isTestPlan || false,
      payoutSchedule: investment.payoutSchedule || 'End of Term',
      // Countdown starts after approval
      approvalDate: null,
      countdownStarted: false
    };

    // Save to Firestore via Storage.addTransaction
    await Storage.addTransaction(investmentTransaction);

    // Also save to user's active investments (localStorage for quick access)
    const userInvestments = JSON.parse(localStorage.getItem(`investments_${currentUser.uid}`) || '[]');
    userInvestments.push({
      ...investmentTransaction,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(`investments_${currentUser.uid}`, JSON.stringify(userInvestments));

    // Send email notifications
    if (currentUser.email) {
      EmailService.sendInvestmentNotification(
        currentUser.email, 
        investment.name, 
        amount, 
        investment.term
      ).catch(console.error);
    }

    // Log activity
    Storage.logActivity(currentUser.uid, 'investment_request', {
      investment: investment.name,
      amount,
      crypto: selectedCrypto,
      expectedReturn,
      dailyProfit
    });

    setStep(3);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end lg:items-center justify-center p-0 lg:p-4" onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween' }}
        className="bg-white rounded-t-3xl lg:rounded-3xl w-full lg:max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        
        <div className="p-5 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>
                {step === 1 ? 'Investment Amount' : step === 2 ? 'Make Payment' : '⏳ Pending Approval'}
              </h2>
              <p className="text-sm text-gray-500">{investment.name}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step 1: Amount & Crypto Selection */}
          {step === 1 && (
            <div>
              {/* Test Plan Warning */}
              {investment.isTestPlan && hasTestPlan && (
                <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">One Per Account</span>
                  </div>
                  <p className="text-red-600 text-sm mt-1">You have already invested in the Test Plan. This plan is limited to one investment per account.</p>
                </div>
              )}

              {/* Test Plan Badge */}
              {investment.isTestPlan && !hasTestPlan && (
                <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Test Plan - Perfect for Beginners!</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Earn 1% daily for 5 days. Fixed $500 investment. One per account.</p>
                </div>
              )}

              <label className="block font-medium text-gray-700 mb-2 text-sm">Investment Amount (USD)</label>
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                <input 
                  type="number" 
                  value={investment.isTestPlan ? investment.min : amount} 
                  onChange={(e) => !investment.isTestPlan && setAmount(Math.max(investment.min, Math.min(investment.max || 1000000, +e.target.value)))}
                  className="w-full pl-12 pr-4 py-4 text-2xl font-bold border-2 rounded-xl text-center focus:outline-none"
                  style={{ borderColor: theme.gold }}
                  readOnly={investment.isTestPlan}
                />
              </div>
              <p className="text-xs text-gray-500 mb-4">
                {investment.isTestPlan ? 'Fixed amount: $500' : `Minimum: $${investment.min.toLocaleString()}`}
              </p>
              
              {!investment.isTestPlan && (
                <div className="flex gap-2 mb-6">
                  {[1, 2, 5, 10].map((m) => {
                    const btnAmount = investment.min * m;
                    const displayAmount = btnAmount >= 1000 ? `$${(btnAmount / 1000)}K` : `$${btnAmount}`;
                    return (
                      <button key={m} onClick={() => setAmount(btnAmount)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${amount === btnAmount ? 'text-white' : 'border-gray-200'}`}
                        style={amount === btnAmount ? { background: theme.navy, borderColor: theme.navy } : {}}>
                        {displayAmount}
                      </button>
                    );
                  })}
                </div>
              )}

              <label className="block font-medium text-gray-700 mb-2 text-sm">Select Cryptocurrency</label>
              <div className="space-y-2 mb-6">
                {cryptoOptions.map((crypto) => (
                  <button key={crypto.id} onClick={() => setSelectedCrypto(crypto.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${selectedCrypto === crypto.id ? 'shadow-lg' : 'border-gray-200'}`}
                    style={selectedCrypto === crypto.id ? { borderColor: crypto.color, background: `${crypto.color}10` } : {}}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl font-bold"
                      style={{ background: crypto.color }}>
                      {crypto.icon}
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold" style={{ color: theme.navy }}>{crypto.name}</p>
                    </div>
                    {selectedCrypto === crypto.id && <CheckCircle className="w-5 h-5" style={{ color: crypto.color }} />}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-2xl mb-4" style={{ background: `${theme.green}10` }}>
                {investment.dailyRate && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Daily Profit</span>
                    <span className="font-bold" style={{ color: theme.green }}>
                      {investment.dailyRate}% (${dailyProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}/day)
                    </span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Duration</span>
                  <span className="font-bold" style={{ color: theme.navy }}>{investment.term}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Total Profit</span>
                  <span className="font-bold" style={{ color: theme.green }}>+${expectedReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
                  <span className="text-gray-600 text-sm">Total Payout</span>
                  <span className="font-bold text-lg" style={{ color: theme.navy }}>${(amount + expectedReturn).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <TrustBadges />

              <motion.button 
                onClick={() => setStep(2)} 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                disabled={investment.isTestPlan && hasTestPlan}
                className="w-full py-4 rounded-xl text-white font-semibold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
                {investment.isTestPlan && hasTestPlan ? 'Already Invested in Test Plan' : 'Continue to Payment'}
              </motion.button>
            </div>
          )}

          {/* Step 2: Crypto Payment with Countdown */}
          {step === 2 && (
            <div>
              {/* Countdown Timer */}
              <div className="text-center mb-6 p-4 rounded-2xl" style={{ background: countdown < 300 ? '#fef2f2' : `${theme.gold}10` }}>
                <p className="text-sm text-gray-500 mb-1">Payment expires in</p>
                <p className={`text-3xl font-mono font-bold ${countdown < 300 ? 'text-red-500' : ''}`} style={{ color: countdown >= 300 ? theme.navy : undefined }}>
                  <Timer className="w-6 h-6 inline mr-2" />
                  {formatTime(countdown)}
                </p>
              </div>

              {/* Amount to Send */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <p className="text-sm text-gray-500 mb-1">Amount to invest</p>
                <p className="text-2xl font-bold" style={{ color: theme.navy }}>${amount.toLocaleString()} USD</p>
                <p className="text-sm text-gray-500">Pay equivalent in {selectedCrypto}</p>
              </div>

              {/* Wallet Address */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Send {selectedCrypto} to this address:</p>
                <div className="bg-gray-900 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-2 text-center">
                    {selectedCrypto} Wallet Address
                  </p>
                  <p className="font-mono text-sm text-white break-all text-center mb-3">
                    {walletAddresses[selectedCrypto]}
                  </p>
                  <div className="flex gap-2">
                    <motion.button onClick={() => handleCopy(walletAddresses[selectedCrypto])} 
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                      style={{ background: copied ? theme.green : theme.gold, color: 'white' }}>
                      {copied ? <><CheckCircle className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Address</>}
                    </motion.button>
                    <motion.button onClick={handleOpenWallet} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 bg-blue-500 text-white">
                      <ExternalLink className="w-4 h-4" /> Open Wallet
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
                <p className="text-xs text-yellow-800">
                  ⚠️ Only send {selectedCrypto} to this address. Sending any other cryptocurrency may result in permanent loss.
                </p>
              </div>

              <motion.button onClick={handleConfirmPayment} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-white font-semibold"
                style={{ background: `linear-gradient(135deg, ${theme.green} 0%, ${theme.greenDark} 100%)` }}>
                I've Made the Payment
              </motion.button>
            </div>
          )}

          {/* Step 3: Pending Confirmation */}
          {step === 3 && (
            <div className="text-center py-6">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: `${theme.gold}20` }}>
                <Clock className="w-10 h-10" style={{ color: theme.gold }} />
              </motion.div>
              <h3 className="font-serif text-xl mb-2" style={{ color: theme.navy }}>Investment Pending</h3>
              <p className="text-gray-500 text-sm mb-6">
                Your investment of <strong>${amount.toLocaleString()}</strong> in <strong>{investment.name}</strong> is being reviewed.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">⏳ Pending Approval</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold">${amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-bold">{selectedCrypto}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Expected Return</span>
                  <span className="font-bold" style={{ color: theme.green }}>+${expectedReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-4">
                You will be notified once your investment is approved. This usually takes 1-24 hours.
              </p>

              <motion.button onClick={onClose} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-white font-semibold"
                style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
                Done
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ DASHBOARD PAGE ============
function DashboardPage({ user, onNavigate }) {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showAutoInvest, setShowAutoInvest] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(user);

  // Fetch fresh data from Firestore on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch transactions from Firestore
        const txsData = await Storage.fetchTransactionsFromCloud();
        setTransactions(txsData);
        
        // Fetch user data from Firestore
        const usersData = await Storage.fetchUsersFromCloud();
        const currentUser = usersData.find(u => u.uid === user.uid);
        if (currentUser) {
          setUserData(currentUser);
          localStorage.setItem(`user_${user.uid}`, JSON.stringify(currentUser));
          localStorage.setItem('saxovault_current_user', JSON.stringify(currentUser));
        }
      } catch (error) {
        console.log('Using cached data');
        setTransactions(Storage.getTransactions());
      }
    };
    
    fetchData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [user.uid]);

  // Get investments from localStorage (admin controlled)
  const storedInvestments = JSON.parse(localStorage.getItem('saxovault_investments') || 'null');
  const currentInvestments = storedInvestments || investments;

  // Get user's actual investments from transactions
  const userInvestments = transactions.filter(t => 
    t.userId === user.uid && 
    t.type === 'investment' && 
    (t.status === 'approved' || t.status === 'completed')
  );

  // Calculate actual portfolio from user's approved investments
  const portfolio = userInvestments.length > 0 ? userInvestments.map(inv => {
    // Parse returnRate - could be "12.0%" string or 0.12 number
    let rateDecimal = 0.1;
    if (inv.returnRate) {
      if (typeof inv.returnRate === 'string') {
        rateDecimal = parseFloat(inv.returnRate) / 100;
      } else if (inv.returnRate < 1) {
        rateDecimal = inv.returnRate;
      } else {
        rateDecimal = inv.returnRate / 100;
      }
    }
    
    // Calculate countdown timer
    let daysRemaining = 0;
    let hoursRemaining = 0;
    let countdownActive = false;
    let progressPercent = 0;
    
    if (inv.countdownStarted && inv.maturityDate) {
      const now = new Date();
      const maturity = new Date(inv.maturityDate);
      const approval = inv.approvalDate ? new Date(inv.approvalDate) : now;
      const totalMs = maturity - approval;
      const remainingMs = maturity - now;
      
      if (remainingMs > 0) {
        countdownActive = true;
        daysRemaining = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
        hoursRemaining = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        progressPercent = Math.round(((totalMs - remainingMs) / totalMs) * 100);
      } else {
        progressPercent = 100;
      }
    }
    
    return {
      id: inv.id,
      name: inv.investmentName || 'Investment',
      type: inv.category || inv.investmentType || 'Mixed',
      invested: inv.amount || 0,
      current: (inv.amount || 0) + (inv.expectedReturn || inv.amount * rateDecimal),
      returns: rateDecimal * 100,
      expectedReturn: inv.expectedReturn || inv.amount * rateDecimal,
      dailyProfit: inv.dailyProfit || (inv.amount * (inv.dailyRate || 1) / 100),
      dailyRate: inv.dailyRate || 0,
      term: inv.term,
      totalDays: inv.totalDays,
      maturityDate: inv.maturityDate,
      approvalDate: inv.approvalDate,
      countdownActive,
      daysRemaining,
      hoursRemaining,
      progressPercent,
      status: inv.status,
      color: '#3b82f6'
    };
  }) : [];

  // Calculate totals - show zero if no investments
  const totalInvested = portfolio.reduce((sum, p) => sum + p.invested, 0);
  const totalCurrent = portfolio.reduce((sum, p) => sum + p.current, 0);
  const totalReturns = totalCurrent - totalInvested;

  // Get actual user balance (default to 0) - use fresh data from Firestore
  const userBalance = userData.balance || 0;

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, {userData.name || 'Investor'}</p>
          </div>
        </div>

        {/* Balance Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 lg:p-6 mb-6 text-white"
          style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Available Balance</p>
              <p className="text-3xl lg:text-4xl font-bold">${userBalance.toLocaleString()}</p>
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
            <p className="text-lg font-bold" style={{ color: theme.green }}>{totalReturns >= 0 ? '+' : ''}${totalReturns.toLocaleString()}</p>
          </div>
        </div>

        {/* My Investments with Countdown */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-medium" style={{ color: theme.navy }}>My Investments</h2>
            <button onClick={() => onNavigate('investments')} className="text-sm" style={{ color: theme.gold }}>View All</button>
          </div>
          {portfolio.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {portfolio.map((item, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                        <TrendingUp className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="font-medium text-sm" style={{ color: theme.navy }}>{item.name}</p>
                        <p className="text-xs text-gray-400">{item.type} • {item.term}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm" style={{ color: theme.navy }}>${item.current.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                      <p className="text-xs text-green-600">+${item.expectedReturn?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  
                  {/* Countdown Timer */}
                  {item.countdownActive ? (
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-600">Time Remaining</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: theme.navy }}>
                          {item.daysRemaining}d {item.hoursRemaining}h
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${item.progressPercent}%`, 
                            background: `linear-gradient(90deg, ${theme.green} 0%, ${theme.gold} 100%)`
                          }} 
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">{item.progressPercent}% complete</span>
                        {item.dailyRate > 0 && (
                          <span className="text-xs text-green-600">+${item.dailyProfit?.toFixed(2)}/day</span>
                        )}
                      </div>
                    </div>
                  ) : item.status === 'pending' ? (
                    <div className="bg-yellow-50 rounded-lg p-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-xs text-yellow-700">Awaiting approval - countdown starts after approval</span>
                    </div>
                  ) : item.progressPercent >= 100 ? (
                    <div className="bg-green-50 rounded-lg p-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-700">Completed! Payout ready</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium mb-2">No investments yet</p>
              <p className="text-gray-400 text-sm mb-4">Start your investment journey today</p>
              <motion.button onClick={() => onNavigate('investments')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="px-6 py-2 rounded-lg text-white text-sm font-medium"
                style={{ background: theme.gold }}>
                Browse Investments
              </motion.button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: TrendingUp, label: 'Invest', color: theme.navy, action: () => onNavigate('investments') },
            { icon: Zap, label: 'Auto-Invest', color: '#f59e0b', action: () => setShowAutoInvest(true) },
            { icon: History, label: 'History', color: '#8b5cf6', action: () => onNavigate('history') },
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
        {showWithdraw && <WithdrawModal onClose={() => setShowWithdraw(false)} balance={userBalance} />}
        {showAutoInvest && <AutoInvestModal onClose={() => setShowAutoInvest(false)} user={user} />}
      </AnimatePresence>
    </div>
  );
}

// ============ TRANSACTION HISTORY PAGE ============
function TransactionHistoryPage({ user }) {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const transactions = Storage.getTransactions().filter(t => t.userId === user?.uid || t.userEmail === user?.email);
  const pendingInvestments = JSON.parse(localStorage.getItem('saxovault_pending_investments') || '[]')
    .filter(p => p.userEmail === user?.email);

  const allTransactions = [
    ...transactions.map(t => ({ ...t, category: t.type })),
    ...pendingInvestments.map(p => ({
      id: p.id,
      type: 'investment',
      category: 'investment',
      amount: p.amount,
      status: p.status,
      name: p.investmentName,
      crypto: p.crypto,
      createdAt: p.createdAt
    }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredTx = allTransactions.filter(t => filter === 'all' || t.category === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': case 'approved': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'deposit': return <Download className="w-5 h-5 text-green-600" />;
      case 'withdrawal': return <Upload className="w-5 h-5 text-orange-600" />;
      case 'investment': return <TrendingUp className="w-5 h-5 text-blue-600" />;
      default: return <CreditCard className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleExport = () => {
    const csv = [
      ['Date', 'Type', 'Amount', 'Status', 'Details'].join(','),
      ...filteredTx.map(t => [
        new Date(t.createdAt).toLocaleDateString(),
        t.type,
        t.amount,
        t.status,
        t.name || t.crypto || ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `saxovault_transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>Transaction History</h1>
            <p className="text-gray-500 text-sm">{filteredTx.length} transactions</p>
          </div>
          <motion.button onClick={handleExport} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: theme.navy, color: 'white' }}>
            <DownloadCloud className="w-4 h-4" /> Export
          </motion.button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'deposit', label: 'Deposits' },
              { id: 'withdrawal', label: 'Withdrawals' },
              { id: 'investment', label: 'Investments' }
            ].map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  filter === f.id ? 'text-white' : 'bg-gray-100 text-gray-600'
                }`}
                style={filter === f.id ? { background: theme.navy } : {}}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredTx.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredTx.map((tx, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      {getIcon(tx.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium" style={{ color: theme.navy }}>
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {tx.name || tx.crypto || 'Transaction'} • {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${tx.type === 'withdrawal' ? 'text-orange-600' : 'text-green-600'}`}>
                        {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No transactions yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ USER NOTIFICATION CENTER ============
function NotificationCenterPage({ user }) {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const userNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
    const systemNotifs = JSON.parse(localStorage.getItem('saxovault_broadcasts') || '[]');
    
    const allNotifs = [
      ...(userNotifs[user?.email] || []),
      ...systemNotifs.map(b => ({ ...b, type: 'broadcast', title: b.title, message: b.message }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    setNotifications(allNotifs);
  }, [user]);

  const markAsRead = (id) => {
    const userNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
    if (userNotifs[user?.email]) {
      userNotifs[user.email] = userNotifs[user.email].map(n => 
        n.id === id ? { ...n, read: true } : n
      );
      localStorage.setItem('saxovault_user_notifications', JSON.stringify(userNotifs));
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'investment_approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'investment_rejected': return <X className="w-5 h-5 text-red-600" />;
      case 'deposit_confirmed': return <Download className="w-5 h-5 text-green-600" />;
      case 'withdrawal_processed': return <Upload className="w-5 h-5 text-orange-600" />;
      case 'broadcast': return <Bell className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-2xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>Notifications</h1>
            <p className="text-gray-500 text-sm">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={() => {
              const userNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
              if (userNotifs[user?.email]) {
                userNotifs[user.email] = userNotifs[user.email].map(n => ({ ...n, read: true }));
                localStorage.setItem('saxovault_user_notifications', JSON.stringify(userNotifs));
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              }
            }} className="text-sm font-medium" style={{ color: theme.gold }}>
              Mark all as read
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notif, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 cursor-pointer transition-colors ${notif.read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50`}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm" style={{ color: theme.navy }}>{notif.title}</p>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{notif.message}</p>
                      <p className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ ACTIVITY LOGS PAGE ============
function ActivityLogsPage({ user }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('saxovault_activity_logs') || '{}');
    setActivities(logs[user?.email] || []);
  }, [user]);

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-12" style={{ background: theme.cream }}>
      <div className="max-w-2xl mx-auto px-4 lg:px-6">
        <div className="mb-6">
          <h1 className="font-serif text-xl lg:text-2xl" style={{ color: theme.navy }}>Activity Log</h1>
          <p className="text-gray-500 text-sm">Your recent account activity</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activities.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {activities.map((activity, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'login' ? 'bg-green-100' : 
                      activity.type === 'logout' ? 'bg-gray-100' : 
                      activity.type === 'password_change' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'login' && <LogOut className="w-5 h-5 text-green-600 rotate-180" />}
                      {activity.type === 'logout' && <LogOut className="w-5 h-5 text-gray-600" />}
                      {activity.type === 'password_change' && <Key className="w-5 h-5 text-yellow-600" />}
                      {activity.type === 'profile_update' && <User className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm" style={{ color: theme.navy }}>
                        {activity.type === 'login' ? 'Signed in' : 
                         activity.type === 'logout' ? 'Signed out' : 
                         activity.type === 'password_change' ? 'Password changed' : 'Profile updated'}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{activity.ip || 'Unknown IP'}</p>
                      <p className="text-xs text-gray-400">{activity.device || 'Unknown Device'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No activity recorded yet</p>
            </div>
          )}
        </div>

        {/* Security Tips */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Security Tips
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Review your activity regularly for suspicious logins</li>
            <li>• Enable two-factor authentication for extra security</li>
            <li>• Never share your password with anyone</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============ DEPOSIT MODAL - PROFESSIONAL DESIGN ============
function DepositModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(1800);
  const [txHash, setTxHash] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#f7931a', address: 'bc1qzmgg6hw0fttfpczh2whp8f44k497d6pucghk58', network: 'Bitcoin' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627eea', address: '0x83057882eC7B7EE0cBe63C2fE2b8957e7ab69655', network: 'ERC-20' },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '₮', color: '#26a17b', address: 'TLGH9FucAuPNUoQw2XUFEDtCg4FFdJ2jKG', network: 'TRC-20' },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', icon: '$', color: '#2775ca', address: '0x83057882eC7B7EE0cBe63C2fE2b8957e7ab69655', network: 'ERC-20' },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', icon: 'B', color: '#f3ba2f', address: '0x83057882eC7B7EE0cBe63C2fE2b8957e7ab69655', network: 'BEP-20' }
  ];

  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setInterval(() => setCountdown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProofUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { alert('File too large. Max 5MB.'); return; }
      setUploading(true);
      const reader = new FileReader();
      reader.onload = () => { setProofImage(reader.result); setUploading(false); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!txHash && !proofImage) {
      alert('Please provide transaction hash or payment proof.');
      return;
    }
    setSubmitting(true);
    
    const user = JSON.parse(localStorage.getItem('saxovault_current_user') || '{}');
    
    // Add transaction (saves to Firestore)
    await Storage.addTransaction({
      type: 'deposit',
      amount: parseFloat(amount),
      crypto: selectedCrypto.symbol,
      network: selectedCrypto.network,
      txHash: txHash || null,
      proofImage: proofImage ? 'uploaded' : null,
      userEmail: user.email || 'unknown',
      userId: user.uid || 'unknown'
    });

    // Send email (non-blocking)
    if (user.email) {
      EmailService.sendDepositNotification(user.email, parseFloat(amount), selectedCrypto.symbol).catch(console.error);
    }

    setTimeout(() => {
      setSubmitting(false);
      setStep(4);
    }, 500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between" style={{ background: theme.navy }}>
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Deposit Funds</span>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex gap-2">
            {[1,2,3,4].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? 'bg-blue-500' : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Step {step} of 4: {step === 1 ? 'Select Amount' : step === 2 ? 'Send Payment' : step === 3 ? 'Confirm Payment' : 'Complete'}
          </p>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {/* Step 1: Amount & Crypto */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {cryptoOptions.map(c => (
                    <button key={c.id} onClick={() => setSelectedCrypto(c)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${selectedCrypto?.id === c.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <span className="text-lg">{c.icon}</span>
                      <p className="text-xs font-medium mt-1">{c.symbol}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Amount (USD)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter amount" min="10" />
                <div className="flex gap-2 mt-2">
                  {[100, 500, 1000, 5000].map(v => (
                    <button key={v} onClick={() => setAmount(v.toString())}
                      className="flex-1 py-1.5 text-xs border border-gray-200 rounded hover:bg-gray-50">
                      ${v.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => selectedCrypto && amount >= 10 && setStep(2)}
                disabled={!selectedCrypto || !amount || parseFloat(amount) < 10}
                className="w-full py-3 rounded-lg text-white font-medium disabled:opacity-50 transition-all"
                style={{ background: theme.navy }}>
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && selectedCrypto && (
            <div className="space-y-4">
              <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700">Complete payment within</p>
                <p className="text-2xl font-mono font-bold text-amber-800">{formatTime(countdown)}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="font-semibold">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Network</span>
                  <span className="text-sm font-medium">{selectedCrypto.network}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Send {selectedCrypto.symbol} to:</label>
                <div className="p-3 bg-gray-900 rounded-lg">
                  <p className="font-mono text-xs text-gray-300 break-all text-center">{selectedCrypto.address}</p>
                </div>
                <button onClick={() => handleCopy(selectedCrypto.address)}
                  className="w-full mt-2 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                  {copied ? <><CheckCircle className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Address</>}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                ⚠️ Only send {selectedCrypto.symbol} via {selectedCrypto.network}. Wrong network = lost funds.
              </p>

              <button onClick={() => setStep(3)}
                className="w-full py-3 rounded-lg text-white font-medium"
                style={{ background: theme.navy }}>
                I've Sent Payment
              </button>
            </div>
          )}

          {/* Step 3: Verification */}
          {step === 3 && (
            <div className="space-y-4">
              <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Transaction Hash (Recommended)</label>
                <input type="text" value={txHash} onChange={e => setTxHash(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
                  placeholder="0x... or txid..." />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Upload Proof of Payment</label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleProofUpload} className="hidden" />
                {!proofImage ? (
                  <button onClick={() => fileInputRef.current?.click()}
                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-center">
                    {uploading ? <RefreshCw className="w-6 h-6 mx-auto animate-spin text-gray-400" /> : (
                      <>
                        <Camera className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload screenshot</p>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="relative">
                    <img src={proofImage} alt="Proof" className="w-full h-32 object-cover rounded-lg" />
                    <button onClick={() => setProofImage(null)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Verification</span>
                  <span className={txHash || proofImage ? 'text-green-600' : 'text-amber-600'}>
                    {txHash && proofImage ? '✓ Both provided' : txHash ? '✓ Hash provided' : proofImage ? '✓ Proof uploaded' : '⚠️ Required'}
                  </span>
                </div>
              </div>

              <button onClick={handleSubmit}
                disabled={(!txHash && !proofImage) || submitting}
                className="w-full py-3 rounded-lg text-white font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: theme.navy }}>
                {submitting ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing...</> : 'Submit for Verification'}
              </button>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme.navy }}>Deposit Submitted</h3>
              <p className="text-sm text-gray-500 mb-4">Your deposit is pending verification. You'll be notified once approved.</p>
              
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-left mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Method</span>
                  <span className="font-medium">{selectedCrypto?.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="text-amber-600 font-medium">Pending Approval</span>
                </div>
              </div>

              <button onClick={onClose}
                className="w-full py-3 rounded-lg font-medium border border-gray-200 hover:bg-gray-50">
                Done
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ WITHDRAW MODAL - PROFESSIONAL DESIGN ============
function WithdrawModal({ onClose, balance }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿', network: 'Bitcoin', minWithdraw: 50 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', network: 'ERC-20', minWithdraw: 50 },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '₮', network: 'TRC-20', minWithdraw: 20 },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', icon: '$', network: 'ERC-20', minWithdraw: 20 },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', icon: 'B', network: 'BEP-20', minWithdraw: 30 }
  ];

  const isValidAmount = amount && parseFloat(amount) >= (selectedCrypto?.minWithdraw || 0) && parseFloat(amount) <= balance;
  const isValidAddress = walletAddress.length >= 26;

  const handleSubmit = async () => {
    if (!isValidAmount || !isValidAddress) return;
    setSubmitting(true);

    const user = JSON.parse(localStorage.getItem('saxovault_current_user') || '{}');

    // Save to Firestore
    await Storage.addTransaction({
      type: 'withdrawal',
      amount: parseFloat(amount),
      crypto: selectedCrypto.symbol,
      network: selectedCrypto.network,
      walletAddress,
      userEmail: user.email || 'unknown',
      userId: user.uid || 'unknown'
    });

    if (user.email) {
      EmailService.sendWithdrawalNotification(user.email, parseFloat(amount), walletAddress).catch(console.error);
    }

    setTimeout(() => {
      setSubmitting(false);
      setStep(3);
    }, 500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between" style={{ background: theme.navy }}>
          <div className="flex items-center gap-3">
            <Upload className="w-5 h-5 text-white" />
            <div>
              <span className="text-white font-medium">Withdraw Funds</span>
              <p className="text-white/60 text-xs">Balance: ${balance.toLocaleString()}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex gap-2">
            {[1,2,3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? 'bg-blue-500' : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Step {step} of 3: {step === 1 ? 'Enter Details' : step === 2 ? 'Confirm' : 'Complete'}
          </p>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Withdrawal Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {cryptoOptions.map(c => (
                    <button key={c.id} onClick={() => setSelectedCrypto(c)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${selectedCrypto?.id === c.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <span className="text-lg">{c.icon}</span>
                      <p className="text-xs font-medium mt-1">{c.symbol}</p>
                    </button>
                  ))}
                </div>
                {selectedCrypto && (
                  <p className="text-xs text-gray-500 mt-2">Min: ${selectedCrypto.minWithdraw} • Network: {selectedCrypto.network}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Amount (USD)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter amount" max={balance} />
                <div className="flex gap-2 mt-2">
                  {[25, 50, 75, 100].map(p => (
                    <button key={p} onClick={() => setAmount(Math.floor(balance * p / 100).toString())}
                      className="flex-1 py-1.5 text-xs border border-gray-200 rounded hover:bg-gray-50">
                      {p}%
                    </button>
                  ))}
                </div>
                {amount && parseFloat(amount) > balance && (
                  <p className="text-xs text-red-500 mt-1">Insufficient balance</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Wallet Address</label>
                <input type="text" value={walletAddress} onChange={e => setWalletAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
                  placeholder="Enter your wallet address" />
              </div>

              <button onClick={() => setStep(2)}
                disabled={!isValidAmount || !isValidAddress || !selectedCrypto}
                className="w-full py-3 rounded-lg text-white font-medium disabled:opacity-50"
                style={{ background: theme.navy }}>
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Confirm */}
          {step === 2 && (
            <div className="space-y-4">
              <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="font-semibold">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Method</span>
                  <span className="font-medium">{selectedCrypto?.symbol} ({selectedCrypto?.network})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Fee</span>
                  <span className="text-sm">Network fee applies</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Destination</p>
                  <p className="font-mono text-xs break-all">{walletAddress}</p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-700">
                  ⚠️ Please verify the address is correct. Withdrawals to wrong addresses cannot be recovered.
                </p>
              </div>

              <button onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-3 rounded-lg text-white font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: theme.navy }}>
                {submitting ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing...</> : 'Confirm Withdrawal'}
              </button>
            </div>
          )}

          {/* Step 3: Complete */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme.navy }}>Withdrawal Submitted</h3>
              <p className="text-sm text-gray-500 mb-4">Your withdrawal is under review. Processing time: 24-48 hours.</p>
              
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-left mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Method</span>
                  <span className="font-medium">{selectedCrypto?.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="text-amber-600 font-medium">Under Review</span>
                </div>
              </div>

              <button onClick={onClose}
                className="w-full py-3 rounded-lg font-medium border border-gray-200 hover:bg-gray-50">
                Done
              </button>
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
  // Generate stable referral code based on user ID
  const referralCode = useMemo(() => {
    const storedCode = localStorage.getItem(`saxovault_referral_code_${user.uid}`);
    if (storedCode) return storedCode;
    const newCode = 'SAXO' + (user.name || 'USER').split(' ')[0].toUpperCase().slice(0, 4) + Math.random().toString(36).substr(2, 4).toUpperCase();
    localStorage.setItem(`saxovault_referral_code_${user.uid}`, newCode);
    return newCode;
  }, [user.uid, user.name]);
  
  const referralLink = `https://saxovault.com/ref/${referralCode}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get ACTUAL referrals from localStorage (users who signed up with this user's referral code)
  const allUsers = Storage.getUsers();
  const referrals = allUsers
    .filter(u => u.referredBy === user.uid || u.referralCode === referralCode)
    .map(u => {
      // Get this user's approved deposits
      const userTransactions = Storage.getTransactions().filter(t => 
        t.userId === u.uid && t.type === 'deposit' && (t.status === 'approved' || t.status === 'completed')
      );
      const totalDeposits = userTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
      const bonus = totalDeposits * 0.01; // 1% referral bonus
      
      return {
        name: u.name ? u.name.split(' ')[0] + ' ' + (u.name.split(' ')[1]?.[0] || '') + '.' : 'User',
        date: u.createdAt || new Date().toISOString(),
        deposits: totalDeposits,
        bonus: bonus,
        status: totalDeposits > 0 ? 'Active' : 'Pending'
      };
    });

  // Calculate totals - will be 0 if no referrals
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

        {/* Stats - Only show if user has referrals, otherwise show invite prompt */}
        {referrals.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 lg:gap-6 mb-6 lg:mb-8">
            {[
              { label: 'Total Earnings', value: `$${totalEarnings.toLocaleString()}`, icon: BadgeDollarSign, color: theme.green },
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
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 lg:p-8 mb-6 lg:mb-8 text-center border border-blue-100">
            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: theme.navy }}>Start Earning Today!</h3>
            <p className="text-gray-600 text-sm mb-4">Share your referral link with friends and earn 1% bonus on every deposit they make.</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="px-3 py-1 bg-white rounded-full text-gray-500">No referrals yet</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">$0 earned</span>
            </div>
          </div>
        )}

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
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => TwoFactorAuth.is2FAEnabled(user?.uid));
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying2FA, setVerifying2FA] = useState(false);
  const fileInputRef = useRef(null);

  const currentLangCode = getCurrentLanguage();
  const currentLangName = languageNames[currentLangCode] || 'English';

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
    // Send KYC notification to admin
    EmailService.sendKYCNotification(user.email, user.name, 'ID Document').catch(console.error);
    setTimeout(() => setKycStatus('verified'), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'language', label: 'Language', icon: Globe },
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
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-serif text-lg lg:text-xl mb-1 lg:mb-2" style={{ color: theme.navy }}>Two-Factor Authentication</h2>
                  <p className="text-gray-500 text-xs lg:text-sm">Extra security layer for your account</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${is2FAEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {is2FAEnabled ? '✓ Enabled' : 'Disabled'}
                </div>
              </div>
              
              {!is2FAEnabled ? (
                <div>
                  {!show2FASetup ? (
                    <motion.button onClick={() => {
                      TwoFactorAuth.send2FACode(user?.uid, user?.email);
                      setShow2FASetup(true);
                    }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                      style={{ background: `${theme.green}15`, color: theme.green }}>
                      <Shield className="w-4 h-4" /> Enable 2FA
                    </motion.button>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">A verification code has been sent to <strong>{user?.email}</strong></p>
                      <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl font-mono tracking-widest"
                        placeholder="000000" maxLength="6" />
                      <div className="flex gap-2">
                        <button onClick={() => setShow2FASetup(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm">
                          Cancel
                        </button>
                        <motion.button onClick={() => {
                          const result = TwoFactorAuth.verify2FACode(user?.uid, verificationCode);
                          if (result.valid) {
                            TwoFactorAuth.enable2FA(user?.uid);
                            setIs2FAEnabled(true);
                            setShow2FASetup(false);
                            setVerificationCode('');
                            alert('✅ Two-Factor Authentication enabled!');
                          } else {
                            alert('❌ ' + result.message);
                          }
                        }} whileHover={{ scale: 1.02 }}
                          className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium"
                          style={{ background: theme.green }}>
                          {verifying2FA ? 'Verifying...' : 'Verify & Enable'}
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <motion.button onClick={() => {
                  if (confirm('Are you sure you want to disable 2FA?')) {
                    TwoFactorAuth.disable2FA(user?.uid);
                    setIs2FAEnabled(false);
                  }
                }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 bg-red-50 text-red-600">
                  <Shield className="w-4 h-4" /> Disable 2FA
                </motion.button>
              )}
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

        {/* Language Tab */}
        {activeTab === 'language' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-5 lg:p-8">
            <h2 className="font-serif text-lg lg:text-2xl mb-2" style={{ color: theme.navy }}>Language Settings</h2>
            <p className="text-gray-500 text-sm mb-6">Select your preferred language</p>

            {/* Current Language */}
            <div className="p-4 rounded-xl mb-6" style={{ background: `${theme.gold}15` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: theme.gold }}>
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium" style={{ color: theme.navy }}>Current Language</p>
                  <p className="text-sm text-gray-500">{currentLangName}</p>
                </div>
              </div>
            </div>

            {/* Language Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
              {Object.entries(languageNames).map(([code, name]) => (
                <button key={code} onClick={() => {
                  localStorage.setItem('saxovault_language', code);
                  window.location.reload();
                }}
                  className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${
                    currentLangCode === code 
                      ? 'text-white shadow-lg' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  style={currentLangCode === code ? { background: theme.navy } : {}}>
                  {name}
                  {currentLangCode === code && <Check className="w-4 h-4 inline ml-2" />}
                </button>
              ))}
            </div>

            {/* Auto-detect info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                <HelpCircle className="w-4 h-4 inline mr-2" />
                Language is automatically detected from your browser settings. You can manually change it above.
              </p>
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

// ============ STORAGE HELPERS (with Firestore sync) ============
const Storage = {
  // Users - now synced with Firestore
  getUsers: () => JSON.parse(localStorage.getItem('saxovault_users') || '[]'),
  setUsers: (users) => localStorage.setItem('saxovault_users', JSON.stringify(users)),
  
  // Fetch users from Firestore (async)
  fetchUsersFromCloud: async () => {
    try {
      const result = await getAllUsersFromFirestore();
      if (result.success) {
        localStorage.setItem('saxovault_users', JSON.stringify(result.data));
        return result.data;
      }
      return Storage.getUsers();
    } catch (error) {
      console.error('Error fetching users from cloud:', error);
      return Storage.getUsers();
    }
  },
  
  // Transactions - now synced with Firestore
  getTransactions: () => JSON.parse(localStorage.getItem('saxovault_transactions') || '[]'),
  setTransactions: (txs) => localStorage.setItem('saxovault_transactions', JSON.stringify(txs)),
  
  // Fetch transactions from Firestore (async)
  fetchTransactionsFromCloud: async () => {
    try {
      const result = await getAllTransactionsFromFirestore();
      if (result.success) {
        localStorage.setItem('saxovault_transactions', JSON.stringify(result.data));
        return result.data;
      }
      return Storage.getTransactions();
    } catch (error) {
      console.error('Error fetching transactions from cloud:', error);
      return Storage.getTransactions();
    }
  },
  
  // Add transaction - saves to both Firestore and localStorage
  addTransaction: async (tx) => {
    const transaction = { 
      ...tx, 
      id: Date.now().toString(), 
      createdAt: new Date().toISOString(), 
      status: 'pending' 
    };
    
    // Save to Firestore (cloud)
    try {
      const result = await addTransactionToFirestore(transaction);
      if (result.success) {
        transaction.firestoreId = result.id;
        console.log('✅ Transaction saved to Firestore');
      }
    } catch (error) {
      console.error('❌ Error saving to Firestore:', error);
    }
    
    // Also save to localStorage for quick access
    const txs = Storage.getTransactions();
    txs.unshift(transaction);
    Storage.setTransactions(txs);
    
    // Notify admin
    Storage.notifyAdmin({
      type: tx.type,
      title: `New ${tx.type} Request`,
      message: `$${tx.amount?.toLocaleString()} ${tx.type} from ${tx.userEmail || 'user'}`,
      urgent: true,
      actionRequired: true
    });
    
    return transaction;
  },
  
  // Update transaction status
  updateTransaction: async (transactionId, updates) => {
    // Update in Firestore
    try {
      await updateTransactionInFirestore(transactionId, updates);
      console.log('✅ Transaction updated in Firestore');
    } catch (error) {
      console.error('❌ Error updating in Firestore:', error);
    }
    
    // Update in localStorage
    const txs = Storage.getTransactions();
    const updated = txs.map(t => 
      (t.id === transactionId || t.firestoreId === transactionId) 
        ? { ...t, ...updates } 
        : t
    );
    Storage.setTransactions(updated);
  },
  
  // Update user
  updateUser: async (uid, updates) => {
    // Update in Firestore
    try {
      await updateUserInFirestore(uid, updates);
      console.log('✅ User updated in Firestore');
    } catch (error) {
      console.error('❌ Error updating user in Firestore:', error);
    }
    
    // Update in localStorage
    const userData = localStorage.getItem(`user_${uid}`);
    if (userData) {
      const user = JSON.parse(userData);
      localStorage.setItem(`user_${uid}`, JSON.stringify({ ...user, ...updates }));
    }
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
  },

  // Admin notification system
  getAdminNotifications: () => JSON.parse(localStorage.getItem('saxovault_admin_notifs') || '[]'),
  notifyAdmin: (notif) => {
    const notifs = Storage.getAdminNotifications();
    const newNotif = {
      ...notif,
      id: Date.now(),
      read: false,
      createdAt: new Date().toISOString()
    };
    notifs.unshift(newNotif);
    localStorage.setItem('saxovault_admin_notifs', JSON.stringify(notifs.slice(0, 200)));
    
    // Play notification sound (if admin is viewing)
    if (localStorage.getItem('saxovault_admin') === 'true') {
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQABMjV4wdvqhBwIPnyV0+TkeEU5Un+13e6ZRxcnOFJsocHn04FGNjBIYZi+4t6QSjE0SGqay+LYglM4M0NTfqrN3tCMaD0wP0pqpcnc3I5kOC9AWGyiwtff');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      } catch(e) {}
    }
    
    return newNotif;
  },
  markAdminNotifRead: (id) => {
    const notifs = Storage.getAdminNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem('saxovault_admin_notifs', JSON.stringify(updated));
  },

  // Email notification queue (for real email integration)
  queueEmail: (email) => {
    const queue = JSON.parse(localStorage.getItem('saxovault_email_queue') || '[]');
    queue.push({
      ...email,
      id: Date.now(),
      status: 'queued',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('saxovault_email_queue', JSON.stringify(queue));
  },

  // Activity log
  logActivity: (userId, action, details) => {
    const logs = JSON.parse(localStorage.getItem('saxovault_activity_logs') || '[]');
    logs.unshift({
      id: Date.now(),
      userId,
      action,
      details,
      ip: 'xxx.xxx.xxx.xxx', // Would be captured server-side
      userAgent: navigator.userAgent,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('saxovault_activity_logs', JSON.stringify(logs.slice(0, 500)));
  },
  getActivityLogs: (userId) => {
    const logs = JSON.parse(localStorage.getItem('saxovault_activity_logs') || '[]');
    return userId ? logs.filter(l => l.userId === userId) : logs;
  },

  // Auto-Invest Plans
  getAutoInvestPlans: (userId) => {
    const plans = JSON.parse(localStorage.getItem('saxovault_autoinvest') || '[]');
    return userId ? plans.filter(p => p.userId === userId) : plans;
  },
  saveAutoInvestPlan: (plan) => {
    const plans = Storage.getAutoInvestPlans();
    const existingIdx = plans.findIndex(p => p.id === plan.id);
    if (existingIdx >= 0) {
      plans[existingIdx] = plan;
    } else {
      plans.push({ ...plan, id: Date.now(), createdAt: new Date().toISOString() });
    }
    localStorage.setItem('saxovault_autoinvest', JSON.stringify(plans));
  },
  deleteAutoInvestPlan: (planId) => {
    const plans = Storage.getAutoInvestPlans().filter(p => p.id !== planId);
    localStorage.setItem('saxovault_autoinvest', JSON.stringify(plans));
  }
};

// ============ EMAIL SERVICE (EmailJS - Real Email Sending) ============
// IMPORTANT: Your EmailJS template MUST have these variables:
// Subject: {{subject}}
// Content: {{message}}
// To: Set in template settings as {{to_email}}

const EMAILJS_CONFIG = {
  publicKey: 'trmaHaGeZzBpjKtaj',
  serviceId: 'service_ibr21lg',
  templateId: 'template_kskirgx',
  // Admin email for receiving all notifications
  adminEmail: 'saxovault6@gmail.com'
};

// Initialize EmailJS on load
try {
  emailjs.init(EMAILJS_CONFIG.publicKey);
  console.log('✅ EmailJS initialized successfully');
} catch (err) {
  console.error('❌ EmailJS init failed:', err);
}

const EmailService = {
  // Get admin email
  getAdminEmail: () => EMAILJS_CONFIG.adminEmail,
  
  // Test function - call from browser console: EmailService.testEmail('your@email.com')
  testEmail: async (testEmailAddress) => {
    console.log('🧪 Testing EmailJS with:', testEmailAddress);
    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          to_email: testEmailAddress,
          subject: 'SaxoVault Test Email',
          message: 'This is a test email from SaxoVault. If you received this, EmailJS is working correctly!',
          from_name: 'SaxoVault Capital',
          reply_to: 'support@saxovault.com'
        }
      );
      console.log('✅ Test email sent successfully!', result);
      alert('Test email sent! Check your inbox.');
      return { success: true, result };
    } catch (error) {
      console.error('❌ Test email failed:', error);
      alert('Test email failed: ' + (error?.text || error?.message || 'Unknown error'));
      return { success: false, error };
    }
  },

  // Core email sending function
  sendEmail: async (to, subject, messageBody, type = 'notification') => {
    console.log('📧 Sending email:', { to, subject: subject.substring(0, 50) + '...', type });
    
    if (!to || !subject) {
      console.error('❌ Missing email or subject');
      return { success: false, message: 'Missing email or subject' };
    }
    
    try {
      const templateParams = {
        to_email: to,
        subject: subject,
        message: messageBody,
        from_name: 'SaxoVault Capital',
        reply_to: 'support@saxovault.com'
      };

      console.log('📤 Template params:', { to_email: to, subject, messageLength: messageBody.length });

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );
      
      console.log('✅ Email sent!', { to, status: response.status, text: response.text });
      
      // Log success
      Storage.queueEmail({
        to, subject, type,
        status: 'sent',
        createdAt: new Date().toISOString()
      });
      
      return { success: true, response };
      
    } catch (error) {
      console.error('❌ Email failed:', error);
      console.error('Details:', { 
        text: error?.text, 
        message: error?.message,
        status: error?.status 
      });
      
      // Log failure
      Storage.queueEmail({
        to, subject, type,
        status: 'failed',
        error: error?.text || error?.message,
        createdAt: new Date().toISOString()
      });
      
      return { success: false, error: error?.text || error?.message };
    }
  },

  // Send admin notification helper
  sendAdminNotification: async (subject, message) => {
    console.log('📧 Sending ADMIN notification:', subject);
    return await EmailService.sendEmail(EMAILJS_CONFIG.adminEmail, subject, message, 'admin');
  },

  // Deposit notification - sends to user AND admin
  sendDepositNotification: async (userEmail, amount, crypto) => {
    const subject = `Deposit Request - $${amount.toLocaleString()} ${crypto}`;
    const message = `Hello,

Your deposit request has been received!

Amount: $${amount.toLocaleString()}
Payment Method: ${crypto}
Status: Pending Confirmation

Your funds will be credited once confirmed (usually 10-30 minutes).

Thank you,
SaxoVault Capital`;
    
    // Send to user
    const userResult = await EmailService.sendEmail(userEmail, subject, message, 'deposit');
    
    // Send to admin
    const adminSubject = `🔔 [DEPOSIT] $${amount.toLocaleString()} from ${userEmail}`;
    const adminMessage = `═══════════════════════════════════
       NEW DEPOSIT REQUEST
═══════════════════════════════════

👤 User: ${userEmail}
💰 Amount: $${amount.toLocaleString()}
💳 Method: ${crypto}
🕐 Time: ${new Date().toLocaleString()}

Action Required: Review in admin panel

═══════════════════════════════════`;
    
    await EmailService.sendAdminNotification(adminSubject, adminMessage);
    
    return userResult;
  },

  // Withdrawal notification
  sendWithdrawalNotification: async (userEmail, amount, address) => {
    const subject = `Withdrawal Request - $${amount.toLocaleString()}`;
    const message = `Hello,

Your withdrawal request has been submitted.

Amount: $${amount.toLocaleString()}
Destination: ${address}
Status: Under Review

Processing time: 24-48 hours after approval.

Thank you,
SaxoVault Capital`;
    
    // Send to user
    const userResult = await EmailService.sendEmail(userEmail, subject, message, 'withdrawal');
    
    // Send to admin
    const adminSubject = `🔔 [WITHDRAWAL] $${amount.toLocaleString()} from ${userEmail}`;
    const adminMessage = `═══════════════════════════════════
      NEW WITHDRAWAL REQUEST
═══════════════════════════════════

👤 User: ${userEmail}
💰 Amount: $${amount.toLocaleString()}
📍 Wallet: ${address}
🕐 Time: ${new Date().toLocaleString()}

Action Required: Approve/Reject in admin panel

═══════════════════════════════════`;
    
    await EmailService.sendAdminNotification(adminSubject, adminMessage);
    
    return userResult;
  },

  // Investment activation notification
  sendInvestmentNotification: async (userEmail, investmentName, amount, duration) => {
    const subject = `Investment Activated - ${investmentName}`;
    const message = `Hello,

Your investment has been activated!

Investment: ${investmentName}
Amount: $${amount.toLocaleString()}
Duration: ${duration || 'As specified'}
Status: Active

You can track your investment in the dashboard.

Thank you,
SaxoVault Capital`;
    
    const userResult = await EmailService.sendEmail(userEmail, subject, message, 'investment');
    
    // Admin notification
    const adminSubject = `🔔 [INVESTMENT] $${amount.toLocaleString()} - ${investmentName}`;
    const adminMessage = `═══════════════════════════════════
      NEW INVESTMENT ACTIVATION
═══════════════════════════════════

👤 User: ${userEmail}
📊 Plan: ${investmentName}
💰 Amount: $${amount.toLocaleString()}
⏱️ Duration: ${duration || 'N/A'}
🕐 Time: ${new Date().toLocaleString()}

═══════════════════════════════════`;
    
    await EmailService.sendAdminNotification(adminSubject, adminMessage);
    
    return userResult;
  },

  // KYC Submission notification
  sendKYCNotification: async (userEmail, userName, kycType) => {
    const subject = `KYC Verification Submitted`;
    const message = `Hello ${userName || ''},

Your KYC verification documents have been submitted successfully.

Document Type: ${kycType || 'ID Document'}
Status: Under Review

Our team will verify your documents within 24-48 hours.

Thank you,
SaxoVault Capital`;
    
    const userResult = await EmailService.sendEmail(userEmail, subject, message, 'kyc');
    
    // Admin notification
    const adminSubject = `🔔 [KYC] New Submission from ${userEmail}`;
    const adminMessage = `═══════════════════════════════════
        NEW KYC SUBMISSION
═══════════════════════════════════

👤 User: ${userName || 'N/A'}
📧 Email: ${userEmail}
📄 Document Type: ${kycType || 'ID Document'}
🕐 Submitted: ${new Date().toLocaleString()}

Action Required: Verify documents in admin panel

═══════════════════════════════════`;
    
    await EmailService.sendAdminNotification(adminSubject, adminMessage);
    
    return userResult;
  },

  // New User Registration notification
  sendNewUserNotification: async (userEmail, userName, signUpMethod) => {
    // Admin notification only
    const adminSubject = `🔔 [NEW USER] ${userName || userEmail} just registered`;
    const adminMessage = `═══════════════════════════════════
         NEW USER REGISTRATION
═══════════════════════════════════

👤 Name: ${userName || 'N/A'}
📧 Email: ${userEmail}
🔐 Method: ${signUpMethod || 'Email'}
🕐 Time: ${new Date().toLocaleString()}

═══════════════════════════════════`;
    
    return await EmailService.sendAdminNotification(adminSubject, adminMessage);
  },

  // Login Activity notification (optional - for security)
  sendLoginNotification: async (userEmail, userName, loginMethod) => {
    // Admin notification only
    const adminSubject = `🔔 [LOGIN] ${userEmail} logged in`;
    const adminMessage = `User Login Activity

👤 User: ${userName || userEmail}
📧 Email: ${userEmail}
🔐 Method: ${loginMethod || 'Email'}
🕐 Time: ${new Date().toLocaleString()}`;
    
    return await EmailService.sendAdminNotification(adminSubject, adminMessage);
  },

  sendReferralNotification: async (referrerEmail, newUserName) => {
    const subject = `New Referral Signup!`;
    const message = `Hello,

Someone signed up using your referral link!

New User: ${newUserName}
Your Bonus: 1% of their deposits

Keep sharing to earn more!

Thank you,
SaxoVault Capital`;
    
    return await EmailService.sendEmail(referrerEmail, subject, message, 'referral');
  },

  send2FACode: async (userEmail, code) => {
    const subject = `Security Code: ${code}`;
    const message = `Your SaxoVault verification code:

${code}

This code expires in 5 minutes.
Never share this code with anyone.

SaxoVault Capital`;
    
    return await EmailService.sendEmail(userEmail, subject, message, '2fa');
  },

  sendBroadcast: async (users, title, message) => {
    const results = [];
    for (const user of users) {
      const result = await EmailService.sendEmail(user.email, title, message, 'broadcast');
      results.push({ email: user.email, ...result });
    }
    return results;
  },

  sendStatusUpdate: async (userEmail, type, status, amount, details = '') => {
    const subject = `${type} ${status}`;
    const message = `Hello,

Your ${type} has been ${status}.

Amount: $${amount?.toLocaleString() || 'N/A'}
Status: ${status.toUpperCase()}
${details ? `Note: ${details}` : ''}

Thank you,
SaxoVault Capital`;
    
    return await EmailService.sendEmail(userEmail, subject, message, 'status');
  }
};

// Make EmailService available globally for testing
if (typeof window !== 'undefined') {
  window.EmailService = EmailService;
}

// ============ TWO-FACTOR AUTHENTICATION ============
const TwoFactorAuth = {
  generate2FACode: () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },
  
  store2FACode: (userId, code) => {
    const codes = JSON.parse(localStorage.getItem('saxovault_2fa_codes') || '{}');
    codes[userId] = {
      code,
      createdAt: Date.now(),
      expires: Date.now() + (5 * 60 * 1000) // 5 minutes
    };
    localStorage.setItem('saxovault_2fa_codes', JSON.stringify(codes));
    return code;
  },
  
  verify2FACode: (userId, inputCode) => {
    const codes = JSON.parse(localStorage.getItem('saxovault_2fa_codes') || '{}');
    const stored = codes[userId];
    
    if (!stored) return { valid: false, message: 'No code found' };
    if (Date.now() > stored.expires) return { valid: false, message: 'Code expired' };
    if (stored.code !== inputCode) return { valid: false, message: 'Invalid code' };
    
    // Clear the code after successful verification
    delete codes[userId];
    localStorage.setItem('saxovault_2fa_codes', JSON.stringify(codes));
    
    return { valid: true, message: 'Verified' };
  },
  
  send2FACode: (userId, email) => {
    const code = TwoFactorAuth.generate2FACode();
    TwoFactorAuth.store2FACode(userId, code);
    EmailService.send2FACode(email, code);
    return code;
  },
  
  is2FAEnabled: (userId) => {
    const settings = JSON.parse(localStorage.getItem('saxovault_user_2fa') || '{}');
    return settings[userId]?.enabled || false;
  },
  
  enable2FA: (userId) => {
    const settings = JSON.parse(localStorage.getItem('saxovault_user_2fa') || '{}');
    settings[userId] = { enabled: true, enabledAt: new Date().toISOString() };
    localStorage.setItem('saxovault_user_2fa', JSON.stringify(settings));
  },
  
  disable2FA: (userId) => {
    const settings = JSON.parse(localStorage.getItem('saxovault_user_2fa') || '{}');
    settings[userId] = { enabled: false };
    localStorage.setItem('saxovault_user_2fa', JSON.stringify(settings));
  }
};

// ============ AUTO-INVEST COMPONENT ============
function AutoInvestModal({ onClose, user }) {
  const [frequency, setFrequency] = useState('weekly');
  const [amount, setAmount] = useState(100);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [plans, setPlans] = useState([]);
  
  const adminInvestments = JSON.parse(localStorage.getItem('saxovault_investments') || 'null') || investments;
  
  useEffect(() => {
    setPlans(Storage.getAutoInvestPlans(user?.uid));
  }, [user]);
  
  const frequencies = [
    { id: 'daily', label: 'Daily', desc: 'Every day' },
    { id: 'weekly', label: 'Weekly', desc: 'Every Monday' },
    { id: 'biweekly', label: 'Bi-Weekly', desc: 'Every 2 weeks' },
    { id: 'monthly', label: 'Monthly', desc: '1st of each month' }
  ];
  
  const handleCreatePlan = () => {
    if (!selectedInvestment || amount < 50) {
      alert('Please select an investment and enter at least $50');
      return;
    }
    
    const plan = {
      userId: user?.uid,
      investmentId: selectedInvestment.id,
      investmentName: selectedInvestment.name,
      amount,
      frequency,
      status: 'active',
      nextExecution: getNextExecutionDate(frequency),
      totalInvested: 0,
      executionCount: 0
    };
    
    Storage.saveAutoInvestPlan(plan);
    setPlans([...plans, plan]);
    setSelectedInvestment(null);
    setAmount(100);
    
    Storage.addNotification({ type: 'autoinvest', message: `Auto-invest plan created: $${amount}/${frequency} into ${selectedInvestment.name}` });
  };
  
  const getNextExecutionDate = (freq) => {
    const now = new Date();
    switch(freq) {
      case 'daily': return new Date(now.setDate(now.getDate() + 1)).toISOString();
      case 'weekly': return new Date(now.setDate(now.getDate() + (7 - now.getDay() + 1) % 7 + 1)).toISOString();
      case 'biweekly': return new Date(now.setDate(now.getDate() + 14)).toISOString();
      case 'monthly': return new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
      default: return new Date(now.setDate(now.getDate() + 7)).toISOString();
    }
  };
  
  const handleDeletePlan = (planId) => {
    if (confirm('Delete this auto-invest plan?')) {
      Storage.deleteAutoInvestPlan(planId);
      setPlans(plans.filter(p => p.id !== planId));
    }
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl" style={{ color: theme.navy }}>
                <Zap className="w-5 h-5 inline mr-2 text-yellow-500" />
                Auto-Invest Plans
              </h2>
              <p className="text-sm text-gray-500">Set up recurring investments automatically</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Existing Plans */}
          {plans.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-sm text-gray-700 mb-3">Active Plans</h3>
              <div className="space-y-2">
                {plans.map(plan => (
                  <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-sm" style={{ color: theme.navy }}>{plan.investmentName}</p>
                      <p className="text-xs text-gray-500">${plan.amount}/{plan.frequency}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${plan.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {plan.status}
                      </span>
                      <button onClick={() => handleDeletePlan(plan.id)} className="p-1.5 hover:bg-red-100 rounded text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Create New Plan */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Investment</label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {adminInvestments.slice(0, 8).map(inv => (
                  <button key={inv.id} onClick={() => setSelectedInvestment(inv)}
                    className={`p-3 rounded-xl text-left text-sm transition-all ${
                      selectedInvestment?.id === inv.id ? 'ring-2 bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    style={selectedInvestment?.id === inv.id ? { ringColor: theme.navy } : {}}>
                    <p className="font-medium truncate" style={{ color: theme.navy }}>{inv.name}</p>
                    <p className="text-xs text-gray-500">{inv.returns} returns</p>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount per Investment</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input type="number" value={amount} onChange={e => setAmount(Math.max(50, +e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': theme.navy }} min="50" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum $50 per investment</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {frequencies.map(freq => (
                  <button key={freq.id} onClick={() => setFrequency(freq.id)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      frequency === freq.id ? 'text-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    style={frequency === freq.id ? { background: theme.navy } : {}}>
                    <p className="font-medium text-sm">{freq.label}</p>
                    <p className={`text-xs ${frequency === freq.id ? 'text-white/70' : 'text-gray-500'}`}>{freq.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Summary */}
            {selectedInvestment && (
              <div className="p-4 rounded-xl" style={{ background: `${theme.green}10` }}>
                <p className="text-sm text-gray-600 mb-1">You'll invest</p>
                <p className="text-2xl font-bold" style={{ color: theme.navy }}>${amount} / {frequency}</p>
                <p className="text-sm text-gray-500">into {selectedInvestment.name}</p>
              </div>
            )}
            
            <motion.button onClick={handleCreatePlan} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              disabled={!selectedInvestment}
              className="w-full py-4 rounded-xl text-white font-semibold disabled:opacity-50"
              style={{ background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyLight} 100%)` }}>
              <Zap className="w-5 h-5 inline mr-2" />
              Create Auto-Invest Plan
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============ 2FA VERIFICATION MODAL ============
function TwoFactorModal({ user, onVerify, onClose, onResend }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);
  
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);
  
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit when complete
    if (newCode.every(c => c) && newCode.join('').length === 6) {
      handleVerify(newCode.join(''));
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handleVerify = async (fullCode) => {
    setLoading(true);
    setError('');
    
    const result = TwoFactorAuth.verify2FACode(user?.uid, fullCode);
    
    if (result.valid) {
      onVerify();
    } else {
      setError(result.message);
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
    setLoading(false);
  };
  
  const handleResend = () => {
    if (resendCooldown > 0) return;
    TwoFactorAuth.send2FACode(user?.uid, user?.email);
    setResendCooldown(60);
    setCode(['', '', '', '', '', '']);
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl text-center">
        
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: `${theme.navy}10` }}>
          <Smartphone className="w-8 h-8" style={{ color: theme.navy }} />
        </div>
        
        <h2 className="font-serif text-xl mb-2" style={{ color: theme.navy }}>Two-Factor Authentication</h2>
        <p className="text-sm text-gray-500 mb-6">Enter the 6-digit code sent to<br/><strong>{user?.email}</strong></p>
        
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, i) => (
            <input key={i} ref={el => inputRefs.current[i] = el}
              type="text" inputMode="numeric" maxLength="1" value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all"
              style={{ borderColor: error ? '#ef4444' : digit ? theme.navy : '#e5e7eb' }} />
          ))}
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mb-4 flex items-center justify-center gap-1">
            <AlertCircle className="w-4 h-4" /> {error}
          </p>
        )}
        
        <button onClick={handleResend} disabled={resendCooldown > 0}
          className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 mb-4">
          {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
        </button>
        
        <div className="flex gap-3">
          <motion.button onClick={onClose} whileHover={{ scale: 1.02 }}
            className="flex-1 py-3 rounded-xl border border-gray-200">Cancel</motion.button>
          <motion.button onClick={() => handleVerify(code.join(''))} whileHover={{ scale: 1.02 }}
            disabled={loading || code.some(c => !c)}
            className="flex-1 py-3 rounded-xl text-white font-medium disabled:opacity-50"
            style={{ background: theme.navy }}>
            {loading ? 'Verifying...' : 'Verify'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [settings, setSettings] = useState(Storage.getSettings());
  const [notifications, setNotifications] = useState(Storage.getNotifications());
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users from Firestore
        const usersData = await Storage.fetchUsersFromCloud();
        setUsers(usersData);
        
        // Fetch transactions from Firestore
        const txsData = await Storage.fetchTransactionsFromCloud();
        setTransactions(txsData);
        
        console.log('✅ Admin data loaded from Firestore:', usersData.length, 'users,', txsData.length, 'transactions');
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to localStorage
        setUsers(Storage.getUsers());
        setTransactions(Storage.getTransactions());
      }
      setLoading(false);
    };
    
    fetchData();
    
    // Set up real-time listeners
    const unsubUsers = subscribeToUsers((usersData) => {
      setUsers(usersData);
      Storage.setUsers(usersData);
    });
    
    const unsubTxs = subscribeToTransactions((txsData) => {
      setTransactions(txsData);
      Storage.setTransactions(txsData);
    });
    
    // Cleanup listeners on unmount
    return () => {
      if (unsubUsers) unsubUsers();
      if (unsubTxs) unsubTxs();
    };
  }, []);

  // Stats
  const totalUsers = users.length;
  const totalDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'completed').reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  const pendingDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'pending').length;
  const pendingWithdrawals = transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending').length;

  const handleUpdateUser = async (userId, updates) => {
    const updatedUsers = users.map(u => u.uid === userId ? { ...u, ...updates } : u);
    setUsers(updatedUsers);
    await Storage.updateUser(userId, updates);
    Storage.addNotification({ type: 'user_update', message: `User updated successfully` });
    setEditingUser(null);
  };

  const handleUpdateTransaction = async (txId, status) => {
    // Find the transaction
    const transaction = transactions.find(t => t.id === txId || t.firestoreId === txId);
    
    // Prepare update data
    const updateData = { 
      status, 
      updatedAt: new Date().toISOString() 
    };
    
    // If investment is being approved, set approval date and calculate maturity
    if (transaction && status === 'completed' && transaction.type === 'investment') {
      const approvalDate = new Date();
      const totalDays = transaction.totalDays || 30;
      const maturityDate = new Date(approvalDate);
      maturityDate.setDate(maturityDate.getDate() + totalDays);
      
      updateData.approvalDate = approvalDate.toISOString();
      updateData.maturityDate = maturityDate.toISOString();
      updateData.countdownStarted = true;
      updateData.countdownEndsAt = maturityDate.toISOString();
      
      console.log(`✅ Investment ${transaction.investmentName} approved!`);
      console.log(`   Countdown started: ${approvalDate.toISOString()}`);
      console.log(`   Maturity date: ${maturityDate.toISOString()} (${totalDays} days)`);
    }
    
    const updatedTxs = transactions.map(t => 
      (t.id === txId || t.firestoreId === txId) 
        ? { ...t, ...updateData } 
        : t
    );
    setTransactions(updatedTxs);
    await Storage.updateTransaction(txId, updateData);
    
    // If deposit is approved, update user balance
    if (transaction && status === 'completed' && transaction.type === 'deposit') {
      const user = users.find(u => u.uid === transaction.userId || u.email === transaction.userEmail);
      if (user) {
        const newBalance = (parseFloat(user.balance) || 0) + parseFloat(transaction.amount);
        await Storage.updateUser(user.uid, { balance: newBalance });
        // Update local state
        setUsers(users.map(u => 
          u.uid === user.uid ? { ...u, balance: newBalance } : u
        ));
        console.log(`✅ User ${user.email} balance updated to $${newBalance}`);
      }
    }
    
    // If withdrawal is approved, deduct from user balance
    if (transaction && status === 'completed' && transaction.type === 'withdrawal') {
      const user = users.find(u => u.uid === transaction.userId || u.email === transaction.userEmail);
      if (user) {
        const newBalance = Math.max(0, (parseFloat(user.balance) || 0) - parseFloat(transaction.amount));
        await Storage.updateUser(user.uid, { balance: newBalance });
        setUsers(users.map(u => 
          u.uid === user.uid ? { ...u, balance: newBalance } : u
        ));
        console.log(`✅ User ${user.email} balance updated to $${newBalance} after withdrawal`);
      }
    }
    
    // If investment is approved/completed, also update user's local investments
    if (transaction && status === 'completed' && transaction.type === 'investment') {
      const userInvestments = JSON.parse(localStorage.getItem(`investments_${transaction.userId}`) || '[]');
      const updatedUserInvestments = userInvestments.map(inv => 
        inv.investmentId === transaction.investmentId 
          ? { ...inv, ...updateData } 
          : inv
      );
      localStorage.setItem(`investments_${transaction.userId}`, JSON.stringify(updatedUserInvestments));
      console.log(`✅ Investment countdown started for ${transaction.userEmail}`);
    }
    
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

  // Get pending investments
  const pendingInvestments = JSON.parse(localStorage.getItem('saxovault_pending_investments') || '[]');
  const pendingInvCount = pendingInvestments.filter(p => p.status === 'pending').length;

  const handleApproveInvestment = (inv) => {
    const updated = pendingInvestments.map(p => 
      p.id === inv.id ? { ...p, status: 'approved', approvedAt: new Date().toISOString() } : p
    );
    localStorage.setItem('saxovault_pending_investments', JSON.stringify(updated));
    
    // Add to user notifications
    const userNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
    if (!userNotifs[inv.userEmail]) userNotifs[inv.userEmail] = [];
    userNotifs[inv.userEmail].unshift({
      id: Date.now(),
      type: 'investment_approved',
      title: '✅ Investment Approved!',
      message: `Your $${inv.amount.toLocaleString()} investment in ${inv.investmentName} has been approved.`,
      read: false,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('saxovault_user_notifications', JSON.stringify(userNotifs));
    
    Storage.addNotification({ type: 'investment_approved', message: `Investment approved: $${inv.amount.toLocaleString()}` });
    alert('Investment approved!');
    window.location.reload();
  };

  const handleRejectInvestment = (inv) => {
    if (!confirm('Are you sure you want to reject this investment?')) return;
    const updated = pendingInvestments.map(p => 
      p.id === inv.id ? { ...p, status: 'rejected', rejectedAt: new Date().toISOString() } : p
    );
    localStorage.setItem('saxovault_pending_investments', JSON.stringify(updated));
    Storage.addNotification({ type: 'investment_rejected', message: `Investment rejected: $${inv.amount.toLocaleString()}` });
    alert('Investment rejected.');
    window.location.reload();
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: PieChart },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'transactions', name: 'Transactions', icon: CreditCard },
    { id: 'pending', name: 'Pending', icon: Clock, badge: pendingInvCount },
    { id: 'investments', name: 'Investments', icon: TrendingUp },
    { id: 'tickets', name: 'Tickets', icon: Ticket, badge: openTickets },
    { id: 'website', name: 'Website Editor', icon: Globe },
    { id: 'branding', name: 'Branding', icon: Image },
    { id: 'payments', name: 'Payment Methods', icon: Wallet },
    { id: 'platform', name: 'Platform Config', icon: Settings }
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
              
              {/* Admin Action Required Notifications */}
              {(() => {
                const adminNotifs = Storage.getAdminNotifications().filter(n => n.actionRequired && !n.read);
                if (adminNotifs.length === 0) return null;
                return (
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-red-600 animate-pulse" />
                      </div>
                      <div>
                        <p className="font-semibold text-red-800">Action Required</p>
                        <p className="text-sm text-red-600">{adminNotifs.length} notification(s) need your attention</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {adminNotifs.slice(0, 5).map((notif, i) => (
                        <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <div>
                            <p className="font-medium text-sm" style={{ color: theme.navy }}>{notif.title}</p>
                            <p className="text-xs text-gray-500">{notif.message}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleTimeString()}</span>
                            <button onClick={() => Storage.markAdminNotifRead(notif.id)} className="p-1 hover:bg-gray-100 rounded">
                              <Check className="w-4 h-4 text-green-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

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

          {/* Pending Investments Tab */}
          {activeTab === 'pending' && (
            <div>
              <h2 className="font-serif text-xl lg:text-2xl mb-6" style={{ color: theme.navy }}>Pending Approvals</h2>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm text-gray-500">{pendingInvestments.filter(p => p.status === 'pending').length} pending approvals</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {pendingInvestments.filter(p => p.status === 'pending').map((inv, i) => (
                    <div key={i} className="p-4 hover:bg-yellow-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">⏳ Pending</span>
                            <span className="text-xs text-gray-400">{new Date(inv.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="font-semibold" style={{ color: theme.navy }}>{inv.investmentName}</p>
                          <p className="text-sm text-gray-500">{inv.userEmail}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="font-bold text-lg" style={{ color: theme.green }}>${inv.amount?.toLocaleString()}</span>
                            <span className="text-gray-400">via {inv.crypto}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button onClick={() => handleApproveInvestment(inv)} whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                            style={{ background: theme.green }}>
                            <Check className="w-4 h-4 inline mr-1" /> Approve
                          </motion.button>
                          <motion.button onClick={() => handleRejectInvestment(inv)} whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 rounded-lg bg-red-100 text-red-600 text-sm font-medium">
                            <X className="w-4 h-4 inline mr-1" /> Reject
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingInvestments.filter(p => p.status === 'pending').length === 0 && (
                    <p className="text-center text-gray-500 py-12">No pending approvals</p>
                  )}
                </div>
              </div>

              {/* Recently Approved/Rejected */}
              <h3 className="font-serif text-lg mt-8 mb-4" style={{ color: theme.navy }}>Recent Decisions</h3>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {pendingInvestments.filter(p => p.status !== 'pending').slice(0, 10).map((inv, i) => (
                    <div key={i} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm" style={{ color: theme.navy }}>{inv.investmentName}</p>
                          <p className="text-xs text-gray-500">{inv.userEmail}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            inv.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {inv.status === 'approved' ? '✅ Approved' : '❌ Rejected'}
                          </span>
                          <p className="text-xs text-gray-400 mt-1">${inv.amount?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
  const [showOnboarding, setShowOnboarding] = useState(false);
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

  // Log activity helper
  const logActivity = (type, userEmail) => {
    const logs = JSON.parse(localStorage.getItem('saxovault_activity_logs') || '{}');
    if (!logs[userEmail]) logs[userEmail] = [];
    logs[userEmail].unshift({
      type,
      timestamp: new Date().toISOString(),
      ip: 'User IP',
      device: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser'
    });
    // Keep only last 50 activities
    logs[userEmail] = logs[userEmail].slice(0, 50);
    localStorage.setItem('saxovault_activity_logs', JSON.stringify(logs));
  };

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
      
      // Log the login activity
      logActivity('login', userData.email);
      
      // Save to localStorage for admin to see
      const users = Storage.getUsers();
      const existingUser = users.find(u => u.email === userData.email);
      
      // Check if this is a brand new user (first time being added to localStorage)
      const isNewUser = !existingUser;
      
      if (isNewUser) {
        // This is a new user - add them with zero balances
        users.push({ 
          ...userData, 
          uid: userData.uid || Date.now().toString(), 
          createdAt: new Date().toISOString(),
          // Initialize all figures to zero
          balance: 0,
          totalDeposited: 0,
          totalWithdrawn: 0,
          totalEarnings: 0,
          activeInvestments: 0,
          referralEarnings: 0,
          referralCount: 0,
          onboardingComplete: false // Mark as new user
        });
        Storage.setUsers(users);
        
        // Show onboarding ONLY for brand new users
        setShowOnboarding(true);
        
        // Notify admin of new user
        Storage.notifyAdmin({
          type: 'new_user',
          title: '👤 New User Registration',
          message: `${userData.name || 'New user'} (${userData.email}) just registered`,
          urgent: true,
          actionRequired: false
        });
        
        // Handle referral - notify the referrer
        if (userData.referralCode) {
          const referrer = users.find(u => u.referralCode === userData.referralCode || u.uid === userData.referralCode);
          if (referrer) {
            // Send email to referrer
            EmailService.sendReferralNotification(referrer.email, userData.name || userData.email);
            
            // Add in-app notification
            const userNotifs = JSON.parse(localStorage.getItem('saxovault_user_notifications') || '{}');
            if (!userNotifs[referrer.uid]) userNotifs[referrer.uid] = [];
            userNotifs[referrer.uid].unshift({
              id: Date.now(),
              type: 'referral',
              title: '🎉 New Referral!',
              message: `${userData.name || 'Someone'} signed up using your referral link!`,
              read: false,
              createdAt: new Date().toISOString()
            });
            localStorage.setItem('saxovault_user_notifications', JSON.stringify(userNotifs));
            
            // Notify admin about the referral
            Storage.notifyAdmin({
              type: 'referral',
              title: '👥 New Referral Signup',
              message: `${userData.email} signed up via ${referrer.email}'s referral`,
              urgent: false,
              actionRequired: false
            });
          }
        }
      }

      // Store current user for reference
      localStorage.setItem('saxovault_current_user', JSON.stringify(userData));
    }
    setIsAuth(true);
  };

  const handleLogout = async () => {
    try {
      // Log the logout activity
      if (user.email) {
        logActivity('logout', user.email);
      }
      await logoutUser();
    } catch (e) {}
    setIsAuth(false);
    setUser({ name: '', email: '', phone: '', address: '', balance: 0, profileImage: null });
    localStorage.removeItem('saxovault_current_user');
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
      {/* Onboarding Tour for new users */}
      <AnimatePresence>
        {showOnboarding && <OnboardingTour onComplete={() => setShowOnboarding(false)} />}
      </AnimatePresence>
      <Navbar activePage={page} onNavigate={setPage} user={user} onLogout={handleLogout} />

      <AnimatePresence>
        {selected && !showInvest && <InvestmentModal investment={selected} onClose={() => setSelected(null)} onInvest={() => setShowInvest(true)} />}
        {showInvest && selected && <InvestFlowModal investment={selected} onClose={() => { setShowInvest(false); setSelected(null); }} balance={user.balance} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {page === 'home' && <HomePage key="home" onNavigate={setPage} onSelectInvestment={handleSelectInvestment} />}
        {page === 'investments' && <InvestmentsPage key="investments" onSelectInvestment={handleSelectInvestment} />}
        {page === 'dashboard' && <DashboardPage key="dashboard" user={user} onNavigate={setPage} />}
        {page === 'history' && <TransactionHistoryPage key="history" user={user} />}
        {page === 'notifications' && <NotificationCenterPage key="notifications" user={user} />}
        {page === 'activity' && <ActivityLogsPage key="activity" user={user} />}
        {page === 'referral' && <ReferralPage key="referral" user={user} />}
        {page === 'calculator' && <CalculatorPage key="calculator" />}
        {page === 'profile' && <ProfilePage key="profile" user={user} setUser={setUser} onLogout={handleLogout} />}
      </AnimatePresence>

      <MobileBottomNav activePage={page} onNavigate={setPage} />
      <FloatingContact />
    </div>
  );
}
