// initial state
import axios from 'axios';
import API_BASE_URL from '@/config';

const state = () => ({
  cartProducts: [],
  cartProductsData: [],
});

// getters
const getters = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
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
  cartTotalPrice(state) {
    return state.cartProductsData
      .reduce((acc, item) => (item.price * item.quantity) + acc, 0);
  },
  cartTotalAmount(state) {
    return state.cartProducts
      .reduce((acc, item) => item.amount + acc, 0);
  },
};

// actions
const actions = {
  async loadCartProducts({ state, commit, rootGetters }) {
    commit('changeDataLoading', true, { root: true });
    commit('changeDataTransferError', null, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, 500); });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/baskets`, {
        params: { userAccessKey: rootGetters.getUserAccessKey },
      });
      if (!state.userAccessKey) {
        localStorage.setItem('userAccessKey', response.data.user.accessKey);
        commit('updateUserAccessKey', response.data.user.accessKey, { root: true });
      }
      commit('updateCartProductsData', response.data.items);
      commit('syncCartProducts');
      commit('changeDataLoading', false, { root: true });
    } catch (e) {
      commit('changeDataLoading', false, { root: true });
      commit('changeDataTransferError', null, { root: true });
      throw e;
    }
  },
  async addProductToCart({ commit, rootGetters }, { productId, amount }) {
    await new Promise((resolve) => { setTimeout(resolve, 500); });
    const response = await axios.post(`${API_BASE_URL}/api/baskets/products`, {
      productId,
      quantity: amount,
    }, {
      params: { userAccessKey: rootGetters.getUserAccessKey },
    });
    commit('updateCartProductsData', response.data.items);
    commit('syncCartProducts');
  },
  async updateCartProductAmount({ commit, rootGetters }, { productId, amount }) {
    commit('updateCartProductAmount', { productId, amount });
    try {
      const response = await axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: { userAccessKey: rootGetters.getUserAccessKey },
      });
      commit('updateCartProductsData', response.data.items);
    } catch (e) {
      commit('syncCartProducts');
      throw e;
    }
  },
  async deleteCartProduct({ commit, rootGetters }, productId) {
    const response = await axios.delete(`${API_BASE_URL}/api/baskets/products`, {
      params: { userAccessKey: rootGetters.getUserAccessKey },
      data: { productId },
    });
    commit('updateCartProductsData', response.data.items);
    commit('syncCartProducts');
  },
};

// mutations
const mutations = {
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
  resetCart(state) {
    state.cartProducts = [];
    state.cartProductsData = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
