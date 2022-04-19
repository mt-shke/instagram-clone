import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
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
import { auth, db } from "../firebase";
import { getDocs } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        GetPosts();
    }, []);

    const GetPosts = async () => {
        const querySnapshot = await getDocs(
            collection(db, "users", auth.currentUser.email, "posts")
        );
        if (!querySnapshot) return;
        // const docsId = querySnapshot.docs.map((doc) => doc.id);

        const fetchedPosts = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            postId: doc.id,
        }));

        setPosts(fetchedPosts);
    };

    return (
        <SafeAreaView style={styles.Container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (
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
