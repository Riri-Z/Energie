<script setup>
import SelectPeriod from '@/components/SelectPeriod.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
import NavBar from './components/NavBar.vue';
const eco2MixStore = useEco2mixStore();
eco2MixStore.getLastDateAvailable();
</script>
<!-- TODO
- Add responsive
- Handle error
-->
<template>
  <div class="app">
    <section class="app-content">
      <NavBar />
      <div class="content">
        <header class="content-header">
          <h1 class="content-title">eco2Mix</h1>
          <div v-if="eco2MixStore.limitDateEnd" class="content-periode">
            <SelectPeriod />
          </div>
        </header>
        <section class="content-main">
          <RouterView />
        </section>
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
.content {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-top: 20px;
  margin-left: 1rem;
  &-periode {
    display: flex;
    justify-content: space-between;
  }
  &-main {
    max-height: 70%;
  }
}
</style>
