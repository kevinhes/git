<template>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td style="width: 200px">
          <div style="height: 100px; background-size: cover; background-position: center"
          :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
        </td>
        <td>
          {{ product.title }}
        </td>
        <td>
          <div class="h5">{{ product.price }} 元</div>
          <del class="h6">原價 {{ product.origin_price }} 元</del>
          <div class="h5">現在只要 {{ product.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary" @click="openModal(product)"
            :class="{'disabled': isLoading === true}">
              <i class="fas fa-spinner fa-pulse" v-if="productLoading === product.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger"
            @click="addToCart(product)"
            :class="{'disabled': isLoading === true}">
              <i class="fas fa-spinner fa-pulse" v-if="productLoading === product.id"></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal ref="productModal" @add-to-cart="addToCart" />
</template>

<script>
import { mapActions } from 'vuex';
import ProductModal from '@/components/ProductModal.vue';

export default {
  name: 'ProductList',
  data() {
    return {
      productLoading: '',
      isLoading: false,
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  components: {
    ProductModal,
  },
  methods: {
    addToCart(product, qty = 1) {
      this.isLoading = true;
      this.productLoading = product.id;
      const obj = {
        data: {
          product_id: product.id,
          qty,
        },
      };
      this.$http.post(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/cart`, obj)
        .then(() => {
          this.getCartList();
          this.productLoading = '';
          this.isLoading = false;
          alert('已經入購物車');
        })
        .catch(() => {
          alert('加入購物車失敗，請重新再試');
        });
    },
    openModal(product) {
      this.$refs.productModal.openModal();
      return this.$store.commit('setTempProduct', product);
    },
    ...mapActions(['getCartList']),
  },
};
</script>
