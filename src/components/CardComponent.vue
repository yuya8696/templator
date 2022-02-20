<template>
  <el-card class="card-component">
    <template #header>
      <slot name="header"></slot>
    </template>
    <div class="card-component__contents">
      <el-form
        @submit.prevent
        v-for="(item, index) in form.contents"
        :key="index"
        label-width="180px"
        :label-position="labelPosition"
      >
        <h3
          v-if="item.type === 'heading'"
          class="card-component__contents__title1"
        >
          {{ item.label }}
        </h3>
        <el-form-item
          v-else
          :label="item.label"
          class="card-component__contents__form-item"
        >
          <el-date-picker
            :disabled="disabled"
            v-if="item.type === 'date'"
            :default-value="new Date()"
            format="YYYY/MM/DD"
            value-format="YYYY/MM/DD"
            placeholder="日付を選択してください"
            type="date"
            v-model="item.value"
          >
          </el-date-picker>
          <el-rate
            :disabled="disabled"
            v-else-if="item.type === 'rate'"
            v-model="item.value"
            allow-half
          ></el-rate>
          <el-select
            :disabled="disabled"
            v-else-if="item.type === 'select'"
            v-model="item.value"
            multiple
            filterable
            allow-create
            fit-input-width
            placeholder="選択肢を入力してください"
            class="card-component__contents__form-item__select"
          >
            <el-option
              v-for="item in item.options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-input
            v-else
            :disabled="disabled"
            :type="item.type"
            v-model="item.value"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <slot name="contents"></slot>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  form: {},
  disabled: false,
});

const labelPosition = ref("left");

onMounted(() => {
  if (window.matchMedia("(max-width: 480px)").matches) {
    labelPosition.value = "top";
  }
});
</script>

<style lang="scss" scoped>
.card-component {
  &__header {
    width: 100%;
  }

  &__contents {
    &__title1 {
      text-align: left;
    }
    &__form-item {
      text-align: left;
      align-items: center;

      &__select {
        width: 100%;
      }
    }
  }
}
</style>
