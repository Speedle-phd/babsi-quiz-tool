import ModeToggle from '@/components/ModeToggle'
import { Outlet } from 'react-router'

const AppLayout = () => {
   return (
      <div className="flex items-center justify-center min-h-screen w-[clamp(20rem,80vw,70rem)] mx-auto px-4">
         <ModeToggle />
         <Outlet />
      </div>
   )
}

export default AppLayout
