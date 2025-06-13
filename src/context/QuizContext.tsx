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

export const SCORE_KEY = 'quiztool_quizScore'
export const ANSWERED_QUESTIONS_KEY = 'quiztool_answeredQuestions'

type QuizContextProvider = {
   children: React.ReactNode
}

export const QuizContext = createContext<QuizContext | undefined>(undefined)

export const QuizProvider: React.FC<QuizContextProvider> = ({
   children,
}) => {
   const localStorageScore = localStorage.getItem(SCORE_KEY)
   const initialScore = localStorageScore ? parseInt(localStorageScore, 10) : 0
   const [score, setScore] = useState<number>(initialScore)

   const localStorageAnsweredQuestions = localStorage.getItem(
      ANSWERED_QUESTIONS_KEY
   )
   const initialAnsweredQuestions = localStorageAnsweredQuestions
      ? parseInt(localStorageAnsweredQuestions, 10)
      : 0
   const [answeredQuestions, setAnsweredQuestions] = useState<number>(initialAnsweredQuestions)

   const contextValue: QuizContext = {
      score,
      addPoints: (n : number) => {
         setScore((prevScore) => {
            const newScore = prevScore + n
            localStorage.setItem(SCORE_KEY, newScore.toString())
            return newScore
         })

      },
      removePoints: (n : number) => {
         setScore((prevScore) => {
            const newScore = Math.max(prevScore - n, 0)
            localStorage.setItem(SCORE_KEY, newScore.toString())
            return newScore
         })
      },
      resetScore: () => {
         setScore(0)
         localStorage.setItem(SCORE_KEY, '0')
      },
      answeredQuestions,
      // Increment the answered questions count
      setAnsweredQuestions: () => {
         setAnsweredQuestions((prevCount) => prevCount + 1)
         localStorage.setItem(ANSWERED_QUESTIONS_KEY, (answeredQuestions + 1).toString())
      },
      // Reset the answered questions count
      resetAnsweredQuestions: () => {
         setAnsweredQuestions(0)
         localStorage.setItem(ANSWERED_QUESTIONS_KEY, '0')
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
