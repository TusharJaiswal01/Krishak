import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [language, setLanguage] = useState('en'); // Initial language set to English

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    return (
        <main className="bg-gray-100">
            {/* Language Toggle Button */}
            <div className="text-right ">
                <button
                    onClick={toggleLanguage}
                    className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                    {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                </button>
            </div>

            {/* Hero Section */}
            <section className="relative text-white" style={{ height: '50vh' }}>
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source
                        src="https://videos.pexels.com/video-files/2848072/2848072-sd_640_360_30fps.mp4"
                        type="video/mp4"
                    />
                    {language === 'en' ? 'Your browser does not support the video tag.' : 'आपका ब्राउज़र वीडियो टैग को सपोर्ट नहीं करता।'}
                </video>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto px-6 py-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {language === 'en' ? 'Welcome to the Farmer Community' : 'किसान समुदाय में आपका स्वागत है'}
                    </h1>
                    <p className="text-lg mb-6">
                        {language === 'en'
                            ? 'Connect with fellow farmers, share knowledge, and stay updated with the latest trends in agriculture.'
                            : 'अन्य किसानों से जुड़ें, ज्ञान साझा करें, और कृषि में नवीनतम रुझानों से अपडेट रहें।'}
                    </p>
                    <a href="#features" className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
                        {language === 'en' ? 'Get Started' : 'शुरू करें'}
                    </a>
                </div>
            </section>

            {/* Featured Content Section */}
            <section id="features" className="py-5">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {language === 'en' ? 'Explore Our Features' : 'हमारी विशेषताओं को एक्सप्लोर करें'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-3xl font-semibold mb-4">
                                {language === 'en' ? 'Discussion Forums' : 'चर्चा मंच'}
                            </h3>
                            <p className="text-white mb-4">
                                {language === 'en'
                                    ? 'Engage with other farmers, ask questions, and share your knowledge in our vibrant community forums.'
                                    : 'अन्य किसानों से जुड़े, प्रश्न पूछें और हमारे जीवंत समुदाय मंचों में अपना ज्ञान साझा करें।'}
                            </p>
                            <Link to="/discussion-forum" className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
                                {language === 'en' ? 'Get Started' : 'शुरू करें'}
                            </Link>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-green-600 p-6 rounded-lg shadow-lg text-white">
                            <h3 className="text-3xl font-semibold mb-4">
                                {language === 'en' ? 'Sikayat Kendra' : 'शिकायत केंद्र'}
                            </h3>
                            <p className="text-white mb-4">
                                {language === 'en'
                                    ? 'A dedicated platform for farmers to file complaints and seek resolution for agricultural issues swiftly and effectively.'
                                    : 'किसानों के लिए एक समर्पित प्लेटफ़ॉर्म जहाँ वे कृषि समस्याओं के लिए शिकायत दर्ज कर सकते हैं और तेजी से समाधान पा सकते हैं।'}
                            </p>
                            <Link
                                to="/sikayat-kendra"
                                className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
                            >
                                {language === 'en' ? 'Get Started' : 'शुरू करें'}
                            </Link>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-green-600 p-6 rounded-lg shadow-lg text-white">
                            <h3 className="font-semibold mb-4 text-3xl">
                                {language === 'en' ? 'Community Events' : 'समुदाय कार्यक्रम'}
                            </h3>
                            <p className="text-white mb-4">
                                {language === 'en'
                                    ? 'Stay informed about upcoming events, workshops, and meet-ups in your area.'
                                    : 'अपने क्षेत्र में होने वाले आगामी कार्यक्रमों, कार्यशालाओं और मिलन समारोहों के बारे में सूचित रहें।'}
                            </p>
                            <Link
                                to="/community-events"
                                className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
                            >
                                {language === 'en' ? 'Get Started' : 'शुरू करें'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-200 py-10">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {language === 'en' ? 'What Our Members Say' : 'हमारे सदस्यों का क्या कहना है'}
                    </h2>
                    <div className="flex flex-wrap justify-center">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4 mb-6">
                            <p className="text-gray-700 mb-4">
                                {language === 'en'
                                    ? '"This community has been a game-changer for my farming practices. I\'ve learned so much from other farmers and the resources available here."'
                                    : '"इस समुदाय ने मेरी खेती के तरीकों में क्रांतिकारी बदलाव लाया है। मैंने अन्य किसानों और यहां उपलब्ध संसाधनों से बहुत कुछ सीखा है।"'}
                            </p>
                            <p className="font-semibold">Ms Dhoni</p>
                            <p className="text-gray-500">{language === 'en' ? 'Farmer' : 'किसान'}</p>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4 mb-6">
                            <p className="text-gray-700 mb-4">
                                {language === 'en'
                                    ? '"The crop disease prevention tool is incredibly useful. It has helped me identify and treat issues before they become serious problems."'
                                    : '"फसल रोग निवारण उपकरण बेहद उपयोगी है। इसने मुझे समस्याओं की पहचान और उपचार करने में मदद की है, इससे पहले कि वे गंभीर समस्याओं में बदल जाएं।"'}
                            </p>
                            <p className="font-semibold">Ms Dhoni</p>
                            <p className="text-gray-500">{language === 'en' ? 'Agronomist' : 'कृषिविज्ञानी'}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomePage;
