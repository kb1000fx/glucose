export const state = () => ({
    isDark: false,
})

export const mutations = {
    setDarkStatus(state, status){
        state.isDark = status;
        localStorage.setItem('isDark', status);
    },
}
