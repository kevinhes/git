<template>
  <div class="text-end">
    <button class="btn btn-outline-danger" type="button" :class="{disabled: isLoading}"
    @click="cleanCart">清空購物車</button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cartList.carts">
        <tr v-for="cartItem in cartList.carts" :key="cartItem.id">
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm"
            @click="cleanCartItem(cartItem)" :class="{disabled: isLoading}">
              <i class="fas fa-spinner fa-pulse" v-if="itemLoading === cartItem.id"></i>
              x
            </button>
          </td>
          <td>
            {{ cartItem.product.title }}
            <!-- <div class="text-success">
              已套用優惠券
            </div> -->
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input v-model="cartItem.qty" @change="updateCartItem(cartItem)"
                      min="1" type="number" class="form-control" :disabled="isLoading">
                <span class="input-group-text" id="basic-addon2">
                  {{ cartItem.product.unit }}
                </span>
              </div>
            </div>
          </td>
          <td class="text-end">
            <small class="text-success"></small>
            {{ cartItem.total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cartList.total }}</td>
      </tr>
      <!-- <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cartList.final_total }}</td>
      </tr> -->
    </tfoot>
  </table>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      itemLoading: '',
      isLoading: false,
    };
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
  },
  methods: {
    cleanCart() {
      this.isLoading = true;
      this.$http.delete(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/carts`)
        .then((res) => {
          alert(res.data.message);
          this.isLoading = false;
          this.getCartList();
        })
        .catch(() => {
          alert('驗證錯誤，請重新再試');
        });
    },
    cleanCartItem(cartItem) {
      this.isLoading = true;
      this.itemLoading = cartItem.id;
      this.$http.delete(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/cart/${cartItem.id}`)
        .then((res) => {
          alert(res.data.message);
          this.isLoading = false;
          this.itemLoading = '';
          this.getCartList();
        })
        .catch((error) => {
          console.dir(error);
          alert('驗證錯誤，請重新再試');
        });
    },
    updateCartItem(cartItem) {
      this.isLoading = true;
      this.itemLoading = cartItem.id;
      const obj = {
        data: {
          product_id: cartItem.id,
          qty: cartItem.qty,
        },
      };
      this.$http.put(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/cart/${cartItem.id}`, obj)
        .then((res) => {
          alert(res.data.message);
          this.isLoading = false;
          this.itemLoading = '';
          this.getCartList();
        })
        .catch(() => {
          alert('驗證錯誤，請重新再試');
        });
    },
    ...mapActions(['getCartList']),
  },
};
</script>
