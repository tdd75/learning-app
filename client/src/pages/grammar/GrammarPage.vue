<template>
  <div class="container-fluid">
    <div class="grammar-page container d-fl">
      <HeadingBar :total-chapter="grammarStore.lengthChapterList" :progress="grammarStore.progress" />
      <div class="card-lesson-list d-grid justify-content-between" v-loading="loading">
        <CardChapter v-for="chapter in grammarStore.chapterList" :key="chapter._id" :chapter-id="chapter._id"
          :chapter-title="chapter.name" :isLearned="chapter.status === 1" />
      </div>
      <div class="pagination d-flex justify-content-center">
        <el-pagination :background="true" :page-size="LIMIT_CHAPTER_LIST" layout="prev, pager, next"
          :total="grammarStore.lengthChapterList" :current-page="currentPage" @current-change="updateCurrentPage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardChapter from './components/CardChapter.vue';
import HeadingBar from './components/HeadingBar.vue';
import { useGrammarStore } from './store';
import { onMounted, ref } from 'vue';
import { LIMIT_CHAPTER_LIST } from './constants';

const grammarStore = useGrammarStore();

const currentPage = ref(1);
const loading = ref(false);

const updateCurrentPage = (newPage: number) => {
  loading.value = true;
  currentPage.value = newPage;
  const filter = grammarStore.pagination || {};
  filter.offset = currentPage.value;
  grammarStore.getChapterList(filter);
  loading.value = false;
}

onMounted(async () => {
  loading.value = true;
  const filter = {
    limit: LIMIT_CHAPTER_LIST,
    offset: 1,
  };
  grammarStore.$patch({
    pagination: filter
  })
  await grammarStore.getChapterList(filter);
  loading.value = false;
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