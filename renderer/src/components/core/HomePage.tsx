import React from 'react';
import { AlgorithmTopic } from '../../types';
import { algorithmTopics } from '../../data/algorithmTopics';
import { IconChevronsRight } from '../ui/icons';

interface HomePageProps {
    onSelectTopic: (topic: AlgorithmTopic) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTopic }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
        <div className="win1-window w-full max-w-4xl">
            <div className="win1-titlebar">
                <span>Interactive Algorithms</span>
            </div>
            <div className="p-4 text-center">
                <h1 className="text-4xl">Interactive Algorithms</h1>
                <p className="text-xl mt-2">A Visual Guide</p>
            </div>
            <main className="w-full mt-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {algorithmTopics.map(topic => (
                        <button 
                            key={topic.id} 
                            onClick={() => onSelectTopic(topic)} 
                            className="win1-button p-6 text-left flex flex-col h-full"
                        >
                            <p className="font-bold">CHAPTER {topic.chapter}</p>
                            <h3 className="text-2xl my-2">{topic.title}</h3>
                            <p className="flex-grow">{topic.description}</p>
                            <div className="mt-4 font-bold flex items-center">
                                <span>EXPLORE</span>
                                <IconChevronsRight className="w-5 h-5 ml-2" />
                            </div>
                        </button>
                    ))}
                </div>
            </main>
        </div>
    </div>
);