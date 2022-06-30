<template>
  <div class="flash-card d-flex">
    <img class="flash-card__image" :src="grammarLearnStore.currentWord?.image">
    <div class="flash-card__content">
      <div class="meaning">
        {{ t('grammarLearn.meaning') }}
      </div>
      <div>
        {{ grammarLearnStore.currentWord?.shortDesc }}
      </div>
    </div>
    <div class="button-flip" @click="emit('flip')">
      <img src="@/assets/images/icons/redo.svg">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useGrammarLearnStore } from '../store';

const grammarLearnStore = useGrammarLearnStore();

const emit = defineEmits(['flip']);

const { t } = useI18n();

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

    .meaning {
      color: $color-grey-1;
      margin-bottom: 8px;
    }
  }
}

.button-flip {
  align-self: flex-end;
  cursor: pointer;
}
</style>