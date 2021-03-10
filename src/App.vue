<template>
  <nav>
    <router-link to="/" class="hover:underline mx-6 my-2 cursor-pointer">Home</router-link>
    <router-link to="/quiz" class="hover:underline mx-6 my-2 cursor-pointer">Cybercrime Assessment</router-link>
    <router-link to="/learn" class="hover:underline mx-6 my-2 cursor-pointer">Learn</router-link>
  </nav>
  <router-view></router-view>
</template>



<style>
#app {
  font-family: Commissioner, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
