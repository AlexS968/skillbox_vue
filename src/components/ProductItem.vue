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

    <ul class="colors colors--black">
      <ColorItem v-for="color in product.colorId" :key="color.id" :color="color"/>
    </ul>
  </li>
</template>

<script>
import ColorItem from '@/components/ColorItem.vue';

export default {
  components: { ColorItem },
  props: ['product'],
};
</script>
