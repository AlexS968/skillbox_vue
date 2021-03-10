// initial state
import axios from 'axios';
import API_BASE_URL from '@/config';

const state = () => ({
  colorsData: null,
  categoriesData: null,
});

// actions
const actions = {
  async loadColors({ commit }) {
    const response = await axios.get(`${API_BASE_URL}/api/colors`);
    commit('loadColorsData', response.data);
  },
  async loadCategories({ commit }) {
    const response = await axios.get(`${API_BASE_URL}/api/productCategories`);
    commit('loadCategoriesData', response.data);
  },
};

// mutations
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const mutations = {
  loadColorsData(state, colors) {
    state.colorsData = colors;
  },
  loadCategoriesData(state, categories) {
    state.categoriesData = categories;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
