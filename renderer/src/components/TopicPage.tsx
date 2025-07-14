import React, { useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';

export const TopicPage = ({ topic, onBackToHome }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex w-full">
            <aside className={`bg-var(--bg-secondary) border-r-2 border-var(--border-color) flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-0'} overflow-hidden`}>
                <div className="p-6 sticky top-0">
                     <button onClick={onBackToHome} className="flex items-center gap-2 font-bold mb-6 text-var(--text-secondary) hover:text-var(--text-primary)">
                        <ArrowLeft size={16} />
                        BACK
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-var(--highlight-primary)">{topic.title}</h2>
                    <nav>
                        <ul>
                            {topic.sections && topic.sections.map(section => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`} className="block w-full text-left py-2 px-3 hover:bg-var(--bg-accent) text-var(--text-secondary) hover:text-var(--text-primary) transition-colors rounded-md">
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            <div className="flex-1 relative">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="fixed top-4 left-4 z-20 p-2 retro-border bg-var(--bg-primary) hover:bg-var(--bg-secondary) transition-colors">
                    {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
                <main className="h-screen overflow-y-auto animate-fadeIn" style={{ scrollBehavior: 'smooth' }}>
                    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 relative">
                        {topic.content({ topic })}
                    </div>
                </main>
            </div>
        </div>
    );
};