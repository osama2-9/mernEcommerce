import useGetOrders from '../hooks/useGetOrders';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const UserTabs = () => {
    const logged = useRecoilValue(userAtom);
    const { orders } = useGetOrders();
    const filter = orders.filter((o) => o?.uid === logged?.uid);

    
    const staticData = [
        { title: 'My Orders', count: filter.length },
        { title: 'Favorites', count: 5 },
        { title: 'Cart', count: 3 },
    ];

    return (
        <div className="flex flex-col md:flex-row p-4 m-4 justify-center md:justify-start items-center max-w-5xl mx-auto mt-20">
            {staticData.map((data, index) => (
                <div key={index} className="w-full md:w-96 bg-white  shadow-lg rounded-lg p-6 flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl m-2">
                    <div className="flex flex-col text-center">
                        <span className="text-xl font-bold mb-2">{data.title}</span>
                        <span className="text-3xl font-bold text-blue-400 ">{data.count}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserTabs;
