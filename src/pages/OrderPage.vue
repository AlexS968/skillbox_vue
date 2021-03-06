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
          <router-link class="breadcrumbs__link" :to="{name:'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">{{ productsNumber }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div v-if="dataLoading">Оформляем заказ...
          <BlockPreloader class="preloader big"/>
        </div>
        <div class="cart__field" v-else>
          <div class="cart__data">
            <BaseFormText v-model="orderData.name" title="ФИО"
                          placeholder="Введите ваше полное имя" :error="orderError.name"/>
            <BaseFormText v-model="orderData.address" title="Адрес доставки"
                          placeholder="Введите ваш адрес" :error="orderError.address"/>
            <BaseFormText v-model="orderData.phone" title="Телефон" type="tel"
                          placeholder="Введите ваш телефон" :error="orderError.phone"/>
            <BaseFormText v-model="orderData.email" title="Email" type="email"
                          placeholder="Введите ваш Email" :error="orderError.email"/>
            <BaseFormTextarea v-model="orderData.comment" title="Комментарий к заказу"
                              placeholder="Ваши пожелания" :error="orderError.comment"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery"
                         value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <CartBlock :products-detail="cartDetailProducts" :show-button="true"
                   :total-amount="cartTotalAmount" :total-price="cartTotalPrice"/>

        <div class="cart__error form__error-block" v-if="orderErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ orderErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/base/BaseFormText.vue';
import BaseFormTextarea from '@/components/base/BaseFormTextarea.vue';
import CartBlock from '@/components/cart/CartBlock.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters, mapState } from 'vuex';
import enumerate from '@/helpers/enumerate';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  components: {
    BaseFormText, BaseFormTextarea, CartBlock, BlockPreloader,
  },
  data() {
    return {
      orderData: {},
      orderError: {},
      orderErrorMessage: '',
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice', 'cartTotalAmount']),
    ...mapState(['dataLoading']),
    productsNumber() {
      return `${this.cartTotalAmount} ${enumerate(this.cartTotalAmount,
        ['товар', 'товара', 'товаров'])}`;
    },
  },
  methods: {
    order() {
      this.orderError = {};
      this.orderErrorMessage = '';
      this.$store.commit('changeDataLoading', true);
      return (
        new Promise((resolve) => setTimeout(resolve, 2000)))
        // eslint-disable-next-line
        .then(() => {
          axios.post(`${API_BASE_URL}/api/orders`, {
            ...this.orderData,
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          })
            .then((response) => {
              this.$store.commit('resetCart');
              this.$store.commit('updateOrderInfo', response.data);
              this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
            })
            .catch((error) => {
              this.orderError = error.response.data.error.request || {};
              this.orderErrorMessage = error.response.data.error.message;
            })
            .then(() => {
              this.$store.commit('changeDataLoading', false);
            });
        });
    },
  },
};
</script>
