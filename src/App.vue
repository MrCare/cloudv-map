<template>
  <div id="app">
    <div id="nav">
      <router-link v-for="(item, index) in routes" :key="index" :to="item.path">
        {{ item.meta.title + '|' }}
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { routes } from '@/router/index.js';

export default {
    data() {
        console.info(routes);
        return {
            routes,
        };
    },
};
</script>

<style>
#app {
  font-family: Source Han Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: var(--text-color);
}

#nav a.router-link-exact-active {
  color: var(--primary-color);
}
</style>
