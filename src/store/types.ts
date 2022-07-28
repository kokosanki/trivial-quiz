import { Category } from '@/types/category'
import { Question } from '@/types/question'
import { Result } from '@/types/result'

export type StoreType = {
  categories: Category[]
  questions: Question[]
  userResults: Result[]
}
