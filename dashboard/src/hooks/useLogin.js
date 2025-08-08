import { useState } from "react";
import axios from "../utils/axios";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAccessToken } = useAuthContext();

    const login = async (username, password) => {
        if (!username || !password) {
            toast.error("Username and password are required.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post("/auth/login/", {
                username,
                password,
            });

            const { access } = data;
            setAccessToken(access);

            toast.success("Logged in successfully!");
        } catch (err) {
            toast.error(err.response?.data?.detail || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
};

export default useLogin;