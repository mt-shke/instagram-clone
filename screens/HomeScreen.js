import {
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
} from "react-native";
import BottomTabs, { bottomTabsIcons } from "../components/home/BottomTabs";
import Header from "../components/home/Header";
import Post from "../components/home/Post";
import Stories from "../components/home/Stories";
import { POSTS } from "../data/posts";

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.Container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {POSTS.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </ScrollView>
            <BottomTabs icons={bottomTabsIcons} />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: "black",
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    Text: {
        color: "white",
    },
});
