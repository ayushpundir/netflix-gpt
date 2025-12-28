import Header from "./Header";
import { useState } from "react";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
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
                <form className="w-full max-w-md bg-black/80 p-10 text-white rounded-lg">
                    <h1 className="font-bold text-3xl mb-6">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {!isSignInForm && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="p-4 mb-4 w-full bg-gray-700 rounded"
                        />
                    )}

                    <input
                        type="text"
                        placeholder="Email Address"
                        className="p-4 mb-4 w-full bg-gray-700 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="p-4 mb-6 w-full bg-gray-700 rounded"
                    />

                    <button className="p-4 mb-4 bg-red-700 w-full rounded-lg font-semibold">
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