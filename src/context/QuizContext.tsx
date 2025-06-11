'use client'

import React, { createContext, useState } from 'react'

type QuizContext = {
   score: number
   addPoints: (n: number) => void
   removePoints: (n: number) => void
   resetScore: () => void
   answeredQuestions: number
   setAnsweredQuestions: () => void
   resetAnsweredQuestions: () => void
}

type QuizContextProvider = {
   children: React.ReactNode
}

export const QuizContext = createContext<QuizContext | undefined>(undefined)

export const QuizProvider: React.FC<QuizContextProvider> = ({
   children,
}) => {
   const [score, setScore] = useState<number>(0)
   const [answeredQuestions, setAnsweredQuestions] = useState<number>(0)

   const contextValue: QuizContext = {
      score,
      addPoints: (n : number) => {
         setScore((prevScore) => prevScore + n)
      },
      removePoints: (n : number) => {
         setScore((prevScore) => Math.max(prevScore - n, 0))
      },
      resetScore: () => {
         setScore(0)
      },
      answeredQuestions,
      // Increment the answered questions count
      setAnsweredQuestions: () => {
         setAnsweredQuestions((prevCount) => prevCount + 1)
      },
      // Reset the answered questions count
      resetAnsweredQuestions: () => {
         setAnsweredQuestions(0)
      },
   }

   return (
      <QuizContext.Provider value={contextValue}>
         {children}
      </QuizContext.Provider>
   )
}

export const useQuiz = (): QuizContext => {
   const context = React.useContext(QuizContext)
   if (!context) {
      throw new Error('useQuiz must be used within a QuizProvider')
   }
   return context
}
