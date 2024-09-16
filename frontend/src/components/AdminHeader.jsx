import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BiSolidHome } from "react-icons/bi";

const AdminHeader = () => {
    const user = useRecoilValue(userAtom);
    const currentDate = new Date().toLocaleDateString();
    const navigate = useNavigate();

    return (
        <header className="bg-gray-100 shadow-md p-4">
            <div className="flex items-center justify-between">
                {/* Email Section */}
                <p className="text-lg font-semibold text-gray-800">
                    Email: {user?.email}
                </p>

                {/* Current Date */}
                <p className="text-lg font-semibold text-gray-800">
                    Date: {currentDate}
                </p>

                {/* Home Button */}
                <button
                    className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-md flex items-center"
                    onClick={() => navigate('/')}
                >
                    <BiSolidHome size={20} />
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
