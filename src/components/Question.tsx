import { Separator } from "@/components/ui/separator"
import SingleChoice from "./SingleChoice"
import MultipleChoice from "./MultipleChoice"
import TextQuestion from "./TextQuestion"


type Props = {
   quiz: {
      id: number
      points: number
      type: 'single-choice' | 'multiple-choice' | 'text'
      question: string
      options: string[]
      answer: string[]
   }
   showNext: () => void
   ref: React.RefObject<HTMLButtonElement | null>
}

const Question = ({ ref, quiz, showNext }: Props) => {
   const { id, question, options, answer, type, points } = quiz
   return (
      <div data-id={id} className='flex flex-col items-center justify-center'>
         <h2 className='text-xl'>{question}</h2>
         <Separator className='my-4' />
         {type === 'single-choice' ? (
            <SingleChoice
               ref={ref}
               showNext={showNext}
               options={options}
               answer={answer}
               points={points}
            />
         ) : type === 'multiple-choice' ? (
            <MultipleChoice
               ref={ref}
               showNext={showNext}
               options={options}
               answer={answer}
               points={points}
            />
         ) : (
            <TextQuestion />
         )}
      </div>
   )
}

export default Question
