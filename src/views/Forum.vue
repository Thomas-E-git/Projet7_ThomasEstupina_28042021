<template>
  <div class="hello">
    <Nav />
    <h1>bonjour</h1>
    <div>
      <p :key="index" v-for="(post, index) in allPosts">{{ post }}</p>
    </div>
  </div>
</template>

<script>
import '../axios'
import Nav from '../components/Nav'
import { mapState } from 'vuex'
export default {
  components: {
    Nav
  },
  name: 'Forum',
  mounted() {
    this.$store.dispatch('getAllPosts')
  },
  computed: {
    ...mapState(['allPosts'])
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
a {
  color: #42b983;
}
</style>