import React, { useState } from 'react';
import { AlgorithmTopic } from '../../types';
import { TbPlus, TbMinus } from 'react-icons/tb';

interface TableOfContentsProps {
    topics: AlgorithmTopic[];
    onSelectTopic: (topic: AlgorithmTopic) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ topics, onSelectTopic }) => {
    const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

    const toggleTopic = (topicId: string) => {
        const newExpanded = new Set(expandedTopics);
        if (newExpanded.has(topicId)) {
            newExpanded.delete(topicId);
        } else {
            newExpanded.add(topicId);
        }
        setExpandedTopics(newExpanded);
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Table of Contents</h2>
            <div className="space-y-2">
                {topics.map((topic, index) => (
                    <div key={topic.id} className="border-b border-gray-400">
                        <div 
                            className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => toggleTopic(topic.id)}
                        >
                            <button className="w-6 h-6 flex items-center justify-center">
                                {expandedTopics.has(topic.id) ? 
                                    <TbMinus className="w-4 h-4" /> : 
                                    <TbPlus className="w-4 h-4" />
                                }
                            </button>
                            <span className="text-lg font-medium">
                                {index + 1}. {topic.title}
                            </span>
                        </div>
                        
                        {expandedTopics.has(topic.id) && (
                            <div className="ml-9 pb-3">
                                <p className="text-gray-700 py-2 px-3 leading-relaxed">
                                    {topic.description}
                                </p>
                                <div className="mt-3 pt-2 border-t border-gray-200">
                                    <button
                                        onClick={() => onSelectTopic(topic)}
                                        className="win1-button px-4 py-2 text-sm"
                                    >
                                        EXPLORE CHAPTER {topic.chapter}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};