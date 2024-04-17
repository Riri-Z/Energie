<script setup>
/* import ChartsView from './views/ChartsView.vue';
 */
</script>

<template>
  <div class="app">
    <header>
      <nav class="app-navbar">
        <router-link to="/">eco2mix</router-link>
        <router-link to="/frenchMap">FrenchMap</router-link>
      </nav>
    </header>
    <section class="app-content">
      <RouterView />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.app {
  max-height: 100vh;
  line-height: 1.6;
  font-weight: normal;
  display: flex;
  flex-direction: column;

  &-navbar {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  &-content {
    width: 1080px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: $screen-dp) {
      max-width: 800px;
    }
  }
}
</style>
