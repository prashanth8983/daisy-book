import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, CheckCircle, XCircle, Beaker, BarChart3, ArrowLeft, ChevronsRight, Lightbulb, Code2, AlertTriangle, Menu, X, BookMarked, PenTool, Hash, Zap, Brain, Target, Cpu, ExternalLink, Minimize } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

// --- Data for Topics ---
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

// --- Global Styles & Fonts ---
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        :root {
            --bg-primary: #f7f3e3;
            --bg-secondary: #f5f1e8;
            --text-primary: #2d2d2d;
            --text-secondary: #5a4a3a;
            --text-accent: #8b7355;
            --border-color: #2d2d2d;
            --highlight-primary: #c9302c; /* Classic Red */
            --highlight-secondary: #d9534f;
            --highlight-code-bg: #dbe4f0; 
            --control-color: #005A9C; /* Deep Blue for controls */
            --control-highlight-color: #337ab7;
            --success-color: #5cb85c;
            --warning-color: #f0ad4e;
            --info-color: #5bc0de;
            --shadow-color: rgba(44, 24, 16, 0.1);
        }
        
        * {
            box-sizing: border-box;
        }
        
        body {
            background-color: var(--bg-primary);
            color: var(--text-primary);
            font-family: 'JetBrains Mono', monospace;
            line-height: 1.6;
            font-size: 16px;
        }
        
        .font-serif {
            font-family: 'Crimson Text', Georgia, serif;
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
        }
        
        .retro-border {
            border: 2px solid var(--border-color);
            box-shadow: 4px 4px 0 0 var(--border-color);
        }
    `}</style>
);

// --- Reusable UI Components ---

const SectionHeading = ({ title, id, icon: Icon }) => (
  <div id={id} className="pt-16 mb-6">
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

const DefinitionBox = ({ children }) => (
    <div className="my-8 p-6 retro-border bg-[var(--bg-secondary)] animate-fadeIn">
        <h3 className="font-bold text-xl mb-2 font-serif flex items-center gap-3">
            <BookMarked className="w-6 h-6 text-[var(--highlight-primary)]" />
            Definition
        </h3>
        <blockquote className="border-l-4 border-[var(--highlight-primary)] pl-4 italic text-[var(--text-secondary)] text-lg font-serif">
            {children}
        </blockquote>
    </div>
);

const ComplexityBox = ({ time, space, recurrence, theorem }) => (
    <div className="my-8 retro-border p-6 bg-[var(--bg-secondary)] animate-fadeIn">
         <h3 className="font-bold text-xl mb-4 font-serif flex items-center gap-3">
            <Brain className="w-6 h-6 text-[var(--highlight-primary)]" />
            Complexity Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif text-lg">
            <div>
                <h4 className="font-bold">Time Complexity</h4>
                {time}
            </div>
             <div>
                <h4 className="font-bold">Space Complexity</h4>
                {space}
            </div>
        </div>
        {recurrence && (
            <div className="mt-4">
                 <h4 className="font-bold font-serif">Recurrence Relation</h4>
                 <p className="font-mono text-lg bg-var(--bg-primary) p-2 retro-border mt-2 inline-block">{recurrence}</p>
            </div>
        )}
        {theorem && (
             <div className="mt-4">
                 <h4 className="font-bold font-serif">Master's Theorem</h4>
                 <p className="font-serif text-lg mt-2">{theorem}</p>
            </div>
        )}
    </div>
);

const ApplicationsBox = ({ items }) => (
     <div className="my-8 retro-border p-6 bg-[var(--bg-secondary)] animate-fadeIn">
        <h3 className="font-bold text-xl mb-4 font-serif flex items-center gap-3">
            <Target className="w-6 h-6 text-[var(--highlight-primary)]" />
            Applications & Usage
        </h3>
        <ul className="list-disc pl-6 space-y-2 font-serif text-lg">
            {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
        </ul>
    </div>
);

const DisadvantagesBox = ({ items }) => (
    <div className="my-8 retro-border p-6 bg-[var(--bg-secondary)] animate-fadeIn">
        <h3 className="font-bold text-xl mb-4 font-serif flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-[var(--highlight-primary)]" />
            Disadvantages
        </h3>
        <ul className="list-disc pl-6 space-y-2 font-serif text-lg">
            {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
        </ul>
    </div>
);


const RetroCodeBlock = ({ children, title = "Algorithm", language = "python", highlightLines = [] }) => {
    return (
        <div className="bg-var(--bg-primary) h-full">
            <div className="flex items-center justify-between p-2 border-b-2 border-var(--border-color)">
                <span className="font-bold uppercase flex items-center gap-2"><Code2 size={16}/> {title}</span>
                <span className="text-sm text-var(--text-accent) font-mono">{language}</span>
            </div>
            <div className="p-4 font-mono text-sm overflow-x-auto">
                <pre className="leading-relaxed">
                    {React.Children.map(children, (line, index) => {
                        const isHighlighted = highlightLines.includes(index + 1);
                        return (
                            <div key={index} className={`flex -mx-4 px-4 ${isHighlighted ? 'bg-[var(--highlight-code-bg)]' : ''}`}>
                                <span className="inline-block w-8 text-right mr-4 select-none text-var(--text-accent)">
                                    {index + 1}
                                </span>
                                <span className="text-var(--text-primary)">{line}</span>
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
                <button onClick={onPlayPause} className="px-4 py-2 bg-var(--control-color) text-white retro-border flex items-center gap-2 hover:bg-var(--control-highlight-color) transition-opacity disabled:opacity-50 font-bold" disabled={isFinished}>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <button onClick={onStepForward} disabled={isFinished} className="p-2 retro-border hover:bg-[var(--highlight-bg-color)] transition-colors disabled:opacity-50" title="Next Step"><SkipForward size={20} /></button>
            </div>
            <div className="flex items-center gap-3">
                <label className="text-sm font-bold uppercase">Speed</label>
                <input type="range" min="250" max="2500" value={2750 - speed} onChange={(e) => onSpeedChange(2750 - parseInt(e.target.value))} className="w-32 h-1 bg-var(--border-color) appearance-none cursor-pointer accent-var(--control-color)"/>
            </div>
        </div>
        <div className="mt-4 h-2 bg-var(--bg-secondary) border border-var(--border-color) p-0.5">
            <div className="h-full bg-var(--control-color) transition-all duration-300" style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }} />
        </div>
    </div>
);

const EnhancedChart = ({ data, lines, title, subtitle, inputLabel }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="retro-border p-3 bg-var(--bg-primary) shadow-lg">
                    <p className="font-bold text-sm">{`${inputLabel}: ${label}`}</p>
                    {payload.map((p, i) => (
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
                <h3 className="text-2xl font-bold font-serif">{title}</h3>
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


// --- Binary Search Components ---

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

const BinarySearchContent = ({ topic }) => (
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

const BubbleSortArrayCell = ({ num, index, isComparing, isSwapping, isSorted }) => {
    let cellClasses = 'w-12 h-12 flex items-center justify-center border-b-2 border-r-2 border-gray-400 text-2xl font-serif ';
    if (isSorted) cellClasses += 'bg-var(--success-color) text-white';
    else if (isSwapping) cellClasses += 'bg-var(--highlight-primary) text-white transform -translate-y-2';
    else if (isComparing) cellClasses += 'bg-var(--warning-color) text-white transform -translate-y-1';
    else cellClasses += 'bg-white';
    
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-var(--highlight-primary) h-6">{index}</div>
            <div className={cellClasses}>{num}</div>
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
        if (generatedSteps[generatedSteps.length - 1].sorted.length !== n) {
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

    const reset = () => { setIsPlaying(false); setCurrentStep(0); };
    const goToStep = (step) => { setIsPlaying(false); setCurrentStep(Math.max(0, Math.min(steps.length - 1, step))); };
    const isFinished = currentStep >= steps.length - 1;

    const getCodeLines = (vars) => {
        const { i, j } = vars;
        const Var = ({val}) => <span className="text-var(--highlight-primary) font-bold">{val}</span>;
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

    const StackCard = ({ variables }) => (
        <div className="bg-var(--bg-primary) h-full">
            <div className="flex items-center justify-between p-2 border-b-2 border-var(--border-color)">
                <span className="font-bold uppercase flex items-center gap-2"><Cpu size={16}/> Stack Card</span>
            </div>
            <div className="p-4 space-y-1 text-sm">
                <p>pass (i): <span className="font-bold text-var(--highlight-primary)">{variables.i ?? 'N/A'}</span></p>
                <p>comparison (j): <span className="font-bold text-var(--highlight-primary)">{variables.j ?? 'N/A'}</span></p>
            </div>
        </div>
    );

    return (
        <div className="my-8 retro-border p-4">
             <div>
                <h3 className="font-bold text-lg uppercase">Parameters</h3>
                <div className="mt-2">
                    <input type="text" value={arrayInput} onChange={e => setArrayInput(e.target.value)} onBlur={() => { setArray(arrayInput.split(',').map(Number).filter(n => !isNaN(n))); reset(); }} className="w-full bg-var(--bg-primary) retro-border p-2 font-mono text-sm" placeholder="Comma-separated numbers..." />
                </div>
            </div>
            <div className="mt-6">
                <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
                <div className="p-4 retro-border bg-var(--bg-secondary)">
                    <div className="flex justify-center border-l-2 border-t-2 border-gray-400">
                        {currentArray.map((num, idx) => <BubbleSortArrayCell key={`${idx}-${num}`} num={num} index={idx} isComparing={comparing.includes(idx)} isSwapping={swapping.includes(idx)} isSorted={sorted.includes(idx)} />)}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex retro-border">
                <div className="w-4/5">
                    <RetroCodeBlock title="Execution" highlightLines={[line]}>
                        {getCodeLines({ i, j })}
                    </RetroCodeBlock>
                </div>
                <div className="w-1/5 border-l-2 border-var(--border-color)">
                    <StackCard variables={{ i, j }}/>
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


const BubbleSortContent = ({ topic }) => (
    <>
        <SectionHeading title="02. Bubble Sort" id="introduction" icon={Lightbulb} />
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
        <EnhancedChart data={useMemo(() => Array.from({length: 51}, (_, i) => ({ n: i * 2, 'Bubble O(n²)': (i * 2)**2, 'Efficient O(n log n)': (i * 2) * Math.log2(i * 2) || 0 })), [])} lines={[{ dataKey: 'Bubble O(n²)', name: 'Bubble Sort', color: '#c9302c' }, { dataKey: 'Efficient O(n log n)', name: 'Efficient Sort', color: '#5cb85c' }]} title="Sorting Algorithm Comparison" subtitle="Time complexity growth: Quadratic vs. Log-linear" inputLabel="Array Size (n)" />
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

// --- Page and Layout Components ---

const HomePage = ({ onSelectTopic }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
        <header className="text-center retro-border p-8">
            <h1 className="text-5xl font-bold uppercase tracking-widest">Interactive Algorithms</h1>
            <p className="text-xl mt-2 font-serif text-var(--text-secondary)">A Visual Guide</p>
        </header>
        <main className="w-full max-w-4xl mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {algorithmTopics.map(topic => (
                    <button key={topic.id} onClick={() => onSelectTopic(topic)} className="retro-border p-6 text-left hover:bg-var(--bg-secondary) transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--border-color)] flex flex-col h-full">
                        <p className="font-bold text-var(--text-accent)">CHAPTER {topic.chapter}</p>
                        <h3 className="text-3xl font-bold text-var(--highlight-primary) my-2">{topic.title}</h3>
                        <p className="flex-grow font-serif text-var(--text-secondary)">{topic.description}</p>
                        <div className="mt-4 font-bold flex items-center text-var(--text-primary)">
                            <span>EXPLORE</span>
                            <ChevronsRight size={20} className="ml-2"/>
                        </div>
                    </button>
                ))}
            </div>
        </main>
    </div>
);

const TopicPage = ({ topic, onBackToHome }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex w-full">
            <aside className={`bg-var(--bg-secondary) border-r-2 border-var(--border-color) flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-0'} overflow-hidden`}>
                <div className="p-6 sticky top-0">
                     <button onClick={onBackToHome} className="flex items-center gap-2 font-bold mb-6 text-var(--text-secondary) hover:text-var(--text-primary)">
                        <ArrowLeft size={16} />
                        BACK
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-var(--highlight-primary)">{topic.title}</h2>
                    <nav>
                        <ul>
                            {topic.sections && topic.sections.map(section => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`} className="block w-full text-left py-2 px-3 hover:bg-var(--bg-accent) text-var(--text-secondary) hover:text-var(--text-primary) transition-colors rounded-md">
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            <div className="flex-1 relative">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="fixed top-4 left-4 z-20 p-2 retro-border bg-var(--bg-primary) hover:bg-var(--bg-secondary) transition-colors">
                    {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
                <main className="h-screen overflow-y-auto animate-fadeIn" style={{ scrollBehavior: 'smooth' }}>
                    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 relative">
                        {topic.content({ topic })}
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- Main App Component ---

const App = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    return (
        <div>
            <GlobalStyles />
            {!selectedTopic 
                ? <HomePage onSelectTopic={setSelectedTopic} />
                : <TopicPage topic={selectedTopic} onBackToHome={() => setSelectedTopic(null)} />
            }
        </div>
    );
};

export default App;
