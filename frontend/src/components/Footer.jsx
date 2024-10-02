import { FaGithub, FaInstagram } from 'react-icons/fa';
import { CiLinkedin } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="w-full bg-gray-50 border-t-2 border-gray-200 pt-10">
            <div className="flex justify-center">
                <img src="/logo.png" alt="Logo" className="w-48" />
            </div>
            <div className="mt-10 flex flex-col items-center text-center">
                <div className="max-w-md">
                    <h2 className="text-2xl font-semibold mb-5">We&apos;re Always Here To Help</h2>
                    <div className="flex flex-col space-y-4 text-lg text-gray-500">
                        <p>osamaalsrraj3@gmail.com</p>
                        <p>01001234567</p>
                    </div>
                </div>
            </div>
            <div className="w-full bg-black mt-10 py-6">
                <div className="flex justify-center space-x-5">
                    <Link to="https://github.com/osama2-9?tab=repositories">
                        <FaGithub className="text-white hover:scale-110 transition-all" size={30} />
                    </Link>
                    <Link to="https://www.instagram.com">
                        <FaInstagram className="text-white hover:scale-110 transition-all" size={30} />
                    </Link>
                    <Link to="https://www.linkedin.com/in/osama-alsrraj-65b782264/">
                        <CiLinkedin className="text-white hover:scale-110 transition-all" size={32} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
