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
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId" :color-id.sync="filterColorId"/>

      <section class="catalog">

        <div v-if="dataLoading">Товары загружаются... <BlockPreloader class="preloader big"/></div>

        <div v-if="dataLoadingFailure">Произошла ошибка при загрузке &#128577;
          <button @click.prevent="loadData">Хотите повторить?</button></div>

        <ProductList :products="products"/>
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
      filterPriceFrom: 1,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      productsData: null,
      page: 1,
      productsPerPage: 3,

      dataLoading: false,
      dataLoadingFailure: false,
    };
  },
  computed: {
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
    loadData() {
      this.dataLoading = true;
      this.dataLoadingFailure = false;
      clearTimeout(this.loadDataTimer);
      this.loadDataTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            colorId: this.filterColorId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          // eslint-disable-next-line
          .then((response) => this.productsData = response.data)
          // eslint-disable-next-line
          .catch(() => this.dataLoadingFailure = true)
          // eslint-disable-next-line
          .then(() => this.dataLoading = false);
      }, 5000);
    },
  },
  watch: {
    page() {
      this.loadData();
    },
    filterCategoryId() {
      this.loadData();
    },
    filterColorId() {
      this.loadData();
    },
    filterPriceFrom() {
      this.loadData();
    },
    filterPriceTo() {
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
};
</script>
