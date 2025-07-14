import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, CheckCircle, XCircle, Beaker, BarChart3, ArrowLeft, ChevronsRight, Lightbulb, Code2, AlertTriangle, Menu, X, BookMarked, PenTool, Hash, Zap, Brain, Target, Cpu, ExternalLink, Minimize, ArrowDown, Sun, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

// --- Binary Search Components ---

const BinarySearchVisualization = ({ array, left, right, mid, foundIndex, comparing, onUpdateArray }) => {
    const handleValueChange = (e, index, delta) => {
        e.preventDefault();
        const newArray = [...array];
        newArray[index] = Math.max(0, newArray[index] + delta);
        onUpdateArray(newArray.sort((a,b) => a - b));
    };

    return (
        <div className="relative inline-flex flex-col items-center">
            <div className="flex pl-12">
                {array.map((num, idx) => (
                    <div key={idx} className="w-12 text-center text-sm text-var(--text-secondary)">{idx}</div>
                ))}
            </div>
            <div className="flex items-center">
                <div className="flex flex-col items-center mr-2">
                    <ArrowDown size={16}/>
                    <span className="font-serif text-2xl">arr:</span>
                </div>
                <div className="flex border-t-2 border-l-2 border-gray-400">
                    {array.map((num, idx) => {
                        let cellClasses = 'w-12 h-12 flex items-center justify-center border-b-2 border-r-2 border-gray-400 text-2xl font-serif cursor-pointer ';
                        if (idx === foundIndex) cellClasses += 'bg-var(--success-color) text-white';
                        else if (idx === mid && comparing) cellClasses += 'bg-var(--warning-color) text-white';
                        else cellClasses += 'bg-white';
                        return <div key={`${idx}-${num}`} className={cellClasses} onClick={(e) => handleValueChange(e, idx, 1)} onContextMenu={(e) => handleValueChange(e, idx, -1)}>{num}</div>;
                    })}
                </div>
            </div>
            <div className="relative h-6 w-full mt-1 pl-12">
                {left !== null && <div className="absolute text-green-600 font-bold" style={{left: `${left * 48 + 24}px`, transform: 'translateX(-50%)'}}>L</div>}
                {right !== null && <div className="absolute text-red-600 font-bold" style={{left: `${right * 48 + 24}px`, transform: 'translateX(-50%)'}}>R</div>}
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
        if (l > r && (generatedSteps.length === 0 || generatedSteps[generatedSteps.length - 1].foundIndex === -1)) {
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
        <div className="my-8">
            <div className="p-4 retro-border bg-var(--bg-secondary) flex justify-between items-end">
                <div className="overflow-x-auto">
                    <BinarySearchVisualization array={array} left={left} right={right} mid={mid} foundIndex={foundIndex} comparing={comparing} onUpdateArray={setArray} />
                </div>
                <div className="text-right ml-8">
                    <label className="block text-sm font-bold uppercase tracking-wide mb-1">Target Value</label>
                    <input type="text" value={targetInput} onChange={e => setTargetInput(e.target.value)} onBlur={() => { setTarget(Number(targetInput)); reset(); }} className="w-32 bg-var(--bg-primary) retro-border p-2 font-mono text-sm text-center" placeholder="Target..." />
                </div>
            </div>
            
            <div className="mt-6 flex retro-border">
                <div className="w-4/5">
                    <RetroCodeBlock title="Execution" highlightLines={[line]}>{getCodeLines({left, right, mid, target})}</RetroCodeBlock>
                </div>
                <div className="w-1/5 border-l-2 border-var(--border-color)">
                    <StackCard variables={{left, right, mid, target}}/>
                </div>
            </div>
             <div className="retro-border mt-[-2px] border-t-0">
                <Controls isPlaying={isPlaying} isFinished={isFinished} onPlayPause={() => setIsPlaying(!isPlaying)} onReset={reset} onStepBack={() => goToStep(currentStep - 1)} onStepForward={() => goToStep(currentStep + 1)} onSpeedChange={setSpeed} speed={speed} currentStep={currentStep} totalSteps={steps.length} />
            </div>
            <div className="mt-6 retro-border p-4 bg-var(--bg-secondary)">
                <h3 className="font-bold text-lg uppercase mb-2">Explanation</h3>
                <p className="font-serif text-lg">{description}</p>
            </div>
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

const BubbleSortArrayCell = ({ num, index, isComparing, isSwapping, isSorted, onUpdate }) => {
    let cellClasses = 'w-12 h-12 flex items-center justify-center border-b-2 border-r-2 border-gray-400 text-2xl font-serif cursor-pointer ';
    if (isSorted) cellClasses += 'bg-var(--success-color) text-white';
    else if (isSwapping) cellClasses += 'bg-var(--highlight-primary) text-white transform -translate-y-2';
    else if (isComparing) cellClasses += 'bg-var(--warning-color) text-white transform -translate-y-1';
    else cellClasses += 'bg-white';

    const handleClick = (e) => {
        e.preventDefault();
        if (e.type === 'click') { // left click
            onUpdate(index, num + 1);
        } else if (e.type === 'contextmenu') { // right click
            onUpdate(index, num - 1);
        }
    };
    
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-var(--highlight-primary) h-6">{index}</div>
            <div className={cellClasses} onClick={handleClick} onContextMenu={handleClick}>{num}</div>
        </div>
    );
};

const BubbleSortInteractive = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [speed, setSpeed] = useState(1000);
    const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
    const [arrayInput, setArrayInput] = useState(array.join(', '));

    const handleArrayUpdate = (index, newValue) => {
        const newArray = [...array];
        newArray[index] = Math.max(0, newValue);
        setArray(newArray);
        reset();
    }

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
        if (generatedSteps.length > 0 && generatedSteps[generatedSteps.length - 1].sorted.length !== n) {
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
        <div className="my-8">
            <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
            <div className="p-4 retro-border bg-var(--bg-secondary)">
                <p className="text-center text-sm mb-2 text-var(--text-accent)">Left-click to increase value, Right-click to decrease.</p>
                <div className="flex justify-center border-l-2 border-t-2 border-gray-400">
                    {currentArray.map((num, idx) => <BubbleSortArrayCell key={`${idx}-${num}`} num={num} index={idx} onUpdate={handleArrayUpdate} isComparing={comparing.includes(idx)} isSwapping={swapping.includes(idx)} isSorted={sorted.includes(idx)} />)}
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
             <div className="retro-border mt-[-2px] border-t-0">
                <Controls isPlaying={isPlaying} isFinished={isFinished} onPlayPause={() => setIsPlaying(!isPlaying)} onReset={reset} onStepBack={() => goToStep(currentStep - 1)} onStepForward={() => goToStep(currentStep + 1)} onSpeedChange={setSpeed} speed={speed} currentStep={currentStep} totalSteps={steps.length} />
            </div>
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

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme} className="p-2 retro-border bg-var(--bg-primary) hover:bg-var(--bg-secondary) transition-colors">
            {theme === 'light' ? <Moon size={24}/> : <Sun size={24}/>}
        </button>
    );
}

const HomePage = ({ onSelectTopic }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
        <div className="absolute top-4 right-4">
            <ThemeToggle />
        </div>
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
                <div className="fixed top-4 right-4 z-20">
                    <ThemeToggle />
                </div>
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
    return (
        <ThemeProvider>
            <GlobalStyles />
            <MainContent />
        </ThemeProvider>
    );
};

const MainContent = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    return !selectedTopic 
        ? <HomePage onSelectTopic={setSelectedTopic} />
        : <TopicPage topic={selectedTopic} onBackToHome={() => setSelectedTopic(null)} />
}

export default App;