import Vue from 'vue';
import Vuex from 'vuex';
import '../axios';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    allPosts : [],
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    posts: (state) => {
      return state.allPosts;
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    SET_POSTS(state, posts) {
      state.allPosts = posts
    },
  },
  actions: {
    async user(context, user) {
      console.log("testUser");
      await context.commit('user', user);
    },
    async getAllPosts(context, posts) {
      console.log("testPosts");
      await context.commit('SET_POSTS', posts);
    },
  }
})
