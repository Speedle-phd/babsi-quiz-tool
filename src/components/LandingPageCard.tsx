import {
   Card,

   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'
import { Link } from 'react-router'

const LandingPageCard = () => {
   return (
      <Card className='py-10 w-full max-w-2xl mx-auto shadow-md shadow-brand'>
         <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>
               Das illbruck Kieler Woche-Quiz
            </CardTitle>
            <CardDescription className='text-lg'>
               Machen Sie mit und gewinnen Sie für Ihr Team!
            </CardDescription>
         </CardHeader>
         <CardContent className='flex justify-center'>
            <Link to='/quiz'>
               <Button className='text-lg bg-transparent text-black dark:text-white border-2 border-brand hover:bg-brand transition-colors ease-in-out cursor-pointer py-6'>
                  Hier geht's zum Quiz
               </Button>
            </Link>
         </CardContent>
         <CardFooter className='flex justify-center'>
            <Link to="/rankings">
               <Button className='bg-brand' size='sm'>
                  Zur Rangliste
               </Button>
            </Link>
         </CardFooter>
      </Card>
   )
}

export default LandingPageCard
