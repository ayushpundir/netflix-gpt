import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () =>{

    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
            {
                path: "/",
                element: <Login/>,
            },{
                path: "/browse",
                element: <Browse/>,
            }
        ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log("user logged in");
            // ...
            dispatch(addUser({uid : uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL}));
            //navigate("/browse"); can't be done here
            } else {
                // User is signed out
                // ...
                dispatch(removeUser());
                //navigate("/"); can't be done here 
            }
        });
    }, []);

    return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
    );
};
export default Body;