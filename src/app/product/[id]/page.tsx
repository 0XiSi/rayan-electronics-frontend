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

export default function ProductDetails({params}) {
  const id = params.id;
  console.log(id)

  const product = data.products.find((p) => p.id.toString() === id);
  const imgLen = product.image.length;

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="w-fit mx-auto rounded-xl my-5 bg-gray-100 drop-shadow-2xl shadow-xl shadow-gray-200 flex flex-row-reverse p-5">
      {/*<img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-md" />*/}
      <Carousel className="w-fit max-w-xs m-10">
        <CarouselContent>
          {Array.from({length: imgLen}).map((_, index) => (
            <CarouselItem key={index}>
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
        <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      <div className={'p-5'}>
        <h1 className="text-4xl font-bold mt-6 flex justify-end">{product.name}</h1>
        <div className="mt-6 flex justify-end flex-col">
        <span className="text-3xl font-bold text-gray-900 flex flex-row justify-end items-center gap-x-10">

          <div className={'flex flex-row items-center justify-start'}>
            <svg
            className="text-gray-500 font-light mr-1 scale-150" width="14" height="14"><use href="#toman"/>
            </svg>
          {product.price}
            {product.discount && (
            <>
              <span className="text-lg text-gray-400 line-through ml-4">{product.discount}</span><Badge
              className="ml-2 rounded-xl w-fit"
              variant="destructive">{((1 - (product.discount / product.price)) * 100).toFixed(0)}%</Badge>
            </>
          )}
          </div>
          <ProductRate rate={product.rating} count={product.numReviews}/></span>

        </div>
        <div className="mt-6">
          {/*<p>Stock: {product.countInStock}</p>*/}
        </div>
        <div className="text-xl text-gray-700 mt-4">{product.description}</div>
      </div>
    </div>
  );
}
