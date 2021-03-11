<template>
  <li class="cart__item product">
    <div class="product__pic">
      <router-link :to="{name:'product', params:{id:item.product.id}}">
        <img :src="item.product.image" width="120" height="120"
           alt="item.product.title">
      </router-link>
    </div>
    <h3 class="product__title">
      <router-link :to="{name:'product', params:{id:item.product.id}}">
        {{ item.product.title }}
      </router-link>
    </h3>
    <span class="product__code">Артикул: {{ item.product.id }}</span>

    <BlockCounter class="product__counter" :amount.sync="amount"/>

    <b class="product__price">
      {{ item.product.price * item.amount | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
            @click.prevent="deleteCartProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import BlockCounter from '@/components/common/BlockCounter.vue';

export default {
  props: ['item'],
  components: { BlockCounter },
  methods: {
    ...mapActions('cart', ['deleteCartProduct', 'updateCartProductAmount']),
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        if (value > 0) {
          this.updateCartProductAmount({
            productId: this.item.productId,
            amount: value,
          });
        }
      },
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
