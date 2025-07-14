import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { TopicPage } from './components/TopicPage';

const App = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic);
    };

    const handleBackToHome = () => {
        setSelectedTopic(null);
    };

    const toggleTheme = () => {
        setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="min-h-screen font-sans">
            {selectedTopic ? (
                <TopicPage topic={selectedTopic} onBackToHome={handleBackToHome} theme={theme} toggleTheme={toggleTheme} />
            ) : (
                <HomePage onSelectTopic={handleSelectTopic} theme={theme} toggleTheme={toggleTheme} />
            )}
        </div>
    );
};

export default App;