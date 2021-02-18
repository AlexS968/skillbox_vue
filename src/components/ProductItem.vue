<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
       @click.prevent="$emit('gotoPage', 'product', {id: product.id})">
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

    <span class="form__legend">Цвет</span><br>
    <ColorsBlock class="black__border__color" :colors="colors"/>

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
      return this.product.colorId.map((id) => colors.find((c) => c.id === id));
    },
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
