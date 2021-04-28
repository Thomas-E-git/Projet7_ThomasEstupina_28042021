<template>
  <div class="container mt-5">
    <h1 class="text-center my-5">Bienvenue {{ user.username }} <br> <span class="d-none d-md-inline">sur le forum de partage de Groupomania</span></h1>
    <div class="col text-center mb-5"> <router-link  class="btn btn-secondary col-9 col-sm-6 col-md-4" to="/post">Créer un nouveau post</router-link> </div>
    <Likes v-bind:revele="revele" v-bind:toggle="toggle" />
    <div class="mb-3 bg-light rounded-lg p-3 p-md-5" v-bind:id="post.id" :key="index" v-for="(post, index) in allPosts">
      <div class="row h4">
        <p>
          <router-link class="font-weight-bold" :to="{ name: 'OthersProfil', params: { userId: post.UserId }}" > {{ post.username }}</router-link>
          <span class="font-italic"> &nbsp;a publié le  {{ post.updatedAt.substring(8,10) }}/{{post.updatedAt.substring(5,7)}}/{{ post.updatedAt.substring(0,4) }}</span>
        </p>
      </div>
      <p class="h3"> {{ post.title }} </p>
      <p> {{ post.content }} </p>
      <div class="my-3">
        <button @click="getLikes(post.id), toggle()" v-if="post.likes !== 0" class="btn btn-primary rounded-circle btn-sm"> {{ post.likes }} </button>
        <span class="font-weight-bold" v-if="post.likes == 0">Aucun membre n'a encore aimé la publication</span>
        <span class="font-weight-bold" v-if="post.likes == 1"> membre aime la publication</span>
        <span class="font-weight-bold" v-if="post.likes >= 2"> membres aiment la publication</span>
      </div>
      <div class="row ">
        <div class="row mr-auto ml-5"> 
          <div :key="index" v-for="(like, index) in likeStatus">
            <button class="btn btn-lg like" v-if="like.topicId == post.id && like.isLike == 1" @click="likePost(post.id)" >
              <span >J'aime</span> 
              <i class="fas fa-thumbs-up ml-3 liked"></i>
            </button>
          </div>
          <button class="btn btn-lg notlike" v-if="likesTopicId.includes(post.id) == false" @click="likePost(post.id)" >
              <span>J'aime</span> 
              <i class="fas fa-thumbs-up ml-3 notliked"></i>
          </button>
        </div>
        <div class="ml-auto" v-bind:id="post.id" v-if="post.UserId == user.id">
          <router-link :to="{ name: 'ModifyPost', params: { topicId: post.id }}" class="btn btn-secondary" >modifier le post</router-link>
          <button class="btn btn-danger mx-3" @click="deletePost(post.id)">Supprimer le post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../axios'
import { mapState } from 'vuex'
import axios from 'axios'
import Likes from '../components/Likes'

export default {
  components: {
    Likes
  },
  data() {
    return {
      revele: false,
      likesTopicId: []
    }
  },
  async created() {
    const response = await axios.get('likes/status')
    this.likesTopicId = []
    for(var like of response.data) {
      if (like.isLike == 1) {
        this.likesTopicId.push(like.topicId)
      }
    }
    this.$store.dispatch('getUserLikeStatus', response.data)
    const res2 = await axios.get('topics')
    this.$store.dispatch('getAllPosts', res2.data)
    this.componentKey += 1;
  },

  methods: {
    async likePost(id){
      const response = await axios.post('topics/' + id + '/vote/like')
      console.log(response);
      const res2 = await axios.get('likes/status')
      this.likesTopicId = []
      for(var like of res2.data) {
      if (like.isLike == 1) {
        this.likesTopicId.push(like.topicId)
        }
      }
      this.$store.dispatch('getUserLikeStatus', res2.data)
      const res3 = await axios.get('topics')
      this.$store.dispatch('getAllPosts', res3.data)
    },

    async getLikes(id) {
        const response = await axios.get('topics/' + id + '/likes')
        this.$store.dispatch('getLikes', response.data[0].Users)
    },

    toggle() {
      this.revele = !this.revele
    },
    async deletePost(id) {
      const response = await axios.delete('topics/' +id + '/delete')
      console.log(response)
      const res3 = await axios.get('topics')
      this.$store.dispatch('getAllPosts', res3.data)
    },

    forceRerender() {
      
    }
  },

  computed: {
    ...mapState(['user']),
    ...mapState(['likes']),
    ...mapState(['likeStatus']),
    ...mapState(['allPosts']),
  },


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.liked {
  color: rgb(252,44,4)
}
.notliked {
  color: grey
}
.like:hover {
  background: rgb(155, 151, 151);
}
.notlike:hover {
  background: rgb(248, 123, 98)
}
</style>