import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import navbarStyles from "../styles/navbarStyles";

function Navbar () {
    const navigation = useNavigation ();

    return (
        <View style={navbarStyles.container}>
            <View style={navbarStyles.group}>
                <Pressable onPress={ () => navigation.navigate("Home")}>
                    <Text style={navbarStyles.link}>Accueil</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Dashboard")}>
                    <Text style={navbarStyles.link}>Tableau de board</Text>
                </Pressable>
            </View>
            <View style={navbarStyles.group}>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={navbarStyles.link}>Connexion</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Navbar;