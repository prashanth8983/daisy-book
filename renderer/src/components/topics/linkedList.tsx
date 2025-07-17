import React, { useState, useMemo } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu, ArrowRight } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from '../ui';

const ListNode = ({ value, isNew, isDeleted }) => {
    let nodeClasses = 'w-16 h-16 flex items-center justify-center border-2 border-gray-400 text-2xl font-serif transition-all duration-500 rounded-lg ';
    if (isDeleted) nodeClasses += 'bg-red-500 text-white transform scale-0';
    else if (isNew) nodeClasses += 'bg-green-500 text-white transform scale-110';
    else nodeClasses += 'bg-white';

    return <div className={nodeClasses}>{value}</div>;
};

const LinkedListInteractive = () => {
    const [list, setList] = useState([10, 20, 30]);
    const [newNode, setNewNode] = useState(null);
    const [deletedNode, setDeletedNode] = useState(null);
    const [description, setDescription] = useState("A linked list is a sequence of nodes, where each node stores a value and a pointer to the next node.");

    const handleAddFirst = () => {
        const value = Math.floor(Math.random() * 100);
        setList([value, ...list]);
        setNewNode(value);
        setDescription(`Adding ${value} to the head of the list. This is an O(1) operation.`);
        setTimeout(() => setNewNode(null), 1500);
    };

    const handleRemoveFirst = () => {
        if (list.length === 0) return;
        const value = list[0];
        setDeletedNode(value);
        setDescription(`Removing ${value} from the head of the list. This is an O(1) operation.`);
        setTimeout(() => {
            setList(list.slice(1));
            setDeletedNode(null);
        }, 500);
    };
    
    const handleAddLast = () => {
        const value = Math.floor(Math.random() * 100);
        setList([...list, value]);
        setNewNode(value);
        setDescription(`Adding ${value} to the tail of the list. This is an O(n) operation without a tail pointer.`);
        setTimeout(() => setNewNode(null), 1500);
    };

    return (
        <div className="my-8">
            <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
            <div className="p-4 retro-border bg-var(--bg-secondary)">
                <div className="flex items-center justify-center min-h-[100px]">
                    {list.map((val, idx) => (
                        <React.Fragment key={idx}>
                            <ListNode value={val} isNew={newNode === val} isDeleted={deletedNode === val} />
                            {idx < list.length - 1 && <ArrowRight className="mx-2 text-var(--highlight-primary)" size={32} />}
                        </React.Fragment>
                    ))}
                    {list.length === 0 && <p className="text-gray-500">List is empty</p>}
                </div>
            </div>
            <div className="mt-6 retro-border p-4 bg-var(--bg-secondary)">
                <h3 className="font-bold text-lg uppercase mb-2">Operations</h3>
                <div className="flex space-x-2">
                    <button onClick={handleAddFirst} className="retro-btn">Add First</button>
                    <button onClick={handleRemoveFirst} className="retro-btn">Remove First</button>
                    <button onClick={handleAddLast} className="retro-btn">Add Last</button>
                </div>
                 <p className="font-serif text-lg mt-4">{description}</p>
            </div>
        </div>
    );
};

export const LinkedListContent = ({ topic }) => (
    <>
        <SectionHeading title="03. Linked List" id="introduction" icon={Lightbulb} />
        <Prose>
            <p>A linked list is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a collection of nodes which together represent a sequence.</p>
        </Prose>
        <DefinitionBox>
            A linear data structure where elements are not stored at contiguous memory locations; the elements are linked using pointers.
        </DefinitionBox>
        <SectionHeading title="Interactive Demo" id="interactive-demo" icon={Beaker} />
        <LinkedListInteractive />
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <ComplexityBox
            time={<ul className="list-disc pl-5"><li>Access: O(n)</li><li>Search: O(n)</li><li>Insertion (head): O(1)</li><li>Deletion (head): O(1)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(n)</li></ul>}
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 21}, (_, i) => ({ n: i * 5, 'O(n)': i * 5, 'O(1)': 1 })), [])} 
            lines={[
                { dataKey: 'O(n)', name: 'Access/Search', color: '#c9302c' },
                { dataKey: 'O(1)', name: 'Insertion/Deletion (head)', color: '#5cb85c' }
            ]} 
            title="Linked List Operations Complexity"
            subtitle="Time complexity growth for common operations"
            inputLabel="List Size (n)" 
        />
        <SectionHeading title="Applications" id="use-cases" icon={Target} />
        <ApplicationsBox items={[
            "Implementation of stacks and queues.",
            "Implementation of graphs.",
            "Dynamic memory allocation."
        ]}/>
        <SectionHeading title="Disadvantages" id="disadvantages" icon={AlertTriangle} />
        <DisadvantagesBox items={[
            "Random access is not allowed.",
            "Extra memory space for a pointer is required with each element of the list."
        ]}/>
    </>
);
