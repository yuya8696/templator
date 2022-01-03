<template>
  <section class="top">
    <h2 class="top__title">Templator</h2>
    <div class="top__edit">
      <router-link to="/create">
        <el-button type="primary">新規テンプレート</el-button>
      </router-link>
    </div>

    {{ storeTemplate }}

    <!-- 入力：登録されたテンプレート -->
    <el-card
      v-for="(template, index) in storeTemplate"
      :key="index"
      class="top__card"
    >
      <template #header>
        <div class="top__card__header">
          <span> {{ template.name.templateName }} </span>
          <div>
            <router-link :to="'/edit/' + index">
              <el-button type="primary" plain circle :icon="Edit"></el-button>
            </router-link>
            <el-button
              type="danger"
              plain
              :icon="Delete"
              circle
              @click="deleteTemplate(index)"
            ></el-button>
          </div>
        </div>
      </template>
      <div class="top__card__content">
        <el-form
          v-for="(item, index) in template.contents"
          :key="index"
          label-width="120px"
        >
          <h3 v-if="item.type === 'heading'" class="top__card__content--title1">
            {{ item.label }}
          </h3>
          <el-form-item
            v-else
            :label="item.label"
            class="top__card__content--form-item"
          >
            <el-date-picker
              v-if="item.type === 'date'"
              :default-value="new Date()"
              placeholder="Pick a date"
              type="date"
              v-model="item.value"
            >
            </el-date-picker>
            <el-rate
              v-else-if="item.type === 'rate'"
              v-model="item.value"
              allow-half
            ></el-rate>
            <el-select
              v-else-if="item.type === 'select'"
              v-model="item.value"
              multiple
              filterable
              allow-create
              fit-input-width
              placeholder="選択肢を入力してください"
              class="top__card__content--form-item--select"
            >
              <el-option
                v-for="item in item.options"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-input v-else :type="item.type" v-model="item.value"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit(template)">Create</el-button>
        <el-button @click="onClearForm(template)">Clear</el-button>
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
        <el-input
          v-model="textarea"
          autosize
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
import { Delete } from "@element-plus/icons-vue";

import { useStore } from "vuex";

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

const inputs = reactive({});

const dialogVisible = ref(false);

const textarea = ref("");

const store = useStore();

const storeTemplate = computed(() => store.state.template);

const deleteTemplate = (index) => {
  store.dispatch("deleteTemplate", index);
};

const onSubmit = (template) => {
  textarea.value = `# ${template.name.templateName} \n`;
  for (let item of template.contents) {
    if (item.type === "heading") {
      textarea.value += `## ${item.label} \n`;
    } else if (item.type === "textarea") {
      // テキスト内で改行がある場合は、スペース2つと改行コードに変換
      textarea.value += `- ${item.label}：  \n${item.value.replace(
        /\n/g,
        "  \n"
      )} \n`;
    } else {
      textarea.value += `- ${item.label}：${item.value} \n`;
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
    &__content {
      &--title1 {
        text-align: left;
      }
      &--form-item {
        text-align: left;
        align-items: center;

        &--select {
          width: 100%;
        }
      }
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
