import { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { getSuggestedBooks } from '../services/api';
import type { Book } from '../types/book';

interface BookListProps {
  books: Book[];
  currentPage: number;
  currentQuery: string;
  totalResults: number;
  onPageChange: (page: number) => void;
  onBookSelect: (book: Book) => void;
}

export default function BookList({
  books,
  currentPage,
  currentQuery,
  totalResults,
  onPageChange,
  onBookSelect,
}: BookListProps) {
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [suggestionsError, setSuggestionsError] = useState('');

  useEffect(() => {
    if (books.length === 0) {
      const loadSuggestions = async () => {
        try {
          const suggestions = await getSuggestedBooks();
          setSuggestedBooks(suggestions);
        } catch (error) {
          setSuggestionsError('Unable to load suggestions at this time.');
        }
      };
      loadSuggestions();
    }
  }, [books]);

  const displayedBooks = books.length > 0 ? books : suggestedBooks;
  const totalPages = Math.ceil(totalResults / 100);

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        {books.length > 0 ? 'Search Results' : 'Suggested Books'}
      </h2>
      {suggestionsError && (
        <p className="text-red-500 mb-4">{suggestionsError}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedBooks.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onSelect={() => onBookSelect(book)}
          />
        ))}
      </div>
      {books.length > 0 && totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-900 dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}