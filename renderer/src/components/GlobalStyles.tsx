import React from 'react';

const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        :root {
            --bg-primary: #fdfbf6;
            --bg-secondary: #f5f1e8;
            --text-primary: #3a3a3a;
            --text-secondary: #5a4a3a;
            --text-accent: #8b7355;
            --border-color: #3a3a3a;
            --highlight-primary: #D97706;
            --highlight-secondary: #F59E0B;
            --success-color: #16A34A;
            --warning-color: #FBBF24;
            --info-color: #3B82F6;
            --danger-color: #DC2626;
            --shadow-color: rgba(44, 24, 16, 0.1);
        }
        * { box-sizing: border-box; }
        body {
            background-color: var(--bg-primary) !important;
            color: var(--text-primary);
            font-family: 'JetBrains Mono', monospace;
            line-height: 1.6;
            font-size: 16px;
        }
        .font-serif { font-family: 'Crimson Text', Georgia, serif; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 0% { transform: scale(0.95); } 70% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-popIn { animation: popIn 0.3s ease-out forwards; }
        .retro-border { border: 2px solid var(--border-color); box-shadow: 4px 4px 0 0 var(--border-color); }
    `}</style>
);

export default GlobalStyles; 