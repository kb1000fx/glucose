export default{
    redirect: {
        login: '/login',
        logout: '/login',
        callback: '/login',
        home: '/'
    },
    //rewriteRedirects: false,
    watchLoggedIn: true,
    strategies: {
        local: { 
            endpoints: {
                login: { url: '/auth/login', method: 'post' },
                user: { url: '/auth/user', method: 'get' },
                logout: false,
            },
            token: {
                property: "token"
            },
            user: {
                property: false
            }
        },
    }
}