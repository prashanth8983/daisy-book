import React from 'react';

interface Win1WindowProps {
    title: string;
    children: React.ReactNode;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    id?: string;
}

export const Win1Window: React.FC<Win1WindowProps> = ({ title, children, icon: Icon, id }) => (
    <div id={id} className="my-8 win1-window animate-fadeIn">
        <div className="win1-titlebar">
            <span className="flex items-center gap-2">
                {Icon && <Icon className="w-5 h-5"/>}
                {title}
            </span>
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
);

export const Prose: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`prose max-w-none text-lg leading-relaxed animate-fadeIn ${className}`}>
        {children}
    </div>
);

export const DefinitionBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Win1Window title="Definition" icon={() => <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="3" width="14" height="18"/><rect x="7" y="5" width="10" height="2"/></svg>}>
        <blockquote className="border-l-4 border-black pl-4 text-black">
            {children}
        </blockquote>
    </Win1Window>
);

export const ComplexityBox: React.FC<{
    time: React.ReactNode;
    space: React.ReactNode;
    recurrence?: string;
    theorem?: string;
    id: string;
}> = ({ time, space, recurrence, theorem, id }) => (
    <Win1Window id={id} title="Complexity Analysis">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <h4 className="font-bold">Recurrence Relation</h4>
                <p className="p-2 mt-2 inline-block font-mono win1-inset bg-white">{recurrence}</p>
            </div>
        )}
        {theorem && (
            <div className="mt-4">
                <h4 className="font-bold">Master's Theorem</h4>
                <p className="mt-2">{theorem}</p>
            </div>
        )}
    </Win1Window>
);

export const ApplicationsBox: React.FC<{ items: string[]; id: string }> = ({ items, id }) => (
    <Win1Window id={id} title="Applications & Usage">
        <ul className="list-disc pl-6 space-y-2">
            {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
        </ul>
    </Win1Window>
);

export const DisadvantagesBox: React.FC<{ items: string[]; id: string }> = ({ items, id }) => (
    <Win1Window id={id} title="Disadvantages">
        <ul className="list-disc pl-6 space-y-2">
            {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
        </ul>
    </Win1Window>
);