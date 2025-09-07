import React from 'react';
import { AlgorithmTopic, DSACategory, Pattern } from '../../types';
import { algorithmTopics } from '../../data/algorithmTopics';
import { dsaCategories } from '../../data/dsaCategories';
import { IconChevronsRight } from '../ui/icons';
import { TableOfContents } from '../ui/TableOfContents';
import { DSATableOfContents } from '../ui/DSATableOfContents';

interface HomePageProps {
    onSelectTopic: (topic: AlgorithmTopic) => void;
    onSelectPattern?: (pattern: Pattern, category: DSACategory) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTopic, onSelectPattern }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
        <div className="win1-window w-full max-w-6xl">
            <div className="win1-titlebar">
                <span>Interactive DSA Learning Platform</span>
            </div>
            <div className="p-4 text-center">
                <h1 className="text-4xl">Interactive DSA Learning</h1>
                <p className="text-xl mt-2">Master Data Structures & Algorithms with Visual Learning</p>
            </div>
            <main className="w-full mt-4 p-4">
                <DSATableOfContents 
                    categories={dsaCategories} 
                    onSelectPattern={onSelectPattern || (() => {})} 
                />
            </main>
        </div>
    </div>
);