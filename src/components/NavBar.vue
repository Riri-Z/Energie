<script setup>
import dashboardIcon from '@/assets/icons/dashboardIcon.svg';
</script>

<template>
  <div class="nav-bar">
    <section class="nav-bar-link">
      <router-link :to="'/'">
        <img class="nav-bar-link-icon" :src="dashboardIcon" alt="my-logo" />

        Dashboard</router-link
      >
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
  font-size: 1.25rem;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 25%;
  flex: 0 0 15%;
  max-width: 15%;
  font-size: 1.5rem;
  &-logo {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    &-icon {
      height: 1.5rem;
      align-items: center;
    }
    & a {
      color: $white;
      text-decoration: none;
      align-items: center;
      display: flex;

      justify-content: space-between;
      width: 140px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
