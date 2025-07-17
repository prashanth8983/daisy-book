import React, { useState, useMemo } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from '../ui';

const QueueCell = ({ num, isNew, isDequeued }) => {
    let cellClasses = 'w-16 h-16 flex items-center justify-center border-2 border-gray-400 text-2xl font-serif transition-all duration-300 ';
    if (isDequeued) cellClasses += 'bg-danger text-white transform -translate-x-full opacity-0';
    else if (isNew) cellClasses += 'bg-success text-white';
    else cellClasses += 'bg-card';

    return <div className={cellClasses}>{num}</div>;
};

const QueueInteractive = () => {
    const [queue, setQueue] = useState([10, 20, 30]);
    const [inputValue, setInputValue] = useState("");
    const [dequeuedItem, setDequeuedItem] = useState(null);
    const [newItem, setNewItem] = useState(null);
    const [description, setDescription] = useState("A queue is a FIFO (First-In, First-Out) data structure.");

    const handleEnqueue = () => {
        const value = parseInt(inputValue);
        if (isNaN(value)) {
            setDescription("Invalid input. Please enter a valid number.");
            return;
        }
        setNewItem(value);
        setDescription(`Enqueuing ${value}. O(1) operation.`);
        setTimeout(() => {
            setQueue(prev => [...prev, value]);
            setNewItem(null);
            setInputValue("");
        }, 500);
    };

    const handleDequeue = () => {
        if (queue.length === 0) return;
        const value = queue[0];
        setDequeuedItem(value);
        setDescription(`Dequeuing ${value}. O(1) operation.`);
        setTimeout(() => {
            setQueue(prev => prev.slice(1));
            setDequeuedItem(null);
        }, 500);
    };

    const handlePeek = () => {
        if (queue.length === 0) return;
        const value = queue[0];
        setDescription(`Peeking at the front element: ${value}. O(1) operation.`);
    };

    return (
        <div className="my-8 paper-card">
            <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
            <div className="p-4 bg-secondary rounded-sm shadow-inner flex justify-start items-center min-h-[100px]">
                <div className="flex">
                    {queue.map((num, idx) => (
                        <QueueCell 
                            key={`${idx}-${num}`} 
                            num={num}
                            isNew={newItem === num}
                            isDequeued={dequeuedItem === num}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-6 p-4 bg-secondary rounded-sm shadow-inner">
                <h3 className="font-bold text-lg uppercase mb-2">Operations</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Value" className="w-24 bg-input p-2 rounded-sm" />
                    <button onClick={handleEnqueue} className="btn-primary">Enqueue</button>
                    <button onClick={handleDequeue} className="btn-secondary">Dequeue</button>
                    <button onClick={handlePeek} className="btn-secondary">Peek</button>
                </div>
                 <p className="font-serif text-lg mt-4 text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};

export const QueueContent = ({ topic }) => (
    <>
        <SectionHeading title="Queue" id="introduction" icon={Lightbulb} />
        <Prose>
            <p>A queue is a linear data structure that follows the FIFO (First-In, First-Out) principle. It has two main operations: Enqueue, which adds an element to the rear of the collection, and Dequeue, which removes the front element.</p>
        </Prose>
        <DefinitionBox>
            A data structure that serves as a collection of elements, with two principal operations: enqueue, which adds an element to the rear of the collection, and dequeue, which removes the front element.
        </DefinitionBox>
        <SectionHeading title="Interactive Demo" id="interactive-demo" icon={Beaker} />
        <QueueInteractive />
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <ComplexityBox
            time={<ul className="list-disc pl-5"><li>Access: O(n)</li><li>Search: O(n)</li><li>Insertion (Enqueue): O(1)</li><li>Deletion (Dequeue): O(1)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(n)</li></ul>}
        />
        <SectionHeading title="Applications" id="use-cases" icon={Target} />
        <ApplicationsBox items={[
            "CPU and disk scheduling.",
            "Handling requests on a single shared resource (e.g., printer).",
            "Breadth-First Search (BFS) algorithm in graphs."
        ]}/>
        <SectionHeading title="Disadvantages" id="disadvantages" icon={AlertTriangle} />
        <DisadvantagesBox items={[
            "Can be inefficient for certain operations like searching for an element.",
        ]}/>
    </>
);
