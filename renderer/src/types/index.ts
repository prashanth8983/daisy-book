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

// Pattern difficulty levels
export type PatternDifficulty = 'Easy' | 'Medium' | 'Hard';

// Pattern frequency in interviews
export type PatternFrequency = 'Low' | 'Medium' | 'High' | 'Very High';

// Individual pattern within a category
export interface Pattern {
    id: string;
    title: string;
    description: string;
    difficulty: PatternDifficulty;
    frequency: PatternFrequency;
    timeComplexity: string;
    spaceComplexity: string;
    keyPoints: string[];
    commonMistakes: string[];
    relatedProblems: string[];
    leetcodeProblems: number[];
    content: FC<{ pattern: Pattern }>;
}

// Category that groups related patterns
export interface DSACategory {
    id: string;
    title: string;
    description: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    patterns: Pattern[];
    orderIndex: number;
}

// Legacy support - keep for backward compatibility
export interface AlgorithmTopic {
    id: string;
    chapter: string;
    title: string;
    tags: string[];
    description: string;
    sections: Section[];
    content: FC<{ topic: AlgorithmTopic }>;
}

// Props for pattern components
export interface PatternComponentProps {
    pattern: Pattern;
}

// Props for category components
export interface CategoryComponentProps {
    category: DSACategory;
    onSelectPattern: (pattern: Pattern) => void;
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