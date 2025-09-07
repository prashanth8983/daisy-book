import React from 'react';
import { ControlsProps } from '../../types';
import { IconPlay, IconPause, IconReset, IconSkipBack, IconSkipForward } from './icons';

export const Controls: React.FC<ControlsProps> = ({ 
    isPlaying, 
    isFinished, 
    onPlayPause, 
    onReset, 
    onStepBack, 
    onStepForward, 
    onSpeedChange, 
    speed, 
    currentStep 
}) => (
    <div className="mt-4 animate-fadeIn">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <button onClick={onReset} className="p-2 win1-button" title="Reset">
                    <IconReset className="w-5 h-5" />
                </button>
                <button 
                    onClick={onStepBack} 
                    disabled={currentStep === 0} 
                    className="p-2 win1-button disabled:opacity-50" 
                    title="Previous Step"
                >
                    <IconSkipBack className="w-5 h-5" />
                </button>
                <button 
                    onClick={onPlayPause} 
                    className="px-4 py-2 win1-button flex items-center gap-2 disabled:opacity-50" 
                    disabled={isFinished}
                >
                    {isPlaying ? <IconPause className="w-5 h-5" /> : <IconPlay className="w-5 h-5" />}
                    <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <button 
                    onClick={onStepForward} 
                    disabled={isFinished} 
                    className="p-2 win1-button disabled:opacity-50" 
                    title="Next Step"
                >
                    <IconSkipForward className="w-5 h-5" />
                </button>
            </div>
            <div className="flex items-center gap-3">
                <label className="text-lg">SPEED</label>
                <input 
                    type="range" 
                    min="250" 
                    max="2500" 
                    value={2750 - speed} 
                    onChange={(e) => onSpeedChange(2750 - parseInt(e.target.value))} 
                />
            </div>
        </div>
    </div>
);