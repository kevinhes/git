<template>
  <div ref="modal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">
            {{ tempProduct.title }}
          </strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '@/mixins/modal';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      modal: '',
    };
  },
  computed: {
    ...mapState({
      tempProduct: (state) => state.backstageModule.adminTempProduct,
    }),
  },
  mixins: [ModalMixin],
  methods: {
    deleteProduct() {
      this.$http.delete(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_API_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          alert(res.data.message);
          this.$emit('get-products');
          this.modal.hide();
        })
        .catch(() => {
          alert('刪除產品失敗');
        });
    },
  },
};
</script>
