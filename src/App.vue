<script setup>
/* import ChartsView from './views/ChartsView.vue';
 */
</script>

<template>
  <header>
    <nav class="navbar">
      <router-link :to="{ name: 'Home' }">HOME</router-link>
      <router-link to="/frenchMap">FrenchMap</router-link>
    </nav>
    <div class="content">
      <h1 class="chart-title">Mix energie</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      </p>
    </div>
  </header>
  <RouterView></RouterView>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
