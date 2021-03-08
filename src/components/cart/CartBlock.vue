<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in cartBlockData.productsDetail" :key="item.productId">
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.product.price | numberFormat }} ₽</b>
        <span>Артикул: {{ item.productId }}</span>
        <span style="color: white;">Количество: {{ item.amount }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: {{ productsNumber }} на сумму
        <b>{{ cartBlockData.totalPrice | numberFormat }} ₽</b></p>
    </div>

    <button class="cart__button button button--primery" type="submit"
            v-if="cartBlockData.showButton">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import enumerate from '@/helpers/enumerate';

export default {
  props: ['cartBlockData'],
  computed: {
    productsNumber() {
      return `${this.cartBlockData.totalAmount} ${enumerate(this.cartBlockData.totalAmount,
        ['товар', 'товара', 'товаров'])}`;
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
