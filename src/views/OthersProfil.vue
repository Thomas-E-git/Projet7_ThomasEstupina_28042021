<template>
    <div class="container">
        <h1>{{usersPosts.username}}</h1>
        <h2>{{usersPosts.department}}</h2>
        <Likes v-bind:revele="revele" v-bind:toggle="toggle" />
        <p class="h1"> Publications </p>
        <div v-bind:id="post.id" :key="index" v-for="(post, index) in usersPosts.Topics">
            <h3> {{ post.title }} Crée le {{ post.updatedAt.substring(8,10) }}/{{post.updatedAt.substring(5,7)}}/{{ post.updatedAt.substring(0,2) }}</h3>
            <p> {{ post.content }} </p>
            <div class="row justify-content-center">
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
        
    name: 'OthersProfil',

    components: {
        Likes
    },

    data() {
        return {
            revele: false,
            likesTopicId: []
        }
    },

    async beforeCreate() {
        const UserId = window.location.pathname.substring(6)
        const response = await axios.get('users/' + UserId)
        this.$store.dispatch('getUsersPosts', response.data)
        const res = await axios.get('likes/status')
        this.likesTopicId = []
        for(var like of res.data) {
            if (like.isLike == 1) {
        this.likesTopicId.push(like.topicId)
            }
        }
        this.$store.dispatch('getUserLikeStatus', res.data)

    },

    methods: {
        async likePost(id){
            const UserId = window.location.pathname.substring(6)
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
            const res3 = await axios.get('users/' + UserId)
            this.$store.dispatch('getUsersPosts', res3.data)
        },

    async getLikes(id) {
        const response = await axios.get('topics/' + id + '/likes')
        this.$store.dispatch('getLikes', response.data[0].Users)
    },

    toggle() {
      this.revele = !this.revele
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