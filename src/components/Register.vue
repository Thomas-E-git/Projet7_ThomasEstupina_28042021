<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Renseignez votre adresse mail"/>
        </div>
        <div class="col-md-4 mb-3">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" class="form-control" id="username" v-model="username" placeholder="Choisissez un nom d'utilisateur"/>
        </div>
        <div class="col-md-4 mb-3">
          <label for="password">Mot de passe</label>
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Entrez votre mot de passe"/>
        </div>
        <div class="col-md-4 mb-3">
          <label for="department">Fonction</label>
          <input type="text" class="form-control" id="department" v-model="department" placeholder="Dans quel secteur de l'entreprise travaillez vous ?"/>
        </div>
      </div>
      <button type="submit">Inscription</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'
import '../axios'

export default {
  name: 'Register',
  data() {
    return{
      email: '',
      username: '',
      password: '',
      department: '',
    }
  },
  methods: {
    async handleSubmit() {
      await axios.post('users/signup', {
        email: this.email,
        username: this.username,
        password: this.password,
        department: this.department,
      })
      .then(this.$router.push('/login'))
      .catch(err => {
          console.log(err)
      });
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