var config = {
    development: {
        dbHost: 'mongodb://localhost/bloodbank',
        versionDetails: {
            code: 1,
            info: 'Development version',
            forceUpdate: true
        }
    },
    production: {
        dbHost: 'mongodb://localhost/bloodbank',
        versionDetails: {
            code: 1,
            info: 'Development version',
            forceUpdate: true
        }
    }
}
exports.config = config;
