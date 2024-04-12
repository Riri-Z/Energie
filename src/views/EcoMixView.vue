<template>
  <div class="eco-mix-view-content">
    <h1 class="eco-mix-view-content-title">Données éCO2mix nationales temps réel</h1>
    <p class="eco-mix-view-content-description">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </p>
    <section class="eco-mix-view-content-charts-container">
      <ElectricityProduction />
    </section>
  </div>
</template>

<script setup>
import ElectricityProduction from '@/components/charts/ElectricityProduction.vue';
</script>

<style lang="scss" scoped>
.eco-mix-view-content {
  &-charts-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
