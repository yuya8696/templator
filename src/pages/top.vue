<template>
  <section class="top">
    <h2 class="top__title">Templator</h2>
    <div class="top__edit">
      <router-link to="/create">
        <el-button type="primary" :icon="Edit"></el-button>
      </router-link>
    </div>

    <!-- 項目入力 -->
    <el-card class="top__card">
      <template #header>
        <div class="top__card__header">
          <span> テストテンプレート </span>
          <el-button type="text">編集する</el-button>
        </div>
      </template>
      <div class="top__card__content">
        <el-form :model="test" label-width="120px">
          <h3 class="top__card__content--title1">ラーメンログ</h3>
          <el-form-item :label="test.shop.label">
            <el-input v-model="test.shop.value"></el-input>
          </el-form-item>
          <el-form-item :label="test.shop.label">
            <el-input v-model="test.ramen.value"></el-input>
          </el-form-item>
          <el-form-item :label="test.shop.label">
            <el-rate v-model="test.rate.value" allow-half />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="onClear">Clear</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 出力 -->
    <el-dialog
      v-model="dialogVisible"
      title="テストテンプレート"
      width="75%"
      class="top__output"
      show-close
      center
    >
      <div class="top__output__content">
        <!-- <p># ラーメンログ</p>
        <p>- {{ test.shop.label }}：{{ test.shop.value }}</p>
        <p>- {{ test.ramen.label }}：{{ test.ramen.value }}</p> -->
        <el-input
          v-model="textarea"
          :rows="5"
          type="textarea"
          placeholder="Please input"
          :input-style="{ backgroundColor: '#eeeeee' }"
        />
      </div>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onCopy">Copy</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { Edit } from "@element-plus/icons-vue";

const test = reactive({
  shop: {
    label: "ショップ",
    value: "",
  },
  ramen: {
    label: "ラーメン",
    value: "",
  },
  rate: {
    label: "レビュー",
    value: null,
  },
});

const dialogVisible = ref(false);

const textarea = ref("");

const onSubmit = () => {
  textarea.value = `# ラーメンログ
 - ${test.shop.label}：${test.shop.value}
 - ${test.ramen.label}：${test.ramen.value}
  - ${test.rate.label}：${test.rate.value}`;
  dialogVisible.value = true;
};

const onClear = () => {
  (test.shop.value = ""), (test.ramen.value = ""), (test.rate.value = null);
};

const onCopy = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(textarea.value);
  }
};
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
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__content {
      &--title1 {
        text-align: left;
      }
    }
  }

  &__output {
    &__content {
      margin: 0 auto;
      padding: 12px;
      width: 85%;
      background-color: #eeeeee;
    }
  }
}
</style>
