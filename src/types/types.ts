export type QuestionTypeProps = {
   options?: string[]
   answer?: string[]
   points?: number
}

export type QuizType =
   | {
        id: number
        points: number
        type: "single-choice" | "multiple-choice" | "text"
        question: string
        options: string[]
        answer: string[]
     }
   | undefined