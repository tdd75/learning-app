<template>
  <HeadingBar :button-label="t('grammarTest.heading.relearn')" :title="t('grammarTest.heading.topic', { topic: topic })"
    :to="{
      name: PageName.GRAMMAR_PROGRESS_PAGE,
    }" :page-name="PageName.GRAMMAR_PROGRESS_PAGE" />
  <div class="grammar-content" v-if="currentWord">
    <el-progress class="learn-progress" :percentage="getProgressPercentage()" width="50%" :stroke-width="12"
      color="#5cc046" :show-text="false" />
    <QuestionCard :word="currentWord.task" :pronoun="currentWord.comment" />
    <div class="row">
      <div class="col">
        <AnswerCard :word="currentWord.listAnswer[0]" :is-correct-answer="currentWord.trueAnswer === 0"
          @right-answer="answer(true)" @wrong-answer="answer(false)" />
      </div>
      <div class="col">
        <AnswerCard :word="currentWord.listAnswer[1]" :is-correct-answer="currentWord.trueAnswer === 1"
          @right-answer="answer(true)" @wrong-answer="answer(false)" />
      </div>
      <div class="w-100"></div>
      <div class="col">
        <AnswerCard :word="currentWord.listAnswer[2]" :is-correct-answer="currentWord.trueAnswer === 2"
          @right-answer="answer(true)" @wrong-answer="answer(false)" />
      </div>
      <div class="col">
        <AnswerCard :word="currentWord.listAnswer[3]" :is-correct-answer="currentWord.trueAnswer === 3"
          @right-answer="answer(true)" @wrong-answer="answer(false)" />
      </div>
    </div>
  </div>
  <el-dialog class="dialog-result" v-model="isShowLearnDialog" width="20%" top="25vh">
    <template #default>
      <div class="d-flex flex-column align-items-center">
        <div class="result">
          {{ t('grammarTest.result') }}
        </div>
        <div class="score">
          {{ t('grammarTest.score', {
              score: grammarTestStore.score.size,
              maxScore: grammarTestStore.lengthWordList
            })
          }}
        </div>
        <router-link :to="{
          name: PageName.GRAMMAR_PAGE,
        }" class="router-link">
          <el-button type="primary">
            {{ t('grammarTest.showTopicList') }}
          </el-button>
        </router-link>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import HeadingBar from '@/components/HeadingBar.vue';
import QuestionCard from './components/QuestionCard.vue';
import AnswerCard from './components/AnswerCard.vue';


import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGrammarTestStore } from './store';
import { PageName } from '../../common/constants';
import { IWordTest } from '../../common/interfaces';
import { shuffle } from 'lodash';

const { t } = useI18n();
const route = useRoute();
const grammarTestStore = useGrammarTestStore();
const currentIndex = ref(0);
const isShowLearnDialog = ref(false);

watch(() => currentIndex, (currentValue, oldValue) => {
  isShowLearnDialog.value = getProgressPercentage() === 100;
})

const getProgressPercentage = () => {
  return currentIndex.value * 100 / (grammarTestStore.lengthWordList - 1);
}

const currentWord = computed(() => {
  return grammarTestStore.wordList[Math.min(currentIndex.value, grammarTestStore.lengthWordList - 1)];
})

const topic = route.params.topic as string;

onMounted(async () => {
  await grammarTestStore.getWordList(topic);
})

const answer = (isRight: boolean) => {
  if (isRight) {
    grammarTestStore.score.add(currentIndex.value);
  } else {
    grammarTestStore.score.delete(currentIndex.value);
  }
  nextWord();
}

const nextWord = () => {
  if (currentIndex.value === grammarTestStore.lengthWordList - 1) {
    isShowLearnDialog.value = true;
  } else {
    currentIndex.value += 1;
  }
}
</script>

<style lang="scss" scoped>
.grammar-content {
  height: 90vh;
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
  font-weight: 500;
  border-radius: 4px;
}

.button-previous {
  border: 1px solid $color-primary;
  color: $color-primary  !important;
  @include set-background-color($color-white);
}

.result {
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 500;
}

.score {
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 500;
  color: $color-green;
}
</style>