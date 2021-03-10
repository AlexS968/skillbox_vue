<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ this.productsNumber }} в продаже
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter :current-filters.sync="filters"/>

      <section class="catalog">

        <div v-if="dataLoading">Товары загружаются... <BlockPreloader class="preloader big"/></div>
        <div v-if="dataTransferError">Произошла ошибка при загрузке &#128577;
          <button @click.prevent="loadAllProducts">Хотите повторить?</button></div>

        <ProductList :products="products" v-if="!dataLoading"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>

    </div>
  </main>
</template>

<script>
import enumerate from '@/helpers/enumerate';
import ProductList from '@/components/product/ProductList.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import ProductFilter from '@/components/product/ProductFilter.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    BlockPreloader,
  },
  data() {
    return {
      filters: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: 0,
      },
      productsData: null,
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    ...mapState(['dataLoading', 'dataTransferError']),
    products() {
      return this.productsData
        // eslint-disable-next-line
        ? this.productsData.items.map((product) => {
          return {
            ...product,
            image: product.image.file.url,
          };
        })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : [];
    },
    productsNumber() {
      return `${this.countProducts} ${enumerate(this.countProducts,
        ['товар', 'товара', 'товаров'])}`;
    },
  },
  methods: {
    ...mapMutations(['changeDataLoading', 'changeDataTransferError']),

    loadAllProducts() {
      this.changeDataLoading(true);
      this.changeDataTransferError(false);
      clearTimeout(this.loadAllProductsTimer);

      this.loadAllProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filters.filterCategoryId,
            colorId: this.filters.filterColorId,
            minPrice: this.filters.filterPriceFrom,
            maxPrice: this.filters.filterPriceTo,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => {
            this.changeDataTransferError(true);
          })
          .then(() => {
            this.changeDataLoading(false);
          });
      }, 2000);
    },
  },
  watch: {
    filters: {
      handler() {
        this.loadAllProducts();
      },
      deep: true,
      immediate: true,
    },
    page() {
      this.loadAllProducts();
    },
  },
};
</script>
