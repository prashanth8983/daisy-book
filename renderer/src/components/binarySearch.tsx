import React, { useState, useEffect, useMemo } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from './ui';

const BinarySearchVisualization = ({ array, left, right, mid, foundIndex, comparing }) => {
    return (
        <div className="p-4 retro-border bg-var(--bg-secondary) overflow-x-auto">
            <div className="relative inline-flex flex-col items-center">
                <div className="flex">
                    {array.map((num, idx) => (
                        <div key={idx} className="w-12 text-center text-sm text-var(--text-secondary)">{idx}</div>
                    ))}
                </div>
                <div className="flex border-t-2 border-l-2 border-gray-400">
                    {array.map((num, idx) => {
                        let cellClasses = 'w-12 h-12 flex items-center justify-center border-b-2 border-r-2 border-gray-400 text-2xl font-serif ';
                        if (idx === foundIndex) cellClasses += 'bg-var(--success-color) text-white';
                        else if (idx === mid && comparing) cellClasses += 'bg-var(--warning-color) text-white';
                        else cellClasses += 'bg-white';
                        return <div key={idx} className={cellClasses}>{num}</div>;
                    })}
                </div>
                <div className="relative h-6 w-full mt-1">
                    {left !== null && <div className="absolute text-green-600 font-bold" style={{left: `${left * 48 + 24}px`, transform: 'translateX(-50%)'}}>L</div>}
                    {right !== null && <div className="absolute text-red-600 font-bold" style={{left: `${right * 48 + 24}px`, transform: 'translateX(-50%)'}}>R</div>}
                </div>
            </div>
        </div>
    );
};

const BinarySearchInteractive = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [speed, setSpeed] = useState(1500);
    const [array, setArray] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
    const [target, setTarget] = useState(23);
    const [arrayInput, setArrayInput] = useState(array.join(', '));
    const [targetInput, setTargetInput] = useState(target.toString());

    const steps = useMemo(() => {
        const generatedSteps = [];
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
        if (l > r && (generatedSteps[generatedSteps.length - 1].foundIndex === -1)) {
            generatedSteps.push({ left: l, right: r, mid: null, foundIndex: -1, line: 11, description: `Search space exhausted. Target not found.`, comparing: false });
        }
        return generatedSteps;
    }, [array, target]);

    const currentStepData = steps[currentStep] || steps[0];
    const { left, right, mid, foundIndex, line, description, comparing } = currentStepData;

    useEffect(() => {
        let interval;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => setCurrentStep(prev => prev + 1), speed);
        } else if (currentStep >= steps.length - 1) setIsPlaying(false);
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, speed, steps.length]);

    const reset = () => { setIsPlaying(false); setCurrentStep(0); };
    const goToStep = (step) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    const getCodeLines = (vars) => {
        const { left, right, mid, target } = vars;
        const Var = ({val}) => <span className="text-var(--highlight-primary) font-bold">{val}</span>;
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

    const StackCard = ({ variables }) => (
        <div className="bg-var(--bg-primary) h-full">
            <div className="flex items-center justify-between p-2 border-b-2 border-var(--border-color)">
                <span className="font-bold uppercase flex items-center gap-2"><Cpu size={16}/> Stack Card</span>
            </div>
            <div className="p-4 space-y-1 text-sm">
                <p>target: <span className="font-bold text-var(--highlight-primary)">{variables.target}</span></p>
                <p>left: <span className="font-bold text-var(--highlight-primary)">{variables.left}</span></p>
                <p>right: <span className="font-bold text-var(--highlight-primary)">{variables.right}</span></p>
                <p>mid: <span className="font-bold text-var(--highlight-primary)">{variables.mid ?? 'null'}</span></p>
            </div>
        </div>
    );
    
    return (
        <div className="my-8 retro-border p-4">
            <div>
                <h3 className="font-bold text-lg uppercase">Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <input type="text" value={arrayInput} onChange={e => setArrayInput(e.target.value)} onBlur={() => { setArray(arrayInput.split(',').map(Number).filter(n => !isNaN(n)).sort((a,b)=>a-b)); reset(); }} className="w-full bg-var(--bg-primary) retro-border p-2 font-mono text-sm" placeholder="Comma-separated numbers..." />
                    <input type="text" value={targetInput} onChange={e => setTargetInput(e.target.value)} onBlur={() => { setTarget(Number(targetInput)); reset(); }} className="w-full bg-var(--bg-primary) retro-border p-2 font-mono text-sm" placeholder="Target value..." />
                </div>
            </div>
            <div className="mt-6">
                <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
                <BinarySearchVisualization array={array} left={left} right={right} mid={mid} foundIndex={foundIndex} comparing={comparing} />
            </div>
            <div className="mt-6 flex retro-border">
                <div className="w-4/5">
                    <RetroCodeBlock title="Execution" highlightLines={[line]}>{getCodeLines({left, right, mid, target})}</RetroCodeBlock>
                </div>
                <div className="w-1/5 border-l-2 border-var(--border-color)">
                    <StackCard variables={{left, right, mid, target}}/>
                </div>
            </div>
            <div className="mt-6 retro-border p-4 bg-var(--bg-secondary)">
                <h3 className="font-bold text-lg uppercase mb-2">Explanation</h3>
                <p className="font-serif text-lg">{description}</p>
            </div>
            <Controls isPlaying={isPlaying} isFinished={isFinished} onPlayPause={() => setIsPlaying(!isPlaying)} onReset={reset} onStepBack={() => goToStep(currentStep - 1)} onStepForward={() => goToStep(currentStep + 1)} onSpeedChange={setSpeed} speed={speed} currentStep={currentStep} totalSteps={steps.length} />
        </div>
    );
};

export const BinarySearchContent = ({ topic }) => (
    <>
        <SectionHeading title="01. Binary Search" id="introduction" icon={Lightbulb} />
        <Prose>
             <p>Binary search is a quintessential divide-and-conquer algorithm. Its efficiency makes it a cornerstone of computer science, ideal for rapidly locating an element within a <strong>sorted</strong> array. The core principle is to eliminate half of the remaining search space with each comparison.</p>
        </Prose>
        <DefinitionBox>
            An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.
        </DefinitionBox>
        <SectionHeading title="Algorithm + Visualization" id="interactive-demo" icon={Beaker} />
        <BinarySearchInteractive />
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <ComplexityBox
            time={<ul className="list-disc pl-5"><li>Best Case: O(1)</li><li>Average Case: O(log n)</li><li>Worst Case: O(log n)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(1) (Iterative)</li></ul>}
            recurrence="T(n) = T(n/2) + O(1)"
            theorem="Using Master's Theorem case 2, where a=1, b=2, and f(n)=O(1), the time complexity is O(log n)."
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 51}, (_, i) => ({ n: i * 20, 'Linear O(n)': i * 20, 'Binary O(log n)': i * 20 > 0 ? Math.log2(i * 20) : 0 })), [])}
            lines={[ { dataKey: 'Linear O(n)', name: 'Linear Search', color: '#DC2626' }, { dataKey: 'Binary O(log n)', name: 'Binary Search', color: 'var(--success-color)' } ]}
            title="Search Algorithm Comparison" subtitle="Time complexity growth: Linear vs. Logarithmic" inputLabel="Array Size (n)"
        />
        <SectionHeading title="Applications" id="use-cases" icon={Target} />
        <ApplicationsBox items={[
            "Searching for a word in a dictionary.",
            "Finding a specific commit in a Git history (git bisect).",
            "Used in debugging to find the point where a bug was introduced.",
            "Common interview questions like 'Find first or last occurrence of a number'."
        ]}/>
        <SectionHeading title="Disadvantages" id="disadvantages" icon={AlertTriangle} />
        <DisadvantagesBox items={[
            "The primary drawback is that the data structure <strong>must be sorted</strong>.",
            "Not efficient for data structures that have slow random access, like linked lists.",
            "Frequent insertions or deletions are costly as they may require re-sorting the array."
        ]}/>
    </>
);
