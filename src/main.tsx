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
import SubmitResults from './routes/SubmitResults.tsx'
import ErrorPage from './routes/ErrorPage.tsx'

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
                     <Route path='submit-results' element={<SubmitResults />} />
                     {/* <Route path='/quiz/' element={<ErrorPage />} /> */}
                  </Route>
                  <Route path='*' element={<ErrorPage />} />
               </Routes>
            </BrowserRouter>
         </QuizProvider>
      </ThemeProvider>
   </StrictMode>
)
