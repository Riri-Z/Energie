<script setup>
defineProps({
  mainTitle: String,
  subTitle: String
});
</script>

<template>
  <div class="error-component">
    <div class="error-component-title">
      <h1 v-if="mainTitle?.length > 0" class="error-component-title-main">{{ mainTitle }}</h1>
      <h2 v-if="subTitle?.length > 0" class="error-component-title-info">{{ subTitle }}</h2>
    </div>
    <div class="error-component-content">
      <img
        class="error-component-content-img"
        src="@/assets/images/error/error.png"
        alt="Error image"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-component {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  max-width: 100%;
  align-items: center;
  font-family: Quicksand;
}
</style>
