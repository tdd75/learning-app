<template>
  <div class="heading-bar d-flex justify-content-between">
    <div class="title d-flex align-items-center">
      <span class="chapter-name me-2">{{ title }}</span>
      <span class="count-unit">{{ t('grammarLearn.heading.countUnit', {
          count: count
        })
      }}</span>
    </div>
    <el-button type="primary" class="button-mark-complete" v-if="isShowMarkComplete" @click="markComplete">
      {{ t('grammarLearn.heading.markComplete') }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { PageName } from '../../../common/constants';
import { useGrammarLearnStore } from '../store';

const grammarLearnStore = useGrammarLearnStore();

const { t } = useI18n();
const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true,
  },
  isShowMarkComplete: {
    type: Boolean,
    required: true,
  },
  chapterId: {
    type: String,
    required: true,
  }
})

const markComplete = async () => {
  const error = await grammarLearnStore.finishChapter(props.chapterId);
  if (error === undefined) {
    return router.push({
      name: PageName.GRAMMAR_PAGE,
    })
  }
}

</script>

<style lang="scss" scoped>
.chapter-name {
  font-size: 20px;
  font-weight: 500;
}

.count-unit {
  width: fit-content;
  height: fit-content;
  padding: 2px 4px;
  font-size: 12px;
  color: $color-white;
  background-color: $color-primary;
}

.button-mark-complete {
  @include set-background-color($color-green);
}
</style>