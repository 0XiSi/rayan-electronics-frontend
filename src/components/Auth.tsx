import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {KindeUser} from "@kinde-oss/kinde-auth-nextjs/types";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Auth() {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL
  return (
    <>
    {user ? (
      <>
        <Link href='/api/auth/logout' className={buttonVariants({size: 'sm', variant: 'ghost'})}>
          خروج
        </Link>
        {isAdmin ? <Link href='/dashboard' className={buttonVariants({size: 'sm', variant: 'ghost'})}>
          داشبورد ✨
        </Link> : null}
        <Link href='/cart'
              className={buttonVariants({size: 'sm', className: 'hidden sm:flex items-center gap-1'})}>
          الان سفارش دهید
          <ArrowRight className='ml-1.5 h-5 w-5'/>
        </Link>

    </>
  ) : (
    <>
      <Link href='/api/auth/login' className={buttonVariants({size: 'sm', variant: 'ghost'})}>
        ثبت نام
      </Link>
      <Link href='/api/auth/login' className={buttonVariants({size: 'sm', variant: 'ghost'})}>
        ورود
      </Link>
      <div className='h-8 w-px bg-zinc-200 hidden sm:block'/>
      <Link href='/cart'
            className={buttonVariants({size: 'sm', className: 'hidden sm:flex items-center gap-1'})}>
        الان سفارش دهید
        <ArrowRight className='ml-1.5 h-5 w-5'/>
      </Link>
    </>
  )}
    </>
  )
}