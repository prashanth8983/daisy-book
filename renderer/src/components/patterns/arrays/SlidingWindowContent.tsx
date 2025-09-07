import React, { useState, useMemo } from 'react';
import { PatternComponentProps } from '../../../types';
import { Prose, ComplexityBox, ApplicationsBox, DisadvantagesBox, Win1Window } from '../../ui/Win1Window';
import { Controls } from '../../ui/Controls';
import { RetroCodeBlock } from '../../ui/RetroCodeBlock';
import { EnhancedChart } from '../../ui/EnhancedChart';
import { IconArrowDown, IconCpu } from '../../ui/icons';
import { ExecutionCard, leetCodeProblems } from '../../ui/ExecutionCard';

// Sliding Window Interactive Component
const SlidingWindowInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [array] = useState([2, 1, 2, 3, 2, 1, 4, 2]);
    const [windowSize] = useState(3);
    
    interface SlidingWindowStep {
        start: number;
        sum: number;
        maxSum: number;
        description: string;
        line: number;
    }
    
    const steps = useMemo((): SlidingWindowStep[] => [
        { start: 0, sum: 5, maxSum: 5, description: "Initialize: window [2,1,2], sum = 5, max = 5", line: 1 },
        { start: 1, sum: 6, maxSum: 6, description: "Slide window: [1,2,3], sum = 6 > 5, update max = 6", line: 2 },
        { start: 2, sum: 7, maxSum: 7, description: "Slide window: [2,3,2], sum = 7 > 6, update max = 7", line: 2 },
        { start: 3, sum: 6, maxSum: 7, description: "Slide window: [3,2,1], sum = 6 < 7, max stays 7", line: 2 },
        { start: 4, sum: 7, maxSum: 7, description: "Slide window: [2,1,4], sum = 7 = max, no change", line: 2 },
        { start: 5, sum: 7, maxSum: 7, description: "Slide window: [1,4,2], sum = 7 = max, final result = 7", line: 2 }
    ], []);

    const currentStepData = steps[currentStep] || steps[0];
    const { start, sum, maxSum, description, line } = currentStepData;

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

    const getCodeLines = () => {
        const Var = ({val}: {val: React.ReactNode}) => <span className="text-[var(--danger-color)]">{val}</span>;
        return [
            <React.Fragment key="line0">max_sum = sum of first k elements</React.Fragment>,
            <React.Fragment key="line1">window_sum:<Var val={sum}/> = initial window sum</React.Fragment>,
            <React.Fragment key="line2">slide: window_sum = window_sum - left + right</React.Fragment>
        ];
    };

    const StackCard: React.FC = () => (
        <div className="win1-window h-full">
            <div className="win1-titlebar">
                <span className="flex items-center gap-2 font-mono">
                    <IconCpu className="w-5 h-5" /> VARIABLES
                </span>
            </div>
            <div className="p-4 space-y-1 text-sm">
                <p>window_start: <span className="text-[var(--danger-color)]">{start}</span></p>
                <p>window_size: <span className="text-[var(--danger-color)]">{windowSize}</span></p>
                <p>current_sum: <span className="text-[var(--danger-color)]">{sum}</span></p>
                <p>max_sum: <span className="text-[var(--danger-color)]">{maxSum}</span></p>
            </div>
        </div>
    );

    return (
        <div id={id} className="my-8">
            <Win1Window title="Interactive Demo">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm mb-4">Finding maximum sum of {windowSize} consecutive elements</p>
                    <div className="mb-4">
                        <div className="flex gap-1 mb-2">
                            {array.map((val, index) => (
                                <div key={index} className="relative">
                                    <div className={`w-12 h-12 win1-inset bg-white flex items-center justify-center text-sm font-mono border-r-2 border-black ${
                                        index >= start && index < start + windowSize 
                                            ? 'bg-[var(--success-color)] text-white' 
                                            : ''
                                    } ${index === array.length - 1 ? 'border-r-0' : ''}`}>
                                        {val}
                                    </div>
                                    {index === start && (
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700">
                                            START
                                        </div>
                                    )}
                                    {index === start + windowSize - 1 && (
                                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700">
                                            END
                                        </div>
                                    )}
                                </div>
                            ))}
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
                        {getCodeLines()}
                    </RetroCodeBlock>
                </div>
                <div className="w-2/5">
                    <StackCard />
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

export const SlidingWindowContent: React.FC<PatternComponentProps> = ({ pattern }) => (
    <>
        <div id="introduction">
            <Prose>
                <p className="pt-8">Sliding Window is an algorithmic technique that maintains a window of elements as it moves through a data structure. This approach transforms many O(n²) brute force solutions into efficient O(n) algorithms by avoiding redundant calculations.</p>
            </Prose>
        </div>
        <SlidingWindowInteractive id="interactive-demo" />
        <ComplexityBox
            id="complexity-analysis"
            time={<ul className="list-disc pl-5"><li>Fixed Window: O(n)</li><li>Variable Window: O(n)</li><li>Each element visited at most twice</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(1) - constant space</li></ul>}
            recurrence="T(n) = O(n) single pass with window operations"
            theorem="By maintaining window state during traversal, we eliminate the need for nested loops."
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 21}, (_, i) => ({ 
                n: i * 5, 
                'Brute Force O(n²)': Math.pow(i * 5, 2), 
                'Sliding Window O(n)': i * 5 
            })), [])}
            lines={[ 
                { dataKey: 'Brute Force O(n²)', name: 'Brute Force', color: 'var(--danger-color)' }, 
                { dataKey: 'Sliding Window O(n)', name: 'Sliding Window', color: 'var(--success-color)' } 
            ]}
            title="Sliding Window vs Brute Force" 
            subtitle="Time complexity comparison for subarray problems" 
            inputLabel="Array Size (n)"
        />
        <ApplicationsBox id="use-cases" items={[
            "Maximum Sum Subarray of Size K - finding optimal fixed-size subarrays",
            "Longest Substring Without Repeating Characters - variable window optimization", 
            "Minimum Window Substring - finding smallest window containing all characters",
            "Permutation in String - checking if string contains permutation of another string"
        ]}/>
        <DisadvantagesBox id="disadvantages" items={[
            "Only works for problems with contiguous elements",
            "Window expansion/contraction logic can be complex for variable-size windows", 
            "Not suitable for problems requiring non-adjacent elements"
        ]}/>

        {/* LeetCode Problems Section */}
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Practice Problems</h3>
            <div className="space-y-6">
                {leetCodeProblems['sliding-window'].map((problem) => (
                    <ExecutionCard 
                        key={problem.id} 
                        problem={problem} 
                        patternName="Sliding Window" 
                    />
                ))}
            </div>
        </div>
    </>
);