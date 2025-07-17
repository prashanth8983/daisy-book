import React, { useState, useMemo } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu, Key, ArrowRight } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from '../ui';

const HashBucket = ({ index, entries, isNew }) => {
    let bucketClasses = 'flex-1 p-2 border-r-2 border-gray-400 min-h-[80px] transition-all duration-300 ';
    if (isNew) bucketClasses += 'bg-green-200';

    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-var(--highlight-primary) h-6 font-mono">[{index}]</div>
            <div className={bucketClasses}>
                {entries.map((entry, i) => (
                    <div key={i} className="flex items-center text-sm font-mono">
                        <span className="text-blue-600">{entry.key}</span>
                        <ArrowRight size={12} className="mx-1" />
                        <span>{entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HashTableInteractive = () => {
    const TABLE_SIZE = 5;
    const [table, setTable] = useState(Array(TABLE_SIZE).fill(null).map(() => []));
    const [lastOperation, setLastOperation] = useState(null);
    const [description, setDescription] = useState("A hash table maps keys to values for efficient lookups.");

    const hash = (key) => {
        return key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % TABLE_SIZE;
    };

    const handleInsert = () => {
        const key = `key${Math.floor(Math.random() * 100)}`;
        const value = Math.floor(Math.random() * 1000);
        const index = hash(key);
        
        const newTable = [...table];
        const bucket = newTable[index];
        const existingEntryIndex = bucket.findIndex(entry => entry.key === key);

        if (existingEntryIndex > -1) {
            bucket[existingEntryIndex] = { key, value };
        } else {
            bucket.push({ key, value });
        }

        setTable(newTable);
        setLastOperation({ type: 'insert', index });
        setDescription(`Hashed key "${key}" to index ${index}. Inserted value ${value}. Average time: O(1).`);
        setTimeout(() => setLastOperation(null), 1500);
    };

    const handleSearch = () => {
        if (table.flat().length === 0) return;
        const randomBucket = table.filter(b => b.length > 0)[Math.floor(Math.random() * table.filter(b => b.length > 0).length)];
        const randomEntry = randomBucket[Math.floor(Math.random() * randomBucket.length)];
        const { key } = randomEntry;
        const index = hash(key);

        setLastOperation({ type: 'search', index });
        setDescription(`Hashed key "${key}" to index ${index}. Found value ${randomEntry.value}. Average time: O(1).`);
        setTimeout(() => setLastOperation(null), 1500);
    };

    return (
        <div className="my-8">
            <h3 className="font-bold text-lg uppercase mb-2">Visualization (Size: {TABLE_SIZE})</h3>
            <div className="p-4 retro-border bg-var(--bg-secondary)">
                <div className="flex justify-center border-l-2 border-t-2 border-gray-400">
                    {table.map((bucket, idx) => (
                        <HashBucket 
                            key={idx}
                            index={idx} 
                            entries={bucket}
                            isNew={lastOperation && lastOperation.index === idx}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-6 retro-border p-4 bg-var(--bg-secondary)">
                <h3 className="font-bold text-lg uppercase mb-2">Operations</h3>
                <div className="flex space-x-2">
                    <button onClick={handleInsert} className="retro-btn flex items-center"><Key size={14} className="mr-2"/> Insert</button>
                    <button onClick={handleSearch} className="retro-btn">Search</button>
                </div>
                 <p className="font-serif text-lg mt-4">{description}</p>
            </div>
        </div>
    );
};

export const HashContent = ({ topic }) => (
    <>
        <SectionHeading title="04. Hash Table" id="introduction" icon={Lightbulb} />
        <Prose>
            <p>A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found.</p>
        </Prose>
        <DefinitionBox>
            A data structure which stores data in an associative manner. In a hash table, data is stored in an array format, where each data value has its own unique index value.
        </DefinitionBox>
        <SectionHeading title="Interactive Demo" id="interactive-demo" icon={Beaker} />
        <HashTableInteractive />
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <ComplexityBox
            time={<ul className="list-disc pl-5"><li>Average Search: O(1)</li><li>Average Insertion: O(1)</li><li>Average Deletion: O(1)</li><li>Worst Case: O(n)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(n)</li></ul>}
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 21}, (_, i) => ({ n: i * 5, 'O(1)': 1, 'O(n) - Worst Case': i*5 })), [])} 
            lines={[
                { dataKey: 'O(1)', name: 'Average Case', color: '#5cb85c' },
                { dataKey: 'O(n) - Worst Case', name: 'Worst Case (Collisions)', color: '#c9302c' }
            ]} 
            title="Hash Table Operations Complexity"
            subtitle="Time complexity growth for common operations"
            inputLabel="Table Size (n)" 
        />
        <SectionHeading title="Applications" id="use-cases" icon={Target} />
        <ApplicationsBox items={[
            "Used to implement database indexes.",
            "Used to implement caches.",
            "Used to implement sets."
        ]}/>
        <SectionHeading title="Disadvantages" id="disadvantages" icon={AlertTriangle} />
        <DisadvantagesBox items={[
            "Hash collisions are a problem that needs to be handled.",
            "Worst-case time complexity for operations can be O(n) if many collisions occur."
        ]}/>
    </>
);
