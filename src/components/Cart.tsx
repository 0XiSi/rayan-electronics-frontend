'use client'
import {clearCart, removeItem} from '@/redux/slices/CartSlice';
import { useSelector, useDispatch } from 'react-redux';
import {ShoppingCart} from "lucide-react";
import {Badge} from '@/components/ui/badge'
import Cookies from "js-cookie";
import Link from "next/link";
import {useEffect, useState} from "react";
import { RootState } from '@/redux/store';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart">
      <div className="relative">
        <div className="bg-white p-1 rounded-lg shadow">
          <ShoppingCart className="w-8 h-8 text-gray-800" />
          {mounted && cartItems.length > 0 && (
            <Badge
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              {cartItems.length}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};
export default Cart;
