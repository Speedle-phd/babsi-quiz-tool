import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'
import { axiosInstance } from '@/lib/axios'
import { useEffect, useState } from 'react'
import type { DatabaseEntry } from './SubmitResults'

const Rankings = () => {

   const [data, setData] = useState([])
   const fetchData = async () => {
      try {
         const response = await axiosInstance.get('')
         setData(response.data)
         
      } catch (error) {
         console.error('Error fetching rankings:', error)
      }
   }

   useEffect(() => {
      fetchData()
   })

   return (
      <Table>
         <TableCaption>Rangliste</TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead className=''>Vorname</TableHead>
               <TableHead>Nachname</TableHead>
               <TableHead className='text-right'>Score</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {(data as DatabaseEntry[])?.sort((a, b) => b.score - a.score).map((entry, index) => {
               return (
                  <TableRow key={index}>
                     <TableCell className='font-medium'>{entry.vorname}</TableCell>
                     <TableCell>{entry.nachname}</TableCell>
                     <TableCell className='text-right'>{entry.score}</TableCell>
                  </TableRow>
               )
            })}
            {/* <TableRow>
               <TableCell className='font-medium'>INV001</TableCell>
               <TableCell>Paid</TableCell>
               <TableCell>Credit Card</TableCell>
               <TableCell className='text-right'>$250.00</TableCell>
            </TableRow> */}
         </TableBody>
      </Table>
   )
}

export default Rankings
