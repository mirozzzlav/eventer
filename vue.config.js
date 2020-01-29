module.exports = {
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "~@/scss/_variables.scss";
                    @import "./node_modules/bootstrap/scss/bootstrap";
                    @import "./node_modules/bootstrap-vue/src/index";
                    @import "~@/scss/global.scss";
                `
            }
        }
    },
    publicPath: process.env.VUE_APP_BASE_ROUTE,     
}