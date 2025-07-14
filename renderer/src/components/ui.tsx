import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, CheckCircle, XCircle, Beaker, BarChart3, ArrowLeft, ChevronsRight, Lightbulb, Code2, AlertTriangle, Menu, X, BookMarked, PenTool, Hash, Zap, Brain, Target, Cpu, ExternalLink, Minimize, ArrowDown, Sun, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

// --- Reusable UI Components ---

export const SectionHeading = ({ title, id, icon: Icon }) => (
  <div id={id} className="pt-16 mb-6">
    <div className="flex items-center gap-4">
        {Icon && <Icon className="w-8 h-8 text-var(--text-primary)" />}
        <h2 className="text-3xl font-bold uppercase tracking-widest">{title}</h2>
    </div>
    <div className="w-full h-0.5 bg-var(--border-color) mt-3"></div>
  </div>
);

export const Prose = ({ children, className = "" }) => (
    <div className={`prose max-w-none text-lg leading-relaxed animate-fadeIn font-serif ${className}`}>
        {children}
    </div>
);

export const DefinitionBox = ({ children }) => (
    <div className="my-8 p-6 retro-border bg-[var(--bg-secondary)] animate-fadeIn">
        <h3 className="font-bold text-xl mb-2 font-serif flex items-center gap-3">
            <BookMarked className="w-6 h-6 text-[var(--highlight-primary)]" />
            Definition
        </h3>
        <blockquote className="border-l-4 border-[var(--highlight-primary)] pl-4 italic text-[var(--text-secondary)] text-lg font-serif">
            {children}
        </blockquote>
    </div>
);

export const ComplexityBox = ({ time, space, recurrence, theorem }) => (
    <div className="my-8 retro-border p-6 bg-[var(--bg-secondary)] animate-fadeIn">
         <h3 className="font-bold text-xl mb-4 font-serif flex items-center gap-3">
            <Brain className="w-6 h-6 text-[var(--highlight-primary)]" />
            Complexity Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif text-lg">
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
                 <h4 className="font-bold font-serif">Recurrence Relation</h4>
                 <p className="font-mono text-lg bg-var(--bg-primary) p-2 retro-border mt-2 inline-block">{recurrence}</p>
            </div>
        )}
        {theorem && (
             <div className="mt-4">
                 <h4 className="font-bold font-serif">Master's Theorem</h4>
                 <p className="font-serif text-lg mt-2">{theorem}</p>
            </div>
        )}
    </div>
);

export const ApplicationsBox = ({ items }) => (
     <div className="my-8 retro-border p-6 bg-[var(--bg-secondary)] animate-fadeIn">
        <h3 className="font-bold text-xl mb-4 font-serif flex items-center gap-3">
            <Target className="w-6 h-6 text-[var(--highlight-primary)]" />
            Applications & Usage
        </h3>
        <ul className="list-disc pl-6 space-y-2 font-serif text-lg">
            {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
        </ul>
    </div>
);

export const DisadvantagesBox = ({ items }) => (
    <div className="my-8 retro-border p-6 bg-[var(--bg-secondary)] animate-fadeIn">
        <h3 className="font-bold text-xl mb-4 font-serif flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-[var(--highlight-primary)]" />
            Disadvantages
        </h3>
        <ul className="list-disc pl-6 space-y-2 font-serif text-lg">
            {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
        </ul>
    </div>
);


export const RetroCodeBlock = ({ children, title = "Algorithm", language = "python", highlightLines = [] }) => {
    return (
        <div className="bg-var(--bg-primary) h-full">
            <div className="flex items-center justify-between p-2 border-b-2 border-var(--border-color)">
                <span className="font-bold uppercase flex items-center gap-2"><Code2 size={16}/> {title}</span>
                <span className="text-sm text-var(--text-accent) font-mono">{language}</span>
            </div>
            <div className="p-4 font-mono text-sm overflow-x-auto">
                <pre className="leading-relaxed">
                    {React.Children.map(children, (line, index) => {
                        const isHighlighted = highlightLines.includes(index + 1);
                        return (
                            <div key={index} className={`flex -mx-4 px-4 ${isHighlighted ? 'bg-[var(--highlight-code-bg)]' : ''}`}>
                                <span className="inline-block w-8 text-right mr-4 select-none text-var(--text-accent)">
                                    {index + 1}
                                </span>
                                <span className="text-var(--text-primary)">{line}</span>
                            </div>
                        );
                    })}
                </pre>
            </div>
        </div>
    );
};

export const Controls = ({ isPlaying, isFinished, onPlayPause, onReset, onStepBack, onStepForward, onSpeedChange, speed, currentStep, totalSteps }) => (
    <div className="my-6 p-4 animate-fadeIn">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <button onClick={onReset} className="p-2 retro-border hover:bg-[var(--highlight-bg-color)] transition-colors" title="Reset"><RotateCcw size={20} /></button>
                <button onClick={onStepBack} disabled={currentStep === 0} className="p-2 retro-border hover:bg-[var(--highlight-bg-color)] transition-colors disabled:opacity-50" title="Previous Step"><SkipBack size={20} /></button>
                <button onClick={onPlayPause} className="px-4 py-2 bg-var(--control-color) text-white retro-border flex items-center gap-2 hover:bg-var(--control-highlight-color) transition-opacity disabled:opacity-50 font-bold" disabled={isFinished}>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <button onClick={onStepForward} disabled={isFinished} className="p-2 retro-border hover:bg-[var(--highlight-bg-color)] transition-colors disabled:opacity-50" title="Next Step"><SkipForward size={20} /></button>
            </div>
            <div className="flex items-center gap-3">
                <label className="text-sm font-bold uppercase">Speed</label>
                <input type="range" min="250" max="2500" value={2750 - speed} onChange={(e) => onSpeedChange(2750 - parseInt(e.target.value))} className="w-32 h-1 bg-var(--border-color) appearance-none cursor-pointer accent-var(--control-color)"/>
            </div>
        </div>
        <div className="mt-4 h-2 bg-var(--bg-secondary) border border-var(--border-color) p-0.5">
            <div className="h-full bg-var(--control-color) transition-all duration-300" style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }} />
        </div>
    </div>
);

export const EnhancedChart = ({ data, lines, title, subtitle, inputLabel }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="retro-border p-3 bg-var(--bg-primary) shadow-lg">
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
        <div className="my-6 retro-border p-6 animate-fadeIn">
            <div className="mb-4">
                <h3 className="text-2xl font-bold font-serif">{title}</h3>
                <p className="text-var(--text-secondary) font-serif">{subtitle}</p>
            </div>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
                        <XAxis dataKey="n" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} stroke="var(--border-color)" label={{ value: inputLabel, position: 'insideBottom', offset: -15, fill: 'var(--text-primary)'}}/>
                        <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} stroke="var(--border-color)" label={{ value: 'Operations', angle: -90, position: 'insideLeft', fill: 'var(--text-primary)'}}/>
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--highlight-primary)', strokeWidth: 1, strokeDasharray: '3 3' }} />
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