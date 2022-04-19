<h2 style='color:grey'>React Native</h2>

<details>
<summary>Setup</summary>

Android studio

```js
// Optionnal: Install android studio
```

```js
// npm install -g expo-cli
// npm i react-native-elements
```

formik - yup

```js
// npm i formik
// npm i yup
// npm i email-validator

// NewPostScreen > yup schema > formik
```

navigation - stack

```js
// expo start react-native-gesture-handler
// if !windows => open CLI as admin => set-executionpolicy unrestricted > O
```

<details>
<summary>Formik</summary>

<details>
<summary>postImageForm</summary>

```js
const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL is required"),
    caption: Yup.string().max(2200, "Caption has reached the character limit"),
});

const FormikPostUploader = ({ navigation }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);

    return (
        <Formik
            initialValues={{ caption: "", imageUrl: "" }}
            onSubmit={(values) => {
                console.log(values),
                    console.log("post submitted"),
                    navigation.goBack();
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
```

</details>

<details>
<summary>loginForm</summary>

```js
const LoginForm = (props) => {
    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        password: Yup.string()
            .required()
            .min(6, "Your password has to have at least 6 characters"),
    });

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => console.log(values)}
                validationSchema={loginFormSchema}
                validateOnMount={true}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    isValid,
                }) => (
                    <>
                        <View
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        values.email.length < 1 ||
                                        Validator.validate(values.email)
                                            ? "#ccc"
                                            : "red",
                                },
                            ]}
                        >
                            <TextInput
                                placeholder="Phone number, username or email"
                                placeholderTextColor="#444"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                autoFocus={true}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                values={values.email}
                            ></TextInput>
                        </View>
                        <View
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        1 > values.password.length ||
                                        values.password.length >= 6
                                            ? "#ccc"
                                            : "red",
                                },
                            ]}
                        >
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#444"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType="password"
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                values={values.password}
                            ></TextInput>
                        </View>
                        <View
                            style={{ alignItems: "flex-end", marginBottom: 30 }}
                        >
                            <Text style={{ color: "#6BB0F5" }}>
                                Forgot password?
                            </Text>
                        </View>
                        <Pressable
                            titleSize={20}
                            style={styles.button(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity>
                                <Text style={{ color: "#6BB0F5" }}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

export default LoginForm;

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        padding: 12,
    },
    inputField: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: "#FAFAFA",
        marginBottom: 10,
        borderWidth: 1,
    },
    button: (isValid) => ({
        backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 42,
        borderRadius: 4,
    }),
    buttonText: {
        fontWeight: "600",
        color: "#fff",
        fontSize: 20,
    },
    signupContainer: {
        flexDirection: "row",
        width: "100%",
        marginTop: 20,
        justifyContent: "center",
    },
});
```

</details>

</details>

<details>
<summary>React-Navigation</summary>

```js
// npm i @react-navigation/native
// npm i @react-navigation/stack
// npm i react-native-gesture-handler
// npm i valid-url

// navigation > createStackNavigator() > <Stack.screen>
```

```js
//  <TouchableOpacity onPress={() => navigation.push("NewPostScreen")} >
// navigation.navigate('RouteName')
// navigation.goBack()
// navigation.popToTop() goFirstScreen
```

```js
const screenOptions = {
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "horizontal",
};

  <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={screenOptions}
                //  headerMode="float"
```

</details>

<details>
<summary>Firebase</summary>

```js
// expo install firebase
```

<details>
<summary>CRUD</summary>

Create - addDoc

```js
const colRef = collection(db, "users", currentLoggedInUser.email, "posts");

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
```

Read - getDoc

```js
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
```

getDocs

```js
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
```

update

```js
await updateDoc(docRef, {
    likes_by_users: currentStatus
        ? arrayUnion(auth.currentUser.email)
        : arrayRemove(auth.currentUser.email),
});

// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia"),
});

// Atomically remove a region from the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast"),
});
```

delete

```js
import { doc, deleteDoc } from "firebase/firestore";

await deleteDoc(doc(db, "cities", "DC"));

const cityRef = doc(db, "cities", "BJ");

// Remove the 'capital' field from the document
await updateDoc(cityRef, {
    capital: deleteField(),
});
```

</details>

</details>
