<template>
    <v-tabs v-model="tab" :vertical="$vuetify.breakpoint.lgAndUp">
        <v-tab
            v-for="(itemGroup, i) in items"
            :key="'tab-'+i"
        >
            {{ itemGroup.tab }}
        </v-tab>

        <v-tab-item
            v-for="(itemGroup, i) in items"
            :key="'item-'+i"
        >
            <v-list>
                <v-list-item-group v-model="model">
                    <v-list-item
                        v-for="(item, j) in items[i].list"
                        :key="'item-'+j"
                    >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>

        </v-tab-item>
    </v-tabs>
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
            items: [ ],
            tab: '',
            model: ''
        }
    },
    async fetch(){
        const res = await this.$axios.get('/itemList');
        this.items = res.data;
    },

}
</script>
