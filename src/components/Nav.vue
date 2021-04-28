  <template>
    <div class="container-fluid">
      <div class="row">
        <b-navbar toggleable="lg" class="col navbar-dark bg-primary d-flex justify-content-around">
          <router-link class="navbar-brand w-auto" to="/"><img class="img-fluid w-75" src="../assets/logos/icon-left-font-monochrome-white.svg" alt="logo Groupomania"></router-link>
          <b-navbar-toggle target="navbarContent"></b-navbar-toggle>
          <b-collapse id="navbarContent" class="font-weight-bold" is-nav>
            <b-navbar-nav v-if="!user" class="ml-auto">
              <b-nav-item >
                <router-link  class="nav-link h5 text-light" to="/login">Connexion</router-link>
              </b-nav-item>
              <b-nav-item >
                <router-link class="nav-link nav-link h5 text-light" to="/register">Créer un compte</router-link>
              </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-if="user" class="ml-auto">
              <b-nav-item >
                <router-link  class="nav-link nav-link h5 text-light" to="/forum">Forum</router-link>
              </b-nav-item>
              <b-nav-item >
                <router-link  class="nav-link nav-link h5 text-light" to="/profil">Profil</router-link>
              </b-nav-item>
              <b-nav-item >
                <a class="nav-link h5 text-light" @click="handleClick" href="javascript:void(0)">Déconnexion</a>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
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


<style lang="css" scoped>

img {
  max-width: 240px
}
    
</style>