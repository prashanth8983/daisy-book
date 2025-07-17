import React, { useState, useMemo } from 'react';
import { Lightbulb, Beaker, BarChart3, Target, AlertTriangle, Cpu } from 'lucide-react';
import { SectionHeading, Prose, DefinitionBox, ComplexityBox, ApplicationsBox, DisadvantagesBox, RetroCodeBlock, Controls, EnhancedChart } from '../ui';

const StringChar = ({ char, index, isAccessed }) => {
    let cellClasses = 'w-12 h-12 flex items-center justify-center border-b-2 border-r-2 border-gray-400 text-2xl font-mono transition-all duration-300 ';
    if (isAccessed) cellClasses += 'bg-var(--highlight-primary) text-white';
    else cellClasses += 'bg-white';

    return (
        <div className="flex flex-col items-center">
            <div className="text-sm text-var(--highlight-primary) h-6">{index}</div>
            <div className={cellClasses}>{char}</div>
        </div>
    );
};

const StringInteractive = () => {
    const [str, setStr] = useState("HELLO");
    const [accessedIndex, setAccessedIndex] = useState(null);
    const [description, setDescription] = useState("A string is a sequence of characters.");

    const handleAccess = () => {
        const index = Math.floor(Math.random() * str.length);
        setAccessedIndex(index);
        setDescription(`Accessing character at index ${index}. This is an O(1) operation.`);
        setTimeout(() => setAccessedIndex(null), 1500);
    };

    const handleSearch = () => {
        const char = str[Math.floor(Math.random() * str.length)];
        const index = str.indexOf(char);
        setAccessedIndex(index);
        setDescription(`Searching for character '${char}'. Found at index ${index}. This is an O(n) operation.`);
        setTimeout(() => setAccessedIndex(null), 1500);
    };

    const handleSlice = () => {
        const start = Math.floor(Math.random() * str.length);
        const end = start + Math.floor(Math.random() * (str.length - start)) + 1;
        const sub = str.slice(start, end);
        setDescription(`Slicing from index ${start} to ${end-1} results in "${sub}". This is an O(k) operation where k is the length of the slice.`);
    };

    return (
        <div className="my-8">
            <h3 className="font-bold text-lg uppercase mb-2">Visualization</h3>
            <div className="p-4 retro-border bg-var(--bg-secondary)">
                <div className="flex justify-center border-l-2 border-t-2 border-gray-400">
                    {str.split('').map((char, idx) => (
                        <StringChar 
                            key={`${idx}-${char}`}
                            char={char} 
                            index={idx} 
                            isAccessed={accessedIndex === idx}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-6 retro-border p-4 bg-var(--bg-secondary)">
                <h3 className="font-bold text-lg uppercase mb-2">Operations</h3>
                <div className="flex space-x-2">
                    <button onClick={handleAccess} className="retro-btn">Access</button>
                    <button onClick={handleSearch} className="retro-btn">Search</button>
                    <button onClick={handleSlice} className="retro-btn">Slice</button>
                </div>
                 <p className="font-serif text-lg mt-4">{description}</p>
            </div>
        </div>
    );
};

export const StringContent = ({ topic }) => (
    <>
        <SectionHeading title="02. String" id="introduction" icon={Lightbulb} />
        <Prose>
            <p>A string is a data structure composed of a sequence of characters. It is one of the most commonly used data types. Strings are used for storing and manipulating text.</p>
        </Prose>
        <DefinitionBox>
            A sequence of characters, used to represent text.
        </DefinitionBox>
        <SectionHeading title="Interactive Demo" id="interactive-demo" icon={Beaker} />
        <StringInteractive />
        <SectionHeading title="Complexity Analysis" id="complexity-analysis" icon={BarChart3} />
        <ComplexityBox
            time={<ul className="list-disc pl-5"><li>Access: O(1)</li><li>Search: O(n)</li><li>Insertion: O(n)</li><li>Deletion: O(n)</li></ul>}
            space={<ul className="list-disc pl-5"><li>O(n)</li></ul>}
        />
        <EnhancedChart 
            data={useMemo(() => Array.from({length: 21}, (_, i) => ({ n: i * 5, 'O(n)': i * 5, 'O(1)': 1 })), [])} 
            lines={[
                { dataKey: 'O(n)', name: 'Search/Slice', color: '#c9302c' },
                { dataKey: 'O(1)', name: 'Access', color: '#5cb85c' }
            ]} 
            title="String Operations Complexity"
            subtitle="Time complexity growth for common operations"
            inputLabel="String Length (n)" 
        />
        <SectionHeading title="Applications" id="use-cases" icon={Target} />
        <ApplicationsBox items={[
            "Storing textual data.",
            "Representing names, addresses, and other textual information.",
            "Used in many algorithms like pattern matching, parsing, etc."
        ]}/>
        <SectionHeading title="Disadvantages" id="disadvantages" icon={AlertTriangle} />
        <DisadvantagesBox items={[
            "In many languages, strings are immutable, so modifications create new strings.",
            "Can be inefficient to search for substrings."
        ]}/>
    </>
);
