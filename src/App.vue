<template>
  <div id="app" class="h-screen w-screen overflow-hidden">
    <ManufacturerApp />
  </div>
</template>

<script setup lang="ts">
import ManufacturerApp from '@/components/ManufacturerApp.vue'
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
