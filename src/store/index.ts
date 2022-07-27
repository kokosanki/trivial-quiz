import { createStore } from 'vuex'
import { StoreType } from '@/store/types'

export default createStore({
  state: {
    categories: [],
    questions: [],
    userAnswers: []
  } as StoreType,
  getters: {
    questionCategories (state) {
      return state.categories
    },
    questions (state) {
      return state.questions
    }
  },
  mutations: {
    setQuestions (state, questions) {
      questions.forEach((question, index) => {
        question.id = index
        question.userAnswer = ''
      })
      state.questions = questions
    },
    setUserAnswer (state, answer) {
      state.questions[answer.id].userAnswer = answer.answerText
    },
    setUserAnswerTime (state, answer) {
      if (state.questions[answer.id].answerTime) {
        state.questions[answer.id].answerTime = state.questions[answer.id].answerTime + answer.answerTime
      } else {
        state.questions[answer.id].answerTime = answer.answerTime
      }
    },
    setCategories (state, val) {
      state.categories = val
    }
  },
  actions: {
  },
  modules: {
  }
})
