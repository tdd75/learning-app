<template>
  <router-link class="router-link" :to="{
    name: PageName.GRAMMAR_TEST_PAGE,
    params: {
      topic: topic
    }
  }">
    <div class="card-topic d-flex flex-column align-items-center">
      <img class="card-topic__image" src="@/assets/images/img/grammar3.png">
      <div class="card-topic__title">
        {{ t('grammarProgress.card.topic', {
            topic: topic
          })
        }}
      </div>
      <div class="mb-2">
        <el-progress :percentage="ratioToPercentage(countLearned)" :stroke-width="14" color="#5cc046"
          :show-text="false" />
      </div>
      <div class="learned">{{ t('grammarProgress.card.learned', { ratio: countLearned }) }}</div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { PageName } from '../../../common/constants';
import { ratioToPercentage } from '../../../common/helpers';


const { t } = useI18n();

const props = defineProps({
  topic: {
    type: String,
    required: true,
  },
  countLearned: {
    type: String,
    required: true,
  }
})

</script>

<style lang="scss" scoped>
.card-topic {
  width: 225px;
  height: fit-content;
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
    height: 105px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  &__title {
    height: 60px;
    margin-bottom: 8px;
    font-size: 18px;
    text-align: center;
    @include limit-by-n-line(2);
  }

  .el-progress--line {
    width: 140px;
  }

  .learned {
    font-size: 14px;
    color: $color-dark-grey-1;
  }
}
</style>