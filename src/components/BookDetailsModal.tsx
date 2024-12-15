import { X } from 'lucide-react';

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  publisher?: string[];
  isbn?: string[];
  language?: string[];
  subject?: string[];
}

interface BookDetailsModalProps {
  book: Book;
  onClose: () => void;
}

export default function BookDetailsModal({
  book,
  onClose,
}: BookDetailsModalProps) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://via.placeholder.com/300x450?text=No+Cover';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full md:w-1/3 object-cover rounded"
          />
          <div className="flex-1">
            {book.author_name && (
              <p>
                <strong>Author(s):</strong> {book.author_name.join(', ')}
              </p>
            )}
            {book.first_publish_year && (
              <p>
                <strong>First Published:</strong> {book.first_publish_year}
              </p>
            )}
            {book.publisher && (
              <p>
                <strong>Publisher(s):</strong> {book.publisher.join(', ')}
              </p>
            )}
            {book.isbn && (
              <p>
                <strong>ISBN:</strong> {book.isbn[0]}
              </p>
            )}
            {book.language && (
              <p>
                <strong>Language(s):</strong> {book.language.join(', ')}
              </p>
            )}
            {book.subject && (
              <div>
                <strong>Subjects:</strong>
                <ul className="list-disc list-inside">
                  {book.subject.slice(0, 5).map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
