import { useNavigate, useParams } from 'react-router-dom';
import HeaderBand from '../components/HeaderBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function AddToCart() {
  const navigate = useNavigate();
  const { title, bookID, author, price } = useParams();
  const { addToCart } = useCart();
  const [qty, setQtyAmount] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Title Found',
      author: author || 'No Author Found',
      price: Number(price),
      qty,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <HeaderBand />
      <h2>How many copies of {title} would you like?</h2>

      <div>
        <input
          type="number"
          placeholder="Qty"
          value={qty}
          onChange={(x) => setQtyAmount(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add To Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default AddToCart;
