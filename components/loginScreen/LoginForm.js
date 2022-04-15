import { Formik } from "formik";
import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";
import Validator from "email-validator";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const LoginForm = ({ navigation }) => {
    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        password: Yup.string()
            .required()
            .min(6, "Your password has to have at least 6 characters"),
    });

    const onLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential.user);
        } catch (error) {
            console.log(error.message);
            Alert.alert(error.message);
        }
    };
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
                            onPress={() =>
                                onLogin(values.email, values.password)
                            }
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.push("SignupScreen")}
                            >
                                <Text style={{ color: "#6BB0F5" }}>
                                    {` Sign Up`}
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
