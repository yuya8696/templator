<template>
  <section class="top">
    <div class="top__create">
      <router-link to="/create">
        <el-button type="primary">新規テンプレート</el-button>
      </router-link>
    </div>

    <!-- 入力：登録されたテンプレート -->
    <card-component
      class="top__card"
      v-for="(template, index) in storeTemplate"
      :key="index"
      :form="template"
      @update:form="template = $event"
    >
      <template v-slot:header>
        <div class="top__card__header">
          <span class="top__card__header__title">
            {{ template.name.templateName }}
          </span>
          <div>
            <!-- 更新ボタン -->
            <router-link :to="'/edit/' + index">
              <el-button
                class="top__card__header__button"
                type="primary"
                plain
                circle
                :icon="Edit"
              ></el-button>
            </router-link>

            <!-- 削除ボタン -->
            <el-popconfirm
              class="top__card__header__button"
              confirm-button-text="消去します"
              cancel-button-text="キャンセル"
              :icon="InfoFilled"
              icon-color="red"
              title="このテンプレートを消去しますか？"
              @confirm="deleteTemplate(index)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  plain
                  :icon="Delete"
                  circle
                ></el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
      <template v-slot:contents>
        <el-button @click="onClickClear(template)">クリア</el-button>
        <el-button type="primary" plain @click="onClickCreate(template)"
          >作成</el-button
        >
      </template>
    </card-component>

    <!-- 出力 -->
    <dialog-component
      v-model:dialog="dialogVisible"
      :contents="dialogContents"
      @click="onClickCopy"
    >
      <div class="top__output">
        <el-input
          v-model="dialogTextarea"
          autosize
          type="textarea"
          :input-style="{ backgroundColor: '#eeeeee' }"
        />
      </div>
    </dialog-component>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

import { Edit } from "@element-plus/icons-vue";
import { Delete } from "@element-plus/icons-vue";
import { InfoFilled } from "@element-plus/icons-vue";

import { useStore } from "vuex";

import CardComponent from "../components/CardComponent.vue";
import dialogComponent from "../components/DialogComponent.vue";

const dialogVisible = ref(false);
const dialogTextarea = ref("");
const dialogContents = reactive({
  title: "",
  cancelButton: "キャンセル",
  confirmButton: "コピー",
});

const store = useStore();
const storeTemplate = computed(() => store.state.template.reverse());

const deleteTemplate = (index) => {
  store.dispatch("deleteTemplate", index);
};

const onClickCreate = (template) => {
  dialogTextarea.value = "";
  dialogContents.title = template.name.templateName;
  for (let item of template.contents) {
    if (item.type === "heading") {
      dialogTextarea.value += `# ${item.label} \n`;
    } else if (item.type === "textarea") {
      // テキスト内で改行がある場合は、スペース2つと改行コードに変換
      dialogTextarea.value += `- ${item.label}：  \n${item.value.replace(
        /\n/g,
        "  \n"
      )} \n`;
    } else {
      dialogTextarea.value += `- ${item.label}：${item.value} \n`;
    }
  }
  dialogVisible.value = true;
};

const onClickClear = (template) => {
  for (let item of template.contents) {
    item.value = "";
  }
};

const onClickCopy = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(dialogTextarea.value);
  }
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.top {
  text-align: center;

  &__create {
    margin: 24px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__card {
    margin: 24px 0;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__button {
        margin: 0 8px;
      }
    }
  }

  &__output {
    margin: 0 auto;
    padding: 12px;
    width: 85%;
    max-height: 90vh;
    background-color: #eeeeee;
  }
}

@media screen and (max-width: 480px) {
  .top {
    &__create {
      margin: 36px 0;
      justify-content: center;
    }

    &__card {
      margin: 4px 0;
      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__title {
          width: 60%;
        }
        &__button {
          margin: 0; // pc marginの初期化
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
