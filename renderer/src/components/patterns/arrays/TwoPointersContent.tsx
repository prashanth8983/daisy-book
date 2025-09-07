import React, { useState, useMemo } from 'react';
import { PatternComponentProps } from '../../../types';
import { Prose, ComplexityBox, ApplicationsBox, DisadvantagesBox, Win1Window } from '../../ui/Win1Window';
import { Controls } from '../../ui/Controls';
import { RetroCodeBlock } from '../../ui/RetroCodeBlock';
import { EnhancedChart } from '../../ui/EnhancedChart';
import { IconArrowDown, IconCpu } from '../../ui/icons';
import { ExecutionCard, leetCodeProblems } from '../../ui/ExecutionCard';

// Two Pointers Interactive Component
const TwoPointersInteractive: React.FC<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [array] = useState([1, 2, 3, 4, 6, 8, 9, 14, 15]);
    const [target] = useState(13);
    
    interface TwoPointersStep {
        left: number;
        right: number;
        sum: number;
        description: string;
        line: number;
        found: boolean;
    }
    
    const steps = useMemo((): TwoPointersStep[] => [
        { left: 0, right: 8, sum: 16, description: "Initialize: left=0, right=8, sum=16 > 13, move right--", line: 1, found: false },
        { left: 0, right: 7, sum: 15, description: "left=0, right=7, sum=15 > 13, move right--", line: 3, found: false },
        { left: 0, right: 6, sum: 10, description: "left=0, right=6, sum=10 < 13, move left++", line: 2, found: false },
        { left: 1, right: 6, sum: 11, description: "left=1, right=6, sum=11 < 13, move left++", line: 2, found: false },
        { left: 2, right: 6, sum: 12, description: "left=2, right=6, sum=12 < 13, move left++", line: 2, found: false },
        { left: 3, right: 6, sum: 13, description: "Found! left=3, right=6, sum=13 = target", line: 0, found: true }
    ], []);

    const currentStepData = steps[currentStep] || steps[0];
    const { left, right, sum, description, line, found } = currentStepData;

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
            <React.Fragment key="line0">if current_sum == target: return [left, right]</React.Fragment>,
            <React.Fragment key="line1">left:<Var val={left}/>, right:<Var val={right}/> = 0, len(arr) - 1</React.Fragment>,
            <React.Fragment key="line2">elif current_sum {'<'} target: left += 1</React.Fragment>,
            <React.Fragment key="line3">else: right -= 1</React.Fragment>
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
                <p>left: <span className="text-[var(--danger-color)]">{left}</span></p>
                <p>right: <span className="text-[var(--danger-color)]">{right}</span></p>
                <p>sum: <span className="text-[var(--danger-color)]">{sum}</span></p>
                <p>target: <span className="text-[var(--danger-color)]">{target}</span></p>
                <p>found: <span className="text-[var(--danger-color)]">{found ? 'True' : 'False'}</span></p>
            </div>
        </div>
    );

    return (
        <div id={id} className="my-8">
            <Win1Window title="Interactive Demo">
                <div className="flex flex-col items-center">
                    <p className="text-center text-sm mb-4">Finding two numbers that sum to target: {target}</p>
                    <div className="mb-4">
                        <div className="flex gap-1 mb-2">
                            {array.map((val, index) => (
                                <div key={index} className="relative">
                                    <div className={`w-12 h-12 win1-inset bg-white flex items-center justify-center text-sm font-mono border-r-2 border-black ${
                                        index === left ? 'bg-[var(--success-color)] text-white' :
                                        index === right ? 'bg-[var(--danger-color)] text-white' :
                                        found && (index === left || index === right) ? 'bg-[var(--warning-color)] text-black' : ''
                                    } ${index === array.length - 1 ? 'border-r-0' : ''}`}>
                                        {val}
                                    </div>
                                    {index === left && (
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700">
                                            L
                                        </div>
                                    )}
                                    {index === right && (
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-red-700">
                                            R
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

export const TwoPointersContent: React.FC<PatternComponentProps> = ({ pattern }) => (
    <>
        <div id="introduction">
            <Prose>
                <p className="pt-8">Two Pointers is an efficient technique that uses two pointers moving through data structures to solve problems in linear time. By strategically positioning pointers at different locations and moving them based on conditions, we can eliminate the need for nested loops in many scenarios.</p>
            </Prose>
        </div>
        <TwoPointersInteractive id="interactive-demo" />
        <ComplexityBox
            id="complexity-analysis"
            time={<ul className="list-disc pl-5"><li>Best Case: O(n)</li><li>Average Case: O(n)</li><li>Worst Case: O(n)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(1) - constant space</li></ul>}
            recurrence="T(n) = O(n) single pass"
            theorem="Each element is visited at most once by each pointer, ensuring linear time complexity."
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 21}, (_, i) => ({ 
                n: i * 5, 
                'Brute Force O(n²)': Math.pow(i * 5, 2), 
                'Two Pointers O(n)': i * 5 
            })), [])}
            lines={[ 
                { dataKey: 'Brute Force O(n²)', name: 'Brute Force', color: 'var(--danger-color)' }, 
                { dataKey: 'Two Pointers O(n)', name: 'Two Pointers', color: 'var(--success-color)' } 
            ]}
            title="Two Pointers vs Brute Force" 
            subtitle="Time complexity comparison for two-sum type problems" 
            inputLabel="Array Size (n)"
        />
        <ApplicationsBox id="use-cases" items={[
            "Two Sum in sorted array - finding pairs with target sum",
            "Valid Palindrome - checking palindromes with O(1) space", 
            "Container With Most Water - maximizing area between lines",
            "Remove Duplicates - in-place array modification with O(1) space"
        ]}/>
        <DisadvantagesBox id="disadvantages" items={[
            "Often requires the input data to be sorted",
            "Not suitable for problems requiring all possible pairs", 
            "Limited to problems with monotonic decision properties"
        ]}/>

        {/* LeetCode Problems Section */}
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Practice Problems</h3>
            <div className="space-y-6">
                {leetCodeProblems['two-pointers'].map((problem) => (
                    <ExecutionCard 
                        key={problem.id} 
                        problem={problem} 
                        patternName="Two Pointers" 
                    />
                ))}
            </div>
        </div>
    </>
);