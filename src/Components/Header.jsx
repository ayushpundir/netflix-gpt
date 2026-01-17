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
        <div className="absolute w-full px-4 md:px-8 py-2 md:py-4 bg-linear-to-b from-black z-30 flex justify-between items-center">
            <img className="w-28 md:w-44" src="/Netflix_Logo_PMS.png" alt="LOGO" />

            {user && (
                <div className="flex items-center gap-2 md:gap-4">
                    <button 
                        onClick={handleGptSearchButton}
                        className="py-1.5 px-2 md:py-2 md:px-4 bg-purple-800 text-white text-xs md:text-base rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-md flex items-center gap-1 md:gap-2"
                    >
                        {showGptSearch ? "Home" : "✨ AI "}
                        <span className="hidden md:inline">{showGptSearch ? "page" : " Search"}</span>
                    </button>

                    <div className="flex items-center gap-2 md:gap-4 bg-black/30 p-1.5 md:p-2 rounded-lg backdrop-blur-sm">
                        <img className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover border border-gray-600" src={user.photoURL} alt="userIcon" />
                        <button 
                            onClick={handleSignOut} 
                            className="font-semibold text-white text-xs md:text-base bg-red-600 px-2 py-1.5 md:px-4 md:py-2 rounded-md hover:bg-red-700 transition-colors duration-200 shadow-lg"
                        >
                            <span className="md:hidden">Exit</span>
                            <span className="hidden md:inline">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Header;