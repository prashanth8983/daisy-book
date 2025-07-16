import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { TopicPage } from './components/TopicPage';
import GlobalStyles from './components/GlobalStyles';
import { ThemeProvider } from './theme';

const App = () => {
    return (
        <ThemeProvider>
            <GlobalStyles />
            <MainContent />
        </ThemeProvider>
    );
};

const MainContent = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    return !selectedTopic 
        ? <HomePage onSelectTopic={setSelectedTopic} />
        : <TopicPage topic={selectedTopic} onBackToHome={() => setSelectedTopic(null)} />
}

export default App;