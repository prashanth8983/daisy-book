import React, { useState } from 'react';
import { PatternComponentProps } from '../../../types';
import { Controls } from '../../ui/Controls';
import { RetroCodeBlock } from '../../ui/RetroCodeBlock';
import { EnhancedChart } from '../../ui/EnhancedChart';
import { ExecutionCard, leetCodeProblems } from '../../ui/ExecutionCard';

export const KadaneAlgorithmContent: React.FC<PatternComponentProps> = ({ pattern }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [array] = useState([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
    const [currentSum, setCurrentSum] = useState(-2);
    const [maxSum, setMaxSum] = useState(-2);
    const [subarrayStart, setSubarrayStart] = useState(0);
    const [subarrayEnd, setSubarrayEnd] = useState(0);
    const [tempStart, setTempStart] = useState(0);
    
    const steps = [
        { index: 0, current: -2, max: -2, start: 0, end: 0, tempStart: 0, desc: "Start with first element: current=-2, max=-2" },
        { index: 1, current: 1, max: 1, start: 1, end: 1, tempStart: 1, desc: "Reset subarray at index 1: current=1, max=1" },
        { index: 2, current: -2, max: 1, start: 1, end: 1, tempStart: 1, desc: "Add -3: current=-2, keep max=1" },
        { index: 3, current: 4, max: 4, start: 3, end: 3, tempStart: 3, desc: "Reset at index 3: current=4, new max=4" },
        { index: 4, current: 3, max: 4, start: 3, end: 3, tempStart: 3, desc: "Add -1: current=3, keep max=4" },
        { index: 5, current: 5, max: 5, start: 3, end: 5, tempStart: 3, desc: "Add 2: current=5, new max=5" },
        { index: 6, current: 6, max: 6, start: 3, end: 6, tempStart: 3, desc: "Add 1: current=6, new max=6" },
        { index: 7, current: 1, max: 6, start: 3, end: 6, tempStart: 3, desc: "Add -5: current=1, keep max=6" },
        { index: 8, current: 5, max: 6, start: 3, end: 6, tempStart: 3, desc: "Add 4: current=5, final max=6" }
    ];

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (isFinished) {
            setCurrentStep(0);
            setIsFinished(false);
            setCurrentSum(-2);
            setMaxSum(-2);
            setSubarrayStart(0);
            setSubarrayEnd(0);
            setTempStart(0);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
        setIsFinished(false);
        setCurrentSum(-2);
        setMaxSum(-2);
        setSubarrayStart(0);
        setSubarrayEnd(0);
        setTempStart(0);
    };

    const handleStepForward = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            const step = steps[nextStep];
            setCurrentSum(step.current);
            setMaxSum(step.max);
            setSubarrayStart(step.start);
            setSubarrayEnd(step.end);
            setTempStart(step.tempStart);
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
            setCurrentSum(step.current);
            setMaxSum(step.max);
            setSubarrayStart(step.start);
            setSubarrayEnd(step.end);
            setTempStart(step.tempStart);
            setIsFinished(false);
        }
    };

    const chartData = array.map((val, index) => ({
        index,
        value: val,
        isCurrent: index === steps[currentStep]?.index,
        isInMaxSubarray: index >= subarrayStart && index <= subarrayEnd
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
                <h3 className="text-xl font-bold mb-2">Kadane's Algorithm Visualization</h3>
                <p className="mb-4">Finding maximum sum contiguous subarray</p>
                <p className="mb-4 font-medium">{steps[currentStep]?.desc}</p>
                
                <div className="mb-4">
                    <h4 className="font-bold mb-2">Array:</h4>
                    <div className="flex gap-1">
                        {array.map((val, index) => (
                            <div
                                key={index}
                                className={`w-12 h-12 win1-button flex items-center justify-center text-sm font-mono ${
                                    index === steps[currentStep]?.index ? 'bg-yellow-200 border-yellow-500 border-2' :
                                    index >= subarrayStart && index <= subarrayEnd ? 'bg-green-200 border-green-500 border-2' :
                                    ''
                                }`}
                            >
                                {val}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-1 mt-1">
                        {array.map((_, index) => (
                            <div key={index} className="w-12 text-center text-xs">
                                {index}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="win1-inset p-3">
                        <h4 className="font-bold">Current Sum:</h4>
                        <div className="text-2xl font-mono">{currentSum}</div>
                    </div>
                    <div className="win1-inset p-3">
                        <h4 className="font-bold">Maximum Sum:</h4>
                        <div className="text-2xl font-mono text-green-700">{maxSum}</div>
                    </div>
                    <div className="win1-inset p-3">
                        <h4 className="font-bold">Max Subarray:</h4>
                        <div className="text-sm font-mono">
                            [{subarrayStart}, {subarrayEnd}]
                        </div>
                    </div>
                </div>
            </div>

            <EnhancedChart
                data={chartData}
                lines={[
                    { dataKey: 'value', name: 'Array Values', color: '#8884d8' }
                ]}
                title="Kadane's Algorithm Progress"
                subtitle="Maximum sum contiguous subarray"
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
                    title="Kadane's Algorithm Implementation"
                >
                    {`def kadane_algorithm(arr):
    """
    Find maximum sum contiguous subarray using Kadane's algorithm
    Time: O(n), Space: O(1)
    """
    if not arr:
        return 0
    
    max_sum = current_sum = arr[0]
    start = end = temp_start = 0
    
    for i in range(1, len(arr)):
        # If current sum becomes negative, start new subarray
        if current_sum < 0:
            current_sum = arr[i]
            temp_start = i
        else:
            current_sum += arr[i]
        
        # Update maximum sum and track indices
        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i
    
    return max_sum, start, end

def kadane_with_all_negatives(arr):
    """
    Handle case where all numbers might be negative
    """
    if not arr:
        return 0
    
    max_sum = float('-inf')
    current_sum = 0
    
    for num in arr:
        current_sum = max(num, current_sum + num)  # Either start new or continue
        max_sum = max(max_sum, current_sum)
    
    return max_sum

def maximum_circular_subarray(arr):
    """
    Find maximum sum in circular array (Kadane's variant)
    """
    def kadane_max(arr):
        max_kadane = current_sum = arr[0]
        for i in range(1, len(arr)):
            current_sum = max(arr[i], current_sum + arr[i])
            max_kadane = max(max_kadane, current_sum)
        return max_kadane
    
    def kadane_min(arr):
        min_kadane = current_sum = arr[0]
        for i in range(1, len(arr)):
            current_sum = min(arr[i], current_sum + arr[i])
            min_kadane = min(min_kadane, current_sum)
        return min_kadane
    
    # Case 1: Maximum subarray is non-circular
    max_linear = kadane_max(arr)
    
    # Case 2: Maximum subarray is circular
    # = Total sum - minimum subarray
    total_sum = sum(arr)
    min_subarray = kadane_min(arr)
    max_circular = total_sum - min_subarray
    
    # Edge case: all elements are negative
    if max_circular == 0:
        return max_linear
    
    return max(max_linear, max_circular)

# Example usage:
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
max_sum, start, end = kadane_algorithm(arr)
print(f"Maximum sum: {max_sum}")
print(f"Subarray: {arr[start:end+1]} from index {start} to {end}")

# Circular case
circular_arr = [8, -1, 3, 4]
circular_max = maximum_circular_subarray(circular_arr)
print(f"Maximum circular subarray sum: {circular_max}")`}
                </RetroCodeBlock>
            </div>

            <div className="win1-inset p-4">
                <h3 className="text-xl font-bold mb-4">Algorithm Logic</h3>
                <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-300">
                        <h4 className="font-bold text-blue-800">Key Insight:</h4>
                        <p className="text-blue-700">At each position, decide: Should I start a new subarray here, or extend the current one?</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-300">
                        <h4 className="font-bold text-green-800">Decision Rule:</h4>
                        <p className="text-green-700">If current_sum becomes negative, reset it (start new subarray)</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-300">
                        <h4 className="font-bold text-yellow-800">Tracking:</h4>
                        <p className="text-yellow-700">Always keep track of the maximum sum seen so far</p>
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
                <h3 className="text-xl font-bold mb-4">Variations & Extensions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-bold mb-2">Classic Variations:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Maximum Product Subarray</li>
                            <li>Maximum Circular Subarray</li>
                            <li>Maximum Subarray Length</li>
                            <li>2D Maximum Submatrix</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Related Problems:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Best Time to Buy/Sell Stock</li>
                            <li>House Robber (DP variant)</li>
                            <li>Maximum Score Subarray</li>
                            <li>Minimum Path Sum</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* LeetCode Problems Section */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6">Practice Problems</h3>
                <div className="space-y-6">
                    {leetCodeProblems['kadane-algorithm'].map((problem) => (
                        <ExecutionCard 
                            key={problem.id} 
                            problem={problem} 
                            patternName="Kadane's Algorithm" 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};