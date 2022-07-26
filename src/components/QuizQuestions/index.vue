<template>
  <div class="wrapper-component">
    <QuizQuestion :currentQuestion="currentQuestion" />
    <NavigationButtons :currentQuestion="currentQuestion" :currentQuestionIndex="currentQuestionIndex" @next="next" @back="back" @submitQuiz="submitQuiz" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { useStore } from 'vuex'
import NavigationButtons from '@/components/QuizQuestions/NavigationButtons.vue'
import QuizQuestion from '@/components/QuizQuestions/QuizQuestion.vue'
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
</script>
