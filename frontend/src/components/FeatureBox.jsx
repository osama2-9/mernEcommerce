/* eslint-disable react/prop-types */
const FeatureBox = ({ icon, title, description }) => {
    return (
        <div className="mt-10 m-2 p-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center items-center text-green-500 mb-4">
                <div className="text-4xl">
                    {icon}
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                {title}
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
                {description}
            </p>
        </div>
    )
}

export default FeatureBox;
