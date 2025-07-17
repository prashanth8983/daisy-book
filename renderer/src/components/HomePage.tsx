import React from 'react';
import { ChevronsRight } from 'lucide-react';
import { algorithmTopics } from './algorithmTopics';
import { ThemeToggle } from './ui';

export const HomePage = ({ onSelectTopic }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
        <div className="absolute top-4 right-4">
            <ThemeToggle />
        </div>
        <header className="text-center animate-fade-in-up">
            <h1 className="text-5xl font-bold font-serif text-primary tracking-wider">Interactive Algorithms</h1>
            <p className="text-xl mt-2 font-sans text-muted-foreground">A Visual Guide to Data Structures and Algorithms</p>
        </header>
        <main className="w-full max-w-3xl mt-12">
            <div className="grid grid-cols-1 gap-6">
                {algorithmTopics.map((topic, index) => (
                    <div 
                        key={topic.id} 
                        onClick={() => onSelectTopic(topic)} 
                        className="paper-card text-left transition-all duration-300 hover:-translate-y-1 flex flex-col h-full animate-fade-in-up cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <p className="font-bold text-accent">CHAPTER {topic.chapter}</p>
                        <h3 className="text-3xl font-bold font-serif text-primary my-2">{topic.title}</h3>
                        <p className="flex-grow font-sans text-muted-foreground">{topic.description}</p>
                        <div className="mt-4 font-bold flex items-center text-primary">
                            <span>EXPLORE</span>
                            <ChevronsRight size={20} className="ml-2"/>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    </div>
);

