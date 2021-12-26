<template>
  <section class="create">
    <h2 class="create__title">create new template</h2>

    <el-card class="create__card">
      <template #header>
        <el-form label-position="top" class="create__card--header">
          <el-form-item label="テンプレート名">
            <el-input
              v-model="form.name.templateName"
              placeholder="テンプレート名"
              class="create__card--header__input"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>

      <!-- 質問項目 -->
      <el-form
        v-for="(item, index) in form.contents"
        :key="index"
        label-position="top"
        class="create__card--contents"
      >
        <el-form-item
          :label="'質問' + (index + 1)"
          class="
            create__card--contents__item create__card--contents__item--label
          "
        >
          <el-input v-model="item.label"> </el-input>
        </el-form-item>
        <el-form-item
          :label="'質問' + (index + 1) + 'のタイプ'"
          class="create__card--contents__item"
        >
          <el-select v-model="item.type" placeholder="質問のタイプ">
            <el-option label="テキスト" value="text"></el-option>
            <el-option label="テキストエリア" value="textarea"></el-option>
            <el-option label="日付" value="date"></el-option>
            <el-option label="選択肢" value="select"></el-option>
            <el-option label="星" value="rate"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="create__card--button">
        <el-button type="primary" plain @click="onClickAddingForm"
          >質問の追加</el-button
        >
      </div>
    </el-card>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  test: "テスト",
  name: {
    templateName: "",
  },
  contents: [
    {
      label: "",
      type: "",
    },
  ],
});

const onClickAddingForm = () => {
  const additionalContents = {
    label: "",
    type: "",
  };
  form.contents.push(additionalContents);
};
</script>

<style lang="scss" scoped>
.create {
  text-align: center;

  &__card {
    margin: 24px 0;

    &--header {
      width: 100%;
    }

    &--contents {
      width: 100%;
      display: flex;
      text-align: left;
      justify-content: flex-start;
      // flex-wrap: wrap;

      &__item {
        // width: 30%;
        flex-grow: 1;
        margin-right: 12px;

        &--label {
          width: 70%;
        }
      }
    }

    &--button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
