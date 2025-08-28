import React from 'react';
import { ChevronsRight } from 'lucide-react';
import { algorithmTopics } from './algorithmTopics';

// --- Page and Layout Components ---

export const HomePage = ({ onSelectTopic }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
        <header className="text-center terminal-border p-8">
            <h1 className="text-5xl font-bold uppercase tracking-widest">Interactive Algorithms</h1>
            <p className="text-xl mt-2 text-text-secondary">A Visual Guide</p>
        </header>
        <main className="w-full max-w-4xl mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {algorithmTopics.map(topic => (
                    <button key={topic.id} onClick={() => onSelectTopic(topic)} className="terminal-border p-6 text-left hover:bg-bg-secondary transition-all duration-200 flex flex-col h-full">
                        <p className="font-bold text-text-accent">CHAPTER {topic.chapter}</p>
                        <h3 className="text-3xl font-bold text-highlight-primary my-2">{topic.title}</h3>
                        <p className="flex-grow text-text-secondary">{topic.description}</p>
                        <div className="mt-4 font-bold flex items-center text-text-primary">
                            <span>EXPLORE</span>
                            <ChevronsRight size={20} className="ml-2"/>
                        </div>
                    </button>
                ))}
            </div>
        </main>
    </div>
);

