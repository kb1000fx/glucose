<template>
<div id="login-main" class="d-flex justify-center align-center">
    <v-card :width="width" elevation="10" outlined>
        <v-tabs v-model="tab" grow>
            <v-tab href="#login-tab">登录</v-tab>
            <v-tab href="#signup-tab">注册</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-6">
            <v-tab-item value="login-tab">
                <v-text-field 
                    label="学号" 
                    :rules="loginRules.IDRule" 
                    v-model="loginData.userID">
                </v-text-field>
                <v-text-field 
                    label="密码" 
                    :rules="loginRules.PwdRule" 
                    v-model="loginData.password">
                </v-text-field>
                <v-checkbox
                    v-model="loginData.rememberPwd"
                    label="记住密码"
                    hide-details="true">
                </v-checkbox>
                <v-row justify="center" no-gutters>
                    <v-btn depressed color="primary" @click='login()'>
                        登录
                    </v-btn>
                </v-row>
            </v-tab-item>

            <v-tab-item value="signup-tab">
                <v-text-field 
                    label="学号" 
                    :error-messages="signupData.userIDError"
                    :rules="signupRules.IDRule" 
                    v-model="signupData.userID">
                </v-text-field>
                <v-text-field 
                    label="密码" 
                    :rules="signupRules.PwdRule" 
                    v-model="signupData.password">
                </v-text-field>
                <v-text-field 
                    label="重复密码" 
                    :rules="signupRules.repeatPwdRule" 
                    v-model="signupData.repeatPwd">
                </v-text-field>

                <v-row justify="center" no-gutters>
                    <v-btn depressed color="primary" @click='signup()'>
                        注册
                    </v-btn>
                </v-row>
            </v-tab-item>
        </v-tabs-items>

    </v-card>
</div>
</template>

<script>
export default {
    data: ()=>{
        return {
            tab: null,
            loginRules: {
                IDRule: [
                    value => !!value || '学号不能为空',
                ],
                PwdRule: [
                    value => !!value || '密码不能为空',
                ],
            },
            signupRules: {
                IDRule: [
                    value => !!value || '学号不能为空',
                ],
                PwdRule: [
                    value => !!value || '密码不能为空',
                ],
                repeatPwdRule: [
                    function (value){
                        if(value != 'signupData.password'){
                            return '两次输入密码不一致'
                        }
                    },
                ],
            },
            loginData: {
                userID: '',
                password: '',
                rememberPwd: false
            },
            signupData: {
                userIDError: '',
                userID: '',
                password: '',
                repeatPwd: ''
            }
        }
    },
    computed: {
        width() {
            if(this.$vuetify.breakpoint.mobile){
                return "85%"
            }else{
                return "480px"
            }
        }
    },
    mounted() {
        console.log(this.$config)
    },
    methods:{
        async login(){
            if(this.loginData.userID && this.loginData.password){
                let res = await this.$auth.loginWith('local', { 
                    data: { 
                        userID: this.loginData.userID,
                        password: this.loginData.password,
                        rememberPwd: this.loginData.rememberPwd
                    } 
                });
                this.$router.push("/"); 
            }
        },
        async signup(){
            let res = await this.$axios.get('userID');
            if(res.data.isUsed){
                this.signupData.userIDError = '123444'
            }
        }
    },
    middleware: 'auth',
}
</script>

<style>
#login-main{
    height:100%;
    width:100%;
}
</style>