<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">{{ productsNumber }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div v-if="dataLoading">Товары загружаются... <BlockPreloader class="preloader big"/></div>
        <div v-else-if="dataTransferError">Произошла ошибка при загрузке &#128577;</div>
        <div class="cart__field" v-else>
          <ul class="cart__list">
            <CartItem v-for="item in cartDetailProducts" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartTotalPrice | numberFormat }} ₽</span>
          </p>

          <router-link class="cart__button button button--primery" tag="button"
                       type="submit" :to="{name:'order'}">
            Оформить заказ
          </router-link>

        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import CartItem from '@/components/cart/CartItem.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import { mapGetters, mapState } from 'vuex';
import enumerate from '@/helpers/enumerate';

export default {
  components: { CartItem, BlockPreloader },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice', 'cartTotalAmount']),
    ...mapState(['dataLoading', 'dataTransferError']),
    productsNumber() {
      return `${this.cartTotalAmount} ${enumerate(this.cartTotalAmount,
        ['товар', 'товара', 'товаров'])}`;
    },
  },
};
</script>
