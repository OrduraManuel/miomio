<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores';

import Headering from '@/components/Headering.vue'
import Footer from '@/components/Footer.vue'

const authStore = useAuthStore();
</script>

<template>
  <div id="layout">
    <Headering class="headerContent" />

      <div class="bodyContent">
        <RouterView />
      </div>

    <Footer class="footerContent" />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/style.scss";
.bodyContent{
  height: 80vh!important;
}
.headerContent{
  height: 10vh!important;
}
.footerContent{
  height: 10vh!important;
}
</style>
