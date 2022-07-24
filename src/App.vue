<template>
  <Quiz />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Quiz from '@/components/Quiz.vue'

export default defineComponent({
  name: 'App',
  components: {
    Quiz
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: $dark;
}
</style>
