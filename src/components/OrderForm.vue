<template>
  <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="onSubmit">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <Field id="email" name="email" type="email" class="form-control" rules="email|required"
                :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                v-model="user.data.user.email"
              ></Field>
      <error-message name="email" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label">收件人姓名</label>
      <Field id="name" name="姓名" type="text" class="form-control"
      :class="{ 'is-invalid': errors['姓名'] }" v-model="user.data.user.name"
                placeholder="請輸入姓名" rules="required"></Field>
      <error-message name="姓名" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="tel" class="form-label">收件人電話</label>
      <Field id="tel" name="電話" type="text" class="form-control" rules="required"
      :class="{ 'is-invalid': errors['電話'] }" v-model="user.data.user.tel"
                placeholder="請輸入電話" ></Field>
      <error-message name="電話" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">收件人地址</label>
      <Field id="address" name="地址" type="text" class="form-control"
      :class="{ 'is-invalid': errors['地址'] }" v-model="user.data.user.address"
                placeholder="請輸入地址" rules="required" ></Field>
      <error-message name="地址" class="invalid-feedback"></error-message>
    </div>

    <div class="mb-3">
      <label for="message" class="form-label">留言</label>
      <textarea id="message" class="form-control" cols="30" rows="10"
      v-model="user.data.message"></textarea>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-danger"
              >送出訂單</button>
    </div>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        data: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
      },
    };
  },
  methods: {
    onSubmit() {
      this.$http.post(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/order`, this.user)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.dir(error);
          alert('無法送出訂單');
        });
    },
  },
};
</script>
