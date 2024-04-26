<script setup>
import SelectPeriod from '@/components/SelectPeriod.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
const eco2MixStore = useEco2mixStore();
eco2MixStore.getLastDateAvailable();
</script>

<template>
  <div class="app">
    <section class="app-content">
      <div class="navigation">
        <div class="navigation-logo">LOGO</div>
        <section class="navigation-link">
          <nav>Dashboard</nav>
          <nav>Test</nav>
          <nav>Test</nav>
        </section>
      </div>
      <div class="content">
        <h1 class="content-title">eco2Mix</h1>
        <div v-if="eco2MixStore.limitDateEnd" class="content-periode">
          <SelectPeriod />
        </div>
        <RouterView />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.app {
  height: 100vh;
  overflow-y: auto;
  line-height: 1.6;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  color: $white;
  &-content {
    display: flex;
  }
}
.navigation {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 100vh;
  color: $white;
  background-color: $darkblue;
}
.content {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-left: 1rem;
  &-periode {
    display: flex;
    justify-content: space-between;
  }
}
</style>
