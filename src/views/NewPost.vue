<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="col-md-4 mb-3">
            <label for="title">Titre du post</label>
            <input type="text" class="form-control" id="title" v-model="title" placeholder="2 caractères minimum"/>
        </div>
        <div class="col-md-4 mb-3">
            <label for="content">Contenu du post</label>
            <textarea class="form-control" id="content" v-model="content" placeholder="4 caractères minimum"/>
        </div>
      </div>
      <button type="submit">Publier</button>
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
        const response =  await axios.post('topics/new', {
            title: this.title,
            content: this.content,
        })
        console.log(response)
        this.$router.push('/forum')
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