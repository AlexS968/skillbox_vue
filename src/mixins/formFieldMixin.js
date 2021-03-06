import BaseFormField from '@/components/base/BaseFormField.vue';

export default {
  components: { BaseFormField },
  props: ['title', 'error', 'placeholder'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
