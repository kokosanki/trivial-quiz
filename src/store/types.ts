import { Category } from '@/types/category'
import { Question } from '@/types/question'

export type StoreType = {
  categories: Category[]
  questions: Question[]
}
