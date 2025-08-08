import React, { useState } from 'react'
import axios from '../utils/axios'
import toast from 'react-hot-toast'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom'
import loginImage from "../assets/login.png"

const Signup = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(null)
            const res = await axios.post('auth/sign-up/', user);
            toast.success(res.data.message || 'Signed up successfully');
            navigate('/login');
        } catch (err) {
            console.log(err)
            setError(err?.response?.data?.error || 'Failed to signup')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='max-w-4xl p-10 mx-auto'>
            <h2 className='text-2xl text-gray-600 font-bold mb-4 text-center mt-2'>Sign Up</h2>

            <div className="flex w-full justify-center items-center mt-10 p-4 space-x-2">
                <div className="w-1/2 hidden sm:block">
                    <img
                        src={loginImage}
                        alt="Login visual"
                        className="w-full h-full object-cover rounded-l"
                    />
                </div>
                <div className="w-full bg-gray-100 rounded-md sm:w-1/2"
                    style={{
                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
                    }}
                >
                    <form className="max-w-md mx-auto space-y-4 p-4" onSubmit={handleSubmit}>
                        <p className="font-semibold text-xl text-center mb-2 text-gray-700 hover:text-gray-500">
                            store<span className='text-xl text-sky-500 font-bold hover:text-sky-700'>App</span>
                        </p>
                        {error && <p className='text-sm text-red-700'>{error}</p>}
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            placeholder="Enter your Username"
                            className="w-full p-2 border rounded"
                            required
                        />
                        <div className="relative">
                            <input
                                name='password'
                                type={showPassword ? "text" : "password"}
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full p-2 border rounded pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-3 text-gray-600"
                                tabIndex={-1}
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Signup"}
                        </button>
                        <p className="text-sm font-medium text-gray-700">
                            Already have an account? <Link to={"/login"} className="text-blue-700 hover:text-blue-500">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Signup
