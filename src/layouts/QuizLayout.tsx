import ModeToggle from '@/components/ModeToggle'
import QuizLandingPage from '@/components/QuizLandingPage'
import { Card } from '@/components/ui/card'

import { useQuiz } from '@/context/QuizContext'
import { Outlet, useLocation } from 'react-router'



const QuizLayout = () => {
   const { score } = useQuiz()
   const {pathname} = useLocation()
   
   return (
      <>
         <ModeToggle className='left-4 right-[unset]' />
         <div className='flex items-center justify-center min-h-screen w-[clamp(20rem,80vw,70rem)] mx-auto px-4'>
            <aside className='absolute right-4 top-4 z-50 border-2 border-brand rounded-sm py-2 px-4'>
               <div className='text-md font-semibold'>
                  Score:{' '}
                  <span className='ml-4 text-lg text-brand font-extrabold'>
                     {score}
                  </span>
               </div>
            </aside>
            <Card className='py-10 w-full max-w-2xl mx-auto shadow-md shadow-brand'>
               {pathname.endsWith('quiz') ? <QuizLandingPage /> : <div className="p-4">
                  <Outlet />
               </div>}
            </Card>
         </div>
      </>
   )
}

export default QuizLayout
