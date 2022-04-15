import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState("Home");

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image
                source={{
                    uri: activeTab === icon.name ? icon.active : icon.inactive,
                }}
                style={[
                    styles.icon,
                    icon.name === "Profil" ? styles.profilePic() : null,
                    activeTab === "Profil" && icon.name === activeTab
                        ? styles.profilePic(activeTab)
                        : null,
                ]}
            />
        </TouchableOpacity>
    );
    return (
        <View style={styles.wrapper}>
            <Divider width={1} />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    );
};

export default BottomTabs;

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        width: "100%",
        bottom: "0%",
        zIndex: 999,
        backgroundColor: "#000",
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 50,
        paddingTop: 10,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 50,
        paddingTop: 10,
    },
    icon: {
        width: 30,
        height: 30,
    },
    profilePic: (activeTab = "") => ({
        borderRadius: 50,
        borderWidth: activeTab === "Profil" ? 2 : 0,
        borderColor: "#fff",
    }),
});

export const bottomTabsIcons = [
    {
        name: "Home",
        active: "https://img.icons8.com/fluency-systems-filled/2x/ffffff/home.png",
        inactive:
            "https://img.icons8.com/fluency-systems-regular/2x/ffffff/home.png",
    },
    {
        name: "Search",
        active: "https://img.icons8.com/fluency-systems-filled/2x/ffffff/search.png",
        inactive:
            "https://img.icons8.com/fluency-systems-regular/2x/ffffff/search.png",
    },
    {
        name: "Reels",
        active: "https://img.icons8.com/ios-filled/2x/ffffff/instagram-reel.png",
        inactive: "https://img.icons8.com/ios/2x/ffffff/instagram-reel.png",
    },
    {
        name: "Shop",
        active: "https://img.icons8.com/pastel-glyph/2x/ffffff/shopping-basket-2.png",
        inactive:
            "https://img.icons8.com/pastel-glyph/2x/ffffff/shopping-basket-2--v2.png",
    },
    {
        name: "Profil",
        active: "https://minimaltoolkit.com/images/randomdata/male/52.jpg",
        inactive: "https://minimaltoolkit.com/images/randomdata/male/52.jpg",
    },
];
