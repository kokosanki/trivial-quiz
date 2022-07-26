<template>
  <div>
    <h5 class="user-message gradient-text">{{ messageForUser }}</h5>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  quizPercentageResult: {
    type: Number,
    required: true
  }
})

const messageForUser = computed(() => {
  if (props.quizPercentageResult < 30) {
    return 'Try again, better luck next time!'
  } else if (
    props.quizPercentageResult >= 30 &&
    props.quizPercentageResult < 60
  ) {
    return "That's nice! Keep being curious!"
  } else {
    return "You're doing great! Show us how it's done!"
  }
})
</script>

<style lang="scss" scoped>
.user-message {
  font-size: $prominent;
  line-height: 1.7;
}

@media screen and (min-width: 768px) {
  .user-message {
    font-size: $big;
    line-height: 2;
  }
}
</style>
