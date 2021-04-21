<template>
  <div class="hello">
    <h1>bonjour {{ user.username }}</h1>
    <div>
      <p :key="index" v-for="(post, index) in allPosts">{{ post }}</p>
    </div>
  </div>
</template>

<script>
import '../axios'
import { mapGetters, mapState } from 'vuex'
import axios from 'axios'

export default {
  components: {
  },
  name: 'Forum',
  async mounted() {
    const response = await axios.get('topics')
    this.$store.dispatch('getAllPosts', response.data)
  },
  computed: {
    ...mapState(['allPosts']),
    ...mapGetters(['user'])
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