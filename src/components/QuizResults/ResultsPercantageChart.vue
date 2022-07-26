<template>
  <div>
    <q-circular-progress
      show-value
      :value="progress"
      size="200px"
      :thickness="0.1"
      color="accent"
      track-color="grey-3"
      class="q-ma-md"
    >
      {{ quizPercentageResult }}%
    </q-circular-progress>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'

const props = defineProps({
  quizPercentageResult: {
    type: Number,
    required: true
  }
})

const progress: Ref<number> = ref(0)
const animateProgress = ():void => {
  setTimeout(() => {
    progress.value = props.quizPercentageResult
  }, 700)
}

onMounted(() => {
  animateProgress()
})
</script>
