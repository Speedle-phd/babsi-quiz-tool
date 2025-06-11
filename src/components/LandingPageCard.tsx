import {
   Card,

   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'

const LandingPageCard = () => {
   return (
      <Card className='w-full max-w-2xl mx-auto shadow-md shadow-brand'>
         <CardHeader className="text-center">
            <CardTitle className="text-2xl">Das illbruck Kieler Woche-Quiz</CardTitle>
            <CardDescription className="text-lg">
               Machen Sie mit und gewinnen Sie für Ihr Team!
            </CardDescription>

         </CardHeader>
         <CardContent className="flex justify-center">
            <Button className="text-lg bg-transparent text-black dark:text-white border-2 border-brand hover:bg-brand transition-colors ease-in-out cursor-pointer py-6">Hier geht's zum Quiz</Button>
         </CardContent>
         <CardFooter className="flex justify-center">
            <Button className="bg-brand" size="sm">Zur Rangliste</Button>
         </CardFooter>
      </Card>
   )
}

export default LandingPageCard
