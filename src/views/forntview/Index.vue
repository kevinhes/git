<template>
  <section class="container">
    <div class="mt-4">
      <!-- 產品列表 -->
      <ProductList />
      <!-- 購物車列表 -->
      <ShoppingCart />
    </div>
      <!-- 送出訂單 -->
    <div class="my-5 row justify-content-center">
      <OrderForm />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import ProductList from '@/components/ProdcutList.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import OrderForm from '@/components/OrderForm.vue';

export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
    cartList() {
      return this.$store.state.cartList;
    },
  },
  components: {
    ProductList,
    ShoppingCart,
    OrderForm,
  },
  methods: {
    ...mapActions(['getProducts', 'getCartList']),
  },
  mounted() {
    this.getProducts();
    this.getCartList();
  },
};
</script>
