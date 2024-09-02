import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {ArrowRight, BadgeCheck, Check, PackageCheck, Shield, Star, Users, Wrench} from "lucide-react";
import Phone from "@/components/Phone";
import {Icons} from "@/components/Icons";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {vazirMatn} from "next-persian-fonts";
import {data} from "@/utils/data";
import Spline from "@splinetool/react-spline/next";

export default function Home() {
  const {products} = data
  return (
    <div className={'overflow-x-hidden'}>
      <main className={`${vazirMatn.className} mb-auto bg-slate-50 flex flex-col`}>
        <section>
          <MaxWidthWrapper className={`mb-3 pt-10 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32`}>
            <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
              <div className='relative z-1 mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
                <div className='absolute w-28 left-0 -top-20 hidden lg:block z-10 size-110'>
                  <img src='/logo.png' className='w-full scale-150'/>
                </div>
                <h1
                  className={`w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl z-10`}>ساخت
                  تابلو <span className="text-7xl font-extrabold text-blue-600"> سفارشی</span> شما</h1>
                <p
                  className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap z-10">تابلو
                  دیجیتال مدنظرتون  رو از فروشگاه آنلاین یا با توجه به نیاز ، تابلو <span
                    className="font-semibold">سفارشی </span>
                  خودتون رو دریافت کنید</p>
                <ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start z-10'>
                  <div className='space-y-2'>
                    <li className='flex gap-1.5 items-center text-left'>
                      <Check className='h-5 w-5 shrink-0 text-blue-500'/> کیفیت بالا، جنس مورد اطمینان
                    </li>
                    <li className='flex gap-1.5 items-center text-left'>
                      <Check className='h-5 w-5 shrink-0 text-blue-500'/>
                      دارای گارانتی
                    </li>
                    <li className='flex gap-1.5 items-center text-left'>
                      <Check className='h-5 w-5 shrink-0 text-blue-500'/>
                      کنترل با وایفای
                    </li>
                  </div>
                </ul>
                <div className='mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5 z-10'>
                  <div className='flex -space-x-4'>
                    <img className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100' src="/users/user-1.jpg"
                         alt='user img'/>
                    <img className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100' src="/users/user-2.jpg"
                         alt='user img'/>
                    <img className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100' src="/users/user-3.jpg"
                         alt='user img'/>
                    <img className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100' src="/users/user-4.jpg"
                         alt='user img'/>
                    <img className='inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100'
                         src="/users/user-5.jpg" alt='user img'/>
                  </div>
                  <div className='flex flex-col justify-between items-center sm:items-start'>
                    <div className='flex gap-0.5'>
                      <Star className='h-4 w-4 text-blue-600 fill-blue-500'/>
                      <Star className='h-4 w-4 text-blue-600 fill-blue-500'/>
                      <Star className='h-4 w-4 text-blue-600 fill-blue-500'/>
                      <Star className='h-4 w-4 text-blue-600 fill-blue-500'/>
                      <Star className='h-4 w-4 text-blue-600 fill-blue-500'/>
                    </div>
                    <p><span className='font-semibold'>1,250</span> happy customers</p>
                  </div>
                </div>
                {/*<div className={'z-auto w-full h-full absolute blur-xl'}>*/}
                {/*  <Spline scene={'/scene (1).splinecode'}/>*/}
                {/*</div>*/}
                {/*<div className={'z-auto w-full h-full absolute '}>*/}
                {/*  <Spline scene={'/scene (1).splinecode'}/>*/}
                {/*</div>*/}
              </div>

            </div>
            <div
              className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
              <div className='relative md:max-w-xl'>
                <img src='/line.png' className='absolute w-20 -left-6 -bottom-6 select-none ' alt='yo'/>
                <Phone className='w-64 rounded-lg' imgSrc='/b-sade-digital-wall-clock.webp'/>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
        <section>
          <MaxWidthWrapper className='py-24 z-1'>
            <div className='mb-12 px-6 lg:px-8'>
              <div className='mx-auto max-w-2xl sm:text-center'>
                <h2
                  className='relative order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                  محصولات
                </h2>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-wrap gap-6 justify-center">
                {products.map((product) => (
                    <div className="relative" key={product.key}>
                      <ProductCard
                        imageSrc={product.image}
                        label={product.name}
                        price={product.price}
                        description={product.description}
                        id={product.id}
                        rating={product.rating}
                        numReviews={product.numReviews}
                        countInStock={product.countInStock}
                        discount={product.discount}
                      />
                    </div>
                ))}
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
        <section className='bg-gray-200 py-24'>
          <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
            <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
              <h2
                className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                          <span className='relative px-2'>مشتری{' '}<Icons.underline
                            className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-blue-500'/></span>هامون
                چی میگن</h2>
              <Users size={70} color="#246bf9" strokeWidth={2.25}/>
            </div>
            <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16'>
              <div className='flex flex-auto flex-col gap-2 lg:pr-8 xl:pr-20'>
                <div className='flex gap-0.5 '>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                </div>
                <div className='text-lg leading-8'>
                  <p>
                    {"\""} <span
                    className='p-0.5 m-1 bg-slate-800 text-white'>خوشکله</span> و کنترلش آسونه{"\""}
                  </p>
                </div>
                <div className='flex gap-4 mt-2'>
                  <img src="/users/user-1.jpg" className='rounded-full h-12 w-12' alt="user"/>
                  <div className='flex flex-col'>
                    <p className='font-semibold text-gray-500'>اسکندر</p>
                    <div className='flex gap-1.5 items-center text-zinc-600'>
                      <Check className='h-4 w-4 stroke-[3px] text-blue-300'/>
                      <p className='text-small text-gray-500'>Verified</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* seconds user review */}
              <div className='flex flex-auto flex-col gap-2 lg:pr-8 xl:pr-20'>
                <div className='flex gap-0.5'>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                </div>
                <div className='text-lg leading-8'>
                  <p>
                    {"\""}زود به دستم رسید و کیفیتش{"  "}<span
                    className='p-0.5 bg-slate-800 text-white'>عالیه</span>{"\""}
                  </p>
                </div>
                <div className='flex gap-4 mt-2'>
                  <img src="/users/user-2.jpg" className='rounded-full h-12 w-12' alt="user"/>
                  <div className='flex flex-col'>
                    <p className='font-semibold'>صغری</p>
                    <div className='flex gap-1.5 items-center text-zinc-600'>
                      <Check className='h-4 w-4 stroke-[3px] text-blue-600'/>
                      <p className='text-small'>Verified</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* seconds user review */}
              <div className='flex flex-auto flex-col gap-2 lg:pr-8 xl:pr-20'>
                <div className='flex gap-0.5'>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                  <Star className='h-5 w-2 text-blue-600 fill-blue-500'/>
                </div>
                <div className='text-lg leading-8'>
                  <p>
                    {"\""}قیمتشون خیلی{"  "}<span
                    className='p-0.5 bg-slate-800 text-white'>مناسبه</span> دستتون درد نکنه بِوَم{"\""}
                  </p>
                </div>
                <div className='flex gap-4 mt-2'>
                  <img src="/users/user-5.jpg" className='rounded-full h-12 w-12 object-cover ' alt="user"/>
                  <div className='flex flex-col'>
                    <p className='font-semibold'>غلی</p>
                    <div className='flex gap-1.5 items-center text-zinc-600'>
                      <Check className='h-4 w-4 stroke-[3px] text-blue-600'/>
                      <p className='text-small'>Verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
            <li className='w-fit'>
              <BadgeCheck className='h-5 w-5 text-blue-600 inline mr-1.5'/>
              کیفیت مطمئن
            </li>
            <li className='w-fit'>
              <Wrench className='h-5 w-5 text-blue-600 inline mr-1.5'/>
              بدون خرابی
            </li>
            <li className='w-fit'>
              <PackageCheck className='h-5 w-5 text-blue-600 inline mr-1.5'/>
              تحویل سریع
            </li>
            <li className='w-fit'>
              <Shield className='h-5 w-5 text-blue-600 inline mr-1.5'/>
              گارانتی
            </li>
            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  size: 'lg',
                  className: 'mx-auto mt-8',
                })}
                href='/configure/upload'>
                الان سفارش دهید <ArrowRight className='h-4 w-4 ml-1.5'/>
              </Link>
            </div>
          </ul>

          </MaxWidthWrapper>
        </section>
      </main>
    </div>
  );
}
