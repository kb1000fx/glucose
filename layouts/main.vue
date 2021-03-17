<template>
<v-app>
    <v-app-bar color="primary" class="white--text"  height="56px" flat app clipped-left>
        <div class="appbar-avatar d-none d-lg-flex justify-center">
            <v-avatar>
                <v-img :src="$auth.user.avatar"></v-img>
            </v-avatar>
        </div>
        <div class="appbar-title d-none d-lg-flex"> {{ $auth.user.user }} </div>
        <v-app-bar-nav-icon color="white" @click="clickDrawer()"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ pages[selectedItem].title }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer clipped app v-model="drawer" :mini-variant.sync="isMini">
        <div class="d-block d-lg-none">
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img :src="$auth.user.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-title>{{ $auth.user.user }}</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
        </div>
        <v-list>          
            <v-list-item-group mandatory v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, i) in pages" :key="i" :to="item.to" nuxt>
                    <v-list-item-icon class="drawer-icon justify-center">
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <v-divider></v-divider>
            <v-list-item link @click="dialog = true">
                <v-list-item-icon class="drawer-icon justify-center">
                    <v-icon>far fa-clipboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>公告</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon class="drawer-icon justify-center">
                    <v-icon>{{ darkIcon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>夜间模式</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-switch v-model="isDark"></v-switch>
                </v-list-item-action>
            </v-list-item>
            <v-list-item link @click="logout()">
                <v-list-item-icon class="drawer-icon justify-center">
                    <v-icon>fas fa-sign-out-alt</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>退出</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
            <v-card-title class="headline"> 公告 </v-card-title>
            <v-card-text> {{ notice.content }} </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="dialog = false">确定</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-main>
      <nuxt />
    </v-main>

    <Footer bcolor='primary' fcolor="white"></Footer>
</v-app>
</template>

<script>
import { changeDarkMode, initDarkMode } from '@js/DarkMode.js'

export default {
    middleware: 'auth',
    data () {
        return {
            isMini: false,
            drawer: true,
            pages: [
                { title: '主页', icon: 'fas fa-home', to:'/' },
                { title: '时间', icon: 'far fa-calendar-alt', to:'/detail' },
                { title: '个人资料', icon: 'fas fa-user', to:'/user' },
            ],
            selectedItem: 0,
            darkIcon: "fas fa-moon",
            isDark: this.$store.state.DarkMode.isDark,
            notice: {},
            dialog: false
        }
    },
    watch: {     
        isDark: function (value) {
            this.darkIcon = this.isDark?"fas fa-sun":"fas fa-moon";
            changeDarkMode(this, value);
        } 
    },

    methods: { 
        logout: async function (){
            await this.$auth.logout();
            this.$router.push("/login"); 
        },
        clickDrawer: function (){
            if (this.$vuetify.breakpoint.lgAndUp) {
                this.isMini = !this.isMini
            } else {
                this.drawer = !this.drawer
            }  
        },
    },
    beforeMount(){
        this.isDark = initDarkMode();
        if(this.notice.autoShow){
            this.dialog = true
        };
        for (let i = 0; i < this.pages.length; i++) {
            if (this.pages[i].to == this.$route.path) {
                this.selectedItem = i
            }
        }
    },
    async fetch(){
        const noticeRes = await this.$axios.get('/api/notice');
        this.notice = noticeRes.data;
    }
}
</script>

<style lang="scss" scoped>
.drawer-icon {
    width: 36px;
}
.appbar-avatar{
    width: 80px;  
}   
.appbar-title{
    width: 160px;
    font-size: 24px;
    padding: 10px 0;
    border-right-style: solid;
    border-width: 1px;
}
</style>