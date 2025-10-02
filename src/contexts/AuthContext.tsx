import  { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { auth, db, functions } from "../firebaseConfig";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { logUserLogin, logUserLogout } from "../utils/auditLogger";

export interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  returnUrl: string | null;
  isPremiumRedirect: boolean;
  setReturnUrl: (url:string | null) => void;
  setIsPremiumRedirect: (value: boolean) => void;
  refreshUserProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  role: string;
  photoURL?: string;
  isPremium?: boolean;
  purchasedCourses?: string[];
  authProvider?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [returnUrl, setReturnUrl] = useState<string | null>(null);
  const [isPremiumRedirect, setIsPremiumRedirect] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const previousUser = currentUser;
      setCurrentUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          }
          
          // Log login event (only if this is a new login, not on page refresh)
          if (!previousUser) {
            await logUserLogin({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName
            });

            // Send welcome email to old users (not new signups)
            console.log('🔍 Email trigger check:', {
              justSignedUp: localStorage.getItem('justSignedUp'),
              hasUserProfile: !!userProfile,
              userProfile: userProfile ? { fullName: userProfile.fullName, email: userProfile.email } : null,
              userAuth: { displayName: user.displayName, email: user.email }
            });

            if (localStorage.getItem('justSignedUp') !== 'true') {
              // Use userProfile if available, otherwise fall back to Firebase Auth data
              const userName = userProfile?.fullName || user.displayName || 'User';
              const userEmail = userProfile?.email || user.email;

              if (userEmail) {
                console.log('📧 Sending welcome email to:', userEmail, 'with name:', userName);
                try {
                  const sendWelcomeEmailCallable = httpsCallable(functions, 'sendWelcomeEmail');
                  const result = await sendWelcomeEmailCallable({ userName, userEmail });
                  console.log('✅ Email send result:', result);
                } catch (error) {
                  console.error('❌ Email send error:', error);
                }
              } else {
                console.log('🚫 No email address available');
              }
            } else {
              console.log('🚫 Email not sent - just signed up');
              localStorage.removeItem('justSignedUp');
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const refreshUserProfile = async () => {
    if (currentUser) {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        }
      } catch (error) {
        console.error("Error refreshing user profile:", error);
      }
    }
  };

  const logout = async () => {
    try {
      // Log logout event before signing out
      if (currentUser) {
        await logUserLogout({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName
        });
      }
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    returnUrl,
    isPremiumRedirect,
    setReturnUrl,
    setIsPremiumRedirect,
    refreshUserProfile,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}