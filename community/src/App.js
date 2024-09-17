import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Resources from './components/Resources';
import DiscussionForum from './components/DiscussionForum';
import CommunityEventPage from './components/CommunityEventPage';
import SikayatKendra from './components/SikayatKendra';
import Navbar from './components/Navbar';

// Voice navigation function
const VoiceNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();

      if (command.includes('sikayat kendra kholo')) {
        navigate('/sikayat-kendra');
      } else if (command.includes('home')) {
        navigate('/');
      } else if (command.includes('resources')) {
        navigate('/resources');
      } else if (command.includes('discussion forum')) {
        navigate('/discussion-forum');
      } else if (command.includes('community events')) {
        navigate('/community-events');
      } else {
        console.log('Command not recognized:', command);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [navigate]);

  return null; // This component doesn't need to render anything
};

function App() {
  return (
    <Router>
      <Navbar />
      <VoiceNavigation /> {/* Add the voice navigation component here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/discussion-forum" element={<DiscussionForum />} />
        <Route path="/community-events" element={<CommunityEventPage />} />
        <Route path="/sikayat-kendra" element={<SikayatKendra />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
