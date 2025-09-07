import React, { useState } from 'react';
import { DSACategory, Pattern } from '../../types';
import { TbPlus, TbMinus } from 'react-icons/tb';

interface DSATableOfContentsProps {
    categories: DSACategory[];
    onSelectPattern: (pattern: Pattern, category: DSACategory) => void;
}

export const DSATableOfContents: React.FC<DSATableOfContentsProps> = ({ 
    categories, 
    onSelectPattern 
}) => {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const toggleCategory = (categoryId: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
    };
    
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Table of Contents</h2>
            <div className="space-y-2">
                {categories.sort((a, b) => a.orderIndex - b.orderIndex).map((category, categoryIndex) => (
                    <div key={category.id} className="border-b border-gray-400">
                        <div 
                            className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => toggleCategory(category.id)}
                        >
                            <button className="w-6 h-6 flex items-center justify-center">
                                {expandedCategories.has(category.id) ? 
                                    <TbMinus className="w-4 h-4" /> : 
                                    <TbPlus className="w-4 h-4" />
                                }
                            </button>
                            <span className="text-lg font-medium">
                                {categoryIndex + 1}. {category.title}
                            </span>
                        </div>
                        
                        {expandedCategories.has(category.id) && (
                            <div className="ml-9 pb-3">
                                <p className="text-gray-700 py-2 px-3 leading-relaxed mb-3">
                                    {category.description}
                                </p>
                                {category.patterns.length > 0 ? (
                                    <div className="space-y-2">
                                        {category.patterns.map((pattern, patternIndex) => (
                                            <div key={pattern.id} className="border-t border-gray-200 pt-2">
                                                <button
                                                    onClick={() => onSelectPattern(pattern, category)}
                                                    className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 transition-colors text-gray-700"
                                                >
                                                    <div className="font-medium">
                                                        {categoryIndex + 1}.{patternIndex + 1} {pattern.title}
                                                    </div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {pattern.description}
                                                    </div>
                                                </button>
                                            </div>
                                        ))}
                                        <div className="mt-3 pt-2 border-t border-gray-200">
                                            <button
                                                onClick={() => category.patterns.length > 0 && onSelectPattern(category.patterns[0], category)}
                                                className="win1-button px-4 py-2 text-sm"
                                                disabled={category.patterns.length === 0}
                                            >
                                                EXPLORE {category.title.toUpperCase()}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 text-sm italic">
                                        Coming soon...
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};