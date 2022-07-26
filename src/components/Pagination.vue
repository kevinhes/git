<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled: pagination.has_pre === false}">
        <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="pageChange(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page"
      :class="{active: pagination.current_page === page}">
        <a class="page-link" href="#" @click.prevent="pageChange(page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{disabled: pagination.has_next === false}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="pageChange(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    pageChange(page) {
      this.$emit('get-products', page);
    },
  },
};
</script>
