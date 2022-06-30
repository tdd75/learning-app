<template>
  <div class="learning-complete d-flex">
    <img src="@/assets/images/learning-finish.png" />
    <div class="content">
      <div>{{ t('grammarLearn.learningComplete.congratulation') }}</div>
      <div class="flashcard">{{ t('grammarLearn.learningComplete.flashcard') }}</div>
      <div class="redirect">{{ t('grammarLearn.learningComplete.redirect') }}</div>
      <router-link :to="{
        name: PageName.VOCABULARY_TEST_PAGE,
        params: {
          id: id
        }
      }" class="router-link">
        <el-button type="primary" class="button-redirect-test">
          {{ t('grammarLearn.learningComplete.test') }}
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { PageName } from '../../../common/constants';
const { t } = useI18n();

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

</script>

<style lang="scss" scoped>
.learning-complete {
  padding: 20px 400px;

  img {
    width: 300px;
  }
}

.content {
  padding: 50px;
}

.flashcard {
  font-size: 28px;
  margin-bottom: 8px;
}

.redirect {
  font-size: 14px;
  margin-bottom: 20px;
  font-style: italic;
  color: $color-dark-grey;
}

.button-redirect-test {
  @include set-background-color($color-green);
  padding: 16px 120px;
}
</style>