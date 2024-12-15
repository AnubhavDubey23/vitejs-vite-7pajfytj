import { useState } from 'react';
import { searchBooks } from '../services/api';
import type { Book } from '../types/book';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = async (query: string, page = 1) => {
    setIsLoading(true);
    setError('');
    setCurrentQuery(query);
    
    try {
      const data = await searchBooks(query, page);
      setBooks(data.docs);
      setCurrentPage(page);
      setTotalResults(data.numFound);
    } catch (err) {
      setError('An error occurred while fetching books. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    books,
    isLoading,
    error,
    currentPage,
    totalResults,
    currentQuery,
    handleSearch,
  };
}