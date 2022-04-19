import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../../firebase";

const Header = ({ navigation }) => {
    const handleSignOut = async () => {
        try {
            auth.signOut();
            console.log("signed out successfully");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSignOut}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/header-logo-black.png")}
                />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.push("NewPostScreen")}
                >
                    <Image
                        style={styles.icon}
                        source={{
                            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={styles.icon}
                        source={{
                            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image
                        style={styles.icon}
                        source={{
                            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 20,
    },
    iconsContainer: {
        flexDirection: "row",
    },
    logo: {
        resizeMode: "contain",
        width: 100,
        height: 50,
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: "contain",
    },
    unreadBadge: {
        backgroundColor: "#FF3250",
        position: "absolute",
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
    },
    unreadBadgeText: {
        color: "white",
        fontWeight: "600",
    },
});
