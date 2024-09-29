import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import Messages from './Messages';
import { BiSolidHome } from 'react-icons/bi';
import { TbCategory } from 'react-icons/tb';
import { PiStackSimple } from 'react-icons/pi';
import { MdManageAccounts } from 'react-icons/md';

import { AiOutlineStock } from 'react-icons/ai';
import { CiBadgeDollar } from 'react-icons/ci';
import { MdGroups2 } from 'react-icons/md';
import { HiMenu } from 'react-icons/hi'; 
import { useState } from 'react';

const Sidebar = () => {
    const admin = useRecoilValue(userAtom);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    if (!admin) {
        return null;
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="h-full flex">
            <div className="lg:hidden p-4">
                <HiMenu
                    size={30}
                    className="black-white cursor-pointer"
                    onClick={toggleSidebar}
                />
            </div>

            <div className={`fixed lg:static z-40 lg:z-auto lg:flex lg:w-64 h-full bg-gray-800 text-white p-6 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <nav className="space-y-8">
                    <Link to={`/admin/${admin.uid}`} className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-md">
                        <BiSolidHome size={22} />
                        <span className="text-lg font-semibold">Home</span>
                    </Link>

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

                    <Link to="/admin/customer" className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-md">
                        <MdGroups2 size={22} />
                        <span className="text-lg font-semibold">Customers</span>
                    </Link>

                    <Link to="/admin/order" className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-md">
                        <CiBadgeDollar size={22} />
                        <span className="text-lg font-semibold">Orders</span>
                    </Link>

                    <Link to={`/admin/profile/${admin.uid}`} className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-md">
                        <MdManageAccounts size={22} />
                        <span className="text-lg font-semibold">Profile</span>
                    </Link>

                    <div className="flex items-center gap-4 p-3">
                        <Messages />
                    </div>

                    <div className="flex-1"></div>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
