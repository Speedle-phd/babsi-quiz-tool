import { ThemeProvider } from '@/components/theme-provider'
import ModeToggle from '@/components/ModeToggle'
function App() {
   
   return (
      <ThemeProvider>
         <ModeToggle />
         
         
         <h1 className="text-brand">Hey Babsi</h1>

      </ThemeProvider>
   )
}
export default App
