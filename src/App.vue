<template>
  <div>
    <BaseHeader/>
    <router-view/>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseHeader from '@/components/base/BaseHeader.vue';
import BaseFooter from '@/components/base/BaseFooter.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  components: { BaseHeader, BaseFooter },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');

    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }

    this.loadCartProducts();
  },
  methods: {
    ...mapActions(['loadCartProducts']),
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>
