import axios, { AxiosResponse } from 'axios'
import { Category } from '@/types/category'

const responseBody = (response: AxiosResponse) => response.data.trivia_categories

const requests = {
  get: (url: string) => axios.get(url).then(responseBody)
}

export const Categories = {
  getCategories: (): Promise<Category[]> => requests.get('/api_category.php')
}
