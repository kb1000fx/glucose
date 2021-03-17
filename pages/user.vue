<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

    <v-avatar color="red">
      <span class="white--text headline">{{ $auth.user.user }}</span>
    </v-avatar>



    </v-col>
  </v-row>
</template>

<script>
export default {
    layout: 'main',
    components: {
        
    },
    methods:{

    },
    data: ()=>{
        return {
            
        }
    },

}
</script>