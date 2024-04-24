<script setup></script>

<template>
  <div class="app">
    <section class="app-content">
      <RouterView />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.app {
  max-height: 100vh;
  line-height: 1.6;
  max-width: 100%;
  padding: 0 3% 0 3%;
}
</style>
