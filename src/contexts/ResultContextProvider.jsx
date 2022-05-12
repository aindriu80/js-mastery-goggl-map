import React, { useState, useContext, createContext } from 'react';
const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';
export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('Javascript');
  const apiKEY = import.meta.env.VITE_API_KEY;
  console.log('API Key: ', apiKEY);

  // /videos, /search, /images
  const getResults = async (type) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}${type}`, {
      method: 'GET',
      headers: {
        'X-User-Agent': 'desktop',
        'X-Proxy-Location': 'EU',
        'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
        'X-RapidAPI-Key': apiKEY,
      },
    });

    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, loading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
