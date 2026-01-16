// Header.jsx
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
// Import the new action here
import { toggleGptSearchView, clearGptMovieResult } from "../utils/gptSlice";

const Header = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const showGptSearch = useSelector((store) => store.gpt.showGptSearchPage);

    const handleSignOut = () => {
        signOut(auth).catch((error) => console.error(error));
    };

    const handleGptSearchButton = () => {
        dispatch(toggleGptSearchView());
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL }));
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                
                // Clear GPT state completely on sign out
                dispatch(clearGptMovieResult());
                
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <div className="absolute w-full px-8 py-4 bg-linear-to-b from-black z-30 flex flex-col md:flex-row justify-between items-center">
            <img className="w-44 mb-4 md:mb-0" src="/Netflix_Logo_PMS.png" alt="LOGO" />

            {user && (
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleGptSearchButton}
                        className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-md flex items-center gap-2"
                    >
                        {showGptSearch ? "Homepage" : "✨ AI Search"}
                    </button>

                    <div className="flex items-center gap-4 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
                        <img className="w-10 h-10 rounded-md object-cover border border-gray-600" src={user.photoURL} alt="userIcon" />
                        <button 
                            onClick={handleSignOut} 
                            className="font-semibold text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 shadow-lg"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Header;