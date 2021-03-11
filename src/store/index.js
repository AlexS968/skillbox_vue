import Vue from 'vue';
import Vuex from 'vuex';
import filters from './modules/filters';
import cart from './modules/cart';
import product from './modules/product';
import order from './modules/order';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    dataLoading: false,
    dataTransferError: false,
  },
  modules: {
    filters,
    cart,
    product,
    order,
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    changeDataLoading(state, dataLoading) {
      state.dataLoading = dataLoading;
    },
    changeDataTransferError(state, dataTransferError) {
      state.dataTransferError = dataTransferError;
    },
  },
  getters: {
    getUserAccessKey(state) {
      return state.userAccessKey;
    },
  },
  actions: {},
});
