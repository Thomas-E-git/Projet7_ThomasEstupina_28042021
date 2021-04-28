<template>
  <div class="container">
      <div v-if="user" class="text-center mt-5 bg">
        <h1 class="col-12 mb-5 font-weight-bold text-secondary"> Bonjour {{ user.username }} </h1>
        <p class="col-12 h5 font-weight-bold"> Merci de votre connexion</p>
        <p class="col-12 h5 font-weight-bold"> Partagez avec les membres de l'entreprise</p>
        <p class="col-12 h5 mb-5 font-weight-bold">Réagissez aux publications</p>
        <router-link to="/forum" class="h2 col-12">Rejoindre le forum de partage</router-link>
      </div>
      <div v-if="!user" class="text-center mt-5">
        <h1 class="col-12 mb-5 text-secondary font-weight-bold"> Bienvenue</h1>
        <p class="col-12 h5 font-weight-bold"> Veuillez vous connecter ou créer un compte</p>
        <p class="col-12 h5 mb-5 font-weight-bold"> pour avoir accès au forum interne de Groupomania</p>
        <router-link to="/login" class="btn btn-secondary mr-3">Connexion</router-link>
        <router-link to="/register" class="btn btn-secondary">Créer un compte</router-link>
      </div>
      <div class="col text-center">
        <img class="w-50 mt-3" src="../assets/logos/icon-above-font.png" alt="logo groupomania">
      </div>
  </div>
</template>

<script>


import {mapGetters} from 'vuex'

export default {
  name: 'Home',

mounted() {
    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
},

  computed: {
    ...mapGetters(['user'])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
  opacity: 0.8;
}
</style>