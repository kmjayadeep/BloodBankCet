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
        dbHost: 'mongodb://default:default@ds053295.mongolab.com:53295/blood_bank_cet',
        versionDetails: {
            code: 1,
            info: 'Development version',
            forceUpdate: true
        }
    }
}
exports.config = config;
