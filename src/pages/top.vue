<template>
  <section class="top">
    <h2 class="top__title">this is top page</h2>
    <div class="top__edit">
      <el-button type="primary" :icon="Edit"></el-button>
    </div>
    <el-card class="top__card">
      <template #header>
        <div class="top__card--header">
          <span> テストテンプレート </span>
          <el-button type="text">編集する</el-button>
        </div>
      </template>
      <div>template content</div>
    </el-card>
  </section>
</template>

<script setup>
import { Edit } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.top {
  text-align: center;

  &__edit {
    margin: 24px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__card {
    &--header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
