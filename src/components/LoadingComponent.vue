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
  width: 2rem;
  height: 2rem;
  animation: spinner 1s linear infinite;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media only screen and (max-width: $screen-md) {
  .loader {
    left: 45%;
  }
}
</style>
