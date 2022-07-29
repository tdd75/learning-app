<template>
  <div class="answer-card text-center" @click="chooseAnswer" :disabled="grammarTestStore.isDisable"
    :class="(isCorrectAnswer && grammarTestStore.isDisable) ? 'answer-card--correct' : 'answer-card--wrong'"
    v-if="grammarTestStore.isDisable !== undefined">
    {{ word }}
  </div>
</template>

<script lang="ts" setup>
import { useGrammarTestStore } from '../store';

const props = defineProps({
  word: String,
  isCorrectAnswer: Boolean,
  wordTestIndex: String
})

const grammarTestStore = useGrammarTestStore();

const emit = defineEmits(['rightAnswer', 'wrongAnswer']);

const chooseAnswer = () => {
  if (props.isCorrectAnswer) {
    emit('rightAnswer');
  } else {
    emit('wrongAnswer');
  }
}
</script>

<style lang="scss" scoped>
.answer-card {
  padding: 20px 50px;
  margin-bottom: 16px;
  color: $color-black  !important;
  @include set-background-color($color-white);
  border-radius: 8px;
  cursor: pointer;
}
</style>