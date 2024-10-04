import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/config";
import { BsTrash } from "react-icons/bs";

const UserLastOrders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
    const logged = useRecoilValue(userAtom);

    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/order/userOrder/${logged.uid}`, {
                    credentials: "include"
                });
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error);
                } else {
                    setOrders(data);
                }
            } catch (error) {
                console.log(error);
                toast.error('An error occurred while fetching the orders.');
            }
        };

        getUserOrders();
    }, [logged.uid]);

    const deleteOrder = async (orderId) => {
        try {
            const res = await fetch(`${BACKEND_API}/order/deleteUserOrder`, {
                method: "DELETE",
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify({
                    uid: logged.uid,
                    oid: orderId,
                }),
                credentials: "include"
            });

            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while deleting the order.');
        }
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(orders.length / ordersPerPage)));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="p-4 mt-20 mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-gray-800">
                    <span className="bg-black text-white py-1 px-2 rounded">Your Orders</span>
                </h2>
                {orders.length === 0 && <p className="text-gray-500">No orders found.</p>}
            </div>
            {orders.length > 0 && (
                <div className="overflow-hidden rounded-lg shadow-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Product Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Order Status</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Ordered At</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-100 transition-colors duration-150">
                                    <td className="px-4 py-2 text-sm text-gray-700">{order.productName.length > 18 ? `${order.productName.slice(0, 18)}...` : order.productName}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{order.quantity}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">${order.price.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getOrderStatusColor(order.orderStatus)}`}>{order.orderStatus}</span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="text-red-500 hover:text-red-700 focus:outline-none"
                                            onClick={() => deleteOrder(order._id)}
                                            aria-label="Delete Order"
                                        >
                                            <BsTrash className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    <span>Previous</span>
                </button>
                <p className="text-sm">Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}</p>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    <span>Next</span>
                </button>
            </div>
        </div>
    );
};

const getOrderStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Processing':
            return 'bg-blue-100 text-blue-800';
        case 'Shipped':
            return 'bg-purple-100 text-purple-800';
        case 'Delivered':
            return 'bg-green-100 text-green-800';
        case 'Cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default UserLastOrders;
