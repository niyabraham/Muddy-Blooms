import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-8xl mb-6">🛒</p>
        <h2 className="font-display text-3xl text-forest font-bold mb-2">Your cart is empty</h2>
        <p className="text-fern mb-8">Looks like you haven't added any plants yet.</p>
        <Link to="/shop"
          className="bg-forest text-white px-8 py-3 rounded-full hover:bg-fern transition font-bold text-sm">
          Browse Plants
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* Header */}
      <div className="bg-forest text-white py-16 px-6 text-center">
        <h1 className="font-display text-5xl font-bold">Your Cart</h1>
        <p className="text-sage mt-2">{totalItems} item{totalItems > 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Cart Items */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id}
              className="bg-white rounded-2xl p-5 flex items-center gap-5 shadow-sm">

              {/* Emoji */}
              <div className="bg-mist w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                {item.emoji}
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h3 className="font-display text-forest font-bold text-lg">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.category} Plant</p>
                <p className="text-fern font-bold mt-1">₹{item.price}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-mist text-forest font-bold hover:bg-sage transition flex items-center justify-center">
                  −
                </button>
                <span className="w-6 text-center font-bold text-forest">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-mist text-forest font-bold hover:bg-sage transition flex items-center justify-center">
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right min-w-[70px]">
                <p className="font-bold text-forest">₹{item.price * item.quantity}</p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-300 hover:text-red-400 transition text-xl ml-2">
                ✕
              </button>
            </div>
          ))}

          <Link to="/shop"
            className="text-fern text-sm hover:text-forest transition mt-2 inline-block">
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <h2 className="font-display text-2xl text-forest font-bold mb-6">Order Summary</h2>

          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>Delivery</span>
            <span className="text-leaf font-medium">FREE</span>
          </div>
          <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between font-bold text-forest text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button className="w-full bg-forest text-white py-3 rounded-full font-bold mt-6 hover:bg-fern transition text-sm">
            Proceed to Checkout →
          </button>

          <div className="mt-4 text-center text-xs text-gray-400">
            🔒 Secure checkout · Free delivery across Kerala
          </div>
        </div>

      </div>
    </div>
  );
}