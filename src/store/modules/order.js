// initial state
import axios from 'axios';
import API_BASE_URL from '@/config';

const state = () => ({
  orderInfo: null,
});

const getters = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
  orderDetailProducts(state) {
    // eslint-disable-next-line
    return state.orderInfo.basket.items.map((item) => {
      return {
        ...item,
        amount: item.quantity,
        productId: item.product.id,
      };
    });
  },
  orderTotalPrice(state) {
    return state.orderInfo.totalPrice;
  },
  orderTotalAmount(state) {
    return state.orderInfo.basket.items
      .reduce((acc, item) => item.quantity + acc, 0);
  },
};

// actions
const actions = {
  async makeOrder({ commit, rootGetters }, orderData) {
    commit('changeDataLoading', true, { root: true });
    this.orderError = {};
    this.orderErrorMessage = '';
    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders`, {
        ...orderData,
      }, {
        params: { userAccessKey: rootGetters.getUserAccessKey },
      });
      commit('cart/resetCart', null, { root: true });
      commit('updateOrderInfo', response.data);
      commit('changeDataLoading', false, { root: true });
      return response;
    } catch (error) {
      commit('changeDataLoading', false, { root: true });
      throw error;
    }
  },
  async loadOrderInfo({ commit, rootGetters }, orderId) {
    const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
      params: { userAccessKey: rootGetters.getUserAccessKey },
    });
    commit('updateOrderInfo', response.data);
  },
};

// mutations
const mutations = {
  updateOrderInfo(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
