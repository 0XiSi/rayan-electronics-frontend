'use client'
import {useDispatch, useSelector} from "react-redux";
import {addItem, clearCart, removeItem} from "@/redux/slices/CartSlice";
import React, {useEffect, useState} from "react";
import {vazirMatn} from "next-persian-fonts";
import {Smile, X} from "lucide-react";
import {useRouter} from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { RootState } from '@/redux/store';
import {Button} from "@/components/ui/button";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch()
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter()

    useEffect(() => {
      setHasMounted(true);
    }, []);

    if (!hasMounted) {
      return null; // Or a loading spinner, if you prefer
    }

  return (
    <div className={`${vazirMatn.className} relative m-4`}>
      <Breadcrumb className={'flex flex-col md:flex-row md:justify-end justify-end items-end m-10'}>
        <BreadcrumbList className={'text-right md:text-right pb-2 md:pb-0'}>
        <BreadcrumbItem>
          پرداخت
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={"/checkout"}>
            تسویه حساب
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              سبد خرید
            </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      <div className="bg-white  rounded-lg shadow-xl text-center h-full">
        {cartItems.length === 0 ? (
          <div className={'flex flex-row justify-center m-10 text-blue-500'}><Smile className={'mx-2'}/><p className={''}>اول یچیزی بزار اینجا</p></div>
        ) : (
          <div className={'flex flex-col md:flex-row-reverse justify-center items-center'}>
            <table className="w-full text-center table-fixed">
              <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="">جمع جزء</th>
                <th className="">تعداد</th>
                <th className="">قیمت</th>
                <th className="">محصول</th>
              </tr>
              </thead>
              <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className=" text-blue-600 align-middle">
                    {(item.price * item.quantity).toLocaleString()} <sup className="text-gray-600">تومان</sup>
                  </td>
                  <td className=" align-middle">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => dispatch(addItem({...item, quantity: item.quantity - 1}))}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
                        disabled={item.quantity <= 1} // Disable button if quantity is 1 or less
                      >
                        -
                      </button>
                      <span className="mx-2 w-8 text-center">{item.quantity.toLocaleString()}</span>
                      <button
                        onClick={() => dispatch(addItem({...item, quantity: item.quantity + 1}))}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className=" align-middle text-blue-600">
                    {item.price.toLocaleString()} <sup className="text-gray-600">تومان</sup>
                  </td>
                  <td className=" align-middle">
                    <div className="flex items-center justify-evenly">
                      <div className="text-left">
                        <h2 className="text-lg font-semibold">{item.label}</h2>
                      </div>
                      <img
                        src={item.imageSrc[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-red-500"
                      >
                        <X/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <div className="w-1/4 flex flex-col items-center">
              {/* Display the final price */}
              <p className="text-lg font-semibold">جمع کل</p>
              <p className="text-xl text-blue-600 flex flex-row items-center mb-2">
                <svg className="text-gray-500 font-light mr-1 h-5 w-5">
                  <use href="#toman"/>
                </svg>
                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}{' '}
              </p>
              {/* Add any other relevant information or buttons */}
              <Button
                onClick={() => router.replace('/checkout')}
                className="m-4 bg-lime-500"
              >
                ادامه
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );


}