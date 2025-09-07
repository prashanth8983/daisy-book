import React, { useState, useMemo } from 'react';
import { PatternComponentProps } from '../../../types';
import { Prose, ComplexityBox, ApplicationsBox, DisadvantagesBox, Win1Window } from '../../ui/Win1Window';
import { Controls } from '../../ui/Controls';
import { RetroCodeBlock } from '../../ui/RetroCodeBlock';
import { EnhancedChart } from '../../ui/EnhancedChart';
import { IconArrowDown, IconCpu } from '../../ui/icons';
import { ExecutionCard, leetCodeProblems } from '../../ui/ExecutionCard';

// Prefix Sum Visualization Component
interface PrefixSumVisualizationProps {
    originalArray: number[];
    prefixArray: number[];
    processing: number[];
    completed: number[];
    onUpdateArray: (newArray: number[]) => void;
}

const PrefixSumVisualization: React.FC<PrefixSumVisualizationProps> = ({ 
    originalArray, prefixArray, processing, completed, onUpdateArray 
}) => {
    const handleValueChange = (e: React.MouseEvent<HTMLDivElement>, index: number, delta: number) => {
        e.preventDefault();
        const newArray = [...originalArray];
        newArray[index] = Math.max(-99, Math.min(99, newArray[index] + delta));
        onUpdateArray(newArray);
    };

    return (
        <div className="relative inline-flex flex-col items-center">
            {/* Index numbers for both arrays */}
            <div className="flex gap-8">
                <div className="flex pl-12">
                    {originalArray.map((_, idx) => (
                        <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                    ))}
                </div>
                <div className="flex pl-16">
                    {originalArray.map((_, idx) => (
                        <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                    ))}
                </div>
            </div>
            
            {/* Arrays side by side */}
            <div className="flex items-center gap-8">
                {/* Original Array */}
                <div className="flex items-center">
                    <div className="flex flex-col items-center mr-2">
                        <IconArrowDown className="w-4 h-4" />
                        <span className="text-2xl">arr:</span>
                    </div>
                    <div className="flex win1-inset bg-white p-0">
                        {originalArray.map((num, idx) => {
                            let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl cursor-pointer bg-white text-black ';
                            if (idx === originalArray.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                            return (
                                <div 
                                    key={`orig-${idx}-${num}`} 
                                    className={cellClasses} 
                                    onClick={(e) => handleValueChange(e, idx, 1)} 
                                    onContextMenu={(e) => handleValueChange(e, idx, -1)}
                                >
                                    {num}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Prefix Array */}
                <div className="flex items-center">
                    <div className="flex flex-col items-center mr-2">
                        <IconArrowDown className="w-4 h-4" />
                        <span className="text-2xl">prefix:</span>
                    </div>
                    <div className="flex win1-inset bg-white p-0">
                        {originalArray.map((_, idx) => {
                            let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl ';
                            if (idx === originalArray.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                            
                            if (completed.includes(idx)) {
                                cellClasses += 'bg-[var(--success-color)] text-white';
                            } else if (processing.includes(idx)) {
                                cellClasses += 'bg-[var(--warning-color)] text-black';
                            } else {
                                cellClasses += 'bg-white text-black';
                            }
                            
                            return (
                                <div key={`prefix-${idx}`} className={cellClasses}>
                                    {prefixArray[idx] !== undefined ? prefixArray[idx] : '?'}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PrefixSumInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [array, setArray] = useState([2, 8, 3, -1, 4, -5, 2]);
    
    interface PrefixSumStep {
        originalArray: number[];
        prefixArray: number[];
        currentIndex: number;
        processing: number[];
        completed: number[];
        description: string;
        line: number;
        i: number | null;
    }
    
    const steps = useMemo((): PrefixSumStep[] => {
        const generatedSteps: PrefixSumStep[] = [];
        const prefix: number[] = [];
        
        generatedSteps.push({
            originalArray: [...array],
            prefixArray: [],
            currentIndex: -1,
            processing: [],
            completed: [],
            description: "Initialize empty prefix array",
            line: 1,
            i: null
        });
        
        for (let i = 0; i < array.length; i++) {
            if (i === 0) {
                prefix[i] = array[i];
                generatedSteps.push({
                    originalArray: [...array],
                    prefixArray: [...prefix],
                    currentIndex: i,
                    processing: [i],
                    completed: [],
                    description: `Base case: prefix[${i}] = arr[${i}] = ${array[i]}`,
                    line: 1,
                    i
                });
            } else {
                generatedSteps.push({
                    originalArray: [...array],
                    prefixArray: [...prefix],
                    currentIndex: i,
                    processing: [i],
                    completed: Array.from({length: i}, (_, k) => k),
                    description: `Calculate: prefix[${i}] = prefix[${i-1}] + arr[${i}] = ${prefix[i-1]} + ${array[i]}`,
                    line: 2,
                    i
                });
                
                prefix[i] = prefix[i-1] + array[i];
                
                generatedSteps.push({
                    originalArray: [...array],
                    prefixArray: [...prefix],
                    currentIndex: i,
                    processing: [],
                    completed: Array.from({length: i + 1}, (_, k) => k),
                    description: `Result: prefix[${i}] = ${prefix[i]}`,
                    line: 3,
                    i
                });
            }
        }
        
        generatedSteps.push({
            originalArray: [...array],
            prefixArray: [...prefix],
            currentIndex: -1,
            processing: [],
            completed: Array.from({length: array.length}, (_, k) => k),
            description: "Prefix sum array completed!",
            line: 1,
            i: null
        });
        
        return generatedSteps;
    }, [array]);

    const currentStepData = steps[currentStep] || steps[0];
    const { originalArray, prefixArray, currentIndex, processing, completed, description, line, i } = currentStepData;

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { 
        setIsPlaying(false); 
        setCurrentStep(0); 
    };
    
    const goToStep = (step: number) => { 
        setIsPlaying(false); 
        setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); 
    };
    
    const isFinished = currentStep >= steps.length - 1;

    // Reset animation when array changes
    React.useEffect(() => {
        reset();
    }, [array]);

    const getCodeLines = (vars: { i: number | null, currentIndex: number }) => {
        const Var = ({val}: {val: React.ReactNode}) => <span className="text-[var(--danger-color)]">{val}</span>;
        return [
            <React.Fragment key="line1">prefix[0] = arr[0]  # Base case</React.Fragment>,
            <React.Fragment key="line2">for i:<Var val={vars.i ?? '?'}/> in range(1, n):</React.Fragment>,
            <React.Fragment key="line3">    prefix[i] = prefix[i-1] + arr[i]</React.Fragment>
        ];
    };

    const StackCard: React.FC<{ variables: { i: number | null, currentIndex: number } }> = ({ variables }) => (
        <div className="win1-window h-full">
            <div className="win1-titlebar">
                <span className="flex items-center gap-2 font-mono">
                    <IconCpu className="w-5 h-5" /> STACK CARD
                </span>
            </div>
            <div className="p-4 space-y-1 text-sm">
                <p>i: <span className="text-[var(--danger-color)]">{variables.i ?? 'N/A'}</span></p>
                <p>current_sum: <span className="text-[var(--danger-color)]">{prefixArray[variables.currentIndex] || 'N/A'}</span></p>
                <p>array_size: <span className="text-[var(--danger-color)]">{array.length}</span></p>
            </div>
        </div>
    );

    return (
        <div id={id} className="my-8">
            <Win1Window title="Interactive Demo">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm my-2">Left-click an array cell to increase its value, right-click to decrease.</p>
                    <div className="overflow-x-auto no-scrollbar flex justify-center w-full py-4 px-2">
                        <PrefixSumVisualization 
                            originalArray={originalArray} 
                            prefixArray={prefixArray}
                            processing={processing} 
                            completed={completed} 
                            onUpdateArray={setArray} 
                        />
                    </div>
                    <div className="mt-4 p-2 win1-inset w-full text-center">
                        <p>{description}</p>
                    </div>
                </div>
            </Win1Window>
            
            <div className="mt-6 flex gap-4">
                <div className="w-3/5">
                    <RetroCodeBlock 
                        title="Execution" 
                        highlightLines={[line]}
                        currentStep={currentStep}
                        totalSteps={steps.length}
                    >
                        {getCodeLines({ i, currentIndex })}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <StackCard variables={{ i, currentIndex }} />
                </div>
            </div>

            <Controls 
                isPlaying={isPlaying} 
                isFinished={isFinished} 
                onPlayPause={() => setIsPlaying(!isPlaying)} 
                onReset={reset} 
                onStepBack={() => goToStep(currentStep - 1)} 
                onStepForward={() => goToStep(currentStep + 1)} 
                onSpeedChange={setSpeed} 
                speed={speed} 
                currentStep={currentStep}
            />
        </div>
    );
};

// Range Sum Query Interactive Component (LeetCode 303)
const RangeSumQueryInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1500);
    const [array] = useState([1, 3, -1, 2, 4]);
    const [queries] = useState([[1, 3], [0, 2], [2, 4]]);
    const [prefixSum] = useState([1, 4, 3, 5, 9]); // Pre-calculated
    
    interface RangeSumStep {
        queryIndex: number;
        left: number;
        right: number;
        highlighting: number[];
        result: number;
        calculation: string;
        description: string;
        line: number;
    }
    
    const steps = useMemo((): RangeSumStep[] => {
        const generatedSteps: RangeSumStep[] = [];
        
        queries.forEach((query, queryIndex) => {
            const [left, right] = query;
            const result = prefixSum[right] - (left > 0 ? prefixSum[left - 1] : 0);
            const highlighting = Array.from({length: right - left + 1}, (_, i) => left + i);
            
            generatedSteps.push({
                queryIndex,
                left,
                right,
                highlighting,
                result,
                calculation: left > 0 ? `prefix[${right}] - prefix[${left-1}] = ${prefixSum[right]} - ${prefixSum[left-1]} = ${result}` : `prefix[${right}] = ${prefixSum[right]}`,
                description: `Query ${queryIndex + 1}: Sum from index ${left} to ${right}`,
                line: left > 0 ? 5 : 3
            });
        });
        
        return generatedSteps;
    }, [queries, prefixSum]);

    const currentStepData = steps[currentStep] || steps[0];
    const { queryIndex, left, right, highlighting, result, calculation, description, line } = currentStepData;

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { setIsPlaying(false); setCurrentStep(0); };
    const goToStep = (step: number) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    const getCodeLines = (vars: { queryIndex: number, left: number, right: number, result: number }) => {
        const Var = ({val}: {val: React.ReactNode}) => <span className="text-[var(--danger-color)]">{val}</span>;
        return [
            <React.Fragment key="line1">def sumRange(left:<Var val={vars.left}/>, right:<Var val={vars.right}/>):</React.Fragment>,
            <React.Fragment key="line2">    if left == 0:</React.Fragment>,
            <React.Fragment key="line3">        return prefix[right]</React.Fragment>,
            <React.Fragment key="line4">    else:</React.Fragment>,
            <React.Fragment key="line5">        return prefix[right] - prefix[left-1]</React.Fragment>,
            <React.Fragment key="line6"># Result: <Var val={vars.result}/></React.Fragment>
        ];
    };

    return (
        <div id={id} className="my-8">
            <Win1Window title="LeetCode 303: Range Sum Query - Immutable">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm mb-4">Using prefix sum for O(1) range queries</p>
                    
                    {/* Arrays */}
                    <div className="relative inline-flex flex-col items-center mb-4">
                        <div className="flex gap-8">
                            <div className="flex pl-12">
                                {array.map((_, idx) => (
                                    <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                                ))}
                            </div>
                            <div className="flex pl-16">
                                {prefixSum.map((_, idx) => (
                                    <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-8">
                            {/* Original Array */}
                            <div className="flex items-center">
                                <div className="flex flex-col items-center mr-2">
                                    <IconArrowDown className="w-4 h-4" />
                                    <span className="text-2xl">arr:</span>
                                </div>
                                <div className="flex win1-inset bg-white p-0">
                                    {array.map((num, idx) => {
                                        let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl ';
                                        if (idx === array.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                                        if (highlighting.includes(idx)) {
                                            cellClasses += 'bg-[var(--warning-color)] text-black';
                                        } else {
                                            cellClasses += 'bg-white text-black';
                                        }
                                        return (
                                            <div key={idx} className={cellClasses}>
                                                {num}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Prefix Array */}
                            <div className="flex items-center">
                                <div className="flex flex-col items-center mr-2">
                                    <IconArrowDown className="w-4 h-4" />
                                    <span className="text-2xl">prefix:</span>
                                </div>
                                <div className="flex win1-inset bg-white p-0">
                                    {prefixSum.map((sum, idx) => {
                                        let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl ';
                                        if (idx === prefixSum.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                                        if (idx === right || (left > 0 && idx === left - 1)) {
                                            cellClasses += 'bg-[var(--success-color)] text-white';
                                        } else {
                                            cellClasses += 'bg-white text-black';
                                        }
                                        return (
                                            <div key={idx} className={cellClasses}>
                                                {sum}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Query Information */}
                    <div className="mt-4 p-4 win1-inset w-full">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <h4 className="font-bold text-sm">Current Query</h4>
                                <p className="text-lg">sumRange({left}, {right})</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Calculation</h4>
                                <p className="text-sm font-mono">{calculation}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Result</h4>
                                <p className="text-2xl font-bold text-[var(--success-color)]">{result}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-sm">{description}</p>
                        </div>
                    </div>
                </div>
            </Win1Window>

            <div className="mt-6 flex gap-4">
                <div className="w-3/5">
                    <RetroCodeBlock
                        title="Execution"
                        highlightLines={[line]}
                        currentStep={currentStep}
                        totalSteps={steps.length}
                    >
                        {getCodeLines({ queryIndex, left, right, result })}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <div className="win1-window h-full">
                        <div className="win1-titlebar">
                            <span className="flex items-center gap-2 font-mono">
                                <IconCpu className="w-5 h-5" /> STACK CARD
                            </span>
                        </div>
                        <div className="p-4 space-y-1 text-sm">
                            <p>Query: <span className="text-[var(--danger-color)]">{queryIndex + 1}</span></p>
                            <p>Left: <span className="text-[var(--danger-color)]">{left}</span></p>
                            <p>Right: <span className="text-[var(--danger-color)]">{right}</span></p>
                            <p>Result: <span className="text-[var(--danger-color)]">{result}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <Controls 
                isPlaying={isPlaying} 
                isFinished={isFinished} 
                onPlayPause={() => setIsPlaying(!isPlaying)} 
                onReset={reset} 
                onStepBack={() => goToStep(currentStep - 1)} 
                onStepForward={() => goToStep(currentStep + 1)} 
                onSpeedChange={setSpeed} 
                speed={speed} 
                currentStep={currentStep}
            />
        </div>
    );
};

// Subarray Sum Equals K Interactive Component (LeetCode 560)
const SubarraySumKInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(2000);
    const [array] = useState([1, 2, 3]);
    const [target] = useState(3);
    
    interface SubarraySumStep {
        currentIndex: number;
        prefixSum: number;
        subarraysFound: number;
        highlighting: number[];
        mapState: Record<number, number>;
        description: string;
        foundSubarray: boolean;
    }
    
    const steps = useMemo((): SubarraySumStep[] => {
        const generatedSteps: SubarraySumStep[] = [];
        let prefixSum = 0;
        let count = 0;
        const prefixSumMap: Record<number, number> = { 0: 1 };
        
        generatedSteps.push({
            currentIndex: -1,
            prefixSum: 0,
            subarraysFound: 0,
            highlighting: [],
            mapState: { ...prefixSumMap },
            description: "Initialize: map[0] = 1 (empty subarray case)",
            foundSubarray: false
        });
        
        for (let i = 0; i < array.length; i++) {
            prefixSum += array[i];
            const complement = prefixSum - target;
            
            generatedSteps.push({
                currentIndex: i,
                prefixSum,
                subarraysFound: count,
                highlighting: [i],
                mapState: { ...prefixSumMap },
                description: `Process arr[${i}] = ${array[i]}, prefix sum = ${prefixSum}`,
                foundSubarray: false
            });
            
            if (prefixSumMap[complement]) {
                count += prefixSumMap[complement];
                generatedSteps.push({
                    currentIndex: i,
                    prefixSum,
                    subarraysFound: count,
                    highlighting: [i],
                    mapState: { ...prefixSumMap },
                    description: `Found ${prefixSumMap[complement]} subarray(s) ending at ${i} with sum ${target}!`,
                    foundSubarray: true
                });
            }
            
            prefixSumMap[prefixSum] = (prefixSumMap[prefixSum] || 0) + 1;
        }
        
        return generatedSteps;
    }, [array, target]);

    const currentStepData = steps[currentStep] || steps[0];
    const { currentIndex, prefixSum, subarraysFound, highlighting, mapState, description, foundSubarray } = currentStepData;

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { setIsPlaying(false); setCurrentStep(0); };
    const goToStep = (step: number) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    return (
        <div id={id} className="my-8">
            <Win1Window title="LeetCode 560: Subarray Sum Equals K">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm mb-4">Find number of subarrays with sum = {target}</p>
                    
                    {/* Array */}
                    <div className="relative inline-flex flex-col items-center mb-4">
                        <div className="flex pl-12">
                            {array.map((_, idx) => (
                                <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                            ))}
                        </div>
                        
                        <div className="flex items-center">
                            <div className="flex flex-col items-center mr-2">
                                <IconArrowDown className="w-4 h-4" />
                                <span className="text-2xl">arr:</span>
                            </div>
                            <div className="flex win1-inset bg-white p-0">
                                {array.map((num, idx) => {
                                    let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl ';
                                    if (idx === array.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                                    if (highlighting.includes(idx)) {
                                        cellClasses += foundSubarray ? 'bg-[var(--success-color)] text-white' : 'bg-[var(--warning-color)] text-black';
                                    } else if (idx < currentIndex) {
                                        cellClasses += 'bg-gray-100 text-black';
                                    } else {
                                        cellClasses += 'bg-white text-black';
                                    }
                                    return (
                                        <div key={idx} className={cellClasses}>
                                            {num}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* State Information */}
                    <div className="mt-4 p-4 win1-inset w-full">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <h4 className="font-bold text-sm">Current Prefix Sum</h4>
                                <p className="text-2xl font-mono">{prefixSum}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Subarrays Found</h4>
                                <p className="text-2xl font-bold text-[var(--success-color)]">{subarraysFound}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Prefix Sum Map</h4>
                                <p className="text-sm font-mono">
                                    {Object.entries(mapState).map(([key, value]) => `${key}:${value}`).join(', ')}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-sm">{description}</p>
                        </div>
                    </div>
                </div>
            </Win1Window>

            <div className="mt-6 flex gap-4">
                <div className="w-3/5">
                    <RetroCodeBlock
                        title="LeetCode 560 Solution"
                        language="python"
                        highlightLines={[0]}
                        currentStep={currentStep}
                        totalSteps={steps.length}
                    >
                        {`def subarraySum(nums: List[int], k: int) -> int:
    """
    Find number of continuous subarrays whose sum equals k
    Time: O(n), Space: O(n)
    """
    count = 0
    prefix_sum = 0
    prefix_map = {0: 1}  # Handle empty prefix case
    
    for num in nums:
        prefix_sum += num
        
        # Check if (prefix_sum - k) exists in map
        complement = prefix_sum - k
        if complement in prefix_map:
            count += prefix_map[complement]
        
        # Update frequency of current prefix sum
        prefix_map[prefix_sum] = prefix_map.get(prefix_sum, 0) + 1
    
    return count

# Example usage:
nums = [1, 2, 3]
k = 3
result = subarraySum(nums, k)
print(f"Number of subarrays with sum {k}: {result}")  # Output: 2
# Subarrays: [3] and [1, 2]`}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <div className="win1-window h-full">
                        <div className="win1-titlebar">
                            <span className="flex items-center gap-2 font-mono">
                                <IconCpu className="w-5 h-5" /> STACK CARD
                            </span>
                        </div>
                        <div className="p-4 space-y-1 text-sm">
                            <p>Index: <span className="text-[var(--danger-color)]">{currentIndex}</span></p>
                            <p>Prefix Sum: <span className="text-[var(--danger-color)]">{prefixSum}</span></p>
                            <p>Target K: <span className="text-[var(--danger-color)]">{target}</span></p>
                            <p>Found: <span className="text-[var(--danger-color)]">{subarraysFound}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <Controls 
                isPlaying={isPlaying} 
                isFinished={isFinished} 
                onPlayPause={() => setIsPlaying(!isPlaying)} 
                onReset={reset} 
                onStepBack={() => goToStep(currentStep - 1)} 
                onStepForward={() => goToStep(currentStep + 1)} 
                onSpeedChange={setSpeed} 
                speed={speed} 
                currentStep={currentStep}
            />
        </div>
    );
};

// Contiguous Array Interactive Component (LeetCode 525)
const ContiguousArrayInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(2000);
    const [array] = useState([0, 1, 0, 0, 1, 1, 0]);
    
    interface ContiguousArrayStep {
        currentIndex: number;
        balance: number;
        maxLength: number;
        highlighting: number[];
        mapState: Record<number, number>;
        description: string;
        foundSubarray: boolean;
        subarrayStart?: number;
        subarrayEnd?: number;
    }
    
    const steps = useMemo((): ContiguousArrayStep[] => {
        const generatedSteps: ContiguousArrayStep[] = [];
        let balance = 0;
        let maxLen = 0;
        const balanceMap: Record<number, number> = { 0: -1 };
        let bestStart = -1, bestEnd = -1;
        
        generatedSteps.push({
            currentIndex: -1,
            balance: 0,
            maxLength: 0,
            highlighting: [],
            mapState: { ...balanceMap },
            description: "Initialize: map[0] = -1, treat 0 as -1 for balance",
            foundSubarray: false
        });
        
        for (let i = 0; i < array.length; i++) {
            balance += array[i] === 0 ? -1 : 1;
            
            generatedSteps.push({
                currentIndex: i,
                balance,
                maxLength: maxLen,
                highlighting: [i],
                mapState: { ...balanceMap },
                description: `Process ${array[i]}, balance = ${balance}`,
                foundSubarray: false
            });
            
            if (balanceMap[balance] !== undefined) {
                const currentLen = i - balanceMap[balance];
                if (currentLen > maxLen) {
                    maxLen = currentLen;
                    bestStart = balanceMap[balance] + 1;
                    bestEnd = i;
                    generatedSteps.push({
                        currentIndex: i,
                        balance,
                        maxLength: maxLen,
                        highlighting: Array.from({length: bestEnd - bestStart + 1}, (_, k) => bestStart + k),
                        mapState: { ...balanceMap },
                        description: `Found longer subarray! Length = ${maxLen}`,
                        foundSubarray: true,
                        subarrayStart: bestStart,
                        subarrayEnd: bestEnd
                    });
                }
            } else {
                balanceMap[balance] = i;
            }
        }
        
        return generatedSteps;
    }, [array]);

    const currentStepData = steps[currentStep] || steps[0];
    const { currentIndex, balance, maxLength, highlighting, mapState, description, foundSubarray } = currentStepData;

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { setIsPlaying(false); setCurrentStep(0); };
    const goToStep = (step: number) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    return (
        <div id={id} className="my-8">
            <Win1Window title="LeetCode 525: Contiguous Array">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm mb-4">Find longest subarray with equal 0s and 1s</p>
                    
                    <div className="relative inline-flex flex-col items-center mb-4">
                        <div className="flex pl-12">
                            {array.map((_, idx) => (
                                <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                            ))}
                        </div>
                        
                        <div className="flex items-center">
                            <div className="flex flex-col items-center mr-2">
                                <IconArrowDown className="w-4 h-4" />
                                <span className="text-2xl">arr:</span>
                            </div>
                            <div className="flex win1-inset bg-white p-0">
                                {array.map((num, idx) => {
                                    let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl ';
                                    if (idx === array.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                                    if (highlighting.includes(idx)) {
                                        cellClasses += foundSubarray ? 'bg-[var(--success-color)] text-white' : 'bg-[var(--warning-color)] text-black';
                                    } else if (idx <= currentIndex) {
                                        cellClasses += 'bg-gray-100 text-black';
                                    } else {
                                        cellClasses += 'bg-white text-black';
                                    }
                                    return (
                                        <div key={idx} className={cellClasses}>
                                            {num}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 win1-inset w-full">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <h4 className="font-bold text-sm">Current Balance</h4>
                                <p className="text-2xl font-mono">{balance}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Max Length Found</h4>
                                <p className="text-2xl font-bold text-[var(--success-color)]">{maxLength}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Balance Map</h4>
                                <p className="text-sm font-mono">
                                    {Object.entries(mapState).map(([key, value]) => `${key}:${value}`).join(', ')}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-sm">{description}</p>
                        </div>
                    </div>
                </div>
            </Win1Window>

            <div className="mt-6 flex gap-4">
                <div className="w-3/5">
                    <RetroCodeBlock
                        title="LeetCode 525 Solution"
                        language="python"
                        highlightLines={[0]}
                        currentStep={currentStep}
                        totalSteps={steps.length}
                    >
                        {`def findMaxLength(nums: List[int]) -> int:
    """
    Find maximum length of contiguous subarray with equal 0s and 1s
    Time: O(n), Space: O(n)
    
    Key insight: Transform 0s to -1s, then find longest subarray with sum 0
    """
    balance_map = {0: -1}  # balance -> first occurrence index
    balance = 0
    max_length = 0
    
    for i, num in enumerate(nums):
        # Transform: 0 -> -1, 1 -> 1
        balance += 1 if num == 1 else -1
        
        if balance in balance_map:
            # Found same balance before - subarray between has sum 0
            current_length = i - balance_map[balance]
            max_length = max(max_length, current_length)
        else:
            # First occurrence of this balance
            balance_map[balance] = i
    
    return max_length

# Example usage:
nums = [0, 1, 0, 0, 1, 1, 0]
result = findMaxLength(nums)
print(f"Maximum length: {result}")  # Output: 6
# Subarray: [0, 1, 0, 0, 1, 1] from index 0 to 5`}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <div className="win1-window h-full">
                        <div className="win1-titlebar">
                            <span className="flex items-center gap-2 font-mono">
                                <IconCpu className="w-5 h-5" /> STACK CARD
                            </span>
                        </div>
                        <div className="p-4 space-y-1 text-sm">
                            <p>Index: <span className="text-[var(--danger-color)]">{currentIndex}</span></p>
                            <p>Balance: <span className="text-[var(--danger-color)]">{balance}</span></p>
                            <p>Max Length: <span className="text-[var(--danger-color)]">{maxLength}</span></p>
                            <p>Array Length: <span className="text-[var(--danger-color)]">{array.length}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <Controls 
                isPlaying={isPlaying} 
                isFinished={isFinished} 
                onPlayPause={() => setIsPlaying(!isPlaying)} 
                onReset={reset} 
                onStepBack={() => goToStep(currentStep - 1)} 
                onStepForward={() => goToStep(currentStep + 1)} 
                onSpeedChange={setSpeed} 
                speed={speed} 
                currentStep={currentStep}
            />
        </div>
    );
};

// Binary Subarrays With Sum Interactive Component (LeetCode 930)
const BinarySubarraysSumInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(2000);
    const [array] = useState([1, 0, 1, 0, 1]);
    const [target] = useState(2);
    
    interface BinarySubarrayStep {
        currentIndex: number;
        prefixSum: number;
        subarraysFound: number;
        highlighting: number[];
        mapState: Record<number, number>;
        description: string;
        foundSubarray: boolean;
    }
    
    const steps = useMemo((): BinarySubarrayStep[] => {
        const generatedSteps: BinarySubarrayStep[] = [];
        let prefixSum = 0;
        let count = 0;
        const prefixSumMap: Record<number, number> = { 0: 1 };
        
        generatedSteps.push({
            currentIndex: -1,
            prefixSum: 0,
            subarraysFound: 0,
            highlighting: [],
            mapState: { ...prefixSumMap },
            description: "Initialize: map[0] = 1 for empty prefix",
            foundSubarray: false
        });
        
        for (let i = 0; i < array.length; i++) {
            prefixSum += array[i];
            const complement = prefixSum - target;
            
            generatedSteps.push({
                currentIndex: i,
                prefixSum,
                subarraysFound: count,
                highlighting: [i],
                mapState: { ...prefixSumMap },
                description: `Process arr[${i}] = ${array[i]}, prefix sum = ${prefixSum}`,
                foundSubarray: false
            });
            
            if (prefixSumMap[complement] !== undefined) {
                count += prefixSumMap[complement];
                generatedSteps.push({
                    currentIndex: i,
                    prefixSum,
                    subarraysFound: count,
                    highlighting: [i],
                    mapState: { ...prefixSumMap },
                    description: `Found ${prefixSumMap[complement]} subarray(s) with sum ${target}!`,
                    foundSubarray: true
                });
            }
            
            prefixSumMap[prefixSum] = (prefixSumMap[prefixSum] || 0) + 1;
        }
        
        return generatedSteps;
    }, [array, target]);

    const currentStepData = steps[currentStep] || steps[0];
    const { currentIndex, prefixSum, subarraysFound, highlighting, mapState, description, foundSubarray } = currentStepData;

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { setIsPlaying(false); setCurrentStep(0); };
    const goToStep = (step: number) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    return (
        <div id={id} className="my-8">
            <Win1Window title="LeetCode 930: Binary Subarrays With Sum">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm mb-4">Count binary subarrays with sum = {target}</p>
                    
                    <div className="relative inline-flex flex-col items-center mb-4">
                        <div className="flex pl-12">
                            {array.map((_, idx) => (
                                <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                            ))}
                        </div>
                        
                        <div className="flex items-center">
                            <div className="flex flex-col items-center mr-2">
                                <IconArrowDown className="w-4 h-4" />
                                <span className="text-2xl">arr:</span>
                            </div>
                            <div className="flex win1-inset bg-white p-0">
                                {array.map((num, idx) => {
                                    let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl ';
                                    if (idx === array.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                                    if (highlighting.includes(idx)) {
                                        cellClasses += foundSubarray ? 'bg-[var(--success-color)] text-white' : 'bg-[var(--warning-color)] text-black';
                                    } else if (idx <= currentIndex) {
                                        cellClasses += 'bg-gray-100 text-black';
                                    } else {
                                        cellClasses += 'bg-white text-black';
                                    }
                                    return (
                                        <div key={idx} className={cellClasses}>
                                            {num}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 win1-inset w-full">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <h4 className="font-bold text-sm">Prefix Sum</h4>
                                <p className="text-2xl font-mono">{prefixSum}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Subarrays Count</h4>
                                <p className="text-2xl font-bold text-[var(--success-color)]">{subarraysFound}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Prefix Map</h4>
                                <p className="text-sm font-mono">
                                    {Object.entries(mapState).map(([key, value]) => `${key}:${value}`).join(', ')}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-sm">{description}</p>
                        </div>
                    </div>
                </div>
            </Win1Window>

            <div className="mt-6 flex gap-4">
                <div className="w-3/5">
                    <RetroCodeBlock
                        title="LeetCode 930 Solution"
                        language="python"
                        highlightLines={[0]}
                        currentStep={currentStep}
                        totalSteps={steps.length}
                    >
                        {`def numSubarraysWithSum(nums: List[int], goal: int) -> int:
    """
    Count number of binary subarrays with given sum
    Time: O(n), Space: O(n)
    """
    count = 0
    prefix_sum = 0
    prefix_map = {0: 1}  # Handle empty prefix case
    
    for num in nums:
        prefix_sum += num
        
        # Look for prefix sum that when subtracted gives goal
        complement = prefix_sum - goal
        if complement in prefix_map:
            count += prefix_map[complement]
        
        # Update frequency of current prefix sum
        prefix_map[prefix_sum] = prefix_map.get(prefix_sum, 0) + 1
    
    return count

# Alternative sliding window approach (more intuitive for binary arrays):
def numSubarraysWithSum_slidingWindow(nums: List[int], goal: int) -> int:
    """
    Using sliding window technique
    Time: O(n), Space: O(1)
    """
    def atMostK(k):
        if k < 0:
            return 0
        left = count = current_sum = 0
        for right in range(len(nums)):
            current_sum += nums[right]
            while current_sum > k:
                current_sum -= nums[left]
                left += 1
            count += right - left + 1
        return count
    
    return atMostK(goal) - atMostK(goal - 1)

# Example usage:
nums = [1, 0, 1, 0, 1]
goal = 2
result = numSubarraysWithSum(nums, goal)
print(f"Number of subarrays with sum {goal}: {result}")  # Output: 4`}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <div className="win1-window h-full">
                        <div className="win1-titlebar">
                            <span className="flex items-center gap-2 font-mono">
                                <IconCpu className="w-5 h-5" /> STACK CARD
                            </span>
                        </div>
                        <div className="p-4 space-y-1 text-sm">
                            <p>Index: <span className="text-[var(--danger-color)]">{currentIndex}</span></p>
                            <p>Prefix Sum: <span className="text-[var(--danger-color)]">{prefixSum}</span></p>
                            <p>Target: <span className="text-[var(--danger-color)]">{target}</span></p>
                            <p>Found: <span className="text-[var(--danger-color)]">{subarraysFound}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <Controls 
                isPlaying={isPlaying} 
                isFinished={isFinished} 
                onPlayPause={() => setIsPlaying(!isPlaying)} 
                onReset={reset} 
                onStepBack={() => goToStep(currentStep - 1)} 
                onStepForward={() => goToStep(currentStep + 1)} 
                onSpeedChange={setSpeed} 
                speed={speed} 
                currentStep={currentStep}
            />
        </div>
    );
};

// Maximum Size Subarray Sum Equals K Interactive Component (LeetCode 325)
const MaxSizeSubarrayKInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(2000);
    const [array] = useState([1, -1, 5, -2, 3]);
    const [target] = useState(3);
    
    interface MaxSizeStep {
        currentIndex: number;
        prefixSum: number;
        maxLength: number;
        highlighting: number[];
        mapState: Record<number, number>;
        description: string;
        foundSubarray: boolean;
        subarrayStart?: number;
        subarrayEnd?: number;
    }
    
    const steps = useMemo((): MaxSizeStep[] => {
        const generatedSteps: MaxSizeStep[] = [];
        let prefixSum = 0;
        let maxLen = 0;
        const prefixSumMap: Record<number, number> = { 0: -1 };
        let bestStart = -1, bestEnd = -1;
        
        generatedSteps.push({
            currentIndex: -1,
            prefixSum: 0,
            maxLength: 0,
            highlighting: [],
            mapState: { ...prefixSumMap },
            description: "Initialize: map[0] = -1 for empty prefix",
            foundSubarray: false
        });
        
        for (let i = 0; i < array.length; i++) {
            prefixSum += array[i];
            const complement = prefixSum - target;
            
            generatedSteps.push({
                currentIndex: i,
                prefixSum,
                maxLength: maxLen,
                highlighting: [i],
                mapState: { ...prefixSumMap },
                description: `Process arr[${i}] = ${array[i]}, prefix sum = ${prefixSum}`,
                foundSubarray: false
            });
            
            if (prefixSumMap[complement] !== undefined) {
                const currentLen = i - prefixSumMap[complement];
                if (currentLen > maxLen) {
                    maxLen = currentLen;
                    bestStart = prefixSumMap[complement] + 1;
                    bestEnd = i;
                    generatedSteps.push({
                        currentIndex: i,
                        prefixSum,
                        maxLength: maxLen,
                        highlighting: Array.from({length: bestEnd - bestStart + 1}, (_, k) => bestStart + k),
                        mapState: { ...prefixSumMap },
                        description: `Found longer subarray with sum ${target}! Length = ${maxLen}`,
                        foundSubarray: true,
                        subarrayStart: bestStart,
                        subarrayEnd: bestEnd
                    });
                }
            }
            
            if (prefixSumMap[prefixSum] === undefined) {
                prefixSumMap[prefixSum] = i;
            }
        }
        
        return generatedSteps;
    }, [array, target]);

    const currentStepData = steps[currentStep] || steps[0];
    const { currentIndex, prefixSum, maxLength, highlighting, mapState, description, foundSubarray } = currentStepData;

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { setIsPlaying(false); setCurrentStep(0); };
    const goToStep = (step: number) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    return (
        <div id={id} className="my-8">
            <Win1Window title="LeetCode 325: Maximum Size Subarray Sum Equals k">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm mb-4">Find longest subarray with sum = {target}</p>
                    
                    <div className="relative inline-flex flex-col items-center mb-4">
                        <div className="flex pl-12">
                            {array.map((_, idx) => (
                                <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                            ))}
                        </div>
                        
                        <div className="flex items-center">
                            <div className="flex flex-col items-center mr-2">
                                <IconArrowDown className="w-4 h-4" />
                                <span className="text-2xl">arr:</span>
                            </div>
                            <div className="flex win1-inset bg-white p-0">
                                {array.map((num, idx) => {
                                    let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl ';
                                    if (idx === array.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                                    if (highlighting.includes(idx)) {
                                        cellClasses += foundSubarray ? 'bg-[var(--success-color)] text-white' : 'bg-[var(--warning-color)] text-black';
                                    } else if (idx <= currentIndex) {
                                        cellClasses += 'bg-gray-100 text-black';
                                    } else {
                                        cellClasses += 'bg-white text-black';
                                    }
                                    return (
                                        <div key={idx} className={cellClasses}>
                                            {num}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 win1-inset w-full">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <h4 className="font-bold text-sm">Prefix Sum</h4>
                                <p className="text-2xl font-mono">{prefixSum}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Max Length</h4>
                                <p className="text-2xl font-bold text-[var(--success-color)]">{maxLength}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">First Occurrence Map</h4>
                                <p className="text-sm font-mono">
                                    {Object.entries(mapState).map(([key, value]) => `${key}:${value}`).join(', ')}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-sm">{description}</p>
                        </div>
                    </div>
                </div>
            </Win1Window>

            <div className="mt-6 flex gap-4">
                <div className="w-3/5">
                    <RetroCodeBlock
                        title="LeetCode 325 Solution"
                        language="python"
                        highlightLines={[0]}
                        currentStep={currentStep}
                        totalSteps={steps.length}
                    >
                        {`def maxSubArrayLen(nums: List[int], k: int) -> int:
    """
    Find maximum length of subarray that sums to k
    Time: O(n), Space: O(n)
    
    Key insight: Store FIRST occurrence of each prefix sum
    """
    prefix_map = {0: -1}  # prefix_sum -> first occurrence index
    prefix_sum = 0
    max_length = 0
    
    for i, num in enumerate(nums):
        prefix_sum += num
        
        # Check if we can form a subarray with sum k
        complement = prefix_sum - k
        if complement in prefix_map:
            current_length = i - prefix_map[complement]
            max_length = max(max_length, current_length)
        
        # Only store first occurrence (to maximize length)
        if prefix_sum not in prefix_map:
            prefix_map[prefix_sum] = i
    
    return max_length

# Example usage:
nums = [1, -1, 5, -2, 3]
k = 3
result = maxSubArrayLen(nums, k)
print(f"Maximum length subarray with sum {k}: {result}")  # Output: 4
# Subarray: [1, -1, 5, -2] from index 0 to 3

# Another example:
nums2 = [-2, -1, 2, 1]
k2 = 1
result2 = maxSubArrayLen(nums2, k2)
print(f"Maximum length subarray with sum {k2}: {result2}")  # Output: 2
# Subarray: [-1, 2] from index 1 to 2`}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <div className="win1-window h-full">
                        <div className="win1-titlebar">
                            <span className="flex items-center gap-2 font-mono">
                                <IconCpu className="w-5 h-5" /> STACK CARD
                            </span>
                        </div>
                        <div className="p-4 space-y-1 text-sm">
                            <p>Index: <span className="text-[var(--danger-color)]">{currentIndex}</span></p>
                            <p>Prefix Sum: <span className="text-[var(--danger-color)]">{prefixSum}</span></p>
                            <p>Target K: <span className="text-[var(--danger-color)]">{target}</span></p>
                            <p>Max Length: <span className="text-[var(--danger-color)]">{maxLength}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <Controls 
                isPlaying={isPlaying} 
                isFinished={isFinished} 
                onPlayPause={() => setIsPlaying(!isPlaying)} 
                onReset={reset} 
                onStepBack={() => goToStep(currentStep - 1)} 
                onStepForward={() => goToStep(currentStep + 1)} 
                onSpeedChange={setSpeed} 
                speed={speed} 
                currentStep={currentStep}
            />
        </div>
    );
};

// Count Number of Nice Subarrays Interactive Component (LeetCode 1248)
const NiceSubarraysInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(2000);
    const [array] = useState([1, 1, 2, 1, 1]);
    const [k] = useState(3);
    
    interface NiceSubarrayStep {
        currentIndex: number;
        oddCount: number;
        subarraysFound: number;
        highlighting: number[];
        mapState: Record<number, number>;
        description: string;
        foundSubarray: boolean;
    }
    
    const steps = useMemo((): NiceSubarrayStep[] => {
        const generatedSteps: NiceSubarrayStep[] = [];
        let oddCount = 0;
        let count = 0;
        const oddCountMap: Record<number, number> = { 0: 1 };
        
        generatedSteps.push({
            currentIndex: -1,
            oddCount: 0,
            subarraysFound: 0,
            highlighting: [],
            mapState: { ...oddCountMap },
            description: "Initialize: map[0] = 1 for empty prefix (0 odd numbers)",
            foundSubarray: false
        });
        
        for (let i = 0; i < array.length; i++) {
            if (array[i] % 2 === 1) {
                oddCount++;
            }
            
            generatedSteps.push({
                currentIndex: i,
                oddCount,
                subarraysFound: count,
                highlighting: [i],
                mapState: { ...oddCountMap },
                description: `Process arr[${i}] = ${array[i]} (${array[i] % 2 === 1 ? 'odd' : 'even'}), odd count = ${oddCount}`,
                foundSubarray: false
            });
            
            const complement = oddCount - k;
            if (oddCountMap[complement] !== undefined) {
                count += oddCountMap[complement];
                generatedSteps.push({
                    currentIndex: i,
                    oddCount,
                    subarraysFound: count,
                    highlighting: [i],
                    mapState: { ...oddCountMap },
                    description: `Found ${oddCountMap[complement]} subarray(s) with ${k} odd numbers!`,
                    foundSubarray: true
                });
            }
            
            oddCountMap[oddCount] = (oddCountMap[oddCount] || 0) + 1;
        }
        
        return generatedSteps;
    }, [array, k]);

    const currentStepData = steps[currentStep] || steps[0];
    const { currentIndex, oddCount, subarraysFound, highlighting, mapState, description, foundSubarray } = currentStepData;

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { setIsPlaying(false); setCurrentStep(0); };
    const goToStep = (step: number) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    return (
        <div id={id} className="my-8">
            <Win1Window title="LeetCode 1248: Count Number of Nice Subarrays">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm mb-4">Count subarrays with exactly {k} odd numbers</p>
                    
                    <div className="relative inline-flex flex-col items-center mb-4">
                        <div className="flex pl-12">
                            {array.map((_, idx) => (
                                <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                            ))}
                        </div>
                        
                        <div className="flex items-center">
                            <div className="flex flex-col items-center mr-2">
                                <IconArrowDown className="w-4 h-4" />
                                <span className="text-2xl">arr:</span>
                            </div>
                            <div className="flex win1-inset bg-white p-0">
                                {array.map((num, idx) => {
                                    let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl ';
                                    if (idx === array.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                                    if (highlighting.includes(idx)) {
                                        cellClasses += foundSubarray ? 'bg-[var(--success-color)] text-white' : 'bg-[var(--warning-color)] text-black';
                                    } else if (idx <= currentIndex) {
                                        if (num % 2 === 1) {
                                            cellClasses += 'bg-blue-100 text-black'; // Odd numbers
                                        } else {
                                            cellClasses += 'bg-gray-100 text-black'; // Even numbers
                                        }
                                    } else {
                                        cellClasses += 'bg-white text-black';
                                    }
                                    return (
                                        <div key={idx} className={cellClasses}>
                                            {num}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 win1-inset w-full">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <h4 className="font-bold text-sm">Odd Count</h4>
                                <p className="text-2xl font-mono">{oddCount}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Nice Subarrays</h4>
                                <p className="text-2xl font-bold text-[var(--success-color)]">{subarraysFound}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Odd Count Map</h4>
                                <p className="text-sm font-mono">
                                    {Object.entries(mapState).map(([key, value]) => `${key}:${value}`).join(', ')}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-sm">{description}</p>
                        </div>
                    </div>
                </div>
            </Win1Window>

            <div className="mt-6 flex gap-4">
                <div className="w-3/5">
                    <RetroCodeBlock
                        title="LeetCode 1248 Solution"
                        language="python"
                        highlightLines={[0]}
                        currentStep={currentStep}
                        totalSteps={steps.length}
                    >
                        {`def numberOfSubarrays(nums: List[int], k: int) -> int:
    """
    Count number of subarrays with exactly k odd numbers
    Time: O(n), Space: O(n)
    
    Key insight: Track count of odd numbers as "prefix sum"
    """
    count = 0
    odd_count = 0
    odd_count_map = {0: 1}  # Handle case where subarray starts from index 0
    
    for num in nums:
        # Update odd count (our "prefix sum")
        if num % 2 == 1:
            odd_count += 1
        
        # Look for previous odd count that gives us exactly k odds
        complement = odd_count - k
        if complement in odd_count_map:
            count += odd_count_map[complement]
        
        # Update frequency of current odd count
        odd_count_map[odd_count] = odd_count_map.get(odd_count, 0) + 1
    
    return count

# Alternative approach using sliding window:
def numberOfSubarrays_slidingWindow(nums: List[int], k: int) -> int:
    """
    Using sliding window technique
    Time: O(n), Space: O(1)
    """
    def atMostK(max_odds):
        if max_odds < 0:
            return 0
        left = count = odd_count = 0
        for right in range(len(nums)):
            if nums[right] % 2 == 1:
                odd_count += 1
            while odd_count > max_odds:
                if nums[left] % 2 == 1:
                    odd_count -= 1
                left += 1
            count += right - left + 1
        return count
    
    return atMostK(k) - atMostK(k - 1)

# Example usage:
nums = [1, 1, 2, 1, 1]
k = 3
result = numberOfSubarrays(nums, k)
print(f"Number of nice subarrays with {k} odds: {result}")  # Output: 2
# Subarrays: [1,1,2,1] and [1,2,1,1]`}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <div className="win1-window h-full">
                        <div className="win1-titlebar">
                            <span className="flex items-center gap-2 font-mono">
                                <IconCpu className="w-5 h-5" /> STACK CARD
                            </span>
                        </div>
                        <div className="p-4 space-y-1 text-sm">
                            <p>Index: <span className="text-[var(--danger-color)]">{currentIndex}</span></p>
                            <p>Odd Count: <span className="text-[var(--danger-color)]">{oddCount}</span></p>
                            <p>Target K: <span className="text-[var(--danger-color)]">{k}</span></p>
                            <p>Found: <span className="text-[var(--danger-color)]">{subarraysFound}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <Controls 
                isPlaying={isPlaying} 
                isFinished={isFinished} 
                onPlayPause={() => setIsPlaying(!isPlaying)} 
                onReset={reset} 
                onStepBack={() => goToStep(currentStep - 1)} 
                onStepForward={() => goToStep(currentStep + 1)} 
                onSpeedChange={setSpeed} 
                speed={speed} 
                currentStep={currentStep}
            />
        </div>
    );
};

export const PrefixSumContent: React.FC<PatternComponentProps> = ({ pattern }) => (
    <>
        <div id="introduction">
            <Prose>
                <p className="pt-8">Prefix Sum is a fundamental preprocessing technique that allows efficient range sum queries. By precomputing cumulative sums, we transform O(n) range queries into O(1) operations, making it invaluable for problems involving subarray sums and range operations.</p>
            </Prose>
        </div>
        <PrefixSumInteractive id="interactive-demo" />
        <RangeSumQueryInteractive id="leetcode-303" />
        <SubarraySumKInteractive id="leetcode-560" />
        <ContiguousArrayInteractive id="leetcode-525" />
        <BinarySubarraysSumInteractive id="leetcode-930" />
        <MaxSizeSubarrayKInteractive id="leetcode-325" />
        <NiceSubarraysInteractive id="leetcode-1248" />
        <ComplexityBox
            id="complexity-analysis"
            time={<ul className="list-disc pl-5"><li>Preprocessing: O(n)</li><li>Range Query: O(1)</li><li>Overall: O(n + q) for q queries</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(n) for prefix array</li></ul>}
            recurrence="T(n) = O(1) + T(n-1) = O(n)"
            theorem="Linear time preprocessing enables constant time range queries."
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 21}, (_, i) => ({ 
                n: i * 5, 
                'Naive O(n*q)': i * 5 * 10, 
                'Prefix Sum O(n+q)': i * 5 + 10 
            })), [])}
            lines={[ 
                { dataKey: 'Naive O(n*q)', name: 'Naive Approach', color: 'var(--danger-color)' }, 
                { dataKey: 'Prefix Sum O(n+q)', name: 'Prefix Sum', color: 'var(--success-color)' } 
            ]}
            title="Prefix Sum vs Naive Range Queries" 
            subtitle="Performance comparison for multiple range sum queries" 
            inputLabel="Array Size (n)"
        />
        <ApplicationsBox id="use-cases" items={[
            "Subarray Sum Equals K - counting subarrays with target sum",
            "Range Sum Query - immutable array range sum queries", 
            "Contiguous Array - finding longest subarray with equal 0s and 1s",
            "Corporate Flight Bookings - efficiently handling range updates"
        ]}/>
        <DisadvantagesBox id="disadvantages" items={[
            "Requires O(n) extra space for the prefix sum array",
            "Not suitable for dynamic arrays with frequent insertions/deletions",
            "Limited to associative operations (sum, XOR, etc.)"
        ]}/>

        {/* LeetCode Problems Section */}
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Practice Problems</h3>
            <div className="space-y-6">
                {leetCodeProblems['prefix-sum'].map((problem) => (
                    <ExecutionCard 
                        key={problem.id} 
                        problem={problem} 
                        patternName="Prefix Sum" 
                    />
                ))}
            </div>
        </div>
    </>
);