import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { auth, db } from "../../firebase";

const Post = ({ post }) => {
    const handleLike = async (post) => {
        try {
            const currentStatus = !post.likes_by_users.includes(
                auth.currentUser.email
            );

            const docRef = doc(
                db,
                "users",
                auth.currentUser.email,
                "posts",
                post.postId
            );

            await updateDoc(docRef, {
                likes_by_users: currentStatus
                    ? arrayUnion(auth.currentUser.email)
                    : arrayRemove(auth.currentUser.email),
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={{ marginBottom: 30 }}>
            <Divider color="grey" width={1} orientation="horizontal" />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PostFooter post={post} handleLike={handleLike} />
                <Likes post={post} />
            </View>
            <Caption post={post} />
            <CommentsSection post={post} />
        </View>
    );
};

export default Post;

const PostHeader = ({ post }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 5,
                alignItems: "center",
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                    source={{ uri: post.profile_picture }}
                    style={styles.authorIcon}
                />
                <Text
                    style={{ color: "white", marginLeft: 5, fontWeight: "600" }}
                >
                    {post.user}
                </Text>
            </View>
            <Text style={{ color: "white", fontWeight: "600" }}>...</Text>
        </View>
    );
};

const PostImage = ({ post }) => (
    <View style={{ width: "100%", height: 450 }}>
        <Image
            source={{ uri: post.imageUrl }}
            style={{ height: "100%", resizeMode: "cover" }}
        />
    </View>
);

const PostFooter = ({ handleLike, post }) => (
    <View style={{ flexDirection: "row" }}>
        <View style={styles.leftFooterIconsContainer}>
            <TouchableOpacity onPress={() => handleLike(post)}>
                <Image
                    style={styles.footerIcon}
                    source={{
                        uri: post.likes_by_users.includes(
                            auth.currentUser.email
                        )
                            ? postFooterIcons[0].likedImageUrl
                            : postFooterIcons[0].imageUrl,
                    }}
                />
            </TouchableOpacity>
            <Icon
                imgStyle={styles.footerIcon}
                imgUrl={postFooterIcons[1].imageUrl}
            />
            <Icon
                imgStyle={[styles.footerIcon, styles.shareIcon]}
                imgUrl={postFooterIcons[2].imageUrl}
            />
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Icon
                imgStyle={[styles.footerIcon, styles.shareIcon]}
                imgUrl={postFooterIcons[3].imageUrl}
            />
        </View>
    </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
);

const Likes = ({ post }) => (
    <View
        style={{
            flexDirection: "row",
            marginTop: 4,
        }}
    >
        <Text style={{ color: "white", fontWeight: "600" }}>
            {post.likes_by_users.length.toLocaleString("en")} likes
        </Text>
    </View>
);

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: "white" }}>
            <Text style={{ fontWeight: "600" }}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
);

const CommentsSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {!!post.comments.length && (
            <Text style={{ color: "gray" }}>
                View{post.comments.length > 1 ? " all " : ""}
                {post.comments.length}
                {post.comments.length > 1 ? " comments" : " comment"}
            </Text>
        )}
        <Comments comments={post.comments} />
    </View>
);

const Comments = ({ comments }) => (
    <>
        {comments.map((comment, index) => (
            <View key={index} style={{ flexDirection: "row", marginTop: 15 }}>
                <Text style={{ color: "white" }}>
                    <Text style={{ fontWeight: "600" }}>{comment.user}</Text>
                    {` `}
                    <Text> {comment.comment}</Text>
                </Text>
            </View>
        ))}
    </>
);

const styles = StyleSheet.create({
    authorIcon: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: "#ff8501",
    },
    image: {
        width: "100%",
        height: 400,
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    shareIcon: {},
    leftFooterIconsContainer: {
        flexDirection: "row",
        width: "32%",
        justifyContent: "space-between",
    },
});

const postFooterIcons = [
    {
        name: "Like",
        imageUrl: "https://img.icons8.com/windows/2x/ffffff/like.png",
        likedImageUrl:
            "https://img.icons8.com/material-sharp/2x/ffffff/like.png",
    },
    {
        name: "Comment",
        imageUrl:
            "https://img.icons8.com/external-sbts2018-outline-sbts2018/2x/ffffff/external-comment-social-media-basic-1-sbts2018-outline-sbts2018.png",
    },
    {
        name: "Share",
        imageUrl:
            "https://img.icons8.com/external-flatart-icons-outline-flatarticons/2x/ffffff/external-send-instagram-flatart-icons-outline-flatarticons.png",
    },
    {
        name: "Save",
        imageUrl: "https://img.icons8.com/ios-filled/344/ffffff/save--v1.png",
    },
];
