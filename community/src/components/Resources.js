import React from 'react';

const Resources = () => {
    return (
        <div className="w-full min-h-screen bg-green-50 px-4 py-8">
            <div className="container mx-auto flex flex-col md:flex-row">
                {/* Horizontal Categories Section */}
                <div className="w-full md:w-1/4 bg-green-100 p-4 rounded-lg shadow-lg mb-6 md:mb-0">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Categories</h2>
                    <ul className="space-y-3">
                        <li><a href="#best-practices" className="text-green-600 hover:underline">Best Practices</a></li>
                        <li><a href="#crop-management" className="text-green-600 hover:underline">Crop Management</a></li>
                        <li><a href="#pest-disease-control" className="text-green-600 hover:underline">Pest and Disease Control</a></li>
                        <li><a href="#soil-health" className="text-green-600 hover:underline">Soil Health</a></li>
                        <li><a href="#sustainable-farming" className="text-green-600 hover:underline">Sustainable Farming</a></li>
                        <li><a href="#equipment-tools" className="text-green-600 hover:underline">Equipment and Tools</a></li>
                        <li><a href="#market-trends" className="text-green-600 hover:underline">Market Trends</a></li>
                    </ul>
                </div>
                {/* Content Sections */}
                <div className="w-full md:w-3/4 space-y-6">
                    <section id="best-practices" className="p-6 bg-green-50 rounded-lg shadow-md">
                        <h2 className="text-3xl font-semibold text-green-800 mb-4">Best Practices</h2>
                        <p className="mb-4">Explore the best practices for modern farming. Learn about effective techniques to improve productivity and sustainability in your farming operations.</p>
                        <a href="https://www.agriculture.com/knowledge" className="text-green-600 hover:underline">Read More on Agriculture.com</a>
                    </section>
                    <section id="crop-management" className="p-6 bg-green-50 rounded-lg shadow-md">
                        <h2 className="text-3xl font-semibold text-green-800 mb-4">Crop Management</h2>
                        <p className="mb-4">Learn about effective crop management strategies, including planting schedules, crop rotation, and harvesting techniques.</p>
                        <a href="https://www.cropscience.bayer.com/" className="text-green-600 hover:underline">Learn More from Bayer Crop Science</a>
                    </section>
                    <section id="pest-disease-control" className="p-6 bg-green-50 rounded-lg shadow-md">
                        <h2 className="text-3xl font-semibold text-green-800 mb-4">Pest and Disease Control</h2>
                        <p className="mb-4">Find information on identifying and managing pests and diseases that affect crops. Discover preventive measures and treatments.</p>
                        <a href="https://www.pestworld.org/" className="text-green-600 hover:underline">Explore Resources at PestWorld</a>
                    </section>
                    <section id="soil-health" className="p-6 bg-green-50 rounded-lg shadow-md">
                        <h2 className="text-3xl font-semibold text-green-800 mb-4">Soil Health</h2>
                        <p className="mb-4">Discover techniques for testing and improving soil health to boost crop yields. Learn about soil amendments and best practices.</p>
                        <a href="https://www.soilhealthpartnership.org/" className="text-green-600 hover:underline">Visit Soil Health Partnership</a>
                    </section>
                    <section id="sustainable-farming" className="p-6 bg-green-50 rounded-lg shadow-md">
                        <h2 className="text-3xl font-semibold text-green-800 mb-4">Sustainable Farming</h2>
                        <p className="mb-4">Learn about sustainable farming practices that conserve resources and protect the environment. Implement techniques to enhance sustainability.</p>
                        <a href="https://www.sustainableagriculture.net/" className="text-green-600 hover:underline">Read More at Sustainable Agriculture</a>
                    </section>
                    <section id="equipment-tools" className="p-6 bg-green-50 rounded-lg shadow-md">
                        <h2 className="text-3xl font-semibold text-green-800 mb-4">Equipment and Tools</h2>
                        <p className="mb-4">Get recommendations and reviews on the latest farming equipment and tools. Find out what’s best for your farming needs.</p>
                        <a href="https://www.farming.com/equipment/" className="text-green-600 hover:underline">Explore Farming Equipment at Farming.com</a>
                    </section>
                    <section id="market-trends" className="p-6 bg-green-50 rounded-lg shadow-md">
                        <h2 className="text-3xl font-semibold text-green-800 mb-4">Market Trends</h2>
                        <p className="mb-4">Stay updated with market trends, prices, and opportunities for selling your produce. Get insights into current market conditions.</p>
                        <a href="https://www.agweb.com/markets" className="text-green-600 hover:underline">Check Market Trends at AgWeb</a>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Resources;
