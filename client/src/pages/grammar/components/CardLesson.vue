<template>
  <router-link class="router-link" :to="{
    name: PageName.GRAMMAR_LEARN_PAGE,
    params: {
      id: 5
    }
  }">
    <div class="card-lesson d-flex flex-column align-items-center">
      <img class="card-lesson__image" src="@/assets/images/img/grammar2.jpg">
      <div class="card-lesson__title">
        {{ chapterTitle }}
      </div>
      <div class="d-flex align-items-center mb-2 ">
        <el-icon>
          <CircleCheckFilledIcon :color="isLearned ? '#5cc046' : ''" />
        </el-icon>
        <div class="learned ms-1">{{ t(`grammar.card.${isLearned ? 'learned' : 'notLearned'}`) }}</div>
      </div>
      <el-button type="primary" class="button-learn-now">
        {{ t('grammar.card.learnNow') }}
      </el-button>
      <!-- <div class="learned">{{ t(`grammar.card.${isLearned ? 'learned' : 'notLearned'}`) }}</div> -->
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { PageName } from '../../../common/constants';
import { CircleCheckFilled as CircleCheckFilledIcon } from '@element-plus/icons-vue'

const { t } = useI18n();

const props = defineProps({
  chapterId: {
    type: String,
    required: true,
  },
  chapterTitle: {
    type: String,
    required: true,
  },
  isLearned: {
    type: Boolean,
    required: true,
  }
})

</script>

<style lang="scss" scoped>
.card-lesson {
  width: 225px;
  height: 265px;
  padding: 20px;
  background-color: $color-grey;
  border-radius: 8px;
  border: 1px solid $color-grey-1;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 8px 2px $color-grey-1;

  }

  &__image {
    width: auto;
    height: 125px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  &__title {
    margin-bottom: 8px;
    font-size: 20px;
  }

  .el-progress--line {
    width: 140px;
  }


}

.button-learn-now {
  font-size: 18px;
  padding: 18px 50px;
  @include set-background-color($color-green);
  border-radius: 8px;
}
</style>