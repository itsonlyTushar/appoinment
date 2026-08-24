import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// DEFINE VERSION TITLE AND DESCRIPTION AND REGISTER SERVER URL
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Health Ease API Documentation",
      version: "1.0.0",
      description: "Health Ease APIs, planned and layed out in detailed format",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
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
  },
  apis: ["./src/routes/*.js", "./src/docs/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// SETUP AND SERVER THE DOCS ON THE API-DOCS ROUTE
export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
