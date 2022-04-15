import { View, SafeAreaView, StyleSheet, StatusBar, Image } from "react-native";
import SignupForm from "../components/signupScreen/SignupForm";

const INSTAGRAM_LOGO =
    "https://img.icons8.com/stickers/2x/instagram-new--v2.png";

const SignupScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={{ uri: INSTAGRAM_LOGO }} />
            </View>
            <SignupForm navigation={navigation} />
        </SafeAreaView>
    );
};

export default SignupScreen;

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

    input: {
        borderColor: "#b1b1b2",
        color: "#747475",
        backgroundColor: "#f4f3f5",
        borderWidth: 1,
        margin: 10,
        padding: 8,
    },
    forgotButton: {
        marginRight: 10,
        marginLeft: "auto",
        color: "#82abd2",
    },
    logInButton: {
        backgroundColor: "#82abd2",
        color: "white",
    },
});
