<template>
    <div class="container">
        <h1>{{user.username}}</h1>
        <h2>{{user.email}}</h2>
        <h2>{{user.department}}</h2>
        <router-link to="/profil/modify">Modifier le profil</router-link>
        <button @click="deleteUser()">Supprimer le compte utilisateur</button>
        <Likes v-bind:revele="revele" v-bind:toggle="toggle" />
        <p class="h1">Mes publications </p>
        <div v-bind:id="post.id" :key="index" v-for="(post, index) in usersPosts">
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

<style scoped>

    .liked {
        color: blue
    }
    .notliked {
        color: grey
    }
</style>
