'use client'
import {useDispatch, useSelector} from "react-redux";
import {addItem, clearCart, removeItem} from "@/redux/slices/CartSlice";
import { RootState } from '@/redux/store';
import React, {useEffect, useState} from "react";
import {vazirMatn} from "next-persian-fonts";
import {X} from "lucide-react";
import {useRouter} from "next/navigation";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Slash } from "lucide-react"

export default function Checkout() {
  const formSchema = z.object({
    name: z.string().min(3).max(50),
    last_name: z.string().min(3).max(50),
    province: z.string().min(2).max(50),
    address: z.string().min(2).max(100),
    phone_number: z.string().min(11).max(11),
    msg_phone_number: z.string().min(11).max(11),
    email: z.string().email(),
    description: z.string().min(2).max(50).optional(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const submitForm = () => {
    form.handleSubmit(onSubmit)();
  };
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
            <BreadcrumbPage>
              تسویه حساب
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
           <BreadcrumbLink href={'/cart'}>
             سبد خرید
           </BreadcrumbLink>
         </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      <div className="bg-white p-1 rounded-lg shadow-xl text-center h-full">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className={'flex flex-col items-center justify-end w-fit md:flex-row-reverse md:justify-evenly md:items-baseline'}>
            <div className={'w-fit flex flex-col'}>
              <div className={''}>{cartItems.map((item) => (
                <div key={item.key} className={'border-b border-gray-200 flex flex-col items-end justify-end p-8 gap-y-2'}>
                  <div className={'flex flex-row-reverse justify-start items-start '}>
                    <img
                      src={item.imageSrc[0]}
                      alt={item.name}
                      className="w-1/3 h-1/3 sm:w-1/6 lg:h-1/6 object-cover"/>
                    <div className="text-left m-2">
                      <h2 className="font-light">{item.label}</h2>
                    </div>
                  </div>
                  <div className={'flex flex-row-reverse gap-x-5 '}>
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
                    <div className={'flex flex-row-reverse'}>
                      <div className={'font-light'}>{(item.price * item.quantity).toLocaleString()}</div>
                      <svg className="text-gray-500 h-4 w-4 mr-2">
                        <use href="#toman"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}</div>
              <div className={'p-10'}>
                <p className="text-lg font-semibold">جمع کل</p>
                <p className="text-xl text-blue-600">
                  {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}{' '}
                  <sup className="text-gray-600">تومان</sup>
                </p>
              </div>
            </div>
            <div className={'m-10'}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-3 gap-4">
                  <FormField control={form.control} name="name" render={({field}) => (
                    <FormItem><FormLabel>نام</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>)}/>
                  <FormField control={form.control} name="last_name" render={({field}) => (<FormItem><FormLabel>نام
                    خانوادگی</FormLabel><FormControl><Input {...field}/></FormControl><FormMessage/></FormItem>)}/>
                  <FormField control={form.control} name="province" render={({field}) => (
                    <FormItem><FormLabel>استان</FormLabel><FormControl><Input {...field}/></FormControl><FormMessage/></FormItem>)}/>
                  <FormField control={form.control} name="address" render={({field}) => (
                    <FormItem><FormLabel>آدرس</FormLabel><FormControl><Input {...field}/></FormControl><FormMessage/></FormItem>)}/>
                  <FormField control={form.control} name="phone_number" render={({field}) => (<FormItem><FormLabel>شماره
                    تلفن</FormLabel><FormControl><Input {...field}/></FormControl><FormMessage/></FormItem>)}/>
                  <FormField control={form.control} name="msg_phone_number" render={({field}) => (
                    <FormItem><FormLabel>شماره واتساپ یا
                      بله</FormLabel><FormControl><Input {...field}/></FormControl><FormMessage/></FormItem>)}/>
                  <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem><FormLabel>ایمیل</FormLabel><FormControl><Input {...field}
                                                                              type={'email'}/></FormControl><FormMessage/></FormItem>)}/>
                  <FormField control={form.control} name="description" render={({field}) => (<FormItem><FormLabel>توضیحات
                    تکمیلی</FormLabel><FormControl><Input {...field}/></FormControl><FormMessage/></FormItem>)}/>

                </form>
                <button
                  onClick={submitForm}
                  className="m-20 bg-lime-500 text-white px-4 py-2 rounded-lg"
                >
                  تسویه حساب
                </button>
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );


}