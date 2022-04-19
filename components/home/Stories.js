import { View, Text, ScrollView, Image } from "react-native";
import { USERS } from "../../data/users";

const Stories = (props) => {
    return (
        <View style={{ marginBottom: 13 }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {USERS.map((story, index) => (
                    <View
                        key={story.image + index}
                        style={{ alignItems: "center" }}
                    >
                        <Image
                            source={{ uri: story.image }}
                            style={styles.story}
                        />
                        <Text
                            style={{
                                color: "white",
                            }}
                        >
                            {story.user.length > 11
                                ? story.user.slice(0, 6).toLowerCase() + "..."
                                : story.user.toLowerCase()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Stories;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 18,
        borderWidth: 3,
        borderColor: "#ff8501",
    },
});
