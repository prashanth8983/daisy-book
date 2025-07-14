import React, { useState, useEffect, useMemo } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from './ui';

const BubbleSortVisualization = ({ array, comparing, swapping, sorted }) => {
    return (
        <div className="p-6 rounded-lg bg-secondary/30 border border-border font-mono text-center">
            <div className="mb-4">
                <span className="font-bold">arr = </span>
                <span className="text-muted-foreground">[{array.join(', ')}]</span>
            </div>
            <div className="relative inline-flex items-end p-4 bg-background rounded-md border border-border h-48">
                {array.map((num, idx) => {
                    const isComparing = comparing.includes(idx);
                    const isSwapping = swapping.includes(idx);
                    const isSorted = sorted.includes(idx);

                    let barClasses = 'flex items-center justify-center text-sm font-bold text-black transition-all duration-300 ';
                    let barStyle = { height: `${(num / 100) * 100}%`, width: '3rem' };

                    if (isSorted) {
                        barClasses += 'bg-success/50';
                    } else if (isSwapping) {
                        barClasses += 'bg-danger scale-105';
                    } else if (isComparing) {
                        barClasses += 'bg-warning';
                    } else {
                        barClasses += 'bg-secondary';
                    }

                    return (
                        <div key={idx} className="h-full flex flex-col justify-end items-center mx-1">
                            <div style={barStyle} className={barClasses}>{num}</div>
                            <div className="w-12 text-center text-xs text-muted-foreground mt-2">{idx}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const BubbleSortInteractive = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [speed, setSpeed] = useState(1000);
    const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
    const [arrayInput, setArrayInput] = useState(array.join(', '));

    const steps = useMemo(() => {
        const generatedSteps = [];
        let arr = [...array];
        let n = arr.length;
        generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], line: 1, description: "Initial unsorted array.", i: null, j: null });

        for (let i = 0; i < n - 1; i++) {
            let hasSwapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                generatedSteps.push({ array: [...arr], comparing: [j, j + 1], swapping: [], sorted: Array.from({length: i}, (_, k) => n - 1 - k), line: 5, description: `Comparing arr[${j}] (${arr[j]}) and arr[${j+1}] (${arr[j+1]})`, i, j });
                if (arr[j] > arr[j + 1]) {
                    hasSwapped = true;
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    generatedSteps.push({ array: [...arr], comparing: [j, j+1], swapping: [j, j+1], sorted: Array.from({length: i}, (_, k) => n - 1 - k), line: 7, description: `Swapping ${arr[j+1]} and ${arr[j]}.`, i, j });
                }
            }
            if (!hasSwapped) {
                generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({length: n}, (_,k)=>k), line: 9, description: `No swaps in this pass. Array is sorted.`, i, j: null });
                break;
            }
        }
        if (steps[steps.length - 1]?.sorted.length !== n) {
            generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({length: n}, (_,k)=>k), line: 1, description: 'Array is sorted.', i: null, j: null });
        }
        return generatedSteps;
    }, [array]);

    const currentStepData = steps[currentStep] || steps[0];
    const { array: currentArray, comparing, swapping, sorted, line, description, i, j } = currentStepData;

    useEffect(() => {
        let interval;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) setIsPlaying(false);
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { 
        setIsPlaying(false); 
        setCurrentStep(0);
        const newArr = arrayInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        setArray(newArr);
    }; 
    const goToStep = (step) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    const getCodeLines = (vars) => {
        const { i, j } = vars;
        const Var = ({val}) => <span className="text-primary font-bold">{val}</span>;
        return [
            <React.Fragment key="line1">def bubble_sort(arr):</React.Fragment>,
            <React.Fragment key="line2">    n = len(arr)</React.Fragment>,
            <React.Fragment key="line3">    for i in range(n):</React.Fragment>,
            <React.Fragment key="line4">        swapped = False</React.Fragment>,
            <React.Fragment key="line5">        for j in range(0, n - i - 1):</React.Fragment>,
            <React.Fragment key="line6">        if arr[j] {'>'} arr[j + 1]:</React.Fragment>,
            <React.Fragment key="line7">            arr[j], arr[j+1] = arr[j+1], arr[j]</React.Fragment>,
            <React.Fragment key="line8">            swapped = True</React.Fragment>,
            <React.Fragment key="line9">        if not swapped:</React.Fragment>,
            <React.Fragment key="line10">            break</React.Fragment>,
        ];
    };

    const StackCard = ({ variables }) => (
        <div className="bg-secondary/30 h-full rounded-r-lg">
            <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="font-bold flex items-center gap-2"><Cpu size={16}/> State</span>
            </div>
            <div className="p-4 space-y-2 text-sm font-mono">
                <p>pass (i): <span className="font-bold text-primary">{variables.i ?? 'N/A'}</span></p>
                <p>comp (j): <span className="font-bold text-primary">{variables.j ?? 'N/A'}</span></p>
            </div>
        </div>
    );

    return (
        <div className="my-8 rounded-lg border border-border p-4 space-y-6">
             <div>
                <h3 className="font-bold text-lg">Parameters</h3>
                <div className="mt-2">
                    <input type="text" value={arrayInput} onChange={e => setArrayInput(e.target.value)} onBlur={reset} className="w-full bg-background border border-input rounded-md p-2 font-mono text-sm" placeholder="Comma-separated numbers..." />
                </div>
            </div>
            
            <BubbleSortVisualization array={currentArray} comparing={comparing} swapping={swapping} sorted={sorted} />
            
            <div className="flex rounded-lg border border-border">
                <div className="w-4/5">
                    <RetroCodeBlock title="Execution" highlightLines={[line]}>
                        {getCodeLines({ i, j })}
                    </RetroCodeBlock>
                </div>
                <div className="w-1/5 border-l border-border">
                    <StackCard variables={{ i, j }}/>
                </div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                <h3 className="font-bold text-lg mb-2">Explanation</h3>
                <p className="font-serif text-lg text-muted-foreground h-12">{description}</p>
            </div>
            <Controls isPlaying={isPlaying} isFinished={isFinished} onPlayPause={() => setIsPlaying(!isPlaying)} onReset={reset} onStepBack={() => goToStep(currentStep - 1)} onStepForward={() => goToStep(currentStep + 1)} onSpeedChange={setSpeed} speed={speed} currentStep={currentStep} totalSteps={steps.length} />
        </div>
    );
};


export const BubbleSortContent = ({ topic }) => (
    <>
        <SectionHeading title="Bubble Sort" id="introduction" icon={Lightbulb} />
        <Prose>
            <p>Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass is repeated until the list is sorted. It's named for the way elements "bubble" to their correct positions.</p>
        </Prose>
        <DefinitionBox>
            A simple comparison-based sorting algorithm where adjacent elements are compared and swapped if they are not in the intended order. This process is repeated until the list is sorted.
        </DefinitionBox>
        <SectionHeading title="Algorithm + Visualization" id="interactive-demo" icon={Beaker} />
        <BubbleSortInteractive />
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <ComplexityBox
            time={<ul className="list-disc pl-5"><li>Best Case: O(n)</li><li>Average Case: O(n²)</li><li>Worst Case: O(n²)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(1)</li></ul>}
        />
        <EnhancedChart data={useMemo(() => Array.from({length: 51}, (_, i) => ({ n: i * 2, 'Bubble O(n²)': (i * 2)**2, 'Efficient O(n log n)': (i * 2) * Math.log2(i * 2) || 0 })), [])} lines={[{ dataKey: 'Bubble O(n²)', name: 'Bubble Sort', color: 'hsl(var(--danger))' }, { dataKey: 'Efficient O(n log n)', name: 'Efficient Sort', color: 'hsl(var(--success))' }]} title="Sorting Algorithm Comparison" subtitle="Time complexity growth: Quadratic vs. Log-linear" inputLabel="Array Size (n)" />
        <SectionHeading title="Applications" id="use-cases" icon={Target} />
        <ApplicationsBox items={[
            "Primarily used for educational purposes to teach sorting concepts.",
            "Can be useful for very small or nearly-sorted datasets where its simplicity outweighs its inefficiency."
        ]}/>
        <SectionHeading title="Disadvantages" id="disadvantages" icon={AlertTriangle} />
        <DisadvantagesBox items={[
            "Extremely inefficient for most real-world scenarios with a time complexity of <strong>O(n²)</strong>.",
            "Generally outperformed by other simple sorting algorithms like Insertion Sort."
        ]}/>
    </>
);
