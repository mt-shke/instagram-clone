import { View, SafeAreaView, StyleSheet, StatusBar, Image } from "react-native";
import LoginForm from "../components/loginScreen/LoginForm";

const INSTAGRAM_LOGO =
    "https://img.icons8.com/stickers/2x/instagram-new--v2.png";

const LoginScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={{ uri: INSTAGRAM_LOGO }} />
            </View>
            <LoginForm navigation={navigation} />
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    logoContainer: {
        alignItems: "center",
        marginVertical: 30,
    },
    logo: {
        width: 100,
        height: 100,
    },
});
