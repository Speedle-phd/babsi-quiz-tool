import type { QuestionTypeProps } from '@/types/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { useEffect, useRef } from 'react'
import React from 'react'
import { useQuiz } from '@/context/QuizContext'
const formSchema = z
   .object({
      answer: z.string(),
   })
   .refine((value) => value.answer !== '', {
      message: 'Bitte wählen Sie eine Option aus.',
   })
const SingleChoice = ({
   options,
   answer,
   points,
   showNext,
   ref,
}: QuestionTypeProps) => {
   const { addPoints, setAnsweredQuestions } = useQuiz()
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
   })

   const refs = useRef(
      Array.from({ length: options!.length }, () =>
         React.createRef<HTMLButtonElement>()
      )
   )

   useEffect(() => {
      refs.current = []
      options?.forEach(() => {
         refs.current.push(React.createRef<HTMLButtonElement>())
      })
   })

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      const { answer: selectedAnswer } = values
      setAnsweredQuestions()
      if (answer?.includes(selectedAnswer)) {
         addPoints(points || 0)
      }
      if (ref.current) {
         ref.current.disabled = true
         ref.current.classList.add('opacity-50', 'cursor-not-allowed')
      }
      refs.current.forEach((ref) => {
         if (ref.current) {
            ref.current.disabled = true
            const option =
               ref.current.nextElementSibling?.nextElementSibling?.textContent
            if (option && answer?.includes(option)) {
               ref.current.parentElement?.classList.add('right-choice')
            } else {
               ref.current.parentElement?.classList.add('wrong-choice')
            }
         }
      })
      showNext()
   }

   useEffect(() => {
      form.resetField('answer')
   }, [options, form])

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid w-full gap-6'
         >
            <FormField
               control={form.control}
               name='answer'
               render={({ field }) => (
                  <FormItem className='space-y-3'>
                     <FormControl>
                        <RadioGroup
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                           className='flex flex-col'
                        >
                           {options?.map((option) => (
                              <FormItem
                                 key={option}
                                 className='flex items-center gap-3'
                              >
                                 <FormControl>
                                    <RadioGroupItem
                                       value={option}
                                       ref={
                                          refs.current[options.indexOf(option)]
                                       }
                                    />
                                 </FormControl>
                                 <FormLabel className='font-normal'>
                                    {option}
                                 </FormLabel>
                              </FormItem>
                           ))}
                           
                        </RadioGroup>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type='submit' className='bg-brand cursor-pointer' ref={ref}>
               Abschicken
            </Button>
         </form>
      </Form>
   )
}

export default SingleChoice
