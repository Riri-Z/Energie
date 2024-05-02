<script setup>
import dashboardIcon from '@/assets/icons/dashboardIcon.svg';
import router from '@/router';

const reload = () => {
  router.push({ path: '/' });
};
</script>

<template>
  <div class="nav-bar">
    <h1 class="nav-bar-logo" @click="reload">eco2Mix</h1>
    <section class="nav-bar-element">
      <router-link class="nav-bar-element-link" :to="'/'">
        <img class="nav-bar-element-link-icon" :src="dashboardIcon" alt="dashboard-logo" />
        <p class="nav-bar-element-link-label">Dashboard</p>
      </router-link>
      <router-link class="nav-bar-element-link" :to="'/national-map'">
        <img class="nav-bar-element-link-icon" :src="dashboardIcon" alt="my-logo" />
        <p class="nav-bar-element-link-label">FrenchMap</p>
      </router-link>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 100vh;
  color: $white;
  background-color: $darkblue;
  font-size: 1.1rem;
  max-width: 15%;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-logo {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  }
  &-element {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1.5rem;

    &-link {
      color: $white;
      text-decoration: none;
      align-items: center;
      display: flex;
      width: 7.6rem;

      border-right-color: $darkblue;
      border-right-width: 0.2em;
      border-right-style: solid;
      &:hover {
        text-decoration: underline;
      }
      &-icon {
        height: 1.2rem;
        padding-right: 1rem;
      }
    }
  }
}

.router-link-active {
  border-right-color: $green;
}

@media only screen and (max-width: $screen-md) {
  .nav-bar {
    display: none;
  }
}
</style>
