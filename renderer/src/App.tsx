import React, { useState } from 'react';
import { GlobalStyles } from './components/GlobalStyles';
import { HomePage } from './components/HomePage';
import { TopicPage } from './components/TopicPage';

const App = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    return (
        <div>
            <GlobalStyles />
            {!selectedTopic 
                ? <HomePage onSelectTopic={setSelectedTopic} />
                : <TopicPage topic={selectedTopic} onBackToHome={() => setSelectedTopic(null)} />
            }
        </div>
    );
};

export default App;