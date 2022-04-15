import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import AddNewPost from "../components/newPost/AddNewPost";

const NewPostScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.Container}>
            <AddNewPost navigation={navigation} />
        </SafeAreaView>
    );
};

export default NewPostScreen;

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
