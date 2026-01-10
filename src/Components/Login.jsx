import { checkValidData } from "../utils/validate";
import Header from "./Header";
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"; // from firebase docs
import { auth} from "../utils/firebase"; // import auth from firebase.js
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

	const email = useRef(null); // it will create a reference and now will refer it to input box
	const password = useRef(null);
	const name = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

	const handleButtonClick = () => {
		// 1. Safely get the name value (only if it exists)
		const nameValue = name.current?.value || null; //if name input box is not there then it will be null
		const emailValue = email.current.value;
		const passwordValue = password.current.value;

		// 2. Pass values to your validation function
		const message = checkValidData(nameValue, emailValue, passwordValue);
		
		setErrorMessage(message);

		if (message) return; // If there's an error, stop here

		// Proceed to Firebase Sign In / Sign Up logic...
		if(!isSignInForm){
			// Sign Up Logic
			createUserWithEmailAndPassword(auth, emailValue, passwordValue)
			.then((userCredential) => {
				// Signed up 
				const user = userCredential.user;
				// ...
                updateProfile(user, {
                displayName: nameValue, photoURL: "userIcon.png"
                }).then(() => {
                // Profile updated!
                // ...

                const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid : uid,email: email, displayName: displayName, photoURL: photoURL}));
                // Clear refs
                email.current.value = "";
                password.current.value = "";
                if(name.current) name.current.value = "";

                }).catch((error) => {
                // An error occurred
                // ...
                setErrorMessage(error.code + ": " + error.message);
                });

			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
				setErrorMessage(error.code + ": " + error.message);
			});

		}
		else{
			// Sign In Logic
			signInWithEmailAndPassword(auth, emailValue, passwordValue)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				// ...
				//console.log(user);
                email.current.value = "";
                password.current.value = "";
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setErrorMessage(error.code + ": " + error.message);
			});
			}
	};

    return (
        <div className="relative min-h-screen">
            <Header />

            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <img
                    className="h-full w-full object-cover"
                    src="/bg.jpg"
                    alt="background"
                />
            </div>

            {/* Form Wrapper */}
            <div className="flex justify-center items-center min-h-screen px-4">
                <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md bg-black/80 p-10 text-white rounded-lg">
                    <h1 className="font-bold text-3xl mb-6">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {!isSignInForm && (
                        <input
							ref ={name}
                            type="text"
                            placeholder="Full Name"
                            className="p-4 mb-4 w-full bg-gray-700 rounded"
                        />
                    )}

                    <input
						ref ={email}
                        type="text"
                        placeholder="Email Address"
                        autoComplete={isSignInForm ? "current-email" : "new-email"} // Add this line
                        className="p-4 mb-4 w-full bg-gray-700 rounded"
                    />

                    <input
						ref ={password}
                        type="password"
                        placeholder="Password"
                        autoComplete={isSignInForm ? "current-password" : "new-password"} // Add this line
                        className="p-4 mb-6 w-full bg-gray-700 rounded"
                    />
					<p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                    <button className="p-4 mb-4 bg-red-700 w-full rounded-lg font-semibold" onClick={handleButtonClick}>
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <p
                        className="text-sm text-gray-300 cursor-pointer hover:underline"
                        onClick={toggleSignInForm}
                    >
                        {isSignInForm
                            ? "New to Netflix? Sign Up now."
                            : "Already have an account? Sign In here."}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;