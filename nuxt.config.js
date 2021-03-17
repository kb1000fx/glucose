import path from 'path'
import vuetify from './config/vuetify.js'
import auth from './config/auth.js'


export default {
    target: 'static',
    ssr: true,
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - glucose',
        title: 'glucose',
        htmlAttrs: {
            lang: 'zh-CN'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/injectConfig.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'https://www.fastmock.site/mock/aa85bb754881ab97a68e85b9bc015d0f/glucose',
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: vuetify,
    auth: auth,

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    alias: {
        '@js': path.resolve(__dirname, './assets/js'),
    },

}
