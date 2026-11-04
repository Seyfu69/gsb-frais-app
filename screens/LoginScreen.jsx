import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import loginStyles from "../styles/loginStyles";
import Navbar from "../components/Navbar";


export default function LoginScreen () {
    // 1. États locaux pour les champs du formulaire
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    // 2. Récupération de la fonction loginUser depuis le contexte
    const { loginUser } = useAuth();

    // 3. Hook pour la redirection après connexion
    const navigation = useNavigation();

    // 4. Déclaration de la fonction handleSubmit
    const handleSubmit = () => {
        // Appel de la fonction loginUser avec login et password
        if (loginUser (login, password)) {
            navigation.navigate("Dashboard"); // Redirige vers Dashboard si succès
        } else {
            Alert.alert("Indentifiant incorrects"); // Affiche une erreur si échec
        }
    };




    // 5. Rend le formulaire
  return (
    <View style={loginStyles.container}>
      <Navbar />

      <View style={loginStyles.content}>
        <Text style={loginStyles.title}>Connexion</Text>

        <View style={loginStyles.fieldGroup}>
          <Text style={loginStyles.label}>Login :</Text>
          <TextInput
            style={loginStyles.input}
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
          />
        </View>

        <View style={loginStyles.fieldGroup}>
          <Text style={loginStyles.label}>Password :</Text>
          <TextInput
            style={loginStyles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Pressable style={loginStyles.button} onPress={handleSubmit}>
          <Text style={loginStyles.buttonText}>Se connecter</Text>
        </Pressable>
      </View>
    </View>
  );
}


