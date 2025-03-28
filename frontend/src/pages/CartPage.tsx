import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your Cart is Empty.</p>
        ) : (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {cart.map((item: CartItem) => (
              <div
                key={item.bookID}
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h4 style={{ margin: 0 }}>{item.title}</h4>
                  <p style={{ margin: '0.25rem 0' }}>{item.author}</p>
                  <p style={{ margin: '0.25rem 0' }}>
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p style={{ margin: '0.25rem 0' }}>Quantity: {item.qty}</p>

                  <p style={{ margin: '0.25rem 0', fontWeight: 'bold' }}>
                    Subtotal: ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
                <button onClick={() => removeFromCart(item.bookID)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <h3>
        Total: $
        {cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
      </h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
