<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Renseignez votre adresse mail"/>
        </div> 
        <div class="col-md-4 mb-3">
          <label for="password">Mot de passe</label>
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Entrez votre mot de passe"/>
        </div>
      </div>
      <button type="submit">Connexion</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'
import '../axios'

export default {
  name: 'Login',
  data() {
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post('users/login', {
        email: this.email,
        password: this.password
      })
      localStorage.setItem('token', response.data.token);
      this.$store.dispatch('user', response.data.user);
      this.$router.push('/');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>