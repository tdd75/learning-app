<template>
  <HeadingBar :button-label="t('vocabularyLearn.heading.testNow')" :title="t('vocabularyLearn.heading.lesson', {
    lessonId: id
  })" :to="{
  name: PageName.VOCABULARY_TEST_PAGE,
  id: id
}" />
  <div class="vocabulary-content" v-if="getProgressPercentage < 100">
    <div class="controller d-flex justify-content-between">
      <el-button class="button-previous" type="primary" @click="backWord"
        :disabled="vocabularyLearnStore.currentIndex === 0">
        <img src="@/assets/images/icons/left-arrow.svg" />
        <span class="ms-2">
          {{ t('vocabularyLearn.previous') }}
        </span>
      </el-button>
      <el-button class="button-next" type="primary" @click="nextWord">
        <span class="me-2">
          {{ t('vocabularyLearn.next') }}
        </span>
        <img src="@/assets/images/icons/right-arrow.svg" />
      </el-button>
    </div>
    <el-progress class="learn-progress" :percentage="getProgressPercentage" width="50%" :stroke-width="12"
      color="#5cc046" :show-text="false" />
    <div class="d-flex ">
      <FlashCard />
    </div>
  </div>
  <LearningComplete v-else :id="id" />
</template>

<script lang="ts" setup>
import HeadingBar from '@/components/HeadingBar.vue';
import FlashCard from './components/FlashCard.vue';

import { useI18n } from 'vue-i18n';
import { useVocabularyLearnStore } from './store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import LearningComplete from './components/LearningComplete.vue';
import { computed } from '@vue/reactivity';
import { PageName } from '../../common/constants';


const { t } = useI18n();
const route = useRoute();
const vocabularyLearnStore = useVocabularyLearnStore();
const isDiableController = ref(false);

const id = route.params.id as string;

onMounted(async () => {
  await vocabularyLearnStore.getWordList(id);
})

const backWord = () => {
  if (vocabularyLearnStore.currentIndex === 1) {
    isDiableController.value = true
  } else {
    isDiableController.value = false
  }
  vocabularyLearnStore.$patch({
    currentIndex: vocabularyLearnStore.currentIndex - 1
  })
}

const nextWord = () => {
  if (vocabularyLearnStore.currentIndex === vocabularyLearnStore.wordList.length - 1) {
    isDiableController.value = true
  } else {
    isDiableController.value = false
  }
  vocabularyLearnStore.doneCurrentWord();
}
const getProgressPercentage = computed(() => {
  console.log(vocabularyLearnStore.currentIndex * 100 / vocabularyLearnStore.wordList.length);
  return vocabularyLearnStore.currentIndex * 100 / vocabularyLearnStore.wordList.length;
})

</script>

<style lang="scss" scoped>
.vocabulary-content {
  height: fit-content;
  padding: 20px 350px;
  background-color: $color-grey;
}

.controller {
  margin-bottom: 20px;
}

.learn-progress {
  margin-bottom: 20px;

  :deep(.el-progress-bar__outer) {
    background-color: $color-grey-1;
  }
}

.button-previous,
.button-next {
  padding: 18px 20px;
  font-weight: 500;
  border-radius: 4px;
}

.button-previous {
  border: 1px solid $color-primary;
  color: $color-primary  !important;
  @include set-background-color($color-white);
}
</style>