<template>
  <div class="container">
    <h1>bonjour {{ user.username }}</h1>
    <router-link  class="btn btn-primary" to="/post">Nouveau post</router-link>
    <Likes v-bind:revele="revele" v-bind:toggle="toggle" />
    <div v-bind:id="post.id" :key="index" v-for="(post, index) in allPosts">
      <router-link :to="{ name: 'OthersProfil', params: { userId: post.UserId }}" > {{ post.username }} </router-link>
      <h3> {{ post.title }} Crée le {{ post.updatedAt.substring(8,10) }}/{{post.updatedAt.substring(5,7)}}/{{ post.updatedAt.substring(0,4) }}</h3>
      <p> {{ post.content }} </p>
      <div class="row justify-content-center">
        <div v-bind:id="post.id" v-if="post.UserId == user.id">
          <router-link :to="{ name: 'ModifyPost', params: { topicId: post.id }}" class="btn" >modifier le post</router-link>
          <button @click="deletePost(post.id)">Supprimer le post</button>
        </div>
        <div @click="getLikes(post.id), toggle()" class="btn"> {{ post.likes }} </div>
        <div :key="index" v-for="(like, index) in likeStatus">
          <div v-if="like.topicId == post.id && like.isLike == 1" @click="likePost(post.id)" >
            <span >J'aime</span> 
            <i class="fas fa-thumbs-up ml-3 liked"></i>
          </div>
        </div>
        <div v-if="likesTopicId.includes(post.id) == false" @click="likePost(post.id)" >
            <span >J'aime</span> 
            <i class="fas fa-thumbs-up ml-3 notliked"></i>
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
.liked {
  color: blue
}
.notliked {
  color: grey
}
</style>