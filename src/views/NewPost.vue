<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit">
      <div class="form">
        <div class="col-md-9 mb-3">
            <label for="title" class="h5 font-weight-bold">Titre du post</label>
            <input type="text" class="form-control border-secondary" id="title" v-model="title" placeholder="2 caractères minimum"/>
        </div>
        <div class="col-md-9 mb-3">
            <label for="content" class="h5 font-weight-bold">Contenu du post</label>
            <textarea class="form-control border-secondary" id="content" rows="10" v-model="content" placeholder="4 caractères minimum"/>
        </div>
      </div>
      <p id="error" class="h5 text-danger ml-3"></p>
      <button class="btn btn-primary btn-block col-9 col-sm-4 col-lg-3 mt-3 ml-3" type="submit">Publier</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'
import '../axios'

export default {
  name: 'NewPost',
  data() {
    return{
      title: '',
      content: '',
      attachment: '',
    }
  },
  methods: {
   async handleSubmit() {
        await axios.post('topics/new', {
            title: this.title,
            content: this.content,
        })
        .then( 
        (response) => { console.log(response);
        this.$router.push('/forum')},
        (error) => { document.getElementById("error").innerHTML= error.response.data.message }
      );
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