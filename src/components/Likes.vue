<template>
    <div class="Likes-modale" v-if="revele">
        <div class="overlay" @click="toggle"></div>
        <div class="modale card">
            <div class="btn-modale btn btn-danger" @click="toggle">X</div>
            <p class="h4">Personnes ayant aimé le post</p>
            <div :key="index" v-for="(like, index) in likes">
                <router-link :to="{ name: 'OthersProfil', params: { userId: like.Like.userId }}" v-if="like.Like.isLike == 1" @click="toggle" >{{ like.username }}</router-link>
            </div>
                
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'


export default {
    name: 'Likes',
    props: ['revele', 'toggle'],

    computed: {
        ...mapState(['likes']),
    },

}
</script>

<style scoped>
    .Likes-modale {
        position: fixed;
        top:0;
        bottom: 0;
        right: 0;
        left:0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 300;
    }

    .overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top:0;
        bottom: 0;
        right: 0;
        left:0;
    }

    .modale {
        background: floralwhite;
        color:gold;
        padding: 5rem;
        position: fixed;
    }

    .btn-modale {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

</style>
