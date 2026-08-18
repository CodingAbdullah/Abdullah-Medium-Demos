import type GitHubGistType from '@/utils/types/GitHubGistType';
import GistCopyButton from './GistCopyButton';
import GistCodeBlock from './GistCodeBlock';
import { GITHUB_USERNAME, GITHUB_GIST_LANGUAGE_MAP, GIST_BASE_URL } from '@/utils/constants';

export default async function GitHubGist({ id, figCaptionText }: GitHubGistType): Promise<React.JSX.Element> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/gists/${id}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return (
        <div className="text-red-400 bg-red-950/30 border border-red-500/30 p-4 rounded-lg font-mono text-sm">
          Could not load GitHub Gist ({response.status})
        </div>
      );
    }

    const data = await response.json();
    const firstFileKey = Object.keys(data.files)[0];
    const firstFile = data.files[firstFileKey];

    const rawResponse = await fetch(firstFile.raw_url, {
      headers: process.env.GITHUB_TOKEN
        ? { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` }
        : {},
      next: { revalidate: 3600 },
    });

    const content = await rawResponse.text();
    const language: string | null = firstFile.language;
    const prismLanguage = language
      ? (GITHUB_GIST_LANGUAGE_MAP[language] ?? language.toLowerCase())
      : 'text';
    const mdxGHGistURL = `${GIST_BASE_URL}/${GITHUB_USERNAME}/${id}`;

    return (
      <figure className="my-6">
        <div className="relative bg-gray-900/30 rounded-lg border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] overflow-hidden">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-gray-800/50 border-b border-green-500/30">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-green-200 font-medium">GitHub Gist</span>
              {language && (
                <span className="text-xs text-green-600 font-mono border border-green-500/20 px-1.5 py-0.5 rounded">
                  {language}
                </span>
              )}
            </div>
            <GistCopyButton content={content} mdxGHGistURL={mdxGHGistURL} />
          </div>

          {/* Code */}
          <div className="scrollbar-gist overflow-auto max-h-96">
            <GistCodeBlock content={content} language={prismLanguage} />
          </div>
        </div>
        <figcaption className="mt-3 mb-4 leading-relaxed text-green-200/90 text-sm font-medium text-center">
          {figCaptionText}
        </figcaption>
      </figure>
    );
  }
  catch (err) {
    return (
      <div className="text-red-400 bg-red-950/30 border border-red-500/30 p-4 rounded-lg font-mono text-sm">
        Could not load GitHub Gist: {err instanceof Error ? err.message : String(err)}
      </div>
    );
  }
}
