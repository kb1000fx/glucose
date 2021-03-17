import packageJson from '../package.json'

var config = {
    name: packageJson.name,
    version: packageJson.version,
    homepage: packageJson.homepage,
}

if(!!packageJson.glucose){
    Object.assign(config, packageJson.glucose)
}

export default (ctx, inject) => {
    inject('config', config)
}