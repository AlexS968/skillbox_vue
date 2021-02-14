<template>
  <li class="colors__item">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" value="color.title">
      <span class="colors__value" :style="'background-color: ' + colorTitle">
                  </span>
    </label>
  </li>
</template>

<script>
import colors from '@/data/colors';

export default {
  props: ['color'],
  computed: {
    colorTitle() {
      return colors.find((color) => color.id === this.color).title;
    },
  },
};
</script>
