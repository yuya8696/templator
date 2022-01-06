import { createStore } from "vuex";

// ローカルストレージへの保存
import createPersistedState from "vuex-persistedstate";

import { reactive } from "vue";

const state = reactive({
  template: [
    // テスト情報
    {
      name: {
        templateName: "ラーメンログ",
      },
      contents: [
        {
          label: "お店情報",
          type: "heading",
          value: "",
        },
        {
          label: "店名",
          type: "text",
          value: "ラーメン鶴太郎",
        },
        {
          label: "場所",
          type: "select",
          value: ["神田"],
          options: ["東京", "神田", "お茶の水", "新橋", "渋谷"],
        },
        {
          label: "来訪日",
          type: "date",
          value: "2021/12/12",
        },
        {
          label: "レビュー",
          type: "heading",
          value: "",
        },
        {
          label: "食べたラーメン",
          type: "text",
          value: "あっさり醤油",
        },
        {
          label: "レビュー",
          type: "rate",
          value: 4.5,
        },
        {
          label: "所感",
          type: "textarea",
          value: `薄味の中にもコクがあり、口溶けの良い麺とふわっとかおる新緑の山々の木漏れ日のような優しい匂いに包まれる。
これまでこんなラーメンを食べたことがあっただろうか、いやない
これはまさしく21世紀史に残るラーメンである`,
        },
        {
          label: "また行きたいか",
          type: "text",
          value: "行きたい",
        },
        // ここまで
      ],
    },
  ],
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
  plugins: [createPersistedState()],
});
