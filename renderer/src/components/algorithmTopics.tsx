import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, CheckCircle, XCircle, Beaker, BarChart3, ArrowLeft, ChevronsRight, Lightbulb, Code2, AlertTriangle, Menu, X, BookMarked, PenTool, Hash, Zap, Brain, Target, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

// --- SectionHeading, Prose, RetroCodeBlock, Controls, EnhancedChart, BinarySearchArrayCell, BinarySearchInteractive ---
const SectionHeading = ({ title, id, icon: Icon }) => (
  <div id={id} className="pt-12 mb-6">
    <div className="flex items-center gap-4">
        {Icon && <Icon className="w-8 h-8 text-var(--text-primary)" />}
        <h2 className="text-3xl font-bold uppercase tracking-widest">{title}</h2>
    </div>
    <div className="w-full h-0.5 bg-var(--border-color) mt-3"></div>
  </div>
);

const Prose = ({ children, className = "" }) => (
    <div className={`prose max-w-none text-lg leading-relaxed animate-fadeIn font-serif ${className}`}>
        {children}
    </div>
);

const RetroCodeBlock = ({ children, title = "Algorithm", language = "python", highlightLines = [] }) => {
    return (
        <div className="my-6 retro-border bg-var(--bg-primary) animate-fadeIn">
            <div className="flex items-center justify-between p-2 border-b-2 border-var(--border-color)">
                <span className="font-bold uppercase flex items-center gap-2"><Code2 size={16}/> {title}</span>
                <span className="text-sm text-var(--text-accent) font-mono">{language}</span>
            </div>
            <div className="p-4 font-mono text-sm overflow-x-auto">
                <pre className="leading-relaxed">
                    {React.Children.map(children, (line, index) => {
                        const isHighlighted = highlightLines.includes(index + 1);
                        return (
                            <div key={index} className={`flex ${isHighlighted ? 'bg-var(--highlight-primary) text-white' : ''}`}>
                                <span className={`inline-block w-8 text-right mr-4 select-none ${isHighlighted ? 'text-white opacity-70' : 'text-var(--text-accent)'}`}>{index + 1}</span>
                                <span>{line}</span>
                            </div>
                        );
                    })}
                </pre>
            </div>
        </div>
    );
};

const Controls = ({ isPlaying, isFinished, onPlayPause, onReset, onStepBack, onStepForward, onSpeedChange, speed, currentStep, totalSteps }) => (
    <div className="my-6 retro-border p-4 animate-fadeIn">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <button onClick={onReset} className="p-2 retro-border hover:bg-[var(--highlight-bg-color)] transition-colors" title="Reset"><RotateCcw size={20} /></button>
                <button onClick={onStepBack} disabled={currentStep === 0} className="p-2 retro-border hover:bg-[var(--highlight-bg-color)] transition-colors disabled:opacity-50" title="Previous Step"><SkipBack size={20} /></button>
                <button onClick={onPlayPause} className="px-4 py-2 bg-var(--highlight-primary) text-white retro-border flex items-center gap-2 hover:opacity-80 transition-opacity disabled:opacity-50 font-bold" disabled={isFinished}>{isPlaying ? <Pause size={20} /> : <Play size={20} />}<span>{isPlaying ? 'PAUSE' : 'PLAY'}</span></button>
                <button onClick={onStepForward} disabled={isFinished} className="p-2 retro-border hover:bg-[var(--highlight-bg-color)] transition-colors disabled:opacity-50" title="Next Step"><SkipForward size={20} /></button>
            </div>
            <div className="flex items-center gap-3">
                <label className="text-sm font-bold uppercase">Speed</label>
                <input type="range" min="250" max="2500" value={2750 - speed} onChange={(e) => onSpeedChange(2750 - parseInt(e.target.value))} className="w-32 h-1 bg-var(--border-color) appearance-none cursor-pointer accent-var(--highlight-primary)"/>
            </div>
        </div>
        <div className="mt-4 h-2 bg-var(--bg-secondary) border border-var(--border-color) p-0.5">
            <div className="h-full bg-var(--highlight-primary) transition-all duration-300" style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }} />
        </div>
    </div>
);

const EnhancedChart = ({ data, lines, title, subtitle, inputLabel }) => {
    const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="retro-border p-3 bg-var(--bg-primary) shadow-lg">
                    <p className="font-bold text-sm">{`${inputLabel}: ${label}`}</p>
                    {payload.map((p: any, i: number) => (
                        <p key={i} className="text-sm" style={{color: p.color}}>{`${p.name}: ${p.value.toFixed(2)} ops`}</p>
                    ))}
                </div>
            );
        }
        return null;
    };
    return (
        <div className="my-6 retro-border p-6 animate-fadeIn">
            <div className="mb-4">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-var(--text-secondary) font-serif">{subtitle}</p>
            </div>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
                        <XAxis dataKey="n" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} stroke="var(--border-color)" label={{ value: inputLabel, position: 'insideBottom', offset: -15, fill: 'var(--text-primary)'}}/>
                        <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} stroke="var(--border-color)" label={{ value: 'Operations', angle: -90, position: 'insideLeft', fill: 'var(--text-primary)'}}/>
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--highlight-primary)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        {lines.map(line => (
                            <Line key={line.dataKey} type="monotone" dataKey={line.dataKey} name={line.name} stroke={line.color} strokeWidth={3} dot={false} activeDot={{ r: 6, fill: line.color }} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const BinarySearchArrayCell = ({ num, index, isLeft, isRight, isMid, isInBounds, isFound, isComparing }) => {
    let classes = 'w-16 h-16 flex flex-col items-center justify-center retro-border transition-all duration-300 ';
    if (isFound) classes += 'bg-var(--success-color) text-white transform scale-110';
    else if (isComparing) classes += 'bg-var(--warning-color) text-white transform scale-105';
    else if (isInBounds) classes += 'bg-var(--bg-secondary)';
    else classes += 'bg-var(--bg-accent) opacity-50';
    return (
        <div className="relative flex flex-col items-center flex-shrink-0 p-1 animate-fadeIn">
            <div className={classes}>
                <span className="text-2xl font-bold font-serif">{num}</span>
                <span className="text-xs font-mono opacity-75">[{index}]</span>
            </div>
            <div className="flex gap-1 mt-1 h-6">
                {isLeft && <span className="text-sm font-bold text-green-600">L</span>}
                {isMid && <span className="text-sm font-bold text-var(--warning-color)">M</span>}
                {isRight && <span className="text-sm font-bold text-red-600">R</span>}
            </div>
        </div>
    );
};

const BinarySearchInteractive = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [speed, setSpeed] = useState(1500);
    const [array, setArray] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
    const [target, setTarget] = useState<number>(23);
    const [arrayInput, setArrayInput] = useState(array.join(', '));
    const [targetInput, setTargetInput] = useState(target.toString());
    const steps = useMemo<any[]>(() => {
        const generatedSteps: any[] = [];
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
    return (
        <div className="my-8 retro-border p-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-lg uppercase">Parameters</h3>
                    <input type="text" value={arrayInput} onChange={e => setArrayInput(e.target.value)} onBlur={() => { setArray(arrayInput.split(',').map(Number).filter(n => !isNaN(n)).sort((a,b)=>a-b)); reset(); }} className="w-full bg-var(--bg-primary) retro-border p-2 font-mono text-sm" placeholder="Comma-separated numbers..." />
                    <input type="text" value={targetInput} onChange={e => setTargetInput(e.target.value)} onBlur={() => { setTarget(Number(targetInput)); reset(); }} className="w-full bg-var(--bg-primary) retro-border p-2 font-mono text-sm" placeholder="Target value..." />
                </div>
                <div className="lg:col-span-3">
                     <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
                    <div className="flex gap-2 p-4 retro-border bg-var(--bg-secondary) min-h-[120px] justify-center overflow-x-auto">
                        {array.map((num, idx) => <BinarySearchArrayCell key={idx} num={num} index={idx} isLeft={idx === left} isRight={idx === right} isMid={idx === mid} isInBounds={idx >= left && idx <= right} isFound={idx === foundIndex} isComparing={comparing && idx === mid} />)}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="font-bold text-lg uppercase mb-2">Execution</h3>
                <div className="retro-border p-4 bg-var(--bg-secondary)"><p className="font-serif text-lg">{description}</p></div>
            </div>
            <Controls isPlaying={isPlaying} isFinished={isFinished} onPlayPause={() => setIsPlaying(!isPlaying)} onReset={reset} onStepBack={() => goToStep(currentStep - 1)} onStepForward={() => goToStep(currentStep + 1)} onSpeedChange={setSpeed} speed={speed} currentStep={currentStep} totalSteps={steps.length} />
        </div>
    );
};

const BubbleSortInteractive = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [speed, setSpeed] = useState(1500);
    const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
    const [arrayInput, setArrayInput] = useState(array.join(', '));
    const steps = useMemo<any[]>(() => {
        const generatedSteps: any[] = [];
        let arr = [...array];
        let n = arr.length;
        generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], line: 1, description: "Initial unsorted array." });
        for (let i = 0; i < n - 1; i++) {
            let hasSwapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                generatedSteps.push({ array: [...arr], comparing: [j, j + 1], swapping: [], sorted: Array.from({length: i}, (_, k) => n - 1 - k), line: 5, description: `Comparing arr[${j}] (${arr[j]}) and arr[${j+1}] (${arr[j+1]})` });
                if (arr[j] > arr[j + 1]) {
                    hasSwapped = true;
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    generatedSteps.push({ array: [...arr], comparing: [j, j+1], swapping: [j, j+1], sorted: Array.from({length: i}, (_, k) => n - 1 - k), line: 6, description: `Swapping ${arr[j+1]} and ${arr[j]}.` });
                }
            }
            if (!hasSwapped) {
                generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({length: n}, (_,k)=>k), line: 10, description: `No swaps in this pass. Array is sorted.` });
                break;
            }
        }
        if (generatedSteps[generatedSteps.length - 1].sorted.length !== n) {
            generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({length: n}, (_,k)=>k), line: 1, description: 'Array is sorted.' });
        }
        return generatedSteps;
    }, [array]);
    const currentStepData = steps[currentStep] || steps[0];
    const { array: currentArray, comparing, swapping, sorted, line, description } = currentStepData;
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
    return (
        <div className="my-8 retro-border p-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-lg uppercase">Parameters</h3>
                    <input type="text" value={arrayInput} onChange={e => setArrayInput(e.target.value)} onBlur={() => { setArray(arrayInput.split(',').map(Number).filter(n => !isNaN(n)).sort((a,b)=>a-b)); reset(); }} className="w-full bg-var(--bg-primary) retro-border p-2 font-mono text-sm" placeholder="Comma-separated numbers..." />
                </div>
                <div className="lg:col-span-3">
                     <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
                    <div className="flex gap-2 p-4 retro-border bg-var(--bg-secondary) min-h-[120px] justify-center overflow-x-auto">
                        {currentArray.map((num, idx) => (
                            <BinarySearchArrayCell
                                key={idx}
                                num={num}
                                index={idx}
                                isLeft={comparing.includes(idx) && comparing[0] === idx}
                                isRight={comparing.includes(idx) && comparing[1] === idx}
                                isMid={swapping.includes(idx)}
                                isInBounds={idx >= 0 && idx < currentArray.length}
                                isFound={sorted.includes(idx)}
                                isComparing={comparing.includes(idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="font-bold text-lg uppercase mb-2">Execution</h3>
                <div className="retro-border p-4 bg-var(--bg-secondary)"><p className="font-serif text-lg">{description}</p></div>
            </div>
            <Controls isPlaying={isPlaying} isFinished={isFinished} onPlayPause={() => setIsPlaying(!isPlaying)} onReset={reset} onStepBack={() => goToStep(currentStep - 1)} onStepForward={() => goToStep(currentStep + 1)} onSpeedChange={setSpeed} speed={speed} currentStep={currentStep} totalSteps={steps.length} />
        </div>
    );
};

const BinarySearchContent = ({ topic }) => (
    <>
        <SectionHeading title="Introduction" id="introduction" icon={Lightbulb} />
        <Prose>
             <p>Binary search is a quintessential divide-and-conquer algorithm. Its efficiency makes it a cornerstone of computer science, ideal for rapidly locating an element within a <strong>sorted</strong> array. The core principle is to eliminate half of the remaining search space with each comparison.</p>
        </Prose>
        <SectionHeading title="Interactive Demo" id="interactive-demo" icon={Beaker} />
        <BinarySearchInteractive />
        <SectionHeading title="The Algorithm" id="algorithm" icon={Code2} />
        <RetroCodeBlock highlightLines={[]}>
            {[
                'def binary_search(arr, target):',
                '    left, right = 0, len(arr) - 1',
                '    while left <= right:',
                '        mid = (left + right) // 2',
                '        if arr[mid] == target:',
                '            return mid',
                '        elif arr[mid] < target:',
                '            left = mid + 1',
                '        else:',
                '            right = mid - 1',
                '    return -1'
            ]}
        </RetroCodeBlock>
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 51}, (_, i) => ({ n: i * 20, 'Linear O(n)': i * 20, 'Binary O(log n)': i * 20 > 0 ? Math.log2(i * 20) : 0 })), [])}
            lines={[ { dataKey: 'Linear O(n)', name: 'Linear Search', color: '#c9302c' }, { dataKey: 'Binary O(log n)', name: 'Binary Search', color: 'var(--highlight-primary)' } ]}
            title="Search Algorithm Comparison" subtitle="Time complexity growth: Linear vs. Logarithmic" inputLabel="Array Size (n)"
        />
        <SectionHeading title="Use Cases & Limitations" id="use-cases" icon={AlertTriangle} />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="retro-border p-6 bg-var(--bg-secondary)"><h3 className="font-bold text-xl mb-4 text-var(--success-color)">Advantages</h3><ul className="space-y-2 font-serif"><li>Efficient on large, sorted arrays.</li><li>Simple iterative implementation.</li></ul></div>
            <div className="retro-border p-6 bg-var(--bg-secondary)"><h3 className="font-bold text-xl mb-4 text-var(--highlight-primary)">Limitations</h3><ul className="space-y-2 font-serif"><li>Array must be sorted.</li><li>Inefficient for frequently modified data.</li></ul></div>
        </div>
    </>
);

const BubbleSortContent = ({ topic }) => (
    <>
        <SectionHeading title="Introduction" id="introduction" icon={Lightbulb} />
        <Prose>
            <p>Bubble Sort is a simple sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass is repeated until the list is sorted. It's named for the way elements "bubble" to their correct positions.</p>
        </Prose>
        <SectionHeading title="Interactive Demo" id="interactive-demo" icon={Beaker} />
        <BubbleSortInteractive />
        <SectionHeading title="The Algorithm" id="algorithm" icon={Code2} />
        <RetroCodeBlock>{['def bubble_sort(arr):', '    n = len(arr)', '    for i in range(n):', '        for j in range(0, n - i - 1):', '            if arr[j] > arr[j + 1]:', '                arr[j], arr[j + 1] = arr[j + 1], arr[j]']}</RetroCodeBlock>
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <EnhancedChart data={useMemo(() => Array.from({length: 51}, (_, i) => ({ n: i * 2, 'Bubble O(n²)': (i * 2)**2, 'Efficient O(n log n)': (i * 2) * Math.log2(i * 2) || 0 })), [])} lines={[{ dataKey: 'Bubble O(n²)', name: 'Bubble Sort', color: '#c9302c' }, { dataKey: 'Efficient O(n log n)', name: 'Efficient Sort', color: 'var(--highlight-primary)' }]} title="Sorting Algorithm Comparison" subtitle="Time complexity growth: Quadratic vs. Log-linear" inputLabel="Array Size (n)" />
        <SectionHeading title="Use Cases & Limitations" id="use-cases" icon={AlertTriangle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="retro-border p-6 bg-var(--bg-secondary)"><h3 className="font-bold text-xl mb-4 text-var(--success-color)">Advantages</h3><ul className="space-y-2 font-serif"><li>Simple to understand.</li><li>No extra space needed.</li></ul></div>
            <div className="retro-border p-6 bg-var(--bg-secondary)"><h3 className="font-bold text-xl mb-4 text-var(--highlight-primary)">Limitations</h3><ul className="space-y-2 font-serif"><li>Very inefficient (O(n²)).</li><li>Not practical for large lists.</li></ul></div>
        </div>
    </>
);

// --- algorithmTopics array ---
const algorithmTopics = [
    {
        id: 'binary-search',
        chapter: '3.1',
        title: 'Binary Search',
        tags: ['🧠 Divide & Conquer', '🔍 Search'],
        description: 'A fast search algorithm that finds an element in a sorted array by repeatedly dividing the search interval in half.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'interactive-demo', title: 'Algorithm + Visualization' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <BinarySearchContent {...props} />
    },
    {
        id: 'bubble-sort',
        chapter: '4.1',
        title: 'Bubble Sort',
        tags: ['🔁 Comparison Sort', '🐌 Inefficient'],
        description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
        sections: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'interactive-demo', title: 'Algorithm + Visualization' },
            { id: 'complexity-analysis', title: 'Complexity Analysis' },
            { id: 'use-cases', title: 'Applications' },
            { id: 'disadvantages', title: 'Disadvantages' }
        ],
        content: (props) => <BubbleSortContent {...props} />
    }
];

export { algorithmTopics }; 