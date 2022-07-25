<template>
  <div class="wrapper-component">
    <QuizQuestion :currentQuestion="currentQuestion" />
    <NavigationButtons :currentQuestionIndex="currentQuestionIndex" @next="next" @back="back" @submitQuiz="submitQuiz" />
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

const emit = defineEmits(['submitQuiz'])
const submitQuiz = ():void => {
  emit('submitQuiz')
}
</script>
