const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/investments': {
                target: 'http://localhost:5000'
            }
        }
    }
}