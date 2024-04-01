const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        host: 'http://localhost:4000',
        externalDocs: {
            // <<< this will add the link to your swagger page
            description: 'swagger.json', // <<< link text
            url: '/swagger.json', // <<< and the file added below in api.get(...)
        },
    },

    apis: ['./src/routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;
