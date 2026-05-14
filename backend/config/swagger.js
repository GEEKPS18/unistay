const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UniStay API',
      version: '1.0.0',
      description: 'Student housing platform API — An-Najah National University final project',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' },
    ],
    components: {
      securitySchemes: {
        // All protected routes expect: Authorization: Bearer <token>
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Swagger picks up @swagger JSDoc comments from every route file
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
