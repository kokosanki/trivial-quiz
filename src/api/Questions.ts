import axios, { AxiosResponse } from 'axios'
import { QuestionsResponse } from '@/types/question'

const responseBody = (response: AxiosResponse) => response.data

const requests = {
  get: (url: string) => axios.get(url).then(responseBody)
}

export const Questions = {
  getQuestions: (amount: number, category: number | string, difficulty: string | undefined, type: string | undefined): Promise<QuestionsResponse> => {
    const params = `${amount}${category ? `&category=${category}` : ''}${difficulty ? `&difficulty=${difficulty}` : ''}${type ? `&type=${type}` : ''}`

    return requests.get(`/api.php?amount=${params}`)
  }
}
