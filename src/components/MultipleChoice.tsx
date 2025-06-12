import type { QuestionTypeProps } from '@/types/types'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
   Form,
   FormControl,

   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from './ui/form'

import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { useQuiz } from '@/context/QuizContext'
import React, { useEffect, useRef } from 'react'
const formSchema = z.object({
   answers: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'Bitte wählen Sie mindestens eine Option aus.',
   }),
})

const MultipleChoice = ({ options, answer, points, showNext, ref }: QuestionTypeProps) => {
   // const submitRef = React.useRef<HTMLButtonElement>(null)
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         answers: [],
      }
   })

   const refs = useRef(
      Array.from({ length: options!.length }, () => React.createRef<HTMLButtonElement>())
   )

   useEffect(() => {
      refs.current = []
      options?.forEach(() => {
         refs.current.push(React.createRef<HTMLButtonElement>())
      })
   })

   const {addPoints, removePoints, setAnsweredQuestions} = useQuiz()
   const onSubmit = (values: z.infer<typeof formSchema>) => {
      setAnsweredQuestions()
      const {answers} = values
      answers?.forEach((item) => {
         if (answer?.includes(item)) {
            addPoints(points || 0)
         } else {
            removePoints(points || 0)
         }
      })
      if (ref.current) {
         ref.current.disabled = true
         ref.current.classList.add('opacity-50', 'cursor-not-allowed')
      }
      refs.current.forEach((ref) => {
         if (ref.current) {
            ref.current.disabled = true
            const option = ref.current.nextElementSibling?.nextElementSibling?.textContent
            if (option && answer?.includes(option)) {
               ref.current.parentElement?.classList.add('right-choice')
            } else {
               ref.current.parentElement?.classList.add('wrong-choice')
            }
         }
      })
      showNext!()
      
      
   }
   useEffect(() => {
      form.resetField("answers")
   },[options, form])
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-6">
            <FormField
               control={form.control}
               name='answers'
               render={() => (
                  <FormItem>
                     {options?.map((item) => (
                        <FormField
                           key={item}
                           control={form.control}
                           name='answers'
                           render={({ field }) => {
                              console.log(field.value)
                              return (
                                 <FormItem
                                    key={item}
                                    className='flex flex-row items-center gap-2'
                                 >
                                    <FormControl>
                                       <Checkbox
                                          className="check:bg-brand"
                                          ref={refs.current[options.indexOf(item)]}
                                          checked={field.value?.includes(item)}
                                          onCheckedChange={(checked) => {
                                             return checked
                                                ? field.onChange([
                                                     ...field.value,
                                                     item,
                                                  ])
                                                : field.onChange(
                                                     field.value?.filter(
                                                        (value) =>
                                                           value !== item
                                                     )
                                                  )
                                          }}
                                       />
                                    </FormControl>
                                    <FormLabel className='text-lg font-normal'>
                                       {item}
                                    </FormLabel>
                                 </FormItem>
                              )
                           }}
                        />
                     ))}
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type='submit' className="bg-brand cursor-pointer" ref={ref}>Abschicken</Button>
         </form>
      </Form>
   )
}

export default MultipleChoice

{
   /* {options?.map((option, index) => {
         return (
            <div key={index}>{option}</div>
         )
      })} */
}
