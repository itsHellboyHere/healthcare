import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useAuthContext } from "../context/AuthContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginImage from "../assets/login.png";

const Login = () => {
    const { login, loading } = useLogin();
    const { authUser } = useAuthContext();
    console.log(authUser);

    const [username, setUsername] = useState(""); // changed from email to username
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <main className="max-w-4xl mx-auto p-10">
            <div className="flex w-full justify-center items-center mt-10 p-4 space-x-2">
                <div className="w-1/2 hidden sm:block">
                    <img
                        src={loginImage}
                        alt="Login visual"
                        className="w-full h-full object-cover rounded-l"
                    />
                </div>

                <div
                    className="w-full bg-gray-100 rounded-md sm:w-1/2"
                    style={{
                        boxShadow:
                            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                    }}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-md mx-auto space-y-4 p-4"
                    >
                        <p className="font-semibold text-xl text-center mb-2 text-gray-700 hover:text-gray-500">
                            pdf
                            <span className="text-xl text-sky-500 font-bold hover:text-sky-700">
                                Uploader
                            </span>
                        </p>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full p-2 border rounded"
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-2 border rounded pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-3 text-gray-800"
                                tabIndex={-1}
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <p className="text-sm font-medium text-gray-700">
                            New Here?{" "}
                            <Link
                                to={"/signup"}
                                className="text-blue-700 hover:text-blue-500"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
