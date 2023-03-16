<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores';

import Headering from '@/components/Headering.vue'
import Footer from '@/components/Footer.vue'

const authStore = useAuthStore();
</script>

<template>
  <div id="layout">
    <Headering />
    <RouterView />
    <Footer />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/style.scss";
</style>
