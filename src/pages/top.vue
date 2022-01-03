<template>
  <section class="top">
    <div class="top__edit">
      <router-link to="/create">
        <el-button type="primary">新規テンプレート</el-button>
      </router-link>
    </div>

    <!-- 入力：登録されたテンプレート -->
    <inputCard
      class="top__card"
      v-for="(template, index) in storeTemplate"
      :key="index"
      :form="template"
      @update:form="template = $event"
    >
      <template v-slot:header>
        <div class="top__card__header">
          <span> {{ template.name.templateName }} </span>
          <div>
            <!-- 更新ボタン -->
            <router-link :to="'/edit/' + index">
              <el-button type="primary" plain circle :icon="Edit"></el-button>
            </router-link>

            <!-- 削除ボタン -->
            <el-popconfirm
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
        <el-button @click="onClearForm(template)">クリア</el-button>
        <el-button type="primary" @click="onSubmit(template)">作成</el-button>
      </template>
    </inputCard>

    <!-- 出力 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogName"
      width="75%"
      class="top__output"
      show-close
      center
    >
      <div class="top__output__content">
        <el-input
          v-model="dialogTextarea"
          autosize
          type="textarea"
          placeholder="Please input"
          :input-style="{ backgroundColor: '#eeeeee' }"
        />
      </div>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">キャンセル</el-button>
          <el-button type="primary" @click="onCopy">コピー</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

import { Edit } from "@element-plus/icons-vue";
import { Delete } from "@element-plus/icons-vue";
import { InfoFilled } from "@element-plus/icons-vue";

import { useStore } from "vuex";

import inputCard from "../components/inputCard.vue";

const dialogVisible = ref(false);

const dialogName = ref("");
const dialogTextarea = ref("");

const store = useStore();

const storeTemplate = computed(() => store.state.template);

const deleteTemplate = (index) => {
  store.dispatch("deleteTemplate", index);
};

const onSubmit = (template) => {
  dialogTextarea.value = "";
  dialogName.value = template.name.templateName;
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
  // textarea.value += `# ${template.name.templateName} \n`;
  dialogVisible.value = true;
};

const onClearForm = (template) => {
  for (let item of template.contents) {
    item.value = "";
  }
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
    margin: 12px 0;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__output {
    &__content {
      margin: 0 auto;
      padding: 12px;
      width: 85%;
      max-height: 90vh;
      background-color: #eeeeee;
    }
  }
}
</style>
