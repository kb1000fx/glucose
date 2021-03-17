<template>
    <v-footer :color="bcolor" padless app>
        <v-row justify="center" no-gutters>
            <v-col class="py-4 text-center" :class="fcolor + '--text'" cols="12">
                <span> {{ new Date().getFullYear() }} </span>
                <v-btn icon :color="fcolor" :href="this.$config.homepage" target="_blank">
                    <v-icon>fab fa-github</v-icon>
                </v-btn> 
                <span> <strong>{{this.$config.name.toUpperCase()}}</strong> v{{this.$config.version}} </span>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
    export default {
        props:['bcolor', 'fcolor'],
    }
</script>

<style scoped>
    .v-footer span, .v-btn{
        vertical-align: middle;
    }
</style>