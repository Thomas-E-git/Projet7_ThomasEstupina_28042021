<template>
    <div class="container">
        <h1>{{user.username}}</h1>
        <h2>{{user.email}}</h2>
        <h2>{{user.department}}</h2>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default({
    name: 'Profil',
    computed: {
        ...mapGetters(['user'])
    }

})
</script>
