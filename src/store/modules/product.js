// initial state
import axios from 'axios';
import API_BASE_URL from '@/config';

const state = () => ({
  productData: null,
});

// actions
const actions = {
  async loadProductData({ commit }, id) {
    commit('changeDataLoading', true, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, 500); });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
      commit('setProductData', response.data);
      commit('changeDataLoading', false, { root: true });
    } catch (e) {
      await this.$router.replace({ name: 'notFound' });
      throw e;
    }
  },
};

// mutations
const mutations = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
  setProductData(state, data) {
    state.productData = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
