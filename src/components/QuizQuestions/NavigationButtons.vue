<template>
  <div class="navigation-buttons">
    <q-btn @click="back" :disable="isFirstQuestionActive" class="q-mt-lg" label="Back" color="secondary" />
    <q-btn v-if="isLastQuestionActive" outline @click="submitQuiz" class="q-mt-lg" label="Submit" color="accent" />
    <q-btn v-else @click="next" :disable="!isCurrentQuestionAnswered" class="q-mt-lg" label="Next" color="secondary" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  currentQuestionIndex: {
    type: Number,
    required: true
  },
  currentQuestion: {
    type: Object,
    required: true
  }
})

const isFirstQuestionActive = computed(() => props.currentQuestionIndex === 0)
const isCurrentQuestionAnswered = computed(() => props.currentQuestion.userAnswer)

const questions = computed(() => store.getters.questions)
const isLastQuestionActive = computed(() => props.currentQuestionIndex === questions.value.length - 1)

const emit = defineEmits(['back', 'next', 'submitQuiz'])

const back = ():void => emit('back')
const next = ():void => emit('next')
const submitQuiz = ():void => emit('submitQuiz')
</script>

<style scoped>
.navigation-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
