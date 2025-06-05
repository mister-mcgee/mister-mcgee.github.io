import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Props {
  term: string;
  children?: React.ReactNode;
}

interface Summary {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  };
  content_urls?: {
    desktop?: {
      page: string;
    };
  };
}

async function fetchWikipediaSummary(term: string): Promise<Summary> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`
    );
    if (!res.ok) throw new Error('Unable to fetch summary at this time.');
    return await res.json();
  } catch {
    return {
      title: term,
      extract: '💔 Unable to fetch summary at this time.',
    };
  }
}

export const Wikipedia: React.FC<Props> = ({ term, children }) => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMouseEnter = async () => {
    if (summary || loading) return; // prevent duplicate fetches
    setLoading(true );
    setSummary(await fetchWikipediaSummary(term))
    setLoading(false);
  };

  const articleUrl =
    summary?.content_urls?.desktop?.page ??
    `https://en.wikipedia.org/wiki/${encodeURIComponent(term)}`;


  return (
    <div className="tooltip border-b border-dotted cursor-help">
      <div className="tooltip-content flex flex-col text-left max-w-none">
        {summary ? <>
          <span className="text-lg font-semibold">{summary?.title ?? term}</span>
          <span className="text-xs italic text-white/70">from Wikipedia</span>

          <div className="flex flex-row gap-2 w-80 items-start">
            {summary?.thumbnail?.source && <img
              src={summary?.thumbnail?.source}
              alt={summary?.title ?? term}
              className="w-24 h-24 object-contain bg-white rounded"/>}
            <p className="text-sm line-clamp-5">
              {summary?.extract}
            </p>
          </div>

          <span className="text-white/70 italic text-xs text-center">Click to read more in a new tab</span>
        </>: <>
          <span className="text-lg font-semibold">Fetching...</span>
        </>}
        
      </div>
      <a
        href={articleUrl}
        target="_blank"
        onMouseEnter={handleMouseEnter}
        className="inline-flex items-center gap-1 no-underline cursor-help"
      >
        { children ?? summary?.title ?? term } <ExternalLink className="w-3.5 h-3.5 opacity-50" />
      </a>
    </div>
  );
};

export default Wikipedia;
