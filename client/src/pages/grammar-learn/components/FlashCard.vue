<template>
  <div class="scene">
    <div class="card" :class="{ flipme: cardOne == 'flipped' }">
      <div class="card__face card__face--front">
        <FrontFaceCard class="flash-card flash-card__face--front" @flip="flip" />
      </div>
      <div class="card__face card__face--back">
        <BackFaceCard class="flash-card flash-card__face--back" @flip="flip" />
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import FrontFaceCard from './FrontFaceCard.vue';
import BackFaceCard from './BackFaceCard.vue';
import { ref } from 'vue';

const cardOne = ref('start');

const flip = () => {
  cardOne.value == 'start' ? (cardOne.value = 'flipped') : (cardOne.value = 'start')
}

</script>

<style lang="scss" scoped>
.scene {
  width: 520px;
  height: 220px;
}

.card {
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;

  &__face {
    position: absolute;
    backface-visibility: hidden;

    &--back {
      transform: rotateY(180deg);
    }
  }
}

.flipme {
  transform: rotateY(180deg);
}
</style>