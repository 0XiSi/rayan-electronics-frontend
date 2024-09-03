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
    <div className={`${vazirMatn.className} relative w-fit h-fit flex flex-col justify-end`}>
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
      <div className="bg-white rounded-xl shadow-xl w-fit h-fit text-center m-5">
        {cartItems.length === 0 ? (
          <div className={'flex flex-row justify-center m-10 text-blue-500'}><Smile className={'mx-2'}/><p className={''}>اول یچیزی بزار اینجا</p></div>
        ) : (
          <div className={'flex flex-row-reverse justify-center items-center'}>
            <div className={''}>{cartItems.map((item) => (
              <div key={item.key} className={'border-b border-gray-200 flex flex-col items-end justify-end p-8 gap-y-2'}>
                <div className={'flex flex-row-reverse justify-start items-start'}>
                  <img
                    src={item.imageSrc[0]}
                    alt={item.name}
                    className="w-1/3 h-1/3 sm:w-1/6 lg:h-1/6 object-cover"/>
                  <div className="text-left m-2">
                    <h2 className="font-light">{item.label}</h2>
                  </div>
                </div>
                <div className={'flex flex-row-reverse gap-x-5'}>
                  <div className="flex justify-center items-center border border-gray-300 rounded-xl">
                    <button
                      onClick={() => dispatch(addItem({...item, quantity: item.quantity - 1}))}
                      className="text-gray-800 px-2 py-1 rounded-lg"
                      disabled={item.quantity <= 1} // Disable button if quantity is 1 or less
                    >
                      -
                    </button>
                    <span className="w-5 text-center">{item.quantity.toLocaleString()}</span>
                    <button
                      onClick={() => dispatch(addItem({...item, quantity: item.quantity + 1}))}
                      className="text-gray-800 px-2 py-1 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className={'flex flex-row-reverse'}><div className={'font-light'}>{(item.price * item.quantity).toLocaleString()}</div> <svg className="text-gray-500 h-4 w-4 mr-2"><use href="#toman"/></svg></div>
                </div>
              </div>
            ))}</div>
            <div className="h-fit w-fit flex flex-col items-center justify-center ml-8 p-4 mr-8 md:ml-40 md:p-2 md:mr-56 border border-gray-300 rounded-xl">
              <p className="text-md md:text-lg font-semibold">جمع کل</p>
              <p className="text-md md:text-xl text-blue-600 flex flex-row items-center mb-2">
              <svg className="text-gray-500 font-light mr-1 h-5 w-5">
                <use href="#toman"/>
              </svg>
              {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}{' '}
            </p>
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