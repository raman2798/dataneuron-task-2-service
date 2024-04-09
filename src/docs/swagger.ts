import swaggerJsdoc from 'swagger-jsdoc';
import { appConfiguration } from '../config';
import { description, version } from '../../package.json';

const { appVersion, port } = appConfiguration;

const swaggerOptions = {
  openapi: '3.1.0',
  info: {
    title: 'Project Management Platform API Docs',
    description,
    version,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-auth-token',
        description: 'Token for authentication',
      },
    },
  },
  servers: [
    {
      url: `http://localhost:${port}/${appVersion}`,
    },
  ],
};

const swaggerSpecs = swaggerJsdoc({
  swaggerDefinition: swaggerOptions,
  apis: ['src/docs/yml/**/*.yml'],
});

export { swaggerSpecs };
