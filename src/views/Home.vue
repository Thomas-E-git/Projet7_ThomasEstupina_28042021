<template>
  <div class="container">
    <div class="row">
      <h2 v-if="user">Bonjour {{ user.username }}</h2>
      <h2></h2> 
    </div>
    <router-link to="/login" role="button" class="btn btn-primary">
      Connexion
    </router-link>
    <router-link to="/register" role="button" class="btn btn-primary">
      Créer un compte
    </router-link>
    <router-link to="/forum" role="button" class="btn btn-primary">
      Rejoindre le forum
    </router-link>
  </div>
</template>

<script>

import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: 'Home',

  async created() {
    const response = await axios.get('users/me');
    this.$store.dispatch('user', response.data);
  },

  computed: {
    ...mapGetters(['user'])
  },

  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  color: black;
}



</style>