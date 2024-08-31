'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { addItem, removeItem } from '@/redux/slices/CartSlice';
import { ShoppingCart } from 'lucide-react';
import { RootState } from '@/redux/store'; // Adjust the import path as necessary

export default function AddToCart({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items || []);
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [increasePerClick, setIncreasePerClick] = useState(true); // Handle the logic to decide whether to increase per click
  const [redirect, setRedirect] = useState(false); // Handle whether to redirect after adding to cart

  const addToCartHandler = (event) => {
    event.stopPropagation(); // Prevent click event from propagating to the parent
    let newQty = qty;
    const existItem = cartItems.find((x) => x.id === product.id);

    if (existItem) {
      if (existItem.quantity + newQty <= product.countInStock) {
        newQty += existItem.quantity;
      } else {
        return alert('No more products in stock');
      }
    }

    dispatch(addItem({ ...product, quantity: newQty }));
    if (redirect) router.push('/cart');
  };

  useEffect(() => {
    // Any side effect when the product changes can be handled here
    console.log(product.id);
  }, [product]);

  return (
    <div onClick={addToCartHandler} className={product.countInStock > 0 ? "cursor-pointer" : "text-gray-400 cursor-not-allowed"}>
      <ShoppingCart
        className="text-blue-500 hover:text-blue-700"
        size={24}
      />
    </div>
  );
}
