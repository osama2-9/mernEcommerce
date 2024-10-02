/* eslint-disable react/prop-types */


const Promotional = ({ image, title, description }) => {
    return (
        <div className="flex w-screen mt-20 mx-auto max-w-screen-xl flex-col md:flex-row items-center bg-gray-50 rounded-md shadow-lg p-6">
            <div className="mb-6 flex-shrink-0">
                <img src={image} className="w-full max-w-[450px] h-auto rounded-lg shadow-md" alt={title} />
            </div>
            <div className="text flex-1 ml-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left mb-4">
                    {title}
                </h1>
                <p className="text-base md:text-lg text-gray-500 text-center md:text-left">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Promotional;
