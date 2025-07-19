import React, { useState, useMemo, useEffect } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from '../ui';

const HeapArrayCell = ({ num, index, isComparing, isSwapping, isSorted, onUpdate }) => {
    const [inputValue, setInputValue] = useState(num);

    useEffect(() => {
        setInputValue(num);
    }, [num]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        const newValue = parseInt(inputValue, 10);
        if (!isNaN(newValue)) {
            onUpdate(index, newValue);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };

    let cellClasses = 'w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out transform ';
    if (isSorted) cellClasses += 'bg-gradient-to-br from-green-400 to-blue-500 text-white scale-110';
    else if (isSwapping) cellClasses += 'bg-gradient-to-br from-purple-400 to-pink-500 text-white -translate-y-2 scale-110';
    else if (isComparing) cellClasses += 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white scale-105';
    else cellClasses += 'bg-white';

    return (
        <div className="flex flex-col items-center m-1">
            <div className="text-sm text-gray-500 h-6">{index}</div>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                onBlur={handleInputBlur}
                onKeyPress={handleKeyPress}
                className={`${cellClasses} text-center`}
            />
        </div>
    );
};

const HeapTree = ({ heap, comparing, swapping, sorted }) => {
    if (heap.length === 0) return null;

    const nodes = heap.map((value, index) => ({ id: index, value, comparing: comparing.includes(index), swapping: swapping.includes(index), sorted: sorted.includes(index) }));
    const edges = [];
    for (let i = 0; i < heap.length; i++) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < heap.length) edges.push({ from: i, to: left });
        if (right < heap.length) edges.push({ from: i, to: right });
    }

    const maxDepth = Math.floor(Math.log2(heap.length));
    const width = Math.max(600, 2**(maxDepth) * 80);
    const height = (maxDepth + 1) * 100;

    const getNodePosition = (index) => {
        const level = Math.floor(Math.log2(index + 1));
        const indexInLevel = index - (2**level - 1);
        const y = 50 + level * 100;
        const totalNodesInLevel = 2**level;
        const x = (width / (totalNodesInLevel + 1)) * (indexInLevel + 1);
        return { x, y };
    };

    return (
        <svg width={width} height={height} className="bg-gray-50 rounded-lg shadow-inner p-4 mx-auto">
            {edges.map((edge, i) => {
                const fromPos = getNodePosition(edge.from);
                const toPos = getNodePosition(edge.to);
                return <line key={i} x1={fromPos.x} y1={fromPos.y} x2={toPos.x} y2={toPos.y} stroke="#cbd5e1" strokeWidth="3" />;
            })}
            {nodes.map(node => {
                const { x, y } = getNodePosition(node.id);
                let fill = 'url(#white-gradient)';
                if (node.sorted) fill = 'url(#sorted-gradient)';
                else if (node.swapping) fill = 'url(#swapping-gradient)';
                else if (node.comparing) fill = 'url(#comparing-gradient)';
                
                return (
                    <g key={node.id} transform={`translate(${x},${y})`} style={{ transition: 'transform 0.5s ease-in-out' }}>
                        <defs>
                            <linearGradient id="white-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{stopColor: '#f3f4f6'}} />
                                <stop offset="100%" style={{stopColor: '#e5e7eb'}} />
                            </linearGradient>
                            <linearGradient id="sorted-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{stopColor: '#4ade80'}} />
                                <stop offset="100%" style={{stopColor: '#3b82f6'}} />
                            </linearGradient>
                            <linearGradient id="swapping-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{stopColor: '#a78bfa'}} />
                                <stop offset="100%" style={{stopColor: '#f472b6'}} />
                            </linearGradient>
                            <linearGradient id="comparing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{stopColor: '#facc15'}} />
                                <stop offset="100%" style={{stopColor: '#f97316'}} />
                            </linearGradient>
                        </defs>
                        <circle cx="0" cy="0" r="25" fill={fill} stroke="#94a3b8" strokeWidth="2" className="shadow-lg" />
                        <text x="0" y="8" textAnchor="middle" fill={node.sorted || node.swapping || node.comparing ? 'white' : 'black'} fontSize="20" fontWeight="bold">{node.value}</text>
                    </g>
                );
            })}
        </svg>
    );
};


const HeapInteractive = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [speed, setSpeed] = useState(1000);
    const [array, setArray] = useState([4, 10, 3, 5, 1]);
    const [arrayInput, setArrayInput] = useState(array.join(', '));
    const [operation, setOperation] = useState('heapify'); // heapify, insert, delete, sort

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

        const heapify = (arr, n, i) => {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            
            generatedSteps.push({ array: [...arr], comparing: [i, left, right].filter(x => x < n), swapping: [], sorted: [], line: 2, description: `Heapifying subtree rooted at index ${i}. Comparing with children.` });

            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }
            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }
            if (largest !== i) {
                generatedSteps.push({ array: [...arr], comparing: [i, largest], swapping: [i, largest], sorted: [], line: 7, description: `Swapping ${arr[i]} and ${arr[largest]}.` });
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], line: 8, description: `Recursively heapify the affected sub-tree.` });
                heapify(arr, n, largest);
            }
        };
        
        if (operation === 'heapify') {
            generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], line: 1, description: "Initial array. Building max heap." });
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                heapify(arr, n, i);
            }
            generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], line: 1, description: "Heap construction complete." });
        } else if (operation === 'sort') {
            // Build heap first
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                heapify(arr, n, i);
            }
            generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], line: 10, description: "Max heap built. Starting Heap Sort." });

            for (let i = n - 1; i > 0; i--) {
                generatedSteps.push({ array: [...arr], comparing: [0, i], swapping: [0, i], sorted: Array.from({length: n-1-i}, (_,k) => n-1-k), line: 12, description: `Swap root ${arr[0]} with last element ${arr[i]}.` });
                [arr[0], arr[i]] = [arr[i], arr[0]];
                generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({length: n-i}, (_,k) => n-1-k), line: 13, description: `Heapify root element to maintain heap property on reduced heap.` });
                heapify(arr, i, 0);
            }
            generatedSteps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({length: n}, (_,k)=>k), line: 1, description: "Array is sorted." });
        }

        return generatedSteps;
    }, [array, operation]);

    const currentStepData = steps[currentStep] || steps[0];
    const { array: currentArray, comparing, swapping, sorted, line, description } = currentStepData || {};

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

    const getCodeLines = () => {
        return [
            <React.Fragment key="line1">def heapify(arr, n, i):</React.Fragment>,
            <React.Fragment key="line2">    largest = i</React.Fragment>,
            <React.Fragment key="line3">    left = 2 * i + 1</React.Fragment>,
            <React.Fragment key="line4">    right = 2 * i + 2</React.Fragment>,
            <React.Fragment key="line5">    if left &lt; n and arr[left] &gt; arr[largest]: largest = left</React.Fragment>,
            <React.Fragment key="line6">    if right &lt; n and arr[right] &gt; arr[largest]: largest = right</React.Fragment>,
            <React.Fragment key="line7">    if largest != i:</React.Fragment>,
            <React.Fragment key="line8">        arr[i], arr[largest] = arr[largest], arr[i]</React.Fragment>,
            <React.Fragment key="line9">        heapify(arr, n, largest)</React.Fragment>,
            <React.Fragment key="line10">def heap_sort(arr):</React.Fragment>,
            <React.Fragment key="line11">    n = len(arr)</React.Fragment>,
            <React.Fragment key="line12">    for i in range(n // 2 - 1, -1, -1): heapify(arr, n, i)</React.Fragment>,
            <React.Fragment key="line13">    for i in range(n - 1, 0, -1):</React.Fragment>,
            <React.Fragment key="line14">        arr[i], arr[0] = arr[0], arr[i]</React.Fragment>,
            <React.Fragment key="line15">        heapify(arr, i, 0)</React.Fragment>,
        ];
    };

    return (
        <div className="my-8">
            <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
            <div className="flex justify-center mb-4 space-x-2">
                <button onClick={() => { setOperation('heapify'); reset(); }} className={`px-4 py-2 retro-border ${operation === 'heapify' ? 'bg-var(--highlight-primary) text-white' : 'bg-white'}`}>Heapify</button>
                <button onClick={() => { setOperation('sort'); reset(); }} className={`px-4 py-2 retro-border ${operation === 'sort' ? 'bg-var(--highlight-primary) text-white' : 'bg-white'}`}>Heap Sort</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-bold text-center uppercase mb-2">Tree Representation</h4>
                    <div className="overflow-x-auto">
                        <HeapTree heap={currentArray} comparing={comparing} swapping={swapping} sorted={sorted} />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-center uppercase mb-2">Array Representation</h4>
                    <div className="p-4 retro-border bg-var(--bg-secondary)">
                        <p className="text-center text-sm mb-2 text-var(--text-accent)">Left-click to increase, Right-click to decrease.</p>
                        <div className="flex justify-center border-l-2 border-t-2 border-gray-400">
                            {currentArray && currentArray.map((num, idx) => <HeapArrayCell key={`${idx}-${num}`} num={num} index={idx} onUpdate={handleArrayUpdate} isComparing={comparing.includes(idx)} isSwapping={swapping.includes(idx)} isSorted={sorted.includes(idx)} />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex retro-border">
                <div className="w-full">
                    <RetroCodeBlock title="Execution" highlightLines={[line]}>
                        {getCodeLines()}
                    </RetroCodeBlock>
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


export const HeapContent = ({ topic }) => (
    <>
        <SectionHeading title="03. Heap" id="introduction" icon={Lightbulb} />
        <Prose>
            <p>A Heap is a specialized tree-based data structure that satisfies the heap property. In a max heap, for any given node C, if P is a parent node of C, then the value of P is greater than or equal to the value of C. In a min heap, the value of P is less than or equal to the value of C. The heap is one of the most efficient implementations of an abstract data type called a priority queue.</p>
        </Prose>
        <DefinitionBox>
            A complete binary tree where each node is greater than or equal to (max heap) or less than or equal to (min heap) each of its children.
        </DefinitionBox>
        <SectionHeading title="Algorithm + Visualization" id="interactive-demo" icon={Beaker} />
        <HeapInteractive />
        <SectionHeading title="Key Operations" id="key-operations" icon={Cpu} />
        <Prose>
            <h4>Heapify</h4>
            <p>This operation is used to build a heap from an arbitrary array. It works by starting from the last non-leaf node and repeatedly applying a `sift-down` operation to ensure the heap property is maintained at each node.</p>
            <h4>Heap Up (Insert)</h4>
            <p>When a new element is added to the heap, it is placed at the first available spot at the bottom of the tree. Then, it's "sifted up" by repeatedly swapping it with its parent until it reaches its correct position, satisfying the heap property.</p>
            <h4>Heap Down (Delete)</h4>
            <p>Typically, only the root (maximum or minimum element) is removed. The last element in the heap is moved to the root, and then "sifted down" by swapping it with its largest (in a max heap) or smallest (in a min heap) child until the heap property is restored.</p>
            <h4>Heap Sort</h4>
            <p>Heap Sort is an efficient, in-place sorting algorithm. It works by first building a max heap from the data. Then, it repeatedly swaps the root (largest element) with the last element of the heap, reduces the heap size by one, and heapifies the root to maintain the heap property.</p>
        </Prose>
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <ComplexityBox
            time={<ul className="list-disc pl-5"><li>Build Heap: O(n)</li><li>Insert: O(log n)</li><li>Delete: O(log n)</li><li>Heap Sort: O(n log n)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(1) for Heap Sort (in-place)</li><li>O(n) for heap storage</li></ul>}
        />
        <SectionHeading title="Applications" id="use-cases" icon={Target} />
        <ApplicationsBox items={["Priority Queues", "Graph Algorithms (Dijkstra's, Prim's)", "Efficiently finding the min/max element", "Data Compression (Huffman Coding)"]}/>
        <SectionHeading title="Disadvantages" id="disadvantages" icon={AlertTriangle} />
        <DisadvantagesBox items={["Poor locality of reference (nodes can be scattered in memory).", "Not a stable sort.", "Slower than Quick Sort in practice on most data, despite having a better worst-case time complexity."]}/>
    </>
);
