/* eslint-disable react/prop-types */

const ProductContainer = ({ children, title }) => {
    return (
        <div className="p-6 mb-10 mt-10">
            <h2 className="text-center font-bold text-3xl mb-6">{title}</h2>
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {children}
            </div>
        </div>
    );
};

export default ProductContainer;
