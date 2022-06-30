<template>
  <HeadingBar :button-label="t('vocabularyTest.heading.relearn')"
    :title="t('vocabularyTest.heading.lesson', { lessonId: id })" :to="{
      name: PageName.VOCABULARY_LEARN_PAGE,
      id: id
    }" :page-name="PageName.VOCABULARY_PAGE" />
  <div class="vocabulary-content" v-if="currentWord">
    <div class="controller d-flex justify-content-between">
      <el-button class="button-previous" type="primary" @click="backWord" :disabled="currentIndex === 0">
        <img src="@/assets/images/icons/left-arrow.svg" />
      </el-button>
      <el-button class="button-next" type="primary" @click="nextWord"
        :disabled="currentIndex === vocabularyTestStore.lengthWordList">
        <img src="@/assets/images/icons/right-arrow.svg" />
      </el-button>
    </div>
    <el-progress class="learn-progress" :percentage="getProgressPercentage()" width="50%" :stroke-width="12"
      color="#5cc046" :show-text="false" />
    <QuestionCard :word="currentWord.word.keyword" :audio="currentWord.word.sound"
      :pronoun="currentWord.word.transcription" :true-meaning="currentWord.trueMeaning"
      :wrong-meaning="currentWord.wrongMeaning" />
    <div class="row">
      <div class="col">
        <AnswerCard :word="getAnswerList()[0].word" :is-correct-answer="getAnswerList()[0].isCorrect"
          @right-answer="answer(true)" @wrong-answer="answer(false)" />
      </div>
      <div class="col">
        <AnswerCard :word="getAnswerList()[1].word" :is-correct-answer="getAnswerList()[1].isCorrect"
          @right-answer="answer(true)" @wrong-answer="answer(false)" />
      </div>
      <div class="w-100"></div>
      <div class="col">
        <AnswerCard :word="getAnswerList()[2].word" :is-correct-answer="getAnswerList()[2].isCorrect"
          @right-answer="answer(true)" @wrong-answer="answer(false)" />
      </div>
      <div class="col">
        <AnswerCard :word="getAnswerList()[3].word" :is-correct-answer="getAnswerList()[3].isCorrect"
          @right-answer="answer(true)" @wrong-answer="answer(false)" />
      </div>
    </div>
  </div>
  <el-dialog class="dialog-result" v-model="isShowLearnDialog" width="20%" top="25vh">
    <template #default>
      <div class="d-flex flex-column align-items-center">
        <div class="result">
          {{ t('vocabularyTest.result') }}
        </div>
        <div class="score">
          {{ t('vocabularyTest.score', {
              score: vocabularyTestStore.score.size,
              maxScore: vocabularyTestStore.lengthWordList
            })
          }}
        </div>
        <router-link :to="{
          name: PageName.VOCABULARY_PAGE,
        }" class="router-link">
          <el-button type="primary">
            {{ t('vocabularyTest.showLessonList') }}
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
import { useVocabularyTestStore } from './store';
import { PageName } from '../../common/constants';
import { IWordTest } from '../../common/interfaces';
import { shuffle } from 'lodash';

const { t } = useI18n();
const route = useRoute();
const vocabularyTestStore = useVocabularyTestStore();
const currentIndex = ref(0);
const isShowLearnDialog = ref(false);

watch(() => currentIndex, (currentValue, oldValue) => {
  isShowLearnDialog.value = getProgressPercentage() === 100;
})

const getProgressPercentage = () => {
  return currentIndex.value * 100 / (vocabularyTestStore.lengthWordList - 1);
}

const getAnswerList = () => {
  const allAnswer = [{ word: currentWord.value.trueMeaning, isCorrect: true },
  { word: currentWord.value.wrongMeaning[0], isCorrect: false }, { word: currentWord.value.wrongMeaning[1], isCorrect: false }, { word: currentWord.value.wrongMeaning[2], isCorrect: false }];
  return allAnswer.sort(() => .5 - Math.random());
}

const currentWord = computed(() => {
  return vocabularyTestStore.wordList[Math.min(currentIndex.value, vocabularyTestStore.lengthWordList - 1)];
})

const id = route.params.id as string;

onMounted(async () => {
  await vocabularyTestStore.getWordList(id);
})

const answer = (isRight: boolean) => {
  if (isRight) {
    vocabularyTestStore.score.add(currentIndex.value);
  } else {
    vocabularyTestStore.score.delete(currentIndex.value);
  }
}

const backWord = () => {
  currentIndex.value -= 1;
}

const nextWord = () => {
  if (currentIndex.value === vocabularyTestStore.lengthWordList - 1) {
    isShowLearnDialog.value = true;
  } else {
    currentIndex.value += 1;
  }
}
</script>

<style lang="scss" scoped>
.vocabulary-content {
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