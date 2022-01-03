<template>
  <header class="app__header">
    <el-affix>
      <h2 class="app__header__title">Templator</h2>
    </el-affix>
  </header>
  <main class="app__main">
    <router-view />
  </main>
  <footer class="app__footer"></footer>
</template>

<script setup></script>

<style lang="scss">
body {
  margin: 0;
}
.app {
  &__header {
    height: 4vh;
    text-align: center;
    &__title {
      background-color: #ffffff;
      margin: 0;
    }
  }
  &__main {
    margin: 0 20%;
  }
}
</style>
