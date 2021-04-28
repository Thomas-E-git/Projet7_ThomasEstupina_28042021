<template>
    <div class="container mt-5">
        <h1 class="text-primary text-center font-weight-bold">{{user.username}}</h1>
        <h2 class="text-secondary text-center">{{user.email}}</h2>
        <p class="text-primary text-center h2">{{user.department}}</p>
        <div class="text-center my-5">
            <router-link to="/profil/modify" class="btn btn-secondary">Modifier le profil</router-link>
            <button class="btn btn-danger ml-sm-5" @click="deleteUser()">Supprimer le compte utilisateur</button>
        </div>  
        <Likes v-bind:revele="revele" v-bind:toggle="toggle" />
        <p class="h2 text-primary font-weight-bold my-3">Mes publications </p>
        <div class="mb-3 bg-light rounded-lg p-3 p-md-5" v-bind:id="post.id" :key="index" v-for="(post, index) in usersPosts">
            <h3> {{ post.title }} <span class="font-italic h4">Crée le {{ post.updatedAt.substring(8,10) }}/{{post.updatedAt.substring(5,7)}}/{{ post.updatedAt.substring(0,4) }}</span></h3>
            <p> {{ post.content }} </p>
            <div class="my-3">
                <button @click="getLikes(post.id), toggle()" class="btn btn-primary rounded-circle btn-sm"> {{ post.likes }} </button>
                <span class="font-weight-bold" v-if="post.likes == 0">Aucun membre n'a encore aimé la publication</span>
                <span class="font-weight-bold" v-if="post.likes == 1"> membre aime la publication</span>
                <span class="font-weight-bold" v-if="post.likes >= 2"> membres aiment la publication</span>
            </div>
            <div class="row">
                <div class="row mr-auto ml-5">
                    <div :key="index" v-for="(like, index) in likeStatus">
                        <button class="btn btn-lg like" v-if="like.topicId == post.id && like.isLike == 1" @click="likePost(post.id)" >
                            <span >J'aime</span> 
                            <i class="fas fa-thumbs-up ml-3 liked"></i>
                        </button>
                    </div>
                    <button class="btn btn-lg notlike" v-if="likesTopicId.includes(post.id) == false" @click="likePost(post.id)" >
                        <span >J'aime</span> 
                        <i class="fas fa-thumbs-up ml-3 notliked"></i>
                    </button>
                </div>
                <div class="ml-auto" v-bind:id="post.id" v-if="post.UserId == user.id">
                    <router-link :to="{ name: 'ModifyPost', params: { topicId: post.id }}" class="btn btn-secondary" >modifier le post</router-link>
                    <button @click="deletePost(post.id)" class="btn btn-danger mx-3">Supprimer le post</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    import axios from 'axios'
    import '../axios'
    import Likes from '../components/Likes'

    export default({
        
    name: 'Profil',

    components: {
        Likes
    },

    data() {
        return {
            revele: false,
            likesTopicId: []
        }
    },

    async mounted() {
        const response = await axios.get('users/' + this.user.id)
        this.$store.dispatch('getUsersPosts', response.data.Topics)
        console.log(response.data)
    },

    async beforeCreate() {
        const response = await axios.get('likes/status')
        this.likesTopicId = []
        for(var like of response.data) {
            if (like.isLike == 1) {
        this.likesTopicId.push(like.topicId)
            }
        }
        this.$store.dispatch('getUserLikeStatus', response.data)
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
        const res3 = await axios.get('users/' + this.user.id)
        this.$store.dispatch('getUsersPosts', res3.data.Topics)
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
        const res3 = await axios.get('users/' + this.user.id)
        this.$store.dispatch('getUsersPosts', res3.data.Topics)
    },
    async deleteUser() {
        const response = await axios.delete('users/me/delete')
        console.log(response)
        localStorage.removeItem('token');
        this.$store.dispatch('user', null);
        this.$router.push('/');
    }
  },

  computed: {
    ...mapGetters(['user']),
    ...mapState(['likes']),
    ...mapState(['likeStatus']),
    ...mapState(['usersPosts'])
  },
})
</script>

<style >
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
