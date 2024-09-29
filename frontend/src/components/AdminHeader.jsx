import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BiSolidHome, BiBell, BiSearch, BiUser, BiMoon, BiSun } from "react-icons/bi";
import userAtom from "../atoms/userAtom";

const AdminHeader = () => {
    const user = useRecoilValue(userAtom);
    
    const currentDate = new Date().toLocaleDateString();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark'); 
    };

    const handleLogout = () => {
        
    };

    return (
        <header className="bg-gray-50  shadow-md p-4">
            <div className="flex items-center justify-between">
                {/* Email Section */}
                <p className="text-lg font-semibold  text-black">
                    Email: {user?.email}
                </p>

                {/* Current Date */}
                <p className="text-lg font-semibold  text-black">
                    Date: {currentDate}
                </p>

                {/* Search Bar */}
                <div className="flex items-center bg-gray-200  rounded-md">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent p-2 outline-none  text-black"
                    />
                    <BiSearch size={20} className=" text-gray-400 p-2" />
                </div>

                {/* Icons Section */}
                <div className="flex items-center space-x-4">
                    {/* Home Button */}
                    <button
                        className="bg-gray-200 hover:bg-gray-500 text-black p-2 rounded-md flex items-center"
                        onClick={() => navigate('/')}
                    >
                        <BiSolidHome size={20} color="black" />
                    </button>

                    {/* Notifications */}
                    <button className=" text-gray-400">
                        <BiBell size={24} />
                    </button>

                    {/* Dark Mode Toggle */}
                    <button
                        className=" text-gray-400"
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? <BiSun size={24} /> : <BiMoon size={24} />}
                    </button>

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2  text-gray-400"
                            onClick={() => setShowProfileOptions(!showProfileOptions)}
                        >
                            <BiUser size={24} />
                        </button>

                        {/* Dropdown Menu */}
                        {showProfileOptions && (
                            <div className="absolute right-0 mt-2 w-48 bg-white  shadow-lg rounded-md z-20">
                                <ul>
                                    <li
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => navigate('/profile')}
                                    >
                                        Profile Settings
                                    </li>
                                    <li
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
