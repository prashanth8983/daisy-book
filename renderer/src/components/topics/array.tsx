import React, { useState, useMemo } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from '../ui';

const ArrayCell = ({ num, index, isAccessed, isNew, isDeleted }: { 
    num: number; 
    index: number; 
    isAccessed: boolean; 
    isNew: boolean; 
    isDeleted: boolean; 
}) => {
    let cellClasses = 'w-16 h-16 flex items-center justify-center border-b-2 border-r-2 border-[var(--border-color)] text-2xl font-serif transition-all duration-500 ';
    if (isDeleted) cellClasses += 'bg-[var(--danger-color)] text-white transform scale-0';
    else if (isNew) cellClasses += 'bg-[var(--success-color)] text-white transform scale-110';
    else if (isAccessed) cellClasses += 'bg-[var(--highlight-primary)] text-white';
    else cellClasses += 'bg-[var(--bg-secondary)]';

    return (
        <div className="flex flex-col items-center animate-fadeIn">
            <div className="text-sm text-[var(--text-secondary)] h-6">{index}</div>
            <div className={cellClasses}>{num}</div>
        </div>
    );
};

const ArrayInteractive = () => {
    const [array, setArray] = useState([10, 20, 30, 40, 50]);
    const [inputValue, setInputValue] = useState("");
    const [indexValue, setIndexValue] = useState("");
    const [accessedIndex, setAccessedIndex] = useState<number | null>(null);
    const [newIndex, setNewIndex] = useState<number | null>(null);
    const [deletedIndex, setDeletedIndex] = useState<number | null>(null);
    const [description, setDescription] = useState("An array is a collection of items stored at contiguous memory locations.");

    const handleInsert = () => {
        const value = parseInt(inputValue);
        const index = parseInt(indexValue) || array.length;
        if (isNaN(value) || isNaN(index) || index < 0 || index > array.length) {
            setDescription("Invalid input. Please enter a valid number and index.");
            return;
        }
        const newArray = [...array.slice(0, index), value, ...array.slice(index)];
        setArray(newArray);
        setNewIndex(index);
        setAccessedIndex(null);
        setDeletedIndex(null);
        setDescription(`Inserting element ${value} at index ${index}. This is an O(n) operation as elements may need to be shifted.`);
        setTimeout(() => setNewIndex(null), 1500);
    };

    const handleDelete = () => {
        const index = parseInt(indexValue);
        if (isNaN(index) || index < 0 || index >= array.length) {
            setDescription("Invalid index. Please enter a valid index to delete.");
            return;
        }
        setDeletedIndex(index);
        setDescription(`Deleting element at index ${index}. This is an O(n) operation as elements may need to be shifted.`);
        setTimeout(() => {
            const newArray = [...array.slice(0, index), ...array.slice(index + 1)];
            setArray(newArray);
            setDeletedIndex(null);
        }, 500);
    };
    
    const handleAccess = () => {
        const index = parseInt(indexValue);
        if (isNaN(index) || index < 0 || index >= array.length) {
            setDescription("Invalid index. Please enter a valid index to access.");
            return;
        }
        setAccessedIndex(index);
        setNewIndex(null);
        setDeletedIndex(null);
        setDescription(`Accessing element at index ${index}. This is an O(1) operation.`);
        setTimeout(() => setAccessedIndex(null), 1500);
    };

    return (
        <div className="my-8 p-6 terminal-border bg-[var(--bg-secondary)]">
            <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
            <div className="p-4 bg-[var(--bg-primary)] rounded-sm">
                <div className="flex justify-center border-l-2 border-t-2 border-[var(--border-color)] min-h-[100px]">
                    {array.map((num, idx) => (
                        <ArrayCell 
                            key={`${idx}-${num}`} 
                            num={num} 
                            index={idx} 
                            isAccessed={accessedIndex === idx}
                            isNew={newIndex === idx}
                            isDeleted={deletedIndex === idx}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-sm">
                <h3 className="font-bold text-lg uppercase mb-2">Operations</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={e => setInputValue(e.target.value)} 
                        placeholder="Value" 
                        className="w-24 bg-[var(--bg-secondary)] p-2 rounded-sm border border-[var(--border-color)] text-[var(--text-primary)]" 
                    />
                    <input 
                        type="text" 
                        value={indexValue} 
                        onChange={e => setIndexValue(e.target.value)} 
                        placeholder="Index" 
                        className="w-24 bg-[var(--bg-secondary)] p-2 rounded-sm border border-[var(--border-color)] text-[var(--text-primary)]" 
                    />
                    <button 
                        onClick={handleInsert} 
                        className="px-4 py-2 bg-[var(--highlight-primary)] text-white rounded-sm hover:bg-[var(--highlight-secondary)] transition-colors"
                    >
                        Insert
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="px-4 py-2 bg-[var(--danger-color)] text-white rounded-sm hover:opacity-80 transition-colors"
                    >
                        Delete
                    </button>
                    <button 
                        onClick={handleAccess} 
                        className="px-4 py-2 bg-[var(--success-color)] text-white rounded-sm hover:opacity-80 transition-colors"
                    >
                        Access
                    </button>
                </div>
                 <p className="font-serif text-lg mt-4 text-[var(--text-secondary)]">{description}</p>
            </div>
        </div>
    );
};

export const ArrayContent = ({ topic }) => (
    <>
        <SectionHeading title="Array" id="introduction" icon={Lightbulb} />
        <Prose>
            <p>An array is a data structure consisting of a collection of elements (values or variables), each identified by at least one array index or key. An array is stored such that the position of each element can be computed from its index tuple by a mathematical formula.</p>
        </Prose>
        <DefinitionBox>
            A data structure that stores a collection of items at contiguous memory locations.
        </DefinitionBox>
        <SectionHeading title="Interactive Demo" id="interactive-demo" icon={Beaker} />
        <ArrayInteractive />
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <ComplexityBox
            time={<ul className="list-disc pl-5"><li>Access: O(1)</li><li>Search: O(n)</li><li>Insertion: O(n)</li><li>Deletion: O(n)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(n)</li></ul>}
            recurrence={null}
            theorem={null}
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 21}, (_, i) => ({ n: i * 5, 'O(n)': i * 5, 'O(1)': 1 })), [])} 
            lines={[
                { dataKey: 'O(n)', name: 'Search/Insert/Delete', color: '#F85149' },
                { dataKey: 'O(1)', name: 'Access', color: '#56D364' }
            ]} 
            title="Array Operations Complexity"
            subtitle="Time complexity growth for common operations"
            inputLabel="Array Size (n)" 
        />
        <SectionHeading title="Applications" id="use-cases" icon={Target} />
        <ApplicationsBox items={[
            "Used to implement other data structures like stacks and queues.",
            "Used for sorting algorithms.",
            "Used in lookup tables."
        ]}/>
        <SectionHeading title="Disadvantages" id="disadvantages" icon={AlertTriangle} />
        <DisadvantagesBox items={[
            "Fixed size in many languages.",
            "Costly insertion and deletion of elements."
        ]}/>
    </>
);