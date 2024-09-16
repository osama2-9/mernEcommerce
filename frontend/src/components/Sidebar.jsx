import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import Messages from './Messages';
import { BiSolidHome } from 'react-icons/bi';
import { TbCategory } from 'react-icons/tb';
import { PiStackSimple } from 'react-icons/pi';
import { MdManageAccounts } from 'react-icons/md';
import { IoIosLogOut } from 'react-icons/io';
import { AiOutlineStock } from 'react-icons/ai';
import { CiBadgeDollar } from 'react-icons/ci';
import { MdGroups2 } from 'react-icons/md';

const Sidebar = () => {
    const admin = useRecoilValue(userAtom);
    if(!admin){
        return;
    }

    return (
        <div className="w-64 h-full bg-gray-800 text-white p-6">
            <nav className="space-y-8">
                {/* Home */}
                <Link to={`/admin/${admin.uid}`} className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-md">
                    <BiSolidHome size={22} />
                    <span className="text-lg font-semibold">Home</span>
                </Link>

                {/* Products Dropdown */}
                <div className="group p-3">
                    <div className="flex items-center gap-4 cursor-pointer">
                        <PiStackSimple size={22} />
                        <span className="text-lg font-semibold">Products</span>
                    </div>
                    <div className="hidden group-hover:block absolute left-0 mt-2 bg-white text-black w-56 rounded-md shadow-lg transition-all duration-200">
                        <Link to="/admin/product/create" className="block p-2 hover:bg-gray-200">
                            Create Product
                        </Link>
                        <Link to="/admin/product/show" className="block p-2 hover:bg-gray-200">
                            Show Products
                        </Link>
                    </div>
                </div>

                {/* Categories Dropdown */}
                <div className="group p-3">
                    <div className="flex items-center gap-4 cursor-pointer">
                        <TbCategory size={22} />
                        <span className="text-lg font-semibold">Categories</span>
                    </div>
                    <div className="hidden group-hover:block absolute left-0 mt-2 bg-white text-black w-56 rounded-md shadow-lg transition-all duration-200">
                        <Link to="/admin/category/create" className="block p-2 hover:bg-gray-200">
                            Create Categories
                        </Link>
                        <Link to="/admin/category/show" className="block p-2 hover:bg-gray-200">
                            Show Categories
                        </Link>
                    </div>
                </div>

                {/* Brands Dropdown */}
                <div className="group p-3">
                    <div className="flex items-center gap-4 cursor-pointer">
                        <TbCategory size={22} />
                        <span className="text-lg font-semibold">Brands</span>
                    </div>
                    <div className="hidden group-hover:block absolute left-0 mt-2 bg-white text-black w-56 rounded-md shadow-lg transition-all duration-200">
                        <Link to="/admin/brand/create" className="block p-2 hover:bg-gray-200">
                            Create Brand
                        </Link>
                        <Link to="/admin/brand/show" className="block p-2 hover:bg-gray-200">
                            Show Brand
                        </Link>
                    </div>
                </div>

                {/* Sales Dropdown */}
                <div className="group p-3">
                    <div className="flex items-center gap-4 cursor-pointer">
                        <AiOutlineStock size={22} />
                        <span className="text-lg font-semibold">Sales</span>
                    </div>
                    <div className="hidden group-hover:block absolute left-0 mt-2 bg-white text-black w-56 rounded-md shadow-lg transition-all duration-200">
                        <Link to="/admin/sales" className="block p-2 hover:bg-gray-200">
                            Sales
                        </Link>
                        <Link to="/admin/product/timedSale" className="block p-2 hover:bg-gray-200">
                            Timed Sale
                        </Link>
                    </div>
                </div>

                {/* Customers */}
                {/* Customers */}
                <Link to="/admin/customer" className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-md">
                    <MdGroups2 size={22} />
                    <span className="text-lg font-semibold">Customers</span>
                </Link>

                {/* Orders */}
                <Link to="/admin/order" className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-md">
                    <CiBadgeDollar size={22} />
                    <span className="text-lg font-semibold">Orders</span>
                </Link>

                {/* Profile */}
                <Link to={`/admin/profile/${admin.uid}`} className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-md">
                    <MdManageAccounts size={22} />
                    <span className="text-lg font-semibold">Profile</span>
                </Link>


                {/* Messages */}
                <div className="flex items-center gap-4 p-3">
                    <Messages />
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Logout */}
                <Link to="admin/logout" className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-md mt-auto">
                    <IoIosLogOut size={22} />
                    <span className="text-lg font-semibold">Logout</span>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
