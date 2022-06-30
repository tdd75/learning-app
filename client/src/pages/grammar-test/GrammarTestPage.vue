<!-- <template>
  <HeadingBar :button-label="t('grammarTest.heading.relearn')"
    :title="t('grammarTest.heading.chapter', { chapterId: id })" :to="{
      name: PageName.VOCABULARY_LEARN_PAGE,
      id: id
    }" />
  <div class="grammar-content" v-if="getProgressPercentage < 100">
    <div class="controller d-flex justify-content-between">
      <el-button class="button-previous" type="primary" @click="backWord"
        :disabled="grammarTestStore.currentIndex === 0">
        <img src="@/assets/images/icons/left-arrow.svg" />
      </el-button>
      <el-button class="button-next" type="primary" @click="nextWord">
        <img src="@/assets/images/icons/right-arrow.svg" />
      </el-button>
    </div>
    <el-progress class="learn-progress" :percentage="getProgressPercentage" width="50%" :stroke-width="12"
      color="#5cc046" :show-text="false" />
    <QuestionCard />
  </div>
</template>

<script lang="ts" setup>
import HeadingBar from '@/components/HeadingBar.vue';
import QuestionCard from './components/QuestionCard.vue';

import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';
import { useGrammarTestStore } from './store';
import { PageName } from '../../common/constants';

const { t } = useI18n();
const route = useRoute();
const grammarTestStore = useGrammarTestStore();

const id = route.params.id as string;

onMounted(async () => {
  await grammarTestStore.getWordList(id);
})

const backWord = () => {
  grammarTestStore.$patch({
    currentIndex: grammarTestStore.currentIndex - 1
  })
}

const nextWord = () => {
  // grammarTestStore.doneCurrentWord();
}

const getProgressPercentage = computed(() => {
  console.log(grammarTestStore.currentIndex * 100 / grammarTestStore.chapterList.length);
  return grammarTestStore.currentIndex * 100 / grammarTestStore.chapterList.length;
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
  font-weight: 500;
  border-radius: 4px;
}

.button-previous {
  border: 1px solid $color-primary;
  color: $color-primary  !important;
  @include set-background-color($color-white);
}
</style> -->