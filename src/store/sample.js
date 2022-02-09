// 初期表示のサンプル連プレート
export const sampleTemplate = {
  name: {
    templateName: "サンプルテンプレート",
  },
  contents: [
    {
      label: "見出しサンプル",
      type: "heading",
      value: "",
    },
    {
      label: "テキストサンプル",
      type: "text",
      value: "サンプルテキスト",
    },
    {
      label: "セレクトサンプル",
      type: "select",
      value: ["項目1"],
      options: ["項目1", "項目2", "項目3", "項目4", "項目5"],
    },
    {
      label: "日付サンプル",
      type: "date",
      value: "2021/12/12",
    },
    {
      label: "レビューサンプル",
      type: "rate",
      value: 4.5,
    },
    {
      label: "テキストエリアサンプル",
      type: "textarea",
      value: `ここはテキストエリアの入力項目です。
長い文章はこちらに記入します。`,
    },
  ],
};
