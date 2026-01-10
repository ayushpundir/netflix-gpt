import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
const Header = () => {


    const user = useSelector((store) => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Sign out logic here
        signOut(auth).then(() => {
        // Sign-out successful.        
        }).catch((error) => {
        // An error happened.
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            // ...
            dispatch(addUser({uid : uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL}));
            navigate("/browse");
            } else {
                // User is signed out
                // ...
                dispatch(removeUser());
                navigate("/");
            }
        });

        return () => unsubscribe(); // when the component unmounts this removes the listener
    }, []);

    return (
    <div className="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex justify-between">
        <img className = "w-44"
        src="/Netflix_Logo_PMS.png"
        alt="LOGO" />

        {user && (<div className="flex p-2">
            <img
            className = "w-12 h-12 "
            src = {user.photoURL}
            alt="userIcon" />
            <button onClick={handleSignOut} className="font-bold text-white">Sign out</button>
        </div>)}
    </div>
    );
};
export default Header;
