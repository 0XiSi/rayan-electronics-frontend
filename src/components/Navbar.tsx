import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {vazirMatn} from 'next-persian-fonts/vazirmatn';
import Cart from "@/components/Cart";
import Auth from "@/components/Auth";

export default function Navbar()  {

  return(
    <nav className={`${vazirMatn.className} sticky z-[100] h-20 inset-x-0 top-0 w-screen border-b border-gray-200 bg-white/25 backdrop-blur-lg transition-all`}>
      <MaxWidthWrapper>
        <div className='flex h-20 items-center justify-between '>
          <Link href='/' className='flex z-40 font-semibold'>
            <span className='text-blue-500'>Rayan</span>Electro
          </Link>

          <div className='h-full flex items-center space-x-4'>
            <Auth/>
            <Cart/>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}