import Navbar from "@/components/Navbar";

export default function App({children, className}: {children:any, className:string}) {

  return (
    <div>
      <Navbar/>
      <div>{children}</div>
    </div>
  )
}