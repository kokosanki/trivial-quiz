<template>
  <div class="quiz-answers-results">
    <q-expansion-item class="quiz-answers-results__header" label="Check your answers">
      <q-separator />
      <q-card>
        <q-card-section>
            <div class="quiz-answers-results__single-question" v-for="question in questions" :key="question.id">
              <div class="quiz-answers-results__question-header">
                <h5 class="quiz-answers-results__question" v-html="question.question"></h5>
                <p class="quiz-answers-results__time-message">{{answerTimeMessage(question.answerTime)}}</p>
              </div>
              <ul class="quiz-answers-results__answers">
                <li class="quiz-answers-results__answer quiz-answers-results__answer--correct" :class="question.correct_answer === question.userAnswer ? 'quiz-answers-results__user-answer' : ''" v-html="question.correct_answer"></li>
                <li class="quiz-answers-results__answer quiz-answers-results__answer--incorrect" :class="answer === question.userAnswer ? 'quiz-answers-results__user-answer' : ''" v-for="(answer, index) in question.incorrect_answers" :key="index" v-html="answer"></li>
              </ul>
            </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const questions = computed(() => store.getters.questions)

const answerTimeMessage = (answerTime):string => `Time spent on the question: ${answerTime} second${answerTime === 1 ? '' : 's'}`
</script>

<style lang="scss">
.quiz-answers-results {
  &__header {
    margin-top: 20px;
  }
  &__single-question {
    margin-top: 20px;
  }
  &__question-header {
    text-align: left;
  }
  &__question {
    font-size: $regular;
    text-align: left;
  }
  &__answers {
    margin-top: 10px;
  }
  &__answer {
    font-size: $fitting;
    text-align: left;
    &--correct {
      color: $positive;
      &::marker {
        content: '✔ ';
      }
    }
    &--incorrect {
      color: $negative;
      &::marker {
        content: '✖ '
      }
    }
  }
  &__user-answer {
    &::after {
      content: ' ⇽ Your answer';
      font-style: italic;
      color: $accent;
      font-size: $sleek;
    }
  }
  &__time-message {
    font-size: $fitting;
    margin: 5px 0;
  }
  .q-item__label {
    color: $accent;
    font-size: $prominent;
  }
  .q-icon {
    color: $accent;
  }
  .q-card {
    background-color: $dark;
  }
}
</style>
