<script setup>
import dashboardIcon from '@/assets/icons/dashboardIcon.svg';
import router from '@/router';
import burgerMenuIcon from '@/assets/icons/burgerMenuIcon.svg';

import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const reload = () => {
  router.push({ path: '/' });
};
</script>

<template>
  <div class="nav-bar">
    <img class="nav-bar-burger" :src="burgerMenuIcon" alt="burger-logo" @click="toggleMenu" />
    <h1 class="nav-bar-logo" @click="reload">eco2Mix</h1>
    <section class="nav-bar-element" :class="{ 'show-menu': isMenuOpen }">
      <router-link class="nav-bar-element-link" :to="'/'">
        <img class="nav-bar-element-link-icon" :src="dashboardIcon" alt="dashboard-logo" />
        <p class="nav-bar-element-link-label">Dashboard</p>
      </router-link>
      <router-link class="nav-bar-element-link" :to="'/national-map'">
        <img class="nav-bar-element-link-icon" :src="dashboardIcon" alt="my-logo" />
        <p class="nav-bar-element-link-label">Consommation</p>
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
  &-burger {
    display: none;
  }
  &-element {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    text-transform: uppercase;
    font-size: 0.8rem;

    &-link {
      color: $white;
      text-decoration: none;
      align-items: center;
      display: flex;
      width: 9.1rem;
      padding-left: 6px;

      border-right-color: $darkblue;

      flex-direction: row;
      justify-content: left;
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
  border-right-width: 0.2em;
  border-right-style: solid;
}

@media only screen and (max-width: $screen-md) {
  .nav-bar {
    flex-direction: row;
    min-width: 100%;
    flex-wrap: wrap;
    background-color: $blue;
    &-logo {
      flex: 1;
    }
    &-burger {
      margin: 1rem;
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      fill: $white;
      cursor: pointer;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);

      &:hover {
        transform: scale(1.2);
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
      }
    }
    &-element {
      display: none;

      &-link {
        border: unset;
        width: unset;
        &-icon {
          display: none;
        }
      }
    }
    .show-menu {
      flex-basis: 100%;
      display: flex;
      flex-direction: row;
      transition: all 600ms cubic-bezier(0.62, 0.04, 0.3, 1.56);
      transition-delay: 100ms;
      justify-content: space-around;
    }
  }
}
</style>
