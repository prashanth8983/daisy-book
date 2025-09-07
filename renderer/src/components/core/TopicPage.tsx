import React, { useState } from 'react';
import { AlgorithmTopic } from '../../types';
import { IconHome, IconChevronsRight, IconBookMarked } from '../ui/icons';

interface TopicPageProps {
    topic: AlgorithmTopic;
    onBackToHome: () => void;
}

export const TopicPage: React.FC<TopicPageProps> = ({ topic, onBackToHome }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    return (
        <div className="flex w-full h-screen overflow-hidden">
            {/* --- SIDEBAR --- */}
            <aside className={`bg-[var(--bg-primary)] border-r-2 border-black flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
                <div className="p-4 h-full flex flex-col">
                    <div className="pb-4 mb-4 border-b-2 border-black">
                        <button 
                            onClick={onBackToHome} 
                            className={`win1-button flex items-center gap-3 w-full p-2 transition-colors ${!isSidebarOpen && 'justify-center'}`} 
                            title="Back to Home"
                        >
                            <IconHome className="w-6 h-6" />
                            {isSidebarOpen && <span className="text-sm">HOME</span>}
                        </button>
                    </div>
                    
                    {isSidebarOpen && (
                        <div className="win1-window mb-4">
                            <div className="win1-titlebar truncate">{topic.title}</div>
                        </div>
                    )}
                    
                    <nav className="flex-grow overflow-y-auto">
                        <ul className="space-y-2">
                            {topic.sections && topic.sections.map(section => (
                                <li key={section.id}>
                                    <a 
                                        href={`#${section.id}`} 
                                        title={section.title}
                                        className={`win1-button flex items-center gap-4 w-full text-left p-3 ${!isSidebarOpen && 'justify-center'}`}
                                    >
                                        <section.icon className="w-6 h-6 flex-shrink-0" />
                                        {isSidebarOpen && <span className="truncate">{section.title}</span>}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
            
            <div className="relative flex-1">
                {/* --- COLLAPSE/EXPAND BUTTON --- */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="absolute p-2 win1-button z-10"
                    style={{
                        top: '36px',
                        left: '4px',
                        transform: 'translateY(-50%)'
                    }}
                    title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                >
                    <IconChevronsRight className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* --- MAIN CONTENT --- */}
                <main className="h-full overflow-y-auto bg-white" style={{ scrollBehavior: 'smooth' }}>
                    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative pl-20">
                        {/* --- CHAPTER TITLE --- */}
                        <div className="mb-8 animate-fadeIn">
                            <div className="win1-window">
                                <div className="win1-titlebar">
                                    <span className="text-lg font-bold">CHAPTER {topic.chapter}</span>
                                </div>
                                <div className="p-6">
                                    <h1 className="text-4xl font-bold mb-6 text-center">{topic.title}</h1>
                                    <div className="win1-inset p-4 bg-white">
                                        <h3 className="font-bold mb-2 flex items-center gap-2">
                                            <IconBookMarked className="w-5 h-5" />
                                            Definition
                                        </h3>
                                        <blockquote className="border-l-4 border-black pl-4 text-black">
                                            {topic.id === 'binary-search' ? (
                                                "An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one."
                                            ) : topic.id === 'bubble-sort' ? (
                                                "A simple comparison-based sorting algorithm where adjacent elements are compared and swapped if they are not in the intended order. This process is repeated until the list is sorted."
                                            ) : topic.description}
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {React.createElement(topic.content, { topic })}
                    </div>
                </main>
            </div>
        </div>
    );
};