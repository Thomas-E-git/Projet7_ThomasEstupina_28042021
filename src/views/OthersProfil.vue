<template>
    <div class="container mt-5">
        <h1 class="text-primary text-center font-weight-bold">{{usersPosts.username}}</h1>
        <h2 class="text-secondary text-center h2 mb-5">{{usersPosts.department}}</h2>
        <Likes v-bind:revele="revele" v-bind:toggle="toggle" />
        <p class="h2 text-primary font-weight-bold my-3"> Publications </p>
        <div class="mb-3 bg-light rounded-lg p-3 p-md-5" v-bind:id="post.id" :key="index" v-for="(post, index) in usersPosts.Topics">
            <h3> {{ post.title }} <span class="font-italic h4"> Crée le {{ post.updatedAt.substring(8,10) }}/{{post.updatedAt.substring(5,7)}}/{{ post.updatedAt.substring(0,2) }}</span></h3>
            <p> {{ post.content }} </p>
            <div class="my-3">
                <div class="btn btn-primary rounded-circle btn-sm" @click="getLikes(post.id), toggle()"> {{ post.likes }} </div>
                <span class="font-weight-bold" v-if="post.likes == 0">Aucun membre n'a encore aimé la publication</span>
                <span class="font-weight-bold" v-if="post.likes == 1"> membre aime la publication</span>
                <span class="font-weight-bold" v-if="post.likes >= 2"> membres aiment la publication</span>
            </div>
            <div class="text-left">
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