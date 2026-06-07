import { createContext, useState, useContext, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen for Firebase login state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || currentUser.email.split('@')[0], // Fallback if no name
          email: currentUser.email,
          uid: currentUser.uid
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 1. Google Login
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    setIsAuthModalOpen(false);
  };

  // 2. Manual Email Sign Up
  const registerWithEmail = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Attach their typed name to their Firebase profile
    await updateProfile(userCredential.user, { displayName: name });
    
    // Update local state immediately
    setUser({
      name: name,
      email: userCredential.user.email,
      uid: userCredential.user.uid
    });
    setIsAuthModalOpen(false);
  };

  // 3. Manual Email Login
  const loginWithEmail = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    signOut(auth);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{ 
      user, loginWithGoogle, registerWithEmail, loginWithEmail, logout, isAuthModalOpen, openAuthModal, closeAuthModal 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};