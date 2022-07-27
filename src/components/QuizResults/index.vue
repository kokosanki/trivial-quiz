<template>
  <div class="wrapper-component">
    <AppHeader />
    <h3 class="quiz-results__header">Your results</h3>
    <h4 class="quiz-results__subheader">Correct answers: <span class="text-no-wrap">{{ correctAnswers }} / {{ questions.length }}</span></h4>
    <ResultsPercantageChart :quizPercentageResult="quizPercentageResult" />
    <UserMessage :quizPercentageResult="quizPercentageResult" />
    <QuizAnswersResults />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import ResultsPercantageChart from '@/components/QuizResults/ResultsPercantageChart.vue'
import UserMessage from '@/components/QuizResults/UserMessage.vue'
import QuizAnswersResults from '@/components/QuizResults/QuizAnswersResults.vue'

const store = useStore()

const questions = computed(() => store.getters.questions)

const correctAnswers = computed(() => {
  return questions.value.reduce((accumulator, currentValue) => {
    if (currentValue.userAnswer === currentValue.correct_answer) {
      accumulator = accumulator + 1
    }
    return accumulator
  }, 0)
})

const quizPercentageResult = computed(() => {
  return Math.round((correctAnswers.value / questions.value.length) * 100)
})
</script>

<style lang="scss" scoped>
.quiz-results {
  &__header {
  font-size: $big;
  color: #37eabb;
  margin-bottom: 20px;
  }
  &__subheader {
    font-size: $big;
    margin-bottom: 20px;
  }
}
</style>
