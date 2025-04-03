import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);

  const [pageSize, setPageSize] = useState<number>(5);

  const [pageNum, setPageNum] = useState<number>(1);

  const [totalPages, setTotalPages] = useState<number>(0); //Will use this to do pagination

  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      {books.map((b) => (
        <div id="bookCard" className="card book-card mb-4" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body"></div>
          <ul className="list-unstyled">
            <li>
              <strong>Author: </strong>
              {b.author}
            </li>
            <li>
              <strong>Publisher: </strong>
              {b.publisher}
            </li>
            <li>
              <strong>ISBN: </strong>
              {b.isbn}
            </li>
            <li>
              <strong>Classification: </strong>
              {b.classification}
            </li>
            <li>
              <strong>Category: </strong>
              {b.category}
            </li>
            <li>
              <strong>Page Count: </strong>
              {b.pageCount} pages
            </li>
            <li>
              <strong>Price: </strong>${b.price}
            </li>
          </ul>

          <button
            className="btn btn-success"
            onClick={() =>
              navigate(
                `/addToCart/${b.title}/${b.bookID}/${b.author}/${b.price}`
              )
            }
          >
            Add To Cart
          </button>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
