import {  useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom.js';
import USidebar from '../components/USidebar.jsx';
import { BACKEND_API } from '../config/config.js';

const UserProfile = () => {
    const logged = useRecoilValue(userAtom);
    const [user, setUser] = useRecoilState(userAtom);
    const [inputs, setInputs] = useState({
        fname: logged.fname,
        lname: logged.lname,
        email: logged.email,
        phone: logged.phone
    });

    const handleInputsChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const updateUserData = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/users/updateUserData`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    uid: logged.uid,
                    fname: inputs.fname,
                    lname: inputs.lname,
                    email: inputs.email,
                    phone: inputs.phone
                }),
                credentials: "include"
            });

            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                toast.success("Profile Data Updated");
            }

        } catch (error) {
            console.log(error);
            toast.error('An error occurred while updating the profile data.');
        }
    };

    return (
        <>
            <USidebar />
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-3xl p-8">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-500">
                        Edit Your Profile
                    </h1>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="fname"
                                type="text"
                                value={inputs?.fname}
                                onChange={handleInputsChange}
                                placeholder="First Name"
                                className="mt-1 block w-full rounded-md border p-2 text-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lname"
                                type="text"
                                value={inputs?.lname}
                                onChange={handleInputsChange}
                                placeholder="Last Name"
                                className="mt-1 block w-full rounded-md border p-2 text-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={inputs?.email}
                                onChange={handleInputsChange}
                                placeholder="your-email@example.com"
                                className="mt-1 block w-full rounded-md border p-2 text-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={inputs?.phone}
                                onChange={handleInputsChange}
                                placeholder="Phone Number"
                                className="mt-1 block w-full rounded-md border p-2 text-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="flex justify-between space-x-4">
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md w-full"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={updateUserData}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
