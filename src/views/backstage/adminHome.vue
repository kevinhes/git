<template>
  <AdminNavbar></AdminNavbar>
  <RouterView />
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue';

export default {
  components: {
    AdminNavbar,
  },
  methods: {
    checkLoginStatus() {
      this.$http.post(`${process.env.VUE_APP_API}/v2/api/user/check`)
        .then(() => {
        })
        .catch((error) => {
          console.dir(error);
          alert('您尚未登入');
          // this.$router.push('/loginpage');
        });
    },
  },
  mounted() {
    this.checkLoginStatus();
  },
};
</script>
