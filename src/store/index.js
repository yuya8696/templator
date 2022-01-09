import { createStore } from "vuex";

// ローカルストレージへの保存
import createPersistedState from "vuex-persistedstate";

import { reactive } from "vue";

import { sampleTemplate } from "./sample";

const state = reactive({
  template: [sampleTemplate],
  form: {
    name: {
      templateName: "",
    },
    contents: [],
  },
});

const mutations = {
  setTemplate(state, form) {
    state.template.push(form);
  },
  deleteTemplate(state, index) {
    state.template.splice(index, 1);
  },
  updateTemplate(state, updateItem) {
    state.template.splice(updateItem.index, 1, updateItem.form);
  },
};

const actions = {
  createTemplate: ({ commit }, form) => commit("setTemplate", form),
  deleteTemplate: ({ commit }, index) => commit("deleteTemplate", index),
  updateTemplate: ({ commit }, updateItem) =>
    commit("updateTemplate", updateItem),
};

export default createStore({
  state,
  actions,
  mutations,
  plugins: [
    createPersistedState({
      key: "template",
    }),
  ],
});
