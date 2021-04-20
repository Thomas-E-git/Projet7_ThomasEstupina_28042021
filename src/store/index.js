import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import '../axios';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPosts : [],
    user: null
  },
  getters: {
    user: (state) => {
      return state.user;
    }
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.allPosts = posts
    },
    USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async getAllPosts(context) {
      await axios.get('topics')
      .then(res => {
        let posts = res.data;
        context.commit('SET_POSTS', posts);
      })
      .catch(error => {
        console.log(error)
      })
    },
    user(context, user) {
      context.commit('USER', user);
    }
  },
  modules: {
  }
})
