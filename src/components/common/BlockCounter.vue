<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="reduceAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" name="count" v-model.number="computedAmount">

    <button type="button" aria-label="Добавить один товар" @click.prevent="computedAmount++">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: ['amount'],
  computed: {
    computedAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        this.$emit('update:amount', value);
      },
    },
  },
  methods: {
    reduceAmount() {
      if (this.amount > 0) {
        this.computedAmount -= 1;
      }
    },
  },
};
</script>
