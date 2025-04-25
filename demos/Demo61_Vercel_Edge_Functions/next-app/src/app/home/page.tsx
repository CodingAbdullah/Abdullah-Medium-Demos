// components/ProtectedData.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ProtectedData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProtectedData() {
      try {
        const response = await fetch('/api/protected/data');
        
        if (!response.ok) {
          // Handle non-200 responses
          if (response.status === 401 || response.status === 403) {
            throw new Error('Not authenticated');
          }
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        setData(result);
      } 
      catch (err) {
        setError(err.message || 'An error occurred');
      } 
      finally {
        setLoading(false);
      }
    }
    
    fetchProtectedData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Protected Data</h2>
      <p>Message: {data?.message}</p>
      <p>Timestamp: {data?.timestamp}</p>
      <ul>
        {data?.data?.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}