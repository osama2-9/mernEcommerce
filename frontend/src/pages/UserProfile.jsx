import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiFillInfoCircle } from 'react-icons/ai';
import userAtom from '../atoms/userAtom.js';
import USidebar from '../components/USidebar.jsx';
import { BACKEND_API } from '../config/config.js';
import { useSendCode } from "../hooks/useSendCode.js";
import { FaCheck } from "react-icons/fa";

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

    const { handleSendCode, isLoading, isModalOpen, handleOpenModel, setIsModalOpen } = useSendCode();

    const requestVerifiyEmail = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/users/requestVerificationCode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    uid: logged.uid
                })
            })

            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
            }
           
            toast.success(data.message)

        } catch (error) {
            console.log(error);

            toast.error("Internal server error")
        }
    }

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
    if (!logged) {
        return null
    }

    return (
        <>
            <USidebar />
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-3xl p-8">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-4xl font-bold text-center mb-6">
                        Edit Your Profile
                    </h1>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="firstName" className="block text-lg font-medium text-gray-800 mb-2">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="fname"
                                type="text"
                                value={inputs?.fname}
                                onChange={handleInputsChange}
                                placeholder="First Name"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-lg font-medium text-gray-800 mb-2">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lname"
                                type="text"
                                value={inputs?.lname}
                                onChange={handleInputsChange}
                                placeholder="Last Name"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                                Email Address
                                <AiFillInfoCircle className="ml-2 text-black cursor-pointer"
                                    title="Please enter your email address in a valid format, e.g., your-email@example.com."
                                />
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={inputs?.email}
                                onChange={handleInputsChange}
                                placeholder="your-email@example.com"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-sm"
                            />
                        </div>
                        {logged?.ev === false ? (<>
                            <button
                                type="button"
                                onClick={requestVerifiyEmail}
                                className="text-black mt-2"
                            >
                                Verify My Email
                            </button>

                        </>) : (<>
                            <div className="flex flex-row items-center gap-2 text-green-500">
                                <p>Verifyid </p>
                                <FaCheck />

                            </div>
                        </>)}

                        <div>
                            <label htmlFor="phone" className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                                Phone Number
                                <AiFillInfoCircle className="ml-2 text-black cursor-pointer"
                                    title="Please enter your phone number with country code, e.g., +970, +20."
                                />
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={inputs?.phone}
                                onChange={handleInputsChange}
                                placeholder="Phone Number"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-sm"
                            />
                        </div>

                        {logged?.pv === false ? (<>
                            <button
                                type="button"
                                onClick={handleOpenModel}
                                className="text-black mt-2"
                            >
                                Verify My Phone
                            </button>

                        </>) : (<>
                            <div className="flex flex-row items-center gap-2 text-green-500">
                                <p>Verifyid </p>
                                <FaCheck />

                            </div>
                        </>)}
                        <div className="flex justify-between space-x-4">
                            <button
                                type="button"
                                onClick={updateUserData}
                                className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out w-full"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm">
                        <h2 className="text-xl text-gray-500 font-bold mb-4">Confirm Your Phone Number</h2>
                        <p className="mb-4 text-gray-500">
                            Is this your phone number? <strong className="text-black">({inputs.phone})</strong>
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleSendCode}
                                className={`bg-black text-white px-4 py-2 rounded-md transition duration-200 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send'}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-600 border border-gray-300 px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;
