import React, { useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ui';

export const TopicPage = ({ topic, onBackToHome }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex w-full bg-background">
            <aside className={`bg-secondary border-r-2 border-border flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-0'} overflow-hidden`}>
                <div className="p-6 sticky top-0">
                     <button onClick={onBackToHome} className="flex items-center gap-2 font-bold mb-6 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={16} />
                        BACK
                    </button>
                    <h2 className="text-2xl font-bold font-serif mb-6 text-primary">{topic.title}</h2>
                    <nav>
                        <ul>
                            {topic.sections && topic.sections.map(section => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`} className="block w-full text-left py-2 px-3 text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors rounded-md font-sans">
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            <div className="flex-1 relative">
                <div className="fixed top-4 right-4 z-20">
                    <ThemeToggle />
                </div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="fixed top-4 left-4 z-20 p-2 rounded-full bg-secondary hover:bg-muted transition-colors">
                    {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
                <main className="h-screen overflow-y-auto animate-fade-in" style={{ scrollBehavior: 'smooth' }}>
                    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 relative">
                        {topic.content({ topic })}
                    </div>
                </main>
            </div>
        </div>
    );
};