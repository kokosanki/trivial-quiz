<template>
  <div class="quiz-start">
    <AppHeader />
    <h2 class="quiz-start__header">Dare to check your knowledge?</h2>
    <q-spinner-ball
      v-if="isLoading"
      color="accent"
      size="100px"
      class="q-ma-xl"
    />
    <q-form v-else @submit="onSubmit" class="quiz-start__form q-gutter-md">
      <q-input
        filled
        type="number"
        v-model="amount"
        label="Number of Questions:"
        bg-color="deep-purple-1"
        lazy-rules
        :rules="amountRules"
      />
      <q-select
        bg-color="deep-purple-1"
        class="q-pb-md"
        filled
        clearable
        behavior="menu"
        v-model="category"
        :options="categories"
        label="Select Category"
      />
      <q-select
        bg-color="deep-purple-1"
        class="q-pb-md"
        filled
        clearable
        behavior="menu"
        v-model="difficulty"
        :options="difficulties"
        label="Select Difficulty"
      />
      <q-select
        bg-color="deep-purple-1"
        filled
        clearable
        behavior="menu"
        v-model="type"
        :options="types"
        label="Select Type"
      />
      <div>
        <q-btn class="q-mt-lg" label="Submit" type="submit" color="secondary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import { Categories } from '@/api/Categories'
import { Questions } from '@/api/Questions'
import { QCategory } from '@/types/category'
import { QDifficulty } from '@/types/difficulty'
import { QType } from '@/types/type'
import { QuestionsResponse, Question } from '@/types/question'
import { showCodedError, showBasicError } from '@/utils/NotificationsHandler'
import { useStore } from 'vuex'

const store = useStore()

const amount: Ref<number> = ref(0)
const category: Ref<QCategory | null> = ref(null)
const categories = computed(() => store.getters.questionCategories)
const difficulty: Ref<QDifficulty | null> = ref(null)
const difficulties: Ref<QDifficulty[]> = ref([
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' }
])
const type: Ref<QType | null> = ref(null)
const types: Ref<QType[]> = ref([
  { label: 'Multiple choice', value: 'multiple' },
  { label: 'True/False', value: 'boolean' }
])

const resetSettings = (): void => {
  amount.value = 0
  category.value = null
  difficulty.value = null
  type.value = null
}

const amountRules = [
  (val: string | null) =>
    (val !== null && val !== '') || 'Please, select a number',
  (val: number) => val > 1 || 'The number must be bigger than 1',
  (val: number) => val <= 50 || 'The number cannot be higher than 50'
]

const questions: Ref<QuestionsResponse | null> = ref(null)

const setCategories = (categories: QCategory[]) => {
  store.commit('setCategories', categories)
}
const isLoading: Ref<boolean> = ref(false)
const getCategories = async () => {
  if (categories.value.length) {
    return
  }
  try {
    isLoading.value = true
    const results = await Categories.getCategories()
    const quasarRewrittenValue: QCategory[] = results.map((category) => ({
      label: category.name,
      value: category.id
    }))
    setCategories(quasarRewrittenValue)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getCategories()
})

const setQuestions = (questions: Question[]) => {
  store.commit('setQuestions', questions)
}
const onSubmit = async () => {
  isLoading.value = true
  try {
    questions.value = await Questions.getQuestions(
      amount.value,
      category?.value?.value ? category?.value?.value : '',
      difficulty?.value?.value ? difficulty?.value.value : '',
      type?.value?.value ? type?.value?.value : ''
    )
    if (questions.value?.response_code !== 0) {
      showCodedError(questions.value?.response_code)
    } else {
      setQuestions(questions.value?.results)
    }
  } catch (err) {
    console.error(err)
    showBasicError()
  } finally {
    isLoading.value = false
    resetSettings()
  }
}
</script>

<style lang="scss" scoped>
.quiz-start {
  padding: 20px;
  &__header {
    font-size: $prominent;
    color: $accent;
  }
  &__form {
    margin-top: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .quiz-start {
    background-color: $dark;
    width: 850px;
    border-radius: 15px;
    padding: 40px;
    &__form {
      margin-top: 20px;
    }
  }
}
</style>
