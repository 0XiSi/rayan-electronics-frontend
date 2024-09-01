import Navbar from "@/components/Navbar";

export default function App({children}: {children:any}) {

  return (
    <div>
      <Navbar/>
      <div>{children}</div>
    </div>
  )
}