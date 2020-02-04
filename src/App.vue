<template>
  <div id="app">
    <router-view></router-view>
    <footer class="py-3" id="main-footer">
      <div class="container">
        <p class="font-weight-lighter small pt-2 text-center">
          Developed by Mirozlav for <span class="font-weight-bold">Slido</span> 2020
        </p>
      </div>
    </footer>
  </div>
  
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

export default {
  name: 'App',
}
</script>