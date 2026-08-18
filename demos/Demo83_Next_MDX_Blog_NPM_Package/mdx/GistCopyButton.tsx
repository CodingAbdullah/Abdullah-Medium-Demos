"use client";
import { toast } from 'sonner';

interface GistCopyButtonProps {
  content: string;
  mdxGHGistURL: string;
}

export default function GistCopyButton({ content, mdxGHGistURL }: GistCopyButtonProps): React.JSX.Element {
  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('GitHub Gist copied!', {
        style: {
          background: '#0d1117',
          border: '1px solid #22c55e',
          color: 'white'
        }
      });
    }
    catch {
      toast.error('Failed to copy GitHub Gist', {
        style: {
          background: '#0d1117',
          border: '1px solid #22c55e',
          color: 'white'
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        type="button"
        onClick={copyToClipboard}
        className="flex items-center gap-1 text-xs text-green-400/70 hover:text-green-300 transition-colors duration-200 bg-green-500/10 hover:bg-green-500/20 px-2 py-1 rounded border border-green-500/20"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
        Copy
      </button>
      <a
        href={mdxGHGistURL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs text-green-400/70 hover:text-green-300 transition-colors duration-200 bg-green-500/10 hover:bg-green-500/20 px-2 py-1 rounded border border-green-500/20"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        mdxgists.net
      </a>
    </div>
  );
}
