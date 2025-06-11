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
const formSchema = z.object({
   answers: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'Bitte wählen Sie mindestens eine Option aus.',
   }),
})

const MultipleChoice = ({ options, answer, points }: QuestionTypeProps) => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         answers: [],
      }
   })
   const {addPoints, removePoints} = useQuiz()
   const onSubmit = (values: z.infer<typeof formSchema>) => {
      
      const {answers} = values
      answer?.forEach((item) => {
         if (answers.includes(item)) {
            addPoints(points || 0)
         } else {
            removePoints(points || 0)
         }
      })


   }

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
            <Button type='submit' className="bg-brand">Abschicken</Button>
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
