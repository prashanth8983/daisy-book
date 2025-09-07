import React, { useState, useEffect, useMemo } from 'react';
import { AlgorithmTopic } from '../../types';
import { Prose, ComplexityBox, ApplicationsBox, DisadvantagesBox } from '../ui/Win1Window';
import { Win1Window } from '../ui/Win1Window';
import { RetroCodeBlock } from '../ui/RetroCodeBlock';
import { Controls } from '../ui/Controls';
import { EnhancedChart } from '../ui/EnhancedChart';
import { IconArrowDown, IconCpu } from '../ui/icons';

// Binary Search Visualization Component
interface BinarySearchVisualizationProps {
    array: number[];
    left: number | null;
    right: number | null;
    mid: number | null;
    foundIndex: number;
    comparing: boolean;
    onUpdateArray: (newArray: number[]) => void;
}

const BinarySearchVisualization: React.FC<BinarySearchVisualizationProps> = ({ 
    array, left, right, mid, foundIndex, comparing, onUpdateArray 
}) => {
    const handleValueChange = (e: React.MouseEvent<HTMLDivElement>, index: number, delta: number) => {
        e.preventDefault();
        const newArray = [...array];
        newArray[index] = Math.max(0, newArray[index] + delta);
        onUpdateArray(newArray.sort((a,b) => a - b));
    };

    return (
        <div className="relative inline-flex flex-col items-center pb-8">
            <div className="flex pl-12">
                {array.map((num, idx) => (
                    <div key={idx} className="w-12 text-center text-sm">{idx}</div>
                ))}
            </div>
            <div className="flex items-center">
                <div className="flex flex-col items-center mr-2">
                    <IconArrowDown className="w-4 h-4" />
                    <span className="text-2xl">arr:</span>
                </div>
                <div className="relative">
                    <div className="flex win1-inset bg-white p-0">
                        {array.map((num, idx) => {
                            let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl cursor-pointer ';
                            if (idx === array.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                            if (idx === foundIndex) cellClasses += 'bg-[var(--success-color)] text-white';
                            else if (idx === mid && comparing) cellClasses += 'bg-[var(--warning-color)] text-black';
                            else cellClasses += 'bg-white text-black';
                            return (
                                <div 
                                    key={`${idx}-${num}`} 
                                    className={cellClasses} 
                                    onClick={(e) => handleValueChange(e, idx, 1)} 
                                    onContextMenu={(e) => handleValueChange(e, idx, -1)}
                                >
                                    {num}
                                </div>
                            );
                        })}
                    </div>
                    <div className="absolute top-full h-6 w-full mt-1">
                        {left !== null && (
                            <div className="absolute text-[var(--success-color)]" style={{left: `${left * 48 + 24}px`, transform: 'translateX(-50%)'}}>
                                L
                            </div>
                        )}
                        {right !== null && (
                            <div className="absolute text-[var(--danger-color)]" style={{left: `${right * 48 + 24}px`, transform: 'translateX(-50%)'}}>
                                R
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Binary Search Interactive Component
const BinarySearchInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(1500);
    const [array, setArray] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
    const [target, setTarget] = useState<number>(23);
    const [targetInput, setTargetInput] = useState<string>(target.toString());

    interface BinarySearchStep {
        left: number;
        right: number;
        mid: number | null;
        foundIndex: number;
        line: number;
        description: string;
        comparing: boolean;
    }

    const steps = useMemo((): BinarySearchStep[] => {
        const generatedSteps: BinarySearchStep[] = [];
        let l = 0, r = array.length - 1;
        generatedSteps.push({ left: l, right: r, mid: null, foundIndex: -1, line: 2, description: `Initialize pointers: left = ${l}, right = ${r}`, comparing: false });
        
        while (l <= r) {
            let m = Math.floor((l + r) / 2);
            generatedSteps.push({ left: l, right: r, mid: m, foundIndex: -1, line: 4, description: `Calculate midpoint: mid = ${m}`, comparing: false });
            generatedSteps.push({ left: l, right: r, mid: m, foundIndex: -1, line: 5, description: `Compare: arr[${m}] (${array[m]}) with target (${target})`, comparing: true });
            
            if (array[m] === target) {
                generatedSteps.push({ left: l, right: r, mid: m, foundIndex: m, line: 6, description: `Found! Target ${target} is at index ${m}.`, comparing: false });
                break;
            } else if (array[m] < target) {
                generatedSteps.push({ left: l, right: r, mid: m, foundIndex: -1, line: 8, description: `${array[m]} < ${target}, search right half.`, comparing: false });
                l = m + 1;
            } else {
                generatedSteps.push({ left: l, right: r, mid: m, foundIndex: -1, line: 10, description: `${array[m]} > ${target}, search left half.`, comparing: false });
                r = m - 1;
            }
        }
        
        if (l > r && (generatedSteps.length === 0 || generatedSteps[generatedSteps.length - 1].foundIndex === -1)) {
            generatedSteps.push({ left: l, right: r, mid: null, foundIndex: -1, line: 11, description: `Search space exhausted. Target not found.`, comparing: false });
        }
        return generatedSteps;
    }, [array, target]);

    const currentStepData = steps[currentStep] || steps[0];
    const { left, right, mid, foundIndex, line, description, comparing } = currentStepData;

    useEffect(() => {
        let interval: number | undefined;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = window.setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { setIsPlaying(false); setCurrentStep(0); };
    const goToStep = (step: number) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    const getCodeLines = (vars: {left: number, right: number, mid: number | null, target: number}) => {
        const { left, right, mid, target } = vars;
        const Var = ({val}: {val: React.ReactNode}) => <span className="text-[var(--danger-color)]">{val}</span>;
        return [
            <React.Fragment key="line1">def binary_search(arr, target:<Var val={target}/>):</React.Fragment>,
            <React.Fragment key="line2">    left:<Var val={left}/>, right:<Var val={right}/> = 0, len(arr) - 1</React.Fragment>,
            <React.Fragment key="line3">    while left {'<='} right:</React.Fragment>,
            <React.Fragment key="line4">        mid:<Var val={mid ?? '?' }/> = (left + right) // 2</React.Fragment>,
            <React.Fragment key="line5">        if arr[mid] == target:</React.Fragment>,
            <React.Fragment key="line6">            return mid</React.Fragment>,
            <React.Fragment key="line7">        elif arr[mid] {'<'} target:</React.Fragment>,
            <React.Fragment key="line8">            left = mid + 1</React.Fragment>,
            <React.Fragment key="line9">        else:</React.Fragment>,
            <React.Fragment key="line10">            right = mid - 1</React.Fragment>,
            <React.Fragment key="line11">    return -1</React.Fragment>
        ];
    };

    const StackCard: React.FC<{ variables: { left: number, right: number, mid: number | null, target: number } }> = ({ variables }) => (
        <div className="win1-window h-full">
            <div className="win1-titlebar">
                <span className="flex items-center gap-2 font-mono">
                    <IconCpu className="w-5 h-5" /> STACK CARD
                </span>
            </div>
            <div className="p-4 space-y-1 text-sm">
                <p>target: <span className="text-[var(--danger-color)]">{variables.target}</span></p>
                <p>left: <span className="text-[var(--danger-color)]">{variables.left}</span></p>
                <p>right: <span className="text-[var(--danger-color)]">{variables.right}</span></p>
                <p>mid: <span className="text-[var(--danger-color)]">{variables.mid ?? 'null'}</span></p>
            </div>
        </div>
    );
    
    return (
        <div id={id} className="my-8">
            <Win1Window title="Interactive Demo">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm my-2">Left-click an array cell to increase its value, right-click to decrease.</p>
                    <div className="flex justify-between w-full items-end">
                        <div className="flex-1 overflow-x-auto no-scrollbar flex justify-start px-2">
                           <BinarySearchVisualization 
                                array={array} 
                                left={left} 
                                right={right} 
                                mid={mid} 
                                foundIndex={foundIndex} 
                                comparing={comparing} 
                                onUpdateArray={setArray} 
                            />
                        </div>
                        <div className="text-right ml-4 flex-shrink-0 mb-8">
                            <div>
                                <label className="block mb-1">TARGET VALUE</label>
                                <input 
                                    type="text" 
                                    value={targetInput} 
                                    onChange={e => setTargetInput(e.target.value)} 
                                    onBlur={() => { setTarget(Number(targetInput)); reset(); }} 
                                    className="w-32 win1-inset bg-white p-2 text-center" 
                                    placeholder="Target..." 
                                />
                            </div>
                        </div>
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
                        {getCodeLines({left, right, mid, target})}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <StackCard variables={{left, right, mid, target}}/>
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

export const BinarySearchContent: React.FC<{ topic: AlgorithmTopic }> = () => (
    <>
        <div id="introduction">
            <Prose>
                <p className="pt-8">Binary search is a quintessential divide-and-conquer algorithm. Its efficiency makes it a cornerstone of computer science, ideal for rapidly locating an element within a SORTED array. The core principle is to eliminate half of the remaining search space with each comparison.</p>
            </Prose>
        </div>
        <BinarySearchInteractive id="interactive-demo" />
        <ComplexityBox
            id="complexity-analysis"
            time={<ul className="list-disc pl-5"><li>Best Case: O(1)</li><li>Average Case: O(log n)</li><li>Worst Case: O(log n)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(1) (Iterative)</li></ul>}
            recurrence="T(n) = T(n/2) + O(1)"
            theorem="Using Master's Theorem case 2, where a=1, b=2, and f(n)=O(1), the time complexity is O(log n)."
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 51}, (_, i) => ({ 
                n: i * 20, 
                'Linear O(n)': i * 20, 
                'Binary O(log n)': i * 20 > 0 ? Math.log2(i * 20) : 0 
            })), [])}
            lines={[ 
                { dataKey: 'Linear O(n)', name: 'Linear Search', color: 'var(--danger-color)' }, 
                { dataKey: 'Binary O(log n)', name: 'Binary Search', color: 'var(--success-color)' } 
            ]}
            title="Search Algorithm Comparison" 
            subtitle="Time complexity growth: Linear vs. Logarithmic" 
            inputLabel="Array Size (n)"
        />
        <ApplicationsBox id="use-cases" items={[
            "Searching for a word in a dictionary.",
            "Finding a specific commit in a Git history (git bisect).",
            "Used in debugging to find the point where a bug was introduced.",
            "Common interview questions like 'Find first or last occurrence of a number'."
        ]}/>
        <DisadvantagesBox id="disadvantages" items={[
            "The primary drawback is that the data structure MUST BE SORTED.",
            "Not efficient for data structures that have slow random access, like linked lists.",
            "Frequent insertions or deletions are costly as they may require re-sorting the array."
        ]}/>
    </>
);