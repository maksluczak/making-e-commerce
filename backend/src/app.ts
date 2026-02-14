import express from "express";
import cors from "cors";
import { router } from "./routes";
import path from "path";
import { swaggerSpec } from "./swagger";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "",
            "http://localhost:3000"
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", router);

export default app;
