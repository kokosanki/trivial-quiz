<template>
  <div class="quiz-progress">
    <q-chip size="14px" outline color="accent" text-color="accent">
      {{ quizProgress }}
    </q-chip>
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
  }
})

const questions = computed(() => store.getters.questions)

const quizProgress = computed(
  () => `${props.currentQuestionIndex + 1} / ${questions.value.length}`
)
</script>

<style scoped>
.quiz-progress {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
</style>
