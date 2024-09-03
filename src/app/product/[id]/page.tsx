'use client'
import { data } from "@/utils/data";
import {Badge} from "@/components/ui/badge";
import ProductRate from "@/components/ProductRate";import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {Card, CardContent} from "@/components/ui/card";
import {ChevronLeft} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useRouter} from "next/navigation";

export default function ProductDetails({params}) {
  const id = params.id;
  console.log(id)
  const router = useRouter()
  const product = data.products.find((p) => p.id.toString() === id);
  const imgLen = product.image.length;

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div
      className="w-fit mx-auto rounded-xl my-5 bg-gray-100 drop-shadow-2xl shadow-xl shadow-gray-200 flex flex-col lg:flex-row-reverse p-0 lg:p-5 items-center">
      <Carousel className="w-screen max-w-xs m-10 lg:w-1/2">
        <CarouselContent>
          {Array.from({length: imgLen}).map((_, index) => (
            <CarouselItem key={index} onClick={() => router.push(product.image[index])}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={product.image[index]} className="text-4xl font-semibold"/>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
      <div className={'p-5'}>
        <h1 className="text-4xl font-bold mt-6 flex justify-end">{product.name}</h1>
        <div className="mt-6 flex justify-end flex-col">
        <span className="text-3xl font-bold text-gray-900 flex flex-row justify-end items-center gap-x-10">
          <div className={'flex flex-row items-center justify-start'}>
            <svg className="text-gray-500 font-light mr-1 w-7 h-7" width="14" height="14"><use href="#toman"/></svg>
            <label className={'text-blue-500'}>{product.discount.toLocaleString()}</label>
            {product.discount && (
              <>
                <span className="text-lg text-gray-400 line-through ml-4">{product.price.toLocaleString()}</span>
                <Badge className="ml-2 rounded-xl w-fit" variant="destructive">
                  {((1 - (product.discount / product.price)) * 100).toFixed(0)}%
                </Badge>
              </>
            )}
          </div>
          <ProductRate rate={product.rating} count={product.numReviews}/>
        </span>
        </div>
        <div className="text-xl text-gray-700 mt-4">
          {product.description.map((desc, index) => (
          <div key={index} className={'flex flex-col'}>
            <div className=" flex flex-row-reverse items-center">
              <div className="font-normal">
                <ChevronLeft />
              </div>
              <p>{desc}</p>
            </div>
            {index < product.description.length - 1 && (
              <Separator className="border-2 m-3 border-gray-300" />
            )}
          </div>
        ))}
        </div>
      </div>
    </div>

  );
}
