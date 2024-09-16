/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CiBadgeDollar } from "react-icons/ci";
import { AiOutlineRise } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { GoStack } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import useGetProduct from "../hooks/useGetProduct";
import useGetCategories from "../hooks/useGetCategories";
import useGetCustomer from "../hooks/useGetCustomer";
import useGetOrders from "../hooks/useGetOrders";

const Tabs = () => {
    const { numberOfProduct } = useGetProduct();
    const { numberOfCategories } = useGetCategories();
    const { customerNumber } = useGetCustomer();
    const { totalOrders, ordersTotalPrice } = useGetOrders();
    const [currency, setCurrency] = useState(null);

    const apiLink = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_zeNqhZimNPwMKZyRtK9FtOy9ZRgosUK93SRG3FlE';

    useEffect(() => {
        const getCurrency = async () => {
            try {
                const res = await fetch(apiLink);
                const data = await res.json();
                setCurrency(data.data.ILS);
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };
        // getCurrency();
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                {/* Total Orders */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Total Orders</h2>
                        <AiOutlineRise className="text-purple-600" size={40} />
                    </div>
                    <p className="mt-4 text-center text-4xl font-bold text-gray-700">
                        {totalOrders}
                    </p>
                </div>

                {/* Total Income */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Total Income</h2>
                        <CiBadgeDollar className="text-green-600" size={40} />
                    </div>
                    <p className="mt-4 text-center text-4xl font-bold text-gray-700">
                        {ordersTotalPrice}$
                    </p>
                </div>

                {/* Customer Number */}
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Customer Number</h2>
                        <HiUserGroup className="text-black" size={40} />
                    </div>
                    <p className="mt-4 text-center text-4xl font-bold text-gray-700">
                        {customerNumber}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 mt-6">
                {/* Total Products */}
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Total Products</h2>
                        <GoStack className="text-emerald-500" size={40} />
                    </div>
                    <p className="mt-4 text-center text-4xl font-bold text-gray-700">
                        {numberOfProduct}
                    </p>
                </div>

                {/* Total Categories */}
                <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Total Categories</h2>
                        <BiCategory className="text-cyan-700" size={40} />
                    </div>
                    <p className="mt-4 text-center text-4xl font-bold text-gray-700">
                        {numberOfCategories}
                    </p>
                </div>

                {/* USD to ILS */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">USD to ILS</h2>
                        <AiOutlineRise className="text-red-600" size={40} />
                    </div>
                    <p className="mt-4 text-center text-4xl font-bold text-gray-700">
                        {currency ? `1 USD = ${currency.toFixed(3)} ILS` : "Loading..."}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Tabs;
