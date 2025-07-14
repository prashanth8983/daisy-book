import React from 'react';

export const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        :root {
            --bg-primary: #f7f3e3;
            --bg-secondary: #f5f1e8;
            --text-primary: #2d2d2d;
            --text-secondary: #5a4a3a;
            --text-accent: #8b7355;
            --border-color: #2d2d2d;
            --highlight-primary: #c9302c; /* Classic Red */
            --highlight-secondary: #d9534f;
                        --highlight-code-bg: #cce5ff; 
            --highlight-bg-color: #e0e0e0; 
            --control-color: #005A9C; /* Deep Blue for controls */
            --control-highlight-color: #337ab7;
            --success-color: #5cb85c;
            --warning-color: #f0ad4e;
            --info-color: #5bc0de;
            --shadow-color: rgba(44, 24, 16, 0.1);
        }
        
        * {
            box-sizing: border-box;
        }
        
        body {
            background-color: var(--bg-primary);
            color: var(--text-primary);
            font-family: 'JetBrains Mono', monospace;
            line-height: 1.6;
            font-size: 16px;
        }
        
        .font-serif {
            font-family: 'Crimson Text', Georgia, serif;
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
        }
        
        .retro-border {
            border: 2px solid var(--border-color);
            box-shadow: 4px 4px 0 0 var(--border-color);
        }
    `}</style>
);