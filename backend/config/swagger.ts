import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

const swaggerConfig = {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: 'docs', // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: '/swagger.json',

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Application with swagger docs',
        version: '1.0.0',
        description: 'My application with swagger docs',
      },
    },

    apis: [`${__dirname}/app/documentation.js`, `${__dirname}/app/**/*.js`, 'docs/swagger/**/*.yml', `${__dirname}/start/routes.js`],
  },
  mode: 'RUNTIME',
  specFilePath: '/swagger.json',
} as SwaggerConfig
export default swaggerConfig
