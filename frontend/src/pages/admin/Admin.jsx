import Sidebar from "../../components/Sidebar";
import Tabs from "../../components/Tabs";
import ProductsReport from "../../components/PeroductsReport";
import AdminHeader from "../../components/AdminHeader"; // Import AdminHeader
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import { Navigate } from "react-router-dom";

const Admin = () => {
    const user = useRecoilValue(userAtom);

    if (!user?.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Admin Header */}
                <AdminHeader />

                {/* Admin Page Content */}
                <div className="p-4">
                    <Tabs />
                    <ProductsReport />
                </div>
            </div>
        </div>
    );
};

export default Admin;
