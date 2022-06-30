<template>
  <div class="container-fluid">
    <div class="grammar-page container d-fl">
      <HeadingBar :total-chapter="grammarStore.lengthChapterList || 2" :progress="'2/3'" />
      <div class="card-lesson-list d-grid justify-content-between">
        <CardLesson v-for="chapter in grammarStore.chapterList" :key="chapter._id" :chapter-id="chapter._id"
          :chapter-title="chapter.chapter" :isLearned="true" />
      </div>
      <div class="pagination d-flex justify-content-center">
        <el-pagination :background="true" :page-size="LIMIT_LESSON_LIST" layout="prev, pager, next"
          :total="grammarStore.lengthChapterList || 2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardLesson from './components/CardLesson.vue';
import HeadingBar from './components/HeadingBar.vue';
import { useGrammarStore } from './store';
import { onMounted } from 'vue';
import { LIMIT_LESSON_LIST } from './constants';

const grammarStore = useGrammarStore();

onMounted(async () => {
  await grammarStore.getChapterList({
    limit: LIMIT_LESSON_LIST,
    offset: 1,
  });
})

</script>

<style lang="scss" scoped>
.container-fluid {
  background-color: $color-light-grey-1;
  padding-bottom: 20px;
}

.card-lesson-list {
  row-gap: 40px;
  grid-template-columns: repeat(auto-fill, 225px);
}

.pagination {
  margin-top: 20px;
}
</style>