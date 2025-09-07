import React, { useState } from 'react';
import { Win1Window } from './Win1Window';
import { RetroCodeBlock } from './RetroCodeBlock';
import { IconCode2, IconTarget, IconAlertTriangle, IconLightbulb, IconHome } from './icons';

export interface LeetCodeProblem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    constraints: string[];
    solution: string;
    timeComplexity: string;
    spaceComplexity: string;
    pattern: string;
}

interface ExecutionCardProps {
    problem: LeetCodeProblem;
    patternName: string;
}

export const ExecutionCard: React.FC<ExecutionCardProps> = ({ problem, patternName }) => {
    const [showSolution, setShowSolution] = useState(false);
    const [showExamples, setShowExamples] = useState(false);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="mb-6">
            <Win1Window title={`LeetCode ${problem.id}: ${problem.title}`}>
                <div className="space-y-4">
                    {/* Problem Header */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className={`px-3 py-1 rounded text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
                            {patternName}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-mono">
                            {problem.timeComplexity}
                        </span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-sm font-mono">
                            {problem.spaceComplexity}
                        </span>
                    </div>

                    {/* Problem Description */}
                    <div className="prose max-w-none">
                        <p className="text-lg leading-relaxed">{problem.description}</p>
                    </div>

                    {/* Constraints */}
                    <div className="win1-inset bg-gray-50 p-4">
                        <h4 className="font-bold mb-2">Constraints:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {problem.constraints.map((constraint, index) => (
                                <li key={index} className="text-sm">{constraint}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Examples Toggle */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowExamples(!showExamples)}
                            className="win1-button flex items-center gap-2"
                        >
                            <IconLightbulb className="w-4 h-4" />
                            {showExamples ? 'Hide Examples' : 'Show Examples'}
                        </button>
                        <button
                            onClick={() => setShowSolution(!showSolution)}
                            className="win1-button flex items-center gap-2"
                        >
                            <IconCode2 className="w-4 h-4" />
                            {showSolution ? 'Hide Solution' : 'Show Solution'}
                        </button>
                    </div>

                    {/* Examples */}
                    {showExamples && (
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg">Examples:</h4>
                            {problem.examples.map((example, index) => (
                                <div key={index} className="win1-inset bg-white p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Input</span>
                                            </h5>
                                            <RetroCodeBlock language="text" code={example.input} />
                                        </div>
                                        <div>
                                            <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Output</span>
                                            </h5>
                                            <RetroCodeBlock language="text" code={example.output} />
                                        </div>
                                    </div>
                                    {example.explanation && (
                                        <div className="mt-3">
                                            <h5 className="font-semibold mb-2 flex items-center gap-2">
                                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Explanation</span>
                                            </h5>
                                            <p className="text-sm text-gray-700">{example.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Solution */}
                    {showSolution && (
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg">Solution:</h4>
                            <RetroCodeBlock language="javascript" code={problem.solution} />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t-2 border-black">
                        <a
                            href={`https://leetcode.com/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="win1-button flex items-center gap-2"
                        >
                            <IconTarget className="w-4 h-4" />
                            Solve on LeetCode
                        </a>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(problem.solution);
                            }}
                            className="win1-button flex items-center gap-2"
                        >
                            <IconCode2 className="w-4 h-4" />
                            Copy Solution
                        </button>
                    </div>
                </div>
            </Win1Window>
        </div>
    );
};

// Collection of LeetCode problems for each pattern
export const leetCodeProblems: Record<string, LeetCodeProblem[]> = {
    'prefix-sum': [
        {
            id: 303,
            title: 'Range Sum Query - Immutable',
            difficulty: 'Easy',
            description: 'Given an integer array nums, handle multiple queries of the following type: Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.',
            examples: [
                {
                    input: 'nums = [-2, 0, 3, -5, 2, -1]\nsumRange(0, 2) // return 1 ((-2) + 0 + 3)',
                    output: '1',
                    explanation: 'sumRange(0, 2) -> (-2) + 0 + 3 = 1'
                },
                {
                    input: 'sumRange(2, 5) // return -1 (3 + (-5) + 2 + (-1))',
                    output: '-1',
                    explanation: 'sumRange(2, 5) -> 3 + (-5) + 2 + (-1) = -1'
                }
            ],
            constraints: [
                '1 <= nums.length <= 10^4',
                '-10^5 <= nums[i] <= 10^5',
                '0 <= left <= right < nums.length',
                'At most 10^4 calls will be made to sumRange'
            ],
            solution: `class NumArray {
    constructor(nums) {
        this.prefixSum = new Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; i++) {
            this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
        }
    }
    
    sumRange(left, right) {
        return this.prefixSum[right + 1] - this.prefixSum[left];
    }
}`,
            timeComplexity: 'O(n) preprocessing, O(1) query',
            spaceComplexity: 'O(n)',
            pattern: 'Prefix Sum'
        },
        {
            id: 560,
            title: 'Subarray Sum Equals K',
            difficulty: 'Medium',
            description: 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.',
            examples: [
                {
                    input: 'nums = [1,1,1], k = 2',
                    output: '2',
                    explanation: 'The subarrays [1,1] and [1,1] have sum 2'
                },
                {
                    input: 'nums = [1,2,3], k = 3',
                    output: '2',
                    explanation: 'The subarrays [1,2] and [3] have sum 3'
                }
            ],
            constraints: [
                '1 <= nums.length <= 2 * 10^4',
                '-1000 <= nums[i] <= 1000',
                '-10^7 <= k <= 10^7'
            ],
            solution: `function subarraySum(nums, k) {
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1); // Empty subarray has sum 0
    
    let count = 0;
    let prefixSum = 0;
    
    for (let num of nums) {
        prefixSum += num;
        // If (prefixSum - k) exists, then there's a subarray with sum k
        if (prefixSumCount.has(prefixSum - k)) {
            count += prefixSumCount.get(prefixSum - k);
        }
        prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
    }
    
    return count;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            pattern: 'Prefix Sum + Hash Map'
        }
    ],
    'sliding-window': [
        {
            id: 3,
            title: 'Longest Substring Without Repeating Characters',
            difficulty: 'Medium',
            description: 'Given a string s, find the length of the longest substring without repeating characters.',
            examples: [
                {
                    input: 's = "abcabcbb"',
                    output: '3',
                    explanation: 'The answer is "abc", with the length of 3'
                },
                {
                    input: 's = "bbbbb"',
                    output: '1',
                    explanation: 'The answer is "b", with the length of 1'
                }
            ],
            constraints: [
                '0 <= s.length <= 5 * 10^4',
                's consists of English letters, digits, symbols and spaces'
            ],
            solution: `function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        // If character already exists, shrink window from left
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(min(m,n))',
            pattern: 'Sliding Window'
        },
        {
            id: 76,
            title: 'Minimum Window Substring',
            difficulty: 'Hard',
            description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.',
            examples: [
                {
                    input: 's = "ADOBECODEBANC", t = "ABC"',
                    output: '"BANC"',
                    explanation: 'The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t'
                },
                {
                    input: 's = "a", t = "a"',
                    output: '"a"',
                    explanation: 'The entire string s is the minimum window'
                }
            ],
            constraints: [
                'm == s.length',
                'n == t.length',
                '1 <= m, n <= 10^5',
                's and t consist of uppercase and lowercase English letters'
            ],
            solution: `function minWindow(s, t) {
    const tCount = new Map();
    for (let char of t) {
        tCount.set(char, (tCount.get(char) || 0) + 1);
    }
    
    let left = 0;
    let minStart = 0;
    let minLength = Infinity;
    let required = tCount.size;
    let formed = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        if (tCount.has(rightChar)) {
            tCount.set(rightChar, tCount.get(rightChar) - 1);
            if (tCount.get(rightChar) === 0) formed++;
        }
        
        while (formed === required) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minStart = left;
            }
            
            const leftChar = s[left];
            if (tCount.has(leftChar)) {
                tCount.set(leftChar, tCount.get(leftChar) + 1);
                if (tCount.get(leftChar) > 0) formed--;
            }
            left++;
        }
    }
    
    return minLength === Infinity ? "" : s.substring(minStart, minStart + minLength);
}`,
            timeComplexity: 'O(|s| + |t|)',
            spaceComplexity: 'O(|s| + |t|)',
            pattern: 'Sliding Window'
        }
    ],
    'two-pointers': [
        {
            id: 11,
            title: 'Container With Most Water',
            difficulty: 'Medium',
            description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that holds the most water.',
            examples: [
                {
                    input: 'height = [1,8,6,2,5,4,8,3,7]',
                    output: '49',
                    explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.'
                },
                {
                    input: 'height = [1,1]',
                    output: '1',
                    explanation: 'The container formed by the two lines has area 1'
                }
            ],
            constraints: [
                'n == height.length',
                '2 <= n <= 10^5',
                '0 <= height[i] <= 10^4'
            ],
            solution: `function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        // Calculate current area
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const currentArea = width * minHeight;
        maxArea = Math.max(maxArea, currentArea);
        
        // Move pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            pattern: 'Two Pointers'
        },
        {
            id: 15,
            title: '3Sum',
            difficulty: 'Medium',
            description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
            examples: [
                {
                    input: 'nums = [-1,0,1,2,-1,-4]',
                    output: '[[-1,-1,2],[-1,0,1]]',
                    explanation: 'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.'
                },
                {
                    input: 'nums = [0,1,1]',
                    output: '[]',
                    explanation: 'The only possible triplet does not sum up to 0'
                }
            ],
            constraints: [
                '3 <= nums.length <= 3000',
                '-10^5 <= nums[i] <= 10^5'
            ],
            solution: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first number
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates for second number
                while (left < right && nums[left] === nums[left + 1]) left++;
                // Skip duplicates for third number
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}`,
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            pattern: 'Two Pointers'
        }
    ],
    'kadane-algorithm': [
        {
            id: 53,
            title: 'Maximum Subarray',
            difficulty: 'Medium',
            description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
            examples: [
                {
                    input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
                    output: '6',
                    explanation: '[4,-1,2,1] has the largest sum = 6'
                },
                {
                    input: 'nums = [1]',
                    output: '1',
                    explanation: 'The subarray [1] has the largest sum 1'
                }
            ],
            constraints: [
                '1 <= nums.length <= 10^5',
                '-10^4 <= nums[i] <= 10^4'
            ],
            solution: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either extend existing subarray or start new one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            pattern: "Kadane's Algorithm"
        },
        {
            id: 918,
            title: 'Maximum Sum Circular Subarray',
            difficulty: 'Medium',
            description: 'Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums.',
            examples: [
                {
                    input: 'nums = [1,-2,3,-2]',
                    output: '3',
                    explanation: 'Subarray [3] has maximum sum 3'
                },
                {
                    input: 'nums = [5,-3,5]',
                    output: '10',
                    explanation: 'Subarray [5,5] has maximum sum 10'
                }
            ],
            constraints: [
                'n == nums.length',
                '1 <= n <= 3 * 10^4',
                '-3 * 10^4 <= nums[i] <= 3 * 10^4'
            ],
            solution: `function maxSubarraySumCircular(nums) {
    // Case 1: Maximum subarray is not circular (use Kadane's algorithm)
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    // Case 2: Maximum subarray is circular
    // Total sum - minimum subarray sum
    let totalSum = nums.reduce((sum, num) => sum + num, 0);
    let minSum = nums[0];
    let currentMinSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentMinSum = Math.min(nums[i], currentMinSum + nums[i]);
        minSum = Math.min(minSum, currentMinSum);
    }
    
    const circularMaxSum = totalSum - minSum;
    
    // Handle edge case: all negative numbers
    return maxSum > 0 ? Math.max(maxSum, circularMaxSum) : maxSum;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            pattern: "Kadane's Algorithm + Circular Array"
        }
    ],
    'string-sliding-window': [
        {
            id: 424,
            title: 'Longest Repeating Character Replacement',
            difficulty: 'Medium',
            description: 'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English letter. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.',
            examples: [
                {
                    input: 's = "ABAB", k = 2',
                    output: '4',
                    explanation: 'Replace the two \'A\'s with two \'B\'s or vice versa'
                },
                {
                    input: 's = "AABABBA", k = 1',
                    output: '4',
                    explanation: 'Replace the one \'A\' in the middle with \'B\' and form "AABBBBA"'
                }
            ],
            constraints: [
                '1 <= s.length <= 10^5',
                's consists of only uppercase English letters',
                '0 <= k <= s.length'
            ],
            solution: `function characterReplacement(s, k) {
    const charCount = new Map();
    let left = 0;
    let maxLength = 0;
    let maxCount = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
        maxCount = Math.max(maxCount, charCount.get(rightChar));
        
        // If window size - maxCount > k, shrink window
        if (right - left + 1 - maxCount > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            pattern: 'String Sliding Window'
        }
    ],
    'monotonic-stack': [
        {
            id: 739,
            title: 'Daily Temperatures',
            difficulty: 'Medium',
            description: 'Given an array of integers temperatures representing the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.',
            examples: [
                {
                    input: 'temperatures = [73,74,75,71,69,72,76,73]',
                    output: '[1,1,4,2,1,1,0,0]',
                    explanation: 'For day 0, next warmer day is day 1. For day 1, next warmer day is day 2, etc.'
                },
                {
                    input: 'temperatures = [30,40,50,60]',
                    output: '[1,1,1,0]',
                    explanation: 'Each day has a warmer day the next day'
                }
            ],
            constraints: [
                '1 <= temperatures.length <= 10^5',
                '30 <= temperatures[i] <= 100'
            ],
            solution: `function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = []; // Stack to store indices
    
    for (let i = 0; i < temperatures.length; i++) {
        // While current temperature is warmer than stack top
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }
    
    return result;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            pattern: 'Monotonic Stack'
        },
        {
            id: 84,
            title: 'Largest Rectangle in Histogram',
            difficulty: 'Hard',
            description: 'Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.',
            examples: [
                {
                    input: 'heights = [2,1,5,6,2,3]',
                    output: '10',
                    explanation: 'The largest rectangle is formed by bars with heights [5,6], area = 5 * 2 = 10'
                },
                {
                    input: 'heights = [2,4]',
                    output: '4',
                    explanation: 'The largest rectangle is formed by bars with heights [2,4], area = 2 * 2 = 4'
                }
            ],
            constraints: [
                '1 <= heights.length <= 10^5',
                '0 <= heights[i] <= 10^4'
            ],
            solution: `function largestRectangleArea(heights) {
    const stack = []; // Stack to store indices
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const currentHeight = i === heights.length ? 0 : heights[i];
        
        // While current height is smaller than stack top
        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            pattern: 'Monotonic Stack'
        }
    ],
    'frequency-counting': [
        {
            id: 347,
            title: 'Top K Frequent Elements',
            difficulty: 'Medium',
            description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
            examples: [
                {
                    input: 'nums = [1,1,1,2,2,3], k = 2',
                    output: '[1,2]',
                    explanation: 'Element 1 appears 3 times, element 2 appears 2 times. Top 2 most frequent elements are [1,2]'
                },
                {
                    input: 'nums = [1], k = 1',
                    output: '[1]',
                    explanation: 'Element 1 appears 1 time, which is the most frequent'
                }
            ],
            constraints: [
                '1 <= nums.length <= 10^5',
                'k is in the range [1, the number of unique elements in the array]',
                'It is guaranteed that the answer is unique'
            ],
            solution: `function topKFrequent(nums, k) {
    // Count frequencies
    const frequencyMap = new Map();
    for (let num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Create buckets for frequencies
    const buckets = new Array(nums.length + 1).fill(null).map(() => []);
    
    // Place numbers in buckets based on frequency
    for (let [num, freq] of frequencyMap) {
        buckets[freq].push(num);
    }
    
    // Collect top k frequent elements
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }
    
    return result.slice(0, k);
}`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            pattern: 'Frequency Counting + Bucket Sort'
        },
        {
            id: 49,
            title: 'Group Anagrams',
            difficulty: 'Medium',
            description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
            examples: [
                {
                    input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
                    output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
                    explanation: 'Anagrams are grouped together by their character frequency patterns'
                },
                {
                    input: 'strs = [""]',
                    output: '[[""]]',
                    explanation: 'Empty string is grouped with itself'
                }
            ],
            constraints: [
                '1 <= strs.length <= 10^4',
                '0 <= strs[i].length <= 100',
                'strs[i] consists of lowercase English letters only'
            ],
            solution: `function groupAnagrams(strs) {
    const anagramGroups = new Map();
    
    for (let str of strs) {
        // Sort characters to create a key
        const sortedStr = str.split('').sort().join('');
        
        if (!anagramGroups.has(sortedStr)) {
            anagramGroups.set(sortedStr, []);
        }
        anagramGroups.get(sortedStr).push(str);
    }
    
    return Array.from(anagramGroups.values());
}`,
            timeComplexity: 'O(n * m log m)',
            spaceComplexity: 'O(n * m)',
            pattern: 'Frequency Counting + Sorting'
        }
    ]
};
