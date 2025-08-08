import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { logout } = useAuthContext(); // use logout from context

    const handleLogout = async () => {
        setLoading(true);
        try {
            logout();
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed");
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout: handleLogout };
};

export default useLogout;
