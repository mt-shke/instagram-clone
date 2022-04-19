import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { SignedInStack, SignedOutStack } from "./navigation";

const AuthNavigation = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    const userHandler = (user) =>
        user ? setCurrentUser(user) : setCurrentUser(null);

    useEffect(() => auth.onAuthStateChanged((user) => userHandler(user)), []);

    return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
