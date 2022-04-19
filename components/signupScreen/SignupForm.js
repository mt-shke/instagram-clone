import { Formik } from "formik";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Alert,
} from "react-native";
import Validator from "email-validator";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const SignupForm = ({ navigation }) => {
    const signupFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        username: Yup.string().required().min(2, "A username is required"),
        password: Yup.string()
            .required()
            .min(6, "Your password has to have at least 6 characters"),
    });

    const getRandomProfilePicture = async () => {
        const response = await fetch("https://randomuser.me/api");
        const data = await response.json();
        return data.results[0].picture.large;
    };

    const onSignup = async (email, password, username) => {
        try {
            const createdUser = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const docRef = await setDoc(
                doc(db, "users", createdUser.user.email.toString()),
                {
                    owner_uid: createdUser.user.uid,
                    username: username,
                    email: createdUser.user.email,
                    profile_picture: await getRandomProfilePicture(),
                }
            );
        } catch (error) {
            Alert.alert(error.message);
            console.log(error.message);
        }
    };

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={(values) => console.log(values)}
                validationSchema={signupFormSchema}
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
                                placeholder="Email"
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
                                        values.username.length == 1 ||
                                        values.username.length == 2
                                            ? "red"
                                            : "#ccc",
                                },
                            ]}
                        >
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor="#444"
                                autoCapitalize="none"
                                textContentType="username"
                                autoFocus={false}
                                onChangeText={handleChange("username")}
                                onBlur={handleBlur("username")}
                                values={values.username}
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

                        <Pressable
                            titleSize={20}
                            style={styles.button(isValid)}
                            onPress={() =>
                                onSignup(
                                    values.email,
                                    values.password,
                                    values.username
                                )
                            }
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>{`Sign Up`}</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.push("LoginScreen")}
                            >
                                <Text style={{ color: "#6BB0F5" }}>
                                    {` Sign In`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

export default SignupForm;

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
        marginTop: 30,
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
