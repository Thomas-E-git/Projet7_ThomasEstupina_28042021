import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)

}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../components/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profil.vue')
  },
  {
    path: '/post',
    name: 'NewPost',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewPost.vue')
  },
  {
    path: '/user/:userId',
    name: 'OthersProfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/OthersProfil.vue')
  },
  {
    path: '/profil/modify',
    name: 'ModifyProfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModifyProfil.vue')
  },
  {
    path: '/post/:topicId',
    name: 'ModifyPost',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModifyPost.vue')
  },
  {
    path: '/forum',
    name: 'Forum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Forum.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
