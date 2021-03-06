<template>
  <section class="create">
    <h3 class="create__title">テンプレート作成</h3>

    <el-card class="create__card">
      <template #header>
        <el-form
          @submit.prevent
          label-position="top"
          class="create__card__header"
        >
          <el-form-item label="テンプレート名">
            <el-input
              v-model="form.name.templateName"
              placeholder="テンプレート名"
              class="create__card__header__input"
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
        class="create__card__contents"
      >
        <el-form-item
          :label="'項目' + (index + 1)"
          class="create__card__contents__item create__card__contents__item__label"
        >
          <el-input v-model="item.label"> </el-input>
        </el-form-item>
        <el-form-item
          :label="'項目' + (index + 1) + 'のタイプ'"
          class="create__card__contents__item create__card__contents__item__type"
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
          class="create__card__contents__item__options"
        >
          <el-select
            v-model="item.options"
            multiple
            filterable
            allow-create
            fit-input-width
            placeholder="選択肢を入力してください"
            class="create__card__contents__item__options__select-box"
          >
            <template #empty></template>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="create__card__button">
        <el-button
          plain
          class="create__card__button--add-form"
          @click="onClickAdd"
        >
          質問の追加
        </el-button>
        <el-button
          plain
          class="create__card--button--create-template"
          type="primary"
          @click="onClickCreate"
        >
          テンプレート生成
        </el-button>
      </div>
    </el-card>

    <div class="create__back-button">
      <router-link to="/">
        <el-button type="info"> 戻る </el-button>
      </router-link>
    </div>

    <!-- 確認ダイアログ -->
    <dialog-component
      v-model:dialog="dialogVisible"
      :contents="dialogContents"
      @click="onClickConfirm"
    >
      <span>この内容でテンプレートを作成します。よろしいですか？</span>
      <input-card v-model:form="form" :disabled="true" class="create__card">
        <template v-slot:header>
          <div>
            <span> {{ form.name.templateName }} </span>
          </div>
        </template>
      </input-card>
    </dialog-component>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

import inputCard from "../components/CardComponent.vue";
import dialogComponent from "../components/dialogComponent.vue";

const dialogVisible = ref(false);
const dialogContents = reactive({
  title: "テンプレート作成",
  cancelButton: "キャンセル",
  confirmButton: "作成する",
});

const router = useRouter();
const store = useStore();

const form = reactive({
  name: {
    templateName: "",
  },
  contents: [
    {
      label: "",
      type: "",
      value: "",
      options: [],
    },
  ],
});

const onClickAdd = () => {
  const additionalContents = {
    label: "",
    type: "",
    value: "",
  };
  form.contents.push(additionalContents);
};

const onClickCreate = () => {
  dialogVisible.value = true;
};

const onClickConfirm = () => {
  dialogVisible.value = false;
  store.dispatch("createTemplate", form);
  router.push("/");
};
</script>

<style lang="scss" scoped>
.create {
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
      &--create-template {
        align-items: center;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .create {
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
