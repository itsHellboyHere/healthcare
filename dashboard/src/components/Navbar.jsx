import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
    const { accessToken } = useAuthContext();
    const { logout, loading } = useLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b shadow-sm fixed top-0 w-full z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <div>
                    <p className="font-semibold text-xl text-center mb-2 text-gray-700 hover:text-gray-500">
                        pdf
                        <span className="text-xl text-sky-500 font-bold hover:text-sky-700">
                            Uploader
                        </span>
                    </p>
                </div>

                {accessToken && (
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
