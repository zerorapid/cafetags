import React, { useState } from 'react';
import { MaterialIcon } from '../MaterialIcon';

interface ZomatoExtractorProps {
  onExtractSuccess: (imageUrls: string[]) => void;
}

export function ZomatoExtractor({ onExtractSuccess }: ZomatoExtractorProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!url) {
      setError('Please enter a valid Zomato District URL.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Call the Vercel serverless function
      const response = await fetch('/api/extract-zomato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract images');
      }

      if (data.linksCaptured && data.linksCaptured.length > 0) {
        onExtractSuccess(data.linksCaptured);
        setUrl(''); // Clear after success
      } else {
        setError('No images found on the provided URL.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during extraction.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-5 mb-6">
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-red-100 text-red-600 p-2 rounded-md">
          <MaterialIcon name="auto_awesome" className="text-xl" />
        </div>
        <div>
          <h4 className="font-bold text-stone-900 text-sm">Zomato Magic Extractor</h4>
          <p className="text-xs text-stone-500 mt-1">
            Paste a Zomato District URL to automatically extract high-resolution gallery images without downloading them.
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 items-stretch mt-4">
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://zomato.com/hyderabad/district/..." 
          className="flex-1 border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white"
        />
        <button 
          onClick={handleExtract}
          disabled={isLoading || !url}
          className="bg-stone-900 hover:bg-black text-white px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider disabled:opacity-50 flex items-center gap-2 transition-colors"
        >
          {isLoading ? (
            <>
              <MaterialIcon name="refresh" className="animate-spin text-sm" />
              <span>Extracting...</span>
            </>
          ) : (
            <>
              <MaterialIcon name="download" className="text-sm" />
              <span>Extract</span>
            </>
          )}
        </button>
      </div>
      
      {error && (
        <p className="text-xs text-red-600 mt-2 font-medium">{error}</p>
      )}
    </div>
  );
}
