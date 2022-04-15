// import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import NewPostScreen from "./screens/NewPostScreen";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
    // gestureEnabled: true,
    // gestureDirection: "horizontal",
};

const SignedInStack = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SignupScreen"
                screenOptions={screenOptions}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default SignedInStack;
