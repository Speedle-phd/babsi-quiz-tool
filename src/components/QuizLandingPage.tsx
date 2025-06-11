import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { CardContent, CardHeader } from '@/components/ui/card'
import Accent from './Accent'
import { Link } from 'react-router'
import { Button } from './ui/button'

const QuizLandingPage = () => {
   return (
      <>
         <CardHeader className='text-center text-2xl font-bold'>
            Regeln
         </CardHeader>
         <Separator />
         <CardContent>
            <Carousel className='border-2 border-brand rounded-md px-10 py-4 mt-2 min-h-36'>
               <CarouselContent className='text-justify text-sm'>
                  <CarouselItem>
                     Jeder Teilnehmer muss <Accent>11</Accent> Fragen
                     beantworten
                  </CarouselItem>
                  <CarouselItem>
                     Es gibt <Accent>Text-Fragen</Accent>,{' '}
                     <Accent>Single-Choice-Frage</Accent> und{' '}
                     <Accent>Multiple-Choice-Fragen</Accent>
                  </CarouselItem>
                  <CarouselItem>
                     Für jede <Accent>richtige Antwort</Accent> gibt es Punkte.
                     Für{' '}
                     <Accent>
                        falsch gesetzte Optionen bei den Multiple-Choice-Fragen
                     </Accent>{' '}
                     werden Punkte abgezogen.
                  </CarouselItem>
                  <CarouselItem>
                     Am Ende werden die Punkte aller Teilnehmer verglichen und die <Accent>drei besten</Accent> Teilnehmer erhalten einen Preis.
                  </CarouselItem>
               </CarouselContent>
               <CarouselPrevious className='left-0 text-brand' />
               <CarouselNext className='right-0 text-brand' />
            </Carousel>
         </CardContent>
         <Separator/>
         <Link to="1" className="mx-auto">
         <Button className="border-2 border-brand hover:bg-brand" variant="outline">
            Zur ersten Frage
         </Button>
         </Link>
      </>
   )
}

export default QuizLandingPage
