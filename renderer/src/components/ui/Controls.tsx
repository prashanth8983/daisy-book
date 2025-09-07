import React from 'react';
import { ControlsProps } from '../../types';
import { TbPlayerPlay, TbPlayerPause, TbArrowBack, TbArrowLeft, TbArrowRight } from 'react-icons/tb';

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
                <button onClick={onReset} className="w-12 h-12 win1-button flex items-center justify-center" title="Reset">
                    <TbArrowBack className="w-5 h-5" />
                </button>
                <button 
                    onClick={onStepBack} 
                    disabled={currentStep === 0} 
                    className="w-12 h-12 win1-button flex items-center justify-center disabled:opacity-50" 
                    title="Previous Step"
                >
                    <TbArrowLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={onPlayPause} 
                    className="px-6 py-3 h-12 win1-button flex items-center justify-center gap-2 disabled:opacity-50 min-w-[120px]" 
                    disabled={isFinished}
                >
                    {isPlaying ? <TbPlayerPause className="w-5 h-5" /> : <TbPlayerPlay className="w-5 h-5" />}
                    <span className="font-medium">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <button 
                    onClick={onStepForward} 
                    disabled={isFinished} 
                    className="w-12 h-12 win1-button flex items-center justify-center disabled:opacity-50" 
                    title="Next Step"
                >
                    <TbArrowRight className="w-5 h-5" />
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