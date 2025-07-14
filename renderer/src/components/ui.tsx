import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Book, Brain, Target, AlertTriangle, Code2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const SectionHeading = ({ title, id, icon: Icon }) => (
  <div id={id} className="pt-20 mb-8 -mt-16">
    <div className="flex items-center gap-4">
        {Icon && <Icon className="w-8 h-8 text-primary" />}
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
    <div className="w-full h-px bg-border mt-4"></div>
  </div>
);

export const Prose = ({ children, className = "" }) => (
    <div className={`prose max-w-none text-lg leading-relaxed font-serif text-muted-foreground ${className}`}>
        {children}
    </div>
);

export const DefinitionBox = ({ children }) => (
    <div className="my-8 p-6 rounded-lg bg-secondary/50 border border-border">
        <h3 className="font-bold text-xl mb-2 font-serif flex items-center gap-3 text-foreground">
            <Book className="w-6 h-6 text-primary" />
            Definition
        </h3>
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground text-lg font-serif">
            {children}
        </blockquote>
    </div>
);

export const ComplexityBox = ({ time, space, recurrence, theorem }) => (
    <div className="my-8 rounded-lg bg-secondary/50 border border-border p-6">
         <h3 className="font-bold text-xl mb-4 font-serif flex items-center gap-3 text-foreground">
            <Brain className="w-6 h-6 text-primary" />
            Complexity Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif text-lg">
            <div>
                <h4 className="font-bold text-foreground">Time Complexity</h4>
                <div className="text-muted-foreground">{time}</div>
            </div>
             <div>
                <h4 className="font-bold text-foreground">Space Complexity</h4>
                <div className="text-muted-foreground">{space}</div>
            </div>
        </div>
        {recurrence && (
            <div className="mt-4">
                 <h4 className="font-bold font-serif text-foreground">Recurrence Relation</h4>
                 <p className="font-mono text-lg bg-background p-2 border border-border rounded-md mt-2 inline-block">{recurrence}</p>
            </div>
        )}
        {theorem && (
             <div className="mt-4">
                 <h4 className="font-bold font-serif text-foreground">Master's Theorem</h4>
                 <p className="font-serif text-lg mt-2 text-muted-foreground">{theorem}</p>
            </div>
        )}
    </div>
);

export const ApplicationsBox = ({ items }) => (
     <div className="my-8 rounded-lg bg-secondary/50 border border-border p-6">
        <h3 className="font-bold text-xl mb-4 font-serif flex items-center gap-3 text-foreground">
            <Target className="w-6 h-6 text-primary" />
            Applications & Usage
        </h3>
        <ul className="list-disc pl-6 space-y-2 font-serif text-lg text-muted-foreground">
            {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
        </ul>
    </div>
);

export const DisadvantagesBox = ({ items }) => (
    <div className="my-8 rounded-lg bg-secondary/50 border border-border p-6">
        <h3 className="font-bold text-xl mb-4 font-serif flex items-center gap-3 text-foreground">
            <AlertTriangle className="w-6 h-6 text-primary" />
            Disadvantages
        </h3>
        <ul className="list-disc pl-6 space-y-2 font-serif text-lg text-muted-foreground">
            {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
        </ul>
    </div>
);


export const RetroCodeBlock = ({ children, title = "Algorithm", language = "python", highlightLines = [] }) => {
    return (
        <div className="bg-secondary/30 rounded-lg border border-border h-full">
            <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="font-bold flex items-center gap-2"><Code2 size={16}/> {title}</span>
                <span className="text-sm text-muted-foreground font-mono">{language}</span>
            </div>
            <div className="p-4 font-mono text-sm overflow-x-auto">
                <pre className="leading-relaxed">
                    {React.Children.map(children, (line, index) => {
                        const isHighlighted = highlightLines.includes(index + 1);
                        return (
                            <div key={index} className={`flex -mx-4 px-4 ${isHighlighted ? 'bg-primary/10' : ''}`}>
                                <span className="inline-block w-8 text-right mr-4 select-none text-muted-foreground">
                                    {index + 1}
                                </span>
                                <span className="text-foreground">{line}</span>
                            </div>
                        );
                    })}
                </pre>
            </div>
        </div>
    );
};

export const Controls = ({ isPlaying, isFinished, onPlayPause, onReset, onStepBack, onStepForward, onSpeedChange, speed, currentStep, totalSteps }) => (
    <div className="my-6 rounded-lg border border-border p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <button onClick={onReset} className="p-2 rounded-md hover:bg-secondary transition-colors" title="Reset"><RotateCcw size={20} /></button>
                <button onClick={onStepBack} disabled={currentStep === 0} className="p-2 rounded-md hover:bg-secondary transition-colors disabled:opacity-50" title="Previous Step"><SkipBack size={20} /></button>
                <button onClick={onPlayPause} className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-opacity disabled:opacity-50 font-bold" disabled={isFinished}>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <button onClick={onStepForward} disabled={isFinished} className="p-2 rounded-md hover:bg-secondary transition-colors disabled:opacity-50" title="Next Step"><SkipForward size={20} /></button>
            </div>
            <div className="flex items-center gap-3">
                <label className="text-sm font-bold">SPEED</label>
                <input type="range" min="250" max="2500" value={2750 - speed} onChange={(e) => onSpeedChange(2750 - parseInt(e.target.value))} className="w-32 h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"/>
            </div>
        </div>
        <div className="mt-4 h-2 bg-secondary border border-border rounded-full p-0.5">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }} />
        </div>
    </div>
);

export const EnhancedChart = ({ data, lines, title, subtitle, inputLabel }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border border-border bg-popover p-3 shadow-lg text-popover-foreground">
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
        <div className="my-6 rounded-lg border border-border p-6">
            <div className="mb-4">
                <h3 className="text-2xl font-bold font-serif text-foreground">{title}</h3>
                <p className="text-muted-foreground font-serif">{subtitle}</p>
            </div>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis dataKey="n" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))" label={{ value: inputLabel, position: 'insideBottom', offset: -15, fill: 'hsl(var(--foreground))'}}/>
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))" label={{ value: 'Operations', angle: -90, position: 'insideLeft', fill: 'hsl(var(--foreground))'}}/>
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
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
