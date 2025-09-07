import { DSACategory } from '../types';
import { TbTable, TbLetterCase, TbStack2, TbArrowsSort, TbHash } from 'react-icons/tb';
import { PrefixSumContent } from '../components/patterns/arrays/PrefixSumContent';
import { SlidingWindowContent } from '../components/patterns/arrays/SlidingWindowContent';
import { TwoPointersContent } from '../components/patterns/arrays/TwoPointersContent';
import { KadaneAlgorithmContent } from '../components/patterns/arrays/KadaneAlgorithmContent';
import { StringSlidingWindowContent } from '../components/patterns/strings/StringSlidingWindowContent';
import { MonotonicStackContent } from '../components/patterns/stacks/MonotonicStackContent';
import { FrequencyCountingContent } from '../components/patterns/hashing/FrequencyCountingContent';

// Arrays & Matrix Category
const arraysCategory: DSACategory = {
    id: 'arrays-matrix',
    title: 'Arrays & Matrix',
    description: 'Linear data structures and essential array manipulation patterns',
    icon: TbTable,
    orderIndex: 1,
    patterns: [
        {
            id: 'prefix-sum',
            title: 'Prefix Sum',
            description: 'Precompute cumulative sums for efficient range queries in O(1) time',
            difficulty: 'Easy',
            frequency: 'High',
            timeComplexity: 'O(n) preprocessing, O(1) query',
            spaceComplexity: 'O(n)',
            keyPoints: [
                'Build prefix array where prefix[i] = sum(arr[0...i])',
                'Range sum query: prefix[right] - prefix[left-1]',
                'Useful for subarray sum problems',
                'Can be extended to 2D arrays (2D prefix sum)'
            ],
            commonMistakes: [
                'Forgetting to handle left boundary (when left=0)',
                'Off-by-one errors in index calculations',
                'Not handling negative numbers properly',
                'Confusing inclusive vs exclusive range bounds'
            ],
            relatedProblems: [
                'Subarray Sum Equals K',
                'Range Sum Query - Immutable',
                'Contiguous Array',
                '2D Range Sum Query'
            ],
            leetcodeProblems: [303, 304, 525, 560, 1248],
            content: PrefixSumContent
        },
        {
            id: 'sliding-window',
            title: 'Sliding Window',
            description: 'Efficiently process subarrays by maintaining a window that slides through the array',
            difficulty: 'Medium',
            frequency: 'Very High',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            keyPoints: [
                'Fixed size: maintain window of constant size k',
                'Variable size: expand/shrink window based on condition',
                'Two pointers technique with left and right boundaries',
                'Avoid recalculating from scratch for each window'
            ],
            commonMistakes: [
                'Recalculating entire window sum instead of sliding',
                'Incorrect window shrinking logic',
                'Not handling edge cases (empty array, k > n)',
                'Forgetting to update max/min during window slide'
            ],
            relatedProblems: [
                'Maximum Average Subarray',
                'Longest Substring Without Repeating Characters',
                'Minimum Window Substring',
                'Permutation in String'
            ],
            leetcodeProblems: [3, 76, 209, 424, 567, 643, 904, 1004],
            content: SlidingWindowContent
        },
        {
            id: 'two-pointers',
            title: 'Two Pointers',
            description: 'Use two pointers moving towards each other or in same direction to solve array problems efficiently',
            difficulty: 'Easy',
            frequency: 'Very High',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            keyPoints: [
                'Opposite direction: start from ends, move towards center',
                'Same direction: both pointers move from start, different speeds',
                'Often used with sorted arrays',
                'Eliminates need for nested loops in many cases'
            ],
            commonMistakes: [
                'Not checking if array is sorted when required',
                'Infinite loops due to incorrect pointer movement',
                'Missing edge cases (empty array, single element)',
                'Incorrect boundary conditions (left >= right)'
            ],
            relatedProblems: [
                'Two Sum II',
                'Valid Palindrome',
                'Container With Most Water',
                'Remove Duplicates from Sorted Array'
            ],
            leetcodeProblems: [1, 11, 15, 26, 27, 75, 125, 167, 283, 344],
            content: TwoPointersContent
        },
        {
            id: 'kadane-algorithm',
            title: "Kadane's Algorithm",
            description: 'Find maximum sum contiguous subarray in linear time using dynamic programming approach',
            difficulty: 'Medium',
            frequency: 'High',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            keyPoints: [
                'At each position, decide: start new subarray or extend current one',
                'Reset current sum to 0 when it becomes negative',
                'Keep track of maximum sum seen so far',
                'Works for arrays with negative numbers'
            ],
            commonMistakes: [
                'Not handling all-negative arrays correctly',
                'Forgetting to track subarray indices',
                'Confusing with maximum product subarray',
                'Not considering circular subarray variants'
            ],
            relatedProblems: [
                'Maximum Subarray',
                'Maximum Product Subarray', 
                'Maximum Circular Subarray',
                'Best Time to Buy and Sell Stock'
            ],
            leetcodeProblems: [53, 152, 121, 918],
            content: KadaneAlgorithmContent
        }
    ]
};

// Strings Category  
const stringsCategory: DSACategory = {
    id: 'strings',
    title: 'Strings',
    description: 'String manipulation patterns and algorithms for text processing',
    icon: TbLetterCase,
    orderIndex: 2,
    patterns: [
        {
            id: 'string-sliding-window',
            title: 'String Sliding Window',
            description: 'Apply sliding window technique to string problems for efficient substring processing',
            difficulty: 'Medium',
            frequency: 'Very High',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(min(m,n))',
            keyPoints: [
                'Use hash map to track character frequencies in window',
                'Expand window by moving right pointer, shrink by moving left',
                'Handle both fixed-size and variable-size windows',
                'Common for longest/shortest substring problems'
            ],
            commonMistakes: [
                'Not handling character frequency correctly when shrinking',
                'Forgetting to update maximum/minimum length',
                'Incorrect window expansion/contraction logic',
                'Not considering edge cases (empty string, single character)'
            ],
            relatedProblems: [
                'Longest Substring Without Repeating Characters',
                'Minimum Window Substring',
                'Longest Substring with At Most K Distinct Characters',
                'Find All Anagrams in String'
            ],
            leetcodeProblems: [3, 76, 340, 424, 438, 567, 904],
            content: StringSlidingWindowContent
        }
    ]
};

// Stacks Category
const stacksCategory: DSACategory = {
    id: 'stacks',
    title: 'Stacks',
    description: 'LIFO data structure and stack-based algorithm patterns',
    icon: TbStack2,
    orderIndex: 3,
    patterns: [
        {
            id: 'monotonic-stack',
            title: 'Monotonic Stack',
            description: 'Stack that maintains elements in monotonic (increasing/decreasing) order for efficient range queries',
            difficulty: 'Medium',
            frequency: 'High',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            keyPoints: [
                'Maintain stack in strictly increasing or decreasing order',
                'Pop elements that violate monotonic property',
                'Useful for finding next/previous greater/smaller elements',
                'Each element is pushed and popped at most once'
            ],
            commonMistakes: [
                'Choosing wrong monotonic order (increasing vs decreasing)',
                'Forgetting to handle remaining elements in stack',
                'Not considering circular array variations',
                'Incorrect boundary handling in result array'
            ],
            relatedProblems: [
                'Next Greater Element',
                'Daily Temperatures',
                'Largest Rectangle in Histogram',
                'Trapping Rain Water'
            ],
            leetcodeProblems: [496, 503, 739, 84, 85, 42, 402],
            content: MonotonicStackContent
        }
    ]
};

// Queues Category
const queuesCategory: DSACategory = {
    id: 'queues',
    title: 'Queues & Deques',
    description: 'FIFO data structures and queue-based algorithm patterns',
    icon: TbArrowsSort,
    orderIndex: 4,
    patterns: [
        // Will implement queue patterns
    ]
};

// Hashing Category
const hashingCategory: DSACategory = {
    id: 'hashing',
    title: 'Hashing',
    description: 'Hash tables, frequency counting, and hashing-based patterns',
    icon: TbHash,
    orderIndex: 5,
    patterns: [
        {
            id: 'frequency-counting',
            title: 'Frequency Counting',
            description: 'Use hash maps to count element frequencies for solving various array and string problems',
            difficulty: 'Easy',
            frequency: 'Very High',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            keyPoints: [
                'Use hash map to track frequency of elements',
                'Combine with heap for top-k problems',
                'Use bucket sort for O(n) top-k when k ≤ n',
                'Can optimize space using input array as hash table'
            ],
            commonMistakes: [
                'Not handling empty input arrays',
                'Forgetting to handle ties in top-k problems',
                'Using sorting instead of heap for top-k',
                'Not considering space optimization techniques'
            ],
            relatedProblems: [
                'Top K Frequent Elements',
                'Group Anagrams',
                'Find All Duplicates in Array',
                'Subarray Sum Equals K'
            ],
            leetcodeProblems: [347, 49, 442, 560, 1, 128, 169, 219, 220],
            content: FrequencyCountingContent
        }
    ]
};

export const dsaCategories: DSACategory[] = [
    arraysCategory,
    stringsCategory,
    stacksCategory,
    queuesCategory,
    hashingCategory
];

export { arraysCategory, stringsCategory, stacksCategory, queuesCategory, hashingCategory };