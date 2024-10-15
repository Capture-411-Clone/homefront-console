import { useState, useCallback } from 'react';

export function useJsonDownload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadJson = useCallback((jsonData: any, filename = 'data.json') => {
    setIsLoading(true);
    setError(null);

    try {
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const href = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = href;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(href);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  return { downloadJson, isLoading, error };
}
