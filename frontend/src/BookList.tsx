import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  const [pageSize, setPageSize] = useState<number>(5);

  const [pageNum, setPageNum] = useState<number>(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, [pageSize, pageNum]);

  return (
    <>
      <h1>Book List</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
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
        </div>
      ))}

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => setPageSize(Number(p.target.value))}
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
