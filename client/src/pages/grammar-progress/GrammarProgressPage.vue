<template>
  <div class="container-fluid">
    <div class="grammarProgress-progress-page container ">
      <HeadingBar :total-topic="grammarProgressStore.lengthTopicList" :progress="grammarProgressStore.progress" />
      <div class="card-topic-list d-grid justify-content-between" v-loading="loading">
        <CardTopic v-for="topic in grammarProgressStore.topicList" :key="topic.topic" :topic="topic.topic"
          :count-learned="topic.topicProgress" />
      </div>
      <div class="pagination d-flex justify-content-center">
        <el-pagination :background="true" :page-size="LIMIT_TOPIC_LIST" layout="prev, pager, next"
          :total="grammarProgressStore.lengthTopicList" :current-page="currentPage"
          @current-change="updateCurrentPage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CardTopic from './components/CardTopic.vue';
import HeadingBar from './components/HeadingBar.vue';
import { useGrammarProgressStore } from './store';
import { onMounted } from 'vue';
import { LIMIT_TOPIC_LIST } from './constants';

const grammarProgressStore = useGrammarProgressStore();
const currentPage = ref(1);
const loading = ref(false);

const updateCurrentPage = (newPage: number) => {
  loading.value = true;
  currentPage.value = newPage;
  const filter = grammarProgressStore.pagination || {};
  filter.offset = currentPage.value;
  grammarProgressStore.getTopicList(filter);
  loading.value = false;
}

onMounted(async () => {
  loading.value = true;
  const filter = {
    limit: LIMIT_TOPIC_LIST,
    offset: 1,
  };
  grammarProgressStore.$patch({
    pagination: filter
  })
  await grammarProgressStore.getTopicList(filter);
  loading.value = false;
})

</script>

<style lang="scss" scoped>
.container-fluid {
  background-color: $color-light-grey-1;
  padding-bottom: 20px;
}

.card-topic-list {
  row-gap: 40px;
  grid-template-columns: repeat(auto-fill, 225px);
}

.pagination {
  margin-top: 20px;
}
</style>