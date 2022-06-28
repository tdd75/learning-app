<template>
  <div class="container-fluid">
    <div class="vocabulary-page container d-fl">
      <HeadingBar />
      <div class="card-lesson-list d-grid justify-content-between">
        <CardLesson v-for="index in 18" :key="index" />
      </div>
      <div class="pagination d-flex justify-content-center">
        <el-pagination :background="true" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardLesson from './components/CardLesson.vue';
import HeadingBar from './components/HeadingBar.vue';


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