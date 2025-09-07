import { FC, ReactNode, SVGProps } from 'react';

export interface RetroIconProps extends SVGProps<SVGSVGElement> {
    viewBox?: string;
    children: ReactNode;
}

export interface Section {
    id: string;
    title: string;
    icon: FC<SVGProps<SVGSVGElement>>;
}

export interface AlgorithmTopic {
    id: string;
    chapter: string;
    title: string;
    tags: string[];
    description: string;
    sections: Section[];
    content: FC<{ topic: AlgorithmTopic }>;
}

export interface ControlsProps {
    isPlaying: boolean;
    isFinished: boolean;
    onPlayPause: () => void;
    onReset: () => void;
    onStepBack: () => void;
    onStepForward: () => void;
    onSpeedChange: (speed: number) => void;
    speed: number;
    currentStep: number;
}

export interface EnhancedChartProps {
    data: any[];
    lines: { dataKey: string; name: string; color: string }[];
    title: string;
    subtitle: string;
    inputLabel: string;
}