const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "REST API documentation for E-Commerce backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Localhost (Backend on same machine)"
      },
      {
        url: "http://192.168.1.85:5000",
        description: "LAN IP (Mobile / Other devices)"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // IMPORTANT: point to routes
  apis: [
    "./src/routes/*.js",
    "./src/docs/*.js"
  ]
  ,
};

module.exports = swaggerJsdoc(options);
