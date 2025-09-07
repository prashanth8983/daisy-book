import { AlgorithmTopic } from '../types';
import { IconLightbulb, IconBeaker, IconBarChart3, IconTarget, IconAlertTriangle } from '../components/ui/icons';
import { BinarySearchContent } from '../components/topics/BinarySearchContent';
import { BubbleSortContent } from '../components/topics/BubbleSortContent';

export const algorithmTopics: AlgorithmTopic[] = [
    {
        id: 'binary-search',
        chapter: '3.1',
        title: 'Binary Search',
        tags: ['🧠 Divide & Conquer', '🔍 Search'],
        description: 'A fast search algorithm that finds an element in a sorted array by repeatedly dividing the search interval in half.',
        sections: [
            { id: 'introduction', title: 'Introduction', icon: IconLightbulb },
            { id: 'interactive-demo', title: 'Algorithm + Visualization', icon: IconBeaker },
            { id: 'complexity-analysis', title: 'Complexity Analysis', icon: IconBarChart3 },
            { id: 'use-cases', title: 'Applications', icon: IconTarget },
            { id: 'disadvantages', title: 'Disadvantages', icon: IconAlertTriangle }
        ],
        content: BinarySearchContent
    },
    {
        id: 'bubble-sort',
        chapter: '4.1',
        title: 'Bubble Sort',
        tags: ['🔁 Comparison Sort', '🐌 Inefficient'],
        description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
        sections: [
            { id: 'introduction', title: 'Introduction', icon: IconLightbulb },
            { id: 'interactive-demo', title: 'Algorithm + Visualization', icon: IconBeaker },
            { id: 'complexity-analysis', title: 'Complexity Analysis', icon: IconBarChart3 },
            { id: 'use-cases', title: 'Applications', icon: IconTarget },
            { id: 'disadvantages', title: 'Disadvantages', icon: IconAlertTriangle }
        ],
        content: BubbleSortContent
    }
];