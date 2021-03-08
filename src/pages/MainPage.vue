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
      <ProductFilter :price-from.sync="filters.filterPriceFrom"
                     :price-to.sync="filters.filterPriceTo"
                     :category-id.sync="filters.filterCategoryId"
                     :color-id.sync="filters.filterColorId"/>

      <section class="catalog">

        <div v-if="dataLoading">Товары загружаются... <BlockPreloader class="preloader big"/></div>
        <div v-if="dataTransferError">Произошла ошибка при загрузке &#128577;
          <button @click.prevent="loadAllProducts">Хотите повторить?</button></div>

        <ProductList :products="products" v-if="!dataLoading"/>
        <BasePagination v-model="filters.page" :count="countProducts" :per-page="productsPerPage"/>
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
        filterPriceFrom: 1,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: 0,
        page: 1,
      },
      productsData: null,
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
            page: this.filters.page,
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
  },
};
</script>
