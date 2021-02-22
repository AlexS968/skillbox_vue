<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="removeProduct">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" name="count" v-model.number="computedProductAmount">

    <button type="button" aria-label="Добавить один товар" @click.prevent="addProduct">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: ['productAmount'],
  computed: {
    computedProductAmount: {
      get() {
        return this.productAmount;
      },
      set(value) {
        this.$emit('update:productAmount', value);
      },
    },
  },
  methods: {
    addProduct() {
      this.$emit('update:productAmount', this.productAmount + 1);
    },
    removeProduct() {
      if (this.productAmount > 0) {
        this.$emit('update:productAmount', this.productAmount - 1);
      }
    },
  },
};
</script>
