// Firebase Configuration for SaxoVault
// Using Firebase Authentication ONLY (FREE - No billing required)
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4oe_gqt8NOWC6VCEfJYbznsVQuoyIJC4",
  authDomain: "saxovault-d94c5.firebaseapp.com",
  projectId: "saxovault-d94c5",
  storageBucket: "saxovault-d94c5.firebasestorage.app",
  messagingSenderId: "61739859282",
  appId: "1:61739859282:web:e33555e56540b7aee20e8b",
  measurementId: "G-RC1Y2MJJVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ============ AUTHENTICATION FUNCTIONS ============

// Register new user with email verification
export const registerUser = async (email, password, userData) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    await updateProfile(user, {
      displayName: userData.name || ''
    });
    
    // Send verification email
    await sendEmailVerification(user, {
      url: window.location.origin,
      handleCodeInApp: false
    });
    
    // Store additional user data in localStorage (temporary until they verify)
    const userDataToStore = {
      uid: user.uid,
      email: email,
      name: userData.name || '',
      phone: userData.phone || '',
      country: userData.country || '',
      referralCode: userData.referralCode || '',
      createdAt: new Date().toISOString(),
      balance: 0
    };
    localStorage.setItem(`user_${user.uid}`, JSON.stringify(userDataToStore));
    
    return { success: true, user, message: 'Verification email sent! Please check your inbox.' };
  } catch (error) {
    let message = 'Registration failed. Please try again.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered. Please login instead.';
        break;
      case 'auth/weak-password':
        message = 'Password is too weak. Please use at least 6 characters.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      default:
        message = error.message;
    }
    
    return { success: false, error: message };
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Check if email is verified
    if (!user.emailVerified) {
      // Resend verification email
      await sendEmailVerification(user);
      await signOut(auth);
      return { 
        success: false, 
        needsVerification: true,
        error: 'Please verify your email first. A new verification link has been sent.' 
      };
    }
    
    // Get user data from localStorage
    let userData = localStorage.getItem(`user_${user.uid}`);
    if (userData) {
      userData = JSON.parse(userData);
    } else {
      // Create basic user data if not found
      userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || '',
        balance: 0
      };
      localStorage.setItem(`user_${user.uid}`, JSON.stringify(userData));
    }
    
    return { success: true, user, userData };
  } catch (error) {
    let message = 'Login failed. Please try again.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid email or password.';
        break;
      default:
        message = error.message;
    }
    
    return { success: false, error: message };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset email sent! Check your inbox.' };
  } catch (error) {
    let message = 'Failed to send reset email.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No account found with this email.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      default:
        message = error.message;
    }
    
    return { success: false, error: message };
  }
};

// Resend verification email
export const resendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
      return { success: true, message: 'Verification email sent!' };
    }
    return { success: false, error: 'No user logged in.' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth state listener
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user data
export const getCurrentUserData = () => {
  const user = auth.currentUser;
  if (user) {
    const userData = localStorage.getItem(`user_${user.uid}`);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export default app;
