import React from 'react';
import { BinarySearchContent } from './topics/binarySearch';
import { BubbleSortContent } from './topics/bubbleSort';

// --- Data for Topics ---
export const algorithmTopics = [
    {
        id: 'binary-search',
        chapter: '3.1',
        title: 'Binary Search',
        tags: ['🧠 Divide & Conquer', '🔍 Search'],
        description: 'A fast search algorithm that finds an element in a sorted array by repeatedly dividing the search interval in half.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'interactive-demo', title: 'Algorithm + Visualization' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <BinarySearchContent {...props} />
    },
    {
        id: 'bubble-sort',
        chapter: '4.1',
        title: 'Bubble Sort',
        tags: ['🔁 Comparison Sort', '🐌 Inefficient'],
        description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'interactive-demo', title: 'Algorithm + Visualization' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <BubbleSortContent {...props} />
    }
];