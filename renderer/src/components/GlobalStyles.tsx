import React from 'react';

// --- Global Styles & Fonts ---
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        
        :root {
            --bg-primary: #0D1117;
            --bg-secondary: #161B22;
            --text-primary: #C9D1D9;
            --text-secondary: #8B949E;
            --text-accent: #58A6FF;
            --border-color: #30363D;
            --highlight-primary: #F78166; /* Orange/Coral */
            --highlight-secondary: #FFA657;
            --highlight-code-bg: rgba(88, 166, 255, 0.15);
            --success-color: #56D364;
            --warning-color: #DBAB0A;
            --danger-color: #F85149;
            --shadow-color: rgba(0, 0, 0, 0.2);
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
            font-family: 'JetBrains Mono', monospace;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
        }
        
        .terminal-border {
            border: 1px solid var(--border-color);
        }
    `}</style>
);

export default GlobalStyles;
