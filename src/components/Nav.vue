<template>
    <nav class="navbar navbar-expand navbar-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">Accueil</router-link>
        <div class="collapse navbar-collapse">
          <ul v-if="!user" class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link  class="nav-link" to="/login">Connexion</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Créer un compte</router-link>
            </li>
          </ul>
          <ul v-if="user" class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link  class="nav-link" to="/forum">Forum</router-link>
            </li>
            <li class="nav-item">
              <router-link  class="nav-link" to="/profil">Profil</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="handleClick" href="javascript:void(0)">Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {
    name: 'Nav',

    methods: {
      handleClick() {
        localStorage.removeItem('token');
        this.$store.dispatch('user', null);
        this.$router.push('/');
      }
    },

    computed : {
      ...mapGetters(['user'])
    }
  }
</script>


<style lang="scss">

</style>