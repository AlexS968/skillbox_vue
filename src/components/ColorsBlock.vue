<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label" v-if="productColors.indexOf(color.id) !== -1">
        <input class="colors__radio sr-only" type="radio" :value="color.id"
               v-model="computedColorId">
        <span class="colors__value" :style="'background-color: ' + color.title"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors', 'productColors', 'currentColorId'],
  computed: {
    computedColorId: {
      get() {
        return this.currentColorId;
      },
      set(value) {
        this.$emit('update:currentColorId', value);
      },
    },
  },
};
</script>
