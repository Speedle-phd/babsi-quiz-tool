import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { cn } from '@/lib/utils'
type Props = {
   className?: string
}
const ModeToggle = ({className} : Props) => {
   const { setTheme } = useTheme()
   return (
      <aside
         className={cn(
            'absolute right-4 top-4 z-50 border-2 border-brand rounded-sm', className
         )}
      >
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant='outline' size='icon'>
                  <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                  <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                  <span className='sr-only'>Toggle theme</span>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
               <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </aside>
   )
}

export default ModeToggle
