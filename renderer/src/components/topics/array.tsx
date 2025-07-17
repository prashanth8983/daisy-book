import React, { useState, useMemo } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from '../ui';

const ArrayCell = ({ num, index, isAccessed, isNew, isDeleted }) => {
    let cellClasses = 'w-16 h-16 flex items-center justify-center border-b-2 border-r-2 border-gray-400 text-2xl font-serif transition-all duration-500 ';
    if (isDeleted) cellClasses += 'bg-danger text-white transform scale-0';
    else if (isNew) cellClasses += 'bg-success text-white transform scale-110';
    else if (isAccessed) cellClasses += 'bg-primary text-white';
    else cellClasses += 'bg-card';

    return (
        <div className="flex flex-col items-center animate-fade-in-up">
            <div className="text-sm text-muted-foreground h-6">{index}</div>
            <div className={cellClasses}>{num}</div>
        </div>
    );
};

const ArrayInteractive = () => {
    const [array, setArray] = useState([10, 20, 30, 40, 50]);
    const [inputValue, setInputValue] = useState("");
    const [indexValue, setIndexValue] = useState("");
    const [accessedIndex, setAccessedIndex] = useState(null);
    const [newIndex, setNewIndex] = useState(null);
    const [deletedIndex, setDeletedIndex] = useState(null);
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
        <div className="my-8 paper-card">
            <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
            <div className="p-4 bg-secondary rounded-sm shadow-inner">
                <div className="flex justify-center border-l-2 border-t-2 border-gray-400 min-h-[100px]">
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
            <div className="mt-6 p-4 bg-secondary rounded-sm shadow-inner">
                <h3 className="font-bold text-lg uppercase mb-2">Operations</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Value" className="w-24 bg-input p-2 rounded-sm" />
                    <input type="text" value={indexValue} onChange={e => setIndexValue(e.target.value)} placeholder="Index" className="w-24 bg-input p-2 rounded-sm" />
                    <button onClick={handleInsert} className="btn-primary">Insert</button>
                    <button onClick={handleDelete} className="btn-secondary">Delete</button>
                    <button onClick={handleAccess} className="btn-secondary">Access</button>
                </div>
                 <p className="font-serif text-lg mt-4 text-muted-foreground">{description}</p>
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
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 21}, (_, i) => ({ n: i * 5, 'O(n)': i * 5, 'O(1)': 1 })), [])} 
            lines={[
                { dataKey: 'O(n)', name: 'Search/Insert/Delete', color: 'hsl(var(--danger))' },
                { dataKey: 'O(1)', name: 'Access', color: 'hsl(var(--success))' }
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
""
