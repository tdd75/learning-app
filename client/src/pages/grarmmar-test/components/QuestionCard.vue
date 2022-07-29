<template>
  <div class="question-card d-flex flex-column align-items-center px-4">
    <div class="word mb-2">{{ word }}</div>
    <div class="d-flex">
      <div class="hint">Hint:&nbsp;</div>
      <div class="pronoun">{{ pronoun }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGrammarTestStore } from '../store';

const grammarTestStore = useGrammarTestStore();

const props = defineProps({
  word: String,
  pronoun: String,
})

</script>

<style lang="scss" scoped>
.question-card {
  padding-top: 12px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  background-color: $color-white;
  border-radius: 4px;
}

.question {
  font-size: 14px;
  color: $color-dark-grey-1;
}

.word {
  font-size: 18px;
  font-weight: 500;
}

.pronoun {
  font-style: italic;
  color: $color-dark-grey-1;
}

.button-play-audio {
  cursor: pointer;
}

.hint {
  font-weight: 500;
  font-style: italic;
}
</style>