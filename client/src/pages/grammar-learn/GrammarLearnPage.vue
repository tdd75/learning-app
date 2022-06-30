<template>
  <div class="grammar-learn-page container">
    <HeadingBar class="mb-3" :title="grammarLearnStore.chapterName" :count="grammarLearnStore.grammarList.length"
      :is-show-mark-complete="!grammarLearnStore.status" :chapter-id="id" />
    <GrammarItem v-for="grammar in grammarLearnStore.grammarList" :key="grammar._id" :grammar-info="grammar" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import GrammarItem from './components/GrammarItem.vue';
import HeadingBar from './components/HeadingBar.vue';
import { useGrammarLearnStore } from './store';

const route = useRoute();
const grammarLearnStore = useGrammarLearnStore();

const id = route.params.id as string;

onMounted(async () => {
  await grammarLearnStore.getGrammarList(id);
});

</script>

<style lang="scss" scoped>
.grammar-learn-page {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>