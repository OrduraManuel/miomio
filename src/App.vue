<script setup>
import { inject } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores';

import Headering from '@/components/Headering.vue'
import Footer from '@/components/Footer.vue'

const authStore = useAuthStore();
const GStore = inject('GStore')

</script>

<template>
  <div id="layout">
    <div id="flashMessage" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <Headering class="headerContent" />

      <div class="bodyContent">
        <RouterView />
      </div>

    <Footer class="footerContent" />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/style.scss";

#flashMessage{
  position: absolute;
  top: 5vh;
  right: 5vw;
  backdrop-filter: blur(5px);
  padding: 25px 20px;
  background: rgba(0, 128, 0, 0.575);
  color: white;
  animation: GStore 6s ease-in-out;
  opacity:0;
}
#layout{
}
.bodyContent{
  height: 100%!important;
  margin: 5vh 0 5vh 0!important;
}
.headerContent{
  height: 10vh!important;
}
.footerContent{
  z-index: 9;
  width: 100vw;
  height: 10vh!important;
}

@keyframes GStore {
  0%{

    right: 10vw;
    opacity:0;
  }
  30%{
    opacity:1;
  }
  100% {
    right: -20vw;
    opacity:0;
  }
}
</style>
