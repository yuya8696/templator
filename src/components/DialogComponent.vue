<template>
  <el-dialog
    v-model="dialog"
    :title="contents.title"
    :width="width"
    custom-class="dialog"
    show-close
    center
  >
    <slot></slot>
    <template #footer>
      <span>
        <el-button @click="dialog = false">
          {{ contents.cancelButton }}
        </el-button>
        <el-button type="primary" @click="onClick">
          {{ contents.confirmButton }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  dialog: false,
  contents: {
    title: "",
    cancelButton: "",
    confirmButton: "",
  },
});

const emit = defineEmits(["click", "update:dialog", "contents"]);

const width = ref("75%");

onMounted(() => {
  if (window.matchMedia("(max-width: 480px)").matches) {
    width.value = "85%";
  }
});

watch(
  () => props.dialog,
  (newVal) => {
    emit("update:dialog", newVal);
  }
);

const onClick = () => {
  emit("click");
};
</script>

<style scoped lang="scss">
.dialog {
}
</style>
