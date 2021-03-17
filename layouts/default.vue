<template>
  <v-app>
    <v-main class="">
        <nuxt />
    </v-main>
    <Footer bcolor='white' fcolor="blue-grey"></Footer>
  </v-app>
</template>

<script>
    import Footer from '~/components/Footer.vue'

    export default {
        components: {
            Footer,
        },
    }
</script>