import { createStore } from 'vuex'
import { StoreType } from '@/store/types'

export default createStore({
  state: {
    categories: [],
    questions: [],
    userResults: []
  } as StoreType,
  getters: {
    questionCategories (state) {
      return state.categories
    },
    questions (state) {
      return state.questions
    },
    timeSpentOnQuiz (state) {
      return state.questions.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.answerTime || 0)
      }, 0)
    },
    correctAnswers (state) {
      return state.questions.reduce((accumulator, currentValue) => {
        if (currentValue.userAnswer === currentValue.correct_answer) {
          accumulator = accumulator + 1
        }
        return accumulator
      }, 0)
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
    resetQuestions (state) {
      state.questions = []
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
    },
    storeQuizResults (state, val) {
      state.userResults.push(val)
    }
  },
  actions: {
    storeQuizResults (context) {
      context.commit('storeQuizResults', {
        questionsAmount: context.state.questions.length,
        correctAnswersAmount: context.getters.correctAnswers,
        timeLength: context.getters.timeSpentOnQuiz
      })
    }
  },
  modules: {
  }
})
