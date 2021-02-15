<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <ColorsBlock :colors="colors" :product-colors="product.colorId"/>

  </li>
</template>

<script>
import colors from '@/data/colors';
import ColorsBlock from './ColorsBlock.vue';

export default {
  components: { ColorsBlock },
  props: ['product'],
  computed: {
    colors() {
      return colors;
    },
  },
};
</script>
