<script setup></script>

<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  margin: auto;
  border: 20px solid $white;
  border-radius: 50%;
  border-top: 20px solid $turquoise;
  width: 100px;
  height: 100px;
  animation: spinner 1s linear infinite;
  top: 20vh;
  position: relative;
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
