import swaggerJSDoc, {Options} from 'swagger-jsdoc';
import path from "path";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce project API Documentation",
            version: "1.0.0",
            description: "This is a swagger API documentation for project",
        },
        servers: [
            { url: "http://localhost:8080/api/v1" },
        ],
    },
    components: {
        securitySchemes: {
            cookieAuth: {
                type: "apiKey",
                in: "cookie",
                name: "jwt"
            }
        }
    },
    apis: [path.join(__dirname, "./routes/**/*.{ts,js}")],
};

export const swaggerSpec = swaggerJSDoc(options);