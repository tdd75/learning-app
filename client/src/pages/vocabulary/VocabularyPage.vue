<template>
  <div class="container-fluid">
    <div class="vocabulary-page container d-fl">
      <HeadingBar :total-lesson="vocabularyStore.lengthTopicList" :progress="vocabularyStore.progress" />
      <div class="card-lesson-list d-grid justify-content-between">
        <CardLesson v-for="topic in vocabularyStore.topicList" :key="topic.topicId" :lesson-id="topic.topicId"
          :count-learned="topic.topicStatus" />
      </div>
      <div class="pagination d-flex justify-content-center">
        <el-pagination :background="true" :page-size="LIMIT_LESSON_LIST" layout="prev, pager, next"
          :total="vocabularyStore.lengthTopicList" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardLesson from './components/CardLesson.vue';
import HeadingBar from './components/HeadingBar.vue';
import { useVocabularyStore } from './store';
import { ITopic } from '@/common/interfaces';
import { onMounted } from 'vue';
import { LIMIT_LESSON_LIST } from './constants';

const vocabularyStore = useVocabularyStore();

onMounted(async () => {
  await vocabularyStore.getTopicList({
    limit: LIMIT_LESSON_LIST,
    offset: 0,
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