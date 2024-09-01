import Navbar from "@/components/Navbar";

export default function App({children, className}: {children:any, className:string}) {

  return (
    <div>
      <Navbar/>
      <div className={'flex justify-end items-end'}>{children}</div>
    </div>
  )
}