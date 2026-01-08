import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        // Sign out logic here
        signOut(auth).then(() => {
        // Sign-out successful.
        navigate("/");
        
        }).catch((error) => {
        // An error happened.
        });
    }


    return (
    <div className="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex justify-between">
        <img className = "w-44"
        src="/Netflix_Logo_PMS.png"
        alt="LOGO" />

        {user && (<div className="flex p-2">
            <img
            className = "w-12 h-12 "
            src="/userIcon.png" 
            //src = {user.photoURL}
            alt="userIcon" />
            <button onClick={handleSignOut} className="font-bold text-white">Sign out</button>
        </div>)}
    </div>
    );
};
export default Header;
