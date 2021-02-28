<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name:'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ productsNumber }} </span>
  </router-link>
</template>

<script>

export default {
  computed: {
    productsNumber() {
      return this.$store.state.cartProducts.length;
    },
  },
};
</script>
