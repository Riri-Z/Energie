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
  </header>
  <main>
    <section class="content">
      <h1 class="content-title">Mix energie</h1>
      <p class="content-description">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </p>
    </section>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &-title {
    justify-items: center;
  }
  &-description {
    text-align: justify;
  }
}
</style>
