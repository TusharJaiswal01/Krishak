import React from 'react';
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'; // Importing icons

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                {/* Left Section with Logo */}
                <div className="flex flex-col items-start w-full md:w-1/2 lg:w-1/2 mb-4 lg:mb-0">
                    <img src="/path/to/logo.png" alt="Logo" className="h-16 mb-4" />
                    <p className="text-center lg:text-left mb-4 lg:mb-0">
                        &copy; Made with love by.
                    </p>
                </div>

                {/* Right Section with Social Media Icons */}
                <div className="flex justify-center w-full md:w-1/2 lg:w-1/2">
                    <div className="flex space-x-4">
                        <a href="https://instagram.com" className="text-gray-400 hover:text-white" aria-label="Instagram">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-white" aria-label="Twitter">
                            <FaTwitter size={30} />
                        </a>
                        <a href="https://facebook.com" className="text-gray-400 hover:text-white" aria-label="Facebook">
                            <FaFacebookF size={30} />
                        </a>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
                            <FaLinkedinIn size={30} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
