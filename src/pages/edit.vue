<template>
  <section class="edit">
    <h3 class="edit__title">テンプレート更新</h3>

    <el-card class="edit__card">
      <template #header>
        <el-form label-position="top" class="edit__card--header">
          <el-form-item label="テンプレート名">
            <el-input
              v-model="form.name.templateName"
              placeholder="テンプレート名"
              class="edit__card--header__input"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>

      <!-- 質問項目 -->
      <el-form
        v-for="(item, index) in form.contents"
        :key="index"
        label-position="top"
        class="edit__card--contents"
      >
        <el-form-item
          :label="'項目' + (index + 1)"
          class="edit__card--contents__item edit__card--contents__item--label"
        >
          <el-input v-model="item.label"> </el-input>
        </el-form-item>
        <el-form-item
          :label="'項目' + (index + 1) + 'のタイプ'"
          class="edit__card--contents__item edit__card--contents__item--type"
        >
          <el-select v-model="item.type" placeholder="項目のタイプ">
            <el-option label="見出し" value="heading"></el-option>
            <el-option label="テキスト" value="text"></el-option>
            <el-option label="テキストエリア" value="textarea"></el-option>
            <el-option label="日付" value="date"></el-option>
            <el-option label="選択肢" value="select"></el-option>
            <el-option label="星" value="rate"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'select'"
          label="選択肢の追加"
          class="edit__card--contents__item--options"
        >
          <el-select
            v-model="item.options"
            multiple
            filterable
            allow-create
            fit-input-width
            placeholder="選択肢を入力してください"
            class="edit__card--contents__item--options__select-box"
          >
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="edit__card--button">
        <el-button
          class="edit__card--button--add-form"
          type="primary"
          plain
          @click="onClickAddingForm"
        >
          質問の追加
        </el-button>
        <el-button
          class="edit__card--button--edit-template"
          type="primary"
          @click="onClickUpdateTemplate"
        >
          テンプレート更新
        </el-button>
      </div>
    </el-card>

    <div class="edit__back-button">
      <router-link to="/">
        <el-button type="info"> 戻る </el-button>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

const { id } = route.params;

const form = store.state.template[id];

const onClickAddingForm = () => {
  const additionalContents = {
    label: "",
    type: "",
    value: "",
  };
  form.contents.push(additionalContents);
};

const onClickUpdateTemplate = () => {
  const updateItem = { index: id, form: form };
  store.dispatch("updateTemplate", updateItem);
  router.push("/");
};
</script>

<style lang="scss" scoped>
.edit {
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
      flex-wrap: wrap;

      &__item {
        // width: 30%;
        // flex-grow: 1;
        margin-right: 12px;

        &--label {
          width: 60%;
        }
        &--type {
          width: 30%;
        }
        &--options {
          width: 100%;
          &__select-box {
            width: 100%;
          }
        }
      }
    }

    &--button {
      display: flex;
      justify-content: space-between;
      margin-top: 48px;

      &--add-form {
        align-items: center;
      }
      &--edit-template {
        align-items: center;
      }
    }
  }
}
</style>
