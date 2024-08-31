'use client'
import {useDispatch, useSelector} from "react-redux";
import {addItem, clearCart, removeItem} from "@/redux/slices/CartSlice";
import { RootState } from '@/redux/store';
import {useEffect, useState} from "react";
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
    <div className={`${vazirMatn.className} relative m-10`}>
      <Breadcrumb className={'flex flex-col md:flex-row md:justify-end justify-end items-end m-10'}>
        <BreadcrumbList className={'text-right md:text-right pb-2 md:pb-0'}>
          <BreadcrumbItem>
             <BreadcrumbLink href={'/cart'}>
               سبد خرید
             </BreadcrumbLink>
         </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              تسویه حساب
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
          پرداخت
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      <div className="bg-white p-1 rounded-lg shadow-xl text-center h-full">

        <p className="text-lg font-semibold mt-10">جمع کل</p>
        <p className="text-xl text-blue-600">
          {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}{' '}
          <sup className="text-gray-600">تومان</sup>
        </p>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className={'flex flex-row-reverse justify-evenly items-baseline'}>
            <div className={'mr-5 w-1/2'}>
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
            <div className={'w-2/6 flex flex-col justify-evenly '}>
              <table className=" text-center table-fixed ">
                <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="p-4">جمع جزء</th>
                  <th className="p-4">محصول</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="p-4 text-blue-600 align-middle">
                      {(item.price * item.quantity).toLocaleString()} <sup className="text-gray-600">تومان</sup>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center justify-between">
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
                        <div className="text-left">
                          <h2 className="text-lg font-semibold">{item.label}</h2>
                        </div>
                        <img
                          src={item.imageSrc}
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
              <div>
                <div className="w-full">
                  {/* Display the final price */}

                  {/* Add any other relevant information or buttons */}

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );


}