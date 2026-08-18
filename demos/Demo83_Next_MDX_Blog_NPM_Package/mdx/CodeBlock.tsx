"use client";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { toast } from 'sonner';

// Custom code block component for handling code in MDX files
// Visual Studio Code Dark Plus theme with copy functionality
const CodeBlock = ({ className = '', children }: { className?: string; children: string }): React.JSX.Element => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match?.[1] || 'text';
  const code = String(children).trim();

  // Copy content and receive a toast message based on action
  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied!', {
        style: {
          background: '#0d1117',
          border: '1px solid #22c55e',
          color: 'white'
        }
      });
    }
    catch {
      toast.error('Failed to copy code', {
        style: {
          background: '#0d1117',
          border: '1px solid #22c55e',
          color: 'white'
        }
      });
    }
  };

  return (
    <div className="relative my-6 group">
      <div className="absolute top-3 right-3 z-10">
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-xs text-green-400/70 hover:text-green-300 transition-colors duration-200 bg-black/60 hover:bg-black/80 px-2 py-1 rounded border border-green-500/20 backdrop-blur-sm"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          Copy
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        className="rounded-lg"
        customStyle={{
          paddingTop: '2rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
