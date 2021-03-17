function changeDarkMode(ctx, isDark) {
    ctx.$vuetify.theme.dark = isDark;
    ctx.$store.commit('DarkMode/setDarkStatus', isDark)
};

function initDarkMode() {
    let localData = localStorage.getItem('isDark')
    return (!!localData)?JSON.parse(localData):false
};

export {changeDarkMode, initDarkMode};
