import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, CheckCircle, XCircle, Beaker, BarChart3, ArrowLeft, ChevronsRight, Lightbulb, Code2, AlertTriangle, Menu, X, BookMarked, PenTool, Hash, Zap, Brain, Target, Cpu, ExternalLink, Minimize, ArrowDown, Sun, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { algorithmTopics } from './components/algorithmTopics';
import GlobalStyles from './components/GlobalStyles';
import { HomePage } from './components/HomePage';
import { TopicPage } from './components/TopicPage';


// --- Main App Component ---

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
