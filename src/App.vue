<script setup>
  import ChartComponent from './components/ChartComponent.vue'
  import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <header>
    <HeaderComponent/>
  </header>

  <main class="container">
    <ChartComponent/>
  </main>
</template>

<style>
  main {
    margin-top: 20px;
  }
</style>
