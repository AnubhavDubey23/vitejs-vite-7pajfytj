import { IMAGES, API } from '../constants/urls';

interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface BookCardProps {
  book: Book;
  onSelect: () => void;
}

export default function BookCard({ book, onSelect }: BookCardProps) {
  const coverUrl = book.cover_i
    ? `${API.COVER_URL}/${book.cover_i}-M.jpg`
    : IMAGES.DEFAULT_BOOK_COVER;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-colors duration-200"
      onClick={onSelect}
    >
      <img
        src={coverUrl}
        alt={`Cover of ${book.title}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate text-gray-900 dark:text-white">
          {book.title}
        </h2>
        {book.author_name && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            By {book.author_name.slice(0, 2).join(', ')}
            {book.author_name.length > 2 && ' et al.'}
          </p>
        )}
        {book.first_publish_year && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            First published: {book.first_publish_year}
          </p>
        )}
      </div>
    </div>
  );
}