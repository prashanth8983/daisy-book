import React, { useState, useMemo } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from '../ui';

const StackCell = ({ num, isNew, isPopped }) => {
    let cellClasses = 'w-24 h-12 flex items-center justify-center border-2 border-gray-400 text-2xl font-serif transition-all duration-300 ';
    if (isPopped) cellClasses += 'bg-danger text-white transform translate-x-full opacity-0';
    else if (isNew) cellClasses += 'bg-success text-white';
    else cellClasses += 'bg-card';

    return <div className={cellClasses}>{num}</div>;
};

const StackInteractive = () => {
    const [stack, setStack] = useState([10, 20, 30]);
    const [inputValue, setInputValue] = useState("");
    const [poppedItem, setPoppedItem] = useState(null);
    const [newItem, setNewItem] = useState(null);
    const [description, setDescription] = useState("A stack is a LIFO (Last-In, First-Out) data structure.");

    const handlePush = () => {
        const value = parseInt(inputValue);
        if (isNaN(value)) {
            setDescription("Invalid input. Please enter a valid number.");
            return;
        }
        setNewItem(value);
        setDescription(`Pushing ${value} onto the stack. O(1) operation.`);
        setTimeout(() => {
            setStack(prev => [...prev, value]);
            setNewItem(null);
            setInputValue("");
        }, 500);
    };

    const handlePop = () => {
        if (stack.length === 0) return;
        const value = stack[stack.length - 1];
        setPoppedItem(value);
        setDescription(`Popping ${value} from the stack. O(1) operation.`);
        setTimeout(() => {
            setStack(prev => prev.slice(0, -1));
            setPoppedItem(null);
        }, 500);
    };

    const handlePeek = () => {
        if (stack.length === 0) return;
        const value = stack[stack.length - 1];
        setDescription(`Peeking at the top element: ${value}. O(1) operation.`);
    };

    return (
        <div className="my-8 paper-card">
            <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
            <div className="p-4 bg-secondary rounded-sm shadow-inner flex justify-center items-end min-h-[300px]">
                <div className="flex flex-col-reverse">
                    {stack.map((num, idx) => (
                        <StackCell 
                            key={`${idx}-${num}`} 
                            num={num}
                            isNew={newItem === num}
                            isPopped={poppedItem === num}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-6 p-4 bg-secondary rounded-sm shadow-inner">
                <h3 className="font-bold text-lg uppercase mb-2">Operations</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Value" className="w-24 bg-input p-2 rounded-sm" />
                    <button onClick={handlePush} className="btn-primary">Push</button>
                    <button onClick={handlePop} className="btn-secondary">Pop</button>
                    <button onClick={handlePeek} className="btn-secondary">Peek</button>
                </div>
                 <p className="font-serif text-lg mt-4 text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};

export const StackContent = ({ topic }) => (
    <>
        <SectionHeading title="Stack" id="introduction" icon={Lightbulb} />
        <Prose>
            <p>A stack is a linear data structure that follows the LIFO (Last-In, First-Out) principle. It has two main operations: Push, which adds an element to the collection, and Pop, which removes the most recently added element.</p>
        </Prose>
        <DefinitionBox>
            A data structure that serves as a collection of elements, with two principal operations: push, which adds an element to the collection, and pop, which removes the most recently added element that was not yet removed.
        </DefinitionBox>
        <SectionHeading title="Interactive Demo" id="interactive-demo" icon={Beaker} />
        <StackInteractive />
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <ComplexityBox
            time={<ul className="list-disc pl-5"><li>Access: O(n)</li><li>Search: O(n)</li><li>Insertion (Push): O(1)</li><li>Deletion (Pop): O(1)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(n)</li></ul>}
        />
        <SectionHeading title="Applications" id="use-cases" icon={Target} />
        <ApplicationsBox items={[
            "Function call management (call stack).",
            "Undo/redo functionality in software.",
            "Expression evaluation and syntax parsing."
        ]}/>
        <SectionHeading title="Disadvantages" id="disadvantages" icon={AlertTriangle} />
        <DisadvantagesBox items={[
            "Stack overflow can occur if it grows too large.",
            "Not suitable for fast access to arbitrary elements."
        ]}/>
    </>
);
