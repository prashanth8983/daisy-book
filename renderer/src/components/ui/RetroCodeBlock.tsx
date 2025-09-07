import React from 'react';
import { IconCode2 } from './icons';

interface RetroCodeBlockProps {
    children: React.ReactNode;
    title?: string;
    language?: string;
    highlightLines?: number[];
    currentStep?: number;
    totalSteps?: number;
}

export const RetroCodeBlock: React.FC<RetroCodeBlockProps> = ({ 
    children, 
    title = "Algorithm", 
    language = "python", 
    highlightLines = [], 
    currentStep, 
    totalSteps 
}) => {
    const showProgressBar = currentStep !== undefined && totalSteps !== undefined && totalSteps > 1;
    
    return (
        <div className="win1-window h-full flex flex-col">
            <div className="win1-titlebar">
                <span className="flex items-center gap-2">
                    <IconCode2 className="w-5 h-5"/> 
                    {title}
                </span>
                <span className="text-sm">{language}</span>
            </div>
            <div className="p-4 text-sm overflow-x-auto bg-white flex-grow">
                <pre className="leading-relaxed">
                    {React.Children.map(children, (line, index) => {
                        const isHighlighted = highlightLines.includes(index + 1);
                        return (
                            <div key={index} className={`flex -mx-4 px-4 ${isHighlighted ? 'bg-[var(--highlight-code-bg)]' : ''}`}>
                                <span className={`inline-block w-8 text-right mr-4 select-none`}>
                                    {index + 1}
                                </span>
                                <span className={`${isHighlighted ? 'font-bold' : ''}`}>{line}</span>
                            </div>
                        );
                    })}
                </pre>
            </div>
            {showProgressBar && (
                <div className="m-2 mt-0">
                    <div className="h-6 win1-inset p-0.5">
                        <div className="h-full bg-black" style={{ width: `${(totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0)}%` }} />
                    </div>
                </div>
            )}
        </div>
    );
};