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
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>

    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import enumerate from '@/helpers/enumerate';
import ProductList from '@/components/product/ProductList.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import ProductFilter from '@/components/product/ProductFilter.vue';
import axios from 'axios';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 1,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      productsData: null,
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts
          .filter((product) => (product.categoryId === this.filterCategoryId));
      }

      if (this.filterColorId > 0) {
        filteredProducts = filteredProducts
          .filter((product) => (product.colorId.indexOf(this.filterColorId) !== -1));
      }

      return filteredProducts;
    },
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
      return this.productsData
        ? this.productsData.pagination.total : [];
    },
    productsNumber() {
      return `${this.countProducts} ${enumerate(this.countProducts,
        ['товар', 'товара', 'товаров'])}`;
    },
  },
  methods: {
    loadData() {
      // eslint-disable-next-line
      axios.get(`https://vue-study.skillbox.cc/api/products?page=${this.page}&limit=${this.productsPerPage}`)
        .then((response) => { this.productsData = response.data; });
    },
  },
  watch: {
    page() {
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
};
</script>
