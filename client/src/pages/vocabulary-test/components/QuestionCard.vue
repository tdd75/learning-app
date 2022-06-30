<template>
  <div class="question-card d-flex flex-column align-items-center">
    <div class="question">{{ t('vocabularyTest.question') }}</div>
    <div class="word">{{ word }}</div>
    <div class="d-flex">
      <img class="button-play-audio me-2" src="@/assets/images/icons/sound.svg" @click="playAudio()">
      <div class="pronoun">{{ pronoun }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVocabularyTestStore } from '../store';

const vocabularyTestStore = useVocabularyTestStore();

const props = defineProps({
  word: String,
  audio: String,
  pronoun: String,
  trueMeaning: String,
  wrongMeaning: Array,
})

let audio = new Audio();

const playAudio = () => {
  audio.play()
}

watch(() => props.audio, (currentValue, oldValue) => {
  vocabularyTestStore.$patch({
    isDisable: true
  });
  audio = new Audio(currentValue);
  playAudio();
})

onMounted(() => {
  audio = new Audio(props.audio);
  playAudio();
})


const { t } = useI18n();

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
</style>