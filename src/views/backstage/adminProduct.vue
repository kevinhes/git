<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td> {{ product.category }} </td>
          <td> {{ product.title }} </td>
          <td> {{ product.origin_price }} </td>
          <td> {{ product.price }} </td>
          <td>
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
              @click="openModal('edit')">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @get-products="getProducts"></pagination>
    <adminProductModal ref="adminProductModal"></adminProductModal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import pagination from '@/components/Pagination.vue';
import adminProductModal from '@/components/backstage/adminProductModal.vue';

export default {
  data() {
    return {
      token: document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1'),
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.backstageModule.adminProducts,
      pagination: (state) => state.backstageModule.adminPagination,
    }),
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/admin/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.$store.commit('setAdminProducts', res.data.products);
          this.$store.commit('setAdminPagination', res.data.pagination);
        })
        .catch(() => {
          alert('驗證錯誤，請重新登入');
        });
    },
    openModal(status) {
      if (status === 'new') {
        this.$refs.adminProductModal.openModal();
      }
    },
  },
  components: {
    pagination,
    adminProductModal,
  },
  mounted() {
    this.$http.defaults.headers.common.Authorization = this.token;
    this.getProducts();
  },
};
</script>
