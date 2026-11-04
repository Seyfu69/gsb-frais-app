import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn, signOut } from "../services/authService";

// 1. Création du contexte
const AuthContext = createContext();

// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  // 3. Restauration de session au démarrage de l'app
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await getCurrentUser();
        const storedToken = await getAuthToken();

        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Erreur lors de la restauration de session :", error);
      } finally {
        setSessionLoading(false);
      }
    };

    restoreSession();
  }, []);

  // 4. Fonction de connexion asynchrone via l'API
  const loginUser = async (login, password) => {
    const data = await signIn(login, password);
    setUser(data.visiteur);
    setToken(data.token);
    return data;
  };

  // 5. Fonction de déconnexion asynchrone
  const logoutUser = async () => {
    await signOut();
    setUser(null);
    setToken(null);
  };

  // 6. Valeurs exposées aux composants enfants
  return (
    <AuthContext.Provider
      value={{ user, token, sessionLoading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 7. Fonctions de lecture d'AsyncStorage (définies en dehors d'AuthProvider)
export const getCurrentUser = async () => {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem("token");
};

// 8. Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
  return useContext(AuthContext);
}