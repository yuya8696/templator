<template>
  <section class="edit">
    <h3 class="edit__title">テンプレート更新</h3>

    <el-card class="edit__card">
      <template #header>
        <el-form
          @submit.prevent
          label-position="top"
          class="edit__card__header"
        >
          <el-form-item label="テンプレート名">
            <el-input
              v-model="form.name.templateName"
              placeholder="テンプレート名"
              class="edit__card__header__input"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>

      <!-- 質問項目 -->
      <el-form
        @submit.prevent
        v-for="(item, index) in form.contents"
        :key="index"
        label-position="top"
        class="edit__card__contents"
      >
        <el-form-item
          :label="'項目' + (index + 1)"
          class="edit__card__contents__item edit__card__contents__item__label"
        >
          <el-input v-model="item.label"> </el-input>
        </el-form-item>
        <el-form-item
          :label="'項目' + (index + 1) + 'のタイプ'"
          class="edit__card__contents__item edit__card__contents__item__type"
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
          class="edit__card__contents__item__options"
        >
          <el-select
            v-model="item.options"
            multiple
            filterable
            allow-create
            fit-input-width
            placeholder="選択肢を入力してください"
            class="edit__card__contents__item__options__select-box"
          >
            <template #empty></template>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="edit__card__button">
        <el-button class="edit__card__button--add-form" @click="onClickAdd">
          質問の追加
        </el-button>
        <el-button
          class="edit__card__button--edit-template"
          type="primary"
          plain
          @click="onClickUpdate"
        >
          テンプレート更新
        </el-button>
      </div>
    </el-card>

    <!-- 確認ダイアログ -->
    <dialog-component
      v-model:dialog="dialogVisible"
      :contents="dialogContents"
      @click="onClickConfirm"
    >
      <span>この内容でテンプレートを更新します。よろしいですか？</span>
      <card-component v-model:form="form" :disabled="true" class="edit__card">
        <template v-slot:header>
          <div>
            <span> {{ form.name.templateName }} </span>
          </div>
        </template>
      </card-component>
    </dialog-component>

    <div class="edit__back-button">
      <router-link to="/">
        <el-button type="info"> 戻る </el-button>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";

import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import CardComponent from "../components/CardComponent.vue";
import dialogComponent from "../components/dialogComponent.vue";

const dialogVisible = ref(false);
const dialogContents = reactive({
  title: "テンプレート更新",
  cancelButton: "キャンセル",
  confirmButton: "更新する",
});

const router = useRouter();
const route = useRoute();
const { id } = route.params;

const store = useStore();
// 更新可能にするため computed は使わない
const form = store.state.template[id];

const onClickAdd = () => {
  const additionalContents = {
    label: "",
    type: "",
    value: "",
  };
  form.contents.push(additionalContents);
};

const onClickUpdate = () => {
  dialogVisible.value = true;
};

const onClickConfirm = () => {
  dialogVisible.value = false;
  const updateItem = { index: id, form: form };
  store.dispatch("updateTemplate", updateItem);
  router.push("/");
};
</script>

<style lang="scss" scoped>
.edit {
  &__card {
    margin: 24px 0;

    &__contents {
      width: 100%;
      display: flex;
      text-align: left;
      justify-content: flex-start;
      flex-wrap: wrap;

      &__item {
        margin-right: 12px;

        &__label {
          width: 60%;
        }
        &__type {
          width: 30%;
        }
        &__options {
          width: 100%;
          &__select-box {
            width: 100%;
          }
        }
      }
    }

    &__button {
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

@media screen and (max-width: 480px) {
  .edit {
    &__card {
      &__contents {
        &__item {
          &__label {
            width: 100%;
          }
          &__type {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
