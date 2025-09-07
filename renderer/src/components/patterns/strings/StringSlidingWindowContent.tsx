import React, { useState } from 'react';
import { PatternComponentProps } from '../../../types';
import { Controls } from '../../ui/Controls';
import { RetroCodeBlock } from '../../ui/RetroCodeBlock';
import { ExecutionCard, leetCodeProblems } from '../../ui/ExecutionCard';

export const StringSlidingWindowContent: React.FC<PatternComponentProps> = ({ pattern }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [string] = useState("abcabcbb");
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [seen, setSeen] = useState(new Set());
    const [maxLength, setMaxLength] = useState(1);
    const [currentLength, setCurrentLength] = useState(1);
    
    const steps = [
        { left: 0, right: 0, seen: new Set(['a']), maxLen: 1, curLen: 1, desc: "Start: window 'a', length=1" },
        { left: 0, right: 1, seen: new Set(['a', 'b']), maxLen: 2, curLen: 2, desc: "Add 'b': window 'ab', length=2" },
        { left: 0, right: 2, seen: new Set(['a', 'b', 'c']), maxLen: 3, curLen: 3, desc: "Add 'c': window 'abc', length=3" },
        { left: 1, right: 3, seen: new Set(['b', 'c', 'a']), maxLen: 3, curLen: 3, desc: "'a' seen, shrink: window 'bca', length=3" },
        { left: 2, right: 4, seen: new Set(['c', 'a', 'b']), maxLen: 3, curLen: 3, desc: "'b' seen, shrink: window 'cab', length=3" },
        { left: 3, right: 5, seen: new Set(['a', 'b', 'c']), maxLen: 3, curLen: 3, desc: "'c' seen, shrink: window 'abc', length=3" },
        { left: 4, right: 6, seen: new Set(['b', 'c', 'b']), maxLen: 3, curLen: 2, desc: "'b' seen, shrink: window 'cb', length=2" },
        { left: 6, right: 7, seen: new Set(['b']), maxLen: 3, curLen: 1, desc: "'b' seen, shrink: window 'b', length=1" }
    ];

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (isFinished) {
            setCurrentStep(0);
            setIsFinished(false);
            setLeft(0);
            setRight(0);
            setSeen(new Set(['a']));
            setMaxLength(1);
            setCurrentLength(1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
        setIsFinished(false);
        setLeft(0);
        setRight(0);
        setSeen(new Set(['a']));
        setMaxLength(1);
        setCurrentLength(1);
    };

    const handleStepForward = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            const step = steps[nextStep];
            setLeft(step.left);
            setRight(step.right);
            setSeen(step.seen);
            setMaxLength(step.maxLen);
            setCurrentLength(step.curLen);
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
            setLeft(step.left);
            setRight(step.right);
            setSeen(step.seen);
            setMaxLength(step.maxLen);
            setCurrentLength(step.curLen);
            setIsFinished(false);
        }
    };

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
                <h3 className="text-xl font-bold mb-2">Longest Substring Without Repeating Characters</h3>
                <p className="mb-4">String: "{string}"</p>
                <p className="mb-4 font-medium">{steps[currentStep]?.desc}</p>
                
                <div className="mb-4">
                    <h4 className="font-bold mb-2">String with Window:</h4>
                    <div className="flex gap-1">
                        {string.split('').map((char, index) => (
                            <div key={index} className="relative">
                                <div
                                    className={`w-12 h-12 win1-button flex items-center justify-center text-lg font-mono ${
                                        index >= left && index <= right ? 'bg-blue-200 border-blue-500 border-2' : ''
                                    }`}
                                >
                                    {char}
                                </div>
                                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">
                                    {index}
                                </div>
                                {index === left && (
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-600">
                                        L
                                    </div>
                                )}
                                {index === right && (
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-red-600">
                                        R
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="win1-inset p-3">
                        <h4 className="font-bold">Current Window:</h4>
                        <div className="text-lg font-mono bg-blue-50 p-2 rounded">
                            "{string.substring(left, right + 1)}"
                        </div>
                    </div>
                    <div className="win1-inset p-3">
                        <h4 className="font-bold">Current Length:</h4>
                        <div className="text-2xl font-mono">{currentLength}</div>
                    </div>
                    <div className="win1-inset p-3">
                        <h4 className="font-bold">Max Length:</h4>
                        <div className="text-2xl font-mono text-green-700">{maxLength}</div>
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="font-bold mb-2">Characters in Window:</h4>
                    <div className="flex gap-2">
                        {Array.from(seen).map((char) => (
                            <span key={char} className="win1-button px-3 py-1 text-sm font-mono">
                                {char}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

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
                    code={`def length_of_longest_substring(s):
    """
    Find length of longest substring without repeating characters
    Time: O(n), Space: O(min(m,n)) where m is charset size
    """
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        # Shrink window until no duplicates
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        # Add current character and update max
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length

def length_of_longest_substring_optimized(s):
    """
    Optimized version using hashmap to track character positions
    Time: O(n), Space: O(min(m,n))
    """
    char_index = {}
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        if s[right] in char_index and char_index[s[right]] >= left:
            # Jump left pointer to next position after duplicate
            left = char_index[s[right]] + 1
        
        char_index[s[right]] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length

def longest_substring_with_at_most_k_distinct(s, k):
    """
    Find longest substring with at most k distinct characters
    Time: O(n), Space: O(k)
    """
    if k == 0:
        return 0
    
    char_count = {}
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        # Add character to window
        char_count[s[right]] = char_count.get(s[right], 0) + 1
        
        # Shrink window if more than k distinct chars
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1
        
        max_length = max(max_length, right - left + 1)
    
    return max_length

def find_all_anagrams(s, p):
    """
    Find all starting indices of anagrams of p in s
    Time: O(n), Space: O(1) - fixed size alphabet
    """
    if len(p) > len(s):
        return []
    
    p_count = {}
    window_count = {}
    
    # Count characters in pattern
    for char in p:
        p_count[char] = p_count.get(char, 0) + 1
    
    result = []
    window_size = len(p)
    
    for i in range(len(s)):
        # Add character to window
        char = s[i]
        window_count[char] = window_count.get(char, 0) + 1
        
        # Remove character if window too large
        if i >= window_size:
            left_char = s[i - window_size]
            window_count[left_char] -= 1
            if window_count[left_char] == 0:
                del window_count[left_char]
        
        # Check if current window is anagram
        if window_count == p_count:
            result.append(i - window_size + 1)
    
    return result

# Example usage:
s1 = "abcabcbb"
print(f"Longest substring without repeating: {length_of_longest_substring(s1)}")

s2 = "eceba"
k = 2
print(f"Longest with at most {k} distinct: {longest_substring_with_at_most_k_distinct(s2, k)}")

s3 = "abab"
p = "ab"
print(f"Anagram indices: {find_all_anagrams(s3, p)}")`}
                />
            </div>

            <div className="win1-inset p-4">
                <h3 className="text-xl font-bold mb-4">String Sliding Window Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-bold mb-2">Fixed Size Window:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Find All Anagrams in String</li>
                            <li>Permutation in String</li>
                            <li>Maximum Points from Cards</li>
                            <li>Frequency of Most Frequent Element</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Variable Size Window:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Longest Substring Without Repeating</li>
                            <li>Longest Substring with At Most K Distinct</li>
                            <li>Minimum Window Substring</li>
                            <li>Longest Repeating Character Replacement</li>
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

            {/* LeetCode Problems Section */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6">Practice Problems</h3>
                <div className="space-y-6">
                    {leetCodeProblems['string-sliding-window'].map((problem) => (
                        <ExecutionCard 
                            key={problem.id} 
                            problem={problem} 
                            patternName="String Sliding Window" 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};