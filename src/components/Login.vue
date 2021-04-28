<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="col-md-5 mb-3">
          <label for="email" class="h5 font-weight-bold">Email</label>
          <input type="email" class="form-control border-secondary" id="email" v-model="email" placeholder="Renseignez votre adresse mail"/>
        </div> 
        <div class="col-md-5 mb-3 ml-md-5">
          <label for="password" class="h5 font-weight-bold">Mot de passe</label>
          <input type="password" class="form-control border-secondary" id="password" v-model="password" placeholder="Entrez votre mot de passe"/>
        </div>
      </div>
      <p id="error" class="h5 text-danger"></p>
      <button class="btn btn-primary btn-block col-9 col-sm-4 col-lg-3 mt-3 mx-auto mx-sm-0">Connexion</button>
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
      await axios.post('users/login', {
        email: this.email,
        password: this.password
      })
      .then( 
        (response) => { console.log(response);
        localStorage.setItem('token', response.data.token)
        this.$store.dispatch('user', response.data.user)
        this.$router.push('/'); 
        },
        (error) => { document.getElementById("error").innerHTML= error.response.data.message }
      )
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