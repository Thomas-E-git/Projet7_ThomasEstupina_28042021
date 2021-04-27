<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="col-md-4 mb-3">
            <label for="title">Nouveau titre du post</label>
            <input type="text" class="form-control" id="title" v-model="title" placeholder="2 caractères minimum"/>
        </div>
        <div class="col-md-4 mb-3">
            <label for="content">Nouveau contenu du post</label>
            <textarea class="form-control" id="content" v-model="content" placeholder="4 caractères minimum"/>
        </div>
      </div>
      <p id="error"></p>
      <button type="submit">Enregistrer les modifications</button>
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
