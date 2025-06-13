import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form'

import type { QuestionTypeProps } from '@/types/types'
import React, { useRef, useEffect } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { Input } from './ui/input'

function generateZodSchema(formItems: Array<string>) {
   const schema: Record<string, z.ZodType<unknown>> = {}
   formItems.forEach((_, index) => {
      const fieldSchema = z.string().optional()
      schema[index] = fieldSchema
   })
   return z.object(schema)
}

const TextQuestion = ({
   ref,
   showNext,
   answer,
   points,
}: QuestionTypeProps) => {
   const formSchema = generateZodSchema(answer!)
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         answers: [],
      },
   })

   const refs = useRef(
      Array.from({ length: answer!.length }, () =>
         React.createRef<HTMLInputElement>()
      )
   )

   useEffect(() => {
      refs.current = []
      answer?.forEach(() => {
         refs.current.push(React.createRef<HTMLInputElement>())
      })
   })
   const { addPoints, setAnsweredQuestions } = useQuiz()

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      const correctAnswers : string[]  = []
      setAnsweredQuestions()
      const valueArray = Object.values(values).filter(
         (value) => value !== undefined && value !== null && value !== '').map(val => (val as string).trim().toLowerCase())
      valueArray.forEach((item) => {
         if (!correctAnswers.includes(item)) {
            if (answer?.map(val => val.toLowerCase())?.includes(item)) {
               addPoints(points || 0)
               correctAnswers.push(item)
            }
         }
      })
      if (ref.current) {
         ref.current.disabled = true
         ref.current.classList.add('opacity-50', 'cursor-not-allowed')
      }

      refs.current.forEach((ref) => {
         if (ref.current) {
            // ref.current.disabled = true
            const inputValue = ref.current.value.trim().toLowerCase()
            if (correctAnswers.includes(inputValue)) {
               ref.current.classList.add('right-choice')
            } else {
               ref.current.classList.add('wrong-choice')
            }
         }
      })

      showNext()
      
   }

   useEffect(() => {
      for (let i = 0; i < answer!.length; i++) {
         form.resetField(i.toString())
      }
   }, [answer, form])

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid w-full gap-2'
         >
            {answer?.map((_, index) => (
               <FormField
                  key={index}
                  control={form.control}
                  name={index.toString()}
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              {...field}
                              value={typeof field.value === 'string' ? field.value : field.value === undefined || field.value === null ? '' : String(field.value)}
                              defaultValue=""
                              ref={refs.current[index]}
                              placeholder='Deine Antwort'
                              className='w-full'
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            ))}

            <Button type='submit' className='bg-brand cursor-pointer' ref={ref}>
               Abschicken
            </Button>
         </form>
      </Form>
   )
}

export default TextQuestion
