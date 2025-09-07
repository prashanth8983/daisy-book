import React, { useState } from 'react';
import { Pattern, DSACategory } from '../../types';
import { TbArrowBack } from 'react-icons/tb';
import { IconHome, IconChevronsRight, IconLightbulb, IconBeaker, IconBarChart3, IconTarget, IconAlertTriangle } from '../ui/icons';

interface PatternPageProps {
    pattern: Pattern;
    category: DSACategory;
    onBack: () => void;
}

export const PatternPage: React.FC<PatternPageProps> = ({ pattern, category, onBack }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    // Define sections for pattern navigation
    const patternSections = [
        { id: 'introduction', title: 'Introduction', icon: IconLightbulb },
        { id: 'interactive-demo', title: 'Interactive Demo', icon: IconBeaker },
        { id: 'complexity-analysis', title: 'Complexity Analysis', icon: IconBarChart3 },
        { id: 'use-cases', title: 'Applications', icon: IconTarget },
        { id: 'disadvantages', title: 'Disadvantages', icon: IconAlertTriangle }
    ];

    const PatternContent = pattern.content;

    return (
        <div className="flex w-full h-screen overflow-hidden">
            {/* --- SIDEBAR --- */}
            <aside className={`bg-[var(--bg-primary)] border-r-2 border-black flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
                <div className="p-4 h-full flex flex-col">
                    <div className="pb-4 mb-4 border-b-2 border-black">
                        <button 
                            onClick={onBack} 
                            className={`win1-button flex items-center gap-3 w-full p-2 transition-colors ${!isSidebarOpen && 'justify-center'}`} 
                            title="Back to Home"
                        >
                            <IconHome className="w-6 h-6" />
                            {isSidebarOpen && <span className="text-sm">HOME</span>}
                        </button>
                    </div>
                    
                    {isSidebarOpen && (
                        <div className="win1-window mb-4">
                            <div className="win1-titlebar truncate">{pattern.title}</div>
                            <div className="p-2 text-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <category.icon className="w-4 h-4" />
                                    <span>{category.title}</span>
                                </div>
                                <div className="text-xs text-gray-600">{pattern.description}</div>
                            </div>
                        </div>
                    )}
                    
                    <nav className="flex-grow overflow-y-auto">
                        <ul className="space-y-2">
                            {patternSections.map(section => (
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
                        {/* --- PATTERN HEADER --- */}
                        <div className="mb-8 animate-fadeIn">
                            <div className="win1-window">
                                <div className="win1-titlebar">
                                    <div className="flex items-center gap-2">
                                        <category.icon className="w-5 h-5" />
                                        <span className="text-lg font-bold">{category.title} - {pattern.title}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h1 className="text-4xl font-bold mb-6 text-center">{pattern.title}</h1>
                                    <div className="win1-inset p-4 bg-white">
                                        <h3 className="font-bold mb-2 flex items-center gap-2">
                                            <IconLightbulb className="w-5 h-5" />
                                            Pattern Description
                                        </h3>
                                        <blockquote className="border-l-4 border-black pl-4 text-black">
                                            {pattern.description}
                                        </blockquote>
                                        <div className="flex gap-4 mt-4 flex-wrap">
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
                                                {pattern.difficulty}
                                            </span>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">
                                                {pattern.frequency} Frequency
                                            </span>
                                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-mono">
                                                {pattern.timeComplexity}
                                            </span>
                                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-sm font-mono">
                                                {pattern.spaceComplexity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PatternContent pattern={pattern} />
                    </div>
                </main>
            </div>
        </div>
    );
};