<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit">
      <div class="form">
        <div class="col-md-9 mb-3">
            <label for="title" class="h5 font-weight-bold">Nouveau titre du post</label>
            <input type="text" class="form-control border-secondary" id="title" v-model="title" placeholder="2 caractères minimum"/>
        </div>
        <div class="col-md-9 mb-3">
            <label for="content" class="h5 font-weight-bold">Nouveau contenu du post</label>
            <textarea class="form-control border-secondary" rows="10" id="content" v-model="content" placeholder="4 caractères minimum"/>
        </div>
      </div>
      <p id="error" class="h5 text-danger ml-3"></p>
      <button class="btn btn-primary btn-block col-9 col-sm-4 col-lg-3 mt-3 ml-3" type="submit">Modifier</button>
    </form>
  </div>
</template>

<script>

import axios from 'axios'
import '../axios'

export default ({
    name: 'ModifyPost',

    data() {
        return{
            title: '',
            content: '',
        }
    },

    methods: {
        async handleSubmit() {
        const postId = window.location.pathname.substring(6)
        await axios.put('topics/' + postId + '/update', {
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
})
</script>

<style>

</style>
