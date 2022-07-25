<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">
        請先登入
      </h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username"
              placeholder="name@example.com" required autofocus v-model="user.username">
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password" v-model="user.password"
              placeholder="Password" required>
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="button" @click="login">
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">
      &copy; 2021~∞ - 六角學院
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$http.post(`${process.env.VUE_APP_API}/v2/admin/signin`, this.user)
        .then((res) => {
          console.log(res);
          const { token, expired } = res.data;
          document.cookie = `hextoken=${token}; expires=${expired}`;
        })
        .catch(() => {
          alert('登入失敗，請重新登入');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  html,body {
    height: 100%;
    text-align: center;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
</style>
