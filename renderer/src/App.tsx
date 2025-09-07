import React, { useState } from 'react';
import { AlgorithmTopic, Pattern, DSACategory } from './types';
import { HomePage } from './components/core/HomePage';
import { TopicPage } from './components/core/TopicPage';
import { PatternPage } from './components/core/PatternPage';

type AppState = 
    | { type: 'home' }
    | { type: 'legacy-topic'; topic: AlgorithmTopic }
    | { type: 'pattern'; pattern: Pattern; category: DSACategory };

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>({ type: 'home' });

    const handleSelectTopic = (topic: AlgorithmTopic) => {
        setAppState({ type: 'legacy-topic', topic });
    };

    const handleSelectPattern = (pattern: Pattern, category: DSACategory) => {
        setAppState({ type: 'pattern', pattern, category });
    };

    const handleBackToHome = () => {
        setAppState({ type: 'home' });
    };

    return (
        <div>
            {appState.type === 'home' && (
                <HomePage 
                    onSelectTopic={handleSelectTopic}
                    onSelectPattern={handleSelectPattern}
                />
            )}
            {appState.type === 'legacy-topic' && (
                <TopicPage 
                    topic={appState.topic} 
                    onBackToHome={handleBackToHome} 
                />
            )}
            {appState.type === 'pattern' && (
                <PatternPage 
                    pattern={appState.pattern}
                    category={appState.category}
                    onBack={handleBackToHome}
                />
            )}
        </div>
    );
};

export default App;