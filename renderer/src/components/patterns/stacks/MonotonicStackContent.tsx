import React, { useState } from 'react';
import { PatternComponentProps } from '../../../types';
import { Controls } from '../../ui/Controls';
import { RetroCodeBlock } from '../../ui/RetroCodeBlock';
import { EnhancedChart } from '../../ui/EnhancedChart';
import { ExecutionCard, leetCodeProblems } from '../../ui/ExecutionCard';

export const MonotonicStackContent: React.FC<PatternComponentProps> = ({ pattern }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [array] = useState([2, 1, 2, 4, 3, 1]);
    const [stack, setStack] = useState<number[]>([]);
    const [result, setResult] = useState<number[]>([-1, -1, -1, -1, -1, -1]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const steps = [
        { index: 0, stack: [0], result: [-1, -1, -1, -1, -1, -1], desc: "Push index 0 (value 2) to stack" },
        { index: 1, stack: [1], result: [-1, -1, -1, -1, -1, -1], desc: "Pop 0, push 1 (value 1). 1 < 2, so 2 has no next greater" },
        { index: 2, stack: [1, 2], result: [-1, 2, -1, -1, -1, -1], desc: "Push 2 (value 2). 2 > 1, so next greater of 1 is 2" },
        { index: 3, stack: [1, 3], result: [-1, 2, 4, -1, -1, -1], desc: "Pop 2, push 3. 4 > 2, so next greater of 2 is 4" },
        { index: 4, stack: [1, 4], result: [-1, 2, 4, -1, -1, -1], desc: "Push 4 (value 3). 3 < 4, no pops needed" },
        { index: 5, stack: [5], result: [-1, 2, 4, -1, 3, -1], desc: "Pop 4 and 1, push 5. Next greater of 4 is 1 (value 1)" }
    ];

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (isFinished) {
            setCurrentStep(0);
            setIsFinished(false);
            setStack([]);
            setResult([-1, -1, -1, -1, -1, -1]);
            setCurrentIndex(0);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
        setIsFinished(false);
        setStack([]);
        setResult([-1, -1, -1, -1, -1, -1]);
        setCurrentIndex(0);
    };

    const handleStepForward = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            const step = steps[nextStep];
            setCurrentIndex(step.index);
            setStack(step.stack);
            setResult(step.result);
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
            setStack(step.stack);
            setResult(step.result);
            setIsFinished(false);
        }
    };

    const chartData = array.map((val, index) => ({
        index,
        value: val,
        nextGreater: result[index] === -1 ? null : result[index],
        isCurrent: index === currentIndex
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
                <h3 className="text-xl font-bold mb-2">Monotonic Stack - Next Greater Element</h3>
                <p className="mb-4">Finding next greater element for each array element</p>
                <p className="mb-4 font-medium">{steps[currentStep]?.desc}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-bold mb-2">Original Array:</h4>
                        <div className="flex gap-1">
                            {array.map((val, index) => (
                                <div key={index} className="relative">
                                    <div
                                        className={`w-12 h-12 win1-button flex items-center justify-center text-sm font-mono ${
                                            index === currentIndex ? 'bg-yellow-200 border-yellow-500 border-2' : ''
                                        }`}
                                    >
                                        {val}
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">
                                        {index}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-2">Result Array:</h4>
                        <div className="flex gap-1">
                            {result.map((val, index) => (
                                <div
                                    key={index}
                                    className={`w-12 h-12 win1-button flex items-center justify-center text-sm font-mono ${
                                        val !== -1 ? 'bg-green-200' : 'bg-gray-200'
                                    }`}
                                >
                                    {val === -1 ? '-1' : val}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="font-bold mb-2">Stack State (indices):</h4>
                    <div className="flex gap-1">
                        {stack.map((index, stackPos) => (
                            <div
                                key={stackPos}
                                className="w-12 h-12 win1-button flex items-center justify-center text-sm font-mono bg-blue-200"
                            >
                                {index}
                                <div className="absolute -top-6 text-xs">
                                    ({array[index]})
                                </div>
                            </div>
                        ))}
                        {stack.length === 0 && (
                            <div className="text-gray-500 italic">Empty</div>
                        )}
                    </div>
                </div>
            </div>

            <EnhancedChart
                data={chartData}
                lines={[
                    { dataKey: 'value', name: 'Original Values', color: '#8884d8' },
                    { dataKey: 'nextGreater', name: 'Next Greater', color: '#82ca9d' }
                ]}
                title="Next Greater Element Progress"
                subtitle="Monotonic stack maintains decreasing order"
                inputLabel="Array Index"
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
                    code={`def next_greater_element(nums):
    """
    Find next greater element for each element using monotonic stack
    Time: O(n), Space: O(n)
    """
    n = len(nums)
    result = [-1] * n
    stack = []  # Store indices
    
    for i in range(n):
        # Pop elements smaller than current element
        while stack and nums[stack[-1]] < nums[i]:
            index = stack.pop()
            result[index] = nums[i]
        
        stack.append(i)
    
    return result

def next_greater_element_circular(nums):
    """
    Next greater element in circular array
    Time: O(n), Space: O(n)
    """
    n = len(nums)
    result = [-1] * n
    stack = []
    
    # Process array twice to handle circular nature
    for i in range(2 * n):
        current_index = i % n
        
        while stack and nums[stack[-1]] < nums[current_index]:
            index = stack.pop()
            result[index] = nums[current_index]
        
        # Only add to stack in first pass
        if i < n:
            stack.append(current_index)
    
    return result

def daily_temperatures(temperatures):
    """
    Find how many days until warmer temperature
    Time: O(n), Space: O(n)
    """
    n = len(temperatures)
    result = [0] * n
    stack = []  # Store indices
    
    for i in range(n):
        while stack and temperatures[stack[-1]] < temperatures[i]:
            prev_index = stack.pop()
            result[prev_index] = i - prev_index
        
        stack.append(i)
    
    return result

def largest_rectangle_histogram(heights):
    """
    Find largest rectangle area in histogram
    Time: O(n), Space: O(n)
    """
    stack = []
    max_area = 0
    heights.append(0)  # Add sentinel to flush stack
    
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        
        stack.append(i)
    
    heights.pop()  # Remove sentinel
    return max_area

def remove_k_digits(num, k):
    """
    Remove k digits to make smallest possible number
    Time: O(n), Space: O(n)
    """
    stack = []
    
    for digit in num:
        # Remove larger digits from stack
        while k > 0 and stack and stack[-1] > digit:
            stack.pop()
            k -= 1
        
        stack.append(digit)
    
    # Remove remaining digits from end
    while k > 0:
        stack.pop()
        k -= 1
    
    # Convert back to string, handle edge cases
    result = ''.join(stack)
    return result if result and result != '0' else '0'

# Example usage:
nums = [2, 1, 2, 4, 3, 1]
result = next_greater_element(nums)
print(f"Next greater elements: {result}")

temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
days = daily_temperatures(temperatures)
print(f"Days until warmer: {days}")

heights = [2, 1, 5, 6, 2, 3]
area = largest_rectangle_histogram(heights)
print(f"Largest rectangle area: {area}")`}
                />
            </div>

            <div className="win1-inset p-4">
                <h3 className="text-xl font-bold mb-4">Monotonic Stack Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-bold mb-2">Decreasing Stack (for next greater):</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Next Greater Element</li>
                            <li>Daily Temperatures</li>
                            <li>Stock Span Problem</li>
                            <li>Largest Rectangle in Histogram</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Increasing Stack (for next smaller):</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Next Smaller Element</li>
                            <li>Trapping Rain Water</li>
                            <li>Remove K Digits</li>
                            <li>Maximum Rectangle in Matrix</li>
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
                    {leetCodeProblems['monotonic-stack'].map((problem) => (
                        <ExecutionCard 
                            key={problem.id} 
                            problem={problem} 
                            patternName="Monotonic Stack" 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};