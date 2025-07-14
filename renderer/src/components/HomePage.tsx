import React, { useState } from 'react';
import { Book, ChevronsRight, Grid, List, Moon, Sun } from 'lucide-react';
import { algorithmTopics } from './algorithmTopics';

export const HomePage = ({ onSelectTopic, theme, toggleTheme }) => {
    const [view, setView] = useState('grid');

    const CardView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {algorithmTopics.map(topic => (
                <button 
                    key={topic.id} 
                    onClick={() => onSelectTopic(topic)} 
                    className="bg-card text-card-foreground border border-border rounded-lg p-6 text-left hover:bg-secondary transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
                >
                    <p className="font-semibold text-primary">CHAPTER {topic.chapter}</p>
                    <h3 className="text-2xl font-bold my-2">{topic.title}</h3>
                    <p className="flex-grow font-serif text-muted-foreground">{topic.description}</p>
                    <div className="mt-4 font-semibold flex items-center text-primary">
                        <span>EXPLORE</span>
                        <ChevronsRight size={20} className="ml-2"/>
                    </div>
                </button>
            ))}
        </div>
    );

    const ListView = () => (
        <div className="space-y-4 animate-fade-in">
            {algorithmTopics.map(topic => (
                <button 
                    key={topic.id} 
                    onClick={() => onSelectTopic(topic)} 
                    className="w-full bg-card text-card-foreground border border-border rounded-lg p-4 text-left hover:bg-secondary transition-all duration-200 flex items-center justify-between"
                >
                    <div className="flex items-center">
                        <span className="text-muted-foreground font-mono text-sm w-16">{topic.chapter}</span>
                        <h3 className="text-lg font-bold">{topic.title}</h3>
                    </div>
                    <ChevronsRight size={20} className="text-muted-foreground"/>
                </button>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <header className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                    <Book size={32} className="text-primary"/>
                    <div>
                        <h1 className="text-2xl font-bold">Interactive Algorithms</h1>
                        <p className="text-muted-foreground font-serif">A Visual Guide</p>
                    </div>
                </div>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary">
                    {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
                </button>
            </header>
            <main className="w-full max-w-7xl mx-auto mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Topics</h2>
                    <div className="flex items-center gap-2 p-1 bg-secondary rounded-lg border border-border">
                        <button onClick={() => setView('grid')} className={`p-2 rounded-md ${view === 'grid' ? 'bg-background shadow-sm' : ''}`}>
                            <Grid size={18}/>
                        </button>
                        <button onClick={() => setView('list')} className={`p-2 rounded-md ${view === 'list' ? 'bg-background shadow-sm' : ''}`}>
                            <List size={18}/>
                        </button>
                    </div>
                </div>
                {view === 'grid' ? <CardView /> : <ListView />}
            </main>
        </div>
    );
};