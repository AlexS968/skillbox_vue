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
    <BlockColors class="black__border__color" :colors="colors"/>

  </li>
</template>

<script>
import colors from '@/data/colors';
import numberFormat from '@/helpers/numberFormat';
import BlockColors from '../common/BlockColors.vue';

export default {
  components: { BlockColors },
  props: ['product'],
  computed: {
    colors() {
      return this.product.colorId.map((id) => colors.find((c) => c.id === id));
    },
  },
  filters: {
    numberFormat,
  },
};
</script>

<style>
.black__border__color{
  display: inline-flex;
  border: 1px solid black;
}
.catalog__title{
  height: 50px;
}
</style>
