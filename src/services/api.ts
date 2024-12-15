import { API } from '../constants/urls';
import type { Book } from '../types/book';

export async function searchBooks(query: string, page: number = 1): Promise<{ docs: Book[], numFound: number }> {
  const response = await fetch(
    `${API.SEARCH_URL}?title=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}

export async function getSuggestedBooks(): Promise<Book[]> {
  const response = await fetch(
    `${API.SEARCH_URL}?q=bestseller&limit=6`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch suggested books');
  }
  const data = await response.json();
  return data.docs;
}