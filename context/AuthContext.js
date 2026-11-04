import { createContext, useContext, useState } from "react";

// Création du contexte
const AuthContext = createContext ();

// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider ({  children  }) {
    // État local pour stocker l’utilisateur (null = non connecté)
    const [user, setUser] = useState(null);

    // 3. Fonction de connexion
    const loginUser = (login, password) => {
        if (login === "Andre" && password === "secret") {
            setUser(login);
            return true;
        }
        return false;
        
    }

    // 4. Fonction de déconnexion
    const logoutUser = () => {
        // ToDo : réinitialiser la valeur de l’état à null
        const [user, setUser] = null;
    };

    
    // 5. Valeurs exposées aux composants enfants et rendu des composants enfants avec {children}
    return (
<       AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
);
}
export function useAuth() {
    return useContext (AuthContext);
}
