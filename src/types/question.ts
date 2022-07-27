export type Question = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  userAnswer?: string
  id?: number
  answerTime?: number
}

export interface QuestionsResponse {
  response_code: number
  results: Question[]
}
