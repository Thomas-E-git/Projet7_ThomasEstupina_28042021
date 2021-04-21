<template>
  <div class="container">
   <h2 v-if="user" > Bonjour {{ user.username }} </h2>
   <h2 v-if="!user" > Bienvenue !! Veuillez vous connecter ou créer un compte pour avoir accès au forum interne de Groupomania</h2>
  </div>
</template>

<script>


import {mapGetters} from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapGetters(['user'])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  color: black;
}

</style>