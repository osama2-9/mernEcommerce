import { toast } from "react-toastify";
import { useSendCode } from "../hooks/useSendCode";
import { BACKEND_API } from "../config/config";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

export const VerifyPhoneNumber = () => {
    const { handleSendCode, isLoading: isSendingCode } = useSendCode();
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();  // Initialize useNavigate
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyPhone = async (e) => {
        e.preventDefault();
        if (!verificationCode) {
            toast.error("Please enter the verification code.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${BACKEND_API}/users/verifiyPhoneNumber`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    uid: user?.uid,
                    verificationCode: verificationCode
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);

                // Redirect to home page after 3 seconds
                setTimeout(() => {
                    navigate("/");  // Redirect to home
                }, 3000);  // 3 seconds delay
            }
        } catch (error) {
            toast.error("Error occurred while trying to verify the code.");
            console.log(error);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Enter Verification Code</h1>

                <p className="text-center text-gray-600 mb-4">
                    We’ve sent a verification code to your phone number. Please enter it below.
                </p>

                <form className="space-y-6" onSubmit={handleVerifyPhone}>
                    <div>
                        <label htmlFor="verificationCode" className="block text-lg font-medium text-gray-700 mb-2">
                            Verification Code
                        </label>
                        <input
                            id="verificationCode"
                            name="verificationCode"
                            type="text"
                            value={verificationCode}
                            placeholder="Enter your code"
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                        <button
                            type="submit"
                            className={`w-52 bg-black text-white font-semibold py-3 rounded-lg transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Verify Code'}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Didn’t receive the code?{" "}
                        <span
                            onClick={handleSendCode}
                            className={`text-black cursor-pointer font-semibold hover:underline ${isSendingCode ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSendingCode ? 'Resending...' : 'Resend Code'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
