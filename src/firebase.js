// Firebase Configuration for SaxoVault
// Using Firebase Authentication + Firestore Database
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

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
export const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// ============ FIRESTORE DATABASE FUNCTIONS ============

// Save user to Firestore
export const saveUserToFirestore = async (userData) => {
  try {
    await setDoc(doc(db, 'users', userData.uid), {
      ...userData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    console.log('✅ User saved to Firestore:', userData.email);
    return { success: true };
  } catch (error) {
    console.error('❌ Error saving user to Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Get user from Firestore
export const getUserFromFirestore = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('❌ Error getting user from Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Get all users from Firestore
export const getAllUsersFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    console.log('✅ Fetched', users.length, 'users from Firestore');
    return { success: true, data: users };
  } catch (error) {
    console.error('❌ Error getting users from Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Update user in Firestore
export const updateUserInFirestore = async (uid, updates) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    console.log('✅ User updated in Firestore');
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating user in Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Add transaction to Firestore
export const addTransactionToFirestore = async (transaction) => {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), {
      ...transaction,
      createdAt: serverTimestamp(),
      status: transaction.status || 'pending'
    });
    console.log('✅ Transaction added to Firestore:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error adding transaction to Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Get all transactions from Firestore
export const getAllTransactionsFromFirestore = async () => {
  try {
    const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const transactions = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({ 
        id: doc.id, 
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt
      });
    });
    console.log('✅ Fetched', transactions.length, 'transactions from Firestore');
    return { success: true, data: transactions };
  } catch (error) {
    console.error('❌ Error getting transactions from Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Update transaction in Firestore
export const updateTransactionInFirestore = async (transactionId, updates) => {
  try {
    await updateDoc(doc(db, 'transactions', transactionId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    console.log('✅ Transaction updated in Firestore');
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating transaction in Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Get user transactions from Firestore
export const getUserTransactionsFromFirestore = async (userEmail) => {
  try {
    const q = query(
      collection(db, 'transactions'), 
      where('userEmail', '==', userEmail),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const transactions = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({ 
        id: doc.id, 
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt
      });
    });
    return { success: true, data: transactions };
  } catch (error) {
    console.error('❌ Error getting user transactions:', error);
    return { success: false, error: error.message };
  }
};

// Real-time listener for transactions (for admin)
export const subscribeToTransactions = (callback) => {
  const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const transactions = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({ 
        id: doc.id, 
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt
      });
    });
    callback(transactions);
  });
};

// Real-time listener for users (for admin)
export const subscribeToUsers = (callback) => {
  return onSnapshot(collection(db, 'users'), (snapshot) => {
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    callback(users);
  });
};

// ============ AUTHENTICATION FUNCTIONS ============

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const firestoreResult = await getUserFromFirestore(user.uid);
    let userData;
    let isNewUser = false;
    
    if (!firestoreResult.success || !firestoreResult.data) {
      // First time Google sign-in - create user data
      isNewUser = true;
      userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || '',
        phone: '',
        country: '',
        referralCode: '',
        createdAt: new Date().toISOString(),
        balance: 0,
        signInMethod: 'google',
        photoURL: user.photoURL || ''
      };
      
      // Save to Firestore (cloud database)
      await saveUserToFirestore(userData);
      
      // Also save to localStorage for quick access
      localStorage.setItem(`user_${user.uid}`, JSON.stringify(userData));
    } else {
      userData = firestoreResult.data;
      // Update photo URL if changed
      if (user.photoURL && user.photoURL !== userData.photoURL) {
        userData.photoURL = user.photoURL;
        await updateUserInFirestore(user.uid, { photoURL: user.photoURL });
      }
      // Update localStorage
      localStorage.setItem(`user_${user.uid}`, JSON.stringify(userData));
    }
    
    return { success: true, user, userData, isNewUser };
  } catch (error) {
    let message = 'Google sign-in failed. Please try again.';
    
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        message = 'Sign-in popup was closed. Please try again.';
        break;
      case 'auth/popup-blocked':
        message = 'Popup was blocked. Please allow popups for this site.';
        break;
      case 'auth/cancelled-popup-request':
        message = 'Sign-in was cancelled.';
        break;
      case 'auth/account-exists-with-different-credential':
        message = 'An account already exists with this email using a different sign-in method.';
        break;
      default:
        message = error.message;
    }
    
    return { success: false, error: message };
  }
};

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
    
    // Prepare user data
    const userDataToStore = {
      uid: user.uid,
      email: email,
      name: userData.name || '',
      phone: userData.phone || '',
      country: userData.country || '',
      referralCode: userData.referralCode || '',
      createdAt: new Date().toISOString(),
      balance: 0,
      signInMethod: 'email',
      emailVerified: false
    };
    
    // Save to Firestore (cloud database)
    await saveUserToFirestore(userDataToStore);
    
    // Also save to localStorage for quick access
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
    
    // Get user data from Firestore first, then localStorage as fallback
    let userData;
    const firestoreResult = await getUserFromFirestore(user.uid);
    
    if (firestoreResult.success && firestoreResult.data) {
      userData = firestoreResult.data;
      // Update emailVerified status
      if (!userData.emailVerified) {
        userData.emailVerified = true;
        await updateUserInFirestore(user.uid, { emailVerified: true });
      }
    } else {
      // Fallback to localStorage
      const localData = localStorage.getItem(`user_${user.uid}`);
      if (localData) {
        userData = JSON.parse(localData);
      } else {
        // Create basic user data if not found anywhere
        userData = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || '',
          balance: 0,
          emailVerified: true
        };
      }
      // Save to Firestore for future access
      await saveUserToFirestore(userData);
    }
    
    // Update localStorage
    localStorage.setItem(`user_${user.uid}`, JSON.stringify(userData));
    
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
