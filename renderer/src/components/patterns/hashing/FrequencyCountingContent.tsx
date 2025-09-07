import React, { useState } from 'react';
import { PatternComponentProps } from '../../../types';
import { Controls } from '../../ui/Controls';
import { RetroCodeBlock } from '../../ui/RetroCodeBlock';
import { EnhancedChart } from '../../ui/EnhancedChart';
import { ExecutionCard, leetCodeProblems } from '../../ui/ExecutionCard';

export const FrequencyCountingContent: React.FC<PatternComponentProps> = ({ pattern }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [array] = useState([1, 1, 1, 2, 2, 3]);
    const [k] = useState(2);
    const [frequency, setFrequency] = useState<Map<number, number>>(new Map());
    const [topK, setTopK] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const steps = [
        { index: 0, freq: new Map([[1, 1]]), topK: [1], desc: "Count 1: frequency = 1" },
        { index: 1, freq: new Map([[1, 2]]), topK: [1], desc: "Count 1 again: frequency = 2" },
        { index: 2, freq: new Map([[1, 3]]), topK: [1], desc: "Count 1 again: frequency = 3" },
        { index: 3, freq: new Map([[1, 3], [2, 1]]), topK: [1, 2], desc: "Count 2: frequency = 1. Top 2: [1, 2]" },
        { index: 4, freq: new Map([[1, 3], [2, 2]]), topK: [1, 2], desc: "Count 2 again: frequency = 2. Top 2: [1, 2]" },
        { index: 5, freq: new Map([[1, 3], [2, 2], [3, 1]]), topK: [1, 2], desc: "Count 3: frequency = 1. Final top 2: [1, 2]" }
    ];

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (isFinished) {
            setCurrentStep(0);
            setIsFinished(false);
            setFrequency(new Map());
            setTopK([]);
            setCurrentIndex(0);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
        setIsFinished(false);
        setFrequency(new Map());
        setTopK([]);
        setCurrentIndex(0);
    };

    const handleStepForward = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            const step = steps[nextStep];
            setCurrentIndex(step.index);
            setFrequency(step.freq);
            setTopK(step.topK);
            if (nextStep === steps.length - 1) {
                setIsFinished(true);
                setIsPlaying(false);
            }
        }
    };

    const handleStepBack = () => {
        if (currentStep > 0) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            const step = steps[prevStep];
            setCurrentIndex(step.index);
            setFrequency(step.freq);
            setTopK(step.topK);
            setIsFinished(false);
        }
    };

    const chartData = Array.from(frequency.entries()).map(([num, freq]) => ({
        number: num,
        frequency: freq,
        isTopK: topK.includes(num)
    }));

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && !isFinished && currentStep < steps.length - 1) {
            interval = setInterval(() => {
                handleStepForward();
            }, speed);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, isFinished, speed]);

    return (
        <div className="space-y-6">
            <div className="win1-inset p-4">
                <h3 className="text-xl font-bold mb-2">Top K Frequent Elements</h3>
                <p className="mb-4">Array: {JSON.stringify(array)}, K = {k}</p>
                <p className="mb-4 font-medium">{steps[currentStep]?.desc}</p>
                
                <div className="mb-4">
                    <h4 className="font-bold mb-2">Processing Array:</h4>
                    <div className="flex gap-1">
                        {array.map((val, index) => (
                            <div
                                key={index}
                                className={`w-12 h-12 win1-button flex items-center justify-center text-sm font-mono ${
                                    index <= currentIndex ? 
                                        (index === currentIndex ? 'bg-yellow-200 border-yellow-500 border-2' : 'bg-blue-100') : 
                                        'bg-gray-200'
                                }`}
                            >
                                {val}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="win1-inset p-3">
                        <h4 className="font-bold mb-2">Frequency Map:</h4>
                        <div className="space-y-2">
                            {Array.from(frequency.entries()).map(([num, freq]) => (
                                <div key={num} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <span className="font-mono">{num}:</span>
                                    <span className="font-mono font-bold">{freq}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="win1-inset p-3">
                        <h4 className="font-bold mb-2">Top {k} Frequent:</h4>
                        <div className="flex gap-2">
                            {topK.map((num) => (
                                <div
                                    key={num}
                                    className="w-12 h-12 win1-button flex items-center justify-center text-lg font-mono bg-green-200"
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <EnhancedChart
                data={chartData}
                lines={[
                    { dataKey: 'frequency', name: 'Frequency', color: '#8884d8' }
                ]}
                title="Element Frequency Analysis"
                subtitle="Count frequency of each element"
                inputLabel="Element Value"
            />

            <Controls
                isPlaying={isPlaying}
                isFinished={isFinished}
                onPlayPause={handlePlayPause}
                onReset={handleReset}
                onStepBack={handleStepBack}
                onStepForward={handleStepForward}
                onSpeedChange={setSpeed}
                speed={speed}
                currentStep={currentStep}
            />

            <div className="win1-inset p-4">
                <h3 className="text-xl font-bold mb-4">Implementation</h3>
                <RetroCodeBlock
                    language="python"
                    code={`from collections import Counter
import heapq

def top_k_frequent_elements(nums, k):
    """
    Find k most frequent elements using hash map + heap
    Time: O(n log k), Space: O(n)
    """
    # Count frequencies
    frequency = {}
    for num in nums:
        frequency[num] = frequency.get(num, 0) + 1
    
    # Use min-heap to keep top k elements
    heap = []
    for num, freq in frequency.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)
    
    # Extract elements from heap
    return [num for freq, num in heap]

def top_k_frequent_bucket_sort(nums, k):
    """
    Using bucket sort for O(n) solution
    Time: O(n), Space: O(n)
    """
    frequency = Counter(nums)
    
    # Create buckets for each possible frequency
    buckets = [[] for _ in range(len(nums) + 1)]
    
    # Place numbers in buckets by frequency
    for num, freq in frequency.items():
        buckets[freq].append(num)
    
    # Collect top k elements from highest frequency buckets
    result = []
    for i in range(len(buckets) - 1, -1, -1):
        for num in buckets[i]:
            if len(result) < k:
                result.append(num)
            else:
                break
        if len(result) == k:
            break
    
    return result

def group_anagrams(strs):
    """
    Group anagrams using frequency counting
    Time: O(n * m), Space: O(n * m) where m is average string length
    """
    anagram_groups = {}
    
    for s in strs:
        # Count character frequencies
        char_count = [0] * 26
        for char in s:
            char_count[ord(char) - ord('a')] += 1
        
        # Use frequency tuple as key
        key = tuple(char_count)
        if key not in anagram_groups:
            anagram_groups[key] = []
        anagram_groups[key].append(s)
    
    return list(anagram_groups.values())

def find_all_duplicates(nums):
    """
    Find all duplicates in array where 1 ≤ nums[i] ≤ n
    Time: O(n), Space: O(1) - using input array as hash table
    """
    result = []
    
    for num in nums:
        # Use absolute value as index
        index = abs(num) - 1
        
        # If already negative, we've seen this number
        if nums[index] < 0:
            result.append(abs(num))
        else:
            # Mark as seen by negating
            nums[index] = -nums[index]
    
    # Restore original array (optional)
    for i in range(len(nums)):
        nums[i] = abs(nums[i])
    
    return result

def subarray_sum_equals_k(nums, k):
    """
    Count subarrays with sum equal to k
    Time: O(n), Space: O(n)
    """
    count = 0
    prefix_sum = 0
    sum_frequency = {0: 1}  # Handle case where prefix_sum == k
    
    for num in nums:
        prefix_sum += num
        
        # Check if (prefix_sum - k) exists
        if (prefix_sum - k) in sum_frequency:
            count += sum_frequency[prefix_sum - k]
        
        # Update frequency of current prefix sum
        sum_frequency[prefix_sum] = sum_frequency.get(prefix_sum, 0) + 1
    
    return count

def longest_consecutive_sequence(nums):
    """
    Find length of longest consecutive sequence
    Time: O(n), Space: O(n)
    """
    if not nums:
        return 0
    
    num_set = set(nums)
    max_length = 0
    
    for num in num_set:
        # Only start counting if this is the beginning of a sequence
        if num - 1 not in num_set:
            current_num = num
            current_length = 1
            
            # Count consecutive numbers
            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1
            
            max_length = max(max_length, current_length)
    
    return max_length

# Example usage:
nums = [1, 1, 1, 2, 2, 3]
k = 2
result = top_k_frequent_elements(nums, k)
print(f"Top {k} frequent elements: {result}")

# Anagram grouping
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
groups = group_anagrams(strs)
print(f"Anagram groups: {groups}")

# Subarray sum
arr = [1, 1, 1]
target = 2
count = subarray_sum_equals_k(arr, target)
print(f"Subarrays with sum {target}: {count}")

# Consecutive sequence
sequence = [100, 4, 200, 1, 3, 2]
length = longest_consecutive_sequence(sequence)
print(f"Longest consecutive sequence length: {length}")`}
                />
            </div>

            <div className="win1-inset p-4">
                <h3 className="text-xl font-bold mb-4">Hashing Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-bold mb-2">Frequency Counting:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Top K Frequent Elements</li>
                            <li>Group Anagrams</li>
                            <li>Find All Duplicates</li>
                            <li>Majority Element</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Prefix Sum + Hash:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Subarray Sum Equals K</li>
                            <li>Continuous Subarray Sum</li>
                            <li>Subarray Sums Divisible by K</li>
                            <li>Maximum Size Subarray Sum Equals k</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="win1-inset p-4">
                <h3 className="text-xl font-bold mb-4">Key Points</h3>
                <ul className="list-disc list-inside space-y-2">
                    {pattern.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>

            <div className="win1-inset p-4">
                <h3 className="text-xl font-bold mb-4">Hash Table Optimizations</h3>
                <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-300">
                        <h4 className="font-bold text-blue-800">Space Optimization:</h4>
                        <p className="text-blue-700">Use input array as hash table when range is known (1 ≤ nums[i] ≤ n)</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-300">
                        <h4 className="font-bold text-green-800">Time Optimization:</h4>
                        <p className="text-green-700">Use bucket sort for O(n) top-k when k ≤ n</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-300">
                        <h4 className="font-bold text-yellow-800">Memory Optimization:</h4>
                        <p className="text-yellow-700">Use bit manipulation for boolean frequency (character sets)</p>
                    </div>
                </div>

                {/* LeetCode Problems Section */}
                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-6">Practice Problems</h3>
                    <div className="space-y-6">
                        {leetCodeProblems['frequency-counting'].map((problem) => (
                            <ExecutionCard 
                                key={problem.id} 
                                problem={problem} 
                                patternName="Frequency Counting" 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};