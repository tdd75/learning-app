<template>
  <HeadingBar :button-label="t('grammarLearn.heading.testNow')"
    :title="t('grammarLearn.heading.chapter', { chapterId: id })" :to="{
      name: PageName.GRAMMAR_TEST_PAGE,
      id: 1
    }" :page-name="PageName.GRAMMAR_PAGE" />
  <div class="grammar-content" v-if="getProgressPercentage < 100">
    <div class="controller d-flex justify-content-between">
      <el-button class="button-previous" type="primary" @click="backWord"
        :disabled="grammarLearnStore.currentIndex === 0">
        <img src="@/assets/images/icons/left-arrow.svg" />
        <span class="ms-2">
          {{ t('grammarLearn.previous') }}
        </span>
      </el-button>
      <el-button class="button-next" type="primary" @click="nextWord">
        <span class="me-2">
          {{ t('grammarLearn.next') }}
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
import { useGrammarLearnStore } from './store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import LearningComplete from './components/LearningComplete.vue';
import { computed } from '@vue/reactivity';
import { PageName } from '../../common/constants';


const { t } = useI18n();
const route = useRoute();
const grammarLearnStore = useGrammarLearnStore();
const isDiableController = ref(false);

const id = route.params.id as string;

onMounted(async () => {
  await grammarLearnStore.getWordList(id);
})

const backWord = () => {
  if (grammarLearnStore.currentIndex === 1) {
    isDiableController.value = true
  } else {
    isDiableController.value = false
  }
  grammarLearnStore.$patch({
    currentIndex: grammarLearnStore.currentIndex - 1
  })
}

const nextWord = () => {
  if (grammarLearnStore.currentIndex === grammarLearnStore.wordList.length - 1) {
    isDiableController.value = true
  } else {
    isDiableController.value = false
  }
  grammarLearnStore.doneCurrentWord();
}
const getProgressPercentage = computed(() => {
  console.log(grammarLearnStore.currentIndex * 100 / grammarLearnStore.wordList.length);
  return grammarLearnStore.currentIndex * 100 / grammarLearnStore.wordList.length;
})

</script>

<style lang="scss" scoped>
.grammar-content {
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