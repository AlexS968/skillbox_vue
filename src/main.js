import Vue from 'vue';
import App from './App.vue';

import { firstVariable, secondVariable } from './data';
import MyFunctions from './MyFunctions';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

MyFunctions.MyFunction(firstVariable.firstMessage);
MyFunctions.MyFunction(secondVariable.secondMessage);
