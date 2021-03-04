import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,

    cartProductsData: [],

    dataLoading: false,
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts
        .find((i) => i.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts
        .filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      // eslint-disable-next-line
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
    changeDataLoading(state, dataLoading) {
      state.dataLoading = dataLoading;
    },
  },
  getters: {
    cartDetailProducts(state) {
      // eslint-disable-next-line
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData
          .find((p) => p.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => item.amount + acc, 0);
    },
  },
  actions: {
    loadCartProducts(context) {
      context.commit('changeDataLoading', true);

      this.loadCartProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
          .then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
              context.commit('updateUserAccessKey', response.data.user.accessKey);
            }
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          })
          .then(() => context.commit('changeDataLoading', false));
      }, 2000);
    },
    addProductToCart(context, { productId, amount }) {
      return (
        new Promise((resolve) => setTimeout(resolve, 2000)))
        // eslint-disable-next-line
        .then(() => {
          return axios
            .post(`${API_BASE_URL}/api/baskets/products`, {
              productId,
              quantity: amount,
            }, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => context.commit('syncCartProducts'));
    },
    deleteCartProduct(context, productId) {
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});
