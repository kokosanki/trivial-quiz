<template>
  <div class="question">
    <QuizProgress :currentQuestionIndex="currentQuestion.id" />
    <h3
      class="question__header question-header"
      v-html="currentQuestion.question"
    ></h3>
    <q-list class="question__list" bordered separator>
      <q-item
        class="question__list-item"
        clickable
        :active="isAnswerChosen(answer)"
        active-class="bg-teal-11"
        @click="chooseAnswer(answer)"
        v-for="answer in allAnswersRandomized"
        :key="answer"
      >
        <q-item-section v-html="answer"></q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import { shuffleArray } from '@/utils/ArrayHelpers'
import { useStore } from 'vuex'
import { Answer } from '@/types/answer'
import QuizProgress from '@/components/QuizQuestions/QuizProgress.vue'

const props = defineProps({
  currentQuestion: {
    type: Object,
    required: true
  }
})

const store = useStore()
const setUserAnswer = (answer: Answer) => {
  store.commit('setUserAnswer', answer)
}

const chosenAnswer: Ref<string> = ref('')
const chooseAnswer = (answer: string) => {
  chosenAnswer.value = answer
  const answerObject = {
    id: props.currentQuestion.id,
    answerText: answer
  }
  setUserAnswer(answerObject)
}

const isAnswerChosen = (answer: string) =>
  props.currentQuestion.userAnswer === answer

const allAnswersRandomized = computed(() => {
  let answers: string[] = []
  answers = [...answers, ...props.currentQuestion.incorrect_answers]
  answers.push(props.currentQuestion.correct_answer)
  return shuffleArray(answers)
})
</script>

<style lang="scss" scoped>
.question {
  &__list,
  &__list-item.q-item.q-item-type {
    border: 1px solid $accent;
    font-size: $fitting;
  }
}
@media screen and (min-width: 1024px) {
  .question {
    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
