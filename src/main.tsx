import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import AppLayout from './layouts/AppLayout.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import Quiz from './routes/Quiz.tsx'
import QuizLayout from './layouts/QuizLayout.tsx'
import { QuizProvider } from './context/QuizContext.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider>
         <QuizProvider>
            <BrowserRouter>
               <Routes>
                  <Route path='/' element={<AppLayout />}>
                     <Route index element={<App />} />
                     {/* You can add more nested routes here if needed */}
                  </Route>
                  {/* Add more routes here as needed */}
                  <Route path='quiz' element={<QuizLayout />}>
                     <Route path=':quizId' element={<Quiz />} />
                  </Route>
                  <Route path='*' element={<div>404 Not Found</div>} />
               </Routes>
            </BrowserRouter>
         </QuizProvider>
      </ThemeProvider>
   </StrictMode>
)
