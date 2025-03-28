import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import HeaderBand from '../components/HeaderBand';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {/* Sticky cart summary in top-right corner */}
      <div className="d-flex justify-content-end">
        <CartSummary />
      </div>

      {/* Header */}
      <HeaderBand />

      {/* Grid layout */}
      <div className="row mt-4">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* Book List */}
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
