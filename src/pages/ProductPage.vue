<template>
  <main v-if="dataLoading">Загрузка товара...
    <BlockPreloader class="preloader big"/></main>
  <main class="content container" v-else>
    <div class="content__top" v-if="productData">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'main'}">
            {{ productData.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ productData.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item" v-if="productData">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="productData.image.file.url" :alt="productData.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productData.id }}</span>
        <h2 class="item__title">
          {{ productData.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ productData.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <BlockColors class="white__border__color" :colors="productData.colors"/>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объем в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio"
                           name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">

              <BlockCounter :amount.sync="productAmount"/>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>

            <div v-if="productAdded">Товар добавлен в корзину</div>
            <div v-if="productAddSending">Добавляем товар в корзину...
              <BlockPreloader class="preloader small"/></div>

          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
            велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
            Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и различные приложения
            сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая
            сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего
            74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из
            черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю
            56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и
            синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс
            и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает
            кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import BlockColors from '@/components/common/BlockColors.vue';
import BlockCounter from '@/components/common/BlockCounter.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      productAmount: 1,

      productAdded: false,
      productAddSending: false,
    };
  },
  components: { BlockColors, BlockCounter, BlockPreloader },
  computed: {
    ...mapState(['dataLoading']),
    ...mapState('product', ['productData']),
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),
    ...mapActions('product', ['loadProductData']),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({
        productId: this.productData.id,
        amount: this.productAmount,
      })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
  },
  filters: {
    numberFormat,
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProductData(this.$route.params.id);
      },
      immediate: true,
    },
  },
};
</script>
