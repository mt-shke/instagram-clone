import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) return;
        if (user) return;
        getUser();
    }, [user]);

    const getUser = async () => {
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return setUser({
                username: userData.username,
                email: userData.email,
                profile_picture: userData.profile_picture,
            });
        } else {
            return console.log("No such document!");
        }
    };

    return { user };
};
