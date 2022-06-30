<template>
  <div class="flash-card d-flex">
    <img class="flash-card__image" :src="grammarLearnStore.currentWord?.image">
    <div class="flash-card__content">
      <div class="word">
        {{ grammarLearnStore.currentWord?.keyword }}
      </div>
      <div class="pronounce">
        <img class="button-play-audio me-2" src="@/assets/images/icons/sound.svg" @click="playAudio()">
        <span>{{ grammarLearnStore.currentWord?.transcription }}</span>
      </div>
      <div class="explain" v-html="explainHtml"></div>
    </div>
    <div class="button-flip" @click="emit('flip')">
      <img src="@/assets/images/icons/redo.svg">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed, onMounted, watch } from 'vue'
import { useGrammarLearnStore } from '../store';
import { parse } from 'marked';


const { t } = useI18n();
const grammarLearnStore = useGrammarLearnStore();

const emit = defineEmits(['flip']);

let audioPronounce = new Audio();

const playAudio = () => {
  audioPronounce.play();
}

const explainHtml = computed(() => parse(grammarLearnStore.currentWord.explanation.replace(' ', '\n')).replace('→', ''));

watch(() => grammarLearnStore.currentWord?.sound, (currentValue, oldValue) => {
  audioPronounce = new Audio(currentValue);
  playAudio();
})

onMounted(() => {
  playAudio();
})

</script>

<style lang="scss" scoped>
.flash-card {
  gap: 40px;
  width: 520px;
  height: 200px;
  padding: 20px;
  background-color: $color-white;

  &__image {
    height: 100%;
  }

  &__content {
    width: 100%;

    .word {
      font-size: 18px;
      font-weight: 700;
    }

    .pronounce {
      margin-bottom: 10px;
      color: $color-grey-1;
    }
  }
}

.button-flip {
  align-self: flex-end;
  cursor: pointer;
}

.button-play-audio {
  cursor: pointer;
}

.explain {
  font-size: 14px;
  ;
}
</style>