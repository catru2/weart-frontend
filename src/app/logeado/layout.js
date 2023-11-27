import Navbarinicio from "@/components/Navbarinicio"

function LayoutPage({children}) {
  return (
    <div>
        <Navbarinicio/>
        {children}
    </div>
  )
}

export default LayoutPage