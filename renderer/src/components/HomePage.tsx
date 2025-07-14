import React from 'react';
import { ChevronsRight } from 'lucide-react';
import { algorithmTopics } from './algorithmTopics';

const HomePage: React.FC<{ onSelectTopic: (topic: any) => void }> = ({ onSelectTopic }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
        <header className="text-center retro-border p-8">
            <h1 className="text-5xl font-bold uppercase tracking-widest">Interactive Algorithms</h1>
            <p className="text-xl mt-2 font-serif text-var(--text-secondary)">A Visual Guide</p>
        </header>
        <main className="w-full max-w-4xl mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {algorithmTopics.map(topic => (
                    <button key={topic.id} onClick={() => onSelectTopic(topic)} className="retro-border p-6 text-left hover:bg-var(--bg-secondary) transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--border-color)] flex flex-col h-full">
                        <p className="font-bold text-var(--text-accent)">CHAPTER {topic.chapter}</p>
                        <h3 className="text-3xl font-bold text-var(--highlight-primary) my-2">{topic.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {topic.tags && topic.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-var(--bg-secondary) text-var(--highlight-primary) font-mono text-xs rounded retro-border">{tag}</span>
                            ))}
                        </div>
                        <p className="flex-grow font-serif text-var(--text-secondary)">{topic.description}</p>
                        <div className="mt-4 font-bold flex items-center text-var(--text-primary)">
                            <span>EXPLORE</span>
                            <ChevronsRight size={20} className="ml-2"/>
                        </div>
                    </button>
                ))}
            </div>
        </main>
    </div>
);

export default HomePage; 