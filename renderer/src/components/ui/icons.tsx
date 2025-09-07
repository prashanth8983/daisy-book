import React from 'react';
import { RetroIconProps } from '../../types';

// --- Retro Icon Components ---
// Custom SVG icons for a minimalist, blocky, retro GUI feel.
const RetroIcon: React.FC<RetroIconProps> = ({ viewBox = "0 0 24 24", className, children }) => (
    <svg className={className} viewBox={viewBox} fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
        {children}
    </svg>
);

// Windows 1.0 style blocky icons
export const IconPlay: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="8" y="6" width="2" height="12"/><polygon points="10,6 10,18 18,12"/></RetroIcon>;
export const IconPause: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="6" y="6" width="3" height="12"/><rect x="15" y="6" width="3" height="12"/></RetroIcon>;
export const IconReset: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="6" y="4" width="12" height="2"/><rect x="4" y="6" width="2" height="4"/><rect x="6" y="10" width="2" height="2"/><rect x="8" y="12" width="4" height="2"/><rect x="12" y="10" width="2" height="2"/><rect x="14" y="8" width="2" height="2"/><rect x="16" y="6" width="2" height="2"/><rect x="18" y="8" width="2" height="4"/><rect x="16" y="12" width="2" height="2"/><rect x="14" y="14" width="4" height="2"/><polygon points="4,8 2,6 6,6"/></RetroIcon>;
export const IconSkipBack: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="16" y="6" width="2" height="12"/><polygon points="16,6 8,12 16,18"/></RetroIcon>;
export const IconSkipForward: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="16" y="6" width="2" height="12"/><polygon points="8,6 16,12 8,18"/></RetroIcon>;
export const IconBeaker: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="9" y="3" width="6" height="2"/><rect x="8" y="5" width="8" height="2"/><polygon points="7,7 17,7 15,19 9,19"/><rect x="9" y="9" width="6" height="1"/></RetroIcon>;
export const IconBarChart3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="3" y="16" width="4" height="6"/><rect x="10" y="12" width="4" height="10"/><rect x="17" y="6" width="4" height="16"/></RetroIcon>;
export const IconHome: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><polygon points="12,3 4,9 4,21 9,21 9,15 15,15 15,21 20,21 20,9"/><rect x="11" y="11" width="2" height="2"/></RetroIcon>;
export const IconChevronsRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><polygon points="6,7 10,12 6,17 8,17 12,12 8,7"/><polygon points="11,7 15,12 11,17 13,17 17,12 13,7"/></RetroIcon>;
export const IconLightbulb: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="10" y="2" width="4" height="6"/><rect x="8" y="8" width="8" height="6"/><rect x="9" y="14" width="6" height="2"/><rect x="9" y="17" width="6" height="2"/><rect x="10" y="20" width="4" height="2"/></RetroIcon>;
export const IconCode2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="3" y="3" width="18" height="2"/><rect x="3" y="19" width="18" height="2"/><rect x="3" y="3" width="2" height="18"/><rect x="19" y="3" width="2" height="18"/><rect x="8" y="8" width="8" height="2"/><rect x="8" y="14" width="8" height="2"/></RetroIcon>;
export const IconAlertTriangle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><polygon points="12,2 2,20 22,20"/><rect x="11" y="8" width="2" height="6"/><rect x="11" y="16" width="2" height="2"/></RetroIcon>;
export const IconBookMarked: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="5" y="3" width="14" height="18"/><rect x="7" y="5" width="10" height="2"/><rect x="7" y="9" width="10" height="2"/><rect x="7" y="13" width="6" height="2"/><polygon points="12,3 15,6 12,9 9,6"/></RetroIcon>;
export const IconBrain: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="6" y="6" width="12" height="8"/><rect x="8" y="4" width="8" height="2"/><rect x="4" y="8" width="2" height="4"/><rect x="18" y="8" width="2" height="4"/><rect x="8" y="16" width="8" height="2"/><rect x="10" y="18" width="4" height="2"/></RetroIcon>;
export const IconTarget: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="4" y="4" width="16" height="16"/><rect x="8" y="8" width="8" height="8"/><rect x="10" y="10" width="4" height="4"/><rect x="11" y="11" width="2" height="2"/></RetroIcon>;
export const IconCpu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="6" y="6" width="12" height="12"/><rect x="8" y="8" width="8" height="8"/><rect x="9" y="2" width="6" height="2"/><rect x="9" y="20" width="6" height="2"/><rect x="2" y="9" width="2" height="6"/><rect x="20" y="9" width="2" height="6"/></RetroIcon>;
export const IconArrowDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <RetroIcon {...props}><rect x="11" y="4" width="2" height="12"/><polygon points="8,14 12,18 16,14"/></RetroIcon>;