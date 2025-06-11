import { useParams } from 'react-router'
import myData from '../assets/data.json'
import Accent from '@/components/Accent'
import Question from '@/components/Question'
import type { QuizType } from '@/types/types'


const Quiz = () => {
   const { quizId } = useParams<{ quizId: string }>()
   if (!quizId) {
      return <div>Keine ID vorzufinden.</div>
   }
   const { questions } = myData
   const quiz = questions.find((q) => q.id === +quizId) as QuizType
   if( !quiz ) {
      return <div>Unter dieser <Accent>ID</Accent> ist keine Frage zu finden.</div>
   }



   return (
      <Question quiz={quiz} />
   )
}

export default Quiz
