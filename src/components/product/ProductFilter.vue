<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price"
                 v-model.number="filters.priceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price"
                 v-model.number="filters.priceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" v-if="categoriesData">
          <select class="form__select" type="text" name="category"
                  v-model.number="filters.categoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categoriesData.items"
                    :key="category.id">
              {{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <BlockColors v-if="colorsData" :colors="colorsData.items"
                     :current-color-id.sync="filters.colorId"/>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8"
                     checked="">
              <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume"
                     value="128">
              <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume"
                     value="264">
              <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BlockColors from '../common/BlockColors.vue';

export default {
  data() {
    return {
      filters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: 0,
      },
    };
  },
  props: ['currentFilters'],
  components: { BlockColors },
  computed: {
    ...mapState('filters', ['colorsData', 'categoriesData']),
  },
  methods: {
    ...mapActions('filters', ['loadColors', 'loadCategories']),
    submit() {
      this.$emit('update:currentFilters', {
        filterPriceFrom: this.filters.priceFrom,
        filterPriceTo: this.filters.priceTo,
        filterCategoryId: this.filters.categoryId,
        filterColorId: this.filters.colorId,
      });
    },
    reset() {
      this.$emit('update:currentFilters', {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: 0,
      });
    },
  },
  watch: {
    currentFilters: {
      handler(value) {
        this.filters.priceFrom = value.filterPriceFrom;
        this.filters.priceTo = value.filterPriceTo;
        this.filters.categoryId = value.filterCategoryId;
        this.filters.colorId = value.filterColorId;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
