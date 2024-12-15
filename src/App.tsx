import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import BookDetailsModal from './components/BookDetailsModal';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [theme, setTheme] = useState('light');
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSearch = async (query: string, page = 1) => {
    setIsLoading(true);
    setError('');
    setCurrentQuery(query);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(
          query
        )}&page=${page}`
      );
      const data = await response.json();
      setBooks(data.docs);
      setCurrentPage(page);
      setTotalResults(data.numFound);
    } catch (err) {
      setError('An error occurred while fetching books. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div id="root" className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Book Finder</h1>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
            <SearchBar onSearch={handleSearch} />
            {isLoading && <p className="text-center mt-4 text-gray-900 dark:text-white">Loading...</p>}
            {error && <p className="text-center mt-4 text-red-500">{error}</p>}
            <BookList
              books={books}
              currentPage={currentPage}
              currentQuery={currentQuery}
              totalResults={totalResults}
              onPageChange={(page) => handleSearch(currentQuery, page)}
              onBookSelect={setSelectedBook}
            />
          </div>
        </main>
        <Footer />
        {selectedBook && (
          <BookDetailsModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;