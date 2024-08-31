'use client';
import Image from 'next/image';
import ProductRate from '@/components/ProductRate';
import {useEffect} from "react";
import AddToCart from "@/components/AddToCart";
import {Icons} from "@/components/Icons";
import {Badge} from "@/components/ui/badge"; // Adjust the import path as necessary

const ProductCard = ({ imageSrc, label, price, description, id, rating, numReviews, countInStock, discount }) => {
  const product = { imageSrc, label, price, description, id, rating, numReviews, countInStock };
  useEffect(() => {
    console.log(product)
  }, []);
  return (
    <div className="bg-gradient-to-t from-white to-blue-500 from-10% rounded-lg drop-shadow-2xl shadow-l shadow-gray-200 overflow-hidden w-80 transition-all hover:scale-110 ">
      <div className="relative">
        <div className="absolute top-2 left-2 bg-white p-1 rounded-lg shadow">
          <AddToCart product={product}/>
        </div>
        <Image
          src={imageSrc[0]}
          alt={label}
          className="object-cover"
          width={320}
          height={240}
        />

      </div>

      <div className="p-4">
        <div className="flex h-20 items-center justify-between border-b border-zinc-200">
          <h3
            className="mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-3xl md:text-4xl text-gray-900">
            {label}
          </h3>
          <ProductRate rate={rating} count={numReviews}/>
        </div>
        {/*<p className="text-gray-500 mt-2">{description}</p>*/}

        <div className="text-blue-500 mt-2 font-black flex justify-between items-center">
          <div className="flex items-center">
            <svg className="text-gray-500 font-light mr-1 h-5 w-5" width="14" height="14">
              <use href="#toman"/>
            </svg>
            <span>{price.toLocaleString()}</span>
          </div>
          <Badge className="scale-90 rounded-xl" variant="destructive">{((1 - (discount / price)) * 100).toFixed(0)}%</Badge>
        </div>
        <span className="line-through text-gray-400 text-sm ml-6 font-normal">{discount.toLocaleString()}</span>
      </div>

    </div>
  );
};

export default ProductCard;
