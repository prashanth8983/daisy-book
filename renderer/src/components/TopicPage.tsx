import React, { useState } from 'react';
import { ArrowLeft, Menu, X, Moon, Sun } from 'lucide-react';

export const TopicPage = ({ topic, onBackToHome, theme, toggleTheme }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex w-full">
            <aside className={`bg-card border-r border-border flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-0'} overflow-hidden`}>
                <div className="p-6 sticky top-0 h-screen flex flex-col">
                    <div className="flex-grow">
                        <button onClick={onBackToHome} className="flex items-center gap-2 font-semibold mb-6 text-muted-foreground hover:text-foreground">
                            <ArrowLeft size={16} />
                            All Topics
                        </button>
                        <h2 className="text-xl font-bold mb-6">{topic.title}</h2>
                        <nav>
                            <ul>
                                {topic.sections && topic.sections.map(section => (
                                    <li key={section.id}>
                                        <a href={`#${section.id}`} className="block w-full text-left py-2 px-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors rounded-md font-medium">
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary self-start">
                        {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
                    </button>
                </div>
            </aside>

            <div className="flex-1 relative">
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="fixed top-4 left-4 z-20 p-2 rounded-full bg-card border border-border hover:bg-secondary transition-colors"
                    style={{ transform: isSidebarOpen ? 'translateX(calc(18rem - 100%))' : 'translateX(0)', transition: 'transform 0.3s' }}
                >
                    {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
                <main className="h-screen overflow-y-auto animate-fade-in" style={{ scrollBehavior: 'smooth' }}>
                    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                        {topic.content({ topic })}
                    </div>
                </main>
            </div>
        </div>
    );
};