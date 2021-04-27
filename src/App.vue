<template>
  <div id="app">
    <Nav />
    <Router-view />
    
  </div>
</template>

<script>

import Nav from './components/Nav'
import axios from 'axios'


export default ({
  name: 'App',
  components: {
    Nav
  },
  async beforeCreate() {
    const response = await axios.get('users/me')
    this.$store.dispatch('user', response.data)
  },

})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
