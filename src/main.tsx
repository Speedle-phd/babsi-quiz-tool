import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import AppLayout from './layouts/AppLayout.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider>
         <BrowserRouter>
            <Routes>
               <Route path='/' element={<AppLayout />}>
                  <Route index element={<App />} />
                  {/* You can add more nested routes here if needed */}
               </Route>
               {/* Add more routes here as needed */}
            </Routes>
         </BrowserRouter>
      </ThemeProvider>
   </StrictMode>
)
