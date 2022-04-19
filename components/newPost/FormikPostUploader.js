import { View, Text, Image, TextInput, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { auth, db } from "../../firebase";
import {
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
    setDoc,
    serverTimestamp,
    addDoc,
} from "firebase/firestore";

const PLACEHOLDER_IMG = "https://img.icons8.com/stickers/2x/ios-photos.png";
// https://img.icons8.com/stickers/2x/among-us.png

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL is required"),
    caption: Yup.string().max(2200, "Caption has reached the character limit"),
});

const FormikPostUploader = ({ navigation }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUsername = async () => {
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return setCurrentLoggedInUser({
                username: userData.username,
                email: userData.email,
                profile_picture: userData.profile_picture,
            });
        } else {
            return console.log("No such document!");
        }
    };

    useEffect(() => {
        getUsername();
    }, []);

    const uploadPostToFirebase = async (imageUrl, caption) => {
        try {
            const colRef = collection(
                db,
                "users",
                currentLoggedInUser.email,
                "posts"
            );

            const response = await addDoc(colRef, {
                username: currentLoggedInUser.username,
                profile_picture: currentLoggedInUser.profile_picture,
                imageUrl,
                caption,
                createdAt: serverTimestamp(),
                likes_by_users: [],
                owner_uid: auth.currentUser.uid,
                owner_email: auth.currentUser.email,
                comments: [],
            });

            if (!response) {
                throw new Error("Cannot add a new story");
            }
            return navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik
            initialValues={{ caption: "", imageUrl: "" }}
            onSubmit={(values) => {
                console.log("post submitted"),
                    uploadPostToFirebase(values.imageUrl, values.caption);
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({
                handleBlur,
                handleChange,
                handleSubmit,
                isValid,
                values,
                errors,
            }) => (
                <>
                    <View
                        style={{
                            margin: 20,
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}
                    >
                        <Image
                            source={{
                                uri: validUrl.isUri(thumbnailUrl)
                                    ? thumbnailUrl
                                    : PLACEHOLDER_IMG,
                            }}
                            style={{ width: 100, height: 100 }}
                        />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <TextInput
                                style={{ color: "white", fontSize: 20 }}
                                placeholder="Write a caption..."
                                placeholderTextColor="gray"
                                multiline={true}
                                onChangeText={handleChange("caption")}
                                onBlur={handleBlur("caption")}
                                value={values.caption}
                            ></TextInput>
                        </View>
                    </View>
                    <Divider
                        width={0.2}
                        orientation="horizontal"
                        color="grey"
                    />
                    <TextInput
                        onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        style={{ color: "white", fontSize: 18 }}
                        placeholder="Enter image url"
                        placeholderTextColor="gray"
                        onChangeText={handleChange("imageUrl")}
                        onBlur={handleBlur("imageUrl")}
                        value={values.imageUrl}
                    ></TextInput>
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: "red" }}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Button
                        onPress={handleSubmit}
                        title="Share"
                        disabled={!isValid}
                    ></Button>
                </>
            )}
        </Formik>
    );
};

export default FormikPostUploader;
