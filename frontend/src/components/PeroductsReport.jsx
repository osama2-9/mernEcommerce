import useGetOrders from "../hooks/useGetOrders";

import useGetTopSells from "../hooks/useGetTopSells";

const ProductsReport = () => {
  const { lastThreeOrders } = useGetOrders();
  const { topSell } = useGetTopSells();

  return (
    <div className="flex flex-col md:flex-row justify-center mt-10 space-y-8 md:space-y-0 md:space-x-8">

      <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-4">Last Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2">Image</th>
                <th className="px-4 py-2 border-b-2">User Email</th>
                <th className="px-4 py-2 border-b-2">Product Name</th>
                <th className="px-4 py-2 border-b-2">Quantity</th>
                <th className="px-4 py-2 border-b-2">Price</th>
                <th className="px-4 py-2 border-b-2">Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {lastThreeOrders.map((order, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2"><img src={order.prodcutImg} alt="Product" className="w-10 h-12 object-cover" /></td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{order.productName.length >= 18 ? order.productName.slice(0, 18).concat('...') : order.productName}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">{order.price}$</td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-teal-600 mb-4">Top Sells</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2">Image</th>
                <th className="px-4 py-2 border-b-2">Product Name</th>
                <th className="px-4 py-2 border-b-2">Sales</th>
              </tr>
            </thead>
            <tbody>
              {topSell.slice(0, 3).map((product, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2"><img src={product.productImg} alt="Product" className="w-10 h-12 object-cover" /></td>
                  <td className="px-4 py-2">{product.productName.length >= 18 ? product.productName.slice(0, 18).concat('...') : product.productName}</td>
                  <td className="px-4 py-2">{product.sells}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsReport;
