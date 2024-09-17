import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const translations = {
    en: {
        communityEvents: 'Community Events',
        eventInfo: 'Stay informed about upcoming events, workshops, and meet-ups in your area.',
        exploreEvents: 'Explore Events',
        addNewEvent: 'Add a New Event',
        eventTitle: 'Event Title',
        date: 'Date',
        location: 'Location',
        description: 'Description',
        eventThumbnail: 'Event Thumbnail',
        addEvent: 'Add Event',
        upcomingEvents: 'Upcoming Events',
        noEvents: 'No events added yet.',
    },
    hi: {
        communityEvents: 'समुदाय कार्यक्रम',
        eventInfo: 'अपने क्षेत्र में आगामी कार्यक्रमों, कार्यशालाओं और मिलन-सम्मेलनों के बारे में सूचित रहें।',
        exploreEvents: 'कार्यक्रमों की खोज करें',
        addNewEvent: 'नया कार्यक्रम जोड़ें',
        eventTitle: 'कार्यक्रम शीर्षक',
        date: 'तारीख',
        location: 'स्थान',
        description: 'विवरण',
        eventThumbnail: 'कार्यक्रम थंबनेल',
        addEvent: 'कार्यक्रम जोड़ें',
        upcomingEvents: 'आगामी कार्यक्रम',
        noEvents: 'अभी तक कोई कार्यक्रम जोड़ा नहीं गया है।',
    },
    mr: {
        communityEvents: 'समुदाय कार्यक्रम',
        eventInfo: 'तुमच्या क्षेत्रातील आगामी कार्यक्रम, कार्यशाळा आणि मीटअप्सबद्दल माहिती ठेवा.',
        exploreEvents: 'कार्यक्रम पाहा',
        addNewEvent: 'नवीन कार्यक्रम जोडा',
        eventTitle: 'कार्यक्रमाचे शीर्षक',
        date: 'तारीख',
        location: 'स्थळ',
        description: 'वर्णन',
        eventThumbnail: 'कार्यक्रमाचे थंबनेल',
        addEvent: 'कार्यक्रम जोडा',
        upcomingEvents: 'आगामी कार्यक्रम',
        noEvents: 'आतापर्यंत कोणतेही कार्यक्रम जोडलेले नाहीत.',
    },
};

function CommunityEventPage() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        thumbnail: ''
    });
    const [language, setLanguage] = useState('hi'); // Set default language to Hindi

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('communityEvents'));
        if (storedEvents) {
            setEvents(storedEvents);
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'thumbnail') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewEvent({ ...newEvent, thumbnail: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        localStorage.setItem('communityEvents', JSON.stringify(updatedEvents));
        setNewEvent({
            title: '',
            date: '',
            location: '',
            description: '',
            thumbnail: ''
        });
    };

    const t = translations[language]; // Get translations based on selected language

    return (
        <div className="p-6 bg-gradient-to-r from-green-100 to-green-200 min-h-screen">
            {/* Language Selector */}
            <div className="mb-6">
                <button
                    onClick={() => setLanguage('en')}
                    className="mr-2 p-2 border border-gray-300 rounded"
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage('hi')}
                    className="mr-2 p-2 border border-gray-300 rounded"
                >
                    हिंदी
                </button>
                {/* <button
                    onClick={() => setLanguage('mr')}
                    className="p-2 border border-gray-300 rounded"
                >
                    मराठी
                </button> */}
            </div>

            {/* Community Events Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-lg shadow-lg text-white mb-6">
                <h3 className="font-semibold mb-4 text-3xl">{t.communityEvents}</h3>
                <p className="text-white mb-4">
                    {t.eventInfo}
                </p>
                <Link
                    to="/event-detail"
                    className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                    {t.exploreEvents}
                </Link>
            </section>

            {/* Event Form */}
            <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h4 className="font-semibold text-2xl mb-4">{t.addNewEvent}</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">{t.eventTitle}</label>
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder={t.eventTitle}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">{t.date}</label>
                        <input
                            type="date"
                            name="date"
                            value={newEvent.date}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">{t.location}</label>
                        <input
                            type="text"
                            name="location"
                            value={newEvent.location}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder={t.location}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">{t.description}</label>
                        <textarea
                            name="description"
                            value={newEvent.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder={t.description}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700">{t.eventThumbnail}</label>
                        <input
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition"
                    >
                        {t.addEvent}
                    </button>
                </form>
            </section>

            {/* Display Events */}
            <section className="mt-6">
                <h4 className="font-semibold text-2xl mb-4">{t.upcomingEvents}</h4>
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start">
                                {event.thumbnail && (
                                    <img
                                        src={event.thumbnail}
                                        alt={event.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <h5 className="font-semibold text-xl text-green-600 mb-2">{event.title}</h5>
                                <p className="text-gray-700 mb-1"><strong>Date:</strong> {event.date}</p>
                                <p className="text-gray-700 mb-1"><strong>Location:</strong> {event.location}</p>
                                <p className="text-gray-700 mb-1"><strong>Description:</strong> {event.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700">{t.noEvents}</p>
                )}
            </section>
        </div>
    );
}

export default CommunityEventPage;
