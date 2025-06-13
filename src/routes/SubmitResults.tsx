import { axiosInstance } from '@/lib/axios'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,

   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useQuiz } from '@/context/QuizContext'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const formSchema = z.object({
   nachname: z.string().min(1, 'Nachname ist erforderlich'),
   vorname: z.string().min(1, 'Vorname ist erforderlich'),
   email: z.string().email('Ungültige E-Mail-Adresse'),
})

export type DatabaseEntry = {
   nachname: string
   vorname: string
   email: string
   score: number
}

const SubmitResults = () => {
   const [submitted, setSubmitted] = useState(false)
   const [loading, setLoading] = useState(false)
   const {answeredQuestions, score, resetAnsweredQuestions, resetScore} = useQuiz()
   const navigate = useNavigate()
   // Redirect to quiz if not all questions are answered

   if (answeredQuestions < 11) {
      navigate('/quiz', { replace: true })
   }
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         nachname: '',
         vorname: '',
         email: '',
      },
   })

   const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setLoading(true)
      const { nachname, vorname, email } = data
      try {
         const { data: alreadySubmitted} = await axiosInstance.get("")
         console.log(alreadySubmitted)

         alreadySubmitted.forEach((item : DatabaseEntry) => {
            if (item.email === email) {
               setSubmitted(true)
               return
            }
         })

         const entry: DatabaseEntry = {
            nachname,
            vorname,
            email,
            score,
         }

         await axiosInstance.post('', entry)
         setSubmitted(true)
         resetAnsweredQuestions()
         resetScore()
         navigate('http://localhost:5173', { replace: true })

      } catch (error) {
         console.log('Error submitting results:', error)
      } finally {
         setLoading(false)
         
      }
   }

   

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid w-full gap-6'
         >
            <FormField
               control={form.control}
               name='nachname'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nachname</FormLabel>
                     <FormControl>
                        <Input placeholder='Nachname' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='vorname'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Vorname</FormLabel>
                     <FormControl>
                        <Input placeholder='Vorname' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='email'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>E-Mail</FormLabel>
                     <FormControl>
                        <Input placeholder='E-Mail' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button disabled={submitted} type='submit' className='bg-brand cursor-pointer'>
               {loading ? 'Sende Ergebnis...' : 'Ergebnis senden'}
            </Button>
         </form>
      </Form>
   )
}

export default SubmitResults
