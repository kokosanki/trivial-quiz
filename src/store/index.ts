import { createStore } from 'vuex'

export default createStore({
  state: {
    categories: [],
    questions: []
  },
  getters: {
    questionCategories (state) {
      return state.categories
    }
  },
  mutations: {
    setQuestions (state, val) {
      state.questions = val
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
