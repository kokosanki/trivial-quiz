<template>
  <q-layout>
    <div class="quiz">
      <QuizStart />
    </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuizStart from '@/components/QuizStart.vue'

export default defineComponent({
  components: {
    QuizStart
  }
})
</script>

<style scoped lang="scss">
.quiz {
  background-color: $dark;
  min-height: 100vh;
}
@media screen and (min-width: 1024px) {
.quiz {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(216deg, rgba(107,3,177,1) 0%, rgba(134,3,3,1) 50%, rgba(252,176,69,1) 100%);
  }
}
</style>
