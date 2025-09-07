import React, { useState } from 'react';
import { AlgorithmTopic } from './types';
import { HomePage } from './components/core/HomePage';
import { TopicPage } from './components/core/TopicPage';

const App: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState<AlgorithmTopic | null>(null);

    return (
        <div>
            {!selectedTopic 
                ? <HomePage onSelectTopic={setSelectedTopic} />
                : <TopicPage topic={selectedTopic} onBackToHome={() => setSelectedTopic(null)} />
            }
        </div>
    );
};

export default App;