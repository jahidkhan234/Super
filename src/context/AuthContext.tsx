import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

export interface User {
  uid: string;
  username: string;
  email: string;
  balance: number;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  requireAuth: (callback: () => void) => void;
  updateUserBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy fallback for preview when Firebase is not configured
const DUMMY_USER: User = { uid: "123", username: "DemoUser", email: "demo@test.com", balance: 500, role: "user" };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (!auth) {
      // Firebase not configured yet, use local storage fallback
      const saved = localStorage.getItem("mock_user");
      if (saved) setUser(JSON.parse(saved));
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        
        // Listen to real-time balance updates
        const unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUser({
              uid: firebaseUser.uid,
              username: data.username,
              email: firebaseUser.email || "",
              balance: data.balance || 0,
              role: data.role || "user"
            });
          }
        });
        
        return () => unsubDoc();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const requireAuth = (callback: () => void) => {
    if (user) {
      callback();
    } else {
      setPendingAction(() => callback);
      setIsAuthModalOpen(true);
    }
  };
  
  const updateUserBalance = (newBalance: number) => {
    if (user) {
      setUser({ ...user, balance: newBalance });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthModalOpen,
      openAuthModal: () => setIsAuthModalOpen(true),
      closeAuthModal: () => {
        setIsAuthModalOpen(false);
        setPendingAction(null);
      },
      requireAuth,
      updateUserBalance
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
