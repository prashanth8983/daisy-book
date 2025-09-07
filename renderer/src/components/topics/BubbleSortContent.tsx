import React, { useState, useEffect, useMemo } from 'react';
import { AlgorithmTopic } from '../../types';
import { Prose, ComplexityBox, ApplicationsBox, DisadvantagesBox } from '../ui/Win1Window';
import { Win1Window } from '../ui/Win1Window';
import { RetroCodeBlock } from '../ui/RetroCodeBlock';
import { Controls } from '../ui/Controls';
import { EnhancedChart } from '../ui/EnhancedChart';
import { IconArrowDown, IconCpu } from '../ui/icons';

// Bubble Sort Visualization Component
interface BubbleSortVisualizationProps {
    array: number[];
    comparing: number[];
    swapping: number[];
    sorted: number[];
    onUpdateArray: (newArray: number[]) => void;
}

const BubbleSortVisualization: React.FC<BubbleSortVisualizationProps> = ({ 
    array, comparing, swapping, sorted, onUpdateArray 
}) => {
    const handleValueChange = (e: React.MouseEvent<HTMLDivElement>, index: number, delta: number) => {
        e.preventDefault();
        const newArray = [...array];
        newArray[index] = Math.max(0, newArray[index] + delta);
        onUpdateArray(newArray);
    };

    return (
        <div className="relative inline-flex flex-col items-center">
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
                <div className="flex win1-inset bg-white p-0">
                    {array.map((num, idx) => {
                        let cellClasses = 'w-12 h-12 flex items-center justify-center border-r-2 border-black text-2xl cursor-pointer ';
                        if (idx === array.length - 1) cellClasses = cellClasses.replace('border-r-2', '');
                        if (sorted.includes(idx)) cellClasses += 'bg-[var(--success-color)] text-white';
                        else if (swapping.includes(idx)) cellClasses += 'bg-black text-white';
                        else if (comparing.includes(idx)) cellClasses += 'bg-[var(--warning-color)] text-black';
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
            </div>
        </div>
    );
};

// Bubble Sort Interactive Component
const BubbleSortInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(1000);
    const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);

    interface BubbleSortStep {
        array: number[];
        comparing: number[];
        swapping: number[];
        sorted: number[];
        line: number;
        description: string;
        i: number | null;
        j: number | null;
    }

    const steps = useMemo((): BubbleSortStep[] => {
        const generatedSteps: BubbleSortStep[] = [];
        let arr = [...array];
        let n = arr.length;
        generatedSteps.push({ 
            array: [...arr], 
            comparing: [], 
            swapping: [], 
            sorted: [], 
            line: 1, 
            description: "Initial unsorted array.", 
            i: null, 
            j: null 
        });

        for (let i = 0; i < n - 1; i++) {
            let hasSwapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                generatedSteps.push({ 
                    array: [...arr], 
                    comparing: [j, j + 1], 
                    swapping: [], 
                    sorted: Array.from({length: i}, (_, k) => n - 1 - k), 
                    line: 5, 
                    description: `Comparing arr[${j}] (${arr[j]}) and arr[${j+1}] (${arr[j+1]})`, 
                    i, 
                    j 
                });
                
                if (arr[j] > arr[j + 1]) {
                    hasSwapped = true;
                    generatedSteps.push({ 
                        array: [...arr], 
                        comparing: [j, j+1], 
                        swapping: [j, j+1], 
                        sorted: Array.from({length: i}, (_, k) => n - 1 - k), 
                        line: 7, 
                        description: `Swapping ${arr[j]} and ${arr[j + 1]}.`, 
                        i, 
                        j 
                    });
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
            
            if (!hasSwapped) {
                generatedSteps.push({ 
                    array: [...arr], 
                    comparing: [], 
                    swapping: [], 
                    sorted: Array.from({length: n}, (_,k)=>k), 
                    line: 9, 
                    description: `No swaps in this pass. Array is sorted.`, 
                    i, 
                    j: null 
                });
                break;
            }
        }
        
        if (generatedSteps.length > 0 && generatedSteps[generatedSteps.length - 1].sorted.length !== n) {
            generatedSteps.push({ 
                array: [...arr], 
                comparing: [], 
                swapping: [], 
                sorted: Array.from({length: n}, (_,k)=>k), 
                line: 1, 
                description: 'Array is sorted.', 
                i: null, 
                j: null 
            });
        }
        return generatedSteps;
    }, [array]);
    
    const currentStepData = steps[currentStep] || steps[0];
    const { array: currentArray, comparing, swapping, sorted, line, description, i, j } = currentStepData;

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

    const getCodeLines = (vars: {i: number | null, j: number | null}) => {
        const { i, j } = vars;
        const Var = ({val}: {val: React.ReactNode}) => <span className="text-[var(--danger-color)]">{val}</span>;
        return [
            <React.Fragment key="line1">def bubble_sort(arr):</React.Fragment>,
            <React.Fragment key="line2">    n = len(arr)</React.Fragment>,
            <React.Fragment key="line3">    for i:<Var val={i ?? '?' }/> in range(n):</React.Fragment>,
            <React.Fragment key="line4">        swapped = False</React.Fragment>,
            <React.Fragment key="line5">        for j:<Var val={j ?? '?' }/> in range(0, n - i - 1):</React.Fragment>,
            <React.Fragment key="line6">            if arr[j] {'>'} arr[j + 1]:</React.Fragment>,
            <React.Fragment key="line7">                arr[j], arr[j+1] = arr[j+1], arr[j]</React.Fragment>,
            <React.Fragment key="line8">                swapped = True</React.Fragment>,
            <React.Fragment key="line9">        if not swapped:</React.Fragment>,
            <React.Fragment key="line10">            break</React.Fragment>,
        ];
    };

    const StackCard: React.FC<{ variables: { i: number | null, j: number | null } }> = ({ variables }) => (
        <div className="win1-window h-full">
            <div className="win1-titlebar">
                <span className="flex items-center gap-2">
                    <IconCpu className="w-5 h-5"/> STACK CARD
                </span>
            </div>
            <div className="p-4 space-y-1 text-sm">
                <p>pass (i): <span className="text-[var(--danger-color)]">{variables.i ?? 'N/A'}</span></p>
                <p>comparison (j): <span className="text-[var(--danger-color)]">{variables.j ?? 'N/A'}</span></p>
            </div>
        </div>
    );

    return (
        <div id={id} className="my-8">
            <Win1Window title="Interactive Demo">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm my-2">Left-click to increase value, Right-click to decrease.</p>
                    <div className="overflow-x-auto no-scrollbar flex justify-center w-full py-4 px-2">
                        <BubbleSortVisualization 
                            array={currentArray} 
                            comparing={comparing} 
                            swapping={swapping} 
                            sorted={sorted} 
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
                        {getCodeLines({ i, j })}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <StackCard variables={{ i, j }}/>
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

export const BubbleSortContent: React.FC<{ topic: AlgorithmTopic }> = () => (
    <>
        <div id="introduction">
            <Prose>
                <p className="pt-8">Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass is repeated until the list is sorted. It's named for the way elements "bubble" to their correct positions.</p>
            </Prose>
        </div>
        <BubbleSortInteractive id="interactive-demo" />
        <ComplexityBox
            id="complexity-analysis"
            time={<ul className="list-disc pl-5"><li>Best Case: O(n)</li><li>Average Case: O(n²)</li><li>Worst Case: O(n²)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(1)</li></ul>}
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 51}, (_, i) => ({ 
                n: i * 2, 
                'Bubble O(n²)': (i * 2)**2, 
                'Efficient O(n log n)': (i * 2) * Math.log2(i * 2) || 0 
            })), [])} 
            lines={[
                { dataKey: 'Bubble O(n²)', name: 'Bubble Sort', color: 'var(--danger-color)' }, 
                { dataKey: 'Efficient O(n log n)', name: 'Efficient Sort', color: 'var(--success-color)' }
            ]} 
            title="Sorting Algorithm Comparison" 
            subtitle="Time complexity growth: Quadratic vs. Log-linear" 
            inputLabel="Array Size (n)" 
        />
        <ApplicationsBox id="use-cases" items={[
            "Primarily used for educational purposes to teach sorting concepts.",
            "Can be useful for very small or nearly-sorted datasets where its simplicity outweighs its inefficiency."
        ]}/>
        <DisadvantagesBox id="disadvantages" items={[
            "Extremely inefficient for most real-world scenarios with a time complexity of O(n²).",
            "Generally outperformed by other simple sorting algorithms like Insertion Sort."
        ]}/>
    </>
);