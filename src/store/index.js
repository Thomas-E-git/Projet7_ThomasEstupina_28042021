import Vue from 'vue';
import Vuex from 'vuex';
import '../axios';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    allPosts : [],
    likes : [],
    likeStatus : [],
    usersPosts : [],
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    posts: (state) => {
      return state.usersPosts;
    },
    likes: (state) => {
      return state.likes;
    },
    likeStatus: (state) => {
      return state.likeStatus
    },
    usersPosts: (state) => {
      return state.usersPosts
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    SET_POSTS(state, posts) {
      state.allPosts = posts
    },
    likes(state, likes) {
      state.likes = likes
    },
    likeStatus(state, likeStatus) {
      state.likeStatus = likeStatus
    },
    usersPosts(state, usersPosts) {
      state.usersPosts = usersPosts
    }
  },
  actions: {
    async user(context, user) {
      await context.commit('user', user);
    },
    async getAllPosts(context, posts) {
      await context.commit('SET_POSTS', posts);
    },
    async getLikes(context, likes) {
      await context.commit('likes', likes);
    },
    async getUserLikeStatus(context, likeStatus) {
      await context.commit('likeStatus', likeStatus)
    },
    async getUsersPosts(context, usersPosts) {
      await context.commit('usersPosts', usersPosts)
    }
  }
})
