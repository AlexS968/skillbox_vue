<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name:'product', params:{id:product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name:'product', params:{id:product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <span class="form__legend">Цвет</span><br>
    <BlockColors :colors="product.colors"/>

  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import BlockColors from '../common/BlockColors.vue';

export default {
  components: { BlockColors },
  props: ['product'],
  filters: {
    numberFormat,
  },
};
</script>

<style>

.catalog__title{
  height: 50px;
}
</style>
