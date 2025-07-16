import React, { useState, useMemo } from 'react';
import { ChevronsRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme';
import { algorithmTopics } from './algorithmTopics';



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
    <div className="my-6 p-4 animate-fadeIn">
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
            <React.Fragment key="line4">        mid:<Var val={mid ?? '?'}/> = (left + right) // 2</React.Fragment>,
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

// --- Page and Layout Components ---

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme} className="p-2 retro-border bg-var(--bg-primary) hover:bg-var(--bg-secondary) transition-colors">
            {theme === 'light' ? <Moon size={24}/> : <Sun size={24}/>}
        </button>
    );
}

export const HomePage = ({ onSelectTopic }) => (
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

