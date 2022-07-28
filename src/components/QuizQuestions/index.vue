<template>
  <div class="wrapper-component">
    <QuizQuestion :currentQuestion="currentQuestion" />
    <NavigationButtons :currentQuestion="currentQuestion" :currentQuestionIndex="currentQuestionIndex" @next="next" @back="back" @submitQuiz="submitQuiz" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import NavigationButtons from '@/components/QuizQuestions/NavigationButtons.vue'
import QuizQuestion from '@/components/QuizQuestions/QuizQuestion.vue'
import { Answer } from '@/types/answer'
const store = useStore()

const questions = computed(() => store.getters.questions)
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const currentQuestionIndex: Ref<number> = ref(0)

const next = ():void => {
  currentQuestionIndex.value = currentQuestionIndex.value + 1
}
const back = ():void => {
  currentQuestionIndex.value = currentQuestionIndex.value - 1
}

const emit = defineEmits(['changeActiveComponent'])
const displayNextComponent = ():void => {
  emit('changeActiveComponent', 'QuizResults')
}
const submitQuiz = ():void => {
  displayNextComponent()
}

const setUserAnswerTime = (answer: Answer) => {
  store.commit('setUserAnswerTime', answer)
}

const startTime: Ref<number> = ref(0)
watch(currentQuestionIndex, (questionIndex, prevQuestionIndex) => {
  if (questions.value.length) {
    if (startTime.value) {
      calculateTime(prevQuestionIndex)
      startTime.value = new Date().getTime()
    } else {
      startTime.value = new Date().getTime()
    }
  }
}, { immediate: true })

const storeQuizResults = ():void => {
  store.dispatch('storeQuizResults')
}

onBeforeUnmount(() => {
  calculateTime(currentQuestionIndex.value)
  storeQuizResults()
})

const calculateTime = (questionIndex) => {
  const endTime: Ref<number> = ref(new Date().getTime())
  let timeDiff = endTime.value - startTime.value
  timeDiff /= 1000
  const seconds = Math.round(timeDiff)
  const answerObject = {
    id: questionIndex,
    answerTime: seconds
  }
  setUserAnswerTime(answerObject)
}
</script>
