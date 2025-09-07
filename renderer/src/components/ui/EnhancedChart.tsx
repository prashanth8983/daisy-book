import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EnhancedChartProps } from '../../types';
import { Win1Window } from './Win1Window';
import { IconBarChart3 } from './icons';

export const EnhancedChart: React.FC<EnhancedChartProps> = ({ data, lines, title, subtitle, inputLabel }) => {
    const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="win1-window p-3 bg-white">
                    <p className="font-bold text-sm">{`${inputLabel}: ${label}`}</p>
                    {payload.map((p: any, i: number) => (
                        <p key={i} className="text-sm" style={{color: p.color}}>
                            {`${p.name}: ${p.value.toFixed(2)} ops`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <Win1Window title={title || "Chart"} icon={IconBarChart3}>
            <div className="animate-fadeIn bg-white">
                {subtitle && <p className="mb-4">{subtitle}</p>}
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="1 4" stroke="var(--border-color)" opacity={0.7} />
                            <XAxis 
                                dataKey="n" 
                                tick={{ fill: 'black', fontSize: 16 }} 
                                stroke="black" 
                                label={{ value: inputLabel, position: 'insideBottom', offset: -15, fill: 'black'}}
                            />
                            <YAxis 
                                tick={{ fill: 'black', fontSize: 16 }} 
                                stroke="black" 
                                label={{ value: 'Operations', angle: -90, position: 'insideLeft', fill: 'black'}}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'black', strokeWidth: 2 }} />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            {lines.map(line => (
                                <Line 
                                    key={line.dataKey} 
                                    type="step" 
                                    dataKey={line.dataKey} 
                                    name={line.name} 
                                    stroke={line.color} 
                                    strokeWidth={4} 
                                    dot={false} 
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Win1Window>
    );
};