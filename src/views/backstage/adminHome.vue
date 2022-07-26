<template>
  <AdminNavbar></AdminNavbar>
  <RouterView />
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      token: document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1'),
    };
  },
  components: {
    AdminNavbar,
  },
  methods: {
    checkLoginStatus() {
      this.$http.post(`${process.env.VUE_APP_API}/v2/api/user/check`)
        .then(() => {
          this.getProducts();
        })
        .catch((error) => {
          console.dir(error);
          alert('您尚未登入');
          // this.$router.push('/loginpage');
        });
    },
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/admin/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          // console.log(this.setAdminProducts);
          // this.$store.modules.backstageModule.commit('setProducts', res.data.products);
          this.$store.commit('setAdminProducts', res.data.products);
        })
        .catch((error) => {
          console.dir(error);
          alert('驗證錯誤，請重新登入');
        });
    },
    ...mapMutations({
      setAdminProducts: (mutations) => mutations.backstageModule.setProducts,
    }),
  },
  mounted() {
    this.$http.defaults.headers.common.Authorization = this.token;
    this.checkLoginStatus();
  },
};
</script>
