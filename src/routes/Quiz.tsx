import { Link, useNavigate, useParams } from 'react-router'
import myData from '../assets/data.json'
import Accent from '@/components/Accent'
import Question from '@/components/Question'
import type { QuizType } from '@/types/types'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import { useQuiz } from '@/context/QuizContext'


const Quiz = () => {

   const {answeredQuestions} = useQuiz()
   const navigate = useNavigate()
   const asideRef = useRef<HTMLElement>(null)
   const submitRef = useRef<HTMLButtonElement>(null)
   const { quizId } = useParams<{ quizId: string }>()
   useEffect(() => {
      if (quizId && +quizId <= answeredQuestions) {
         navigate(`/quiz/${answeredQuestions + 1}`, { replace: true })
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [quizId])
   if (!quizId) {
      return <div>Keine ID vorzufinden.</div>
   }
   const { questions } = myData
   const quiz = questions.find((q) => q.id === +quizId) as QuizType
   if( !quiz ) {
      return <div>Unter dieser <Accent>ID</Accent> ist keine Frage zu finden.</div>
   }


   const showNextButton = () => {
      if (asideRef.current) {
         asideRef.current.classList.remove('-bottom-10')
         asideRef.current.classList.add('bottom-5', 'transition-all', 'duration-300')
      }
   }
   const hideNextButton = () => {
      if (asideRef.current) {
         asideRef.current.classList.remove('bottom-5', 'transition-all', 'duration-300')
         asideRef.current.classList.add('-bottom-10')
      }

      submitRef.current!.disabled = false
      submitRef.current!.classList.remove('opacity-50', 'cursor-not-allowed')
   }

   return (
      <>
      <aside ref={asideRef} className="absolute -bottom-10 left-1/2 -translate-x-1/2">
      <Link to={`/quiz/${quiz.id + 1}`} className="mx-auto" replace={true}>
         <Button onClick={hideNextButton} className="cursor-pointer" variant="outline">
            Zur nächsten Frage
         </Button>
      </Link>
      </aside>
      <Question ref={submitRef} showNext={showNextButton} quiz={quiz} />
      </>
   )
}

export default Quiz
