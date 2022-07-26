import { createStore } from 'vuex';
import axios from 'axios';

const backstageModule = {
  state: () => ({
    adminProducts: [],
    adminPagination: {},
    adminTempProduct: {},
    isNew: false,
  }),
  mutations: {
    setAdminProducts(state, payload) {
      state.adminProducts = payload;
    },
    setAdminPagination(state, payload) {
      state.adminPagination = payload;
    },
    setadminTempProduct(state, payload) {
      state.adminTempProduct = payload;
    },
    setIsNew(state, payload) {
      state.isNew = payload;
    },
  },
};

export default createStore({
  state: {
    products: [],
    cartList: {},
    tempProduct: {},
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setCartList(state, payload) {
      state.cartList = payload;
    },
    setTempProduct(state, payload) {
      state.tempProduct = payload;
    },
  },
  actions: {
    getProducts({ commit, page = 1 }) {
      const url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/products?page=${page}`;
      axios.get(url)
        .then((res) => {
          commit('setProducts', res.data.products);
        })
        .catch(() => {
          alert('驗證錯誤，請重新登入');
        });
    },
    getCartList({ commit }) {
      axios.get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/cart`)
        .then((res) => {
          commit('setCartList', res.data.data);
        })
        .catch(() => {
          alert('驗證錯誤，請重新登入');
        });
    },
  },
  modules: {
    backstageModule,
  },
});
