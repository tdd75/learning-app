<template>
  <div class="grammar-item pb-1 mb-1" @click="showDialog">{{ grammarInfo?.title }}</div>

  <el-dialog v-model="isShowLearnDialog" width="50%" top="5vh" :title="grammarInfo?.title">
    <template #default>
      <div class="d-flex justify-content-center mb-4">
        <audio :src="grammarInfo?.sound" controls></audio>
      </div>
      <img class="dialog-image" :src="grammarInfo?.image" />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isShowLearnDialog = ref(false);

const props = defineProps({
  grammarInfo: Object,
})

const showDialog = () => {
  isShowLearnDialog.value = true;
}

</script>

<style lang="scss" scoped>
.grammar-item {
  color: $color-dark-grey-1;
  border-bottom: 1px solid $color-grey;
  cursor: pointer;
}

.dialog-image {
  width: 100%;
}
</style>