import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-green-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Farmer Community</h1>
                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <nav className={`lg:flex lg:space-x-4 ${isOpen ? 'block' : 'hidden'} lg:mt-0 mt-4 lg:flex lg:justify-end`}>
                    <ul className={`flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-4 lg:space-y-0`}>
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Discussions</a></li>
                        <li><a href="#" className="hover:underline">Events</a></li>
                        <li><a href="#" className="hover:underline">Profile</a></li>
                        <li><a href="#" className="hover:underline">Profile</a></li>
                        <li><a href="#" className="hover:underline">Profile</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
