import React from 'react';
import { ArrayContent } from './topics/array';
import { StringContent } from './topics/string';
import { LinkedListContent } from './topics/linkedList';
import { StackContent } from './topics/stack';
import { QueueContent } from './topics/queue';
import { HashContent } from './topics/hash';
import { BinarySearchContent } from './topics/binarySearch';
import { BubbleSortContent } from './topics/bubbleSort';
import { HeapContent } from './topics/heap';

export const algorithmTopics = [
    {
        id: 'array',
        chapter: '1.1',
        title: 'Array',
        tags: ['📦 Data Structure', '📚 Fundamental'],
        description: 'A data structure consisting of a collection of elements, each identified by at least one array index or key.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'interactive-demo', title: 'Interactive Demo' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <ArrayContent {...props} />
    },
    {
        id: 'string',
        chapter: '1.2',
        title: 'String',
        tags: ['📦 Data Structure', '📚 Fundamental'],
        description: 'A sequence of characters, used to represent text.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <StringContent {...props} />
    },
    {
        id: 'linked-list',
        chapter: '1.3',
        title: 'Linked List',
        tags: ['🔗 Data Structure', '📚 Fundamental'],
        description: 'A linear data structure where elements are not stored at contiguous memory locations; the elements are linked using pointers.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <LinkedListContent {...props} />
    },
    {
        id: 'stack',
        chapter: '1.4',
        title: 'Stack',
        tags: ['📦 Data Structure', 'LIFO'],
        description: 'A linear data structure that follows the LIFO (Last-In, First-Out) principle.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'interactive-demo', title: 'Interactive Demo' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <StackContent {...props} />
    },
    {
        id: 'queue',
        chapter: '1.5',
        title: 'Queue',
        tags: ['📦 Data Structure', 'FIFO'],
        description: 'A linear data structure that follows the FIFO (First-In, First-Out) principle.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'interactive-demo', title: 'Interactive Demo' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <QueueContent {...props} />
    },
    {
        id: 'hash-table',
        chapter: '1.6',
        title: 'Hash Table',
        tags: ['🔑 Data Structure', '🚀 Fast Lookups'],
        description: 'A data structure which stores data in an associative manner. In a hash table, data is stored in an array format, where each data value has its own unique index value.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <HashContent {...props} />
    },
    {
        id: 'binary-search',
        chapter: '2.1',
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
        chapter: '2.2',
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
    },
    {
        id: 'heap',
        chapter: '2.3',
        title: 'Heap',
        tags: ['🌲 Tree-based', '🥇 Priority Queue'],
        description: 'A specialized tree-based data structure that satisfies the heap property, useful for implementing priority queues.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'interactive-demo', title: 'Algorithm + Visualization' },
            { id: 'key-operations', title: 'Key Operations' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <HeapContent {...props} />
    }
];